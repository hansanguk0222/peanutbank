import Document, { DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      // renderPage에서 초기 페이지 로드 시 서버 측 자식 구성 요소의 스타일을 분석
      // renderPage를 커스텀하는 이유는 서버 측 렌더링에서 제대로 작동하기 위해 애플리케이션을 래핑해야 하는 css-in-js 라이브러리와 함께 사용하기 위한 것
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
