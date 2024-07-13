import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { useForm } from "react-hook-form";
import CurrencyController from "../../controllers/CurrencyController";
import { Currency, FormValues } from "./type";

type Props = {
  handleCalculateCurrency: (value: FormValues) => void;
  handleDateChange: (value: Dayjs | null) => void;
  currentValues: FormValues;
  currencies: Currency[];
  date: Dayjs;
};

export default function FancyForm({
  currencies,
  currentValues,
  handleCalculateCurrency,
  handleDateChange,
  date,
}: Props) {
  const { control, register, handleSubmit } = useForm<FormValues>({
    defaultValues: currentValues,
  });

  return (
    <Paper sx={{ p: 4 }} elevation={4}>
      <Box mb={5}>
        <Typography variant="caption" fontSize={"2rem"}>
          Currency Converter
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(handleCalculateCurrency)}>
        <Stack direction={"row"} spacing={4}>
          <CurrencyController
            control={control}
            name="currencyInput"
            currencies={currencies}
            label="Currency Input"
          />
          <CurrencyController
            control={control}
            name="currencyOutput"
            currencies={currencies}
            label="Currency Output"
          />
        </Stack>

        <Stack direction={"row"} spacing={4}>
          <TextField {...register("input")} variant="outlined" />
          <TextField
            {...register("output")}
            variant="filled"
            InputProps={{ readOnly: true }}
          />
        </Stack>

        <Box mt={4}>
          <DatePicker
            value={date}
            onChange={(value, _) => handleDateChange(value)}
          />
        </Box>

        <Box mt={4}>
          <Button type="submit" variant="outlined" sx={{ width: "30%" }}>
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
