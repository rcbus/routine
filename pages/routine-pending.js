import Head from 'next/head'
import Layout from '../components/layout'
import Dta from '../components/data-table-adapter'

const siteTitle = "Rotina :: Pendente"

export default function RoutinePending({data}) {
  return (
    <Layout description="My Son's Routine" appName="Routine">
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
  const res = await fetch('http://localhost:3000/api/routine-pending')
  const data = await res.json();
  if(data){
    return {
      props: {
        data
      }
    }
  }
}