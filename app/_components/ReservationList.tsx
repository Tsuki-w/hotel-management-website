"use client";

import ReservationCard from "./ReservationCard";
import type { TBooking } from "@/_lib/data-service";
import { useOptimistic } from "react";
import { deleteReservationAction } from "@/_lib/actions";

type IProps = {
  bookings: TBooking[];
};

function ReservationList({ bookings }: IProps) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    },
  );
  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteReservationAction(bookingId);
  }
  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
