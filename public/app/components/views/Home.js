import React, { Component } from 'react';
import Modal from 'react-modal';

import InvoiceForm from '../InvoiceForm';
import InvoiceList from '../InvoiceList';
import Navbar from '../Navbar';

const InvoiceModalStyle = {
	content: {
		marginTop: '1%',
	}
};

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showInvoiceModal: false
		};
	}

	openInvoiceModal() {
		this.setState({ showInvoiceModal: true });
	}

	closeInvoiceModal() {
		this.setState({ showInvoiceModal: false });
	}

	render() {
		return (
			<div>
				<Navbar />
				<Modal
					isOpen={this.state.showInvoiceModal}
					onRequestClose={() => this.closeInvoiceModal()}
					shouldCloseOnOverlayClick={false}
					style={InvoiceModalStyle}
					contentLabel="Create New Invoice Modal">
					<InvoiceForm />
				</Modal>
				<div className="row">
					<div className="col-md-12 text-center">
						<button type="button" className="btn btn-info" onClick={() => this.openInvoiceModal()} style={{marginBottom: '20px'}}><i className="fa fa-plus" style={{marginRight: '10px'}}></i>Create New Invoice</button>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<InvoiceList onRequestClose={() => this.closeInvoiceModal()} />
					</div>
				</div>
			</div>
		);
	}
}
