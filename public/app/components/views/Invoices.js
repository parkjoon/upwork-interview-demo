import React, { Component } from 'react';

import InvoiceList from '../InvoiceList';
import Navbar from '../Navbar';

export default class Invoices extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<InvoiceList />
			</div>
		);
	}
}
