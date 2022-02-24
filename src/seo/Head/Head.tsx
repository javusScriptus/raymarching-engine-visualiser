import NextHead from 'next/head';
import React from 'react';

import { GoogleAnalytics } from '../GoogleAnalytics/GoogleAnalytics';

interface HeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
}

export const Head = (props: HeadProps) => {
  const {
    ogImage = 'https://res.cloudinary.com/dpv0ukspz/image/upload/v1645717731/og_qngkfu.jpg',
    title = 'Raymarching engine visualiser',
    description = 'Interactive visualiser 🌠 for a 3D raymarching engine written in GLSL and computed in a fragment shader on the 2D Plane.',
  } = props;

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link
        rel="icon"
        href="https://res.cloudinary.com/dpv0ukspz/image/upload/v1645574494/favicon_iwbu8o.ico"
      />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

      <GoogleAnalytics />
    </NextHead>
  );
};
