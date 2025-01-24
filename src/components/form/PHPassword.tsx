import { Controller } from "react-hook-form";
import { Form, Input } from "antd";

type TInputProps = {
  name: string;
  label?: string;
  disabled?: boolean;
};
export default function PHPassword({  name, label, disabled }: TInputProps) {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input.Password
              variant="filled"
              {...field}
              id={name}
              size="large"
              disabled={disabled}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
}
