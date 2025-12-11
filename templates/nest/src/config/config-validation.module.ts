import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configuration } from '@config/configuration';
import { EnvSchema } from '@config/validation.schema';

@Module({})
export class ConfigValidationModule {
  static forRoot(): DynamicModule {
    return {
      module: ConfigValidationModule,
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: true,
          load: [configuration],
          validationSchema: {
            validate: (config: Record<string, any>) => {
              const parsed = EnvSchema.safeParse(config);

              if (!parsed.success) {
                const errorMessage = parsed.error.issues
                  .map((i) => `${i.path.toString()}: ${i.message}`)
                  .join('\n');

                throw new Error(
                  `\n--- Environment Validation Failed ---\n${errorMessage}\n---------------------------------\n`,
                );
              }
              return parsed.data;
            },
          },
          isGlobal: true,
        }),
      ],
      exports: [ConfigModule],
    };
  }
}
