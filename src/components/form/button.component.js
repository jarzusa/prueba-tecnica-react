import React, { Component } from "react";

class Button extends Component {
    constructor(props) {
      super(props);
      this.state = {value: '', style: ''};
    }

    handleClick = (e) => {
        e.preventDefault();
        this.props.callback();
    }

    componentWillMount(){
      if (this.props.style) {
        this.setState({
          style: this.props.style
        })
      }
    }
  
    render() {
      return (
        <button className={this.props.className} onClick={this.handleClick}> {this.props.name}
        {
          this.props.icon
        }
        
        </button>
      );
    }
  }

export default Button;