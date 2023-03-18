import { useRef, useState } from 'react';
import Button from '../components/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from '../styles/index.module.scss';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Overlay from '../components/overlay';
import Document from '../components/document';
import UploadIcon from '../assets/upload.svg';
import UploadDarkIcon from '../assets/upload_dark.svg';
import IngestIcon from '../assets/ingest.svg';
import protectedFetch from '../utils/fetch';

type Source = {
	name: string,
	extract: string
};

type Answer = {
	question: string,
	answer: string,
	sources: Source[]
};

const API_URL = import.meta.env.VITE_API_URL;

const ALLOWED_FILES = ['text/plain', 'text/markdown'];

function IndexPage() {
	const [question, setQuestion] = useState('');
	const [files, setFiles] = useState<File[]>([]);
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
	const [answer, setAnswer] = useState<null | Answer>(null);
	const [processingAnswer, setProcessingAnswer] = useState(false);
	const [processingUpload, setProcessingUpload] = useState(false);
	const [showUploadOverlay, setShowUploadOverlay] = useState(false);
	const FileInput = useRef<HTMLInputElement>(null);

	const filesJSX = [];
	if (files.length) {
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			filesJSX.push(
				<li className='mb-3 flex flex-row' key={i}>
					<span 
						className={'mt-[0.35rem] w-3 h-3 rounded-full inline-block align-middle mr-3 ' + s['bg-dot-gray']} 
					/>
					<span className='inline-block'>
						{file.name}
					</span>
				</li>
			);
		}
	}

	const uploadedFilesJSX = uploadedFiles.map((file, i) => {
		let ext: 'txt' | 'md' = 'txt';
		if (file.type === 'plain/markdown') {
			ext = 'md';
		}
		return (
			<Document 
				key={i}
				className='shadow-md mb-3' 
				name={file.name}
				ext={ext}
			/>
		);
	});

	const onUploadFiles = () => {
		setProcessingUpload(true);
		const url = API_URL + '/documents';
		const form = new FormData();
		for (let i = 0; i < files.length; i++) {
			form.append(`files[${i}]`, files[i]);
		}
		const options = {
			method: 'POST',
			body: form,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		};
		protectedFetch(url, options).then(() => {
			setUploadedFiles(files);
			setFiles([]);
			setShowUploadOverlay(false);
			setProcessingUpload(false);
		}).catch(err => {
			alert(err);
		});
	};

	let mainContent;

	if (uploadedFiles.length === 0) {
		mainContent = (<>
			<h1 className='text-4xl text-center mb-10'>
				<img className='inline-block w-14 h-14' src='/quants_logo_black.png' alt='quads logo' />{' '}
				quads
			</h1>
			<Button 
				className='px-5 py-2 rounded-full text-white mx-auto block' bg='green'
				onClick={() => setShowUploadOverlay(true)}
			>
				upload a document to get started{' '}
				<img className='inline-block w-5 h-5' src={UploadIcon} alt="Upload icon" />
			</Button>
		</>);
	} else if (!processingAnswer) {
		mainContent = (<>
			<h1 className='text-4xl text-center mb-5'>
				<img className='inline-block w-14 h-14' src='/quants_logo_black.png' alt='quads logo' />{' '}
				quads
			</h1>
			<div className='xl:absolute xl:top-20 xl:right-20 mb-5'>
				<h4 className='hidden xl:block text-lg font-bold text-center mb-3'>
					Documents
				</h4>
				<div className='flex flex-col items-center sm:items-start sm:flex-row sm:flex-wrap sm:justify-between xl:block max-h-96 overflow-y-auto'>
					{uploadedFilesJSX}
				</div>
				<div>
					<Button className='text-white px-5 py-2 rounded-full ml-auto xl:mx-auto block' bg='green'>
						upload{' '}
						<img className='inline-block w-5 h-5' src={UploadIcon} alt="Upload icon" />
					</Button>
				</div>
			</div>
			<form onSubmit={e => e.preventDefault()} className='relative mb-10'>
				<input
					className={'px-5 py-3 w-full rounded-full shadow-md ' + s['border-gray']}
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
							question: question,
							answer: "I don't know",
							sources: [
								{
									name: 'document_1.txt',
									extract: 'Hello world'
								},
								{
									name: 'document_2.txt',
									extract: 'Hello world'
								},
								{
									name: 'document_3.txt',
									extract: 'Hello world'
								},
							]
						});
						setQuestion('');
					}}
				>
					<FontAwesomeIcon icon={faArrowRight} />
				</Button>
			</form>
			{
				answer ?
					<div>
						<div className='mb-10'>
							<h4 className='mb-1 text-2xl font-bold'>{answer.question}</h4>
							<p>{answer.answer}</p>
						</div>
						<hr className='mb-5' />
						<div>
							<h4 className='mb-1 text-2xl font-bold'>
								Sources
							</h4>
						</div>
					</div>
					:
					null
			}
		</>);
	} else {
		mainContent = (<>
			<h4>Loading...</h4>
		</>);
	}

	return (
		<main className='pt-10 sm:pt-20 relative'>
			<div className='container mx-auto px-5 max-w-xl'>
				{mainContent}
				<Overlay show={showUploadOverlay} className='max-w-2xl mx-auto px-5'>
					<div className='bg-white py-10 px-5 sm:px-10 rounded-2xl mt-20 md:mt-40'>
						<label htmlFor="document-upload">
							<Button 
								className='rounded-full px-5 sm:px-10 py-2 text-black text-lg text-center' bg='gray'
								onClick={() => (FileInput.current as HTMLInputElement).click()}
							>
								upload documents{' '}
								<img className='inline-block w-5 h-5' src={UploadDarkIcon} alt="Upload icon" />
							</Button>
						</label>
						<input 
							ref={FileInput}
							className='hidden' type="file" name="document-upload" id="document-upload" 
							multiple
							onChange={e => {
								const files = e.target.files;
								if (files) {
									const fileArray = [];
									for (let i = 0; i < files.length; i++) {
										const file = files[i];
										if (ALLOWED_FILES.includes(file.type)) {
											fileArray.push(file);
										}
									}
									setFiles(fileArray);
								}
							}}
						/>
						<ul className='mt-10 h-[20rem] overflow-y-auto'>
							{filesJSX}
						</ul>
						{
							files.length > 0 ?
								<Button 
									className='text-white px-5 py-2 rounded-full mx-auto flex flex-row justify-between items-center sm:w-72' 
									bg='green'
									onClick={() => onUploadFiles()}
								>
									<span>ingest documents</span>
									<img className='inline-block w-5 h-5' src={IngestIcon} alt="Ingest document icon" />
								</Button>
								:
								null
						}
					</div>
				</Overlay>
			</div>
		</main>
	);
}

export default IndexPage;
