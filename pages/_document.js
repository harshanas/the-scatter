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
          <link rel="shortcut icon" href="/images/favicon.png" /> 
      </Head>
      <body className={getCustomClasses('body')}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}