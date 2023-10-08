import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
// import { HiArrowNarrowRight } from "react-icons/hi";
import Question from "../Question/Question";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import axios from 'axios';
import "./Home.css";
import styled from "styled-components";
import moment from "moment";

const Home = ({ logout }) => {
  const [userData, setUserData] = useContext(UserContext);
  const [allQuestions, setAllQuestions] = useState([]);
  const navigate = useNavigate();
  const [search, setsearch] = useState("");
  const [filtereddata, setfiltereddata] = useState([]);
  const [filteredQuestionsLimit, setFilteredQuestionsLimit] = useState(3);
  // Initial limit of 3 filtered questions
  //.....///...//
    const [newQuestionTime, setNewQuestionTime] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    
  //.....///...//
  const Questions = async () => {
    try {
      const questionRes = await axios.get(
        `${process.env.REACT_APP_base_url}/api/questions`
      );
      const questionsWithTime = questionRes.data.data.map((question) => ({
        ...question,
        // time: new Date(question.timestamp).toLocaleString(), // Assuming the API response includes a "timestamp" field n Set the current date and time as the question's time
        timestamp: moment(question.timestamp).toISOString(),
      }));
      setAllQuestions(questionsWithTime);
    } catch (err) {
      console.log("problem", err);
    }
    };
    
    
  useEffect(() => {
    if (!userData.user) navigate("/login");
    Questions();
  }, [userData.user, navigate, newQuestionTime]);
    
    
    
  useEffect(() => {
    if (!userData.user) navigate("/login");
    Questions();
  }, [userData.user, navigate, newQuestionTime]); //[userData.user, navigate, newQuestionTime]
  const handleQuestionSubmit = async (question) => {
      try {
        const timestamp = new Date().toISOString(); // Generate a valid timestamp
        // Your API call to submit a new question
        await axios.post(`${process.env.REACT_APP_base_url}/api/questions`, {
          question,
          timestamp,
        });
        setNewQuestionTime(timestamp); // Update the newQuestionTime state with the current time
        Questions(); // Refresh the questions after submitting a new one
      } catch (err) {
      console.log("problem", err);
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/askQuestion");
  };
  useEffect(() => {
    const filteredQuestions = allQuestions.filter(
      (q) =>
        q.question && q.question.toLowerCase().includes(search.toLowerCase())
    );
    setfiltereddata(filteredQuestions);
    setCurrentPage(1); // Reset the current page to 1 when the search query changes
    setFilteredQuestionsLimit(3); // Reset the limit to the initial value
  }, [search, allQuestions]);
  const handleSearchinputchange = (e) => {
    const searchQuery = e.target.value;
    setsearch(searchQuery);

    //applying search filter
    const filteredQuestions = allQuestions.filter(
      (Q) =>
        Q.question &&
        Q.question.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setfiltereddata(filteredQuestions);
    setFilteredQuestionsLimit(3); // Reset the limit to the initial value
    };



    
 const formatTimeDifference = (timestamp) => {
   const currentTime = new Date();
   // console.log(currentTime)
   const postedTime = new Date(timestamp).getTime();
   // console.log(postedTime)

   //    const timeDifference = currentTime - postedTime;
   const timeDifference = currentTime - postedTime; // Get the time difference in milliseconds

   const minutes = Math.floor(timeDifference / (1000 * 60));
//    if (minutes === 0) {
//      return "Just now";
//    }
//    else
       if (minutes < 60) {
     return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
   }

   const hours = Math.floor(timeDifference / (1000 * 60 * 60));
   if (hours < 24) {
     return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
   }

   const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
   return `${days} ${days === 1 ? "day" : "days"} ago`;
 };


  return (
    <div className="container my-5 home-container">
      <div className="d-flex mb-5 justify-content-between">
        <button className="ask_button" onClick={handleClick}>
          Ask Question
        </button>
        {/* <SearchIcon className="header__SearchIcon" />//...........search */}
        <div>
          <SearchIcon className="SearchIcon" />
          <input
            className="searchbar"
            type="text"
            placeholder="Search question"
            onChange={handleSearchinputchange}
          />
        </div>
        <h4>Welcome: {userData.user?.display_name}</h4>
      </div>
      <div>
        {search === "" && (
          <>
            <hr />
            <h3>Questions</h3>
            <div>
              {allQuestions.map((question) => (
                <div key={question.timestamp}>
                  <hr />

                  <Link
                    to={`questions/${question.post_id}`}
                    className="text-decoration-none text-reset"
                      >
                    <Question
                      question={question.question}
                      userName={question.user_name}
                      //time={formatTimeDifference(question.timestamp)} // Pass the time as a prop
                      // time={formatTimeDifference(question.timestamp)}
                      />
                      <TimeStamp>
                    
                      <p>{formatTimeDifference(question.timestamp)}</p>
                    </TimeStamp>
                    {/* <ChevronRightOutlinedIcon /> */}
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div>
        {search !== "" && (
          <>
            <hr />
            <h3>Filtered Questions</h3>
            <div>
              {filtereddata.length === 0 ? (
                <h4>No Result Found </h4>
              ) : (
                filtereddata
                  .slice(0, filteredQuestionsLimit)
                  .map((Q, index) => (
                    <div key={index}>
                      <hr />
                      <Link
                        to={`questions/${Q.post_id}`}
                        className="text-decoration-none text-reset"
                      >
                        <Question
                          question={Q.question}
                          userName={Q.user_name}
                          //   time={formatTimeDifference(Q.timestamp)} // Pass the time as a prop
                        />
                      </Link>
                    </div>
                  ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};


export default Home
const TimeStamp = styled.div`
  padding-bottom: 50px;
  margin-left: 1200px;
//   margin-top: 20px;
  a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.6);
    font-size: 10px;
  }
`;


// useEffect(() => {
//     //userData or user kelel wd login page endihed
//     if (!userData.user) navigate("/login");
//   }, [userData.user, navigate]);
  //userData.user, navigate is the dependecie check endidereg yemenfelgew userData.user, navigate
//     return (
//     <div>
//       <h1>Welcome {userData.user?.display_name}</h1>
//       <button onClick={logout}>LLogout</button>
//     </div>
//   );