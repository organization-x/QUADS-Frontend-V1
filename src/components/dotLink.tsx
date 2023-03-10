import s from '../styles/dotLink.module.scss';

type Props = {
	className?: string,
	href: string,
	text: string
};

function DotLink({ href, className, text }: Props) {
	return (
		<a href={href} className={s.link + ' ' + (className ? className : '')}>
			<span className='rounded-full w-3 h-3 inline-block mr-2 align-middle' />
			<span className={s.text}>{ text }</span>	 
		</a>
	);
}

export default DotLink;
