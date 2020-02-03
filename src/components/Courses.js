import React, { Component } from 'react'
import '../App.css'
import courses from '../data/courses'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';

import CourseThumbnail from './CourseThumbnail.js'
import ExpandedCourse from './ExpandedCourse.js'

/*export default () => (

)*/

class Courses extends Component {
  constructor(props) {
    super(props);
    this.decideIfInList = this.decideIfInList.bind(this);
  }

// Checks which courses match the search term
  decideIfInList(course) {
    var searchTerm = this.props.searchTerm.toUpperCase();

    if (searchTerm === "" ||
        course.number.toString().toUpperCase().indexOf(searchTerm) > -1 ||
        course.dept.toUpperCase().indexOf(searchTerm) > -1 ||
        (searchTerm.indexOf(course.number.toString().toUpperCase()) > -1
          && searchTerm.indexOf(course.dept.toUpperCase()) > -1) ||
        course.description.toUpperCase().indexOf(searchTerm) > -1 ||
        course.title.toUpperCase().indexOf(searchTerm) > -1) {

      return(<ListGroup.Item action>
        <CourseThumbnail info={course}
                        onSelected={this.props.onSelected}
                        onAddToCart={this.props.onAddToCart}
                        onRemoveFromCart={this.props.onRemoveFromCart}
                        inCart={(this.props.courseTitlesInCart).includes(course.title)} />
      </ListGroup.Item>);

    } else {
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
