import React, { Component } from "react";
import axios from 'axios';
import Card from "./../form/cardProvider.component";
import URL_API from "./../../config/url.api";
export default class Providers extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }
  
  refreshPage(){ 
    window.location.reload(); 
  }
  
  goToLogin(){ 
    window.location.href = URL_API.urlUi;
  }

  componentDidMount(){
    this.setState({
      value: this.props
    })
  }

  componentWillMount() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getProviders();
  }

  getProviders(){
    axios.get(URL_API.urlServe+"solicitante/listarPrestadores", {
      headers: {
          'Content-Type': 'application/json',
          Authorization: this.user.token_type + ' ' + this.user.access_token //the token is a variable which holds the token
      }
    })
    .then(res => {
      if (res.data.status) {
        this.providers = [];
        if (res.data.status === "Token is Expired") {
          this.goToLogin()
        }
      }

      if (res.data.data) {
        if (res.data.data.length > 0) {
          res.data.data.map(v => {
            this.providers.push(v);
          })
          this.setState({
            value: this.providers
          })
        }
        
      }
    })
    .catch(e => {
      console.log(e);
  })
  }

  render() {
    return (
      <div style={{textAlign: "left", margin: "1%"}}>
          <div className="row">
              {this.providers && this.providers.map((v, i) => {
                    return(<Card key={i.toString()} code={v.cod} name={v.razon_social} created_at={v.created_at}></Card>)
                })
              }
          </div>
      </div>
    );
  }
}