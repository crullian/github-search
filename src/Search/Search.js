import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';

import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSubmitSearchTermToParent = this.handleSubmitSearchTermToParent.bind(this);
  }

  handleSearchInput(e) {
    this.setState({searchTerm: e.target.value});
  }

  handleSubmitSearchTermToParent() {
    this.props.handleSubmitSearchTerm(this.state.searchTerm);
  }

  render() {
    return (
      <div className="Search-container">
        <TextField
          id="Search-textfield"
          onChange={this.handleSearchInput}
          value={this.state.searchTerm}
          hintText='Enter a Github user for a list repos' 
        />
        <IconButton iconClassName="material-icons" style={{color: 'blue'}} onClick={this.handleSubmitSearchTermToParent}>
          search
        </IconButton>
      </div>
    );
  }
}

export default Search;
