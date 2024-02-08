import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    let user = null;
    if (request.user) user = request.user;
    return user;
  },
);
