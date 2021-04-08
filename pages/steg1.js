import Link from 'next/link';
import HeaderSecondary from '../components/HeaderSecondary';

const Step1 = () => {
	return (
		<>
			<HeaderSecondary />

			<section className="py-20 min-h-screen flex flex-col justify-center">
				<div className="container">
					<div className="my-6 max-w-3xl ml-auto mr-auto bg-white px-10 py-10 shadow-md">
						<p className="text-black pb-8 text-xl">
							Det finnes flere innloggingsmuligheter, blant annet med kodekort, SMS-koder og QR-koder. De fleste bankene har derimot BankID på mobil
							eller innlogging med kodebrikker eller kodekort.
						</p>
						<h1 className="text-black mb-3">Logg inn i nettbanksimuleringen</h1>
						<p className="text-black pb-12 text-xl">Ved å velge en av påloggingsmetodene under. </p>

						<div className="flex space-x-8 pb-4">
							<Link href="/bankid/tekst/steg1">
								<a className="bg-primary p-8 text-white text-2xl hover:bg-pink transition hover:text-black">
									<strong className="block font-anenirHeavy">BankID</strong>
									Med kodebrikke
								</a>
							</Link>
							<Link href="/bankid/mobil/steg1">
								<a className="bg-primary p-8 text-white text-2xl hover:bg-pink transition hover:text-black">
									<strong className="block font-anenirHeavy">BankID</strong>
									På mobiltelefon
								</a>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Step1;
