import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import axios from 'axios';
import { configDotenv } from 'dotenv';

configDotenv();

@Controller('countries')
class CountriesController {
  @Get()
  @HttpCode(HttpStatus.OK)
  async getCountries() {
    try {
      const response = await axios.get(process.env.COUNTRIES_URL as string);
      return {
        status: 'Ok!',
        countries: response.data,
      };
    } catch (err: any) {
      throw new InternalServerErrorException(
        'Error fetching the countries, verify!. ' + err.message,
      );
    }
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async findCountrieInfos(
    @Body() country: { country: string },
    @Body() id: { id: string },
  ) {
    try {
      const populationResponse = await axios.post(
        process.env.POPULATION_URL as string,
        country,
      );
      const flagResponse = await axios.post(
        process.env.FLAG_URL as string,
        country,
      );
      const bordersRespone = await axios.get(
        (process.env.BORDERS_URL as string) + id.id,
      );

      const flag = flagResponse.data.data.flag;
      const borders = bordersRespone.data.borders;
      const population = populationResponse.data.data.populationCounts;
      const name = populationResponse.data.data.country;
      return {
        status: 'Ok!',
        countrieInfos: { population, flag, borders, name },
      };
    } catch (err: any) {
      throw new InternalServerErrorException(
        'Error fetching country information, verify!',
      );
    }
  }
}

export default CountriesController;
