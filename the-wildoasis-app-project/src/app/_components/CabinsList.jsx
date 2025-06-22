import {Suspense} from 'react';
import {getCabins} from '@/app/_services/data-services'
import CabinCard from "@/app/_components/CabinCard";
import Spinner from '@/app/_components/Spinner'

export default async function CabinList({filter='all'}) {

  const cabins = await getCabins();

  // filter the cabin data
  const filteredData = filter !== 'all' ? cabins.filter( (cab) => {
    if (filter === 'small') {
      return cab.max_capacity > 1 && cab.max_capacity <= 3;
    }else if (filter === 'medium') {
      return cab.max_capacity > 3 && cab.max_capacity <= 7;
    }else if (filter === 'large') {
      return cab.max_capacity >= 8;
    }
  }) : cabins

  return (
      <div>
        <Suspense fallback={<Spinner />} key={filter}>
          {filteredData.length > 0 && (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
              {filteredData.map((cabin) => (
                <CabinCard cabin={cabin} key={cabin.id} />
              ))}
            </div>
          )}
        </Suspense>
      </div>
  )
}
