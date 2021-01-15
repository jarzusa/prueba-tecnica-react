import React, { Component } from "react";
import axios from 'axios';
import URL_API from "./../config/url.api";
import TextInput from "./form/input-text.component";
import Button from "./form/button.component";

export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = { email: "", password: "" };
        // this.state = {
        //     result: ""
        // };
        // this.getEmail = this.getEmail.bind(this);
        // this.getPassword = this.getPassword.bind(this);
        // this.sendData = this.sendData.bind(this);
    }

    getEmail(result) {
        this.setState({ 
            email: result,
        });
    }

    getPassword(result) {
        this.setState({ 
            password: result,
        });
    }

    componentDidMount(){
        // let user = localStorage.getItem('currentUser')
    }

    sendData(){
        if (this.state.email === "" || this.state.password === "") {
            alert("Rellene todos los campos");
          return;
        } else {
            const user = {
                usuario: this.state.email,
                clave: this.state.password
            };
            axios
                .post(URL_API.urlServe+"auth/login", user)
                .then(response => {
                    if (response.data) {
                        if (!response.data.data) {
                            alert(response.data.message)
                        } else {
                            localStorage.setItem('currentUser', JSON.stringify(response.data));
                            URL_API.user = JSON.parse(localStorage.getItem('currentUser'));
                            if (response.data.roles.length > 0) {
                                this.props.history.push('/inicio')
                            } else {
                                this.props.history.push('/rol')
                            }
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
                <form>
                    <h3>Iniciar sesión</h3>
                        <TextInput type="text" name="Correo" placeholder="Correo.." callback={this.getEmail.bind(this)}/>
                        <TextInput type="password" name="Contraseña" placeholder="Contraseña.." callback={this.getPassword.bind(this)}/>
                        <Button className="btn btn-primary btn-block" name="Iniciar sesión" callback={this.sendData.bind(this)}></Button>
                    <p className="forgot-password text-center">
                        ¿No tienes cuenta? <a href="/sign-up">Registrate</a>
                    </p>
                </form>
            </div>
        </div>
        );
    }
}