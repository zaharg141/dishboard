import React from 'react';
import { gql, useQuery } from '@apollo/client';

interface ExchangeRate {
    country: string;
    currency: string;
    amount: number;
    code: string;
    rate: number;
}

interface ExchangeRateData {
    exchangeRates: {
        fetchedAt: string;
        rates: ExchangeRate[];
    };
}

const EXCHANGE_RATES_QUERY = gql`
    query GetExchangeRates {
        exchangeRates {
            fetchedAt
            rates {
                country
                currency
                amount
                code
                rate
            }
        }
    }
`;

export const ExchangeRates: React.FC = () => {
    const { loading, error, data } = useQuery<ExchangeRateData>(EXCHANGE_RATES_QUERY);
    const timeSinceFetch = data
        ? Math.floor(
              (new Date().getTime() - new Date(data.exchangeRates.fetchedAt).getTime()) / 1000
          )
        : 0;

    if (loading) return <div className="p-4 text-center">Loading...</div>;
    if (error) return <div className="p-4 text-center text-red-500">Error: {error.message}</div>;

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold mb-2">Exchange Rates</h1>
            <p className="text-gray-600 mb-4">Last updated: {timeSinceFetch} seconds ago</p>
            <div className="overflow-x-auto w-full">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="bg-gray-200 text-gray-700 font-semibold text-left p-3 border border-gray-300">
                                Country
                            </th>
                            <th className="bg-gray-200 text-gray-700 font-semibold text-left p-3 border border-gray-300">
                                Currency
                            </th>
                            <th className="bg-gray-200 text-gray-700 font-semibold text-left p-3 border border-gray-300">
                                Amount
                            </th>
                            <th className="bg-gray-200 text-gray-700 font-semibold text-left p-3 border border-gray-300">
                                Code
                            </th>
                            <th className="bg-gray-200 text-gray-700 font-semibold text-left p-3 border border-gray-300">
                                Rate
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.exchangeRates.rates.map((rate) => (
                            <tr key={rate.code} className="hover:bg-blue-50">
                                <td className="p-3 border border-gray-300">{rate.country}</td>
                                <td className="p-3 border border-gray-300">{rate.currency}</td>
                                <td className="p-3 border border-gray-300">{rate.amount}</td>
                                <td className="p-3 border border-gray-300">{rate.code}</td>
                                <td className="p-3 border border-gray-300 font-medium">
                                    {rate.rate.toFixed(3)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
