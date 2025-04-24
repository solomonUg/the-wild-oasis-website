import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

export default async function Reservations({ cabinData }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabinData.id),
  ]);

     const session = await auth()

  return (
    <div className="my-12 border border-primary-800">
      <DateSelector
        settings={settings}
        cabin={cabinData}
        bookedDates={bookedDates}
      />
      { session?.user? <ReservationForm cabin={cabinData} user={session.user} />: <LoginMessage/>}
    </div>
  );
}
