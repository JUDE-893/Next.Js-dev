'use client'

import {usePathname,useRouter} from 'next/navigation';



export default function Filter({filter}) {


  const pathname = usePathname();
  const router = useRouter();

  // function that handles updating the url param with the selected the filter value
  function handleSelectFilter (val) {
    const params = new URLSearchParams();
    params.set('capacity',val)
    // window.location.replace(`${pathname}?${params}`)
    router.replace(`${pathname}?${params}`)
  }
  console.log('filter', filter);
  return (
    <div className='border border-primary-800'>
      <Button filter={'all'} active={'all' === filter} handleSelectFilter={handleSelectFilter}>
        All cabins
      </Button>
      <Button filter={'small'} active={'small' === filter} handleSelectFilter={handleSelectFilter}>
        1 - 3
      </Button>
      <Button filter={'medium'} active={'medium' === filter} handleSelectFilter={handleSelectFilter}>
        4 - 7
      </Button>
      <Button filter={'large'} active={'large' === filter} handleSelectFilter={handleSelectFilter}>
        8 - more
      </Button>
    </div>
  )
}

function Button ({children, filter, active, handleSelectFilter}) {
  console.log(active , filter, active === filter);
  return (
    <button className={`py-3 px-6 hover:bg-primary-700 ${active ? ' bg-primary-700': ''}`} onClick={() => handleSelectFilter(filter)}>
      {children}
    </button>
)
}
