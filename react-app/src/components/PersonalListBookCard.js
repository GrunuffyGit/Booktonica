import React, { Component } from "react";
import {
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Badge
} from "reactstrap";

/**
 * Learn more about reactstrap Card component
 * https://reactstrap.github.io/components/card/
 */
export default class PersonalBookCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    componentDidMount(){
        let today = new Date();
        if(today.toDateString() === new Date(this.props.book.book_added_date).toDateString()){
            this.setState({badge: "new book added!"})
        }
    }

    render() {
        const {
        cover_image_url,
        summary,
        title,
        author_name,
        publication_date
        } = this.props.book;

        if(summary){
        return (
            <Col xs="4">
            <Card>
                <CardImg
                className="bookCover"
                src={cover_image_url}
                alt="Book cover"
                />
                <CardBody>
                <CardTitle>{title} <Badge color="primary">{this.state.badge}</Badge></CardTitle>
                <CardSubtitle>{author_name}</CardSubtitle>
                <CardText>
                    <i>{publication_date}</i> - {summary}
                </CardText>
                </CardBody>
            </Card>
            </Col>
        );
        }else{
        return null;
        }
    }
}
