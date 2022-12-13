import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUserName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  // to get jwt token
  async login(user: any) {
    // const payload = { sub: user.userId };
    const payload = { sub: user._doc._id };

    //returns undefined
    console.log('Payload: ', payload.sub);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
