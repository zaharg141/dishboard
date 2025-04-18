import React from 'react';
import { ExchangeRates } from './components/ExchangeRates';

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-blue-100 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl w-full">
                <ExchangeRates />
            </div>
        </div>
    );
};

export default App;
