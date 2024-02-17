import Link from "next/link";

interface EventPaginationProps {
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const EventPagination: React.FC<EventPaginationProps> = ({ totalPages, currentPage, onPageChange }) => (
  <div className="pagination-area text-center">
    <Link href="#0">
      <i className="fas fa-angle-double-left"></i>
      <span>Prev</span>
    </Link>
    <Link href="#0">1</Link>
    <Link href="#0">2</Link>
    <Link href="#0" className="active">
      3
    </Link>
    <Link href="#0">4</Link>
    <Link href="#0">5</Link>
    <Link href="#0">
      <span>Next</span>
      <i className="fas fa-angle-double-right"></i>
    </Link>
  </div>
);

export default EventPagination;
