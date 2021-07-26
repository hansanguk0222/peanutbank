import React, { useState, useEffect } from 'react';
import { SagaStore, wrapper } from '@/src/store';
import { END } from '@redux-saga/core';
import { isVerifiedToken } from '@/src/utils';
import LoginBox from '@/src/components/container/LoginBox';
import { verify } from 'jsonwebtoken';

const Login: React.FC = () => {
  return <LoginBox />;
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ req, res, store }) => {
  try {
    const cookieStr = req.headers.cookie as string;
    const cookies = cookieStr.split(' ');
    let accessToken;
    cookies.map((cookie) => {
      if (cookie.startsWith('accessToken=')) {
        accessToken = cookie.slice(12).replace(/;$/, '');
      }
    });
    await isVerifiedToken({ token: accessToken, type: 'accessToken' });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return {};
  } catch (err) {
    console.log(err);
  }
});

export default Login;
