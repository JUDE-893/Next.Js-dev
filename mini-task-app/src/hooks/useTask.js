import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteTask, updateTask, getTasks, getTask, createTask  } from '@/lib/taskServices';

export function useDeleteTask() {

  const {isPending,mutate, error} = useMutation({
    mutationFn: deleteTask,
    onSuccess: (data) => toast("Success", {
           description: <p className='text-muted-foreground text-xs'>{data.message}</p>
        }),
    onError: (e) => toast("Fails", {
           description: <p className='text-destructive text-xs'>{e.message}!</p>
        })
  });
  return {isPending, mutate, error};
}

export function useUpdateTask() {

  const {isPending,mutate, error} = useMutation({
    mutationFn: updateTask,
    onSuccess: (data) => toast("Success", {
           description: <p className='text-muted-foreground text-xs'>{data.message}</p>
        }),
    onError: (e) => toast("Fails", {
           description: <p className='text-destructive text-xs'>{e.message}!</p>
        })
  });
  return {isPending, mutate, error};
}

export function useCreateTask() {

  const {isPending,mutate, error} = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => toast("Success", {
           description: <p className='text-muted-foreground text-xs'>{data.message}</p>
        }),
    onError: (e) => toast("Fails", {
           description: <p className='text-destructive text-xs'>{e.message}!</p>
        })
  });
  return {isPending, mutate, error};
}

export function useGetTasks() {

  const {isLoading, data, error} = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
    onSuccess: (data) => toast("Success", {
           description: <p className='text-muted-foreground text-xs'>{data.message}</p>
        }),
    onError: (e) => toast("Fails", {
           description: <p className='text-destructive text-xs'>{e.message}!</p>
        })
  });
  return {isLoading, data, error};
}

export function useGetTask(id) {

  const {isLoading, data, error} = useQuery({
    queryKey: [id],
    queryFn: () => getTask(id),
    onSuccess: (data) => toast("Success", {
           description: <p className='text-muted-foreground text-xs'>{data.message}</p>
        }),
    onError: (e) => toast("Fails", {
           description: <p className='text-destructive text-xs'>{e.message}!</p>
        })
  });
  return {isLoading, data, error};
}
