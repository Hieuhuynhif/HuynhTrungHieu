import { Autocomplete, Box, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { Currency, FormValues } from "../../forms/FancyForm/type";

type Props = {
  control: Control<FormValues>;
  currencies: Currency[];
  label: string;
  name: keyof FormValues;
};

export default function CurrencyController({
  control,
  currencies,
  name,
  label,
}: Props) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: "Required !",
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Autocomplete
          fullWidth
          value={value as Currency}
          isOptionEqualToValue={(option, value) =>
            option?.currency === value?.currency
          }
          onChange={(_event, value) => onChange(value)}
          getOptionLabel={(opt) => opt.currency}
          options={currencies}
          renderOption={(props, opt) => (
            <Box {...props} key={opt.currency}>
              {opt.currency} - {opt.price}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!error}
              helperText={error?.message ?? " "}
            />
          )}
        />
      )}
    />
  );
}
