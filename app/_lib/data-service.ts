import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

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

export type TCabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
};
export const getCabins = unstable_cache(
  async function (): Promise<TCabin[]> {
    const { data, error } = await supabase
      .from("cabins")
      .select("id, name, maxCapacity, regularPrice, discount, image")
      .order("name");

    if (error) {
      console.error(error);
      throw new Error("Cabins could not be loaded");
    }

    return data;
  },
  ["cabins"], // 缓存标识符
  {
    revalidate: 3600,
    tags: ["cabins"],
  },
);

export type TGuest = {
  id: number;
  created_at: string;
  fullName: string;
  email: string;
  nationalID: string;
  nationality: string;
  countryFlag: string;
};
export async function getGuest(email: string): Promise<TGuest> {
  const { data } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not get loaded");
  }

  return data;
}

export type TBooking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  guestId: number;
  cabinId: number;
  cabins: {
    name: string;
    image: string;
  };
};
export async function getBookings(guestId: number): Promise<TBooking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)",
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
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
    throw new Error("Bookings could not get loaded");
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

export type TSetting = {
  breakfastPrice: number;
  created_at: string;
  id: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  minBookingLength: number;
};
export async function getSettings(): Promise<TSetting[]> {
  const { data, error } = await supabase.from("settings").select("*");

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
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
    throw new Error("Could not fetch countries");
  }
}

type TCreateGuest = {
  email: string;
  fullName: string;
};
export async function createGuest(newGuest: TCreateGuest) {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}
type TCreateReservationAction = {
  cabinId: number;
  numNights: number;
  cabinPrice: number;
  startDate: Date | undefined;
  endDate: Date | undefined;
  guestId: number;
  numGuests: number;
  observations: string;
  extrasPrice: number;
  totalPrice: number;
  isPaid: boolean;
  hasBreakfast: boolean;
  status: string;
};
export async function createBooking(newBooking: TCreateReservationAction) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}

type TUpdateGuest = {
  nationalID: string;
  nationality: string;
  countryFlag: string;
};
export async function updateGuest(id: number, updatedFields: TUpdateGuest) {
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  return data;
}

type UpdateBooking = {
  numGuests: number;
  observations: string | undefined;
};
export async function updateBooking(id: number, updatedFields: UpdateBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id: number) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
