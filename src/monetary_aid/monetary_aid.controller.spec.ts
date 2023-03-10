import { MonetaryAidController } from './monetary_aid.controller';
import { MonetaryAidService } from './services/monetary_aid.service';
import { ResponsibleAgenciesService } from './services/responsible-agencies.service';

describe('MonetaryAidController', () => {
  let controller: MonetaryAidController;
  let service: MonetaryAidService;
  let responsibleAgenciesService: ResponsibleAgenciesService;

  beforeEach(async () => {
    service = new MonetaryAidService(responsibleAgenciesService);
    controller = new MonetaryAidController(service);
  });

  describe('getHumanitarianAid', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      jest
        .spyOn(service, 'getMonetaryAidByConutryAndRangeYear')
        .mockImplementation(async () => await result);

      expect(await controller.getMonetaryAid('SD', 2022, result)).toBe(result);
    });
  });
});
