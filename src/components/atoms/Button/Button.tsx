import React from 'react';
import styled, { css } from 'styled-components';
import { calcRem } from '@/src/styles/theme';

interface ButtonStyleProps {
  buttonType: 'changeMonthButton' | 'profileButton' | 'submitButton' | 'cancelButton' | 'closeModalButton' | 'removeItemButton' | 'defaultButton';
  isSelected?: boolean;
  testId?: string;
}

export interface ButtonProps extends ButtonStyleProps {
  onClick: (args: any) => void;
}

const StyledButton = styled.button<ButtonStyleProps>`
  ${(props) =>
    props.buttonType === 'profileButton' &&
    css`
      position: relative;
      border-radius: 50%;
      width: ${calcRem(50)};
      height: ${calcRem(50)};
      border: none;
      outline-color: white;
      &:hover {
        cursor: pointer;
      }
      &:hover {
        &: after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: ${calcRem(50)};
          height: ${calcRem(50)};
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
        }
      }
    `}
  ${(props) =>
    props.buttonType === 'changeMonthButton' &&
    css`
      background: none;
      height: ${calcRem(25)};
      width: ${calcRem(15)};
    `}
`;

export const Button: React.FC<ButtonProps> = ({ buttonType = 'defaultButton', onClick, isSelected, children, testId }) => {
  return (
    <StyledButton data-testid={testId} isSelected={isSelected} onClick={onClick} buttonType={buttonType}>
      {children}
    </StyledButton>
  );
};
