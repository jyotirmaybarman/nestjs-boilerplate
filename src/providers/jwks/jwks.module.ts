import { Global, Module } from '@nestjs/common';
import { JwksService } from './jwks.service';

@Global()
@Module({
  providers: [JwksService],
  exports: [JwksService]
})
export class JwksModule {}
