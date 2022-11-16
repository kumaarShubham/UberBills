# UberBills
A fare aggregator for your monthly uber rides!

All love reimbursing their monthly cab rides but none to sit for hours, download tens of receipts, calculate each day's fare and then put it into proper formats.
UberBills V1.1 helps you do all these in a single click!

### Features
1. Download all your bills automatically
2. Seperate bills into their respective folders date-wise
3. Calculates a day's total fare (onward, outward, etc)
4. Puts all into an excel file to directly send to your HR

### Features supported in UberBills V.1.1
1. Seperate bills into their respective folders date-wise
2. Calculates a day's total fare (onward, outward, etc)

## Steps:
1. Clone or download this repo (downloaded folder would be named UberBills-main)
2. Create a folder named "Receipts" in the folder UberBills-main and download all your Uber receipts in this folder
3. Open a terminal in the folder UberBills-main and run the Uber.js file
4. To run, enter 'node Uber.js'

This would automatically create a folder named "Invoices". This would contain dated sub folders with receipts of that particular date.

The directory structure after creating "Receipts" folder would look like this:
UberBills
├── Receipts
│   ├── Uber_receipt1.pdf
│   ├── Uber_receipt2.pdf
│   ├── .
│   ├── .
│   └── .
├── Uber.js
├── package.json
├── package-lock.json
└── README.md
