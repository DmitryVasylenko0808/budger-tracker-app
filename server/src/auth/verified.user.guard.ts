import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { EmailConfirmationService } from './modules/email-confirmation/email.confirmation.service';

@Injectable()
export class VerifiedUserGuard implements CanActivate {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const user: User = req.user;

    if (!user.verified) {
      await this.emailConfirmationService.sendLink(user.email);

      throw new ForbiddenException({
        isNotVerifiedUser: true,
        email: user.email,
        message:
          'Your account is not verified. We have sent an email to your address to verify your account',
      });
    }

    return true;
  }
}
