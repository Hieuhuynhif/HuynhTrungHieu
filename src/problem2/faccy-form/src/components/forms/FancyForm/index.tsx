import {
  Backdrop,
  Box,
  Button,
  Fade,
  LinearProgress,
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
  loading: boolean;
  date: Dayjs;
};

export default function FancyForm({
  currencies,
  currentValues,
  handleCalculateCurrency,
  handleDateChange,
  loading,
  date,
}: Props) {
  const {
    control,
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: currentValues,
  });

  const handleChange = () => {
    resetField("output", { defaultValue: null });
  };

  return (
    <Paper elevation={4}>
      <Fade in={loading}>
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      </Fade>

      <Box p={4}>
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
              handleChange={handleChange}
            />
            <CurrencyController
              control={control}
              name="currencyOutput"
              currencies={currencies}
              label="Currency Output"
              handleChange={handleChange}
            />
          </Stack>

          <Stack direction={"row"} spacing={4}>
            <TextField
              {...register("input", { required: "Required" })}
              error={!!errors.input}
              helperText={errors.input?.message ?? " "}
              variant="outlined"
            />
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
            <Button
              type="submit"
              variant="outlined"
              sx={{ width: "30%" }}
              disabled={loading}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
      <Backdrop open={loading} />
    </Paper>
  );
}
