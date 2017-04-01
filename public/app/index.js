import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/views/Home';
import Products from './components/views/Products';
import Customers from './components/views/Customers';
import Invoices from './components/views/Invoices';

ReactDOM.render(
(<Router>
	<div>
		<Route exact path="/" component={Home} />
		<Route exact path="/products" component={Products} />
		<Route exact path="/customers" component={Customers} />
		<Route exact path="/invoices" component={Invoices} />
	</div>
</Router>),
document.getElementById('root'));
