import React, { useState, useEffect } from 'react';
import 'focus-visible';
import '../styles/index.scss';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import FontFaceObserver from 'fontfaceobserver';
import { GlobalStyles } from 'utils/GlobalStyles';

import { Layout } from 'components/Layout/Layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fontA = new FontFaceObserver('opensans');

    Promise.all([fontA.load(null, 1500)])
      .then(
        () => {
          setIsReady(true);
        },
        () => {
          setIsReady(true);
          console.warn('Fonts were loading too long (over 1500ms)');
        }
      )
      .catch(err => {
        setIsReady(true);
        console.warn('Some critical font are not available:', err);
      });
  }, []);

  return (
    <>
      <GlobalStyles />
      <Layout isReady={isReady}>
        <Component
          key={`${router.route}${router.locale === undefined ? '' : router.locale}`}
          router={router}
          {...pageProps}
        />
      </Layout>
    </>
  );
}
