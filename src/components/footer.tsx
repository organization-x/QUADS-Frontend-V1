import s from '../styles/footer.module.scss';
import DotLink from './dotLink';

function Footer() {
	return (
		<div className={s.footer + ' py-5 w-full fixed bottom-0'}>
			<div className='container max-w-2xl mx-auto px-5'>
				<p className={'mb-5 ' + s['gray-muted']}>
					quads (query any data set) takes q&a to the next level. quants ai is not liable for content generated. do not enter personal information.
				</p>
				<div>
					<DotLink className='inline-block mr-5' href='#' text='about' />
					<DotLink className='inline-block' href='#' text='privacy policy' />
				</div>
			</div>
		</div>
	);
}

export default Footer;
