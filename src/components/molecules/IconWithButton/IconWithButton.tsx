import { Button, IButton } from '@/src/components/atoms/Button';

export interface IButtonWithIcon extends IButton {
  onClick: (e) => void;
}

export const ButtonWithIcon: React.FC<IButtonWithIcon> = ({ buttonType, onClick, children, testId }) => (
  <Button buttonType={buttonType} onClick={onClick} testId={testId}>
    {children}
  </Button>
);
