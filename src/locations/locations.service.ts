import { Injectable, NotFoundException } from '@nestjs/common';

import { join } from 'path';
import { promises as fs } from 'fs';

import dataJson from './data.json'; // keep it to load Json route

import { CountryDTO, StateDTO } from './dto/locations.dto';

@Injectable()
export class LocationsService {
  private loadData: CountryDTO[];
  constructor() {
    this.loadFile();
  }

  async loadFile() {
    try {
      const filePath = join(__dirname, 'data.json'); // Adjust the path as needed
      const fileContent = await fs.readFile(filePath, 'utf-8');
      this.loadData = JSON.parse(fileContent);
    } catch (err) {
      console.error(err);
    }
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

    return data.flat();
  }

  getCitiesBy(deparmentId: StateDTO['id']) {
    let data = this.loadData
      .filter(({ states }) => states.some(({ id }) => id == deparmentId))
      .map(({ states }) => states.find(({ id }) => id == deparmentId))
      .map(({ cities }) => cities);

    if (!data.length) {
      throw new NotFoundException('Deparment Not Found');
    }

    return data.flat();
  }
}
