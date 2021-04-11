import './syntax.css';
import { useRef } from 'react';
import styled from 'styled-components';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

const Div = styled.div`
	position: relative;
	height: 100%;
	width: calc(100% - 10px);

	&:hover .button-format {
		opacity: 1;
	}

	.button-format {
		position: absolute;
		top: 5px;
		right: 5px;
		z-index: 20;
		opacity: 0;
		transition: 0.3s;
	}
`;

interface CodeEtitorProps {
	initialValue: string;
	onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEtitorProps> = ({ initialValue, onChange }) => {
	const editorRef = useRef<any>();
	const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
		editorRef.current = monacoEditor;
		monacoEditor.onDidChangeModelContent(() => {
			onChange(getValue());
		});

		monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

		const highlighter = new Highlighter(
			// @ts-ignore
			window.monaco,
			codeShift,
			monacoEditor
		);

		highlighter.highLightOnDidChangeModelContent(
			() => {},
			() => {},
			undefined,
			() => {}
		);
	};

	const onFormatClick = () => {
		const unformated = editorRef.current.getModel().getValue();

		const formated = prettier
			.format(unformated, {
				parser: 'babel',
				plugins: [parser],
				useTabs: false,
				semi: true,
				singleQuote: true,
			})
			.replace(/\n$/, '');

		editorRef.current.setValue(formated);
	};

	return (
		<Div>
			<button
				className="button button-format is-primary is-small"
				onClick={onFormatClick}
			>
				Format
			</button>
			<MonacoEditor
				editorDidMount={onEditorDidMount}
				value={initialValue}
				theme="dark"
				language="javascript"
				height="100%"
				options={{
					wordWrap: 'on',
					minimap: { enabled: false },
					showUnused: false,
					folding: false,
					lineNumbersMinChars: 3,
					fontSize: 16,
					scrollBeyondLastLine: false,
					automaticLayout: true,
				}}
			/>
		</Div>
	);
};

export default CodeEditor;
