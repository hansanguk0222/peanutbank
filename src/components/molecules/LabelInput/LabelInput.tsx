import React from 'react';
import styled, { css } from 'styled-components';
import { ILabel, Label } from '@/src/components/atoms/Label';
import { Input, IInput } from '@/src/components/atoms/Input';

export interface ILabelInput extends IInput, ILabel {
  labelValue: string;
}

export const LabelInput: React.FC<ILabelInput> = ({ inputType, labelValue, onChange, readOnly, text, labelType, label, list, incomeOrExpenditure }) => {
  return (
    <Label labelType={labelType}>
      {labelValue}
      <Input inputType={inputType} onChange={onChange} readOnly={readOnly} text={text} label={label} list={list} incomeOrExpenditure={incomeOrExpenditure} />
    </Label>
  );
};
