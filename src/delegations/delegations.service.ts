import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDelegationDto } from './dto/create-delegation.dto';
import { UpdateDelegationDto } from './dto/update-delegation.dto';
import { DbService } from 'src/db/db.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class DelegationsService {
  constructor(private prisma: DbService) {}

  async create(createDelegationDto: CreateDelegationDto) {
    let { telephone, ...rest } = createDelegationDto;
    let phone = String(telephone);

    console.log(createDelegationDto);

    try {
      let delegation = await this.prisma.delegation
        .create({
          data: { ...rest, phone },
        })
        .finally(async () => await this.prisma.$disconnect());

      return delegation;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Delegation already registered');
        }
      }
    }
  }

  async findAll() {
    return await this.prisma.delegation
      .findMany()
      .finally(async () => this.prisma.$disconnect());
  }

  async findOne(id: number) {
    try {
      let delegation = await this.prisma.delegation.findUnique({
        where: { id },
        select: {
          id: true,
          address: true,
          city_id: true,
          description: true,
          email: true,
          latitude: true,
          longitude: true,
          name: true,
          phone: true,
          image: true,
        },
      });
      if (delegation) {
        return delegation;
      }
    } catch (err) {
      throw new NotFoundException("Delegation don't found or dont exist");
    }
  }

  async update(id: number, updateDelegationDto: UpdateDelegationDto) {
    try {
      let delegation = await this.prisma.delegation
        .update({
          where: { id },
          data: { ...updateDelegationDto },
        })
        .finally(async () => await this.prisma.$disconnect());
      return delegation;
    } catch (err) {
      console.error(err);
    }
  }

  async remove(id: number) {
    try {
      let deletedDelegation = await this.prisma.delegation
        .delete({
          where: { id },
        })
        .finally(async () => await this.prisma.$disconnect());
      return deletedDelegation;
    } catch (err) {
      console.error(err);

      throw new NotFoundException('Resource not found');
    }
  }
}
