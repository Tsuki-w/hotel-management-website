"use client";

import type { TCabin } from "@/_lib/data-service";
import { useReservation } from "@/_components/ReservationContext";
import Image from "next/image";
import { differenceInDays } from "date-fns";
import { createReservationAction } from "@/_lib/actions";
import FormButton from "@/_components/FormButton";

type IProps = {
  cabin: TCabin;
  user: any;
};

function ReservationForm({ cabin, user }: IProps) {
  const { maxCapacity, regularPrice, discount } = cabin;
  const { range, resetRange } = useReservation();
  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(endDate as Date, startDate as Date);
  const cabinPrice = numNights * (regularPrice - discount);

  const reservationnData = {
    cabinId: cabin.id,
    numNights,
    cabinPrice,
    startDate,
    endDate,
  };

  return (
    <div className="h-full">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Image
            referrerPolicy="no-referrer"
            className="rounded-full"
            src={user.image}
            alt={user.name}
            width={32}
            height={32}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col h-full"
        action={async (formData) => {
          await createReservationAction(reservationnData, formData);
          resetRange();
        }}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">入住人数</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              请选择入住人数...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} 人
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">备注</label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="有其他特殊需求吗？"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">请选择入住日期</p>
          <FormButton text={"预定"} />
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
