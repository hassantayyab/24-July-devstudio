import React, { Component } from "react";
import "../Form.css";
import request from "../../../node_modules/superagent/superagent";

export default class EnChiffres extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
      .set({"Content-Type": "application/x-www-form-urlencoded"})
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
      .post("http://192.168.1.100/Emag/api/ClientConfigEnChiffre/CreateNewClientConfigEnChiffre")
      .set({"Content-Type": "application/x-www-form-urlencoded", "Authorization": this.state.token})
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
              <label htmlFor="Name">Name</label>
              <input onChange={this.handleChange} name="Name" required type="text" className="form-control" placeholder="Enter background image url" />
            </div>
            <div className="col">
              <label htmlFor="Heading">Heading</label>
              <input onChange={this.handleChange} name="Heading" required type="text" className="form-control" placeholder="Enter background image url" />
            </div>
            <div className="col">
              <label htmlFor="Description">Description</label>
              <input onChange={this.handleChange} name="Description" required type="text" className="form-control" placeholder="Enter background image url" />
            </div>
          </div>
          <input type="submit" className="btn btn-success" value="SUBMIT" />
        </form>
      </div>
    );
  }
}
