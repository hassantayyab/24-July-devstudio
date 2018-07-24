import React, { Component } from "react";
import "../Focus.css";
import Popup from "../PopUp";
import { Link } from "react-router-dom";
import request from "../../../node_modules/superagent/superagent";


export default class Focus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      token: null,
      Subpages: null,
      isPopupOpen: false,
      ClientConfigID: 1,
      ClientConfigFocusID: null,
      Title: null,
      BackgroundImage: null,
      BackgroundColor: null,
      Heading: null,
      Description: null
    };

    this.renderContent = this.renderContent.bind(this);
  }

  getSubpages = () => {
    request
      .get("http://192.168.1.100/Emag/api/ClientConfigFocus/GetClientConfigFocusByClientConfigID?ccid=1")
      .set({ "Content-Type": "application/x-www-form-urlencoded", "Authorization": this.state.token })
      .then((res) => {
        console.log(res.body)
        this.setState({
          Subpages: res.body.Subpages
        })
      });
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
        this.getSubpages();
      })
  }

  componentDidMount() {
    this.postUser();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    request
      .post("http://192.168.1.100/Emag/api/ClientConfigFocus/CreateNewClientConfigFocus")
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
        console.log(res.body);
        this.setState({
          ClientConfigFocusID: res.body
        })
      })
  }

  handleChange = (e) => {
    console.log('in handleChange', e.target.value)
    // if (e.target.name=="Subpages") {
    //   let data = this.state.Subpages;
    //   data.push(e.target.value);
    //   this.setState({
    //     [e.target.name]: data
    //   })
    // } else {
    //   this.setState({
    //     [e.target.name]: e.target.value
    //   })
    // }
    this.setState({
        [e.target.name]: e.target.value
      })
  }

  renderContent() {
    // console.log('check', this.state.Subpages)
    if (this.state.submitted) {
      var list = this.state.Subpages.map((page, index) => {
        return (
          <li id="list" key={index}>
            <Link className="nav-link btn-info" id="tabs" data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="true" to={`/Focus/sp${index}`}>
              {page}
            </Link>
          </li>
        );
      });
      list.push(
        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <Link onClick={this.openPopup} className="nav-link btn-info" id="tabs" to="#v-pills-home" >Creat Page</Link>
        </div>
      )
      return list;
    } else {
      return (
        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <Link onClick={this.openPopup} className="nav-link btn-info" id="tabs" data-toggle="pill" to="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Creat Page</Link>
        </div>
      );
    }
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
          {/* <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <Link onClick={this.openPopup} className="nav-link btn-info" id="tabs" data-toggle="pill" to="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Creat Page</Link>
          </div> */}
          <ul id="content">
            {this.renderContent()}
          </ul>
          <Popup isOpen={this.state.isPopupOpen} onClose={this.closePopup}>
            <h5 id="popup-comment">Enter Page Name</h5>
            <form>
              <input name="Subpages" id="submit-text" type="text" required ref="newItem" autoFocus placeholder="Enter new page" />
              <input id="submit" type="submit" value="Page Name" onClick={(e) => { this.closePopup(e); this.createPage(this.refs.newItem.value) }} />
            </form>
          </Popup>
        </div>
      </div>
    );
  }

  createPage(value) {
    if (this.state.Subpages) {
      let data = this.state.Subpages;
      data.push(value)
      this.setState({
        Subpages: data
      })
    } else {
      this.setState({
        Subpages: [value]
      })
    }
    this.postSubpages();
  }

  postSubpages = () => {

  }

  openPopup = () => {
    this.setState({ isPopupOpen: true })
  }

  closePopup (e) {
    e.preventDefault();
    this.setState({
      isPopupOpen: false,
      submitted: true
    })
  }
}
