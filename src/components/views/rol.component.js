import React, { Component } from "react";
import axios from 'axios';
import Select from 'react-select'
import 'bootstrap';
import Button from "./../form/button.component";
import URL_API from "./../../config/url.api";

export default class Rol extends Component {

    constructor(props){
        super(props);

        this.state = {
            rol: null
        };

        this.options = [
            { value: 2, label: 'Prestador' },
            { value: 1, label: 'Solicitante' }  
        ]
    }

    componentDidMount(){
        this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    handleChange(event) {
        this.setState({
            rol: event.value
        })
    }
  
    refreshPage(){ 
      window.location.reload(); 
    }
    
    goToLogin(){ 
      window.location.href = URL_API.urlUi;
    }

    sendData(){
        // debugger
        if (this.state.rol === null) {
            alert("Rellene todos los campos");
          return;
        } else {
            const roles = {
                rol: this.state.rol
            };
            
            axios
                .post(URL_API.urlServe+"auth/asignarPerfil", roles, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: this.user.token_type + ' ' + this.user.access_token //the token is a variable which holds the token
                    }
                })
                .then(response => {

                    if (response.data.status) {
                        if (response.data.status === "Token is Expired") {
                        this.goToLogin();
                        }
                    }

                    if (response.data) {
                        if (!response.data.data) {
                            alert(response.data.message)
                        } else {
                            alert("Debe iniciar sesion nuevamente")
                            setTimeout(() => {
                                this.goToLogin();
                            }, 1000);
                        }
                    }
                    return response;
                })
                .catch(json => {
                    console.log(json);
                })
        }
    }

    render() {
        return ( 
        <div className="auth-wrapper">
            <div className="auth-inner">
                <h3>¿Cual es tu rol?</h3>
                <div className="form-group">
                    <Select onChange={(e) => this.handleChange(e)} placeholder="Selecciona el rol" options={this.options} />
                </div>
                <div className="form-group">
                    <Button className="btn btn-primary btn-block" name="Asignar rol" callback={this.sendData.bind(this)}></Button>
                </div>
            </div>
        </div>
        );
    }
}