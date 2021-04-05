import { useState } from 'react';
import styled from 'styled-components';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import bundle from '../bundler';
import Resizable from './Resizable';

const Div = styled.div`
	height: 100%;
	display: flex;
	flex-direction: row;
`;

const CodeCell = () => {
	const [code, setCode] = useState('');
	const [input, setInput] = useState('');

	const onClick = async () => {
		const output = await bundle(input);
		setCode(output);
	};

	return (
		<Resizable direction="vertical">
			<Div>
				<CodeEditor
					initialValue="console.log(123);"
					onChange={(value) => setInput(value)}
				/>

				<Preview code={code} />
			</Div>
		</Resizable>
	);
};

export default CodeCell;
