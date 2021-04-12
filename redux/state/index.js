import getDate from './../../util/getDate';
export const initialState = {
	selectedAccount: 'Brukskonto',
	allAccounts: [
		{
			accountName: 'Brukskonto',
			accountNumber: '1234.56.78910',
			actualAmount: 29879.67,
			remainingAmount: 29879.67,
			transaction: [
				{
					details: 'Matbutikk',
					amount: 128.7,
					date: getDate(0),
					type: 'debit',
				},
				{
					details: 'Strøm',
					amount: 647.83,
					date: getDate(1),
					type: 'debit',
				},
				{
					details: 'Husleie',
					amount: 4500,
					date: getDate(1),
					type: 'debit',
				},
				{
					details: 'Matbutikk',
					amount: 314.3,
					date: getDate(1),
					type: 'debit',
				},
				{
					details: 'Vipps',
					amount: 100,
					date: getDate(2),
					type: 'credit',
				},
				{
					details: 'Vipps',
					amount: 45,
					date: getDate(2),
					type: 'debit',
				},
				{
					details: 'Lønn',
					amount: 15000,
					date: getDate(2),
					type: 'credit',
				},
				{
					details: 'Kafé',
					amount: 54,
					date: getDate(3),
					type: 'debit',
				},
				{
					details: 'Forsikring',
					amount: 179,
					date: getDate(5),
					type: 'debit',
				},
				{
					details: 'Abonnement',
					amount: 139,
					date: getDate(5),
					type: 'debit',
				},
			],
		},
		{
			accountName: 'Sparekonto',
			accountNumber: '1234.43.21012',
			actualAmount: 46788.43,
			remainingAmount: 46788.43,
			transaction: [
				{
					details: 'Overføring egne kontoer: Til sparing',
					amount: 3000,
					date: getDate(1),
					type: 'credit',
				},
				{
					details: 'Hotell',
					amount: 2400,
					date: getDate(1),
					type: 'debit',
				},
				{
					details: 'Fly',
					amount: 900,
					date: getDate(2),
					type: 'debit',
				},
			],
		},
		{
			accountName: 'Kredittkort',
			accountNumber: '4321.01.23456',
			actualAmount: 20000,
			remainingAmount: 20000,
			transaction: [
				{
					details: 'Hjemmeelektronikk',
					amount: 3000,
					date: getDate(4),
					type: 'debit',
				},
				{
					details: 'Møbler',
					amount: 8000,
					date: getDate(10),
					type: 'debit',
				},
			],
		},
	],
};
