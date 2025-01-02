import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: DbService) {}

  async createUser(body: UserDTO) {
    let { email, password } = body;
    let user = await this.prisma.user.create({ data: { email, password } });
    return user;
  }
}
