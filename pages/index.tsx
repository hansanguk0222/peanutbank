import { wrapper } from '@/src/store';
import Head from 'next/head';
import { useTestState } from '@/src/hooks';
import styled from 'styled-components';
import { jsonDataRequest } from '@/src/store/slices/test.slice';

const HomeBlock = styled.div`
  border: 1px solid red;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  box-shadow: ${(props) => props.theme.boxShadow.darkgray};
`;

const Home = () => {
  const { jsonData } = useTestState();
  return (
    <HomeBlock>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Hello World</h1>
      </div>
    </HomeBlock>
  );
};

export const getStaticProps = wrapper.getStaticProps(({ store }) => {
  console.log('빠끼');
  store.dispatch(jsonDataRequest({ num: 11 }));
});

export default Home;
