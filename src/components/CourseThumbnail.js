import React, { Component } from 'react'
import '../App.css'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


//Course thumbnail without description
class CourseThumbnail extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleCartAdd = this.handleCartAdd.bind(this);
    this.handleCartRemove = this.handleCartRemove.bind(this);
  }

  // Detects when the user clicks on a course to expand it.
  handleClick() {
    this.props.onSelected(this);

  }

  // Detects when a course is added to the cart.
  handleCartAdd(event) {
    this.props.onAddToCart(this, event);
  }

  // Detects when a course is removed from the cart.
  handleCartRemove(event) {
    this.props.onRemoveFromCart(this, event);
  }

  render() {
    var name = this.props.info.dept + " " + this.props.info.number;

    // Displays add or remove button
    // depending on whether course is already in cart
    var button;
    if (this.props.inCart) {
      button = <Button className="cartButton" onClick={this.handleCartRemove}>Remove</Button>
    } else {
      button = <Button className="cartButton" onClick={this.handleCartAdd}>Add</Button>
    }

    return(
        <Row onClick={this.handleClick}>
          {/* Shortened course information */}
          <Col sm={8}>
            <h4>{name}</h4>
            <h6>{this.props.info.title}</h6>
          </Col>

          {/* Add to/remove from cart button */}
          <Col className="justify-content-end">
            {button}
          </Col>
        </Row>
    );
  }
}

export default CourseThumbnail;
