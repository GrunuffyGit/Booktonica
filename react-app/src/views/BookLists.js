import React, { Component } from "react";
import { 
    TabContent,
    TabPane, 
    Nav,
    NavItem, 
    NavLink} from 'reactstrap';
import { getUserInfo } from "../helpers/booktonica-api-fetcher";
import UserTabContent from "../components/UserTabContent"

export default class BookLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
        active: '1'
    };
  }

  storeUserData(){
    if(localStorage.getItem("id")){
        let request = async() =>{
              let userinfoJSON = await getUserInfo(localStorage.getItem("id"));
              if(typeof userinfoJSON[0] !== "undefined"){
                    this.setState({userInfo: {
                        user_id : userinfoJSON[0].user_id,
                        username: userinfoJSON[0].username
                    }});
                    let arrayOfUserList = [];
                    for(let i=0; i<userinfoJSON.length; i++){
                        let list_index = arrayOfUserList.findIndex(list => list.list_name === userinfoJSON[i].list_name);
                        if( list_index === -1){
                            arrayOfUserList = arrayOfUserList.concat({
                                list_id : userinfoJSON[i].list_id,
                                list_name : userinfoJSON[i].list_name,
                                list_books : [{
                                    id: userinfoJSON[i].id,
                                    cover_image_url: userinfoJSON[i].cover_image_url, 
                                    summary: userinfoJSON[i].summary,
                                    author_name: userinfoJSON[i].author_name,
                                    publication_date: userinfoJSON[i].publication_date,
                                    title: userinfoJSON[i].title,
                                    book_added_date: userinfoJSON[i].book_added_date
                                }],
                                list_created : userinfoJSON[i].list_creation_date
                            })
                        }
                        if(typeof arrayOfUserList[list_index] !== "undefined"){
                            if(arrayOfUserList[list_index].list_books.findIndex(book => book.id === userinfoJSON[i].id) === -1){
                                arrayOfUserList[list_index].list_books = arrayOfUserList[list_index].list_books.concat({
                                    id: userinfoJSON[i].id,
                                    cover_image_url: userinfoJSON[i].cover_image_url, 
                                    summary: userinfoJSON[i].summary,
                                    author_name: userinfoJSON[i].author_name,
                                    publication_date: userinfoJSON[i].publication_date,
                                    title: userinfoJSON[i].title,
                                    book_added_date: userinfoJSON[i].book_added_date
                                })
                            }
                        }
                    }
                    this.setState({userList : arrayOfUserList});
              }else{
                  this.setState({userInfo : null})
              }
        }
        request();
    }
  }

  componentDidMount(){
      this.storeUserData();
  }


  render() {
    const toggle = (val) => {
        this.setState({active : val})
    }

    return (
      <div>
        <h1> My Personal Lists</h1>
        <Nav tabs>
            <NavItem>
                <NavLink active={this.state.active === '1'} onClick={() => { toggle('1'); }}>
                    View Lists
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink active={this.state.active === '2'} onClick={() => { toggle('2'); }}>
                    Create New List
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink active={this.state.active === '3'} onClick={() => { toggle('3'); }}>
                    Add Books to Lists
                </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={this.state.active}>
            <TabPane tabId={this.state.active}>
                <UserTabContent state={this.state} />
            </TabPane>
        </TabContent>
      </div>
    );
  }
}