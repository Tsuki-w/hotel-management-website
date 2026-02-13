import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import type { TCabin } from "@/_types/cabin";
import type { TGuest, TCreateGuest, TUpdateGuest } from "@/_types/guest";
import type {
  TBooking,
  TBookings,
  TCreateReservationAction,
  TUpdateBooking,
} from "@/_types/booking";
import type { TSetting } from "@/_types/setting";

export async function getCabin(id: number) {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getCabinPrice(id: number) {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export const getCabins = unstable_cache(
  async function (): Promise<TCabin[]> {
    const { data, error } = await supabase
      .from("cabins")
      .select("id, name, maxCapacity, regularPrice, discount, image")
      .order("name");

    if (error) {
      console.error(error);
      throw new Error("加载房间数据失败");
    }

    return data;
  },
  ["cabins"], // 缓存标识符
  {
    revalidate: 3600,
    tags: ["cabins"],
  },
);

export async function getGuest(email: string): Promise<TGuest> {
  const { data } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

export async function getBooking(id: number): Promise<TBooking> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("加载预订数据失败");
  }

  return data;
}

export async function getBookings(guestId: number): Promise<TBookings[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)",
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("加载预订数据失败");
  }

  return data.map((booking) => ({
    ...booking,
    cabins: Array.isArray(booking.cabins) ? booking.cabins[0] : booking.cabins,
  }));
}

export async function getBookedDatesByCabinId(
  cabinId: number,
): Promise<Date[]> {
  let today = new Date() as any;
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("加载预订数据失败");
  }

  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings(): Promise<TSetting[]> {
  const { data, error } = await supabase.from("settings").select("*");

  if (error) {
    console.error(error);
    throw new Error("加载设置失败");
  }

  return data;
}

type TCountry = {
  name: string;
  flag: string;
  independent: boolean;
};
export async function getCountries(): Promise<TCountry[]> {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag",
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("无法获取国家列表");
  }
}

export async function createGuest(newGuest: TCreateGuest) {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("创建客人失败");
  }

  return data;
}

export async function createBooking(newBooking: TCreateReservationAction) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("创建预订失败");
  }

  return data;
}

export async function updateGuest(id: number, updatedFields: TUpdateGuest) {
  // console.log(updatedFields);
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("更新客人信息失败");
  }
  return data;
}

export async function updateBooking(id: number, updatedFields: TUpdateBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("更新预订失败");
  }
  return data;
}

export async function deleteBooking(id: number) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("删除预订失败");
  }
  return data;
}
