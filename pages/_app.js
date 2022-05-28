import '../assets/styles/globals.css'
import "../assets/styles/bootstrap.min.css"

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(<Component {...pageProps} />)
}

export default MyApp
