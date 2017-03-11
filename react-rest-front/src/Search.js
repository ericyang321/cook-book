import React, { Component } from 'react';

class Search extends Component{
	render() {
    const { fetching, value, ingredientsInput, submit_button } = this.props;
    return (
      <form className='content-container'>
        <h1 className='title'>Cook Book</h1>
        <input className='form-input' type="text" required value={value} onChange={ingredientsInput} placeholder='eg: egg pasta brocolli' />
        <button type="submit" className="form-submit" onClick={(event) => submit_button(event)}>
          { !fetching && <span className='emphasis-text'>Search</span> }
          { fetching && <div className='loading'></div> }
        </button>
      </form>
    )
  }
}

export default Search;
