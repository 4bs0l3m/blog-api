import { TokenDTO } from './../common/dtos/common/TokenDTO';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthHelper {
  constructor(private jwtService: JwtService) {}
  extractToken(authorization: string): TokenDTO {
    if (authorization) {
      const authorizationArr = authorization.split(' ');
      if (authorizationArr && authorizationArr.length === 2) {
        const [type, token] = authorizationArr;
        if (type === 'Bearer') {
          try {
            const decriptedToken = this.jwtService.verify(token);
            return <TokenDTO>decriptedToken;
          } catch {
            return null;
          }
        }
      }
    }
    return null;
  }
}
