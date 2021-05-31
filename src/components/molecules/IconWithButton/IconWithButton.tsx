import { Button, ButtonProps } from '@/src/components/atoms/Button';
import { Img, ImgProps } from '@/src/components/atoms/Img';

export interface ButtonWithIconProps extends ButtonProps, ImgProps {
  onClick: () => void;
}

export const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({ buttonType, onClick, src }) => (
  <Button buttonType={buttonType} onClick={onClick}>
    <Img src={src} />
  </Button>
);
