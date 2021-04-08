import Link from 'next/link';
import HeaderSecondary from './../components/HeaderSecondary';

const Home = () => {
	return (
		<>
			<HeaderSecondary />

			<section className="py-20 min-h-screen flex flex-col justify-center">
				<div className="container">
					<div className="py-6 max-w-3xl ml-auto mr-auto">
						<h1 className="text-white mb-6 text-[2rem]">Mine transaksjoner</h1>
						<p className="text-white pb-8 text-xl">Innlogging i simulering av nettbank</p>
						<p className="text-white pb-8 text-xl">
							Velkommen til vår nettbanksimulering. Dette er en simulering, hvor ingen informasjon blir lagret. Du kan derfor trygt bruke ekte eller
							fiktive tall når du blir bedt om å skrive inn i feltene.{' '}
						</p>
						<p className="text-white pb-10 text-xl">
							Det er litt forskjeller på utseende og bruk av begreper i nettbankene, men mye er likt. Sjekk din egen nettbank.
						</p>
						<Link href="/steg1">
							<a className="bg-white font-anenirHeavy rounded-lg px-7 pt-[15px] pb-[13px] inline-block uppercase shadow-md font-medium text-xl hover:shadow-lg transition hover:bg-pink ">
								Start simulering av nettbank
							</a>
						</Link>
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
