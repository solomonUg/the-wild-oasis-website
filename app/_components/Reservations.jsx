import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';


export default async function Reservations({cabinData}) {

const [settings, bookedDates] = await Promise.all([getSettings(), getBookedDatesByCabinId(cabinData.id)])

  return (
    <div className="my-12 border border-primary-800">
          <DateSelector settings={settings} cabin={cabinData} bookedDates={bookedDates}/>
          <ReservationForm cabin={cabinData}/>
    </div>
  )
}
