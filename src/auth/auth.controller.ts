import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { ForbiddenException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.auth.login(body.email, body.password);
  }
  @Post('register-company')
    registerCompany(
  @Body()
  body: {
    companyName: string;
    name: string;
    email: string;
    password: string;
  },
) {
  return this.auth.registerCompany(body);
}
@UseGuards(JwtAuthGuard)
@Post('invite')
invite(
  @Req() req,
  @Body() body: { email: string; role: string },
) {
  if (!['ADMIN', 'SUPER_ADMIN'].includes(req.user.role)) {
    throw new ForbiddenException('Only admins can invite users');
  }

  return this.auth.inviteUser(
    req.user.orgId,
    body.email,
    body.role,
  );
}

@Post('accept-invite')
acceptInvite(
  @Body() body: { email: string; password: string },
) {
  return this.auth.acceptInvite(body.email, body.password);
}

@UseGuards(JwtAuthGuard)
@Get('me')
me(@Req() req: any) {
  return this.auth.me(req.user.sub, req.user.orgId);
}

}
