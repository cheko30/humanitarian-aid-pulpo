import { Controller, Get, Res, HttpStatus, Query } from '@nestjs/common';
import { writeFile } from 'fs';
import { MonetaryAidService } from './services/monetary_aid.service';

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

    /**
     * @author Sergio Peña
     * @description Save file the respones
     *
     */
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
