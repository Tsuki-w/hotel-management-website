import { auth } from "@/_lib/auth";
import { getBookings } from "@/_lib/data-service";
import ReservationList from "@/_components/ReservationList";
import { Suspense } from "react";
import Spinner from "@/_components/Spinner";

export const metadata = {
  title: "预约管理",
};

export default async function Page() {
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">所有预约</h2>

      <Suspense fallback={<Spinner />}>
        <ReservationListFetcher />
      </Suspense>
    </div>
  );
}

async function ReservationListFetcher() {
  const session = await auth();
  const bookings = await getBookings(Number(session?.user?.id));
  return bookings.length === 0 ? (
    <p className="text-lg">您目前没有预约</p>
  ) : (
    <ReservationList bookings={bookings} />
  );
}
