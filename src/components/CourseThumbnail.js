import React, { Component } from 'react'
import '../App.css'
import courses from '../data/courses'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


//Course thumbnail without description
class CourseThumbnail extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleCartAdd = this.handleCartAdd.bind(this);
    this.handleCartRemove = this.handleCartRemove.bind(this);
  }

  handleClick() {
    this.props.onSelected(this);

  }

  handleCartAdd() {
    this.props.onAddToCart(this);
  }

  handleCartRemove() {
    this.props.onRemoveFromCart(this);
  }

  render() {
    var name = this.props.info.dept + " " + this.props.info.number;
    var button;
    if (this.props.inCart) {
      button = <Button className="cartButton" onClick={this.handleCartRemove}>Remove</Button>
    } else {
      button = <Button className="cartButton" onClick={this.handleCartAdd}>Add</Button>
    }

    return(
        <Row onClick={this.handleClick}>
          <Col sm={8}>
            <h4>{name}</h4>
            <h6>{this.props.info.title}</h6>
          </Col>
          <Col className="justify-content-end">
            {button}
          </Col>
        </Row>
    );
  }
}

export default CourseThumbnail;
