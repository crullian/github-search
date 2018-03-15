import React, { Component }  from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import {
  green600,
  deepOrange600,
  purple600,
  indigo600
} from 'material-ui/styles/colors';

import './RepoList.css';


const chipStyle = {
  margin: '4px',
  color: '#fff'
}

class RepoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: null,
      error: ''
    }
    this.handleFetchUserRepos = this.handleFetchUserRepos.bind(this);
    this.sortByMostRecent = this.sortByMostRecent.bind(this);
  }

  componentDidMount() {
    this.handleFetchUserRepos(this.props.user.login);
  }

  componentWillReceiveProps(newProps) {
    this.setState({repos: null});
    this.handleFetchUserRepos(newProps.user.login);
  }

  handleFetchUserRepos(user) {
    fetch(`https://api.github.com/users/${user}/repos?per_page=100`).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        console.error(`Network response was not ok: ${res.statusText}`, res);
      }
    }).then(json => {
      this.setState({
        error: '',
        repos: json
      });
    }).catch(error => {
      console.error(`There was a problem with your fetch: ${error.message}`);
    });
  }

  sortByMostRecent(a,b) {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB - dateA;
  }

  render() {
    const { repos } = this.state;

    if (!repos) {
      return (
        <h3>Loading...</h3>
      )
    }

    return (
      <div className="RepoList-container">
        {repos && repos.sort(this.sortByMostRecent).map(repo => (
          <Card key={repo.id} style={{margin: '10px', textAlign: 'left'}}>
            <CardTitle
              title={repo.name}
              subtitle={repo.description || 'No Description Available'}
            />
            <CardTitle
              style={{padding: '0 16px 16px'}}
              subtitle={`Git Url - ${repo.git_url}`}
            />
            <div className="RepoList-chip-wrapper">
              <Chip
                style={chipStyle}
                backgroundColor={green600}
                labelColor={'#fff'}
              >
                Stars: {repo.stargazers_count}
              </Chip>
              <Chip
                style={chipStyle}
                backgroundColor={deepOrange600}
                labelColor={'#fff'}
              >
                Forks: {repo.forks_count}
              </Chip>
              <Chip
                style={chipStyle}
                backgroundColor={purple600}
                labelColor={'#fff'}
              >
                Issues: {repo.open_issues_count}
              </Chip>
              <Chip
                style={chipStyle}
                backgroundColor={indigo600}
                labelColor={'#fff'}
              >
                Size: {repo.size}
              </Chip>
            </div>
          </Card>
        ))}
      </div>
    )
  }
}

export default RepoList;