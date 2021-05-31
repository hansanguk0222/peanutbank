import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { ButtonWithIcon, ButtonWithIconProps } from './IconWithButton';

export default {
  title: 'molecules/ButtonWithIcon',
  component: ButtonWithIcon,
  argTypes: {},
} as Meta;

const Template: Story<ButtonWithIconProps> = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const toggleModalVisible: () => void = () => {
    setModalVisible(!modalVisible);
  };
  const [yearAndMonth, setYearAndMonth] = useState<{ year: number; month: number }>({ year: 2020, month: 1 });
  const changeYearAndMonth: ({ upOrDown }: { upOrDown: 'up' | 'down' }) => void = ({ upOrDown }: { upOrDown: 'up' | 'down' }) => {
    const { year, month } = yearAndMonth;
    if (upOrDown === 'down') {
      if (month === 1) {
        setYearAndMonth({ year: year - 1, month: 12 });
      } else {
        setYearAndMonth({ year, month: month - 1 });
      }
    } else {
      if (month === 12) {
        setYearAndMonth({ year: year + 1, month: 1 });
      } else {
        setYearAndMonth({ year, month: month + 1 });
      }
    }
    console.log(year, month);
  };
  return (
    <>
      <ButtonWithIcon buttonType="profileButton" onClick={toggleModalVisible} src="https://www.askbayou.com/wp-content/uploads/2021/02/square.jpg" />
      <ButtonWithIcon buttonType="changeMonthButton" onClick={() => changeYearAndMonth({ upOrDown: 'down' })} src="./leftarrow.png" />
      <ButtonWithIcon buttonType="changeMonthButton" onClick={() => changeYearAndMonth({ upOrDown: 'up' })} src="./rightarrow.png" />
    </>
  );
};

export const ButtonWithIconTest = Template.bind({});
ButtonWithIconTest.args = {};
