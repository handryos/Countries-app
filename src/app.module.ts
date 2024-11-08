import { Module } from '@nestjs/common';
import CountriesController from './controllers/CountriesController/countries.controller';

@Module({
  imports: [],
  controllers: [CountriesController],
})
export class AppModule {}
