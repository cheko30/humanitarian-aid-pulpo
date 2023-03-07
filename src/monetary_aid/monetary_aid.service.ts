import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { readFile } from 'fs/promises';
import { ResponseYears } from './interfaces/response-years.interface';
import { ResponseAgencies } from './interfaces/response-agencies.interface';
import { ResponseYearAgencies } from './interfaces/response-year-agencies.interface';

@Injectable()
export class MonetaryAidService {
  /**
   * @author Sergio Peña
   * @description Generate logic for servie response
   *
   */
  async getMonetaryAidByConutryAndRangeYear(year: number, codeCountry: string) {
    const responseYears = await this.getYearsByCountry(codeCountry);
    const years: string[] = responseYears.map((response) => response.year);
    const reversedYear: string[] = years.reverse();
    const yearsFilter: string[] = reversedYear.filter(
      (_year, index) => index > 0 && index <= 5,
    );
    const newArrayAgencies: ResponseYearAgencies[] = [];
    for (const year of yearsFilter) {
      const agenciesResponse = await this.getAgeniesByYearAndCountry(
        Number.parseInt(year),
        codeCountry,
      );
      newArrayAgencies.push(agenciesResponse);
    }

    const responseObj = {};
    let agencyCuantityUsdObj = {};

    const file = await readFile('./responsible_agencies_sudan.json', 'utf-8');
    newArrayAgencies.reverse().forEach((element) => {
      element.responseSorted.forEach(async (e) => {
        const catalogAgenciesName = JSON.parse(file);

        const agecnyName: string = this.agencyNameFormatter(
          catalogAgenciesName[e.agencyref],
        );
        agencyCuantityUsdObj[agecnyName] = e.sum;
      });
      responseObj[element.year] = agencyCuantityUsdObj;
      agencyCuantityUsdObj = {};
    });

    return responseObj;
  }

  /**
   * @author Sergio Peña
   * @description Consume external API for get years by country
   *
   */
  private async getYearsByCountry(codeCountry: string) {
    const response: ResponseYears[] = await axios
      .get(
        `${process.env.URL_OPEN_AID_TRANSACTION}/year?recipientcode=${codeCountry}`,
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return response;
  }

  /**
   * @author Sergio Peña
   * @description Consume external API for get agencies by country and year
   *
   */
  private async getAgeniesByYearAndCountry(year: number, codeCountry: string) {
    const response: any = await axios
      .get(
        `${process.env.URL_OPEN_AID_TRANSACTION}/agency?recipientcode=${codeCountry}&year=${year}&onlyHumanitarian=false&aidTypeCategory=all`,
      )
      .then((res) => {
        const agencies: ResponseAgencies[] = res.data;
        return agencies;
      })
      .catch((error) => {
        console.log(error);
      });
    const responseSorted = response.sort(
      (agencyA, agencyB) => agencyB.sum - agencyA.sum,
    );
    return { year, responseSorted };
  }

  /**
   * @author Sergio Peña
   * @description Replace dash(-) with spaces and string to upper case
   *
   */
  private agencyNameFormatter(agencyName: string): string {
    const regex = /\-/gi;
    const newName = agencyName.replace(regex, ' ').toUpperCase();
    return newName;
  }
}
