import React from 'react';
import { A as LeftSideBarLink } from '@/src/components/atoms/A';
import styled from 'styled-components';
import { calcRem } from '@/src/styles/theme';
import Link from 'next/link';

export interface LinkURLAndButtonType {
  url: string;
  aType: 'leftSideBarLink' | 'defaultLink';
  label: string;
  isSelected: boolean;
}

export interface ILeftSideBar {
  linkURLAndButtonTypes: LinkURLAndButtonType[];
  onClick: (url: string) => void;
}

const StyledDiv = styled.div`
  width: ${calcRem(150)};
  background: ${(props) => props.theme.color.darkBlue1};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledUl = styled.ul`
  padding: 0;
  margin: 0;
`;

const StyledLi = styled.li`
  list-style: none;
  margin: 0;
`;

export const LeftSideBar: React.FC<ILeftSideBar> = ({ linkURLAndButtonTypes, onClick }) => {
  return (
    <StyledDiv>
      <StyledUl>
        {linkURLAndButtonTypes.map((linkURLAndButtonType) => {
          const { aType, url, label, isSelected } = linkURLAndButtonType;
          return (
            <StyledLi key={url}>
              <Link href={`/${url}`} passHref>
                <LeftSideBarLink aType={aType} label={label} isSelected={isSelected} onClick={() => onClick(url)} />
              </Link>
            </StyledLi>
          );
        })}
      </StyledUl>
    </StyledDiv>
  );
};
