
import { memo } from 'react';
import { timeFormat } from '@/lib/utils';
import MessageText from './MessageText'
import MessageCall from './MessageCall'
import MessageContextMenu from './MessageContextMenu'
import Contact from '@/components/main/contact/Contact';


export default memo(function MessageItem(props) {

  let Compo;
  const {message} = props;
  if (message?.content?.media?.type === 'call') {
    Compo = MessageCall
  }
  else { // TEXT
    Compo = MessageText;
  }

  return (
    <MessageContextMenu >
      <Compo {...props} key={message?.id}>
        {!props.isJoinMessage && <Contact className={`text-${message.sender.color} mt-3 text-[14.4px] `}contact={message.sender} sideChild={
          <p className='text-xs text-muted ml-3 mt-1'>{timeFormat(message.createdAt)}</p>}
        >
        </Contact>}
      </Compo>
    </MessageContextMenu >
  )
}, isNotUpdatedMessage)


function isNotUpdatedMessage(oldProps, newProps) {
  return oldProps.message?.updatedAt === newProps.message?.updatedAt;
}
