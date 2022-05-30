import '../assets/styles/globals.css'
import "../assets/styles/bootstrap.min.css"


function TheScatter({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
      <Component {...pageProps} />
  )
}

export default TheScatter
