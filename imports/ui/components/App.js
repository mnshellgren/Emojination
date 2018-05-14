import { Meteor } from "meteor/meteor";
import { withHistory } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";

import { EmojiMessages } from "../../api/api.js";
import { EmojiPins } from "../../api/api.js";
import Modal from "./Modal/Modal";

import "./Topbar.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emojiToSend: "",
      receiverId: "",
      emojiMapPins: this.props.emojiPins ? this.props.emojiPins : "",
      unreadMessages: this.props.emojiMessages ? this.props.emojiMessages : "",
      isAuthenticated: Meteor.userId() !== null,
      hasData: false,
      isOpen: false
    };

    this.sendMessageToServer = this.sendMessageToServer.bind(this)
    this.logout = this.logout.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.renderTopbar = this.renderTopbar.bind(this)
  }

  componentWillMount() {
    if (!this.state.isAuthenticated) {
      this.props.history.push("/login");
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (!this.state.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  //standard lifecyclemethod for react
  /*getDerivedStateFromProps(nextProps,prevState) {
    // do something with Emojimessage prop
    /*/

  // will be passed down to child component(contact list)
  sendMessageToServer(receiverId) {
    // do something
    // Meteor.call('emoji_messages.insert', this.state.emojiToSend, receiverId)
    // Meteor.call('emoji_pins.insert', this.props.currentUser, this.state.emojiToSend, latitude, longitude)
  }

  // will be called inside sendMessageToServer()
  setSenderContact() {
    //set sender contact
  }

  // will be passed down to child component (emoji keyboard)
  setEmojiToSend(emojiCode) {
    //set selectedEmoji state
  }

  unsetEmojiToSend() {
    // unset selectedEmoji state
  }

  logout(e) {
    e.preventDefault();
    Meteor.logout(err => {
      if (err) {
        console.log("logout error: " + err.reason);
      } else {
        this.props.history.push("/login");
      }
    });
  }

  toggleModal() {

    console.log(this.state.isOpen)
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  renderTopbar() {
    return (
      <ul className="topBar">
        <li onClick={this.toggleModal}>
          <img className={"profile"} src="/profile_icon.png" alt="Profile" />
        </li>
        <li>
          <img className={"addFriend"} src="/add_friend.png" alt="add friend" />
        </li>
        <li>
          <img className={"send"} src="/send.png" alt="Send" />
        </li>
      </ul>
    );
  }

  render() {
    return (
      <div>
        {Meteor.user() ? (
          <div className="appContainer">
            <header>{this.renderTopbar()}</header>
            {this.state.isOpen?
              <Modal onClose={this.toggleModal}>
                <h2>{this.props.currentUser.profile.name}</h2>
                <img src={this.props.currentUser.profile.picture} />
              </Modal>
              :
              ""
            }
            <a
              href="#"
              className="waves-effect waves-light btn"
              onClick={this.logout}
            >
              Logout
            </a>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default withTracker(() => {
  Meteor.subscribe("emoji_pins");
  Meteor.subscribe("emoji_messages");
  return {
    emojiPins: EmojiPins.find({}).fetch(), //TODO: add filtering by userId
    emojiMessages: EmojiMessages.find({ read: false }).fetch(), //TODO: add filtering so that only messages belonging to the user are fetched.
    currentUser: Meteor.user()
  };
})(App);
