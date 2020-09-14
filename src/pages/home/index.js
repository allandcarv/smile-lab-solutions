import React, {useState, useCallback, useEffect, useRef} from 'react';

const Home = () => {
  const [convert, setConvert] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [currencies, setCurrencies] = useState({});

  const fromRef = useRef(null);
  const toRef = useRef(null);

  const loadRates = useCallback(async (currency) => {
    setConvert('');

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`);

    const json = await response.json();

    setCurrencies(json.rates);
  }, []);

  const handleClick = useCallback(() => {
    const fromCurrency= fromRef.current.value;
    const keys = Object.keys(currencies);
    const values = Object.values(currencies);

    const index = keys.indexOf(fromCurrency);

    setConvert(inputValue / values[index]);
    
  }, [currencies, inputValue]);

  const handleToChange = useCallback(async (event) => {
    loadRates(event.target.value);
  }, [loadRates])

  const handleInputChange = useCallback((event) => {
    setConvert('');
    setInputValue(event.target.value);
  }, []);

  useEffect(() => {
   loadRates('EUR');
  }, [loadRates]);

  return (
    <div className='container'>
      <div className='row'>
        <div className='jumbotron col-12'>
          <h1 className='display-5'>Currency Calculator</h1>
          <p>Convert the currency</p>

          <form>
              <div className='form-group col-12 row'>
                <input type="number" className="form-control col-3" id="input_value"onChange={handleInputChange} />
                <select className="form-control col-2 offset-1" ref={fromRef}>
                {Object.keys(currencies).map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
                  
                </select>

                <label className="col-2 text-right" >Convert to</label>
                <select className="form-control col-2" onChange={handleToChange} ref={toRef}>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                </select>

                <button type="button" className="btn btn-primary col-1 offset-1" onClick={handleClick}>Convert</button>

                <span>{convert && `${inputValue} ${fromRef.current.value} = ${convert} ${toRef.current.value}`}</span>
              </div>
          </form>
        </div>
      </div>
    </div>
  ) 
  
}

export default Home;