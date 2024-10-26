import { ErrorMessage, Field } from 'formik';

export const reg = new RegExp('^[0-9]+$');
export const decimalReg = new RegExp('^[0-9]*\\.?[0-9]*$');

export const formatNumberWithCommas = (number) => {
  if (!number) return '';
  const [integerPart, decimalPart] = number.split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

export const NumericField = (event, setFieldValue, allowDecimal = false) => {
  let { value, name } = event.target;

  // Remove non-numeric characters except for digits and a single decimal point if decimals are allowed
  value = allowDecimal ? value.replace(/[^\d.]/g, '') : value.replace(/[^\d]/g, '');

  // Ensure only one decimal point if decimals are allowed
  if (allowDecimal) {
    const parts = value.split('.');
    if (parts?.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
  }

  // Test the value against the appropriate regular expression
  const isValid = allowDecimal ? decimalReg.test(value) : reg.test(value);

  if (isValid || value === '') {
    const formattedValue = formatNumberWithCommas(value);
    setFieldValue(name, formattedValue);
  }
};

export const InputField = ({ type, name, placeholder, id, required, lable, onInput, disabled }) => (
  <>
    <label htmlFor={id} className='form-label'> {lable} {required && <span className='text-red-600'>*</span>}</label>
    <Field type={type} name={name} id={id} className='bg-white input_font border border-gray-300 text-black text-sm rounded-lg focus:ring-0 block w-full p-2.5 focus:outline-none' placeholder={placeholder} onInput={onInput} disabled={disabled} />
    <ErrorMessage component='div' name={name} className='text-red-600' />
  </>
);

export const InputNumbrField = ({ type, name, placeholder, id, required, lable, onInput, onChange, disabled }) => (
  <>
    <label htmlFor={id} className='form-label'> {lable} {required && <span className='text-red-600'>*</span>}</label>
    <Field type={type} name={name} id={id} className='bg-white input_font border border-gray-300 text-black text-sm rounded-lg focus:ring-0 block w-full p-2.5 focus:outline-none' placeholder={placeholder} onInput={onInput} disabled={disabled} onChange={onChange} />
    <ErrorMessage component='div' name={name} className='text-red-600' />
  </>
);

export const TextareaField = ({ name, placeholder, id, required, lable, onInput, rows }) => (
  <>
    <label htmlFor={id} className='form-label'> {lable} {required && <span className='text-red-600'>*</span>}
    </label>
    <Field as='textarea' name={name} id={id} className='w-full input_font form-control p-4 border border-black !rounded-lg py-2' placeholder={placeholder} onInput={onInput} rows={rows} />
    <ErrorMessage component='div' name={name} className='text-red-600' />
  </>
);
