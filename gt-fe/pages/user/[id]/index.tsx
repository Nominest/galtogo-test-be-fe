import { IUser } from "@/util/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function User(): JSX.Element {
  const { query } = useRouter();
  const [users, setUsers] = useState<IUser | null>(null);

  useEffect(() => {
    if (query.id) {
      fetch(`http://localhost:3000/user/${query.id}`)
        .then((res) => res.json())
        .then((res) => setUsers(res));
    }
  }, [query.id]);

  return (
    <div>
      ID: {query._id}
      <div className="text-white-600">
        {users && (
          <>
            <h2>{users.firstName}</h2>
            <p>{users.lastName}</p>
            <p>{users.email}</p>
            <p>{users.phone}</p>
          </>
        )}
      </div>
    </div>
  );
}
// export default function handler(req, res) {
//   const { id } = req.query;
//   if (req.method === "DELETE") {
//     res.end(`Category: ${id}`);
//   }
// }
