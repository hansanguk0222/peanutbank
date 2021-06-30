import { calcRem } from '@/src/styles/theme';
import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

export interface ISelectList {
  optionList: string[];
  id: string;
  value: string;
  onChange: (e: ChangeEvent) => void;
}

const Container = styled.select`
  border-right: none;
  border-left: none;
  border-top: none;
  border-bottom: ${calcRem(2)} solid ${(props) => props.theme.color.gray4};
  background: none;
  font-size: ${calcRem(20)};
  width: ${calcRem(250)};
  text-align-last: center;
  text-align: center;
  -ms-text-align-last: center;
  -moz-text-align-last: center;
  outline: none;
`;

export const SelectList: React.FC<ISelectList> = ({ value, onChange, optionList, id }) => {
  return (
    <Container onChange={onChange} data-testid={id} id={id} value={value}>
      {optionList.map((optionItem) => (
        <option key={optionItem}>{optionItem}</option>
      ))}
    </Container>
  );
};
