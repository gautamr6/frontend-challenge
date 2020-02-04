import React, { Component } from 'react'
import '../App.css'

import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

class Nav extends Component {
  render() {
    // Toggle show/hide cart button
    var buttonLabel = "Show Cart";
    if (this.props.cartVisible) {
      buttonLabel = "Hide Cart";
    }

    // Display the appropriate cart message
    var alertMessage;
    if ("warning" === this.props.alert) {
      alertMessage = <Button style={{"cursor": "default"}} variant="warning" disabled>
                       Your course cart is now full.
                     </Button>
    } else if ("danger" === this.props.alert) {
      alertMessage = <Button style={{"cursor": "default"}} variant="danger" disabled>
                       Your course cart is full!
                       Please remove a course before adding another one.
                     </Button>
    } else {
      alertMessage = <Button style={{"cursor": "default"}} variant="success" disabled>
                       You may select up to 7 courses.
                     </Button>

    }

    return(
      <Navbar fill bg="light" expand="lg">

        {/* Product name */}
        <Navbar.Brand>Penn Course Cart</Navbar.Brand>

        {/* Search bar */}
        <Form inline>
          <FormControl onChange={this.props.onSearchChange}
            type="text"
            placeholder="Search"
            value={this.props.searchTerm}
            className="mr-sm-2" />
        </Form>

        {/* Cart message */}
        <Navbar.Collapse className="justify-content-center">
          {alertMessage}
        </Navbar.Collapse>

        {/* Show/hide cart and Checkout buttons */}
        <ButtonToolbar className="justify-content-end">
          <Button className="navButton" onClick={this.props.onCartToggle}>{buttonLabel}</Button>
          <Button className="navButton" onClick={this.props.onCheckout}>Checkout</Button>
        </ButtonToolbar>

      </Navbar>
    );
  }
}

export default Nav;
