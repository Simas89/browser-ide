import React from 'react';
import styled, { css } from 'styled-components';
import { useActions } from '../hooks/useActions';

interface DivProps {
	cellType: string;
}

const Div = styled.div<DivProps>`
	z-index: 10;
	top: 0;
	right: 0;
	background-color: #37414b;
	display: flex;
	justify-content: flex-end;

	position: relative;

	${(p) =>
		p.cellType === 'text' &&
		css`
			position: absolute;
		`}

	button {
		opacity: 0.6;
		transition: 0.2s;
		&:hover {
			opacity: 1;
		}
	}
`;

interface ActionBarProps {
	id: string;
	cellType: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id, children, cellType }) => {
	const { moveCell, deleteCell } = useActions();

	return (
		<Div cellType={cellType}>
			<button
				className="button is-primary is-small"
				onClick={() => moveCell(id, 'up')}
			>
				<span className="icon">
					<i className="fas fa-arrow-up" />
				</span>
			</button>
			<button
				className="button is-primary is-small"
				onClick={() => moveCell(id, 'down')}
			>
				<span className="icon">
					<i className="fas fa-arrow-down" />
				</span>
			</button>
			<button
				className="button is-primary is-small"
				onClick={() => deleteCell(id)}
			>
				<span className="icon">
					<i className="fas fa-times" />
				</span>
			</button>

			{children}
		</Div>
	);
};

export default ActionBar;
