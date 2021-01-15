import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Quotes from "./views/quotes.component";
import Providers from "./views/providers.component";
import QuotesProvider from "./views/quoteBylender.component";
import Quotas from "./views/quota.component";
import QuotasProvider from "./views/quotaProvider.component";
import AssignRol from "./views/assignrol.component";
import Button from "./form/button.component";
import ItemNavBar from "./form/item.navbar.component";
import URL_API from "../config/url.api"; 

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
                    URL_API.goToLogin()
                }
            })
          } 
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
                            name=" Salir " callback={URL_API.logoutUser.bind()} 
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