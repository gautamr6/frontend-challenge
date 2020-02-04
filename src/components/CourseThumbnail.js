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
    this.handleUp = this.handleUp.bind(this);
    this.handleDown = this.handleDown.bind(this);
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

  handleUp(event) {
    if (this.props.onUp != null) {
      this.props.onUp(this, event);
    }
  }

  handleDown(event) {
    if (this.props.onDown != null) {
      this.props.onDown(this, event);
    }
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

    var colWidth = null;
    var rankingButtons = null;
    if (this.props.upDown) {
      colWidth = 3;

      //Omit up button for first course in cart
      var upStyle = this.props.first ? {"visibility": "hidden"} : null;
      //Omit down button for last course in cart
      var downStyle = this.props.last ? {"visibility": "hidden"} : null;

      //Display up and down buttons
      rankingButtons = <Col sm={1}>
          <i style={upStyle} onClick={this.handleUp} class="fas fa-sort-up fa-lg"></i>
          <i style={downStyle} onClick={this.handleDown} class="fas fa-sort-down fa-lg"></i>
        </Col>
    }

    return(
        <Row className="align-items-center" onClick={this.handleClick}>

          {/* Display up and down buttons (only for courses in cart) */}
          {rankingButtons}

          {/* Shortened course information */}
          <Col sm={8}>
            <h4>{name}</h4>
            <h6>{this.props.info.title}</h6>
          </Col>

          {/* Add to/remove from cart button */}
          <Col sm={colWidth}>
            {button}
          </Col>
        </Row>
    );
  }
}

export default CourseThumbnail;
