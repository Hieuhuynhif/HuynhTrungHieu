import { Autocomplete, Box, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import srcDefault from "../../../assets/react.svg";
import { Currency, FormValues } from "../../forms/FancyForm/type";

type Props = {
  control: Control<FormValues>;
  currencies: Currency[];
  label: string;
  name: keyof FormValues;
  handleChange: () => void;
};

export default function CurrencyController({
  control,
  currencies,
  name,
  label,
  handleChange,
}: Props) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: "Select a Currency",
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const svgURL = `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${
          (value as Currency)?.currency
        }.svg`;

        return (
          <Autocomplete
            fullWidth
            value={value as Currency}
            isOptionEqualToValue={(option, value) =>
              option?.currency === value?.currency &&
              option.price === option.price
            }
            onChange={(_event, value) => {
              handleChange();
              onChange(value);
            }}
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
                label={<img src={value ? svgURL : srcDefault} />}
                error={!!error}
                helperText={error?.message ?? " "}
              />
            )}
          />
        );
      }}
    />
  );
}
