import { useState } from 'react';
import Button from '../components/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import s from '../styles/index.module.scss';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

type Answer = {
	q: string,
	a: string
};

function IndexPage() {
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState<null | Answer>(null);

	return (
		<main className='pt-20 sm:pt-40 container mx-auto px-5 max-w-2xl'>
			<h1 className='text-4xl text-center mb-5'>
				<img className='inline-block w-14 h-14' src='/quants_logo_black.png' alt='quads logo' />{' '}
				quads
			</h1>
			<div className='flex flex-row justify-center mb-3'>
				<Button bg='gray' className='py-3 rounded-3xl mr-5 w-48'>
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
		</main>
	);
}

export default IndexPage;
