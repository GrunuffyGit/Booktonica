import React, { Component } from "react";
import PersonalBookCard from "./PersonalListBookCard";
import { Row } from "reactstrap";

export default class PersonalBookCardList extends Component {
  render() {
    return (
      <Row>
        {this.props.books.map(book => (
          <PersonalBookCard key={book.id} book={book} />
        ))}
      </Row>
    );
  }
}

