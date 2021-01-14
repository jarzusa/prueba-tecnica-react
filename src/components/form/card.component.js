import React, { Component } from "react";
import axios from 'axios';
import URL_API from "./../../config/url.api";
export default class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }
  
    refreshPage(){ 
      window.location.reload(); 
    }
    
    goToLogin(){ 
      window.location.href = URL_API.urlUi;
    }

    componentDidMount() {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.setState({
            value: this.props
        })
    }

    suscribeQuote(props){
        // let user = JSON.parse(localStorage.getItem('currentUser'));
        let data = {
            codCita: props.code
        };
        axios
        .post(URL_API.urlServe+"solicitante/apartarCupo", data,
            {
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.user.token_type + ' ' + this.user.access_token //the token is a variable which holds the token
            }
        })
        .then(response => {
            if (response.data) {
                if (!response.data.data) {
                    alert(response.data.message)
                } else {
                    if (response.data.status) {
                        if (response.data.status === "Token is Expired") {
                            this.goToLogin();
                        } else {
                            alert(response.data.message)
                        }
                    }
                    this.refreshPage();
                }
            }
            return response;
        })
        .catch(json => {
            console.log(json);
        })
    }

    render() {
        return (
            <div className="col-sm-6" style={{padding: "2%"}}>
                <div className="card text-center">
                    <div className="card-header">
                        Cita #{this.props.code}
                        </div>
                            <div className="card-body" style={{textAlign: "justify"}}>
                                <h5 className="card-title">Prestador: {this.props.name} </h5>
                                <p className="card-text">Descripcion: {this.props.description}</p>
                                <p className="card-text">Cupos Totales: {this.props.quota_total} </p>
                                <p className="card-text">Cupos disponibles: {this.props.quota_on} </p>
                                {/* <a href="#" className="btn btn-primary">Asignar cupo</a> */}
                                <button type="button" className="btn btn-primary" onClick={() => this.suscribeQuote(this.props)} className="btn btn-primary">Agendar cupo</button>
                            </div>
                        <div className="card-footer text-muted">
                        {this.props.date}
                    </div>
                </div>
            </div>
        );
      }
}