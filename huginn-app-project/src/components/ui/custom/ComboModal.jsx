import * as React from "react";
import AlertDialog from "@/components/ui/custom/AlertDialog";
import Combobox from "@/components/ui/custom/Combobox";


const labels = [
  {
    name: "Jonnas Schmidtmann",
    id: "fe425d6de000p7",
    nameTag: "JS",
    profileImage: null,
    message: {content : 'That\'s good', time: "7:14"},
    status: "online",
    userSlag: '@jonas_schmidtmann'
  },
  {
    name: "Jonnas Schmidtmann",
    id: "fe425d6dp400p7",
    nameTag: "JS",
    profileImage: null,
    message: {content : 'That\'s good', time: "7:14"},
    status: "online",
    userSlag: '@jonas_schmidtmann'
  },
  {
    name: "Jonnas Schmidtmann",
    id: "fe425d6de400p8",
    nameTag: "JS",
    profileImage: null,
    message: {content : 'That\'s good', time: "7:14"},
    status: "online",
    userSlag: '@jonas_schmidtmann'
  },
  {
    name: "Jonnas Schmidtmann",
    id: "fe425d6de40097",
    nameTag: "JS",
    profileImage: null,
    message: {content : 'That\'s good', time: "7:14"},
    status: "online",
    userSlag: '@jonas_schmidtmann'
  }
];

export default function ComboModal({ children,
                                     listElement,
                                     label,
                                     callBack,
                                     className,
                                     type='multiple',
                                     useResource, useAction}) {

  const [selected, setSelected] = React.useState([])
  const {isLoading, data, error} = useResource()
  const {isPending, mutate} = useAction()

  // function that handles collecting the user selection
  const handleSelect = () => {

    if (type=== 'multiple') return (value) => {
      console.log(selected);
      if (selected.includes(value)) {
        let labs = selected.filter((sel) => sel !== value )
        setSelected([...labs])
      }else {
        setSelected([...selected, value]);
      }
    }

    return (value) => {
      console.log(selected);
      setSelected(value);
    }
  }

  // function that handles submition action
  const handleSubmit = () => {
    if (!Boolean(selected?.length)) return null;
    let payload;

    if (type !== 'multiple') {
      payload = selected.split('-')[1];
    }
    mutate(payload)
  }

  return (
    <AlertDialog className={className} label={label}
      callBack={handleSubmit}
      trigger={children}
      pending={isPending}
      disabled={!Boolean(selected?.length)}
      >

      <Combobox className='bg-background' type={type} labels={data?.relations} handleSelect={handleSelect} >{listElement}</Combobox>
    </AlertDialog>
  )
}
