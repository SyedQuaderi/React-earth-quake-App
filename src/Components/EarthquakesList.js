import React, { Component } from 'react';
import EarthquakesItem from './EarthquakesItem'


class EarthquakesList extends Component {

  render() {
    const quakeItems = this.props.quakes.map((quake) => {
    return <EarthquakesItem key={quake.id} quake={quake}/>
    })
    const quakeList = this.props.quakeList;
    return (
      <ul className="EarthquakesList">
        <li><h2>Total Number of EarthQuakes: {quakeList}</h2></li>
        <li>{quakeItems}</li>
      </ul>
    );
  }
}

export default EarthquakesList;