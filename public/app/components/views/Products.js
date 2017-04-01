import React, { Component } from 'react';

import Navbar from '../Navbar';
import ProductList from '../ProductList';

export default class Products extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<ProductList />
			</div>
		);
	}
}
