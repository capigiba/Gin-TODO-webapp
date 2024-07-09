import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Alert from './components/Alert';

const App = () => {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");

  const [tickInterval, setTickInterval] = useState();

  const navigate = useNavigate();

  const logOut = () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    }

    fetch(`${process.env.REACT_APP_BACKEND}/logout`, requestOptions)
      .catch(error => {
        console.log("error logging out", error);
      })
      .finally(() => {
        setJwtToken("");
        toggleRefresh(false);
      });

    navigate("/");
  }

  const toggleRefresh = useCallback((status) => {
    console.log("clicked");

    if (status) {
      let i = setInterval(() => {
        const requestOptions = {
          method: "GET",
          credentials: "include",
        }
        fetch(`${process.env.REACT_APP_BACKEND}/refresh`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.access_token) {
              setJwtToken(data.access_token);
            }
          })
          .catch(error => {
            console.log("user is not logged in");
          })
      }, 600000);
      setTickInterval(i);
      console.log("setting tick interval to ", i);
    } else {
      console.log("turning off tickInterval", tickInterval)
      setTickInterval(null);
      clearInterval(tickInterval);
    }
  }, [tickInterval]);

  useEffect(() => {
    if (jwtToken === "") {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      }

      fetch(`${process.env.REACT_APP_BACKEND}/refresh`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setJwtToken(data.access_token);
            toggleRefresh(true);
          }
        })
        .catch(error => {
          console.log("user is not logged in", error);
        })
    }
  }, [jwtToken, toggleRefresh]);

  return (
    <div>
      <header >
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">Gin-TODO</Link>
              <div className="collapse d-flex" id="navbarNav">
                <ul className="navbar-nav align-items-center">
                  {jwtToken === "" ? (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                      </li>
                    </>
                  ) : (
                    <li className="nav-item">
                      <button onClick={logOut} className="btn btn-danger">Logout</button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
      </header>
      <main>
        <div>
          <Alert 
            message={alertMessage}
            className={alertClassName}
          />
          <Outlet context={{
            jwtToken, 
            setJwtToken,
            setAlertMessage,
            setAlertClassName,
            toggleRefresh,
          }}/>
        </div>
      </main>
      <footer className="text-center mt-4">
        <p>© 2024 Gin-TODO</p>
      </footer>
    </div>
  );
};

export default App;
