import Head from 'next/head'
import Layout from '../components/layout'
import Dta from '../components/data-table-adapter'

const siteTitle = "Routine"

export default function Home({data}) {
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
  /* carregar dados via api */
}