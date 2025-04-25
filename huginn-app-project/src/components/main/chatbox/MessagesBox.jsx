'use client'
import { useState } from 'react'
// import {ScrollShadow} from "@heroui/react";
import MessageItem from './MessageItem';

import dynamic from 'next/dynamic';
const ScrollShadow = dynamic(
  () => import('@heroui/scroll-shadow').then((mod) => mod.ScrollShadow),
  { ssr: false }
);

const messages = [
  {
    id:'er234z9d235834b',
    contact: {
      name: "Jonnas Schmidtmann",
      id: "fe425d6de400p7",
      nameTag: "JS",
      profileImage: null,
      message: {content : 'That\'s good', time: "7:14"},
      status: "online"
    },
    time: '21:00',
    content: "hey Wassup !"
  },
  {
    id:'er234z9d235836b',
    contact: {
      name: "Margrette Robie",
      id: "fe4223r400pq1",
      nameTag: "JS",
      profileImage: null,
      message: {content : 'That\'s good', time: "7:14"},
      status: "online",
      color: "destructive"
    },
    time: '21:00',
    content: "giraro ma sight"
  },
  {
    id:'er234z9d235833b',
    contact: {
      name: "Jonnas Schmidtmann",
      id: "fe425d6de400p7",
      nameTag: "JS",
      profileImage: null,
      message: {content : 'That\'s good', time: "7:14"},
      status: "online",
      color: ''
    },
    time: '21:00',
    content: "What' ???"
  },
  {
    id:'er234z9d232834b',
    contact: {
      name: "Jonnas Schmidtmann",
      id: "fe425d6de400p7",
      nameTag: "JS",
      profileImage: null,
      message: {content : 'That\'s good', time: "7:14"},
      status: "online"
    },
    time: '21:00',
    content: "hey Wassup !"
  }
]

export default function MessagesBox({className}) {

  const [lastSender, setLastSender] = useState(null);
  let sender = lastSender;

  //  function that decides where the message component should show the user avatar is case of a new chat  <ls_id> : last sender id
  const isJoinMessage = (ls_id) => {
    let r = sender !== ls_id
    if (r) sender = ls_id
    return !r
    // To contenu : && message.date.month & dat & year == new date() => true
  }

  return (
    <ScrollShadow size={100} hideScrollBar className={"h-[80vh] flex-1"+className} >
      <div>
      {messages.map((msg) => <MessageItem isJoinMessage={isJoinMessage(msg.contact.id)} message={msg} /> )}
      </div>
    </ScrollShadow>


  )
}
