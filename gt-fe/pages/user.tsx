import { IReservation, IUser } from "@/util/user";
import { useState, useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { BsPersonAdd } from "react-icons/bs";
import AddUser from "@/components/subcomponent/AddUser";
import UserReservation from "@/components/subcomponent/UserReservation";
import UpdateUser from "@/components/subcomponent/UpdateUser";

export default function User(): JSX.Element {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [userToUpdate, setUserToUpdate] = useState<IUser[] | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser[] | null>(null);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [selectedUserReservation, setSelectedUserReservation] = useState<
    IReservation[] | null
  >(null);
  const [selectedReservationDate, setSelectedReservationDate] = useState<
    string | null
  >(null);

  const handler = () => {
    setShowUserForm(!showUserForm);
  };

  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then((res) => res.json())
      .then((res) => setUsers(res));
  }, []);

  function deleteHandler(id: string): void {
    fetch(`http://localhost:3000/user/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      console.log("res: ", res);
      if (res.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      }
    });
  }

  function updateHandler(id: string): void {
    console.log("updateHandler called with id:", id);
    const userToUpdate = users?.find((user) => user._id === id);
    console.log("userToUpdate:", userToUpdate);
    setUserToUpdate(userToUpdate ? [userToUpdate] : null);
    setShowUpdateUser(true);
  }

  function getUserReservation(userId: string): void {
    fetch(`http://localhost:3000/reservation?user=${userId}`)
      .then((res) => res.json())
      .then((reservations) => {
        setSelectedUserReservation(reservations);
        if (reservations && reservations.length > 0) {
          setSelectedReservationDate(reservations[0].date);
        } else {
          setSelectedReservationDate(null);
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-between p-2">
        <h2>Users</h2>
        <h2>Welcome, User</h2>
      </div>
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div>
            <button
              onClick={handler}
              className="flex gap-3 bg-gray-100 p-4 rounded-lg inline-block hover:bg-gray-200 cursor-pointers my-4"
            >
              Add User <BsPersonAdd size={23} />
            </button>
          </div>
          {showUserForm ? <AddUser /> : <></>}
          {showUpdateUser ? (
            <UpdateUser
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              users={users}
              setUsers={setUsers}
              user={{
                _id: "",
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
              }}
              updatedUSer={null}
            />
          ) : (
            <></>
          )}

          <div className="my-3 p-2 grid md:grid-cols-11 item-center justify-between cursor-pointer text-center">
            <span className="col-span-2">Овог</span>
            <span className="col-span-2">Нэр</span>
            <span className="col-span-2">И-мэйл</span>
            <span className="col-span-2">Утасны дугаар</span>
            <span className="">Захиалгын түүх</span>
            <span className="">Edit</span>
            <span className="">Delete</span>
          </div>
          {users &&
            users.map((user) => (
              <div
                key={user._id}
                className="my-3 p-2 grid md:grid-cols-11 items-center justify-between cursor-pointer text-center hover:bg-gray-200"
              >
                <span className="col-span-2">{user.lastName}</span>
                <span className="col-span-2">{user.firstName}</span>
                <span className="col-span-2">{user.email}</span>
                <span className="col-span-2">{user.phone}</span>
                <button
                  onClick={() => getUserReservation(user._id)}
                  className="bg-green-500 p-2 rounded-lg text-white"
                >
                  <AiOutlineEye size={23} />
                </button>
                {selectedUserReservation && (
                  <UserReservation
                    reservations={selectedUserReservation}
                    selectedReservationDate={null}
                  />
                )}

                <button
                  onClick={() => updateHandler(user._id)}
                  className="bg-blue-500 p-2 rounded-lg text-white"
                >
                  <AiOutlineEdit />
                </button>
                <button
                  onClick={() => deleteHandler(user._id)}
                  className="bg-red-500 p-2 rounded-lg text-white"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            ))}
          {selectedUserReservation && (
            <UserReservation
              reservations={selectedUserReservation}
              selectedReservationDate={selectedReservationDate}
            />
          )}
        </div>
      </div>
    </div>
  );
}
