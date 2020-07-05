import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="pt">
        <Head>
          <meta content="Lorem ipsum dolor sit amet." name="description" />
          <link
            as="font"
            crossOrigin="anonymous"
            href="/fonts/inter-latin-400.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            as="font"
            crossOrigin="anonymous"
            href="/fonts/inter-latin-700.woff2"
            rel="preload"
            type="font/woff2"
          />
        </Head>
        <body className="bg-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
