import { SagaStore, wrapper } from '@/src/store';
import Head from 'next/head';
import { useTestState } from '@/src/hooks';
import styled from 'styled-components';
import { getJsonDataRequest, updateJsonDataRequest } from '@/src/store/slices/test.slice';
import { useDispatch } from 'react-redux';
import { END } from '@redux-saga/core';
import { LeftSideBar, LinkURLAndButtonType } from '@/src/components/molecules/LeftSideBar';
import React, { useState } from 'react';
import { Router } from 'next/dist/client/router';

const HomeBlock = styled.div`
  border: 1px solid rgb(255, 0, 0);
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 100px;
`;

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { jsonData } = useTestState();
  const [menu, setMenu] = useState<string>('incomeAndExpenditure');
  const onClick: (url: string) => void = (url: string) => {
    console.log(menu);
    setMenu(url);
  };
  const linkURLAndButtonTypes: LinkURLAndButtonType[] = [
    { aType: 'leftSideBarLink', url: 'incomeAndExpenditure', label: '수입/지출', isSelected: menu === 'incomeAndExpenditure' },
    { aType: 'leftSideBarLink', url: 'calendar', label: '달력', isSelected: menu === 'calendar' },
    { aType: 'leftSideBarLink', url: 'detail', label: '상세분석', isSelected: menu === 'detail' },
    { aType: 'leftSideBarLink', url: 'mypage', label: '마이페이지', isSelected: menu === 'mypage' },
  ];
  return (
    <>
      <HomeBlock>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <h1>Hello World</h1>
        </div>
        <button onClick={() => dispatch(updateJsonDataRequest({ id: 11, userId: 333, body: '수정되라', title: '갈치조림' }))}>누르면 id:11이 패치 됨</button>
        <button onClick={() => dispatch(getJsonDataRequest({ num: 11 }))}>누르면 id:11을 가져옴</button>
        <span style={{ fontSize: '10px' }}>{JSON.stringify(jsonData)}</span>
        <LeftSideBar linkURLAndButtonTypes={linkURLAndButtonTypes} onClick={onClick} />
      </HomeBlock>
      <style global jsx>
        {`
          html,
          body,
          body > div:first-child,
          div#__next,
          div#__next > div {
            height: 100%;
          }
        `}
      </style>
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  store.dispatch(getJsonDataRequest({ num: 11 }));
  store.dispatch(END);

  await (store as SagaStore).sagaTask.toPromise();
});

export default Home;