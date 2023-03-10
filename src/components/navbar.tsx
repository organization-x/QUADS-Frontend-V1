import s from '../styles/navbar.module.scss';
import DotLink from './dotLink';

function Navbar() {
	return (
		<div className={'px-5 flex flex-row justify-between flex-nowrap items-center ' + s.nav}>
			<img className='grow-0' src="/quants_logo_black.png" alt="quads logo" />
			<nav className='py-3'>
				<DotLink href='#' text='about' />
			</nav>
		</div>
	);
}

export default Navbar;
