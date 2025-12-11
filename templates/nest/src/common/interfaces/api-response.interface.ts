/**
 * Cấu trúc phản hồi chuẩn cho các API (không phải danh sách/pagination).
 * @template T - Kiểu dữ liệu chính của phản hồi.
 */
export interface ApiResponse<T> {
  statusCode: number; // Mã trạng thái HTTP (Ví dụ: 200, 201)
  message: string; // Thông báo thành công hoặc mô tả ngắn gọn
  data: T; // Dữ liệu chính được trả về
  timestamp: string; // Thời gian phản hồi
  path: string; // Đường dẫn API được gọi
}
