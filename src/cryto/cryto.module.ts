import { Module, HttpModule } from '@nestjs/common';
import { CrytoController } from './cryto.controller';
import { CrytoService } from './cryto.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, AuthModule, HttpModule],
  controllers: [CrytoController],
  providers: [CrytoService],
})
export class CrytoModule {}
