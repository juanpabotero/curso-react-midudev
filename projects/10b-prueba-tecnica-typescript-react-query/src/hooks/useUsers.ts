import { fetchUsers } from '../services/users'
import { useInfiniteQuery } from '@tanstack/react-query'
import { type User } from '../types.d'

export const useUsers = () => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<{ nextCursor?: number; users: User[] }>(
      ['users'], // <- la key de la información o de la query
      fetchUsers, // <- como traer la información
      {           // <- opciones
        getNextPageParam: (lastPage) => lastPage.nextCursor, // <- como obtener la siguiente página
        refetchOnWindowFocus: false, // <- no hacer un nuevo fetch cuando la ventana está en foco
        staleTime: 1000 * 3 // <- despues de cuanto tiempo se considera que la información está desactualizada
      }
    )

  return {
    refetch,
    fetchNextPage,
    isLoading,
    isError,
    users: data?.pages.flatMap((page) => page.users) ?? [],
    hasNextPage
  }
}
