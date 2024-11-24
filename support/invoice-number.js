module.exports = generateInvoiceNumber = () => {
    const today = new Date();
	const year = String(today.getFullYear()).slice(-2); 
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0'); 
    const currentDate = `${year}${month}${day}`; 
	
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const invoiceNumber = `INV${currentDate}-${randomSuffix}`;
    return invoiceNumber;
};


