import { useQuery } from '@tanstack/react-query';
import { getRelations } from '@/lib/contactServices';

export const useGetRelations = () => {
  const {isLoading, data, error} = useQuery({
    queryKey: ['relations'],
    queryFn: getRelations
  })

  return {isLoading, data, error}
}
