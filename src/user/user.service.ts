import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { UserDTO } from './dto/user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: DbService) {}

  async createUser(body: UserDTO) {
    let { email, password } = body;

    let hash = await bcrypt.hash(password, 10);

    try {
      let user = await this.prisma.user.create({
        data: { email, password: hash },
        select: { id: true, email: true, app_id: true },
      });
      return user;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Email alredy registered');
        }
      }
    }
  }

  async findUser(email: UserDTO['email']) {
    try {
      let user = await this.prisma.user.findUnique({
        where: { email },
        select: { id: true, email: true, password: true, app_id: true },
      });

      if (!user) {
        throw new ForbiddenException('Not Found Email');
      }

      return user;
    } catch (err) {
      throw new NotFoundException('Not Found Email');
    }
  }

  async findAppId(app_id: string) {
    try {
      let user = await this.prisma.user.findFirst({
        where: { app_id },
        select: { app_id: true },
      });

      if (!user) {
        throw new ForbiddenException('Not Found Company');
      }

      return user;
    } catch (err) {
      throw new NotFoundException('Not Found Company');
    }
  }
}
