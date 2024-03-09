import { useState } from "react";
import Paginator from "../components/Paginator";
import TodoSkeleton from "../components/ui/TodoSkeleton";
import { userData } from "../data";
import { useCustomQuery } from "../hooks/useCustomQuery";

export default function Todos() {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("asc");
  const { isLoading, data, isFetching } = useCustomQuery({
    queryKey: [`todosPage-${page}-${pageSize}-${sortBy}`],
    url: `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sortBy}`,
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });

  // Handlers
  const onClickPrev = () => {
    setPage((prev) => prev - 1);
  };
  const onClickNext = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-xl m-auto animate-pulse">
        <div className="flex items-center justify-end gap-5">
          <div>
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-3"></div>
            <div className="w-24 h-10 bg-gray-300 rounded-md dark:bg-gray-500"></div>
          </div>
          <div>
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-3"></div>
            <div className="w-20 h-10 bg-gray-300 rounded-md dark:bg-gray-500"></div>
          </div>
        </div>
        <div className="space-y-4 divide-y divide-gray-200 rounded dark:divide-gray-700">
          {Array.from({ length: pageSize }, (_, i) => (
            <TodoSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-xl m-auto">
      <div className="flex items-center justify-end gap-5">
        <div className="max-w-sm">
          <label
            htmlFor="sort"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Sort by
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            id="sort"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="asc">oldest</option>
            <option value="desc">newest</option>
          </select>
        </div>

        {/* limit page results */}
        <div className="max-w-sm">
          <label
            htmlFor="limit"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Select a limit
          </label>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(+e.target.value)}
            id="limit"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {data?.data.length > 0 ? (
          data?.data.map(
            (todo: { id: number; attributes: { title: string } }) => (
              <div
                key={todo.id}
                className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
              >
                <p className="w-full font-semibold">{todo.attributes.title}</p>
              </div>
            )
          )
        ) : (
          <p>No Todos yet!</p>
        )}
      </div>
      <div className="pb-5">
        <Paginator
          page={page}
          pageCount={data.meta.pagination.pageCount}
          total={data.meta.pagination.total}
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
          isLoading={isLoading || isFetching}
        />
      </div>
    </div>
  );
}
