import React from 'react';
import Head from 'next/head'
import Layout from '../components/layout'
import { api,setCols,zeroLeft } from '../libs/functions'

const siteTitle = "Rotina"
const now = new Date();

const formRoutine = {
  id:'',
  branch:'',
  user:'',
  date:'',
  dateModification:'',
  historic:'',
  status:'',
  description:'',
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

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formRoutine
    };
  }

  setSubState(obj,update){
    Object.keys(update).map(key => (
      obj[key] = update[key]
    ))
    return obj
  }

  onChangeFormRoutine = (e) => {
    this.setState({
      formRoutine:this.setSubState(this.state.formRoutine,{[e.target.name]: e.target.value})
    });
  }

  onChangeFormRoutineDw0 = (e) => {
    if(e.target.checked){
      this.setState({
        formRoutine:this.setSubState(this.state.formRoutine,{
          dw0:true,
          dw1:true,
          dw2:true,
          dw3:true,
          dw4:true,
          dw5:true,
          dw6:true,
          dw7:true
        })
      })
    }else{
      this.setState({
        formRoutine:this.setSubState(this.state.formRoutine,{
          dw0:false,
          dw1:false,
          dw2:false,
          dw3:false,
          dw4:false,
          dw5:false,
          dw6:false,
          dw7:false
        })
      })
    }
  }

  onChangeFormRoutineDwX = (e) => {
    if(e.target.checked){
      this.setState({
        formRoutine:this.setSubState(
          this.state.formRoutine,{
            dw0: false,
            [e.target.name]:true
          }
        )}
      )
    }else{
      this.setState({
        formRoutine:this.setSubState(
          this.state.formRoutine,{
            dw0: false,
            [e.target.name]:false
          }
        )}
      )
    }
  }

  onClick = (e) => {
    this.setState({
      formRoutine:this.setSubState(
        this.state.formRoutine,{
          branch:1,
          user:1,
          date:now.getTime(),
          dateModification:now.getTime(),
          historic:'# CRIADO POR (1) ADMIN EM ' + zeroLeft(now.getDate(),2) + '/' + zeroLeft(now.getMonth()+1,2) + '/' + now.getFullYear() + ' ' + zeroLeft(now.getHours(),2) + ':' + zeroLeft(now.getMinutes(),2) + ':' + zeroLeft(now.getSeconds(),2),
          status:1
        }
      )
    })    
    api(process.env.protocolApi + '://' + process.env.hostApi + ':' + process.env.portApi + '/api/routine-create',process.env.tokenApi,this.state.formRoutine,this.returnData)
    /*function returnData(res){
      if(res.res=="success"){
        console.log(res.data)
        this.setState({
          formRoutine:this.setSubState(
            this.state.formRoutine,data.data
          )
        })
      }
    }*/
  }

  returnData = (res) => {
    if(res.res=="success"){
      console.log(res.data)
      this.setState({
        formRoutine:this.setSubState(
          this.state.formRoutine,res.data
        )
      })
    }
  }

  getStatus(status){
    if(status==''){
      return {
        description:'NOVA',
        class:'stdBlue'
      }
    }else{
      const statusDescricao = {
        0:'EXCLUÍDA',
        1:'ATIVA',
      }
      const statusClass = {
        0:'stdRed',
        1:'stdGreen'
      }
      return {
        description:statusDescricao[status],
        class:statusClass[status]
      }
    }
  }

  render(){
    return (
      <Layout description="My Son's Routine" appName="Routine">
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <div className="item space-hb">
          {siteTitle}
        </div>
        <div className="item space-mb">
          <form autoComplete="off">
            <div className="form-row">
              <div className={setCols(6,5,4,2,2)}>
                <label>ID</label>
                <input type="text" className="form-control text-center" name="id" value={this.state.formRoutine.id} readOnly />
              </div>
              <div className={setCols(6,7,6,3,2)}>
                <label>Status</label>
                <div className={"std text-center " + this.getStatus(this.state.formRoutine.status).class}>{this.getStatus(this.state.formRoutine.status).description}</div>
              </div>
              <div className={setCols(12,8,7,5,6)}>
                <label>Descrição</label>
                <input type="text" className="form-control" name="description" value={this.state.formRoutine.description} onChange={this.onChangeFormRoutine} autoFocus />
              </div>
              <div className={setCols(12,4,3,2,2)}>
                <label>Horario</label>
                <input type="time" step="1" className="form-control" name="hour" value={this.state.formRoutine.hour} onChange={this.onChangeFormRoutine}  />
              </div>
            </div>
            <div className="form-row">
              <div className={setCols(12,12,10,8,6)}>
                <label>Dias da Semana</label><br/>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" name="dw0" checked={this.state.formRoutine.dw0} onChange={this.onChangeFormRoutineDw0} />
                  <label class="form-check-label" for="dw0">
                    Todos
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" value="" name="dw1" checked={this.state.formRoutine.dw1} onChange={this.onChangeFormRoutineDwX} />
                  <label class="form-check-label" for="dw1">
                    Dom
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" value="" name="dw2" checked={this.state.formRoutine.dw2} onChange={this.onChangeFormRoutineDwX} />
                  <label class="form-check-label" for="dw2">
                    Seg
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" value="" name="dw3" checked={this.state.formRoutine.dw3} onChange={this.onChangeFormRoutineDwX} />
                  <label class="form-check-label" for="dw3">
                    Ter
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" value="" name="dw4" checked={this.state.formRoutine.dw4} onChange={this.onChangeFormRoutineDwX} />
                  <label class="form-check-label" for="dw4">
                    Qua
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" value="" name="dw5" checked={this.state.formRoutine.dw5} onChange={this.onChangeFormRoutineDwX} />
                  <label class="form-check-label" for="dw5">
                    Qui
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" value="" name="dw6" checked={this.state.formRoutine.dw6} onChange={this.onChangeFormRoutineDwX} />
                  <label class="form-check-label" for="dw6">
                    Sex
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" value="" name="dw7" checked={this.state.formRoutine.dw7} onChange={this.onChangeFormRoutineDwX} />
                  <label class="form-check-label" for="dw7">
                    Sab
                  </label>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className={setCols(6,3,3,2,2)}>
                <button type="button" class="btn btn-success btn-lg btn-block" onClick={this.onClick}>Salvar</button>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    );
  }
}