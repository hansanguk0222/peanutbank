import styled from 'styled-components';
import { ButtonWithIcon, IButtonWithIcon } from '@/src/components/molecules/IconWithButton';
import { A as StyledA } from '@/src/components/atoms/A';
import { calcRem } from '@/src/styles/theme';
import { Img } from '@/src/components/atoms/Img';

export interface IHeaderBar extends IButtonWithIcon {
  src: string;
}

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

export const HeaderBar: React.FC<IHeaderBar> = ({ buttonType, onClick, src }) => (
  <Container>
    <StyledA aType="headerBarLink" label="PeanutBank" />
    <RightSideContainer>
      <ButtonWithIcon buttonType={buttonType} onClick={onClick}>
        <Img alt="프로필" src={src} />
      </ButtonWithIcon>
    </RightSideContainer>
  </Container>
);
