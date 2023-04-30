import { IReservation } from "@/util/user";

interface UserReservationProps {
  reservations: IReservation[];
  selectedReservationDate: string | null;
}

export default function UserReservation({
  reservations,
  selectedReservationDate,
}: UserReservationProps): JSX.Element {
  return (
    <div className="my-3 p-2 grid md:grid-cols-11 items-center justify-between cursor-pointer text-center hover:bg-gray-200">
      <div className="col-span-2">
        {selectedReservationDate || "No reservations"}
      </div>
    </div>
  );
}
