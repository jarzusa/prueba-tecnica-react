import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Quotes from "./components/views/quotes.component";
import Providers from "./components/views/providers.component";
import QuotesProvider from "./components/views/quoteBylender.component";
import Quotas from "./components/views/quota.component";
import QuotasProvider from "./components/views/quotaProvider.component";
import AssignRol from "./components/views/assignrol.component";
import Button from "./components/form/button.component";
import ItemNavBar from "./components/form/item.navbar.component";
import URL_API from "./config/url.api"; 

export default class Main extends Component {

    constructor(props){
        super(props)
        this.getRoles();
    }
    
    getRoles(){
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        
        if (this.user.roles.length > 0) {
            let prestador = false;
            let solicitante = false;
            this.user.roles.map(value => {
                this.nav = [];
                if (value.cod === 2) { // Prestador
                    prestador = true;
                }
                if (value.cod === 1) { // Solicitante
                    solicitante = true
                }

                
                if (prestador && solicitante) {
                    this.nav.push(<NavLink to='/providers' replace >Prestadores</NavLink>);
                    this.nav.push(<NavLink to='/quotes' replace >Crear citas</NavLink>);
                    this.nav.push(<NavLink to='/quotes-providers' replace >Asignar cupo</NavLink>);
                    this.nav.push(<NavLink to='/quota-provider' replace >Cupos mis citas</NavLink>);
                    this.nav.push(<NavLink to='/quota-applicant' replace >Cupos agendados</NavLink>);
                } else if (prestador) {
                    this.nav.push(<NavLink to='/quotes' replace >Citas</NavLink>);
                    this.nav.push(<NavLink to='/quota-provider' replace >Cupos</NavLink>);
                    this.nav.push(<NavLink to='/assign-rol' replace >Perfil</NavLink>);
                } else if (solicitante) {
                    this.nav.push(<NavLink to='/providers' replace >Prestadores</NavLink>);
                    this.nav.push(<NavLink to='/quotes-providers' replace >Citas</NavLink>);
                    this.nav.push(<NavLink to='/quota-applicant' replace >Cupos</NavLink>);
                    this.nav.push(<NavLink to='/assign-rol' replace >Perfil</NavLink>);
                } else {
                    alert("No tienes permisos para ingresar al sistema")
                    this.goToLogin()
                }
            })
          } 
    }
  
    refreshPage(){ 
      window.location.reload(); 
    }
    
    goToLogin(){ 
      window.location.href = URL_API.urlUi;
    }

    logoutUser(){
        let currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if (currentUser.access_token != null) {
            currentUser.access_token = null
            localStorage.setItem('currentUser', JSON.stringify(currentUser))
        }
        this.goToLogin()
        // console.log(currentUser)

    }

  render() {
    return (
    <HashRouter>
        <div>
            <div className="row" style={{margin: "0%"}}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{display: "block", textAlign: "start", width: "100%"}}>
                  <ul>
                      {this.nav && this.nav.map((v, i) => {
                          return(<ItemNavBar className="btn btn-light" key={i.toString()} name={v}></ItemNavBar>)
                      })}
                        <Button 
                            className="col-sm-2 btn btn-light logout" 
                            name=" Salir " callback={this.logoutUser.bind(this)} 
                            icon={<FontAwesomeIcon icon={faSignInAlt} />}>
                        </Button>
                </ul>
            </nav>
            </div>
            <div className="content">
                <div className="container">
                    <Route path="/quotes" component={Quotes}/>
                    <Route path="/providers" component={Providers}/>
                    <Route path="/quotes-providers" component={QuotesProvider}/>
                    <Route path="/quota-applicant" component={Quotas}/>
                    <Route path="/quota-provider" component={QuotasProvider}/>
                    <Route path="/assign-rol" component={AssignRol}/>
                </div>
            </div>
        </div>
    </HashRouter>
    );
  }
}