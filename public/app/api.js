import axios from 'axios';

// INVOICE
export function createInvoice(invoice) {
	return axios.post('/api/invoices', invoice);
}

export function getInvoices() {
	return axios.get('/api/invoices');
}

export function updateInvoice(invoice) {
	return axios.put(`/api/invoices/${invoice.id}`, invoice);
}

// INVOICE ITEM
export function createInvoiceItem(invoiceItem) {
	return axios.post(`/api/invoices/${invoiceItem.invoice_id}/items`, invoiceItem);
}

export function updateInvoiceItem(invoiceItem) {
	return axios.put(`/api/invoices/${invoiceItem.invoice_id}/items/${invoiceItem.id}`, invoiceItem);
}

// CUSTOMER
export function getCustomers() {
	return axios.get('/api/customers');
}

// PRODUCT
export function getProducts() {
	return axios.get('/api/products');
}
