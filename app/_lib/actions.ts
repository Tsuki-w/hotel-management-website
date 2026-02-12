"use server";

import { signIn, signOut, auth } from "@/_lib/auth";
import {
  updateGuest,
  deleteBooking,
  getBookings,
  updateBooking,
  createBooking,
} from "./data-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signInAction(callbackUrl: string) {
  await signIn("github", { redirectTo: callbackUrl || "/" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfileAction(formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error("您必须先登录才能更新您的个人信息");
  }
  const nationalID = formData.get("nationalID")!.toString();
  const [nationality, countryFlag] = formData
    .get("nationality")!
    .toString()
    .split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("您的国家/地区 ID 必须为 6-12 个字符");
  }
  const updatedGuest = {
    nationalID,
    nationality,
    countryFlag,
  };
  // console.log(updatedGuest);
  try {
    await updateGuest(Number(session?.user?.id), updatedGuest);
    // 清除特定路径的服务端数据缓存，并在 Server Action 返回时，立即通知客户端重新获取该路径的最新数据
    revalidatePath("/account/profile");
  } catch (error) {
    console.log(error);
    throw new Error("Guest could not be updated");
  }
}

export async function deleteReservationAction(reservationId: number) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in to delete a reservation");
  }
  try {
    const bookings = await getBookings(Number(session?.user?.id));
    const bookingIds = bookings.map((booking) => booking.id);
    if (!bookingIds.includes(reservationId)) {
      throw new Error("You are not authorized to delete this reservation");
    }
    await deleteBooking(reservationId);
    revalidatePath("/account/reservation");
  } catch (error) {
    console.log(error);
    throw new Error("Booking could not be deleted");
  }
}

export async function updateReservationAction(
  reservationId: number,
  formData: FormData,
) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in to update a reservation");
  }
  try {
    const bookings = await getBookings(Number(session?.user?.id));
    const bookingIds = bookings.map((booking) => booking.id);
    if (!bookingIds.includes(reservationId)) {
      throw new Error("You are not authorized to update this reservation");
    }
    const updateData = {
      numGuests: Number(formData.get("numGuests")),
      observations: formData.get("observations")!.toString(),
    };
    await updateBooking(reservationId, updateData);
    revalidatePath(`/account/reservation/edit/${reservationId}`);
    // console.log(formData);
  } catch (error) {
    console.log(error);
    throw new Error("Reservation could not be updated");
  }
}

export async function createReservationAction(
  reservationData: {
    cabinId: number;
    numNights: number;
    cabinPrice: number;
    startDate: Date | undefined;
    endDate: Date | undefined;
  },
  formData: FormData,
) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in to create a reservation");
  }
  // console.log(reservationData, formData);
  const newReservation = {
    ...reservationData,
    guestId: Number(session?.user?.id),
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")!.toString(),
    extrasPrice: 0,
    totalPrice: reservationData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  // console.log(newReservation);
  try {
    await createBooking(newReservation);
    revalidatePath(`/cabins/${newReservation.cabinId}`);
  } catch (error) {
    console.log(error);
    throw new Error("Booking could not be created");
  }
  redirect("/thankyou");
}
