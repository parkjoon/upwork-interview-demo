import React, { Component } from 'react';

import { getCustomers } from '../api';

export default class CustomerList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			customers: []
		};
	}

	componentDidMount() {
		getCustomers().then(res => {
			this.setState({ customers: res.data });
		}).catch(err => console.log(err));
	}

	renderInvoiceListItems() {
		return this.state.customers.map(i => {
			return (
				<tr key={`customer-list-item-${i.id}`}>
					<td>{i.id}</td>
					<td>{i.name}</td>
					<td>{i.address}</td>
					<td>{i.phone}</td>
				</tr>
			);
		});
	}

	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">Customers</div>
				<div className="panel-body">
					<table className="table table-striped">
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Address</th>
								<th>Phone</th>
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
