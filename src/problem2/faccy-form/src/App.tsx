import "./App.css";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useEffect, useState } from "react";
import FancyForm from "./components/forms/FancyForm";
import { Currency, FormValues } from "./components/forms/FancyForm/type";
import { currencies } from "./seed";

function App() {
  const [filterCurrencies, setFilterCurrencies] = useState(
    ([] as Currency[]) ?? 1
  );

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(dayjs());

  const [currentValue, setCurrentValue] = useState({
    currencyInput: null,
    currencyOutput: null,
    input: null,
    output: null,
  } as FormValues);

  const handleCalculateCurrency = useCallback((value: FormValues) => {
    setLoading(true);
    setTimeout(() => {
      const { input, currencyInput, currencyOutput } = value;
      if (!currencyInput || !currencyOutput || !input) return;
      const output = (input * currencyInput.price) / currencyOutput.price;
      setCurrentValue({
        ...value,
        output: output,
      });
      setLoading(false);
    }, 750);
  }, []);

  const handleDateChange = useCallback((newDate: Dayjs | null) => {
    newDate = newDate ?? dayjs();
    const filterCurrencies = currencies.reduce((acc, cur) => {
      if (!acc[cur.currency]) {
        acc[cur.currency] = cur;
      } else {
        const oldCurrency = acc[cur.currency];
        if (
          (newDate >= dayjs(cur.date) &&
            dayjs(cur.date) >= dayjs(oldCurrency.date)) ||
          (newDate <= dayjs(oldCurrency.date) && newDate >= dayjs(cur.date))
        )
          if (cur.price > oldCurrency.price)
            // if equal date, then get max price
            acc[cur.currency] = cur;
      }

      return acc;
    }, {} as { [key: string]: Currency });

    const listCurrencies: Currency[] = Object.values(filterCurrencies);
    setDate(newDate);
    setFilterCurrencies(listCurrencies);
    setCurrentValue({
      currencyInput: null,
      currencyOutput: null,
      input: null,
      output: null,
    });
  }, []);

  useEffect(() => {
    handleDateChange(dayjs());
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FancyForm
        currencies={filterCurrencies}
        key={(currentValue.input ?? 0) + (currentValue.output ?? 0)}
        handleCalculateCurrency={handleCalculateCurrency}
        currentValues={currentValue}
        handleDateChange={handleDateChange}
        loading={loading}
        date={date}
      />
    </LocalizationProvider>
  );
}

export default App;
