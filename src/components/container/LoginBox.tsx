import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Span } from '@/src/components/atoms/Span';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { getUserInformByGoogleLoginRequest } from '@/src/store/slices/user.slice';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.div`
  width: 50%;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const LoginBox: React.FC = () => {
  const dispatch = useDispatch();
  const responseGoogleSuccess = useCallback((response) => {
    dispatch(getUserInformByGoogleLoginRequest({ idToken: response.getAuthResponse().id_token, oauthType: 'google', googleId: `google${response.googleId}` }));
  }, []);

  const responseGoogleFailure = useCallback(() => {
    alert('구글 로그인 도중 오류가 발생하였습니다.');
  }, []);

  return (
    <Container>
      <InnerContainer>
        <Span spanType="MainTitle">Peanutbank</Span>
        <GoogleLogin
          clientId={process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID}
          buttonText="Google로 로그인 하기"
          onSuccess={responseGoogleSuccess}
          onFailure={responseGoogleFailure}
          cookiePolicy={'single_host_origin'}
        />
      </InnerContainer>
    </Container>
  );
};

export default LoginBox;
