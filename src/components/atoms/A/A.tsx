import React from 'react';
import styled, { css } from 'styled-components';

interface AStyleProps {
  aType: 'leftSideBarLink' | 'headerBarLink' | 'defaultLink';
  isSelected?: boolean;
}

export interface AProps extends AStyleProps {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  label: string;
}

const StyledA = styled.a<AStyleProps>`
  border: none;
  position: relative;
  &:hover {
    cursor: pointer;
  }
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
  ${(props) =>
    props.aType === 'headerBarLink' &&
    css`
      color: ${(props) => props.theme.color.black1};
      font-size: ${(props) => props.theme.size.font.xxxl};
    `}
`;

export const A = React.forwardRef<HTMLAnchorElement, AProps>(({ onClick, aType, label, isSelected }, ref) => {
  return (
    <StyledA ref={ref} isSelected={isSelected} onClick={onClick} aType={aType}>
      {label}
    </StyledA>
  );
});
