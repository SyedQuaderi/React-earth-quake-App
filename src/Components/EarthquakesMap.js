import React, { Component } from 'react';
import ReactDOM from 'react-dom'


export default class EarthquakesMap extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google || prevProps.quakes !== this.props.quakes) {
      this.loadMap();
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      const mapConfig = Object.assign({}, {
        center: {lat: 0, lng: 180},
        zoom: 2,
        gestureHandling: "cooperative",
        mapTypeId: 'terrain'
      })
      this.map = new maps.Map(node, mapConfig);
      var heatmapData = [];

      this.props.quakes.map((quake) => {
        let mag
        if (quake.properties.mag < 5) { mag = 3 } else if (quake.properties.mag > 6) {mag = 10} else {mag = 5}
        heatmapData.push({
          location: new google.maps.LatLng(quake.geometry.coordinates[1], quake.geometry.coordinates[0]),
          weight: mag
        })

        const marker = new google.maps.Marker({
          position: {lat: quake.geometry.coordinates[1], lng: quake.geometry.coordinates[0]},
          map: this.map,
          title: quake.properties.title,
          icon: {
            url: "https://cdn3.iconfinder.com/data/icons/earthquake/500/earthquake-24-32.png"
          }
        });

        const infowindow = new google.maps.InfoWindow({
          content: `<h3>${quake.properties.title}</h3>
          <h4>Locaton: ${quake.properties.place}</h4>
          <h4>Date: ${(new Date(quake.properties.time)).toDateString()}</h4>
          <h4>Latitude: ${quake.geometry.coordinates[1]}</h4>
          <h4>Longitude: ${quake.geometry.coordinates[0]}</h4>
          <h4>Depth: ${quake.geometry.coordinates[2]} km</h4>
          <h4>Tsunami: ${quake.properties.tsunami}</h4>
          <h4>Magnitude: ${quake.properties.mag}</h4>`
        });
        marker.addListener('click', function() {
          infowindow.open(this.map, marker);
        });
      })
      const heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        radius: 40
      });
      heatmap.setMap(this.map);
    }
  }

  render() {
    const style = {
      width: '90vw',
      textAlign: 'center',
      margin: '0 5%',
      height: '75vh'
    }

    return (
      <div ref="map" style={style}>
        loading Earthquake Locations on map...
      </div>
    )
  }
}