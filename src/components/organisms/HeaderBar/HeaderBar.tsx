import styled from 'styled-components';
import { ProfileButton, ProfileButtonProps } from '@/src/components/molecules/ProfileButton';
import { A as StyledA } from '@/src/components/atoms/A';
import { calcRem } from '@/src/styles/theme';

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${calcRem(22)};
  box-sizing: border-box;
`;

const RightSideContainer = styled.div`
  position: absolute;
  right: 0;
  padding: ${calcRem(20)};
`;

export const HeaderBar: React.FC<ProfileButtonProps> = ({ buttonType, onClick, src }) => (
  <Container>
    <StyledA aType="headerBarLink" label="PeanutBank" />
    <RightSideContainer>
      <ProfileButton buttonType={buttonType} onClick={onClick} src={src} />
    </RightSideContainer>
  </Container>
);
