import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccessLevel } from '@prisma/client';

import { canActivate } from './utils';

@Injectable()
export class UserGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const ok = await canActivate(context, [
      AccessLevel.Staff,
      AccessLevel.User,
    ]);
    if (ok) return true;
    throw new HttpException('Acesso não autorizado', 401);
  }
}
