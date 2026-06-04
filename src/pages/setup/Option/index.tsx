import { TextField } from "../../../components";
import { useOption } from "../../../hooks/useSetup";
import { type SetupName } from "../../../store/useSetupStore";

interface InputProps {
  label: string;
  name: SetupName;
}

const Option = ({ label, name }: InputProps) => {
  const { value, handleChange } = useOption({ name });

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      name={name}
      type="number"
      step={1}
    />
  );
};

export default Option;
