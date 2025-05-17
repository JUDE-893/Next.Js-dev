import { useMutation, useQuery } from '@tanstack/react-query';
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
