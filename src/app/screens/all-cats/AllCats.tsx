import { useEffect, type FC } from "react"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import Layout from "../../components/ui/layout/Layout"
import { CATS_INITIAL_LIMIT, getCats } from "../../api/cats.api"
import Loader from "../../components/ui/Loader"
import { CatGrid } from "../../components/ui/CatGrid"
import { useFavorites } from "../../hooks/useFavorites"

const AllCats: FC = () => {
  const { favoriteIds, toggleFavorite } = useFavorites()

  const { data: cats, isLoading, isError } = useQuery({
    queryKey: ["cats", { limit: CATS_INITIAL_LIMIT, page: 0 }],
    queryFn: () => getCats({ limit: CATS_INITIAL_LIMIT, page: 0 }),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  useEffect(() => {
    if (isError) {
      toast.error("Не удалось загрузить котиков")
    }
  }, [isError])

  return(
    <Layout>
      {isLoading && <Loader />}

      {!isLoading && !isError && (
        <CatGrid cats={cats ?? []} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />
      )}
    </Layout>
  )
}

export default AllCats