import { calcRem } from '@/src/styles/theme';
import React from 'react';
import styled from 'styled-components';
import { X } from '@/public/svg';
import { Span, ISpan } from '@/src/components/atoms/Span';
import { ButtonWithIcon, IButtonWithIcon } from '@/src/components/molecules/IconWithButton';
import { ILedger, ICategory } from '@/src/type/store';
import { changeNumberForm } from '@/src/utils';

const Container = styled.div`
  box-sizing: border-box;
  width: ${calcRem(350)};
  max-height: ${calcRem(200)};
  background: ${(props) => props.theme.color.white};
  padding: ${calcRem(10)};
  overflow: auto;
  background: ${(props) => props.theme.color.gray5};
`;

const Card = styled.div`
  width: 100%;
  padding: ${calcRem(4)} ${calcRem(10)};
  height: ${calcRem(70)};
  border: ${calcRem(2)} solid ${(props) => props.theme.color.gray4};
  background: ${(props) => props.theme.color.white};
  border-radius: ${calcRem(5)};
  margin-bottom: ${calcRem(5)};
  box-shadow: ${(props) => props.theme.boxShadow.thinDarkGray};
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTags = styled.div`
  width: ${calcRem(250)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${calcRem(5)};
`;

export interface ISelectedDateLedgers {
  ledgers: ILedger[];
  categorys: ICategory[];
  onClickCard: (e) => void;
  selectedDate: string;
  onClickRemoveButton: (e) => void;
}

export const SelectedDateLedgers: React.FC<ISelectedDateLedgers> = ({ ledgers, categorys, onClickCard, onClickRemoveButton, selectedDate }) => {
  return (
    <Container aria-label="selectedDateLedgers">
      {ledgers.map((ledger) => {
        const [category] = categorys.filter((category) => category.id === ledger.categoryId);
        return (
          <Card key={ledger.id} onClick={onClickCard}>
            <CardHeader>
              <CardTags>
                <Span spanType="selectedDatedCardCategory" categoryBackground={category.color}>
                  {category.name}
                </Span>
                <Span spanType="selectedDateCardAmount" incomeOrExpenditure={ledger.incomeOrExpenditure}>
                  {changeNumberForm(ledger.amount)}
                </Span>
                <Span spanType="selectedDateCardDate">{selectedDate}</Span>
              </CardTags>
              <ButtonWithIcon buttonType="removeItemButton" onClick={onClickRemoveButton}>
                <X width={10} height={10} />
              </ButtonWithIcon>
            </CardHeader>
            <Span spanType="selectedDateCardDiscription">{ledger.discription}</Span>
          </Card>
        );
      })}
    </Container>
  );
};
