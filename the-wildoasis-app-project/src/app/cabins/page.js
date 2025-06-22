// import Image from 'next/image';
import CabinsList from "@/app/_components/CabinsList";
import Filter from "@/app/_components/Filter";


export const metadata = {
  title: 'Cabins',
  description: 'Expolore the most luxurious wooden cabins in the hearth of the raw european nature.',
}


export default function Page({searchParams}) {

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>
      <div className='flex justify-end mb-6'>
        <Filter filter={searchParams?.capacity} />
      </div>
      <CabinsList filter={searchParams?.capacity} />
    </div>
  )
}
