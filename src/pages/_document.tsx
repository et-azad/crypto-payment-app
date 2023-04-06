import { Html, Head, Main, NextScript } from 'next/document'
import Alert from '@/components/shared/Alert';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <Alert />
        <NextScript />
      </body>
    </Html>
  )
}
