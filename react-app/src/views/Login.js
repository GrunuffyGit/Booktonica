import React, { Component } from "react";
import UserForm from "../components/UserForm";
import { 
  Col, 
  Row} from 'reactstrap';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Row>
        <Col className = "userlog">
          <UserForm formName="Login"></UserForm>
        </Col>
        <Col className = "userlog">
          <UserForm formName="Create New User"></UserForm>
        </Col>
      </Row>
    );
  }
}