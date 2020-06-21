import Head from 'next/head'
import Layout from '../components/layout'
import Dta from '../components/data-table-adapter'
import { setCols,api,zeroLeft } from '../libs/functions'

const siteTitle = "Rotina"
const now = new Date();

const formRoutine = {
  id:null,
  branch:null,
  user:null,
  date:null,
  dateModification:null,
  historic:null,
  status:null,
  description:null,
  hour:zeroLeft(now.getHours(),2) + ':' + zeroLeft(now.getMinutes(),2) + ':00',
  dw0:true,
  dw1:true,
  dw2:true,
  dw3:true,
  dw4:true,
  dw5:true,
  dw6:true,
  dw7:true
}

export default function Routine(props) {

  var state = {}

  /*state.description = 'Teste D'*/

  function setState(obj){
    Object.keys(obj).map(key => (
        state[key] = obj[key]
    ))
  }

  /*setState({
    description:'Teste E'
  })*/

  function handleChange(event){
    console.log(event)
    setState({
      description:event.target.value
    })
  }

  function onClick(e){
    const res = api(process.env.protocolApi + '://' + process.env.hostApi + ':' + process.env.portApi + '/api/routine-create',process.env.tokenApi,formRoutine)
    console.log(res)
  }
  
  return (
    <Layout description="My Son's Routine" appName="Routine">
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="item space-hb">
        {siteTitle}
      </div>
      <div className="item space-mb">
        <form>
          <div className="form-row">
            <div className={setCols(12,4,3,2,1)}>
              <label>ID</label>
              <input type="text" className="form-control text-center" readOnly />
            </div>
            <div className={setCols(12,8,9,8,7)}>
              <label>Descrição</label>
              <input type="text" className="form-control" value={state.description} onchange={handleChange} />
              {/*<input type="text" className="form-control" value={props.description} onChange={handleChange} />*/}
            </div>
          </div>
          <div className="form-row">
            <div className={setCols(12,12,3,2,2)}>
              <label>Horario</label>
              <input type="time" className="form-control" />
            </div>
            <div className={setCols(12,12,9,8,6)}>
              <label>Dias da Semana</label><br/>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="dw0" checked />
                <label class="form-check-label" for="dw0">
                  Todos
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="" id="dw1" />
                <label class="form-check-label" for="dw1">
                  Dom
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="" id="dw2" />
                <label class="form-check-label" for="dw2">
                  Seg
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="" id="dw3" />
                <label class="form-check-label" for="dw3">
                  Ter
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="" id="dw4" />
                <label class="form-check-label" for="dw4">
                  Qua
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="" id="dw5" />
                <label class="form-check-label" for="dw5">
                  Qui
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="" id="dw6" />
                <label class="form-check-label" for="dw6">
                  Sex
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="" id="dw7" />
                <label class="form-check-label" for="dw7">
                  Sab
                </label>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className={setCols(6,3,3,2,2)}>
              <button type="button" class="btn btn-success btn-lg btn-block" onClick={onClick}>Salvar</button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const myProps = {
    description: 'Teste'
  }
  
  return {
    props:myProps
  }
}