import "./Header.css";
import React, { useContext } from "react";
import "./Header.css";
import logo from "./loginimg/evangadi-logo-home.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
function Header() {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();

  // const goToSignIn = (e) => {
  //   e.preventDefault();
  //   if (userData.user) {
  //     logout();
  //   }
  //   navigate("/login");
  // };
   const logout = () => {
     //set global state to undefined will logout the user
     setUserData({
       token: undefined,
       user: undefined,
     });
     //resetting localStorage
     localStorage.setItem("auth-token", "");
   };
  
  return (
    <div className="header container-fluid">
      <div className="innerContainer container d-flex justify-content-around ">
        <Link to="/login" className="header__image">
          <img src={logo} alt="Evangadi logo" />
        </Link>
        <button className="ic d-sm-block d-md-none">☰</button>
        <div className="d-flex  innerContainer2 justify-content-between d-none d-md-block">
          <Link to="/">Home</Link>
          <Link to="/">How it Works</Link>
          <button className="btn_header" onClick={logout}>
            {userData.user ? "LogOut" : "SIGN IN"}
          </button>
        </div>
      </div>
    </div>
  );
}
// <Link to="/"></Link>
export default Header;

// import React, { useContext } from "react";
// import Logo from "./loginimg/evangadi-logo-home.png";
// import "./Header.css";
// import { UserContext } from "../../context/UserContext";
// const Header = () => {
//   const [userData, setUserData] = useContext(UserContext);

//   const logout = () => {
//     //set global state to undefined will logout the user
//     setUserData({
//       token: undefined,
//       user: undefined,
//     });
//     //resetting localStorage
//     localStorage.setItem("auth-token", "");
//   };

//   return (
//     <header className="navbar-header">
//       <nav className="navbar navbar-expand-lg fixed-top">
//         <div className="container">
//           <a className="navbar-brand" href="/">
//             <img src={Logo} alt="Evangadi Logo" />
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-toggle="collapse"
//             data-target="#navbarCollapse"
//             aria-controls="navbarCollapse"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon  icon_menu"></span>
//           </button>

//           <div
//             className="collapse navbar-collapse bg-orange"
//             id="navbarCollapse"
//           >
//             <ul className="navbar-nav ml-auto">
//               <li className="nav-item active">
//                 <a data-scroll="" className="nav-link section-scroll" href="/">
//                   Home
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a
//                   data-scroll=""
//                   className="nav-link section-scroll"
//                   href="https://www.evangadi.com/explained/"
//                   target="_blank"
//                 >
//                   How it works
//                 </a>
//               </li>
//               <li>
//                 <div className="connect-block">
//                   {/* logout when the button clicked in which the function comes from app.js */}

//                   <a
//                     className="lnk-toggler btn btn-blue"
//                     data-panel=".panel-login"
//                     href="/login"
//                     onClick={logout}
//                   >
//                     {userData.user ? `Log Out` : `Sign In`}
//                   </a>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;
