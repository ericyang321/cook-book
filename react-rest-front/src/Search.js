import React, { Component } from 'react';

class Search extends Component{
	render() {
      return (
        <form>
          <div className="group">
            <input type="text" required value={this.props.value} onChange={this.props.ingredientsInput}></input>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Search</label>
            <button type="submit" className="btn" onClick={this.props.submit_button}><span>Submit</span></button>
          </div>
        </form>
      )
  	}

}

export default Search;