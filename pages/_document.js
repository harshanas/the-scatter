import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(props) {
  const { page } = props.__NEXT_DATA__;
  const customClasses = {
    // "/" : {
    //   "html" : "h-100",
    //   "body" : "h-100"
    // }
  };

  const getCustomClasses = (tag) => {
    return Object.keys(customClasses).includes(page) ?  customClasses[page][tag] : "";
  }
  return (
    <Html className={getCustomClasses('html')}>
      <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
          <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text&family=Roboto&display=swap" rel="stylesheet"/>
      </Head>
      <body className={getCustomClasses('body')}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}