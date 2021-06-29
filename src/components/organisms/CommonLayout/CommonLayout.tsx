import { LeftSideBar, ILeftSideBar } from '@/src/components/molecules/LeftSideBar';
import { HeaderBar, IHeaderBar } from '@/src/components/organisms/HeaderBar';
import styled from 'styled-components';

export interface ICommonLayout extends Omit<ILeftSideBar, 'onClick'>, Omit<IHeaderBar, 'onClick'> {
  headerBarOnClick: () => void;
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

export const CommonLayout: React.FC<ICommonLayout> = ({ buttonType, headerBarOnClick, leftSideBarOnClick, src, linkURLAndButtonTypes, children }) => (
  <Container>
    <HeaderBar buttonType={buttonType} onClick={headerBarOnClick} src={src} />
    <InnerContainer>
      <LeftSideBar linkURLAndButtonTypes={linkURLAndButtonTypes} onClick={leftSideBarOnClick} />
      {children}
    </InnerContainer>
  </Container>
);
