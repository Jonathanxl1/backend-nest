import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('empresa')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get(':appId')
  validateAppId(@Param('appId') appId: string) {
    return this.companyService.getData(appId);
  }
}
