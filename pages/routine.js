import React from 'react';
import Head from 'next/head'
import Layout from '../components/layout'
import { setCols,zeroLeft } from '../libs/functions'
import { api } from '../libs/api'
import { openLoading, closeLoading } from '../components/loading'
import { openMsg } from '../components/msg';
import Dta, { setData } from '../components/data-table-adapter'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formRoutine:this.getStdFormState(),
      action:false,
      title:'Lista :: Rotina',
      listRoutine:[],
      listRoutineConfig:[]
    };
  }

  componentDidMount(){
    this.getListData()
  }

  getListData = (e) => {
    openLoading()
    api(process.env.protocolApi + '://' + process.env.hostApi + ':' + process.env.portApi + '/api/routine-list',process.env.tokenApi,{},(res) => {
      if(res.res=="error"){
        openMsg({text:res.error,type:-1})
      }else{
        this.setState({
          listRoutine:res.data.data,
          listRoutineConfig:res.data.config
        })
      }  
      closeLoading()
    })
  }

  getStdFormState(){
    const now = new Date();
    const formRoutine = {
      _id:'',
      branch:'',
      user:'',
      date:'',
      dateModification:'',
      historic:'',
      status:false,
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
    return formRoutine
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
    if(e.target.name=='cadastrar'){
      this.setState({
        action:'modify',
        title:'Cadastrar :: Rotina',
        formRoutine:this.getStdFormState()
      })
    }else if(e.target.name=='salvar'){
      openLoading({count:[1,5,60]})   
      api(process.env.protocolApi + '://' + process.env.hostApi + ':' + process.env.portApi + '/api/routine-create',process.env.tokenApi,this.state.formRoutine,(res) => {
        if(res.res=="error"){
          openMsg({text:res.error,type:-1})
        }else{
          this.setState({
            formRoutine:this.setSubState(
              this.state.formRoutine,res.data[0]
            )
          })
          openMsg({text:'Rotina cadastrada com sucesso!',type:1})
        }  
        closeLoading()
      })
    }else if(e.target.name=='cancelar'){
      this.getListData()
      this.setState({
        action:false,
        title:'Lista :: Rotina'
      })
    }
  }

  onClickCell = (e) => {
    var id = e.target.getAttribute('name').substr(0,e.target.getAttribute('name').indexOf('#'))
    var routine = false
    Object.keys(this.state.listRoutine).map(k => {
      if(this.state.listRoutine[k]._id==id){
        routine = this.state.listRoutine[k]
      }
    })
    this.setState({
      action:'modify',
      title:'Modificar :: Rotina',
      formRoutine:(routine==false ? this.getStdFormState() : routine)
    })
  }

  getStatus(status){
    if(status===false){
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
    if(!this.state.action){
      return (
        <Layout description="My Son's Routine" appName="Routine">
          <Head>
            <title>{this.state.title}</title>
          </Head>
          <div className="item space-hb">
            {this.state.title}
          </div>
          <div className="item space-mb">
            <form autoComplete="off">
              <div className="form-row">
                <div className={setCols(12,6,3,2,2)}>
                  <button type="button" name="cadastrar" className="btn btn-primary btn-lg btn-block" onClick={this.onClick}>+ Cadastrar</button>
                </div>
              </div>
              <div className="form-row">
                <div className={setCols(12,12,12,12,12)}>
                  <Dta title="Lista Rotinas" data={this.state.listRoutine} config={this.state.listRoutineConfig} collection="routine" editable={true} callbackOnClickCell={this.onClickCell}></Dta>
                </div>
              </div>
            </form>
          </div>
        </Layout>
      )
    }else if(this.state.action=='modify'){
      return (
        <Layout description="My Son's Routine" appName="Routine">
          <Head>
            <title>{this.state.title}</title>
          </Head>
          <div className="item space-hb">
            {this.state.title}
          </div>
          <div className="item space-mb">
            <form autoComplete="off">
              <div className="form-row">
                <div className={setCols(6,5,4,2,2)}>
                  <label>ID</label>
                  <input type="text" className="form-control text-center" name="id" value={this.state.formRoutine._id} readOnly />
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
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" name="dw0" checked={this.state.formRoutine.dw0} onChange={this.onChangeFormRoutineDw0} />
                    <label className="form-check-label">
                      Todos
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="" name="dw1" checked={this.state.formRoutine.dw1} onChange={this.onChangeFormRoutineDwX} />
                    <label className="form-check-label">
                      Dom
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="" name="dw2" checked={this.state.formRoutine.dw2} onChange={this.onChangeFormRoutineDwX} />
                    <label className="form-check-label">
                      Seg
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="" name="dw3" checked={this.state.formRoutine.dw3} onChange={this.onChangeFormRoutineDwX} />
                    <label className="form-check-label">
                      Ter
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="" name="dw4" checked={this.state.formRoutine.dw4} onChange={this.onChangeFormRoutineDwX} />
                    <label className="form-check-label">
                      Qua
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="" name="dw5" checked={this.state.formRoutine.dw5} onChange={this.onChangeFormRoutineDwX} />
                    <label className="form-check-label">
                      Qui
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="" name="dw6" checked={this.state.formRoutine.dw6} onChange={this.onChangeFormRoutineDwX} />
                    <label className="form-check-label">
                      Sex
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="" name="dw7" checked={this.state.formRoutine.dw7} onChange={this.onChangeFormRoutineDwX} />
                    <label className="form-check-label">
                      Sab
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className={setCols(6,3,3,2,2)}>
                  <button type="button" name="salvar" className="btn btn-success btn-lg btn-block" onClick={this.onClick}>Salvar</button>
                </div>
                <div className={setCols(6,3,3,2,2)}>
                  <button type="button" name="cancelar" className="btn btn-warning btn-lg btn-block" onClick={this.onClick}>Cancelar</button>
                </div>
              </div>
            </form>
          </div>
        </Layout>
      )
    }
  }
}