import React, { Component } from "react";

import Card from "./../form/card.component";
import WindowQuote from "./../form/window.quote.component";
import axios from 'axios';
import URL_API from "./../../config/url.api";
class Quotes extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.getQuotesByUserAuth()
  }

  componentWillMount() {
    this.getQuotesByUserAuth();
  }

  getQuotesByUserAuth(){
    
    axios.get(URL_API.urlServe+"prestador/listarCitas", {
      headers: URL_API.getHeaders()
    })
    .then(res => {
      if (res.data.status) {
        if (res.data.status === "Token is Expired") {
          URL_API.goToLogin();
        }
      }

      this.quotes = [];
      if (res.data.data) {
        if (res.data.data.length > 0) {
          res.data.data.map(v => {
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
      <div style={{textAlign: "center", margin: "1%"}}>
        <WindowQuote></WindowQuote>
        <div className="container">
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

export default Quotes;