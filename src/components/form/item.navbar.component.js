import React, { Component } from "react";
export default class ItemNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    render() {
        return (
            // <div className="col-sm-4" style={{paddingBottom: "4%"}}>
        <a className={this.props.className} key={this.props.key} style={{margin: "2%"}}>{this.props.name}</a>
            // </div>
        );
    }
}