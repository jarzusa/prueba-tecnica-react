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

  componentDidMount(){
    this.setState({
      value: this.quotes
    })
  }

  componentWillMount() {
    this.getQuotesByUserAuth();
  }

  getQuotesByUserAuth(){
    axios.get(URL_API.urlServe+"solicitante/listarCitas", {
      headers: URL_API.getHeaders()
    })
    .then(res => {  
      // debugger
      if (res.data.status) {
        if (res.data.status === "Token is Expired") {
          URL_API.goToLogin();
        }
        if (res.data.status === "Token is Invalid") {
          URL_API.goToLogin();
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
