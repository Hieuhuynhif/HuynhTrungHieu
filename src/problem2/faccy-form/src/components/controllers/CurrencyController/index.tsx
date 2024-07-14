import { Autocomplete, Box, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
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
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Autocomplete
          fullWidth
          value={value as Currency}
          isOptionEqualToValue={(option, value) =>
            option?.currency === value?.currency && option.price === value.price
          }
          onChange={(_event, value) => {
            handleChange();
            onChange(value);
          }}
          getOptionLabel={(opt) => opt.currency}
          options={currencies}
          renderOption={(props, opt) => {
            const { key, ...optionProps } = props;
            return (
              <Box
                key={key}
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...optionProps}
              >
                <img
                  width="20"
                  src={`/tokens/${(opt as Currency).currency}.svg`}
                />
                {opt.currency}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                value ? (
                  <img src={`/tokens/${(value as Currency).currency}.svg`} />
                ) : (
                  label
                )
              }
              error={!!error}
              helperText={error?.message ?? " "}
            />
          )}
        />
      )}
    />
  );
}
