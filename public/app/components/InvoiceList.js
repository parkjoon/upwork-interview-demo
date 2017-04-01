import React, { Component } from 'react';

import { getInvoices } from '../api';

export default class InvoiceList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			invoices: []
		};
	}

	componentDidMount() {
		getInvoices().then(res => {
			this.setState({ invoices: res.data });
		}).catch(err => console.log(err));
	}

	renderInvoiceListItems() {
		return this.state.invoices.map(i => {
			return (
				<tr key={`invoice-list-item-${i.id}`}>
					<td>{i.id}</td>
					<td>{i.customer_id}</td>
					<td>{i.discount}</td>
					<td>{i.total}</td>
				</tr>
			);
		});
	}

	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">Invoices</div>
				<div className="panel-body">
					<table className="table table-striped">
						<thead>
							<tr>
								<th>id</th>
								<th>customer_id</th>
								<th>discount</th>
								<th>total</th>
							</tr>
						</thead>
						<tbody>
							{this.renderInvoiceListItems()}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
