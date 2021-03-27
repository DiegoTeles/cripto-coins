import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { CoreModule } from './core/core.module';
import { CrytoModule } from './cryto/cryto.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile:
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'homolog' ||
        process.env.NODE_ENV === 'staging',
    }),
    AuthModule,
    TerminusModule,
    CrytoModule,
    UsersModule,
    CoreModule,
  ],
  controllers: [HealthController, AuthController],
  providers: [],
})
export class AppModule {}