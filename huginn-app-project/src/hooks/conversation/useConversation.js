import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createConversation, getConversations,  } from '@/lib/conversationServices';

export function useCreateConversation() {

  const {isPending,mutate, error} = useMutation({
    mutationFn: createConversation,
    onSuccess: (data) => toast("Success", {
           description: <p className='text-muted-foreground text-xs'>{data.message}</p>
        }),
    onError: (e) => toast("Fails", {
           description: <p className='text-destructive text-xs'>{e.message}!</p>
        })
  });
  return {isPending, mutate, error};
}

export function useGetConversations() {

  const {isLoading, data, error} = useQuery({
    queryKey: ['conversations'],
    queryFn: getConversations,
    staleTime: Infinity,
    onSuccess: (data) => toast("Success", {
           description: <p className='text-muted-foreground text-xs'>{data.message}</p>
        }),
    onError: (e) => toast("Fails", {
           description: <p className='text-destructive text-xs'>{e.message}!</p>
        })
  });
  return {isLoading, data, error};
}

const newMessage = function() {
  return (conv, data) =>  {
    return {...conv, lastMessage: data}
 }
}

export function updateCachedConversation(mutationFn) {
  const queryClient = useQueryClient();

  return (conv_id, data) => {
    queryClient.setQueryData(['conversations'], (old) => {

    // IF NO CONVERSATION EXISTS
    if (!old?.conversations) {
      return {...old, conversations: [{_id: data.conv_id, participants:[{participant: data.sender}], lastMessage: data, type: 'direct'}]}
    }

    // DELETE OLD ITEM FROM THE CACHED CONVERSATION
    let r = null;
    let conversations = old.conversations.filter((conv,index) => {
      if (conv._id === conv_id) {
        r = mutationFn(conv, data);
        return false
      }
      return true
    })

    // ADD THE NEW ITEM TO THE START OF THE CONVERSATIONS ARRAY
    if (r !== null) {
      conversations.unshift(r);
    }
    return {...old, conversations}
  });
 }
}

export function useNewConversationMessage() {
  return updateCachedConversation(newMessage())
}

// export function useGetConversation(id) {
//
//   const {isLoading, data, error} = useQuery({
//     queryKey: [id],
//     queryFn: getConversation,
//     staleTime: Infinity,
//     onSuccess: (data) => toast("Success", {
//            description: <p className='text-muted-foreground text-xs'>{data.message}</p>
//         }),
//     onError: (e) => toast("Fails", {
//            description: <p className='text-destructive text-xs'>{e.message}!</p>
//         })
//   });
//   return {isLoading, data, error};
// }
