import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AllProviders } from '@config/AllProviders';
import { App } from './app/App';

const root = document.getElementById('root');

if (!root) {
	console.error(
		'No app root. Check that the element with id="root" exists in your DOM.'
	);
} else {
	createRoot(root).render(
		<StrictMode>
			<AllProviders>
				<App />
			</AllProviders>
		</StrictMode>
	);
}
