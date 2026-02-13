export type TBooking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string | null;
  cabinId: number;
  guestId: number;
};

export type TBookings = Omit<
  TBooking,
  | "status"
  | "hasBreakfast"
  | "isPaid"
  | "observations"
  | "cabinPrice"
  | "extrasPrice"
> & {
  cabins: {
    name: string;
    image: string;
  };
};

export type TCreateReservationAction = Omit<
  TBooking,
  "id" | "created_at" | "startDate" | "endDate" | "observations"
> & {
  startDate: Date;
  endDate: Date;
  observations: string;
};

export type TUpdateBooking = {
  numGuests: number;
  observations: string;
};
