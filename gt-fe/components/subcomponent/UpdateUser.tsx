import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { IUser } from "@/util/user";

interface IUpdateUserProps {
  user: IUser;
}

export default function UpdateUser(props: IUpdateUserProps): JSX.Element {
  const [users, setUsers] = useState<IUser>(props.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...users,
      lastName: e.currentTarget.lastname.value,
      firstName: e.currentTarget.firstname.value,
      email: e.currentTarget.email.value,
      phone: e.currentTarget.phone.value,
    };
    fetch(`http://localhost:3000/user/${props.user.id}`, {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  };

  return (
    <form className="grid grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          name="lastname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Овог"
          defaultValue={users.lastName}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="firstname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Нэр"
          defaultValue={users.firstName}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="И-мэйл"
          defaultValue={users.email}
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="phone"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Утасны дугаар"
          defaultValue={users.phone}
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
