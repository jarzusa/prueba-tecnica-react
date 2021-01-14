import React, { Component } from "react";

class TextInput extends Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    //   console.log(event.target.value);
      this.returnValue(event.target.value)
    }

    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }

    returnValue(value){
        this.props.callback(value);
    }

    render() {
      return (
        <div className="form-group">
            <label>{this.props.name}</label>
            <input type={this.props.type} className="form-control" placeholder={this.props.placeholder} 
            value={this.state.value} onChange={this.handleChange}/>
        </div>
      );
    }
  }

export default TextInput;