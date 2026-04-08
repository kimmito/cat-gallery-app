import { useEffect, type FC } from "react"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import Layout from "../../components/ui/layout/Layout"
import { getCats } from "../../api/cats.api"
import Loader from "../../components/ui/Loader"

const AllCats: FC = () => {
  const { data: cats, isLoading, isError } = useQuery({
    queryKey: ["Get cats", 15],
    queryFn: () => getCats({ limit: 15 }),
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {cats?.map((cat) => (
            <article key={cat.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <img src={cat.url} alt={`Кот ${cat.id}`} className="h-64 w-full object-cover" loading="lazy" />
            </article>
          ))}
        </div>
      )}
    </Layout>
  )
}

export default AllCats