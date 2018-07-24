import React, { Component } from "react";
import "../Focus.css";
import Popup from "../PopUp";
import { Link } from "react-router-dom";
import request from "../../../node_modules/superagent/superagent";


export default class Debate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      isPopupOpen: false,
      ClientConfigID: 1,
      Title: null,
      BackgroundImage: null,
      BackgroundColor: null,
      Heading: null,
      Description: null
    };
  }

  postUser = () => {
    request
      .post("http://192.168.1.100/Emag/Token")
      .set({ "Content-Type": "application/x-www-form-urlencoded" })
      .send({
        username: "hamad@devstudio.us",
        password: "Abc@1234",
        grant_type: "password"
      })
      .then((res) => {
        console.log(res.body);
        this.setState({
          token: res.body.token_type + ' ' + res.body.access_token
        })
      })
  }

  componentDidMount() {
    this.postUser();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    request
      .post("http://192.168.1.100/Emag/api/ClientConfigRepres/CreateNewClientConfigRepres")
      .set({ "Content-Type": "application/x-www-form-urlencoded", "Authorization": this.state.token })
      .send({
        ClientConfigID: 1,
        Title: this.state.Title,
        BackgroundImage: this.state.BackgroundImage,
        BackgroundColor: this.state.BackgroundColor,
        Heading: this.state.Heading,
        Description: this.state.Description
      })
      .then((res) => {
        console.log(res);
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <div className="myDiv" >
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col">
                <label htmlFor="Title">Title</label>
                <input onChange={this.handleChange} name="Title" autoFocus required type="text" className="form-control" placeholder="Enter Title" />
              </div>
              <div className="col">
                <label className="file-label" htmlFor="backgroundImage">Background Image</label>
                <div className="input-group">
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" required id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" />
                    <label className="custom-file-label" htmlFor="inputGroupFile04">Choose file</label>
                  </div>
                </div>
              </div>
              <div className="col">
                <label className="simple-label" htmlFor="BackgroundColor">Background Color</label>
                <input onChange={this.handleChange} name="BackgroundColor" src="../color_picker.png" required type="color" placeholder="Enter background color text" />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="Heading">Heading</label>
                <input onChange={this.handleChange} name="Heading" required type="text" className="form-control" placeholder="Enter background image url" />
              </div>
              <div className="col-sm">
                <label htmlFor="Description">Description</label>
                <input onChange={this.handleChange} name="Description" required type="text" className="form-control" placeholder="Enter background image url" />
              </div>
            </div>
            <input type="submit" className="btn btn-success" value="SUBMIT" />
          </form>
        </div>
        <div className="myDiv-sm" >
          <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <Link onClick={this.openPopup} className="nav-link btn-info" id="tabs" data-toggle="pill" to="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</Link>
          </div>
          <Popup isOpen={this.state.isPopupOpen} onClose={this.closePopup}>
            <h5 id="popup-comment">Page Name</h5>
            <form>
              <input id="submit-text" type="text" required ref="newItem" autoFocus />
              <input id="submit" type="submit" value="Page Name" onClick={this.closePopup} />
            </form>
          </Popup>
        </div>
      </div>
    );
  }

  openPopup = () => {
    this.setState({ isPopupOpen: true })
  }

  closePopup = () => {
    // event.preventDefault();
    this.setState({
      isPopupOpen: false
    })
  }
}
