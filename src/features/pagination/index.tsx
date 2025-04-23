interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, hasNextPage, onPageChange }: PaginationProps) => {
  const isFirstPage = currentPage === 1;

  return (
    <div className="flex justify-center items-center space-x-4 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className={`px-4 py-2 cursor-pointer ${
          isFirstPage
            ? "text-gray-500 opacity-50"
            : "text-blue-500 hover:text-blue-600"
        }`}
      >
        Previous
      </button>
      <span className="text-gray-600">Page {currentPage}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className={`px-4 py-2 cursor-pointer ${
          !hasNextPage
            ? "text-gray-500 opacity-50"
            : "text-blue-500 hover:text-blue-600"
        }`}
      >
        Next
      </button>
    </div>
  );
}; 