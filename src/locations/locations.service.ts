import { Injectable, NotFoundException } from '@nestjs/common';

import { join } from 'path';
import { readFileSync } from 'fs';

import { CountryDTO, StateDTO } from './dto/locations.dto';

@Injectable()
export class LocationsService {
  private loadData: CountryDTO[];
  constructor() {
    this.loadFile();
  }

  loadFile() {
    const filePath = join(__dirname, 'data.json'); // Adjust the path as needed
    const fileContent = readFileSync(filePath, 'utf-8');
    this.loadData = JSON.parse(fileContent); // Parse the JSON content into a JavaScript object
  }

  getCountries() {
    return this.loadData.map(({ id, name }) => ({ id, name }));
  }

  getDepartmentBy(countryId: CountryDTO['id']) {
    let data = this.loadData
      .filter(({ id }) => id == countryId)
      .map<StateDTO[]>(({ states }) => states);
    if (!data.length) {
      throw new NotFoundException('Country Not Found');
    }

    return data;
  }

  getCitiesBy(deparmentId: StateDTO['id']) {
    let data = this.loadData
      .filter(({ states }) => states.some(({ id }) => id == deparmentId))
      .map(({ states }) => states.find(({ id }) => id == deparmentId))
      .map(({ cities }) => cities);

    if (!data.length) {
      throw new NotFoundException('Deparment Not Found');
    }

    return data;
  }
}
