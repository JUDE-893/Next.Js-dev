import { useMutation, useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getMessages, sendMessage} from '@/lib/messagesServices';


export function useGetMessages(id) {

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey: [id],
    queryFn: ({ pageParam }) => getMessages(id, pageParam),
    staleTime: Infinity,
    initialPageParam: null,
    getNextPageParam: (lastPage) => {console.log('Last in , last out', lastPage); return lastPage.messages?.[-1]?._id}
  });

  return {data, fetchNextPage, hasNextPage, isFetchingNextPage}
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
    if(msg._id = data.vol_id) {
      return data._doc
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

  return (conv_id, data) => {
    queryClient.setQueryData([conv_id], (old) => {
    if (!old?.pages?.length) {
      return {...old, pages: [{messages: [data]}]}
    }
    return {...old,
      pages: old.pages.map((page,index) => {
        if (index === 0) {
          let r = mutationFn(page.messages,data);
          return {...page, messages: r}
          // return {...page, messages: [...page.messages, data]}
        }
        return page
      })
    }
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
