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




  return (
    <MDBCard className="my-5 pb-5" >
      <MDBCardBody className="text-center">
        <h2 className="h1-responsive font-weight-bold text-center my-5">
          Recent posts
        </h2>
        <p className="text-center w-responsive mx-auto mb-5" >
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>

      </MDBCardBody>
    </MDBCard>
  );
}
