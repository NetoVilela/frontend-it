import { FormControlLabel, Grid, MenuItem, Switch, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { ChangeEventHandler } from 'react';


type MyFieldProps = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  value?: string;
}
export const MyField = ({ name, label, type, required = false, value, ...props }: MyFieldProps) => {
  return (
    <Field name={name}>
      {({ field }) => (<TextField {...field} value={value || ""} label={label} type={type} {...props} fullWidth required={required} InputLabelProps={{ shrink: true }} size="small" />
      )}
    </Field>
  )
}

type MyErrorMsgProps = {
  name: string;
}
export const MyErrorMsg = ({ name }: MyErrorMsgProps) => {
  return (
    <ErrorMessage name={name} component={({ children }) => (
      <Typography color="rgb(216, 27, 96)" fontSize="11px">{children}</Typography>
    )} />
  )
}

type keyValue = {
  value: number | string;
  label: string;
}
type MySelectProps = {
  label: string;
  name: string;
  value: number;
  options: keyValue[];
  error?: boolean;
  txtError?: string;
  required?: boolean;
  onChangeProps: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;

}
export const MySelect = ({ label, name, value, options, error, txtError, required = false, onChangeProps }: MySelectProps) => {
  return (
    <Grid container>
      <TextField
        select
        label={label}
        name={name}
        value={value > 0 ? value : -1}
        fullWidth
        onChange={onChangeProps}
        required={required}
        size="small"
      >
        <MenuItem key={-1} value={-1}>
          --
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {
        error ?
          <Typography color="rgb(216, 27, 96)" fontSize="11px">
            {txtError}
          </Typography>
          : ""
      }
    </Grid>
  )
}

type MySwitchProps = {
  value: boolean;
  name: string;
  label: string;
  labelPlacement?: "end" | "top" | "start" ;
  onChangeProps: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}
export const MySwitch = ({ value, name, label, labelPlacement = "end", onChangeProps }: MySwitchProps) => {
  return (
    <FormControlLabel
      control={
        <Switch sx={{
          transform: "scale(1.3)",
        }}
          checked={value}
          onChange={onChangeProps}
          name={name}
        />
      }
      label={label}
      labelPlacement={labelPlacement}
    />
  )
}
