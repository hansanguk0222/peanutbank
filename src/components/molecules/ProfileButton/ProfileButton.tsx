import { Button, ButtonProps } from '@/src/components/atoms/Button';
import { Img, ImgProps } from '@/src/components/atoms/Img';

export interface ProfileButtonProps extends ButtonProps, ImgProps {
  onClick: (modalVisible: boolean) => void;
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({ buttonType, onClick, src }) => (
  <Button buttonType={buttonType} onClick={onClick}>
    <Img src={src} />
  </Button>
);
