import {getSettings,getBookedDatesByCabinId} from '@/app/_services/data-services'
import DateSelector from './DateSelector'
import ReservationForm from './ReservationForm'

export default async function Reservation ({cabin}) {
  
  const settingsPromise = getSettings();
  const bookedDatesPromise = getBookedDatesByCabinId(cabin.id);
  const [settings, bookedDates] = await Promise.all([settingsPromise, bookedDatesPromise])
  return (
    <div class='grid grid-cols-2 border border-primary-800'>
      <DateSelector cabin={cabin} settings={settings} bookedDates={bookedDates} />
      <ReservationForm cabin={cabin} />
    </div>
  )
}
