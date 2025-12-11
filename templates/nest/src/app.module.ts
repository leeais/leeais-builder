import { ConfigValidationModule } from '@config/config-validation.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigValidationModule.forRoot()],
})
export class AppModule {}
