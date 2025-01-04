import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DelegationsService } from './delegations.service';
import { CreateDelegationDto } from './dto/create-delegation.dto';
import { UpdateDelegationDto } from './dto/update-delegation.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('sucursal')
export class DelegationsController {
  constructor(private readonly delegationsService: DelegationsService) {}

  @Post()
  create(@Body() createDelegationDto: CreateDelegationDto) {
    return this.delegationsService.create(createDelegationDto);
  }

  @Get()
  findAll() {
    return this.delegationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.delegationsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDelegationDto: UpdateDelegationDto,
  ) {
    return this.delegationsService.update(+id, updateDelegationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.delegationsService.remove(+id);
  }
}
