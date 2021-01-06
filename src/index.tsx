import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { configure, spy } from 'mobx'

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
})
spy((event) => {
  if (event.type === 'action') {
    console.log(`${event.name} with args: ${event.arguments}`)
  }
})
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

//reportWebVitals(console.log);
