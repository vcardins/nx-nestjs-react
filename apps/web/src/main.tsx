// import './wdyr';

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { App } from './app/App';

const ROOT_ELEMENT = document.getElementById('root') as HTMLElement;

function render() {
	// Let's bind the component to the tree through the `root` higher-order component
	ReactDOM.render(<App />, ROOT_ELEMENT);
}

window.onload = render;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
