import styled from 'styled-components';
import { ButtonWithIcon, ButtonWithIconProps } from '@/src/components/molecules/IconWithButton';
import { Input as DateInput, InputProps } from '@/src/components/atoms/Input';

export interface ChangeMonthBarProps extends Omit<ButtonWithIconProps, 'onClick' | 'src'>, Omit<InputProps, 'onChange'> {
  leftArrowOnClick: () => void;
  rightArrowOnClick: () => void;
  leftIconSrc: string;
  rightIconSrc: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
`;

export const ChangeMonthBar: React.FC<ChangeMonthBarProps> = ({ buttonType, inputType, leftArrowOnClick, rightArrowOnClick, leftIconSrc, rightIconSrc, text, readOnly }) => {
  return (
    <Container>
      <ButtonWithIcon buttonType={buttonType} src={leftIconSrc} onClick={leftArrowOnClick} />
      <DateInput inputType={inputType} onChange={() => {}} readOnly={readOnly} text={text} />
      <ButtonWithIcon buttonType={buttonType} src={rightIconSrc} onClick={rightArrowOnClick} />
    </Container>
  );
};
