import Contact from '@/components/main/Contact'
import DateSeparator from '@/components/main/chatbox/DateSeparator'

export default function MessageItem({className, message, isJoinMessage}) {
  return (
    <div className="">

      {!isJoinMessage && <Contact className={`text-${message.contact.color} mt-3 text-[14.4px] `}contact={message.contact} sideChild={
        <p className='text-xs text-muted ml-3 mt-1'>{message.time}</p>
      }>
      </Contact>}
      <div className=' text-muted-foreground text-[13.4px] mt-[-3px] pl-2 ml-2 border-rigth-1 hover:bg-secondary py-1 radius-1'>{message.content}</div>
    </div>
  )
}
