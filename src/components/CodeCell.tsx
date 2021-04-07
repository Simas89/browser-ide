import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import bundle from '../bundler';
import Resizable from './Resizable';

const Div = styled.div`
	height: 100%;
	display: flex;
	flex-direction: row;

	.resize-horizontal {
		display: flex;
	}
`;

const CodeCell = () => {
	const [code, setCode] = useState('');
	const [input, setInput] = useState('');

	useEffect(() => {
		const timer = setTimeout(async () => {
			const output = await bundle(input);
			setCode(output);
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	}, [input]);

	return (
		<Resizable direction="vertical">
			<Div>
				<Resizable direction="horizontal">
					<CodeEditor
						initialValue="const root = document.querySelector('#root'); root.innerHTML = 5;"
						onChange={(value) => setInput(value)}
					/>
				</Resizable>
				<Preview code={code} />
			</Div>
		</Resizable>
	);
};

export default CodeCell;
