import React, { Component } from 'react';
import logo from './logo.svg';
import Search from './Search/Search';
import UserBadge from './UserBadge/UserBadge';
import RepoList from './RepoList/RepoList';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      error: ''
    }
    this.handleFetchGithubUser = this.handleFetchGithubUser.bind(this);
  }

  handleFetchGithubUser(username) {
    if (username === '') {
      return this.setState({
        error: 'Please submit a valid Github user name',
        user: null
      });
    }
    const usernameLowerCase = username.toLowerCase();
    fetch(`https://api.github.com/users/${usernameLowerCase}`).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        console.error(`Network response was not ok: ${res.statusText}`, res);
        if (res.status === 404) {
          throw Error(`User ${res.statusText}`);
        }
      }
    }).then(json => {
      this.setState({
        error: '',
        user: json
      });
    }).catch(error => {
      console.error(`There was a problem with your fetch: ${error.message}`);
      this.setState({
        error: error.message,
        user: null
      });
    });
  }

  render() {
    const { error, user } = this.state;

    const repoList = user && user.public_repos > 0
    ? <RepoList user={user} />
    : <h3>User has no repositories on Github yet :_(</h3>

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Github Search</h1>
        </header>
        <Search handleSubmitSearchTerm={this.handleFetchGithubUser} />
        {error &&
          <span className="App-error">{ error }</span>
        }
        {user &&
          <div>
            <UserBadge user={user} />
            {repoList}
          </div>
        }
      </div>
    );
  }
}

export default App;
