import { IReservation } from "@/util/user";
import { useEffect, useState } from "react";

export default function UserReservation(): JSX.Element {
  const [reservationUsers, setReservationUsers] = useState<
    IReservation[] | null
  >(null);

  useEffect(() => {
    fetch("http://localhost:3000/reservation")
      .then((res) => res.json())
      .then((res) => setReservationUsers(res));
  }, []);

  return (
    <>
      <div>User Reservation</div>
      {reservationUsers &&
        reservationUsers.map((reservationUser: IReservation, i: number) => (
          <div key={i}>
            <div>{reservationUser.date}</div>
          </div>
        ))}
    </>
  );
}
