import { SagaStore, wrapper } from '@/src/store';
import { useTestState } from '@/src/hooks';
import styled from 'styled-components';
import { getJsonDataRequest, updateJsonDataRequest } from '@/src/store/slices/test.slice';
import { useDispatch } from 'react-redux';
import { END } from '@redux-saga/core';
import { LeftSideBar, LinkURLAndButtonType } from '@/src/components/molecules/LeftSideBar';
import React, { useState } from 'react';
import { Router } from 'next/dist/client/router';
import { CommonLayout } from '@/src/components/organisms/CommonLayout';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { jsonData } = useTestState();
  return <div>hi</div>;
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  store.dispatch(getJsonDataRequest({ num: 11 }));
  store.dispatch(END);

  await (store as SagaStore).sagaTask.toPromise();
});

export default Home;
