import { Injectable } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}


  async signUp({ email, password }: AuthDTO) {
    return this.userService.createUser({ email, password });
  }
}
