import React from 'react'
import {render} from 'react-dom'
import {hashHistory, IndexRoute, Route, Router} from 'react-router'
import request from 'superagent'
import App from './components/App'


document.addEventListener('DOMContentLoaded', () => {
  render(<App/>,document.getElementById('app'))
})
