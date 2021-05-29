/**
 * @jest-environment jsdom
 */
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getPage } from 'next-page-tester';
import 'setimmediate';

describe('수입 지출 화면 테스트', () => {
  it('헤더바와 좌측 사이드가 잘 보이는지 테스트', async () => {
    const { render } = await getPage({
      route: '/detail',
    });

    render();

    //헤더바
    expect(screen.getByText('PeanutBank')).toBeInTheDocument();

    //LeftSideBar
    expect(screen.getByText('수입/지출')).toBeInTheDocument();
    expect(screen.getByText('달력')).toBeInTheDocument();
    expect(screen.getByText('상세분석')).toBeInTheDocument();
    expect(screen.getByText('마이페이지')).toBeInTheDocument();
  });

  it('다른 곳으로 넘어가는지 테스트', () => {});
});
