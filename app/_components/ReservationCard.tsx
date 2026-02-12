import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, isPast } from "date-fns";
import { zhCN } from "date-fns/locale";
import Image from "next/image";
import type { TBooking } from "@/_lib/data-service";
import DeleteReservation from "@/_components/DeleteReservation";

type IProps = {
  booking: TBooking;
  onDelete: (bookingId: number) => void;
};

function ReservationCard({ booking, onDelete }: IProps) {
  const {
    id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="flex border border-primary-800">
      <div className="relative h-32 aspect-square">
        <Image
          src={image}
          alt={`房间 ${name}`}
          fill
          className="object-cover border-r border-primary-800"
        />
      </div>

      <div className="grow px-6 py-3 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            房间 {name} / {numNights}晚
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              已完成
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              待确认
            </span>
          )}
        </div>

        <p className="text-lg text-primary-300">
          {format(new Date(startDate), "yyyy年M月d日 EEEE", { locale: zhCN })}至
          {format(new Date(endDate), "yyyy年M月d日 EEEE", {
            locale: zhCN,
          })}
        </p>

        <div className="flex gap-5 mt-auto items-baseline">
          <p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
          <p className="text-primary-300">&bull;</p>
          <p className="text-lg text-primary-300">{numGuests} 人</p>
          <p className="ml-auto text-sm text-primary-400">
            预约时间：
            {format(new Date(created_at), "yyyy年M月d日 EEEE, p", {
              locale: zhCN,
            })}
          </p>
        </div>
      </div>

      {!isPast(startDate) && (
        <div className="flex flex-col border-l border-primary-800 w-25">
          <a
            href={`/account/reservation/edit/${id}`}
            className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
          >
            <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
            <span className="mt-1">编辑</span>
          </a>
          <DeleteReservation bookingId={id} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
}

export default ReservationCard;
