import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBMask,
  MDBIcon,
  MDBView,
  MDBBtn,
} from "mdbreact";
import { useState, useEffect, useRef, useCallback } from "react";

import ReCAPTCHA from "react-google-recaptcha";
import env from "react-dotenv";

export default function PostAndComments(props) {
  const [comments, setCommentData] = useState([]);
  const [post, setPostData] = useState([]);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const reCaptcha = useRef();

  const PostComment = (props) => (
    <MDBCard
      style={{ width: "auto", marginTop: "1rem" }}
      className="text-center"
    >
      <MDBCardBody>
        <MDBCardText
          style={{ textAlign: "justify", textJustify: "inter-word" }}
        >
          {props.comment.description}
        </MDBCardText>
        <MDBCardTitle>{props.comment.name}</MDBCardTitle>
      </MDBCardBody>
      <MDBCardFooter
        style={{
          fontFamily: "Gabriela",
          color: "#FFF",
          margin: "auto",
          textAlign: "center",
          fontSize: "1.2em",
          backgroundColor: "#00c851",
          display: "tableCell",
          padding: "0 0.5em",
        }}
      >
        {moment(props.comment.createdAt).format("LLLL")}
      </MDBCardFooter>
    </MDBCard>
  );

  useEffect(() => {
    axios
      .get("http://localhost:9000/posts/" + props.match.params.id + "/comments")

      .then((response) => {
        setPostData(response.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const onPageLoad = () => {
    axios
      .get("http://localhost:9000/posts/" + props.match.params.id + "/comments")

      .then((response) => {
        setCommentData(response.data.comments);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    onPageLoad();
  }, []);

  const [eventDescription, setDescription] = React.useState("");
  const [name, setName] = React.useState("");

  const handleChange = (parameter) => (event) => {
    if (parameter === "name") {
      setName(event.target.value);
    }
    if (parameter === "description") {
      setDescription(event.target.value);
    }
  };

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (!token) {
      alert("Yoou must verify the captcha");
      setError("Yoou must verify the captcha");
    } else {
      setError("");
      setName("");
      setDescription("");

      axios
        .post(
          "http://localhost:9000/posts/" + props.match.params.id + "/comment",
          { name: name, description: eventDescription, token }
        )

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

  let commentList;

  if (!comments) {
    commentList += "there is no Comment ";
  } else {
    commentList = comments.map((comment, k) => (
      <PostComment comment={comment} key={k} />
    ));
  }

  const onDeleteEve = useCallback((e) => {
    e.preventDefault();

    axios
      .delete(
        "http://localhost:9000/posts/" + props.match.params.id + "/delete"
      )

      .then(function (response) {
        onPageLoad();
        alert("Submitted Succefully");
      })

      .catch(function (err) {
        setError(err);
        console.log(err);
      });
  });

  return (
    <div>
      <MDBCard className="my-5  override">
        <MDBCardBody>
          <MDBRow className="d-flex justify-content-center">
            <MDBCol lg="10">
              <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
                <img className="img-fluid" src={post.postImage} alt="" />
                <a href="#!">
                  <MDBMask overlay="white-slight" />
                </a>
              </MDBView>
            </MDBCol>
            <MDBCol lg="10">
              {/* <a href="#!" className="green-text">
                <h6 className="font-weight-bold mb-3">
                  <MDBIcon icon="utensils" className="pr-2" />
                  Food
                </h6>
              </a> */}
              <h3 className="font-weight-bold mb-3 p-0 d-flex justify-content-center">
                <strong>{post.title}</strong>
              </h3>
              <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
                {post.description}
              </p>
              <p className="d-flex justify-content-center">
                by
                <a href="#!">
                  <strong>{post.from}</strong>
                </a>
                , {post.createdAt}
              </p>
              <MDBBtn color="success" size="md" className="waves-light  ">
                <div style={{ textAlign: "center" }}>
                  {comments.length} Comments
                </div>
              </MDBBtn>
            </MDBCol>
          </MDBRow>
          <hr className="my-5" />
        </MDBCardBody>
      </MDBCard>
      <MDBContainer>
        <form noValidate onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Author"
              name="name"
              className="form-control"
              value={name}
              onChange={handleChange("name")}
            />
          </div>

          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon">
                <i className="fas fa-pencil-alt prefix"></i>
              </span>
            </div>

            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="5"
              placeholder="Write your Comments here"
              name="description"
              value={eventDescription}
              onChange={handleChange("description")}
            ></textarea>
          </div>
          <ReCAPTCHA
            ref={reCaptcha}
            sitekey={process.env.REACT_APP_RECAPTCHA_PUBLIC_KEY}
            onChange={(token) => setToken(token)}
            onExpired={(e) => setToken("")}
          />
          <div class="container bg-light">
            <div class="col-md-12 text-center">
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </MDBContainer>
      <button
                  type="submit"
                  id="myBtn"
                  class="btn btn-success"
                  onClick={onDeleteEve}
                >
                  Delete
                </button>
      <hr></hr>
      <MDBContainer>{commentList}</MDBContainer>
    </div>
  );
}
