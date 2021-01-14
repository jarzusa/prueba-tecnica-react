import React, { Component } from "react";

import Card from "./../form/card.component";
import axios from 'axios';
import URL_API from "./../../config/url.api";
class QuotesProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.quotes = [];
    // this.getQuotesByUserAuth()
  }
  
  refreshPage(){ 
    window.location.reload(); 
  }
  
  goToLogin(){ 
    window.location.href = URL_API.urlUi;
  }

  componentDidMount(){
    this.setState({
      value: this.quotes
    })
  }

  componentWillMount() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getQuotesByUserAuth();
  }

  getQuotesByUserAuth(){
    axios.get(URL_API.urlServe+"solicitante/listarCitas", {
      headers: {
          'Content-Type': 'application/json',
          Authorization: this.user.token_type + ' ' + this.user.access_token
      }
    })
    .then(res => {  
      if (res.data.status) {
        if (res.data.status === "Token is Expired") {
          this.goToLogin();
        }
      }

      if (res.data.data) {
        if (res.data.data.length > 0) {
          res.data.data.map((v, i) => {
            this.quotes.push(v);
          })
          this.setState({
            value: this.quotes
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
      <div>
        <div className="container" style={{textAlign: "left", margin: "1%"}}>
            <div className="row">
                  {this.state.value && this.state.value.map((v, i) => {
                      return(<Card key={i.toString()} name={v.razon_social} quota_on={v.cupos_disponibles} quota_total={v.cupos_totales} code={v.cod} description={v.descripcion} date={v.fecha}></Card>)
                      })
                  }
            </div>
        </div>
      </div>
    );
  }
}

export default QuotesProvider;
