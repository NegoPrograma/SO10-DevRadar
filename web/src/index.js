//arquivo principal do react
//esse método de import é nativo do JS, o Node suportará isso no futuro.

//Todo arquivo contendo JSX deve importar o React
//JSX: Javascript+HTML
import React from 'react';

//ReactDOM é a sub-lib do react para lidar especificamente com o browser
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

