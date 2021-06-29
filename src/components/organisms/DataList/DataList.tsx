import React from 'react';
import { Icategory } from '@/src/type/store';
import { LabelInput, ILabelInput } from '@/src/components/molecules/LabelInput';

export interface IDataList extends ILabelInput {
  id: string;
  optionList: Icategory[];
}

export const DataList: React.FC<IDataList> = ({ id, optionList, inputType, labelType, labelValue, onChange, readOnly, text, incomeOrExpenditure, label, list }) => {
  return (
    <>
      <LabelInput
        inputType={inputType}
        labelValue={labelValue}
        onChange={onChange}
        labelType={labelType}
        readOnly={readOnly}
        text={text}
        incomeOrExpenditure={incomeOrExpenditure}
        label={label}
        list={list}
      />
      <datalist id={id}>{id === 'categoryList' && optionList.map((optionItem) => <option key={optionItem.id} value={optionItem.name} />)}</datalist>
    </>
  );
};
