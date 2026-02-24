"use client";

import type { TCabin } from "@/_types/cabin";
import { useReservation } from "@/_components/ReservationContext";
import Image from "next/image";
import { differenceInDays } from "date-fns";
import { createReservationAction } from "@/_lib/actions";
import { useActionState, useEffect } from "react";
import { useToaster } from "./ToasterProvider";

type IProps = {
  cabin: TCabin;
  user: any;
};

function ReservationForm({ cabin, user }: IProps) {
  const { error } = useToaster();
  const { maxCapacity, regularPrice, discount } = cabin;
  const { range, resetRange } = useReservation();
  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(endDate as Date, startDate as Date);
  const cabinPrice = numNights * (regularPrice - discount);

  const reservationData = {
    cabinId: cabin.id,
    numNights,
    cabinPrice,
    startDate,
    endDate,
  };
  // useActionState会自动传入prevState和formData
  const createReservationWithData = (prevState: any, formData: FormData) =>
    createReservationAction(prevState, reservationData, formData);

  const [state, formAction, isPending] = useActionState(
    createReservationWithData,
    {
      success: "",
      err: "",
    },
  );
  useEffect(() => {
    if (state.err) {
      resetRange();
      error(state.err);
    }
  }, [state, error, resetRange]);

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
        action={formAction}
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
          {
            <button
              className="bg-accent-500 rounded-sm px-6 py-1 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
              disabled={isPending}
            >
              预定
            </button>
          }
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
