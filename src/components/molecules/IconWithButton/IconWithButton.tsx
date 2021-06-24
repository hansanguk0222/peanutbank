import { Button, ButtonProps } from '@/src/components/atoms/Button';

export interface ButtonWithIconProps extends ButtonProps {
  onClick: () => void;
}

export const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({ buttonType, onClick, children, testId }) => (
  <Button buttonType={buttonType} onClick={onClick} testId={testId}>
    {children}
  </Button>
);
