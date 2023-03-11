import MainNavigation from './main-navigation';
import { Fragment, PropsWithChildren } from 'react';

export default function Layout(props: PropsWithChildren) {
	return (
		<Fragment>
			<MainNavigation />
			<main>{props.children}</main>
		</Fragment>
	);
}
