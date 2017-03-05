import React, { Component } from 'react';

class Search extends Component{
	render() {
    const { value, ingredientsInput, submit_button } = this.props;
    return (
      <form className='form-container'>
        <h1>Input Ingredients</h1>
        <input className='form-input' type="text" required value={value} onChange={ingredientsInput} placeholder='eg: egg pasta brocolli' />
        <button type="submit" className="btn form-submit" onClick={(event) => submit_button(event)}>
          <span>Search</span>
        </button>
      </form>
    )
  }
}

export default Search;
