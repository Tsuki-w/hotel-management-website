import DateSelector from "@/_components/DateSelector";
import ReservationForm from "@/_components/ReservationForm";
import { getBookedDatesByCabinId } from "@/_lib/data-service";
import type { TSetting } from "@/_types/setting";
import type { TCabin } from "@/_types/cabin";
import { auth } from "@/_lib/auth";
import LoginMessage from "@/_components/LoginMessage";

type IProps = {
  cabin: TCabin;
  settings: TSetting[];
};

export default async function Reservation({ cabin, settings }: IProps) {
  const bookedDates = await getBookedDatesByCabinId(cabin.id);
  const session = await auth();
  return (
    <div className="grid grid-cols-2 border border-primary-800">
      <DateSelector
        bookedDates={bookedDates}
        settings={settings}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session?.user} />
      ) : (
        <LoginMessage cabinId={cabin.id} />
      )}
    </div>
  );
}
