import { useEffect, useMemo, useRef, type FC } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import Layout from "../../components/ui/layout/Layout"
import { getCats } from "../../api/cats.api"
import { CatGrid } from "../../components/ui/CatGrid"
import { useFavorites } from "../../hooks/useFavorites"
import type { ICatImage } from "../../types/cat.types"
import Loader from "../../components/ui/Loader"

const CAT_CARD_SIZE = 225
const GAP_Y_DEFAULT = 32
const GAP_Y_LG = 52
const HEADER_HEIGHT = 64
const HEADER_MARGIN_BOTTOM = 48
const VIEWPORT_VERTICAL_BUFFER = 32

const getColumnsForViewport = (width: number): number => {
  if (width >= 1440) return 5
  if (width >= 1024) return 4
  if (width >= 768) return 3
  if (width >= 640) return 2
  return 1
}

const getInitialCatsLimit = (): number => {
  if (typeof window === "undefined") {
    return 12
  }

  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const columns = getColumnsForViewport(viewportWidth)
  const gapY = viewportWidth >= 1024 ? GAP_Y_LG : GAP_Y_DEFAULT
  const availableHeight = Math.max(
    CAT_CARD_SIZE,
    viewportHeight - HEADER_HEIGHT - HEADER_MARGIN_BOTTOM - VIEWPORT_VERTICAL_BUFFER
  )

  const visibleRows = Math.max(1, Math.ceil((availableHeight + gapY) / (CAT_CARD_SIZE + gapY)))
  return columns * (visibleRows + 1)
}

const AllCats: FC = () => {
  const { favoriteIds, toggleFavorite } = useFavorites()
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const catsPerPage = useMemo(() => getInitialCatsLimit(), [])

  const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["cats", { limit: catsPerPage }],
    queryFn: ({ pageParam }) => getCats({ limit: catsPerPage, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) {
        return undefined
      }

      return allPages.length
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  })

  const cats = useMemo(() => {
    const uniqueCats = new Map<string, ICatImage>()

    data?.pages.forEach((page) => {
      page.forEach((cat) => {
        if (!uniqueCats.has(cat.id)) {
          uniqueCats.set(cat.id, cat)
        }
      })
    })

    return Array.from(uniqueCats.values())
  }, [data])

  useEffect(() => {
    if (isError) {
      toast.error("Не удалось загрузить котиков")
    }
  }, [isError])

  useEffect(() => {
    const target = loadMoreRef.current

    if (!target || !hasNextPage) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries

        if (entry?.isIntersecting && !isFetchingNextPage) {
          void fetchNextPage()
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 280px 0px",
        threshold: 0,
      }
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  return (
    <Layout>
      {isLoading && !isError && <Loader />}

      {isError && cats.length === 0 && (
        <div className="mx-auto mt-6 w-full max-w-xl rounded-md border border-red-200 bg-red-50 px-4 py-5 text-center">
          <p className="text-base text-red-700">Не удалось загрузить котиков</p>
          <button
            type="button"
            onClick={() => {
              void refetch()
            }}
            className="mt-4 cursor-pointer rounded bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
          >
            Повторить
          </button>
        </div>
      )}

      {cats.length > 0 && <CatGrid cats={cats} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}

      {!isLoading && isFetchingNextPage && (
        <p className="my-8 text-center text-lg text-black/60">... загружаем ещё котиков ...</p>
      )}

      <div ref={loadMoreRef} className="h-1 w-full" aria-hidden="true" />
    </Layout>
  )
}

export default AllCats