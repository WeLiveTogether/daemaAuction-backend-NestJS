import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload, verify } from 'jsonwebtoken';
import { TokenContext } from 'src/dto/tokenContext';

export const ConvertToken = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: any = ctx.switchToHttp().getRequest();
    const token: string = request.headers.authorization;

    const context: string | JwtPayload = verify(
      token.substring(7),
      process.env.secretKey,
    );

    if (typeof context == 'string') {
      throw new Error('Token is Something wrong');
    }

    const tokenContext: TokenContext = new TokenContext();

    tokenContext.id = context.id;
    tokenContext.email = context.email;

    return tokenContext;
  },
);
