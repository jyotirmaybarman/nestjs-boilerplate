import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwksService } from '../../providers/jwks/jwks.service';
import { WinstonLogger } from 'src/utils/winston-logger/winston-logger';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new WinstonLogger(AuthGuard.name);
  constructor(
    private jwtService: JwtService,
    private jwks: JwksService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    if (!this.jwks.initialized) {
      this.logger.error('JwksService is not initialized');
      throw new UnauthorizedException();
    }
    try {
      const publicKey = (await this.jwks.client.getSigningKey()).getPublicKey();
      const payload = await this.jwtService.verify(token, {
        publicKey,
        algorithms: ['RS256'],
      });
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
