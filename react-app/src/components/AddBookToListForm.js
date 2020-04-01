import React, { Component } from "react";
import { 
    Row,
    Col, 
    Button, 
    Form, 
    FormGroup,
    Label,} from "reactstrap";
import Dropdown from "./DropDown";
import { addBookToList } from "../helpers/booktonica-api-fetcher";

export default class AddBookToListForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            selected:[],
            selectedBooks:[]
        }
    }

    render() {
        const onClick = (selectedArray) => {
            this.setState({selected : selectedArray});
        }
        const onClick2 = (selectedArray) => {
            this.setState({selectedBooks : selectedArray});
        }

        const {userList, books} = this.props;

        const onSubmit = e => {
            e.preventDefault();
            if(this.state.selectedBooks.length !== 0 && this.state.selected.length !==0){
                for(let i = 0; i<this.state.selected.length; i++){
                    let index = userList.findIndex(element => element.list_id == this.state.selected[i]);
                    for(let j = 0; j<this.state.selectedBooks.length; j++){
                        let bookIndex = userList[index].list_books.findIndex(book => book.id == this.state.selectedBooks[j]);
                        if(bookIndex === -1){
                            let addBookJSON={
                                "list_id": parseInt(this.state.selected[i]),
                                "book_id": parseInt(this.state.selectedBooks[j])
                            }
                            let request = async() => {
                                let response = await addBookToList(addBookJSON);
                                response();
                            }
                            request();
                        }
                    }
                }
                window.location.reload();
            }     
        }

        return(
            <div className="addbook">
                <Form onSubmit={onSubmit}>
                    <h1>Add some books to your list!</h1>
                    <Row form>
                        <Col>
                            <Label> List</Label>
                            <FormGroup>
                                <Dropdown dropdown={userList} click={onClick}/>
                            </FormGroup>
                        </Col>
                        <Col>
                        <Label>Books</Label>
                            <FormGroup>
                                <Dropdown dropdown={books} click={onClick2}/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <br></br>
                            <Button>Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            
        );
  }
}