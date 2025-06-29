
import { memo } from 'react';
import MessageText from './MessageText'
import MessageContextMenu from './MessageContextMenu'

export default memo(function MessageItem(props) {


  let Compo;
  const {message} = props;
  if (message?.content?.media?.type === 'call') {
    Compo = () => <p>📲 THIS IS A CALL</p>
  }
  else { // TEXT
    Compo = MessageText;
  }

  return (
    <MessageContextMenu  key={message?._id} id={message?._id} >
      <Compo {...props} />
    </MessageContextMenu >
  )
}, isNotUpdatedMessage)


function isNotUpdatedMessage(oldProps, newProps) {
  return oldProps.message?.updatedAt === newProps.message?.updatedAt;
}
