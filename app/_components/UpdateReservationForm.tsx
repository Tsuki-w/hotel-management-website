"use client";

import { updateReservationAction } from "@/_lib/actions";
import type { TBooking } from "@/_types/booking";
import { useActionState, useEffect } from "react";
import { useToaster } from "./ToasterProvider";

type IProps = {
  reservationId: number;
  maxCapacity: number;
  data: TBooking;
};

export function UpdatereservationForm({
  reservationId,
  maxCapacity,
  data,
}: IProps) {
  const { success, error } = useToaster();
  const updateReservationWithData = (prevState: any, formData: FormData) =>
    updateReservationAction(prevState, reservationId, formData);
  const [state, formAction, isPending] = useActionState(
    updateReservationWithData,
    {
      success: "",
      err: "",
    },
  );
  useEffect(() => {
    if (state.success) {
      success(state.success);
    }
    if (state.err) {
      error(state.err);
    }
  }, [state, success, error]);
  return (
    <form
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      action={formAction}
    >
      <div className="space-y-2">
        <label htmlFor="numGuests">人数</label>
        <select
          name="numGuests"
          id="numGuests"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          required
          defaultValue={data?.numGuests.toString()}
          key={data?.numGuests}
        >
          <option value="" key="default">
            选择人数...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
            <option value={x.toString()} key={x}>
              {x}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">备注</label>
        <textarea
          name="observations"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultValue={data.observations || ""}
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <button
          className="bg-accent-500 rounded-sm px-6 py-1 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
          disabled={isPending}
        >
          确认修改
        </button>
      </div>
    </form>
  );
}
