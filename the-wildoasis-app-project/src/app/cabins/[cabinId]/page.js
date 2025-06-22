import {Suspense} from 'react';
import {getCabin,getCabins} from '@/app/_services/data-services'
import Reservation from "@/app/_components/Reservation";
import Cabin from "@/app/_components/Cabin";
import Spinner from '@/app/_components/Spinner'


export const metadata = {
  title: 'Cabins',
  description: 'Expolore the most luxurious wooden cabins in the hearth of the raw european nature.',
}


// PLACEHOLDER DATA
// const cabin = {
//   id: 89,
//   name: "001",
//   maxCapacity: 2,
//   regularPrice: 250,
//   discount: 0,
//   description:
//     "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
//   image:
//     "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg",
// };

// trigger static generation for a dynamic generated route
export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cab) => {return {cabinId: String(cab.id)}});
  return ids
}

export default async function Page({params}) {
  console.log(params);
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
    <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center text-accent-400 pt-20 mt-12 p mb-12">
          Reserve today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
