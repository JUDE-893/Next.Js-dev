import { useMutation, useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getMessages, sendMessage} from '@/lib/messagesServices';


export function useGetMessages(id,pageParam) {

    const {isLoading, data, error} = useQuery({
    queryKey: [id, pageParam],
    queryFn: () => getMessages(id, pageParam),
    staleTime: Infinity,
  });

  return {isLoading, data, error}
}

export function useSendMessage(id) {

  const {isPending,mutate, error} = useMutation({
    mutationFn: (payload) => sendMessage(id, payload),
    onSuccess: (data) => toast("Success", {
           description: <p className='text-muted-foreground text-xs'>{data.message}</p>
        }),
    onError: (e) => toast("Fails", {
           description: <p className='text-destructive text-xs'>{e.message}!</p>
        })
  });
  return {isPending, mutate, error};
}

const updateMessage = function() {
  return (messages, data) =>  {
    return messages.map((msg) => {
    if(msg._id === data.id) {
      return {...msg, ...data, id: undefined}
    }
    return msg
  })
 }
}

const newMessage = function() {
  return (messages, data) =>  {
    return [...messages, data]
 }
}

export function updateCachedMessages(mutationFn) {
  const queryClient = useQueryClient();

  return (conv_id, data, pageIndex=1) => {
    console.log("pageIndex",pageIndex);
    queryClient.setQueryData([conv_id, pageIndex], (old) => {

    if (!old?.messages?.length) {
      return {...old, messages: [data]}
    }

    let r = mutationFn(old.messages, data);
    return {...old, messages: r}

  });
 }
}

export function useNewMessage() {
  return updateCachedMessages(newMessage())
}

export function useUpdateMessage() {
  return updateCachedMessages(updateMessage())
}

//return {...page, messages: {...page.messages, [Object.keys(page.messages).length]: data}}
//
// old?.pages[0]?.messages?.unshift(data);
// return {...old}
