/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'


export const themeChanger = () => {
	const { systemTheme, theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const renderThemechanger = () => {
		if (!mounted) return null
		const currentTheme = theme === 'system' ? systemTheme : theme;

		return (
			<div onClick={() => {
				setTheme(currentTheme === 'dark' ? 'light' : 'dark');
			}}>
				<img src='./images/discord-icon.svg' />
			</div>
		)
	}

	return { theme, renderThemechanger }
}
