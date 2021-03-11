import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import { useState, useEffect, useRef, useCallback } from "react";

import ReCAPTCHA from "react-google-recaptcha";
import env from "react-dotenv";

export default function ContactForm(props) {
  const [contact, setContact] = useState([]);

  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const reCaptcha = useRef();

  const onPageLoad = () => {};
  useEffect(() => {
    onPageLoad();
  }, []);

  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [request, setRequest] = React.useState("");

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (!token) {
      alert("Yoou must verify the captcha");
      setError("Yoou must verify the captcha");
    } else {
      setError("");
      setName("");
      setEmail("");
      setRequest("");

      axios
        .post("http://localhost:9000/contact_form", {
          name: name,
          email: email,
          request: request,
          token,
        })

        .then(function (response) {
          onPageLoad();
          alert("Submitted Succefully");
        })

        .catch(function (err) {
          setError(err);
          console.log(err);
        })
        .finally(() => {
          reCaptcha.current.reset();
          setToken("");
        });
    }
  });
  const handleChange = (parameter) => (event) => {
    if (parameter === "name") {
      setName(event.target.value);
    }
    if (parameter === "email") {
      setEmail(event.target.value);
    }
    if (parameter === "request") {
      setRequest(event.target.value);
    }
  };

  return (
    <div>
      <div className="contactFormApp">
        <p>Send your prayer request here</p>
        <div>
          <form onSubmit={onSubmit}>
            <label>Name</label>
            <input
              className="contactinput"
              type="text"
              id="fname"
              name="name"
              placeholder="Your name.."
              value={name}
              onChange={handleChange("name")}
            />

            <label>Email</label>
            <input
              className="contactinput"
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              value={email}
              onChange={handleChange("email")}
            />

            <label>Message</label>
            <textarea
              className="contactinput"
              value={request}
              placeholder="Type you message here.."
              onChange={handleChange("request")}
            />
            <ReCAPTCHA
              ref={reCaptcha}
              sitekey={process.env.REACT_APP_RECAPTCHA_PUBLIC_KEY}
              onChange={(token) => setToken(token)}
              onExpired={(e) => setToken("")}
            />
            <button type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
}
