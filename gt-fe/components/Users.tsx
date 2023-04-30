// import { IUser } from "@/util/user";
// import { useState, useEffect } from "react";
// import UserComponent from "./subcomponent/User";

// export default function Users() {
//   const [users, setUsers] = useState<IUser[]>([]);

//   useEffect(() => {
//     fetch("http://localhost:3000/user")
//       .then((response) => response.json())
//       .then((data) => setUsers(data));
//   }, []);

//   return (
//     <div>
//       {users.map((user) => (
//         <UserComponent key={user._id} user={user} />
//       ))}
//     </div>
//   );
// }
