
// let hello : string = 'Hello ts'
// document.querySelectorAll('.app')[0].innerHTML = hello

import React from 'react'
import ReactDOM from 'react-dom'

import Hello from './components/demo/hello'

ReactDOM.render(
  <Hello name="typescript"></Hello>,
  document.querySelector('.app')
)