import "./App.css";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useEffect, useState } from "react";
import FancyForm from "./components/forms/FancyForm";
import { Currency, FormValues } from "./components/forms/FancyForm/type";
import { currencies } from "./seed";

function App() {
  const [filterCurrencies, setFilterCurrencies] = useState([] as Currency[]??1);
  const [currentValue, setCurrentValue] = useState({
    currencyInput: null,
    currencyOutput: null,
    input: 0,
    output: 0,
  } as FormValues);

  const handleCalculateCurrency = useCallback((value: FormValues) => {
    const { input, currencyInput, currencyOutput } = value;
    if (!currencyInput || !currencyOutput) return;
    const output = (input * currencyInput.price) / currencyOutput.price;
    setCurrentValue({
      ...value,
      output: output,
    });
  }, []);

  const handleDateChange = useCallback((date: Dayjs | null) => {
    date = date ?? dayjs();

    const filterCurrencies = currencies.reduce((acc, cur) => {
      if (!acc[cur.currency]) {
        acc[cur.currency] = cur;
      } else {
        const oldCurrency = acc[cur.currency];
        if (
          (date >= dayjs(cur.date) &&
            dayjs(cur.date) >= dayjs(oldCurrency.date)) ||
          (date <= dayjs(oldCurrency.date) && date >= dayjs(cur.date))
        )
          if (cur.price > oldCurrency.price)
            // if equal date, then get max price
            acc[cur.currency] = cur;
      }

      return acc;
    }, {} as { [key: string]: Currency });

    const listCurrencies: Currency[] = Object.values(filterCurrencies);

    setFilterCurrencies(listCurrencies);
  }, []);

  useEffect(() => {
    handleDateChange(dayjs());
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FancyForm
        currencies={filterCurrencies}
        handleCalculateCurrency={handleCalculateCurrency}
        currentValues={currentValue}
        date={dayjs()}
        handleDateChange={handleDateChange}
        key={currentValue.output}
      />
    </LocalizationProvider>
  );
}

export default App;
