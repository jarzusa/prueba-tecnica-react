import React, { Component } from "react";
import $ from 'jquery'; 
import 'bootstrap';
import moment from 'moment';
import axios from 'axios';
import URL_API from "./../../config/url.api";
import Button from "./../form/button.component";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class WindowQuote extends Component {

    constructor(props) {
        super(props);
        const start = moment().format("YYYY-MM-DD");
        this.state = {
            date: start,
            quota: 0,
            description: ""
        };
    }
    drawWindowCreateQuote() {
        $('#myModal').modal('show')
    }


    handleChangeDate(result) {
        this.setState({ 
            date: result.target.value,
        });
    }

    handleChangeDescription(result) {
        this.setState({ 
            description: result.target.value,
        });
    }

    handleChangeQuota(result) {
        this.setState({ 
            quota: result.target.value,
        });
    }

    sendData(){
        if (this.state.description === "" || this.state.quota < 1) {
            alert("Rellene todos los campos");
          return;
        } else {
            const quota = {
                descripcion: this.state.description,
                fecha: this.state.date,
                cupos_totales: this.state.quota,
                cupos_disponibles: this.state.quota
            };
            
            axios
                .post(URL_API.urlServe+"prestador/crearCita", quota, {
                    headers: URL_API.getHeaders()
                })
                .then(response => {

                    if (response.data.status) {
                        if (response.data.status === "Token is Expired") {
                          URL_API.goToLogin();
                        // alert("Session expired")
                        }

                        if (response.data.status === "Token is Invalid") {
                            URL_API.goToLogin();
                        }
                    }

                    if (response.data) {
                        if (!response.data.data) {
                            alert(response.data.message)
                        } else {
                            $('#myModal').modal('hide')
                            alert(response.data.message)
                            URL_API.refreshPage();
                        }
                    }
                    return response;
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    render() {
      return (
        <div>
            <button type="button" className="btn btn-primary" 
                    onClick={this.drawWindowCreateQuote} title="Crear cita" 
                    className="btn btn-primary" style={{marginBottom: "3%", paddingBottom: "0.3%"}}>
                        {/* <i className="fa fa-plus-square-o fa-10x" style={{fontSize: "30px"}}></i> */}
                        <FontAwesomeIcon icon={faCalendarPlus} />
            </button>

            <div id="myModal" className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content" style={{textAlign: "left"}}>
                        <div className="modal-header">
                            <h5 className="modal-title">Crear cita</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label for="example-date-input" className="col-form-label pull-left">Fecha</label>
                                    <input className="form-control" type="date" value={this.state.date} onChange={(e) => this.handleChangeDate(e)} id="example-date-input"></input>
                                </div>
                                <div className="form-group">
                                    <label for="description-name" className="col-form-label">Descripcion:</label>
                                    <textarea type="text" className="form-control" value={this.state.description} onChange={(e) => this.handleChangeDescription(e)} id="description-name"></textarea>
                                </div>
                                <div className="form-group">
                                    <label for="example-date-input" className="col-form-label">Cupos Totales</label>
                                    <input className="form-control" type="number" value={this.state.quota} onChange={(e) => this.handleChangeQuota(e)} id="example-quota-input"></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <Button className="btn btn-primary" name="Guardar" callback={this.sendData.bind(this)}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
      );
    }
}
