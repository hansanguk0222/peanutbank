import { LeftSideBar, LeftSideBarProps } from '@/src/components/molecules/LeftSideBar';
import { HeaderBar } from '@/src/components/organisms/HeaderBar';
import { ProfileButtonProps } from '@/src/components/molecules/ProfileButton';
import styled from 'styled-components';

export interface CommonLayoutProps extends Omit<LeftSideBarProps, 'onClick'>, Omit<ProfileButtonProps, 'onClick'> {
  headerBarOnClick: (modalVisible: boolean) => void;
  leftSideBarOnClick: (menu: string) => void;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
`;

export const CommonLayout: React.FC<CommonLayoutProps> = ({ buttonType, headerBarOnClick, leftSideBarOnClick, src, linkURLAndButtonTypes, children }) => (
  <Container>
    <HeaderBar buttonType={buttonType} onClick={headerBarOnClick} src={src} />
    <InnerContainer>
      <LeftSideBar linkURLAndButtonTypes={linkURLAndButtonTypes} onClick={leftSideBarOnClick} />
      {children}
    </InnerContainer>
  </Container>
);
