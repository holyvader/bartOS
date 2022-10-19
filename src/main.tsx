import React from 'react';
import ReactDOM from 'react-dom/client';
import { AllProviders } from './app/modules/config/AllProviders';
import { App } from './app/App';

const root = document.getElementById('root');

if (!root) {
	console.error(
		'No app root. Check that the element with id="root" exists in your DOM.'
	);
} else {
	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<AllProviders>
				<App />
			</AllProviders>
		</React.StrictMode>
	);
}
