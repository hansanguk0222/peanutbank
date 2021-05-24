import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonStyleProps {
  buttonType: 'leftSideBarButton' | 'changeMonthButton' | 'profileButton' | 'submitButton' | 'cancleButton' | 'closeModalButton' | 'removeItemButton' | 'defaultButton';
  isSelected?: boolean;
}

export interface ButtonProps extends ButtonStyleProps {
  onClick: (url: string) => void;
  label: string;
  url?: string;
}

const StyledButton = styled.button<ButtonStyleProps>`
  border: none;
  position: relative;
  ${(props) =>
    props.buttonType === 'leftSideBarButton' &&
    css<ButtonStyleProps>`
      background: ${(props) => (!props.isSelected ? props.theme.color.darkBlue1 : props.theme.color.darkBlue2)};
      color: ${(props) => props.theme.color.lightBlue};
      font-size: ${(props) => props.theme.size.font.m};
      padding: ${(props) => props.theme.size.padding.xxxs};
      align-items: start;
      height: ${(props) => props.theme.size.height.m};
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

export const Button: React.FC<ButtonProps> = ({ buttonType = 'defaultButton', label, onClick, isSelected, url }) => {
  return (
    <StyledButton isSelected={isSelected} onClick={() => onClick(url)} buttonType={buttonType}>
      {label}
    </StyledButton>
  );
};
