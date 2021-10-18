
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./contact.css";
import { useState, useEffect, useRef, useCallback } from "react";

import ReCAPTCHA from "react-google-recaptcha";
import env from "react-dotenv";

export default function Contact() {

    const [contact, setContact] = useState([]);

    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const reCaptcha = useRef();

    const onPageLoad = () => { };
    useEffect(() => {
        onPageLoad();
    }, []);

    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [message, setMessage] = React.useState("");

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (!token) {
            alert("Yoou must verify the captcha");
            setError("Yoou must verify the captcha");
        } else {
            setError("");
            setName("");
            setEmail("");
            setPhone("");
            setSubject("");
            setMessage("");

            axios
                .post("http://localhost:9000/contactus", {
                    name: name,
                    email: email,
                    phone: phone,
                    subject: subject,
                    message: message,

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
        if (parameter === "phone") {
            setPhone(event.target.value);
        }

        if (parameter === "subject") {
            setSubject(event.target.value);
        }
        if (parameter === "message") {
            setMessage(event.target.value);
        }
    };

    return (
        <div className="container" style={{ paddingRight: "0px", paddingLeft: "0px", paddingTop: "0px", paddingBottom: "0px", backgroundColor: "white" }}>
            <div className="contact-parent" >
                <div className="contact-child child1"  >
                    <p>
                        <i className="fas fa-map-marker-alt" /> Address <br />
                        <span>
                            {" "}
                            Kuyasa Market Stall, next to the Clinic. Khayelitsha
                            <br />
                            Cape Town, South Africa
                        </span>
                    </p>
                    <p>
                        <i className="fas fa-phone-alt" /> Cell Lines <br />
                        <span> 0737367555</span>
                    </p>
                    <p>
                        <i className=" far fa-envelope" />  Email Contact<br />
                        <span>thechurchbuilders@gmail.com</span>
                    </p>
                </div>

                <div className="contact-child child2">
                    <div className="inside-contact">
                        <h2>Contact Us</h2>
                        <form onSubmit={onSubmit}>
                            <label>Name</label>
                            <input
                                className="contactinput"
                                type="text"
                                id="fname"
                                id="txt_name"
                                placeholder="Your name.."
                                value={name}
                                onChange={handleChange("name")}
                            />
                            <h3>
                                <span id="confirm"></span>
                            </h3>
                            <p>Email *</p>
                            <input
                                className="contactinput"
                                type="email"
                                id="txt_email"
                                name="email"
                                placeholder="Your email"
                                value={email}
                                onChange={handleChange("email")}
                            />

                            <p>Phone *</p>
                            <input
                                className="contactinput"
                                type="text"
                                id="txt_phone"
                                name="email"
                                placeholder="Your email"
                                value={phone}
                                onChange={handleChange("phone")}
                            />
                            <p>Subject *</p>
                            <input
                                className="contactinput"
                                type="text"
                                id="txt_subject"
                                name="email"
                                placeholder="Your email"
                                value={subject}
                                onChange={handleChange("subject")}
                            />
                            <p>Message *</p>
                            <textarea
                                className="contactinput"
                                type="textarea"
                                id="txt_subject"
                                name="email"
                                placeholder="Your email"
                                rows={4}
                                cols={20}
                                value={message}
                                onChange={handleChange("message")}
                            />
                            <ReCAPTCHA
                                ref={reCaptcha}
                                sitekey={process.env.REACT_APP_RECAPTCHA_PUBLIC_KEY}
                                onChange={(token) => setToken(token)}
                                onExpired={(e) => setToken("")}
                            />

                            <input type="submit" id="btn_send" defaultValue="SEND" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
