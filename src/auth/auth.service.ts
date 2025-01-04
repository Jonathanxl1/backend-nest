import { HttpException, Injectable } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signIn({ email, password }: AuthDTO) {
    try {
      let user = await this.userService.findUser(email);

      if (user) {
        const isMatch = await bcrypt.compare(password, (await user).password);
        if (isMatch) {
          delete user.password;

          return this.asignToken(user.email, user.id);
        }
      }
    } catch (error) {
      throw new HttpException('Invalid email or password', 401);
    }
  }

  async signUp({ email, password }: AuthDTO) {
    return this.userService.createUser({ email, password });
  }

  private async asignToken(email: string, id: number) {
    const payload = {
      sub: id,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret,
    });

    return { token };
  }
}
