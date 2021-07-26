import { SagaStore, wrapper } from '@/src/store';
import styled from 'styled-components';
import { getAccountBookRequest } from '@/src/store/slices/accountBook.slice';
import { useDispatch } from 'react-redux';
import { END } from '@redux-saga/core';
import { LeftSideBar, LinkURLAndButtonType } from '@/src/components/molecules/LeftSideBar';
import React, { useState } from 'react';
import { Router } from 'next/dist/client/router';
import { CommonLayout } from '@/src/components/organisms/CommonLayout';
import { getUserInfoRequest } from '../store/slices/user.slice';

const Home: React.FC = () => {
  return <></>;
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
  try {
    const cookieStr = req.headers.cookie as string;
    const cookies = cookieStr.split(' ');
    let nickname;
    cookies.map((cookie) => {
      if (cookie.startsWith('nickname=')) {
        nickname = cookie.slice(9).replace(/;$/, '');
      }
    });
    store.dispatch(getUserInfoRequest({ nickname }));
    res.statusCode = 302;
    res.setHeader('Location', '/income-and-expenditure');
    return {};
  } catch (err) {
    console.log(err);
  }
});

export default Home;
