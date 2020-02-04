import React, { Component } from 'react'
import '../App.css'
import CourseThumbnail from './CourseThumbnail.js'

import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

class Cart extends Component {
  render() {

    // Check if cart is visible
    if (this.props.cartVisible) {
      // Check if cart is empty
      if (this.props.coursesInCart.length === 0) {

        // Display empty cart message
        return(
          <Col sm={4} className="mainCol">
            <h3>Course Cart</h3>
            <div style={{
              border: '1px solid rgba(0, 0, 0, 0.1)',
              padding: '1rem',
              marginBottom: '1.5rem',
              borderRadius: '4px',
            }}>
              <p>Your cart is currently empty!</p>
            </div>
          </Col>
        );

      } else {

        // Display list of courses in cart
        return(
          <Col sm={4} className="mainCol">
            <h3>Course Cart</h3>
            <div className="scrollable">
              <ListGroup>
                {this.props.coursesInCart.map(course => (
                  <ListGroup.Item action>
                  <CourseThumbnail info={course}
                    onSelected={this.props.onSelected}
                    onAddToCart={this.props.onAddToCart}
                    onRemoveFromCart={this.props.onRemoveFromCart}
                    inCart={(this.props.courseTitlesInCart)
                      .includes(course.title)}/>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Col>
        );

      }
    } else {

      // Hide cart by returning empty element
      return(<> </>);

    }
  }
}

export default Cart;
