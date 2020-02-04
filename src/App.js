import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';

import Nav from './components/Nav.js'
import Courses from './components/Courses.js'
import Cart from './components/Cart.js'
import ExpandedCourse from './components/ExpandedCourse.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null,
      courseTitlesInCart: [],
      coursesInCart: [],
      cartVisible: false,
      alert: "none",
      checkout: false,
      searchTerm: ""
    }

    // Bind functions
    this.cartToggle = this.cartToggle.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.checkout = this.checkout.bind(this);
    this.searchChange = this.searchChange.bind(this);
  }

  // Update the expanded course in the middle
  updateSelected(selectedCourse) {
    this.setState({selected: selectedCourse.props.info});
  }

  // Toggle whether the cart is shown or hidden
  cartToggle() {
    if (this.state.cartVisible) {
      this.setState({cartVisible: false});
    } else {
      this.setState({cartVisible: true});
    }
  }

  // Show or hide the checkout popup (course receipt)
  checkout() {
    var current = this.state.checkout;
    if (current) {
      this.setState({checkout: false});
    } else {
      this.setState({checkout: true});
    }
  }

  // Add a course to the cart
  addToCart(courseToAdd, event) {
    if (this.state.coursesInCart.length === 7) {
      this.setState({alert: "danger"});
      return;
    }

    var oldCourses = this.state.coursesInCart;
    var oldTitles = this.state.courseTitlesInCart;
    oldCourses.push(courseToAdd.props.info);
    oldTitles.push(courseToAdd.props.info.title);
    this.setState({coursesInCart: oldCourses,
                   courseTitlesInCart: oldTitles});

    if (this.state.coursesInCart.length === 7) {
      this.setState({alert: "warning"});
    }

    // Don't want to show expanded information when add button clicked
    event.stopPropagation();
  }

  // Remove a course from the cart
  removeFromCart(courseToRemove, event) {
    if (this.state.coursesInCart.length === 7) {
      this.setState({alert: "none"});
    }

    var oldCourses = this.state.coursesInCart;
    var oldTitles = this.state.courseTitlesInCart;
    var index = oldTitles.indexOf(courseToRemove.props.info.title);
    if (index !== -1) {
      oldCourses.splice(index, 1);
      oldTitles.splice(index, 1);
      this.setState({coursesInCart: oldCourses,
                     courseTitlesInCart: oldTitles});
    }

    // Don't want to show expanded information when remove button clicked
    event.stopPropagation();
  }

  // Respond to a change in the search term
  searchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  render() {

    // Displays courses in cart with full information
    // Warns the user if their cart is empty
    var popupMessage;
    if (this.state.coursesInCart.length === 0) {
      popupMessage = <p>Your cart is empty!</p>;
    } else {
      popupMessage = <ListGroup>
          {this.state.coursesInCart.map(course => (
            <ListGroup.Item action>
            <ExpandedCourse info={course}
                            isCheckout={true} />
            </ListGroup.Item>
          ))}
        </ListGroup>
    }

    return (
      <>
        {/* Navigation bar */}
        <Nav cartVisible={this.state.cartVisible}
             onCartToggle={this.cartToggle}
             alert={this.state.alert}
             onCheckout={this.checkout}
             searchTerm={this.state.searchTerm}
             onSearchChange={this.searchChange}/>

        <Row className="mainRow">

          {/* Scrollable list of courses filtered by search term */}
          <Courses searchTerm={this.state.searchTerm}
                   coursesInCart={this.state.coursesInCart}
                   courseTitlesInCart={this.state.courseTitlesInCart}
                   selected={this.state.selected}
                   onSelected={this.updateSelected}
                   onAddToCart={this.addToCart}
                   onRemoveFromCart={this.removeFromCart} />

          {/* Full description of selected course */}
          <ExpandedCourse id="desc" info={this.state.selected} />

          {/* Course Cart */}
          <Cart coursesInCart={this.state.coursesInCart}
                courseTitlesInCart={this.state.courseTitlesInCart}
                cartVisible={this.state.cartVisible}
                onSelected={this.updateSelected}
                onAddToCart={this.addToCart}
                onRemoveFromCart={this.removeFromCart} />

        </Row>

        {/* Course receipt popup */}
        <Modal show={this.state.checkout} onHide={this.checkout}>
          <Modal.Header closeButton>
            <Modal.Title>Course Receipt</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {popupMessage}
          </Modal.Body>
        </Modal>

      </>
    );
  }
}

export default App
