import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { ButtonWithIcon, IButtonWithIcon } from './IconWithButton';
import { Img } from '@/src/components/atoms/Img';
import { LeftArrow, RightArrow } from '@/public';

export default {
  title: 'molecules/ButtonWithIcon',
  component: ButtonWithIcon,
  argTypes: {},
} as Meta;

const Template: Story<IButtonWithIcon> = () => {
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
      <ButtonWithIcon buttonType="profileButton" onClick={toggleModalVisible}>
        <Img alt="프로필" src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg" />
      </ButtonWithIcon>
      <ButtonWithIcon buttonType="changeMonthButton" onClick={() => changeYearAndMonth({ upOrDown: 'down' })}>
        <LeftArrow />
      </ButtonWithIcon>
      <ButtonWithIcon buttonType="changeMonthButton" onClick={() => changeYearAndMonth({ upOrDown: 'up' })}>
        <RightArrow />
      </ButtonWithIcon>
    </>
  );
};

export const ButtonWithIconTest = Template.bind({});
ButtonWithIconTest.args = {};
