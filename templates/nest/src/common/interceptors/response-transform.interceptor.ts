// import { ApiResponse } from '@common/interfaces/api-response.interface';
// import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable()
// export class ResponseTransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
//     const request = context.switchToHttp().getRequest();
//     const statusCode = context.switchToHttp().getResponse().statusCode;

//     return next.handle().pipe(
//       map((data) => {
//         // Kiểm tra nếu data có cấu trúc pagination (ví dụ: có thuộc tính 'meta')
//         // Bỏ qua xử lý nếu data đã là một đối tượng ApiResponse (ví dụ: lỗi tùy chỉnh)
//         if (data && data.meta) {
//           // Trả về PaginationResponse (Logic sẽ phức tạp hơn, nhưng ta giữ đơn giản)
//           return {
//             statusCode: statusCode,
//             message: 'Danh sách đã được tải thành công.',
//             data: data.data,
//             meta: data.meta,
//             timestamp: new Date().toISOString(),
//             path: request.url,
//           };
//         }

//         // Trả về ApiResponse tiêu chuẩn (cho các API Get One, Create, Update)
//         return {
//           statusCode: statusCode,
//           message: data?.message || 'Thao tác thực hiện thành công.',
//           data: data,
//           timestamp: new Date().toISOString(),
//           path: request.url,
//         };
//       }),
//     );
//   }
// }
