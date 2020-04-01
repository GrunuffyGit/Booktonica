import React, { Component } from "react";
import { getAllBooks } from "../helpers/booktonica-api-fetcher";
import BookCardList from "../components/BookCardList";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    getAllBooks().then(books => this.setState({ books: books }));
  }
  render() {
    return (
      <div>
        <BookCardList books={this.state.books} />
      </div>
    );
  }
}