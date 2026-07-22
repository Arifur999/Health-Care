import NewsManagementClient from "@/components/modules/Admin/NewsManagement/NewsManagementClient"
import { getAllNewsAdmin } from "@/services/news.services"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

const NewsManagementPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["admin-news"],
    queryFn: getAllNewsAdmin,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewsManagementClient />
    </HydrationBoundary>
  )
}

export default NewsManagementPage
