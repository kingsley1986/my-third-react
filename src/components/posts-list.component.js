import axios from "axios";
import React, { useState, useEffect } from "react";
import clsx from "clsx";

import { Link } from "react-router-dom";
import moment from "moment";

import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBMask,
  MDBIcon,
  MDBView,
  MDBBtn,
} from "mdbreact";

export default function Post() {
  const BlogPost = (props) => (
    <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
      <MDBView hover className="rounded z-depth-2 mb-4" waves style={{}}>
        <img
          className="img-fluid"
          style={{
            width: "400px",
            height: "230px",
            objectPosition: "center center",
            objectFit: "cover",
          }}
          src={props.post.postImage}
          alt=""
        />
        <MDBMask overlay="white-slight" />
      </MDBView>

      <h5 className="font-weight-bold mb-3">
        <MDBIcon icon="map" className="pr-2" />
        <strong>{props.post.title}</strong>
      </h5>

      <h6 className="font-weight-bold mb-3">
        By{" "}
        <strong>
          <a href="#!" className="pink-text">
            {props.post.from}
          </a>
        </strong>
      </h6>

      <p>
        <a href="#!" className="font-weight-bold"></a>{" "}
        {moment(props.post.createdAt).format("llll")}
      </p>
      <p
        className="dark-grey-text"
        style={{ textAlign: "justify", textJustify: "inter-word" }}
      >
        {props.post.description.substring(0, 200)}
      </p>
      <MDBBtn color="pink" rounded size="md">
        <button type="button" class="btn btn-success">
          <Link
            style={{ color: "white" }}
            to={{
              pathname: `posts/${props.post._id}/comments`,
              query: { id: props.post.id },
            }}
          >
            Ream more....
          </Link>
        </button>
        <br></br>
        <br></br>
      </MDBBtn>
    </MDBCol>
  );

  const [postData, setPostData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/posts")
      .then((response) => {
        setPostData([...response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  let blogPostList = postData.map((post, k) => (
    <BlogPost post={post} key={k} />
  ));

  return (
    <MDBCard className="my-5 pb-5">
      <MDBCardBody className="text-center">
        <h2 className="h1-responsive font-weight-bold text-center my-5">
          Recent posts
        </h2>
        <p className="text-center w-responsive mx-auto mb-5">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
        <MDBRow>{blogPostList}</MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}
