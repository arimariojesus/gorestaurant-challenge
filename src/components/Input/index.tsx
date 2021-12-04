import {
  useEffect,
  useRef,
  useState,
  useCallback,
  InputHTMLAttributes,
  FocusEventHandler,
} from "react";

import { useField } from "@unform/core";

import { Container } from "./styles";
import { IconType } from "react-icons";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: IconType;
}

const Input = ({ name, icon: Icon, ...rest }: IInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField } = useField(name);

  const handleInputFocus = useCallback<FocusEventHandler<HTMLInputElement>>(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback<FocusEventHandler<HTMLInputElement>>(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};

export default Input;
