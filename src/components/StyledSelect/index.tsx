import { Field } from 'formik';
import { IValidator } from '../../pages/registration/RegistrationForm/validators/types';
import { SelectStyles } from './style';

export function CustomFormikSelect({
  defaultOption,
  name,
  options,
  getValidationMsg,
  disabled,
}: {
  disabled?: boolean;
  defaultOption: string;
  name: string;
  options: JSX.Element[];
  getValidationMsg?: IValidator;
}) {
  return (
    <Field
      disabled={disabled}
      name={name}
      as="select"
      validate={getValidationMsg}
      style={SelectStyles} // had to make styles inline, since styled-components need "$" for custom props and Formik needs "as" without "$" to make "select"
    >
      <option value="" hidden>
        {defaultOption}
      </option>
      {options}
    </Field>
  );
}

CustomFormikSelect.defaultProps = {
  disabled: false,
  getValidationMsg: null,
};
