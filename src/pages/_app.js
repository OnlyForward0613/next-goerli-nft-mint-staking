import SideMenu from '../components/SideMenu'
import '../styles/globals.css'
import '../styles/style.scss'

function MyApp({ Component, pageProps }) {
  return (
    <div className="full-page">
      <SideMenu />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
