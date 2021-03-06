import React from "react"
import { Route, Switch, withRouter, Link } from "react-router-dom"
import "./App.css"
import MainPage from "./components/MainPage"
import SkillSelect from "./components/SkillSelect"
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home"
import DayInfo from "./components/DayInfo"

class App extends React.Component {
  state = {
    user: {}
  }

  logout = () => {
    localStorage.clear()
    this.setState({
      user: {}
    })
    this.props.history.push("/")
  }

  // --------------------FETCHES THE SINGLE USER-----------------

  getUser = user => {
    this.setState({
      user
    })
  }

  componentDidMount() {
    fetch("https://habitrack-backend.herokuapp.com/api/v1/profile", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer: ${localStorage.getItem("jwt")}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error("Not logged in...", res)
      })
      .then(data => {
        this.setState({ user: data.user })
      })
      .catch(e => {
        console.log("Oh noes")
      })
  }

  render() {
    return (
      <div className="App">
        <header className="app-header">
          <div className="maintitle-div">
            {this.state.user.id ? (
              <>
                <Link to={"/mainpage"}>
                  <img
                    className="LOGOsmall"
                    alt="Nothing"
                    src="https://i.imgur.com/4B4l9qw.png"
                  />
                </Link>
              </>
            ) : (
              <>
                <img
                  className="LOGOsmall"
                  alt="Nothing"
                  src="https://i.imgur.com/4B4l9qw.png"
                />
              </>
            )}
          </div>

          {this.state.user.username ? (
            <div className="user-info">
              <span className="welcomename">{this.state.user.username}</span>
              <span onClick={this.logout} className="isloggedin logout">
                {" "}
                EXIT
              </span>
            </div>
          ) : (
            <Login user={this.state.user} getUser={this.getUser} />
          )}
        </header>

        <br />
        <main>
          <Switch>
            <Route
              exact
              path="/mainpage"
              render={props => <MainPage user={this.state.user} />}
            />

            <Route
              exact
              path="/"
              render={props => (
                <Home user={this.state.user} getUser={this.getUser} />
              )}
            />

            <Route
              exact
              path="/skillselect"
              render={props => <SkillSelect user={this.state.user} />}
            />

            <Route
              exact
              path="/register"
              render={props => (
                <Register user={this.state.user} getUser={this.getUser} />
              )}
            />

            <Route
              exact
              path="/day/:id"
              render={props => <DayInfo {...props} />}
            />
          </Switch>
        </main>
        <footer className="footer">
          <div className="linksdiv">
            <a
              className="gitlink"
              href="https://github.com/romanpirag"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github-square" />
            </a>

            <a
              className="linkedin-link"
              href="https://www.linkedin.com/in/romanpirag/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin" />
            </a>
          </div>

          <div className="copyright">
            <h1>&copy; Roma 2019</h1>
          </div>

        </footer>
      </div>
    )
  }
}

export default withRouter(App)
