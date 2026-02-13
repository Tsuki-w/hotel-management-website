import { getBooking, getCabin } from "@/_lib/data-service";
import { UpdatereservationForm } from "@/_components/UpdateReservationForm";

type IProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: IProps) {
  const { id } = await params;
  const reservationId = Number(id);
  const data = await getBooking(reservationId);
  const cabin = await getCabin(data.cabinId);
  const maxCapacity = cabin.maxCapacity;
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        更新预定 #{reservationId}
      </h2>
      <UpdatereservationForm
        reservationId={reservationId}
        maxCapacity={maxCapacity}
        data={data}
      />
    </div>
  );
}
