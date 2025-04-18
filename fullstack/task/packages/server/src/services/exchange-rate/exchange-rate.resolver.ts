import { Query, Resolver } from '@nestjs/graphql';
import { ExchangeRateCache } from '../../entities';
import { ExchangeRateService } from './exchange-rate.service';

@Resolver()
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) {}

    @Query(() => ExchangeRateCache)
    async exchangeRates(): Promise<ExchangeRateCache> {
        return this.exchangeRateService.getExchangeRates();
    }
}
