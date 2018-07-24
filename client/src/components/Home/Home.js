import React, { Component } from "react";
import "../Form.css";
import { color_picker } from "../color_picker.png";
import request from "../../../node_modules/superagent/superagent";


export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      ClientConfigID: 1,
      BackgroundImage: null,
      BackgroundColor: null,
      Title: null,
      SubTitle: null,
      PhoneNumber: null,
      SubTitle: null,
      Email: null,
      Address: null,
      Facebook: null,
      Twitter: null,
      LinkedIn: null,
      Youtube: null,
      Website: null
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    request
      .post("http://192.168.1.100/Emag/api/ClientConfigHome/CreateNewClientConfigHome")
      .set({"Content-Type": "application/x-www-form-urlencoded", "Authorization": this.state.token})
      .send({
        ClientConfigID: 1,
        BackgroundImage: this.state.BackgroundImage,
        BackgroundColor: this.state.BackgroundColor,
        Title: this.state.Title,
        SubTitle: this.state.SubTitle,
        PhoneNumber: this.state.PhoneNumber,
        Email: this.state.Email,
        Address: this.state.Address,
        Facebook: this.state.Facebook,
        Twitter: this.state.Twitter,
        LinkedIn: this.state.LinkedIn,
        Youtube: this.state.Youtube,
        Website: this.state.Website
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

  render() {
    return (
      <div className="myDiv" >
        <form onSubmit={this.handleSubmit}>
          <div className="row">
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
            <div className="col">
              <label className="simple-label" htmlFor="Title">Title</label>
              <input onChange={this.handleChange} name="Title" required type="text" className="form-control" placeholder="Enter Title text" />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="simple-label" htmlFor="SubTitle">SubTitle</label>
              <input onChange={this.handleChange} name="SubTitle" required type="text" className="form-control" placeholder="Enter SubTitle text" />
            </div>
            <div className="col">
              <label className="simple-label" htmlFor="PhoneNumber">Phone Number</label>
              <input onChange={this.handleChange} name="PhoneNumber" required type="number" className="form-control" placeholder="Enter Phone Number number" />
            </div>
            <div className="col">
              <label className="simple-label" htmlFor="Email">Email</label>
              <input onChange={this.handleChange} name="Email" required type="email" className="form-control" placeholder="Enter Email address" />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="simple-label" htmlFor="Address">Address</label>
              <input onChange={this.handleChange} name="Address" required type="url" className="form-control" placeholder="Enter address url" />
            </div>
            <div className="col">
              <label className="simple-label" htmlFor="Facebook">Facebook</label>
              <input onChange={this.handleChange} name="Facebook" required type="url" className="form-control" placeholder="Enter facebook url" />
            </div>
            <div className="col">
              <label className="simple-label" htmlFor="Twitter">Twitter</label>
              <input onChange={this.handleChange} name="Twitter" required type="url" className="form-control" placeholder="Enter twitter url" />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="simple-label" htmlFor="LinkedIn">LinkedIn</label>
              <input onChange={this.handleChange} name="LinkedIn" required type="url" className="form-control" placeholder="Enter linkedin url" />
            </div>
            <div className="col">
              <label className="simple-label" htmlFor="Youtube">Youtube</label>
              <input onChange={this.handleChange} name="Youtube" required type="url" className="form-control" placeholder="Enter youtube url" />
            </div>
            <div className="col">
              <label className="simple-label" htmlFor="Website">Website</label>
              <input onChange={this.handleChange} name="Website" required type="url" className="form-control" placeholder="Enter website url" />
            </div>
          </div>

          <input type="submit" className="btn btn-success" value="SUBMIT" />
        </form>
      </div>
    );
  }
}
