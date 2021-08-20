import IconInputStyles from './IconInput.module.css';

interface IconInput {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  icon: React.ReactNode;
  placeholder: string;
}

const IconInput: React.FC<IconInput> = ({
  icon,
  onChange,
  value,
  placeholder,
}) => {
  return (
    <div className={IconInputStyles.iconInputContainer}>
      <span className={`${IconInputStyles.insetInputWithIcon}`}>{icon}</span>
      {/* TODO add common input */}
      <input
        className={IconInputStyles.iconInput}
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default IconInput;
