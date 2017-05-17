import React from 'react'
import { Link } from 'react-router'

import * as localDb from '../localDb'
import ItemForm from './ItemForm'

export default React.createClass({
  getInitialState () {
    return {
      items: [],
      editItem: null
    }
  },

  componentDidMount () {
    this.setState({
      items: localDb.getItems()
    })
  },

  editItem (id) {
    if (this.state.editItem) {
      this.setState({editItem:null})
    } else {
      this.setState({
        editItem: { ...this.state.items.find(item => item.id === id) }
      })
    }
  },

  deleteItem (evt, id) {
    evt.preventDefault()

    localDb.deleteItem(id)
    this.setState({
      items: this.state.items.filter(item => item.id !== id)
    })
  },

  getItem (item) {
    const { id, name, description, color } = item
    return (
      <tr key={id} className="item" onClick={() => this.editItem(id)} onContextMenu={(evt) => this.deleteItem(evt, id)}>
        <td className="item-name">{name}</td>
        <td className="item-description">{description}</td>
        <td className="item-color" style={{ backgroundColor: color }}></td>
      </tr>
    )
  },

  saveItem (item) {
    if (this.state.editItem) {
      localDb.saveItem(item)
      this.setState({
        items: this.state.items.map(i => i.id === item.id ? item : i),
        editItem: null
      })
    } else {
      localDb.addItem(item)
      this.setState({
        items: localDb.getItems()
      })
    }
  },

  render () {
    return (
      <div className="row">
        <div className="two-thirds column">
          <h1>Items</h1>
          <p>Left-click to edit, right-click to delete. (Probably not the best UX for a production app!)</p>
          <p>This is the <strong>complex controlled component</strong> version of the demo, with editing and validation.</p>
          <p>For the simple version, <Link to="/simple">click here</Link>. For the uncontrolled component version (using refs), <Link to="/uncontrolled">click here</Link>.</p>
          <table className="u-full-width">
            <thead>
              <tr>
                <th className="item-name">Name</th>
                <th className="item-description">Description</th>
                <th className="item-color">Colour</th>
              </tr>
            </thead>
            <tbody>
            {this.state.items.map(item => this.getItem(item))}
            </tbody>
          </table>
        </div>

        <div className="one-third column">
          <h2>{this.state.editItem ? 'Edit' : 'Add an'} item</h2>
          <ItemForm editItem={this.state.editItem} saveItem={this.saveItem} />
          <p>Above component is <strong>&lt;ItemForm /&gt;</strong>.</p>
        </div>
      </div>
    )
  }
})

