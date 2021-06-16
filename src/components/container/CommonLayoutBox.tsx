import React, { useState, useEffect } from 'react';
import { CommonLayout } from '@/src/components/organisms/CommonLayout';
import { LinkURLAndButtonType } from '@/src/components/molecules/LeftSideBar';
import { NextComponentType } from 'next';
import { useRouter } from 'next/router';

interface CommonLayoutBoxPros {
  src: string;
  routerPath: string;
}

export const CommonLayoutBox: React.FC<CommonLayoutBoxPros> = ({ src, children, routerPath }) => {
  const [menu, setMenu] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const leftSideBarOnClick: (url: string) => void = (url: string) => {
    setMenu(url);
  };
  const headerBarOnClick: () => void = () => {
    setModalVisible(!modalVisible);
  };
  const linkURLAndButtonTypes: LinkURLAndButtonType[] = [
    { aType: 'leftSideBarLink', url: 'income-and-expenditure', label: '수입/지출', isSelected: menu === 'income-and-expenditure' },
    { aType: 'leftSideBarLink', url: 'calendar', label: '달력', isSelected: menu === 'calendar' },
    { aType: 'leftSideBarLink', url: 'detail', label: '상세분석', isSelected: menu === 'detail' },
    { aType: 'leftSideBarLink', url: 'mypage', label: '마이페이지', isSelected: menu === 'mypage' },
  ];

  useEffect(() => {
    setMenu(routerPath);
  }, []);

  return (
    <CommonLayout buttonType="profileButton" headerBarOnClick={headerBarOnClick} leftSideBarOnClick={leftSideBarOnClick} linkURLAndButtonTypes={linkURLAndButtonTypes} src={src}>
      {children}
    </CommonLayout>
  );
};
