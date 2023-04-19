// import { useReducer } from "react";
// import { BiBrush } from "react-icons/bi";
// import Success from "./Succes";
// const userReducer = (state: any, event: any) => {
//   return {
//     ...state,
//     [event.target.name]: event.target.value,
//   };
// };

// export default function UpdateUser(): JSX.Element {
//   const [userData, setUserData] = useReducer(userReducer, {});

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     if (Object.keys(userData).length == 0)
//       return console.log("Don't have user data!");
//     console.log(userData);
//   };
//   if (Object.keys(userData).length > 0)
//     return <Success message={"User added"} />;
//   return (
//     <form className="grid grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
//       <div className="input-type">
//         <input
//           type="text"
//           onChange={setUserData}
//           name="lastname"
//           className="border w-full px-5 py-3 focus:outline-none rounded-md"
//           placeholder="Овог"
//         />
//       </div>
//       <div className="input-type">
//         <input
//           type="text"
//           onChange={setUserData}
//           name="firstname"
//           className="border w-full px-5 py-3 focus:outline-none rounded-md"
//           placeholder="Нэр"
//         />
//       </div>
//       <div className="input-type">
//         <input
//           type="text"
//           onChange={setUserData}
//           name="email"
//           className="border w-full px-5 py-3 focus:outline-none rounded-md"
//           placeholder="И-мэйл"
//         />
//       </div>
//       <div className="input-type">
//         <input
//           type="text"
//           onChange={setUserData}
//           name="phone"
//           className="border w-full px-5 py-3 focus:outline-none rounded-md"
//           placeholder="Утасны дугаар"
//         />
//       </div>

//       <button className="flex justify-center text-md w-2/8 bg-yellow-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 border-yellow-500 hover:text-yellow-500">
//         Update
//         <span className="px-1">
//           <BiBrush size={24} />
//         </span>
//       </button>
//     </form>
//   );
// }
