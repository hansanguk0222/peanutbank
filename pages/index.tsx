import Head from 'next/head'
import styled from 'styled-components'

const HomeBlock = styled.div`
  border: 1px solid red;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  box-shadow: ${(props) => props.theme.boxShadow.darkgray};
`

export default function Home() {
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
  )
}
