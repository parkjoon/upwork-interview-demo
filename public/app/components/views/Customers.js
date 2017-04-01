import React, { Component } from 'react';

import CustomerList from '../CustomerList';
import Navbar from '../Navbar';

export default class Customers extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<CustomerList />
			</div>
		);
	}
}
