import React, { Component } from 'react'
import '../App.css'
import courses from '../data/courses'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

//Displays selected course with description
class ExpandedCourse extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    var inner;

    if (this.props.info == null) {
      inner = <h2 className="center">No course selected</h2>
    } else {
      var name = this.props.info.dept + " " + this.props.info.number;

      var prereqsLabel = null;
      if (this.props.info.prereqs != null) {
        prereqsLabel = <h5>{'Prerequisites: ' + this.props.info.prereqs}</h5>;
      }

      var crosslistedLabel = null;
      if (this.props.info["cross-listed"] != null) {
        crosslistedLabel = <h5>{'Cross-listed: ' + this.props.info["cross-listed"]}</h5>;
      }

      inner = <>
                <h2>{name}</h2>
                <h4>{this.props.info.title}</h4>
                {prereqsLabel}
                {crosslistedLabel}
                <p>{this.props.info.description}</p>
              </>
    }

    if(this.props.isCheckout) {
      return(<div>{inner}</div>);
    } else {
      return(<Col className="mainCol">
               <h3>More Information</h3>
               <Jumbotron>{inner}</Jumbotron>
             </Col>);
    }

  }
}

export default ExpandedCourse;
