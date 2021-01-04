import React, { Component } from "react";
import emailjs from "emailjs-com";
import { Link } from "react-scroll";
import { IoIosArrowUp } from "react-icons/io";
import "./styles/Contact.css";

const initialState = {
  subject: "",
  email: "",
  name: "",
  message: "",
};

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.sendEmail = this.sendEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

    // Loop through the ref's object, and bind each of them to onkeypress
    componentDidMount() {
        for (let x in this.refs) {
        this.refs[x].onkeypress = (e) => 
            this._handleKeyPress(e, this.refs[x]);
        }
    }
    _handleKeyPress(e, field) {
        if (e.keyCode === 13) {
        e.preventDefault(); // Prevent form submission if button present
        let next = this.refs[field.name].nextSibling;

        if (next && next.tagName === "INPUT") {
            this.refs[field.name].nextSibling.focus();
        }
        }
    }


  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }
  sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_xhr2sle', 'template_aacs0xg', e.target, 'user_MPIMjUaLOBI0Bxr7aChzc')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });

    this.setState(initialState);
  }
  render() {
    return (
      <div className="contact">
        <div className="contact__outline-div-red"></div>
        <div className="contact__form-wrapper">
          <form className="contact-form" onSubmit={this.sendEmail}>
            <div className="contact__header">
              <h1>Contact Me</h1>
            </div>
            <div className="FormField">
              <input
                ref="subject"
                type="text"
                className="FormField__Input"
                name="subject"
                value={this.state.subject}
                onChange={this.handleChange}
                required
              />
              <label className="FormField__Label" htmlFor="name">
                <span className="FormField__title">Subject</span>
              </label>
            </div>
            <div className="FormField">
              <input
                ref="email"
                type="text"
                className="FormField__Input"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
              <label className="FormField__Label" htmlFor="email">
                <span className="FormField__title">Your Email</span>
              </label>
            </div>
            <div className="FormField">
              <input
                ref="name"
                type="text"
                className="FormField__Input"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
              <label className="FormField__Label" htmlFor="name">
                <span className="FormField__title">Your Name</span>
              </label>
            </div>
            <div className="FormField FormField__message">
              <textarea
                ref="message"
                type="text"
                className="FormField__Input FormField__Input-message"
                value={this.state.message}
                onChange={this.handleChange}
                name="message"
                required
              />
              <label
                className="FormField__Label FormField__Label-message"
                htmlFor="message"
              >
                <span className="FormField__title FormField__title-message">
                  Your question/message. I reply to everybody
                </span>
              </label>
            </div>
            {/* <input type="text" name="subject" placeholder="Subject"/>
                    <input type="text" name="Name" placeholder="Your Name"/>
                    <input type="email" name="email" placeholder="Your Email" />
                    <textarea name="message" placeholder="Your message or question. I'll listen to anything"/> */}
            <input
                ref="submit"
                className="FormField__Submit-button"
                type="submit"
                value="Send"
            />
          </form>
        </div>
        <div className="contact__outline-div-red2"></div>
        <Link smooth={true} to="home" className="contact__up-arrows">
          <IoIosArrowUp className="arrow1"/>
          <IoIosArrowUp className="arrow2"/>
        </Link>
      </div>
    );
  }
}

export default Contact;
