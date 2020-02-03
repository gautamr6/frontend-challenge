import React, { Component } from 'react'
import '../App.css'
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Navbar from 'react-bootstrap/Navbar';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

class Nav extends Component {
  render() {
    var buttonLabel = "Show Cart";
    if (this.props.cartVisible) {
      buttonLabel = "Hide Cart";
    }

    var alertMessage;
    if ("warning" === this.props.alert) {
      alertMessage = <Button className="cartAlert" variant="warning" disabled>
                       Your course cart is now full.
                     </Button>
    } else if ("danger" === this.props.alert) {
      alertMessage = <Button className="cartAlert" variant="danger" disabled>
                       Your course cart is full!
                       Please remove a course before adding another one.
                     </Button>
    }
    else {
      alertMessage = <Button variant="success" disabled>
                       You may select up to 7 courses.
                     </Button>

    }

    return(
      <Navbar fill bg="light" expand="lg">
          <Navbar.Brand>Penn Course Cart</Navbar.Brand>

          <Form inline>
            <FormControl onChange={this.props.onSearchChange} type="text" placeholder="Search" value={this.props.searchTerm} className="mr-sm-2" />
          </Form>

          <Navbar.Collapse className="justify-content-center">

            <div className="cartAlert">{alertMessage}</div>
          </Navbar.Collapse>
          <ButtonToolbar className="justify-content-end">
            <Button className="navButton" onClick={this.props.onCartToggle}>{buttonLabel}</Button>
            <Button className="navButton" onClick={this.props.onCheckout}>Checkout</Button>
          </ButtonToolbar>
      </Navbar>
    );
  }
}

export default Nav;
