import React, { Component } from "react";
import CreatListForm from "./CreateListForm";
import ViewLists from "./ViewLists";
import AddBookToListForm from "./AddBookToListForm";
import { getAllBooks } from "../helpers/booktonica-api-fetcher";
import { Spinner } from "reactstrap";

export default class UserTabContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    componentDidMount() {
        let request = async() =>{
            let books = await getAllBooks();
            let book = [];
            for(let i = 0; i<books.length; i++){
                let obj = {
                    "list_id" : books[i].id,
                    "list_name" : books[i].title
                }
                book = book.concat(obj);
            }
            this.setState( {books: book});
        }

        request();
    }

  render() {
        const{active, userInfo, userList}=this.props.state;
        if(typeof userList !== "undefined"){
            if(active === "1"){
                return (
                    <div>
                        {userList.map(list => <ViewLists list={list}/>)}
                    </div>
                );
            }else if(active === "2"){
                return (
                    <CreatListForm userInfo={userInfo} userList={userList}/>
                );
            }else if(active === "3"){
                return (
                    <AddBookToListForm userList={userList} books={this.state.books}/>
                );
            }
        }else if(typeof localStorage.getItem("id") === "undefined"|| !localStorage.getItem("id")){ 
            return (
                <h3>
                    Please login to view this area.
                </h3>
            );
        }else{
            return(
                <Spinner></Spinner>
            );
        }
  }
}