import React from 'react';
import { Story, Meta } from '@storybook/react';
import { SelectedDateLedgers } from './SelectedDateLedgers';
import { categorys } from '@/src/__test__/__feature__';

export default {
  title: 'organisms/SelectedDateLedgers',
  component: SelectedDateLedgers,
  argTypes: {},
} as Meta;

const Template: Story = (args) => {
  const onClickCard = (e: MouseEvent) => {
    e.preventDefault();
    console.log(e);
  };
  const onClickRemoveButton = (e: MouseEvent) => {
    e.preventDefault();
  };
  return (
    <div style={{ width: '1000', height: '1000' }}>
      <SelectedDateLedgers
        categorys={categorys}
        onClickCard={onClickCard}
        ledgers={[
          { id: 'abc4', description: '당구비ㅇㄹ라ㅓㅣ러ㅏㅓ리너라ㅣㅇ러ㅣ너래ㅑㅈㄷ랴ㅐ져ㅐㄹ져ㅑㅐㄱ', categoryId: 'c', amount: 500034245242434 },
          { id: 'abc5', description: '박카스', categoryId: 'a', amount: 500 },
        ]}
        onClickRemoveButton={onClickRemoveButton}
        selectedDate="2021-06-02"
      />
    </div>
  );
};

export const SelectedDateLedgersTest = Template.bind({});
SelectedDateLedgersTest.args = {};
