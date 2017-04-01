import React, { Component } from 'react';

import ProductList from './ProductList';
import { createInvoice, createInvoiceItem, getCustomers, getProducts, updateInvoice, updateInvoiceItem } from '../api';

export default class InvoiceForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			invoice_id: 0,
			customers: [],
			products: [],
			formValues: {
				customer_id: 0,
				product_ids: [],
				product_quantities: {
					// <product_id>: <quantity>
				},
				invoice_item_ids: {
					// <product_id>: <invoice_item_id>
				},
				discount: 0.0
			}
		};
	}

	componentDidMount() {
		getCustomers().then(res => {
			this.setState({ customers: res.data });
		}).catch(err => console.log(err));

		getProducts().then(res => {
			this.setState({ products: res.data });
		}).catch(err => console.log(err));

		createInvoice({
			customer_id: 0,
			discount: 0.0,
			total: 0.0
		}).then(res => {
			this.setState({ invoice_id: res.data.id });
		}).catch(err => console.log(err));
	}

	getTotal() {
		let total = 0.00;

		this.state.formValues.product_ids.forEach(product_id => {
			let product = this.state.products.find(p => p.id === product_id);
			total += product.price * (this.state.formValues.product_quantities[product_id] || 0);
		});

		return total * (1 - this.state.formValues.discount/100);
	}

	onFormValueUpdate(key, value) {
		this.setState({
			formValues: {
				...this.state.formValues,
				[key]: value
			}
		});

		this.updateInvoiceInDatabase();
	}

	onProductQuantityUpdate(product_id, quantity) {
		this.setState({
			formValues: {
				...this.state.formValues,
				product_quantities: {
					...this.state.formValues.product_quantities,
					[product_id]: quantity
				}
			}
		});

		this.updateInvoiceInDatabase();
	}

	onProductListItemClick(product_id) {
		if(this.state.formValues.product_ids.findIndex(id => id === product_id) === -1) {
			this.setState({
				formValues: {
					...this.state.formValues,
					product_ids: [ ...this.state.formValues.product_ids, product_id ],
					product_quantities: {
						...this.state.formValues.product_quantities,
						[product_id]: 0
					},
					invoice_item_ids: {
						...this.state.formValues.invoice_item_ids,
						[product_id]: 0
					}
				}
			});

			createInvoiceItem({
				invoice_id: Number(this.state.invoice_id),
				product_id: Number(product_id),
				quantity: 0
			}).then(res => {
				this.setState({
					formValues: {
						...this.state.formValues,
						invoice_item_ids: {
							...this.state.formValues.invoice_item_ids,
							[product_id]: res.data.id
						}
					}
				});
				this.updateInvoiceInDatabase();
			}).catch(err => console.log(err));
		}
	}

	updateInvoiceInDatabase() {
		updateInvoice({
			id: Number(this.state.invoice_id),
			customer_id: Number(this.state.formValues.customer_id),
			discount: parseFloat(this.state.formValues.discount),
			total: this.getTotal()
		}).then(res => console.log(res)).catch(err => console.log(err));

		this.state.formValues.product_ids.forEach(product_id => {
			updateInvoiceItem({
				id: Number(this.state.formValues.invoice_item_ids[product_id]),
				invoice_id: Number(this.state.invoice_id),
				product_id: Number(product_id),
				quantity: Number(this.state.formValues.product_quantities[product_id])
			}).then(res => console.log(res)).catch(err => console.log(err));
		});
	}

	renderCustomerSelectOptions() {
		return this.state.customers.map(c => <option key={`invoice-form-customer-select-option-${c.id}`} value={c.id}>{c.name}</option>);
	}

	renderProductQuantities() {
		return this.state.formValues.product_ids.map(product_id => {
			return (
				<div key={`form-product-quantity-${product_id}`}>
					<label htmlFor={`product-quantity-${product_id}`}>{product_id} | {this.state.products.find(p => p.id === product_id).name}</label>
					<input type="text" className="form-control" id={`product-quantity-${product_id}`} value={this.state.formValues.product_quantities[product_id]} onChange={e => this.onProductQuantityUpdate(product_id, e.target.value)} />
				</div>
			);
		});
	}

	renderTotal() {
		return (
			<div className="row">
				<div className="col-md-6">
					<h4 className="pull-left">TOTAL</h4>
				</div>
				<div className="col-md-6">
					<h4 className="pull-right">$ {this.getTotal()}</h4>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div>
				<h2>Create New Invoice</h2>
				<form style={{marginTop: '30px'}}>
					<div className="form-group">
						<label htmlFor="form-customer">Customer</label>
						<select className="form-control" id="form-customer" value={this.state.formValues.customer_id} onChange={e => this.onFormValueUpdate('customer_id', e.target.value)}>
							<option value="0">Select One</option>
							{this.renderCustomerSelectOptions()}
						</select>
					</div>
					<hr />
					<div className="form-group">
						<label>Click on products to add them to the invoice:</label>
						<div style={{maxHeight: '200px', overflowY: 'auto'}}>
							<ProductList onListItemClick={product_id => this.onProductListItemClick(product_id)} />
						</div>
					</div>
					<hr />
					<div className="form-group">
						{this.renderProductQuantities()}
					</div>
					<hr />
					<div className="form-group">
						<label htmlFor="form-discount">Discount</label>
						<input type="text" className="form-control" id="form-discount" value={this.state.formValues.discount} onChange={e => this.onFormValueUpdate('discount', e.target.value)} />
					</div>
					<hr />
					{this.renderTotal()}
					<hr />
					<button className="btn btn-default pull-right" onClick={() => this.closeInvoiceModal()}>Done</button>
				</form>
			</div>
		);
	}
}
