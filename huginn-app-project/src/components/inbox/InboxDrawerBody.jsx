import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { TabsContent } from "@/components/ui/tabs"
import { getInvitations } from '@/lib/contactServices'
import DisplayInvitation from './DisplayInvitation';

export default function InboxDrawerBody() {

  const queryClient = useQueryClient();

  // pre-fetch the invitation & othor
  useEffect(() => {
    queryClient.prefetchQuery({queryKey: ['invitations'], queryFn: getInvitations})
  },[]);

  return (
    <>
      <TabsContent value="for-you">Notifications for-you here.</TabsContent>
      <TabsContent value="invitations"><DisplayInvitation /></TabsContent>
    </>
  )
}
