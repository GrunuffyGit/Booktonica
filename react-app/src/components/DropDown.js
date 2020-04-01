import React, { Component } from "react";
import{ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import DropDownItems from "./DropDownItems";

export default class DropDown extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            selected:[]
        }
    }

    render() {
        const toggle = e => {
            if(e.target.className !== "dropdown-item" && e.target.className !== "dropdown-item active"){
                this.setState({open : !this.state.open});
            }
        };

        const onClick = e => {
            let selectedArray = [];
            if(e.target.value !== "clear"){
                selectedArray = this.state.selected;
                let index = this.state.selected.indexOf(e.target.value);
                if(index === -1){
                    selectedArray = selectedArray.concat(e.target.value);
                }else{
                    if(index === 0){
                        selectedArray = selectedArray.slice(index+1,selectedArray.length);
                      }else if(index === selectedArray.length){
                        selectedArray = selectedArray.slice(0, index);
                      }else{
                        selectedArray = selectedArray.slice(0, index).concat(selectedArray.slice(index+1, selectedArray.length));
                      }
                }
            }
            this.setState({selected : selectedArray});
            this.props.click(selectedArray);
        }

        return (
           <ButtonDropdown className="buttonDrop" isOpen={this.state.open} toggle={toggle}>
               <DropdownToggle caret>
               </DropdownToggle>
               <DropdownMenu>
                   {this.props.dropdown.map(item => (<DropDownItems id={item.list_id} title={item.list_name} onClick={onClick} selected={this.state.selected}></DropDownItems>))}
                   <DropdownItem divider />
                   <DropdownItem value="clear" onClick={onClick}>Clear Selection</DropdownItem>
               </DropdownMenu>
           </ButtonDropdown> 
        );
    }
  }
  