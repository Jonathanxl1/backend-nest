import { Injectable, NotFoundException } from '@nestjs/common';
import { DelegationsService } from 'src/delegations/delegations.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CompanyService {
  constructor(private userService: UserService) {}

  async getData(app_id: string) {
    return this.userService
      .findAppId(app_id)
      .then((app_id) => app_id)
      .catch((err) => {
        console.error(err);
        throw new NotFoundException('Empresa no encontrada');
      });
  }
}
