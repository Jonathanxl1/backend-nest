import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller()
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get('/countries')
  getCountries() {
    return this.locationsService.getCountries();
  }
  @Get('/deparments/:id')
  getStatesBy(@Param('id', ParseIntPipe) countryId: number) {
    return this.locationsService.getDepartmentBy(countryId);
  }

  @Get('/cities/:id')
  getCitiesBy(@Param('id', ParseIntPipe) deparmentId: number) {
    return this.locationsService.getCitiesBy(deparmentId);
  }
}
