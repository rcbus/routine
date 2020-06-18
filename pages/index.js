import Head from 'next/head'
import Layout from '../components/layout'
import Dta from '../components/data-table-adapter'

const siteTitle = "Profiable :: Monitor Representante"

export default function Home({data}) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="item space-hb">
        {siteTitle}
      </div>
      <div className="item space-mb">
        <Dta data={data}>
        </Dta>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  //http://localhost:3000/api/estoque
  //http://localhost/profiable/PROFIABLE/api/estoque.php
  const res = await fetch('http://localhost:3000/api/estoque')
  const data = await res.json();
  if(data){
    return {
      props: {
        data
      }
    }
  }
}