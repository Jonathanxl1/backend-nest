import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async user(@Request() req) {
    let user = await this.userService.findUser(req.user.email);
    if ('password' in user) {
      delete user.password;
    }
    return user;
  }
}
