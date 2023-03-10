import { useState } from 'react';
import Button from '../components/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from '../styles/index.module.scss';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Overlay from '../components/overlay';

type Answer = {
	q: string,
	a: string
};

function IndexPage() {
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState<null | Answer>(null);
	const [showOverlay, setShowOverlay] = useState(false);

	return (
		<main className='pt-20 sm:pt-40 container mx-auto px-5 max-w-2xl'>
			<h1 className='text-4xl text-center mb-5'>
				<img className='inline-block w-14 h-14' src='/quants_logo_black.png' alt='quads logo' />{' '}
				quads
			</h1>
			<div className='flex flex-row justify-center mb-3'>
				<Button 
					bg='gray' className='py-3 rounded-3xl mr-5 w-48'
					onClick={() => setShowOverlay(true)}
				>
					upload a file
				</Button>
				<Button bg='green' className='py-3 rounded-3xl w-48'>
					select a file
				</Button>
			</div>
			<div className='relative mb-10'>
				<input
					className={'px-5 py-3 w-full rounded-full ' + s['border-gray']}
					placeholder='ask anything...'
					value={question}
					onChange={e => setQuestion(e.target.value)}
					type="text" 
				/>
				<Button 
					bg='green'
					className='absolute top-2 right-2 w-8 h-8 text-white rounded-full pt-[0.1rem]'
					onClick={() => {
						setAnswer({
							q: question,
							a: "I don't know"
						});
						setQuestion('');
					}}
				>
					<FontAwesomeIcon icon={faArrowRight} />
				</Button>
			</div>
			{
				answer ?
					<div>
						<h4 className='mb-5 text-2xl font-bold'>{answer.q}</h4>
						<p>{answer.a}</p>
					</div>
					:
					null
			}
			<Overlay show={showOverlay} className='max-w-2xl mx-auto px-5'>
				<div className='bg-white py-10 px-20 rounded-2xl mt-20 md:mt-40'>
					<div className='flex flex-row justify-between px-10 mb-10'>
						<Button 
							bg='gray' className='w-44 py-3 px-5 rounded-full text-black'
						>
							notion link
						</Button>
						<Button 
							bg='gray' className='w-44 py-3 px-5 rounded-full text-black'
						>
							text document
						</Button>
					</div>
					<div className='px-10 flex flex-row mb-20 md:mb-40'>
						<span className={'inline-block w-12 h-12 rounded-full mr-5 ' + s['bg-green']} />
						<Button 
							bg='gray' className='grow py-3 px-5 rounded-full text-left text-black'
						>
							file1.txt
						</Button>
					</div>
					<div className='flex flex-row justify-center'>
						<Button 
							bg='green' className='py-1 px-5 rounded-2xl text-white'
							onClick={() => setShowOverlay(false)}
						>
							submit
						</Button>
					</div>
				</div>
			</Overlay>
		</main>
	);
}

export default IndexPage;
