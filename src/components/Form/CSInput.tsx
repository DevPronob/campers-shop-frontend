/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input } from 'antd';
import { Controller, Control, FieldError } from 'react-hook-form';

type TInputProps = {
  control?: Control<any>;
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: FieldError;
};

const CSInput = ({
  control,
  type = 'text',
  name,
  label,
  placeholder,
  disabled = false,
  required = false,
  error,
}: TInputProps) => {
  const isPassword = type === 'password';
  const InputComponent = isPassword ? Input.Password : Input;

  return (
    <Form.Item
      label={label}
      required={required}
      validateStatus={error ? 'error' : ''}
      help={error?.message}
      style={{ marginBottom: '20px' }}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <InputComponent
            {...field}
            id={name}
            size="large"
            type={type}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
      />
    </Form.Item>
  );
};

export default CSInput;
