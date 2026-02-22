import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  private sanitizeUser<T extends { password: string }>(user: T) {
    const { password: _password, ...safeUser } = user;
    return safeUser;
  }

  private mapRole(role: string): Role {
    switch (role) {
      case 'SUPER_ADMIN':
        return Role.SUPER_ADMIN;
      case 'ADMIN':
        return Role.ADMIN;
      case 'MANAGER':
        return Role.MANAGER;
      case 'SALES_REP':
      case 'SALES':
      default:
        return Role.SALES;
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!user.password) throw new UnauthorizedException('Please accept invite first');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const payload = {
      sub: user.id,
      orgId: user.orgId,
      role: user.role,
    };

    return {
      access_token: this.jwt.sign(payload),
      user: this.sanitizeUser(user),
    };
  }

  async registerCompany(data: {
  companyName: string;
  name: string;
  email: string;
  password: string;
}) {
  const hashed = await bcrypt.hash(data.password, 10);

  const org = await this.prisma.organization.create({
    data: {
      name: data.companyName,
    },
  });

  const user = await this.prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashed,
      role: 'ADMIN',
      orgId: org.id,
    },
  });

  const payload = {
    sub: user.id,
    orgId: org.id,
    role: user.role,
  };

  return {
    access_token: this.jwt.sign(payload),
    user: this.sanitizeUser(user),
  };
}

async inviteUser(
  orgId: string,
  email: string,
  role: string,
) {
  const user = await this.prisma.user.create({
    data: {
      email,
      name: email.split('@')[0],
      password: '',
      role: this.mapRole(role),
      orgId,
    },
  });

  return this.sanitizeUser(user);
}

async acceptInvite(email: string, password: string) {
  const hashed = await bcrypt.hash(password, 10);

  const user = await this.prisma.user.update({
    where: { email },
    data: { password: hashed },
  });

  return this.sanitizeUser(user);
}

async me(userId: string, orgId: string) {
  const user = await this.prisma.user.findFirst({
    where: { id: userId, orgId },
  });

  if (!user) {
    throw new UnauthorizedException('User not found');
  }

  return this.sanitizeUser(user);
}

}
