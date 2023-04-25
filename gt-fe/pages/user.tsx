import { IUser } from "@/util/user";
import { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { BsPersonAdd } from "react-icons/bs";
import UserForm from "@/components/UserForm";
import UpdateUser from "@/components/subcomponent/UpdateUser";

export default function User(): JSX.Element {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState<IUser | null>(null);

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

  // function updateHandler(user: IUser): void {
  //   setShowUpdateUser(true);
  //   setUserToUpdate(user);
  // }
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
          {showUserForm ? <UserForm /> : <></>}

          <div className="my-3 p-2 grid md:grid-cols-6 sm:grid-cols-2 item-center justify-between cursor-pointer ">
            <span className="hidden md:grid">Овог</span>
            <span>Нэр</span>
            <span className="hidden sm:grid">И-мэйл</span>
            <span className="sm:text-right">Утасны дугаар</span>
            <span className="sm:text-right">Edit</span>
            <span className="sm:text-right">Delete</span>
          </div>
          <ul>
            {users &&
              users.map((user: IUser, i: number) => (
                <li
                  key={i}
                  className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-6 sm:grid-cols-3 items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center md:grid-cols-1">
                    <div className="p-3 rounded-lg ">
                      <AiOutlineUser />
                    </div>
                    <p className="pl-4">{user.firstName}</p>
                  </div>
                  <p className="text-gray-600 sm:text-left text-right hidden md:grid md:grid-cols-1">
                    {user.lastName}
                  </p>
                  <p className="text-gray-600 sm:text-left text-right hidden sm:grid md:grid-cols-1">
                    {user.email}
                  </p>
                  <p className="sm:text-right md:grid md:grid-cols-1">
                    {user.phone}
                  </p>
                  <button>
                    <p className="text-gray-600 sm:text-right hidden sm:grid md:grid">
                      <AiOutlineEdit size={20} />
                    </p>
                  </button>

                  <button onClick={() => deleteHandler(user._id)}>
                    <p className="text-gray-600 sm:text-right hidden sm:grid md:grid">
                      <AiOutlineDelete size={20} />
                    </p>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
