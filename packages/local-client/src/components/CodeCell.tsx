import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useCumulativeCode } from '../hooks/useCumulativeCode';
import { BundlesState } from '../state/reducers/bundlesReducer';

const fadeIn = keyframes`
    0% {
    opacity: 0;;
    }
    50% {
        opacity: 0;
    }

    100% {
    opacity: 1;
    }
`;

const Div = styled.div`
	height: 100%;
	display: flex;
	flex-direction: row;

	.resize-horizontal {
		display: flex;
	}
	.progress-wrapper {
		height: 100%;
		flex-grow: 1;
		background-color: white;
		.progress-cover {
			position: relative;
			height: 100%;
			width: 100%;
			padding: 0 10%;
			display: flex;
			align-items: center;
			justify-content: center;
			animation: ${fadeIn} 0.5s;

			.progress {
				width: 200px;
			}
		}
	}
`;

interface CodeCellProps {
	cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const { updateCell, createBundle } = useActions();
	const state = useTypedSelector((state) => state.bundles as BundlesState);
	const bundle = state[cell.id];

	const cumulativeCode = useCumulativeCode(cell.id);

	// console.log(cumulativeCode);

	useEffect(() => {
		if (!bundle) {
			createBundle(cell.id, cumulativeCode);
			return;
		}

		const timer = setTimeout(async () => {
			createBundle(cell.id, cumulativeCode);
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
		//eslint-disable-next-line
	}, [cumulativeCode, cell.id, createBundle]);

	return (
		<Resizable direction="vertical">
			<Div>
				<Resizable direction="horizontal">
					<CodeEditor
						initialValue={cell.content}
						onChange={(value) => updateCell(cell.id, value)}
					/>
				</Resizable>
				<div className="progress-wrapper">
					{!bundle || bundle.loading ? (
						<div className="progress-cover">
							<progress
								className="progress is-small is-primary"
								max="100"
							>
								Loading
							</progress>
						</div>
					) : (
						<Preview code={bundle.code} error={bundle.err} />
					)}
				</div>
			</Div>
		</Resizable>
	);
};

export default CodeCell;
