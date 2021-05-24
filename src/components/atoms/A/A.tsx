import React from 'react';
import styled, { css } from 'styled-components';

interface AStyleProps {
  aType: 'leftSideBarLink' | 'defaultLink';
  isSelected?: boolean;
}

export interface AProps extends AStyleProps {
  onClick: (url: string) => void;
  label: string;
  url?: string;
}

const StyledA = styled.a<AStyleProps>`
  border: none;
  position: relative;
  ${(props) =>
    props.aType === 'leftSideBarLink' &&
    css<AStyleProps>`
      display: flex;
      align-items: center;
      background: ${(props) => (!props.isSelected ? props.theme.color.darkBlue1 : props.theme.color.darkBlue2)};
      color: ${(props) => props.theme.color.lightBlue};
      font-size: ${(props) => props.theme.size.font.m};
      padding: ${(props) => props.theme.size.padding.xxxs};
      align-items: start;
      &:hover {
        background: ${(props) => props.theme.color.darkBlue2};
        &:before {
          box-sizing: border-box;
          position: absolute;
          content: '';
          top: 0;
          left: 0;
          border-left: ${(props) => props.theme.size.border.BorderRightleftSideBarItem} solid ${(props) => props.theme.color.jade};
          border: 2px solid;
          border-color: ${(props) => props.theme.color.jade};
          height: 100%;
        }
      }
      ${(props) =>
        props.isSelected &&
        css`
          &:before {
            box-sizing: border-box;
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            border-left: ${(props) => props.theme.size.border.BorderRightleftSideBarItem} solid ${(props) => props.theme.color.jade};
            border: 2px solid;
            border-color: ${(props) => props.theme.color.jade};
            height: 100%;
          }
        `}
    `}
`;

export const A: React.FC<AProps> = ({ aType = 'defaultLink', label, onClick, isSelected, url }) => {
  return (
    <StyledA isSelected={isSelected} onClick={() => onClick(url)} aType={aType}>
      {label}
    </StyledA>
  );
};
