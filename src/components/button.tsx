import s from '../styles/button.module.scss';

type Props = {
	onClick?: () => void,
	className?: string,
	children: JSX.Element | JSX.Element[] | string,
	bg: 'gray' | 'green'
};

const colorMap = {
	gray: s.gray,
	green: s.green
}

function Button({ onClick, className, children, bg }: Props) {
	return (
		<button 
			className={colorMap[bg] + ' ' + (className ? className : '')}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
