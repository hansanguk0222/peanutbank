import React, { useState, useEffect } from 'react';
import { wrapper } from '@/src/store';
import { isVerifiedToken } from '@/src/utils';
import LoginBox from '@/src/components/container/LoginBox';
import { useUserState } from '@/src/hooks';
import { useRouter } from 'next/router';
import { verifyRequestData } from '@/src/utils';

const Login: React.FC = () => {
  const { userInfo } = useUserState();
  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, [userInfo]);

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
