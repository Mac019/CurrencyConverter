document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const convertButton = document.getElementById('convert-button');
    const resultDiv = document.getElementById('result');

    const apiKey = '3c07e8dcd65ea9bc4a2fcbdc'; // Your API key
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    async function fetchCurrencies() {
        try {
            console.log('Fetching currencies...');
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Data fetched:', data);
            const currencies = Object.keys(data.conversion_rates);
            console.log('Currencies:', currencies);
            populateCurrencyOptions(currencies);
        } catch (error) {
            console.error('Error fetching currencies:', error);
        }
    }

    function populateCurrencyOptions(currencies) {
        console.log('Populating currency options...');
        fromCurrencySelect.innerHTML = '';
        toCurrencySelect.innerHTML = '';

        currencies.forEach(currency => {
            const optionFrom = document.createElement('option');
            optionFrom.value = currency;
            optionFrom.textContent = currency;
            fromCurrencySelect.appendChild(optionFrom);

            const optionTo = document.createElement('option');
            optionTo.value = currency;
            optionTo.textContent = currency;
            toCurrencySelect.appendChild(optionTo);
        });

        console.log('Currency options populated:', fromCurrencySelect.innerHTML, toCurrencySelect.innerHTML);
    }

    async function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (!amount || isNaN(amount)) {
            alert('Please enter a valid amount.');
            return;
        }

        const conversionApiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;

        try {
            const response = await fetch(conversionApiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const result = data.conversion_result;
            displayResult(result, fromCurrency, toCurrency);
        } catch (error) {
            console.error('Error converting currency:', error);
            resultDiv.textContent = 'Error converting currency. Please try again.';
        }
    }

    function displayResult(result, fromCurrency, toCurrency) {
        resultDiv.textContent = `Converted Amount: ${result} ${toCurrency}`;
    }

    convertButton.addEventListener('click', convertCurrency);

    fetchCurrencies();
});
