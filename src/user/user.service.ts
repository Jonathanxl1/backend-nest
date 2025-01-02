import { ForbiddenException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { UserDTO } from './dto/user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private prisma: DbService) {}

  async createUser(body: UserDTO) {
    let { email, password } = body;

    try {
      let user = await this.prisma.user.create({ data: { email, password } });
      return user;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Email alredy registered');
        }
      }
    }
  }
}
