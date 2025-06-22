import SideBarre from '@/app/_components/SideNavigation';


export default function Layout({children}) {

  return (
    <div className="grid grid-cols-3 size-auto gap-5 w-full">
      <SideBarre className="col-start-1 col-end-1  " />
      <div className="col-end-4 col-span-2">{children}</div>
    </div>
  )
}
