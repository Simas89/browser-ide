import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../state';
import { useActions } from '../hooks/useActions';

const Div = styled.div`
	.w-md-editor {
		ul {
			line-height: 1;
		}
		.w-md-editor-text-pre {
			.title {
				line-height: unset;
				font-size: unset;
				font-weight: unset;
			}
		}
	}

	.w-md-editor-bar {
		svg {
			display: none;
		}
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=');
		height: 11px;
		cursor: row-resize;
		background-color: #37414b;
		background-repeat: no-repeat;
		background-position: 50%;
		position: relative;
		width: 100%;
	}
	.w-md-editor .title {
		line-height: unset;
		font-size: unset;
		font-weight: unset;
		color: #d4d4d4 !important;
	}

	/* *********************** */
	.w-md-editor ul {
		line-height: 1;
	}

	.w-md-editor-bar svg {
		display: none;
	}

	.w-md-editor-bar {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=');
		height: 11px;
		cursor: row-resize;
		background-color: #37414b;
		background-repeat: no-repeat;
		background-position: 50%;
		width: 100%;
		position: relative;
	}

	em {
		font-style: italic;
	}

	.wmde-markdown hr {
		border-top: 1px solid #dee5ed;
	}

	.wmde-markdown ol {
		list-style: decimal;
	}

	.w-md-editor-show-live {
		/* Hide menu bar buttons to prevent accidental delete */
		z-index: 20;
	}

	.w-md-editor-toolbar {
		background-color: #37414b;
		border-bottom: 1px solid gray;
	}

	.w-md-editor-toolbar li button {
		color: #d4d4d4;
	}

	.w-md-editor-content {
		background-color: #202123;
	}

	.w-md-editor,
	.w-md-editor .w-md-editor-text-pre {
		color: #d4d4d4;
	}

	.w-md-editor-text-pre .bold {
		color: unset;
	}

	.token.list.punctuation {
		background-color: unset;
	}
`;

interface TextEditorProps {
	cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
	const [editing, setEditing] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);
	const { updateCell } = useActions();

	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (
				ref.current &&
				event.target &&
				ref.current.contains(event.target as Node)
			) {
				return;
			}
			setEditing(false);
		};
		document.addEventListener('click', listener, { capture: true });

		return () =>
			document.removeEventListener('click', listener, { capture: true });
	}, []);

	if (editing) {
		return (
			<Div ref={ref}>
				<MDEditor
					value={cell.content}
					onChange={(v) => updateCell(cell.id, v || '')}
				/>
			</Div>
		);
	}

	return (
		<Div onClick={() => setEditing(true)}>
			<div className="card">
				<div className="card-content">
					<MDEditor.Markdown source={cell.content || 'Click to edit'} />
				</div>
			</div>
		</Div>
	);
};

export default TextEditor;
