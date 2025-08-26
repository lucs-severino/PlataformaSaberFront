import { useState, useEffect, useRef, type ButtonHTMLAttributes, useId, type ChangeEvent } from "react";
import { Container, Label, SelectWrapper, SelectTrigger, OptionsList, OptionItem } from "./styles";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
  label?: string;
  options: { label: string; value: string }[];
  value?: string;
  name?: string;
  onChange?: (event: { target: { name?: string; value: string } }) => void;
};

const SelectInput = ({ label, options, name, value, onChange, ...rest }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const fallbackId = useId();
  const id = rest.id || fallbackId;

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue: string) => {
    if (onChange) {
      const syntheticEvent = {
        target: {
          name,
          value: optionValue,
        },
      } as unknown as ChangeEvent<HTMLSelectElement>;

      onChange(syntheticEvent);
    }
    setIsOpen(false);
  };

  return (
    <Container>
      {label && <Label htmlFor={id}>{label}</Label>}
      <SelectWrapper ref={wrapperRef}>
        <SelectTrigger
          id={id}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          {...rest}
        >
          {selectedOption?.label || "Selecione..."}
        </SelectTrigger>
        <OptionsList $isOpen={isOpen} role="listbox">
          {options.map((option, key) => (
            <OptionItem
              key={key}
              onClick={() => handleOptionClick(option.value)}
              role="option"
              aria-selected={value === option.value}
            >
              {option.label}
            </OptionItem>
          ))}
        </OptionsList>
      </SelectWrapper>
    </Container>
  );
};

export default SelectInput;
