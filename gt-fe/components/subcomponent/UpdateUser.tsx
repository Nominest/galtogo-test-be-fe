import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { IUser } from "@/util/user";

interface IUpdateUserProps {
  user: IUser;
  currentUser: IUser[] | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser[] | null>>;
  users: IUser[] | null;
  updatedUSer: IUser[] | null;
  setUsers: Dispatch<SetStateAction<IUser[] | null>>;
}

export default function UpdateUser(props: IUpdateUserProps): JSX.Element {
  const [user, setUser] = useState<IUser>(props.user);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchUserId = async () => {
      if (props.user && props.user._id) {
        const response = await fetch(
          `http://localhost:3000/user/${props.user._id}`
        );

        const data = await response.json();
        setUserId(data._id);
      }
    };
    fetchUserId();
  }, [props.user]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      lastName: e.currentTarget.lastname.value,
      firstName: e.currentTarget.firstname.value,
      email: e.currentTarget.email.value,
      phone: e.currentTarget.phone.value,
    };

    if (!props.user || !props.user._id) {
      console.log("User object does not have an _id property");
      return;
    }

    fetch(`http://localhost:3000/user/${props.user._id}`, {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(props.currentUser)) {
          console.log("Current user array is not an array");
          return;
        }
        const updatedUser = props.currentUser.map((u) => {
          if (u._id === data._id) {
            return data;
          }
          return u;
        });
        props.setCurrentUser(updatedUser);
        setUser(data);
        setShowUpdateUser(false);
      })
      .catch((error) => console.log(error));
  };

  function setShowUpdateUser(show: boolean) {
    // your logic for updating the state here
  }
  return (
    <form className="grid grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          name="lastname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Овог"
          defaultValue={user ? user.lastName : ""}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="firstname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Нэр"
          defaultValue={user ? user.firstName : ""}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="И-мэйл"
          defaultValue={user ? user.email : ""}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="phone"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Утасны дугаар"
          defaultValue={user ? user.phone : ""}
        />
      </div>

      <button
        type="submit"
        className="flex justify-center text-md w-2/8 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 border-green-500 hover:text-green-500"
      >
        Update
        <span className="px-1">
          <BiPlus size={24} />
        </span>
      </button>
    </form>
  );
}
