import { Body, Controller, Post } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: AuthDTO) {
    return this.authService.signIn(body);
  }

  @Post('signup')
  sigup(@Body() body: AuthDTO) {
    return this.authService.signUp(body);
  }
}
