// importing required modules
const fs = require("fs");
const pdf = require("pdf-parse");

let receiptsSegregated = false;

/**
 * @desc Segregates all receipts into their respective date folder
 */
function segregateReceipts() {

	/* Reading folder "Receipts" containing all receipts */
	let receipts = fs.readdirSync("Receipts");

	receipts.forEach( async receipt => {

		let dataArr = [];
		const receiptPath = "./Receipts/" + receipt;

		let dataBuffer = fs.readFileSync(receiptPath);

		/* Parsing each PDF */
		await pdf(dataBuffer).then(function (data) {
			dataArr = data.text.split(/\r?\n/);
			let date = dataArr[3].split(" ")[0];
			date = date.replaceAll("/", "-");

			/* Initialises new folder "Invoices" which shall contain dated folders */
			let datedFolderPath = "./Invoices/" + date;

			/* Checks if a folder with path datedFolderPath exists, if not, it will create one */
			if (! fs.existsSync(datedFolderPath)) 
				fs.mkdirSync(datedFolderPath);

			/* Moves receipts into their respective dated folders */
			fs.rename(receiptPath, datedFolderPath + "/" + receipt, function (err) {
				if (err) 
					throw err;
			});
		});
	});
	receiptsSegregated = true;
}

/**
 * @desc Calculates date-wise total fare
 */
async function calculate_PerDay_TotalFare() {

	/* Reading "Invoices" folder */
	let folders = fs.readdirSync("./Invoices");

	for (let i = 0; i < folders.length; i++) {
		let folder = folders[i];

		/* Reading a dated folder */
		let receipts = fs.readdirSync("./Invoices/" + folder);
		let totalFare = 0;

		/* Looping in a dated folder to go through all the receipts for that date */
		for (let i = 0; i < receipts.length; i++) {

			/* Reading a receipt */
			let dataBuffer = fs.readFileSync("./Invoices/" + folder + "/" + receipts[i]);

			await pdf(dataBuffer).then(function (data) {
				let dataArr = data.text.split(/\r?\n/);
				totalFare += parseFloat(dataArr[11].split("₹")[1]);
			});
		}

		/* Printing a day's total fare (onward + outward journey) */
		console.log(`${folder}: ${totalFare}`);
	}
}

if(receiptsSegregated) calculate_PerDay_TotalFare();
else{
	segregateReceipts();
	calculate_PerDay_TotalFare();
}