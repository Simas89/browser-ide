import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkgPathPlugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
	const ref = useRef<any>();
	const iframe = useRef<any>();
	const [input, setInput] = useState('');
	const [code, setCode] = useState('');

	const startService = async () => {
		ref.current = await esbuild.startService({
			worker: true,
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
		});
	};

	useEffect(() => {
		startService();
	}, []);

	const onClick = async () => {
		if (!ref.current) {
			return;
		}

		iframe.current.srcdoc = html;

		const result = await ref.current.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(input)],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			},
		});

		iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
	};

	const html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Document</title>
        </head>
        <body>
            <div id='root' />
            <script>

                window.addEventListener('message', (event)=>{

                    try {
                        eval(event.data);
                    } catch (error) {
                        const root = document.querySelector('#root');
                        root.innerHTML = '<div style="color: red; "><h4>Runtime Error</h4>' + error + '</div>'
                        console.error(error);
                    }
                    
                    
                }, false)

            </script>
        </body>
    </html>
    
    `;

	return (
		<div>
			<textarea
				onChange={(e) => setInput(e.target.value)}
				value={input}
			></textarea>
			<div>
				<button onClick={onClick}>Submit</button>
			</div>
			<pre>{code}</pre>
			<iframe ref={iframe} sandbox="allow-scripts" srcDoc={html} />
		</div>
	);
};

export default App;

// import ReactDOM from 'react-dom';
// import React from 'react'

// const App=({text})=>{
// return(<h1>{text}</h1>)
// }

// ReactDOM.render(<App text='Hello!!!!'/>, document.querySelector('#root'));
