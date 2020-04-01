import React, { Component } from "react";
import { Collapse, Button, CardBody, Card, Badge } from 'reactstrap';
import PersonalBookCardList from "../components/PersonalListBookCardList";

export default class ViewLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    componentDidMount(){
        let today = new Date();
        if(today.toDateString() === new Date(this.props.list.list_created).toDateString()){
            this.setState({badge: "New List!"})
        }
    }

  render() {
    const toggle = () => {
        this.setState({open : !this.state.open})
    }
    let count = 0;
    if(this.props.list.list_books[0].title){
        count = this.props.list.list_books.length;
    }

    if(this.props.list.list_name){
        return(
            <div>
                <Button className="listButton" color="secondary" onClick={toggle}>
                    {this.props.list.list_name} ( {count} books in list ) <Badge color="primary">{this.state.badge}</Badge>
                </Button>
                <Collapse isOpen={this.state.open}>
                    <Card>
                        <CardBody>
                            <PersonalBookCardList books={this.props.list.list_books}/>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }else{
        return <h2>No list available. Please create a list in the next tab.</h2>;
    }

      
  }
}