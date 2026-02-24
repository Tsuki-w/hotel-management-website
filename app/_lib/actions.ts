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

export async function signInAction(
  prevState: any,
  formData: FormData,
  callbackUrl: string,
) {
  try {
    await signIn("github", { redirectTo: callbackUrl || "/" }); // 自动识别相对路径然后拼接为绝对路径进行跳转
    return {
      err: "",
      success: "登录成功",
    };
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") {
      throw error;
    } else {
      return {
        success: "",
        err: "登录失败",
      };
    }
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfileAction(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session) {
    return {
      err: "您必须先登录才能更新您的个人信息",
      success: "",
    };
  }
  const guestId = Number(session.user?.id);
  const nationalID = formData.get("nationalID")!.toString();
  const [nationality, countryFlag] = formData
    .get("nationality")!
    .toString()
    .split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    return {
      err: "您的国家/地区 ID 必须为 6-12 个字符",
      success: "",
    };
  }
  const updatedGuest = {
    nationalID,
    nationality,
    countryFlag,
  };
  // console.log(updatedGuest);
  try {
    await updateGuest(guestId, updatedGuest);
    // 清除特定路径的服务端数据缓存，并在 Server Action 返回时，立即通知客户端重新获取该路径的最新数据
    revalidatePath("/account/profile");
    return {
      err: "",
      success: "更新成功",
    };
  } catch (error) {
    console.log(error);
    return {
      err: "更新失败",
      success: "",
    };
  }
}

export async function deleteReservationAction(reservationId: number) {
  const session = await auth();
  if (!session) {
    throw new Error("您必须先登录才能删除预订");
  }
  try {
    const bookings = await getBookings(Number(session?.user?.id));
    const bookingIds = bookings.map((booking) => booking.id);
    if (!bookingIds.includes(reservationId)) {
      throw new Error("您没有权限删除此预订");
    }
    await deleteBooking(reservationId);
    revalidatePath("/account/reservation");
  } catch (error) {
    console.log(error);
    throw new Error("删除失败");
  }
}

export async function updateReservationAction(
  prevState: any,
  reservationId: number,
  formData: FormData,
) {
  const session = await auth();
  if (!session) {
    return {
      err: "您必须先登录才能修改预订",
      success: "",
    };
  }
  try {
    const bookings = await getBookings(Number(session?.user?.id));
    const bookingIds = bookings.map((booking) => booking.id);
    if (!bookingIds.includes(reservationId)) {
      return {
        err: "您没有权限修改此预订",
        success: "",
      };
    }
    const updateData = {
      numGuests: Number(formData.get("numGuests")),
      observations: formData.get("observations")!.toString(),
    };
    await updateBooking(reservationId, updateData);
    revalidatePath(`/account/reservation/edit/${reservationId}`);
    return {
      err: "",
      success: "修改成功",
    };
  } catch (error) {
    console.log(error);
    return {
      err: "修改失败",
      success: "",
    };
  }
}

export async function createReservationAction(
  prevState: any,
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
    return {
      err: "您必须先登录才能预定",
      success: "",
    };
  }
  if (!reservationData.startDate || !reservationData.endDate) {
    return {
      err: "您必须选择开始日期和结束日期",
      success: "",
    };
  }
  // console.log(reservationData, formData);
  const newReservation = {
    ...reservationData,
    // 手动转换为UTC时间避免时区差异导致的问题
    startDate: new Date(reservationData.startDate.setHours(12, 0, 0, 0)),
    endDate: new Date(reservationData.endDate.setHours(12, 0, 0, 0)),
    guestId: Number(session?.user?.id),
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")!.toString(),
    extrasPrice: 0,
    totalPrice: reservationData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  console.log(newReservation);
  try {
    await createBooking(newReservation);
    revalidatePath(`/cabins/${newReservation.cabinId}`);
  } catch (error) {
    console.log(error);
    return {
      err: "预定失败",
      success: "",
    };
  }
  redirect("/thankyou");
}
