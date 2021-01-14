import React, { Component } from "react";
import axios from 'axios';
import URL_API from "./../../config/url.api";
export default class CardProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    componentDidMount() {
        this.setState({ 
            value: this.props
        })
    }

    componentWillMount(){
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.button = <p></p>;
        if (!this.props.hideButton) {
            this.button = <button type="button" value={this.props.code} className="btn btn-primary" onClick={this.suscribeProvider.bind(this)} className="btn btn-primary">Suscribirse</button>
        } else {
            this.button = this.props.user;
        }
    }

    suscribeProvider(result){
        let id = parseInt(result.target.value);
        axios
        .post(URL_API.urlServe+"solicitante/subscribirse", 
            {
                IdUserPrestador: id
            }, 
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
                    alert(response.data.message)
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
            <div className="col-sm-4" style={{paddingBottom: "4%"}}>
                <div className="card text-center">
                    <div className="card-header">
                        {this.props.name}
                        </div>
                            <div className="card-body" style={{textAlign: "center"}}>
                                {this.button}
                        </div>
                </div>
            </div>
        );
    }
}