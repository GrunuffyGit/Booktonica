import React, { Component } from "react";
import { 
    Row,
    Col, 
    Button, 
    Form, 
    FormGroup,
    FormFeedback, 
    Label, 
    Input 
    } from 'reactstrap';
import { createList } from "../helpers/booktonica-api-fetcher";

export default class CreatListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name_valid : false,
        name_invalid : false,
        name_msg : "",
        listname: ""
    };
  }

  render() {
      const listname_change = e => {
        if(e.target.value.length>0){
            let inputValue = e.target.value.toUpperCase();
            let index = this.props.userList.findIndex(booklist => booklist.list_name === inputValue);
            if(index === -1){
                this.setState({
                    name_valid:true, 
                    name_invalid:false,
                    listname: inputValue,
                    name_msg: ""
                })
            }else{
                this.setState({
                    name_valid:false, 
                    name_invalid:true,
                    name_msg: "You already have that list!"
                })
            }
        }else{
            this.setState({
                name_valid:false, 
                name_invalid:false,
                name_msg: ""
            })
        }
      }

        const storeInputValue = (inputName) => {
            return e => {
                this.setState({[inputName] : e.target.value});
            }
        }

        const createListSumbit = e => {
            e.preventDefault();
            let listJSON = {
                "name": this.state.listname,
                "description": this.state.description,
                "created_by": this.props.userInfo.user_id
            }
            let request = async() =>{
                let listCreated = await createList(listJSON);
                if(listCreated){
                    window.location.reload();
                }
            }
            request(); 
        }

      return(
        <Form onSubmit={createListSumbit}>
            <h1>Let's create a new list!</h1>
            <Row form>
                <Col sm={4}>
                    <FormGroup>
                        <Label>Name</Label>
                        <Input 
                            type="text" 
                            placeholder="List Name" 
                            valid={this.state.name_valid} 
                            invalid={this.state.name_invalid}
                            onChange={listname_change} required/>
                        <FormFeedback valid={this.state.name_valid}>{this.state.name_msg}</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
            <Row form>
                <Col sm={4}>
                    <FormGroup>
                        <Label>Description</Label>
                        <Input 
                            type="text" 
                            placeholder="Description" 
                            onChange={storeInputValue("description")} required/>
                    </FormGroup>
                </Col>
            </Row>
            <Button>Submit</Button>
        </Form>
      );
  }
}