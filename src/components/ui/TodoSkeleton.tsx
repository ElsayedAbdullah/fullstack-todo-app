export default function TodoSkeleton() {
  return (
    <div role="status">
      <div className="flex items-center justify-between p-3">
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-500 w-32"></div>
        <div className="flex items-center space-x-3">
          <div className="w-14 h-9 bg-gray-300 rounded-md dark:bg-gray-500"></div>
          <div className="w-20 h-9 bg-gray-300 rounded-md dark:bg-gray-500"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
