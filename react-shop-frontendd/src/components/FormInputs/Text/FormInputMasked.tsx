import React, { forwardRef } from "react";
import { TextField } from "@mui/material";
import { IMaskInput } from "react-imask";
import { Controller, useFormContext } from "react-hook-form";
import type { BaseFormInputTextProps } from "./types";
import type { TextFieldProps } from "@mui/material/TextField";
import type { IMaskInputProps } from "react-imask";

type MaskOptions = Omit<IMaskInputProps<unknown>, "onAccept" | "inputRef">;

type Props = BaseFormInputTextProps &
  TextFieldProps & {
    maskOptions: MaskOptions;
  };

type MaskedInputProps = MaskOptions & {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(function MaskedInput(
  { onChange, ...rest },
  ref,
) {
  return (
    <IMaskInput
      {...rest}
      inputRef={ref}
      onAccept={(value) =>
        onChange({ target: { name: rest.name ?? "", value: String(value ?? "") } })
      }
    />
  );
});

const FormInputMasked: React.FC<Props> = ({ name, maskOptions, ...textFieldProps }) => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <TextField
          {...textFieldProps}
          value={value ?? ""}
          onChange={onChange}
          sx={{ mb: 2 }}
          fullWidth
          error={!!errors[name]}
          helperText={errors[name]?.message ?? ""}
          InputProps={{
            ...(textFieldProps.InputProps ?? {}),
            inputComponent: MaskedInput as unknown as React.ElementType,
            inputProps: {
              ...(textFieldProps.InputProps?.inputProps ?? {}),
              ...maskOptions,
              name,
            },
          }}
        />
      )}
    />
  );
};

export default FormInputMasked;
