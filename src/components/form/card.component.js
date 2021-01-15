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

    componentDidMount() {
        this.setState({
            value: this.props
        })
    }

    componentWillMount(){
        this.button = <p></p>
        if (!this.props.hiddeButton) {
            this.button = <button type="button" className="btn btn-primary" onClick={() => this.suscribeQuote(this.props)} className="btn btn-primary">Agendar cupo</button>
        }
    }

    suscribeQuote(props){
        let data = {
            codCita: props.code
        };
        axios
        .post(URL_API.urlServe+"solicitante/apartarCupo", data,
            {
            headers: URL_API.getHeaders()
        })
        .then(response => {
            if (response.data) {
                if (!response.data.data) {
                    alert(response.data.message)
                } else {
                    if (response.data.status) {
                        if (response.data.status === "Token is Expired") {
                            URL_API.goToLogin();
                        } else {
                            alert(response.data.message)
                        }
                    }
                    URL_API.refreshPage();
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
                                {this.button}
                                
                            </div>
                        <div className="card-footer text-muted">
                        {this.props.date}
                    </div>
                </div>
            </div>
        );
      }
}
