import { SagaStore, wrapper } from '@/src/store';
import { useTestState } from '@/src/hooks';
import styled from 'styled-components';
import { getAccountBookRequest } from '@/src/store/slices/accountBook.slice';
import { useDispatch } from 'react-redux';
import { END } from '@redux-saga/core';
import { LeftSideBar, LinkURLAndButtonType } from '@/src/components/molecules/LeftSideBar';
import React, { useState } from 'react';
import { Router } from 'next/dist/client/router';
import { CommonLayout } from '@/src/components/organisms/CommonLayout';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  return <div>hi</div>;
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  store.dispatch(getAccountBookRequest({ userId: 'abc', year: 2021, month: 6 }));
  store.dispatch(END);

  await (store as SagaStore).sagaTask.toPromise();
});

export default Home;
