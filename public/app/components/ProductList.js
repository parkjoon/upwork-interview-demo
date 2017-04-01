import React, { Component } from 'react';

import { getProducts } from '../api';

export default class ProductList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			products: []
		};
	}

	componentDidMount() {
		getProducts().then(res => {
			this.setState({ products: res.data });
		}).catch(err => console.log(err));
	}

	renderProductListItems() {
		return this.state.products.map(p => {
			return (
				<tr key={`product-list-item-${p.id}`} style={{cursor: this.props.onListItemClick ? 'pointer' : 'auto'}} onClick={this.props.onListItemClick ? (() => this.props.onListItemClick(p.id)) : () => {}}>
					<td>{p.id}</td>
					<td>{p.name}</td>
					<td>{p.price}</td>
				</tr>
			);
		});
	}

	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">Products</div>
				<div className="panel-body">
					<table className={`table ${this.props.onListItemClick ? 'table-hover' : 'table-striped'}`}>
						<thead>
							<tr>
								<th>id</th>
								<th>name</th>
								<th>price</th>
							</tr>
						</thead>
						<tbody>
							{this.renderProductListItems()}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
