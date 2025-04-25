import AlertDialog from "@/components/ui/custom/AlertDialog";
import Combobox from "@/components/ui/custom/Combobox";

export default function ComboModal({children, listElement, label ,callBack, className}) {

  return (
    <AlertDialog className={className} label={label}
      callBack={() => console.log('combo modal')}
      message={
        <Combobox className='bg-background'>{listElement}</Combobox>
      }
      >
      {children}
    </AlertDialog>
  )
}
