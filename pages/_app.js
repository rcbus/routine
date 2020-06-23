import '../styles/bootstrap/css/bootstrap.css'
import '../styles/global.css'
import '../components/styles/loading.css'
import '../components/styles/msg.css'
import '../components/styles/layout.css'
import '../components/styles/data-table-adapter.css'

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}