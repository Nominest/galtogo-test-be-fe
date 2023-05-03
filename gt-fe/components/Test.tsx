import { useEffect, useState } from "react";

interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
}

interface IReservation {
  _id: string;
  time: string;
  date: string;
  persons: number;
  user: IUser | null;
  status: string;
}

export default function Test(): JSX.Element {
  const [testUsers, setTestUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [reservations, setReservations] = useState<IReservation[]>([]);

  useEffect(() => {
    fetch("http://localhost:3030/user")
      .then((res) => res.json())
      .then((res) => setTestUsers(res));
  }, []);

  const addHandler = () => {
    const newTestUser: IUser = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      _id: "",
    };
    fetch("http://localhost:3030/user/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTestUser),
    })
      .then((res) => res.json())
      .then((res) => setTestUsers([...testUsers, res]));
  };

  const editHandler = () => {
    if (!selectedUser) {
      return;
    }

    const updatedTestUser: IUser = {
      ...selectedUser,
      firstName: firstNameInput,
      lastName: lastNameInput,
    };
    fetch(`http://localhost:3030/user/${selectedUser._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTestUser),
    })
      .then((res) => res.json())
      .then((res) => {
        const updatedUsers = testUsers.map((user) =>
          user._id === selectedUser._id ? res : user
        );
        setTestUsers(updatedUsers);
        setSelectedUser(null);
      });
  };

  const selectUser = (user: IUser) => {
    setSelectedUser(user);
    setFirstNameInput(user.firstName);
    setLastNameInput(user.lastName);
    fetch(`http://localhost:3030/reservation?user=${user._id}`)
      .then((res) => res.json())
      .then((res) =>
        setReservations(
          res.filter(
            (reservation: { user: { _id: string } }) =>
              reservation.user?._id === user._id
          )
        )
      );
  };

  const deleteHandler = (_id: string) => {
    fetch(`http://localhost:3030/user/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const updatedUsers = testUsers.filter((user) => user._id !== _id);
        setTestUsers(updatedUsers);
        setSelectedUser(null);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={firstNameInput}
        onChange={(e) => setFirstNameInput(e.target.value)}
        placeholder="First Name"
      />
      <input
        type="text"
        value={lastNameInput}
        onChange={(e) => setLastNameInput(e.target.value)}
        placeholder="Last Name"
      />
      {selectedUser ? (
        <div>
          <h3>
            Selected User:{" "}
            {`${selectedUser.firstName} ${selectedUser.lastName}`}
          </h3>
          <ul>
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <li key={reservation._id}>
                  {reservation.date} {reservation.time}, {reservation.persons}{" "}
                  persons, {reservation.status}
                </li>
              ))
            ) : (
              <li>No reservations found for selected user.</li>
            )}
          </ul>
          <button onClick={() => setSelectedUser(null)}>Clear selection</button>
        </div>
      ) : (
        <div>
          <button onClick={addHandler}>Add User</button>
          <button onClick={editHandler}>Edit User</button>
          <ul>
            {testUsers.map((user) => (
              <li key={user._id}>
                {user.firstName} {user.lastName}
                <button onClick={() => selectUser(user)}>Select</button>
                <button onClick={() => deleteHandler(user._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
