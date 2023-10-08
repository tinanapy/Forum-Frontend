import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import backgroundImage from "./loginimg/bg.jpg";
import "./Login.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/reset-password",
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error requesting password reset:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };
  return (
    <Container>
      <Wrap>
        <ResetByEmail>
          <h2>Reset your password</h2>
          <p>
            Fill in your e-mail address below and we will send you an email with
            further instructions.
          </p>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <button onClick={handleReset}>Reset your password</button>
          <br />
          <br />
          <Link to="/login">Already have an account?</Link>
          <br />
          <br />
          <Link to="/signup">Don't have an account?</Link>
          <p>{message}</p>
        </ResetByEmail>
        <div className="sideNote2 container col-12 col-md-6 ms-md-2  mt-sm-5">
          <p className="forTitle">About</p>
          <h3>Evangadi Networks Q&A</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
            voluptate officiis beatae nobis pariatur omnis facere accusamus
            laboriosam hic, adipisci vero reiciendis, recusandae sit ad, eum
            quisquam! Molestias, ut commodi!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
            voluptate officiis beatae nobis pariatur omnis facere accusamus
            laboriosam hic, adipisci vero reiciendis, recusandae sit ad, eum
            quisquam! Molestias, ut commodi!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            ipsum, provident minus laudantium esse soluta maiores nostrum nisi
            sunt perferendis dolorum. Praesentium necessitatibus quia
            consectetur sunt tempora possimus eveniet voluptates?
          </p>
          <button className="btn1">HOW IT WORKS</button>
        </div>
      </Wrap>
      //{" "}
    </Container>
  );
};

export default ResetPassword;

const Container = styled.section`
  background-image: url(${backgroundImage});
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0;
  padding: 0;
  z-index: -1;

  @media (max-width: 768px) {
    background-image: url(${backgroundImage});
    padding-top: 400px;
    overflow-x: hidden;
    overflow-y: hidden;
  }
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding-top: 50px;

  margin-left: 20px;
  margin-right: 20px;


  @media (max-width: 768px) {
    padding-top: 170px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
`;

const ResetByEmail = styled.div`
  padding-top: 60px;
  padding-bottom: 150px;
  padding-left: 40px;
  padding-right: 20px;
  text-align: left;
  width: 500px;
  background: white;
  border-radius: 5px;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
  p {
    font-family: "Roboto", sans-serif !important;
    &:hover {
      color: #4a90e2;
    }
  }
  input {
    width: 90%;
    text-align: left;
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 16px;
    font-weight: 500;
    padding-left: 15px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }

  button {
    width: 94%;
    padding-top: 15px;
    padding-bottom: 15px;
    color: #ffffff;
    background: #516cf0;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
    &:hover {
      background-color: #fe8402;
    }
  }

  a {
    cursor: pointer;
    color: #ffb953;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    width: 400px;
    margin-right: 40px;
    margin-left: 0px;
    margin-bottom: 20px;
  }
`;

const DescriptionStyle = styled.div`
  width: 500px;
  margin-left: 10px;
  font-size: 14px;
  text-align: justify;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);

  small {
    color: #fe8402;
  }

  button {
    margin-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 15px;
    padding-bottom: 15px;
    color: #ffffff;
    background: #fe8402;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    margin-bottom: 730px;
    padding-top: 20px;
    width: 450px;
    margin-left: 0px;
    margin-right: 40px;
  }
`;
