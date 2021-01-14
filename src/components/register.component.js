import React, { Component } from "react";
import axios from 'axios';
import TextInput from "./form/input-text.component";
import Button from "./form/button.component";
import URL_API from "./../config/url.api";

export default class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = { email: "", password: "", name: "" };
        // this.state = {
        //     result: ""
        // };
        this.getEmail = this.getEmail.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.getName = this.getName.bind(this);
        this.sendData = this.sendData.bind(this);
    }


    getEmail(result) {
        // the event context comes from the Child
        this.setState({ 
            email: result,
        });
    }

    getPassword(result) {
        // the event context comes from the Child
        this.setState({ 
            password: result,
        });
    }

    getName(result) {
        // the event context comes from the Child
        this.setState({ 
            name: result,
        });
    }

    sendData(){
        if (this.state.email === "" || this.state.password === "" || this.state.name === "") {
            alert("Rellene todos los campos");
          return;
        } else {
            const user = {
                usuario: this.state.email,
                clave: this.state.password,
                nombres: this.state.name
            };
            axios
                .post(URL_API.urlServe+"auth/registrar", user)
                .then(response => {
                    if (response.data) {
                        if (!response.data.data) {
                            alert(response.data.message)
                        } else {
                            alert(response.data.message + ", Redireccionando al login para ingresar")
                            setTimeout(() => {
                                this.props.history.push('/sign-in')
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
                <form>
                    <h3>Registrate</h3>
                    <TextInput type="text" name="Nombre" placeholder="Nombre.." callback={this.getName.bind(this)}/>
                    {/* <TextInput type="text" name="Apellidos" placeholder="Apellidos.."/> */}
                    <TextInput type="text" name="Correo" placeholder="Correo.." callback={this.getEmail.bind(this)}/>
                    <TextInput type="password" name="Contraseña" placeholder="Contraseña.." callback={this.getPassword.bind(this)}/>

                    {/* <Button className="btn btn-primary btn-block" name="Registrarme"></Button> */}
                    <Button className="btn btn-primary btn-block" name="Registrarme" callback={this.sendData.bind(this)}></Button>
                    <p className="forgot-password text-right">
                        ¿Ya tienes una cuenta? <a href="/sign-in">Ingresa</a>
                    </p>
                </form>
            </div>
        </div>
        );
    }
}