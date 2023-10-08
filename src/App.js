import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/Signup/SignUp";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Header from "./pages/Login/Header1";
import Footer from "./pages/Login/Footer";
import Quesion from "./pages/AskQuestion/AskQuestion";
import AnswerQuestion from "./pages/QuestionDetail/QuestionDetail";
import ResetPassword from "./pages/Login/ResetPassword";
import ResetByNewPassword from "./pages/Login/ResetByNewPassword";
// import Answer from "./pages/Answer/Answer";
// import NewQuestion from "./pages/Question/NewQuestion";
// import AskQuestion from "./pages/AskQuestion/AskQuestion";
// import AnswerQuestion from "./pages/AnswerQuestion/AnswerQuestion";
// import AnswerQuestion from "./pages/QuestionDetail/QuestionDetail";

function App() {
  const [userData, setUserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    //check if token already exists in localStorage
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      //token not in localStorage then set auth token empty
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      //if token exists in localStorage then use auth to verify token and get user info
      const userRes = await axios.get("http://localhost:4000/api/users/", {
        headers: { "x-auth-token": token },
      });

      //set the global state with user info
      setUserData({
        token,
        user: {
          id: userRes.data.data.user_id,
          display_name: userRes.data.data.user_name,
        },
        
      });
    }
  };

  const logout = () => {
    //set global state to undefined will logout the user
    setUserData({
      token: undefined,
      user: undefined,
    });

    //resetting localStorage
    localStorage.setItem("auth-token", "");
  };

  useEffect(() => {
    //check if the user is logged in
    checkLoggedIn();
  }, []);
  return (
    <Router>
      <div>
        <Header logout={logout} />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/askQuestion" element={<Quesion />} />
          <Route path="/questions/:id" element={<AnswerQuestion />} />
          {/* passing logout function as props to Home page */}
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/reset" element={<ResetByNewPassword />} />
          {/* SingleQuestion */}
          <Route path="/" element={<Home logout={logout} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;





