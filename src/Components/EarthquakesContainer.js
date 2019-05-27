import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import EarthquakesMap from './EarthquakesMap';
import EarthquakesList from './EarthquakesList';
import { fetchQuakes } from '../Services/earthquakes';
import { GoogleApiWrapper } from 'google-maps-react';

class EarthquakesContainer extends Component {

  state = {
    quakes: []
  }

  componentDidMount = () => {
    fetchQuakes()
      .then((json) => {
        this.setState({ quakes: json.features }, )
      })
  }

  render() {
    return (
      <div className="EarthquakesContainer">
        <h1 className="appHeader">React Application which shows last 30 Days earthquake locations</h1>
        <div className="wrapper">
          <Route path="/" render={(props) => <EarthquakesMap google={this.props.google} quakes={this.state.quakes} {...props}/>}/>
        </div>
        <br/>
        <p><strong>Below is the list of last 30 Days earth quakes around the world</strong></p>
        <EarthquakesList quakes={this.state.quakes} quakeList={this.state.quakes.length}/>
      </div>
    );
  }
}

// making an Google API call with GoogleApiKey
export default GoogleApiWrapper({
  apiKey: 'AIzaSyChZPizXo_3sk70Cm4yveOd0YfQtuxc7As',
  libraries: ['visualization']
})(EarthquakesContainer)
