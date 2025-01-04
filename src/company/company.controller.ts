import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('empresa')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get(':id')
  validateAppId(@Param('id', ParseIntPipe) id: number) {
    return this.companyService;
  }
}
