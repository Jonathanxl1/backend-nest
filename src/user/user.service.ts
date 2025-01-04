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
        select: { email: true, app_id: true, password: true },
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
    let user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('Not Found Email');
    }

    return user;
  }
}
