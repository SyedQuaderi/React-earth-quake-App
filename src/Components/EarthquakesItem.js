import React, { Component } from 'react';

class EarthquakesItem extends Component {

  constructor(props) {
    super(props)
      this.state = {
        isMapShowing: false
      }
  }

  clickHandler = () => {
    this.setState({
      isMapShowing: !this.state.isMapShowing
    })
  }

  render() {
    const quake = this.props.quake
    const quakeTime = (new Date(quake.properties.time)).toDateString()
    
    return (
        <li className="EarthquakesItem" key={quake.id} id={quake.id}>
          <h3>{quake.properties.title}</h3>
          <p><strong>Place: </strong>{quake.properties.place}</p>
          <p><strong>Date: </strong>{quakeTime}</p>
          <p><strong>Coordinates: </strong>{quake.geometry.coordinates[1]}, {quake.geometry.coordinates[0]}, {quake.geometry.coordinates[2]} </p>
          <p><strong>Tsunami: </strong>{quake.properties.tsunami}</p>
          <p><strong>Magnitude: </strong>{quake.properties.mag}</p>
          <a href={quake.properties.url} target="_blank">Link to USFGS More Info</a><br/>
          <a href="#" onClick={this.clickHandler}>Map</a>
          { this.state.isMapShowing ? <p>Show</p>: null }
        </li>
    );
  }
}

export default EarthquakesItem;