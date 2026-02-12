import FormButton from "@/_components/FormButton";
import { updateReservationAction } from "@/_lib/actions";
import { getBooking, getCabin } from "@/_lib/data-service";

type IProps = {
  id: string;
};

export default async function Page({ params }: { params: Promise<IProps> }) {
  const { id } = await params;
  const reservationId = Number(id);
  const data = await getBooking(reservationId);
  const cabin = await getCabin(data.cabinId);
  const maxCapacity = cabin.maxCapacity;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        更新预定 #{reservationId}
      </h2>

      <form
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
        action={updateReservationAction.bind(null, reservationId)}
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
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">备注</label>
          <textarea
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={data?.observations}
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <FormButton text="更新预定" />
        </div>
      </form>
    </div>
  );
}
