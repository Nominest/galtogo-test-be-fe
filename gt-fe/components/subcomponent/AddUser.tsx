import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { IUser } from "@/util/user";

export default function AddUser(): JSX.Element {
  const [userData, setUserData] = useState<IUser[]>([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Last name", e.target.lastname.value);
    console.log("First name", e.target.firstname.value);
    console.log("email name", e.target.email.value);
    console.log("Phone name", e.target.phone.value);

    const newUser = {
      lastName: e.target.lastname.value,
      firstName: e.target.firstname.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
    };
    fetch("http://localhost:3000/user/add", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(newUser),
    });
  };
  return (
    <form className="grid grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          name="lastname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Овог"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="firstname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Нэр"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="И-мэйл"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          name="phone"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Утасны дугаар"
        />
      </div>

      <button
        type="submit"
        className="flex justify-center text-md w-2/8 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 border-green-500 hover:text-green-500"
      >
        Add
        <span className="px-1">
          <BiPlus size={24} />
        </span>
      </button>
    </form>
  );
}
