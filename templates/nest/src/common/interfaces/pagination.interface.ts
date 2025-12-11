/**
 * Metadata cho phân trang
 */
export interface PaginationMeta {
  totalItems: number; // Tổng số mục
  itemCount: number; // Số mục trong trang hiện tại
  itemsPerPage: number; // Số mục tối đa trên mỗi trang
  totalPages: number; // Tổng số trang
  currentPage: number; // Trang hiện tại (bắt đầu từ 1)
}

/**
 * Cấu trúc phản hồi đầy đủ cho API phân trang.
 * @template T - Kiểu dữ liệu của từng mục trong danh sách.
 */
export interface PaginationResponse<T> {
  statusCode: number;
  message: string;
  data: T[]; // Danh sách dữ liệu
  meta: PaginationMeta; // Metadata phân trang
  timestamp: string;
  path: string;
}
