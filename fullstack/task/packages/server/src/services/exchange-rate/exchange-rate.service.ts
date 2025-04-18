import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { ExchangeRate, ExchangeRateCache } from '../../entities';

@Injectable()
export class ExchangeRateService {
    constructor(
        @InjectRepository(ExchangeRate)
        private readonly exchangeRateRepository: Repository<ExchangeRate>,
        private readonly configService: ConfigService
    ) {}

    private async fetchFromCNB(): Promise<ExchangeRate[]> {
        const bankUrl = this.configService.get<string>('BANK_URL') ?? '';
        const response = await axios.get(bankUrl);
        const lines = response.data.split('\n');
        const rates = lines.slice(2).filter((line: string) => line.trim());

        return rates.map((line: string) => {
            const [country, currency, amount, code, rate] = line.split('|');
            return {
                country,
                currency,
                amount: parseFloat(amount),
                code,
                rate: parseFloat(rate.replace(',', '.')),
                createdAt: new Date(),
            } as ExchangeRate;
        });
    }

    public async getExchangeRates(): Promise<ExchangeRateCache> {
        const latestRates = await this.exchangeRateRepository.find({
            order: { createdAt: 'DESC' },
        });
        if (
            latestRates.length > 0 &&
            new Date().getTime() - new Date(latestRates[0].createdAt).getTime() < 5 * 60 * 1000
        ) {
            return {
                fetchedAt: latestRates[0].createdAt,
                rates: latestRates,
            };
        }

        const freshRates = await this.fetchFromCNB();
        await this.exchangeRateRepository.clear();
        const savedRates = await this.exchangeRateRepository.save(freshRates);

        return {
            fetchedAt: new Date(),
            rates: savedRates,
        };
    }
}
