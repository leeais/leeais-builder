import { EnvSchema } from '@config/validation.schema';
import { Logger } from '@nestjs/common';

/**
 * Hàm này dùng để load (tải) các biến môi trường sau khi đã được xác thực (tại AppModule).
 * Nó trả về một object có cấu trúc kiểu an toàn để dễ dàng truy cập.
 */
export const configuration = () => {
  const config = process.env;

  try {
    const parsedConfig = EnvSchema.parse(config);

    return {
      nodeEnv: parsedConfig.NODE_ENV,
      port: parsedConfig.PORT,
      jwtSecret: parsedConfig.JWT_SECRET,

      // PostgreSQL
      postgres: {
        host: parsedConfig.POSTGRES_HOST,
        port: parsedConfig.POSTGRES_PORT,
        user: parsedConfig.POSTGRES_USER,
        password: parsedConfig.POSTGRES_PASSWORD,
        database: parsedConfig.POSTGRES_DB,
        postgresUrl: parsedConfig.POSTGRES_URL,
      },

      // MongoDB
      mongo: {
        uri: parsedConfig.MONGO_URI,
      },

      // Redis
      redis: {
        host: parsedConfig.REDIS_HOST,
      },
    } as const;
  } catch (error) {
    Logger.error('Lỗi khi ép kiểu cấu hình (Configuration parsing/coercion error)', error);
    throw error;
  }
};

export type AppConfig = ReturnType<typeof configuration>;
