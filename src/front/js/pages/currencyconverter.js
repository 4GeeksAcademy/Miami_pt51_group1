import React, { useState, useEffect } from "react";
import currencyapi from '@everapi/currencyapi-js'

export const CurrencyConverter = () => {
    const [amount, setAmount] = useState(1);
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const [targetCurrency, setTargetCurrency] = useState('EUR');
    const [conversionResult, setConversionResult] = useState(null);

    const client = new currencyapi('cur_live_yxVUQ5fHZBukNBQ0Yzg1nkhcat70x4DvfFO0O3J1');

    const fetchConversionRate = async () => {
        const response = await client.latest({
            base_currency: baseCurrency,
            currencies: targetCurrency
        });
        
        return response.data[targetCurrency].value;
    };

    useEffect(() => {
        const calculateConversion = async () => {
            const rate = await fetchConversionRate();
            setConversionResult(amount * rate);
        };

        calculateConversion();
    }, [amount, baseCurrency, targetCurrency]);

    return (
        <div className="bg-image text-center d-flex flex-column justify-content-center align-items-center" style={{height: "85vh"}}>
            <div className="d-flex align-items-center justify-content-center mb-4">
                <div className="mx-3">
                    <label>Convert: </label>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
                </div>

                <div  className="mx-3">
                    <label>From: </label>
                    <select value={baseCurrency} onChange={e => setBaseCurrency(e.target.value)}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="CAD">CAD</option>
                    </select>
                </div>

                <div>
                    <label>To: </label>
                    <select value={targetCurrency} onChange={e => setTargetCurrency(e.target.value)}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="CAD">CAD</option>
                    </select>
                </div>

            </div>
            <div>
                <p>Conversion result: {conversionResult}</p>
            </div>
        </div>
    );
};

