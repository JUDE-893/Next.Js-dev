import { useMutation, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getMessages, sendMessage} from '@/lib/messagesServices';


export function useGetMessages(id) {

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey: [id],
    queryFn: ({ pageParam }) => getMessages(id, pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {console.log('Last in , last out',lastPage); return lastPage.messages?.[-1]?._id}
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
