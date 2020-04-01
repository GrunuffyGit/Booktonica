import React, { Component } from "react";
import { 
    Col, 
    Row, 
    Button, 
    Form, 
    FormGroup,
    FormFeedback, 
    Label, 
    Input} from 'reactstrap';
import { hasUser, hasUserPass, getUserId, createUser } from "../helpers/booktonica-api-fetcher";

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user_valid:false,
        user_invalid: false,
        user_msg: "",
        username: "",
        pass_valid:false,
        pass_invalid: false,
        pass_msg: "",
        password: ""
    };
  }

  render() {
    const storeInputValue = (inputName) => {
        return e => {
            this.setState({[inputName] : e.target.value});
        }
    }

    const hasUsername = e => {
        this.setState({
            pass_valid:false,
            pass_invalid: false,
            pass_msg: ""
        });
        let inputVal = e.target.value.toUpperCase();
        if(this.props.formName === "Create New User"){
            if(inputVal.length > 0){
                let request = async() => {
                    let response = await hasUser(inputVal);
                    this.setState({user_valid : !response[0].exists,
                        user_invalid : response[0].exists});
                    if(this.state.user_invalid){
                        this.setState({user_msg: "Sorry! User is taken. :("});
                    }else{
                        this.setState({user_msg: "Sweet! This name is avaiable. :D",
                        username: inputVal});
                    }
                  }
                request();
            }else{
                this.setState({user_valid : false,
                    user_invalid : false});
            }
        }
    }

    const username_change = e =>{
        if(this.props.formName === "Create New User"){
            hasUsername(e);
        }else if(this.props.formName === "Login"){
            const username_store = storeInputValue("username");
            username_store(e);
        }
    }

    const onSubmit = e => {
        e.preventDefault();
        let userPassJson = {
            "username": this.state.username.toUpperCase(),
            "password": this.state.password
        }
        if(this.props.formName === "Create New User"){
            if(this.state.user_valid){
                if(this.state.password.length>0){
                    let request = async() => {
                        let created = await createUser(userPassJson);
                        if(created){
                            this.setState({
                                pass_invalid: false,
                                pass_valid: true,
                                user_msg: "",
                                pass_msg:"Account created! Please login to the right."});
                        }
                    }
                    request();
                }else{
                    this.setState({
                        pass_invalid: true,
                        pass_msg:"Please enter password!"});
                }
            }
        }else if(this.props.formName === "Login"){
            let request = async() => {
                let hasUserPassCombo = await hasUserPass(userPassJson);
                if(hasUserPassCombo[0].exists){
                    let userId = await getUserId(userPassJson.username);
                    localStorage.setItem("id", userId[0].id);
                    window.location.reload();
                }else{
                    this.setState({
                        user_valid:false,
                        user_invalid: true,
                        pass_valid:false,
                        pass_invalid: true,
                        pass_msg: "Invalid username or password!"
                    });
                }
            }
            request();
        }
    }


    return (
        <Form onSubmit={onSubmit}>
            <h1>{this.props.formName}</h1>
            <Row form>
                <Col sm={8}>
                    <FormGroup>
                    <Label>List Name</Label>
                    <Input 
                        type="text" 
                        placeholder="username" 
                        valid={this.state.user_valid} 
                        invalid={this.state.user_invalid}
                        onChange={username_change}/>
                    <FormFeedback valid={this.state.user_valid}>{this.state.user_msg}</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
            <Row form>
                <Col sm={8}>
                    <FormGroup>
                    <Label>Password</Label>
                    <Input 
                        type="text" 
                        placeholder="password" 
                        valid={this.state.pass_valid} 
                        invalid={this.state.pass_invalid}
                        onChange={storeInputValue("password")}/>
                    <FormFeedback valid={this.state.pass_valid}>{this.state.pass_msg}</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
            <Button>Submit</Button>
        </Form>
    );
  }
}