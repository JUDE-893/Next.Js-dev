'use client'

import { useParams } from 'next/navigation';
import { useGetConversations } from '@/hooks/conversation/useConversation';
import { useNewMessage } from '@/hooks/conversation/useMessage';
import { useNewConversationMessage } from '@/hooks/conversation/useConversation';
import { useSocketEvent } from '@/hooks/socket/useSocketEvent';
import { useUpdateMessage } from '@/hooks/conversation/useMessage';

// import MessagesBox from "@/components/main/chatbox/MessagesBox"
import MessageContainer from "@/components/main/chatbox/messages/MessageContainer"
import Header from "@/components/main/chatbox/Header"
import EntryFields from "@/components/main/chatbox/EntryFields"
import ReportInterface from "@/components/ui/custom/ReportInterface"


export default function Home({children}) {

  const params = useParams();
  const {data, isLoading, error} = useGetConversations()
  const setNewMessage = useNewMessage();
  const setNewConversationMessage = useNewConversationMessage();
  const setUpdatedMessage = useUpdateMessage();

  const socketEvent = useSocketEvent('new-message',
  // on new-message Event
  (data) => {
    let msgData = JSON.parse(data);
    msgData = JSON.parse(msgData);
    console.log('{new-message data}',msgData);
    setNewMessage(msgData.conv_id, msgData);
    setNewConversationMessage(msgData.conv_id, msgData);
  },
  // on Aknowlege new-message event
   (resp) => {
     let data = JSON.parse(resp);
     console.log('"resp"', data);
     setUpdatedMessage(data?.conv_id, data?.data, 1)

   }
);


  // error handing
  if (error) return <ReportInterface image='/monitor_ypga.svg' message={<p className='italic'>Oops! Something went wrong.. Try again.</p>}/>;

  // get the destinater
  let destinator = data?.conversations?.filter((conv) => conv?._id === params.conversationID)?.[0]?.participants?.[0]?.participant;

  // check if valid conversation id
  if (!destinator) return <ReportInterface orn='horizental' image='/new-message_nl8w.svg' message={<p className='w-56 text-primary italic'>"Like the wandering thoughts of wisdom and memory, let ideas take flight. Seek, share, and bring knowledge back from the horizons."</p>}/>;

  return (
    <div className="flex flex-col w-full ml-0 px-0 min-h-screen font-[family-name:var(--font-geist-sans)] relative">
      <Header contact={destinator} className=" absolute top-0" />
      <main className="flex-1 pt-20">
        {/* messages box */}
        <MessageContainer conv_id={params.conversationID}  />
      </main>
      {/* entry box */}
      <EntryFields className=" absolute bottom-0" conv_id={params.conversationID} socketEvent={socketEvent}/>
    </div>
  );
}
