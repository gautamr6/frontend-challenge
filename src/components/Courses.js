import React, { Component } from 'react'
import '../App.css'
import courses from '../data/courses'

import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import CourseThumbnail from './CourseThumbnail.js'

class Courses extends Component {
  constructor(props) {
    super(props);
    this.decideIfInList = this.decideIfInList.bind(this);
  }

// Displays the courses that match the search term
  decideIfInList(course) {
    var searchTerm = this.props.searchTerm.toUpperCase();

    // Check if search term matches anything in course information
    if (searchTerm === "" ||
        course.number.toString().toUpperCase().indexOf(searchTerm) > -1 ||
        course.dept.toUpperCase().indexOf(searchTerm) > -1 ||
        (searchTerm.indexOf(course.number.toString().toUpperCase()) > -1
          && searchTerm.indexOf(course.dept.toUpperCase()) > -1) ||
        course.description.toUpperCase().indexOf(searchTerm) > -1 ||
        course.title.toUpperCase().indexOf(searchTerm) > -1) {

      // Display course
      return(<ListGroup.Item action>
          <CourseThumbnail info={course}
            onSelected={this.props.onSelected}
            onAddToCart={this.props.onAddToCart}
            onRemoveFromCart={this.props.onRemoveFromCart}
            inCart={(this.props.courseTitlesInCart).includes(course.title)} />
        </ListGroup.Item>);

    } else {
      // Omits course
      return(<> </>)
    }
  }

  render() {
    var courseList = courses.map(this.decideIfInList);

    return(
      <Col className="mainCol" sm={4}>
        <h3>Course List</h3>
        <div className="scrollable">

          {/* Scrollable list of courses */}
          <ListGroup class="courseList">
            {courseList}
          </ListGroup>

        </div>
      </Col>
    );
  }
}

export default Courses;
