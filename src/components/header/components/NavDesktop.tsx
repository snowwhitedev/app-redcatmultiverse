import React, { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router';
import styles from '../header.module.scss'
import RadioSwitch from '../../RadioSwitch/RadioSwitch';
import { WalletConnectionContainer } from '../WalletConnection';


export const NavDesktop = ({ links, onOpenConnectModal }: any) => {
	const router = useRouter();
	const { systemTheme, theme, setTheme } = useTheme();

	const darkBackgroundPages = ['/', '/multiverse', '/play-learn-earn']

	const currentTheme = theme === 'system' ? systemTheme : theme;

	const isDarkBackgroundPage = () => darkBackgroundPages.includes(router.pathname);

	return (
		<nav className={`${styles.navbar} ${isDarkBackgroundPage() ? styles.darkPage : ''}`}>
			<WalletConnectionContainer />
		</nav>
	)
}
