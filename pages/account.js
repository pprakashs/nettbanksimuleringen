import Link from 'next/link';
import Layout from './../components/Layout';
const Account = () => {
	return (
		<Layout>
			<section className="bg-white px-7 pt-10 pb-[200px] shadow-md">
				<h1 className="mb-6">Startsiden</h1>
				<table className="table-fixed border-r border-b border-secondary w-full text-xl">
					<thead>
						<tr className="border-t border-secondary text-left bg-[#E0E0E0]">
							<th className="w-2/5 p-2 border-l border-secondary font-anenirHeavy">Navn</th>
							<th className="w-1/5 p-2 border-l border-secondary text-center font-anenirHeavy">Kontonummer</th>
							<th className="w-1/5 p-2 pr-5 border-l border-secondary text-right font-anenirHeavy">Bokført saldo</th>
							<th className="w-1/5 p-2 pr-5 border-l border-secondary text-right font-anenirHeavy">Disponibelt beløp</th>
						</tr>
					</thead>
					<tbody>
						<tr className="border-t border-secondary">
							<td className="p-2 border-l border-secondary">
								<Link href="/transactions">
									<a className="underline hover:no-underline">Brukskonto</a>
								</Link>
							</td>
							<td className="p-2 border-l border-secondary text-center">1234.56.78910</td>
							<td className="p-2 border-l pr-5 border-secondary text-right">29.879,67 </td>
							<td className="p-2 border-l pr-5 border-secondary text-right">29.879,67 </td>
						</tr>
						<tr className="border-t border-secondary">
							<td className="p-2 border-l border-secondary">
								<Link href="/transactions">
									<a className="underline hover:no-underline">Sparekonto</a>
								</Link>
							</td>
							<td className="p-2 border-l border-secondary text-center">1234.43.21012</td>
							<td className="p-2 pr-5 border-l border-secondary text-right">46.788,43</td>
							<td className="p-2 pr-5 border-l border-secondary text-right">46.788,43</td>
						</tr>
						<tr className="border-t border-secondary">
							<td className="p-2 border-l border-secondary">
								<Link href="/transactions">
									<a className="underline hover:no-underline">Kredittkort</a>
								</Link>
							</td>
							<td className="p-2 border-l border-secondary text-center">4321.01.23456</td>
							<td className="p-2 pr-5 border-l border-secondary text-right">46.788,43</td>
							<td className="p-2 pr-5 border-l border-secondary text-right">20.000,00</td>
						</tr>
					</tbody>
				</table>
			</section>
		</Layout>
	);
};

export default Account;
