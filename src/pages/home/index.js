import React, {useState, useCallback, useEffect} from 'react';

const Home = () => {
  const [convert, setConvert] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [currencies, setCurrencies] = useState({});

  const handleClick = useCallback(() => {
    const keys = Object.keys(currencies);
    const values = Object.values(currencies);

    const index = keys.indexOf(fromCurrency);

    setConvert(inputValue / values[index]);
    
  }, [currencies, fromCurrency, inputValue]);

  const handleFromChange = useCallback((event) => {
    setConvert('');
    setFromCurrency(event.target.value);
  }, []);

  const handleToChange = useCallback(async (event) => {
    setConvert('');
    setToCurrency(event.target.value);

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${event.target.value}`);

    const json = await response.json();

    setCurrencies(json.rates);
    
  }, [])

  const handleInputChange = useCallback((event) => {
    setConvert('');
    setInputValue(event.target.value);
  }, []);

  useEffect(() => {
    setFromCurrency(Object.keys(currencies)[0]);
  }, [currencies]);

  useEffect(() => {
    async function loadFromApi() {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/EUR`);

      const json = await response.json();

      setCurrencies(json.rates);
    }
    
    loadFromApi();
  }, []);

  return (
    <div className='jumbotron col-12'>
      <h1 className='display-5'>Currency Calculator</h1>
      <p>Convert the currency</p>

      <form>
          <div className='form-group col-12 row'>
            <input type="number" className="form-control col-3" id="input_value"onChange={handleInputChange} />
            <select value={fromCurrency} id="currency" className="form-control col-2 offset-1" onChange={handleFromChange}>
            {Object.keys(currencies).map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
              
            </select>

            <label htmlFor="input_value" className="col-2" >Convert to</label>
            <select id="currency" className="form-control col-2" onChange={handleToChange}>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>

            <button type="button" className="btn btn-primary col-1 offset-1" onClick={handleClick}>Convert</button>

            <span>{convert && `${inputValue} ${fromCurrency} = ${convert} ${toCurrency}`}</span>
          </div>
      </form>
    </div>
  ) 
  
}

export default Home;