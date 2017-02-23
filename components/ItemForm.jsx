import React from 'react'

import * as localDb from '../localDb'

// Controlled component form
// https://facebook.github.io/react/docs/forms.html#controlled-components
export default React.createClass({
  itemColors: [
    'aliceblue',
    'blanchedalmond',
    'burlywood',
    'cadetblue',
    'chartreuse',
    'darkgoldenrod',
    'cornflowerblue',
    'tomato',
    'gainsboro',
    'mediumaquamarine',
    'papayawhip',
    'thistle',
    'whitesmoke'
  ],

  itemModel: {
    name: '',
    description: '',
    color: 'aliceblue'
  },

  getInitialState () {
    return {
      item: { ...this.itemModel }
    }
  },

  handleSubmit (evt) {
    evt.preventDefault()

    localDb.addItem(this.state.item)
    this.resetForm()
    this.props.refreshItemList()
  },

  handleChange (evt) {
    // select lists have no 'name' attribute
    const field = evt.target.name || 'color'
    this.setState({
      item: {
        ...this.state.item,
        [field]: evt.target.value
      }
    })
  },

  resetForm () {
    this.setState({
      item: { ...this.itemModel }
    })
  },

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" className="u-full-width" name="name" value={this.state.item.name} onChange={this.handleChange} />
        <label htmlFor="description">Description</label>
        <input type="text" className="u-full-width" name="description" value={this.state.item.description} onChange={this.handleChange} />
        <label htmlFor="color">Colour (browser built-ins)</label>
        <select value={this.state.item.color} onChange={this.handleChange}>
          {this.itemColors.map((color, i) => (
            <option key={i} value={color}>{color}</option>
          ))}
        </select>
        <input type="submit" className="button-primary" type="submit" value="Add" />
        <button className="button-warning" onClick={() => this.resetForm()}>Reset</button>
      </form>
    )
  }
})
