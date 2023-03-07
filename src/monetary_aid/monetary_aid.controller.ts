import { Controller, Get, Res, HttpStatus, Query } from '@nestjs/common';
import { writeFile } from 'fs';
import { MonetaryAidService } from './monetary_aid.service';

@Controller('monetary-aid')
export class MonetaryAidController {
  constructor(private monetaryAidService: MonetaryAidService) {}

  @Get()
  async getMonetaryAid(
    @Query('code-country')
    codeCountry: string,
    @Query('year') year: number,
    @Res() res,
  ) {
    console.log(codeCountry);
    console.log(year);
    const response =
      await this.monetaryAidService.getMonetaryAidByConutryAndRangeYear(
        year,
        codeCountry,
      );
    writeFile(
      `responses/response-${new Date().getTime()}.json`,
      JSON.stringify(response),
      'utf-8',
      (error) => {
        if (error) throw error;
        console.log('The file was saved');
      },
    );
    return res.status(HttpStatus.OK).json({
      response,
    });
  }
}
