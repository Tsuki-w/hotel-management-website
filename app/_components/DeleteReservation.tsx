"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

type IProps = {
  bookingId: number;
  onDelete: (bookingId: number) => void;
};

function DeleteReservation({ bookingId, onDelete }: IProps) {
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    if (confirm("确定要删除吗？")) {
      startTransition(() => onDelete(bookingId));
    }
  };
  return (
    <button
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
      onClick={handleDelete}
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">删除</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
