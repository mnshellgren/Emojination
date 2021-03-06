import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import UserLocation from './UserLocation';
import geolocation from 'react-geolocation';
import Delay from 'react-delay'
import { Spring, Keyframes, animated } from 'react-spring'
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs'

import './map.module.scss';


/*<Spring
  from={{ opacity: 0, fontSize: 10 }} to={{ opacity: 1, fontSize: 22 }} config={{tension: 180, friction: 12}}>
  {styles => <span className={"emojiMapPin"} style={styles}>{this.props.reaction}</span>}
</Spring>*/
class UserReaction extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      this.props.pinclassname?
      <span className={this.props.pinclassname}>{this.props.reaction}</span>
      :
      <Spring
        from={{ opacity: 0, fontSize: 10 }} to={{ opacity: 1, fontSize: 22 }} config={{tension: 180, friction: 12}}>
        {styles => <span className={"emojiMapPin"} style={styles}>{this.props.reaction}</span>}
      </Spring>
    )
  }
}
//const UserReaction = (props) => <span className={props.pinclassname? props.pinclassname : "emojiMapPin"}>{props.reaction}</span>;

class Map extends Component {

  constructor(props) {
    super(props);

    let center = {
      lat: 63.123,
      lng: 20.123
    }

    this.state = {
      center: {
        lat: center.lat,
        lng: center.lng
      },
      zoom: 15,
      emoji: '🔵'
    };

    this.renderEmojis = this.renderEmojis.bind(this)
  }

  renderEmojis() {
    let _this = this
    return this.props.emojiPins.map(pin =>
    <UserReaction key={pin._id} lat={pin.latitude} lng={pin.longitude} reaction={pin.emojiId}/>);
  }
    render() {
      const pins = this.props.emojiPins.map(pin => {
        console.log("pinid: " + pin._id +"emoji: "+ pin.emojiId +"coords "+ pin.latitude + pin.longitude)
        return (
          <UserReaction key={pin._id} lat={pin.latitude} lng={pin.longitude} reaction={pin.emojiId}/>
        )
      })

      return (
        <div className="emojiMap">
          <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBky1lvKcJb9ipHrJGwBzzsS2BpCEA8XYI'}}
          defaultCenter={{lat: this.props.mapCoords.coords.latitude, lng: this.props.mapCoords.coords.longitude}}
          { ...this.props.children }
          defaultZoom={this.state.zoom}
          //defaultZoom={11}
          >



            <UserReaction
              pinclassname="userLocation"
              lat={this.props.mapCoords.coords.latitude}
              lng={this.props.mapCoords.coords.longitude}
              reaction={this.state.emoji}
            />
            {pins }
        </GoogleMapReact>

        </div>
      );
    }

}

export default Map;



  /*
  componentWillMount() {
    if('geolocation' in navigator){
      console.log('Successss!')
    }
    let _this = this
    navigator.geolocation.getCurrentPosition(function(position){
      _this.setState({lat: position.coords.latitude, lng: position.coords.longitude})
      console.log(_this.state.lat);


    })


  }*/








  /*static defaultProps = {
    center: {
      lat: 25,
      lng: 30
    }, zoom: 11
  };*/
