"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { zhCN } from "date-fns/locale";
import type { TSetting } from "@/_types/setting";
import type { TCabin } from "@/_types/cabin";
import { useReservation } from "./ReservationContext";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";

function isAlreadyBooked(
  range: { from: Date | undefined; to: Date | undefined },
  datesArr: Date[],
) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, {
        start: range.from as Date,
        end: range.to as Date,
      }),
    )
  );
}

type IProps = {
  bookedDates: Date[];
  settings: TSetting[];
  cabin: TCabin;
};

function DateSelector({ settings, bookedDates, cabin }: IProps) {
  const { range, setRange, resetRange } = useReservation();
  // 判断用户选择的日期是否包含已经选择的日期，冲突则清空
  const displayRange = isAlreadyBooked(range, bookedDates)
    ? { from: undefined, to: undefined }
    : range;
  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(range.to as Date, range.from as Date);
  const cabinPrice = numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength } = settings[0];

  return (
    <div className="grid-col-1/2 place-self-center">
      <DayPicker
        className="pt-12"
        mode="range"
        onSelect={(range) => setRange({ from: range?.from, to: range?.to })}
        selected={displayRange}
        min={minBookingLength}
        max={maxBookingLength}
        locale={zhCN}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 1, 0)}
        captionLayout="dropdown"
        numberOfMonths={1}
        // 禁选过去的日期和已经预定的日期
        disabled={(curDate) =>
          isPast(curDate) ||
          // 该月所有日期中只要和当前已预订的日期相同则禁用
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-18">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/ 每晚</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">共计</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            清除选择
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
