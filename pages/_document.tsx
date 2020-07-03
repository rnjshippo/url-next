import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }

  }
  render() {
    return (
      <Html>
        <Head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="description" content="단축 url 서비스 Kooo, 짧은 링크로 단축해서 편리하게 사용하세요." />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Kooo - 단축 url 서비스" />
          <meta property="og:description" content="단축 url 서비스 Kooo, 짧은 링크로 단축해서 편리하게 사용하세요." />
          {/* <meta property="og:image" content="https://kooo.kr/.png"/> */}
          <meta property="og:site_name" content="다이닝쿡" />
          <meta name="keywords" content="쿠, Kooo, kooo, link shortener, 단축 링크" />
          <link rel="shortcut icon" href="/icons/logo1.ico" type="image/x-icon"></link>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="naver-site-verification" content="56e705fe3206a797fb0981b369c8e2c668df453b" />
          <meta name="google-site-verification" content="kmclZmfXx9XsheBWrT-z4tGtI7zHB1UnIQHGxKlRv6I" />
          <script data-ad-client="ca-pub-7734816292584430" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}