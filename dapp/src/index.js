import React from 'react';
import ReactDOM from 'react-dom/client';

import { drizzleReactHooks } from '@drizzle/react-plugin'

import drizzle from "../../dapp/src/drizzle";

import './css/index.css';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <drizzleReactHooks.DrizzleProvider drizzle={drizzle}>
            <App/>
        </drizzleReactHooks.DrizzleProvider>
    </React.StrictMode>
);
