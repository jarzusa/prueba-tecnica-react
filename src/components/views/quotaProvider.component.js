import React, { Component } from "react";
import axios from "axios";
import Card from "./../form/cardProvider.component";
import URL_API from "./../../config/url.api";
export default class QuotaProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.quotas = [];
  }

  componentDidMount(){
    this.setState({
      value: this.props
    })
  }

  componentWillMount() {
    this.getQuotes();
  }
  
  getQuotes() {
    axios
      .get(URL_API.urlServe+"prestador/listarCitas", {
        headers: URL_API.getHeaders()
      })
      .then((res) => {
        if (res.data.status) {
          if (res.data.status === "Token is Expired") {
            URL_API.goToLogin();
          }
        }

        if (res.data.data) {
          if (res.data.data.length > 0) {
            res.data.data.map((v, i) => {
                this.getMyQuota(v);
            });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getMyQuota(data) {
    let sendData = {}
      if (data) {
        sendData.codCita = data.cod
      }
    axios
      .get(URL_API.urlServe+"prestador/listarCuposCita/"+ data.cod, {
        headers: URL_API.getHeaders(),
      })
      .then((res) => {
        if (res.data.status) {
          if (res.data.status === "Token is Expired") {
            URL_API.goToLogin();
          }
        }

        if (res.data.data) {
          if (res.data.data.length > 0) {
            res.data.data.map((v, i) => {
              this.quotas.push(v);
            });
            this.setState({
              value: this.quotas
            })
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <div style={{ textAlign: "left", margin: "1%" }}>
          {/* <div class="container"> */}
            <div className="row">
            {this.quotas &&
                this.quotas.map((v, i) => {
                return (
                    <Card key={i.toString()} name={'Cita #'+v.cod_cita} user={v.nombre} hideButton={true}></Card>
                );
                })}
            </div>
          {/* </div> */}
      </div>
    );
  }
}
