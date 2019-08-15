import React, { Component } from 'react';

class AddPlace extends Component {
  state = {
    name: '',
    postalCode: 0,
    location: '',
    locationType: [],
    bestMomentOfYear: [],
    description: '',
    inOutDoors: [],
    money: [],
    category: [],
    error: '',
    message: ''
  };


  render() {
    const { 
      name, 
      postalCode, 
      location, 
      locationType, 
      bestMomentOfYear, 
      description, 
      inOutDoors,
      money,
      category,
      error,
      message
    } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label htmlFor='name'>Name of the place:</label>
        <input id='name' type='text' name='name' value={name} onChange={this.handleChange}/>
        <label htmlFor='postalCode'>Postal Code:</label>
        <input id='postalCode' type='number' name='postalCode' value={postalCode} onChange={this.handleChange} />
        <label htmlFor='postalCode'>Postal Code:</label>
        <input id='postalCode' type='number' name='postalCode' value={postalCode} onChange={this.handleChange} />
        <select name='locationType' value={locationType} onChange={this.handleChange}>
          <option value="urban">Urban</option>
          <option value="rural">Rural</option>
        </select>
        <select name='bestMomentOfYear' value={bestMomentOfYear} onChange={this.handleChange} multiple="multiple">
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <label htmlFor='description'>Description:</label>
        <input id='description' type='text' name='description' value={description} onChange={this.handleChange} />
        <select name='inOutDoors' value={inOutDoors} onChange={this.handleChange}>
          <option value="indoors">Indoors</option>
          <option value="outdoors">Outdoors</option>
        </select>
        <select name='money' value={money} onChange={this.handleChange}>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
        <select name='category' value={category} onChange={this.handleChange} multiple="multiple">
          <option value="Sports">Sports</option>
          <option value="Leisure">Leisure</option>
          <option value="Sleep">Sleep</option>
          <option value="Eating">Eating</option>
          <option value="Health">Health</option>
          <option value="Summer">Summer</option>
          <option value="Winter">Winter</option>
          <option value="Water">Water</option>
        </select>
        <button type='submit'>Add new place</button>
      </form>
    )
  }
}

export default AddPlace;