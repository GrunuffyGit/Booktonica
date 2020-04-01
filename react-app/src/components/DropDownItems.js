import React, { Component } from "react";
import{DropdownItem} from "reactstrap";

export default class DropDownItems extends Component {
    render() {
        if(this.props.id){
            return (
                <DropdownItem
                        color="primary"
                        value={this.props.id} 
                        onClick={this.props.onClick}
                        active={this.props.selected.includes(this.props.id.toString())}
                    >
                    {this.props.title}
                </DropdownItem>
            );
        }else{
            return null;
        }
        
    }
}
  