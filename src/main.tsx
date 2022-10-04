import React from 'react';
import ReactDOM from 'react-dom/client';
import { Providers } from './providers/Providers';
import { App } from './app/App';

const root = document.getElementById('root');

if (!root) {
	console.error(
		'No app root. Check that the element with id="root" exists in your DOM.'
	);
} else {
	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<Providers>
				<App />
			</Providers>
		</React.StrictMode>
	);
}
