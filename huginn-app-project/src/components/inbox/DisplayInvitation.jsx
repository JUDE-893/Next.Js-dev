import { useQuery } from '@tanstack/react-query';
import { getInvitations } from '@/lib/contactServices';
import { Loader2 } from 'lucide-react';
import InvitationItem from './InvitationItem'
import {

  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

export default function DisplayInvitation() {
  console.log('preeeeeeeeeeeeeeeeeeeeeeeeeeeeeee-fetch');

  const {isLoading, data, error} = useQuery({
    queryKey: ['invitations'],
    queryFn: getInvitations
  })

  if( error ) return <p className='text-destructive text-md ml-10 mt-50'> Oops! Something went wrong. try later ..</p>

  if( isLoading ) return <Loader2 size={40} className="animate-spin text-primary ml-45 mt-50" />

  console.log('invitations', data);
  const {sent, recieved} = data?.invitations;
  console.log("SR",sent, recieved);

  return (
    <div className='px-2'>
      {
        !(sent?.length === 0 && recieved?.length === 0) ?

        <>
          {/* recieved */}
          { (recieved?.length > 0) && <div>
                                      <p className='my-2 mt-10 ml-2 text-muted-foreground'>For You</p>
                                      <DropdownMenuSeparator className='mt-2 mb-4 bg-card' />
                                      {console.log('nonono',recieved)}
                                      {recieved.map((inv, idn) => {
                                        console.log('inv', inv);
                                        return <InvitationItem invitation={inv}/>
                                      })}
                                    </div> }
          {/* sent */}
         { (sent?.length > 0) && <div>

                                <p className='my-2 mt-10 ml-2 text-muted-foreground'>Recently Sent</p>
                                <DropdownMenuSeparator className='mt-2 mb-4 bg-card' />
                                {sent.map((inv, idn) => {
                                  return <InvitationItem invitation={inv} type='sent'/>
                                })}
                               </div>}
        </>

        : <p className='text-muted-foreground text-md ml-10 mt-50 text-center italic'>Everything is quiet for now 🍃 <br/>Come later.</p>
      }
    </div>
  )
}
