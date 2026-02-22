"use client";

import ReservationCard from "./ReservationCard";
import type { TBookings } from "@/_types/booking";
import { useOptimistic } from "react";
import { deleteReservationAction } from "@/_lib/actions";
import { useToaster } from "./ToasterProvider";

type IProps = {
  bookings: TBookings[];
};

function ReservationList({ bookings }: IProps) {
  const { error: toastError } = useToaster();
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    },
  );
  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    try {
      await deleteReservationAction(bookingId);
    } catch {
      toastError("删除失败，请稍后重试");
    }
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
