import React from 'react';
import styled from 'styled-components';
import { useActions } from '../hooks/useActions';

const Div = styled.div<{ isLast: boolean | undefined }>`
	position: relative;
	transition: opacity 0.2s ease-in 0.1s;
	margin: 10px 0;

	opacity: ${(p) => (p.isLast ? 1 : 0)};

	&:hover {
		opacity: 1;
	}

	.divider {
		position: absolute;
		top: 50%;
		bottom: 50%;
		border-bottom: 1px solid gray;
		right: 2.5%;
		width: 95%;
		z-index: -1;
	}
	.abb-buttons {
		display: flex;
		justify-content: center;
	}
	button {
		margin: 0 20px;
	}
`;

interface AddCellProps {
	prevCellId: string | null;
	isLast?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, isLast }) => {
	const { insertCellAfter } = useActions();
	return (
		<Div isLast={isLast}>
			<div className="abb-buttons">
				<button
					className="button is-rounded is-primary is-small"
					onClick={() => insertCellAfter(prevCellId, 'code')}
				>
					<span className="icon is-small">
						<i className="fas fa-plus" />
					</span>
					<span>Code</span>
				</button>
				<button
					className="button is-rounded is-primary is-small"
					onClick={() => insertCellAfter(prevCellId, 'text')}
				>
					<span className="icon is-small">
						<i className="fas fa-plus" />
					</span>
					<span>Text</span>
				</button>
			</div>
			<div className="divider" />
		</Div>
	);
};

export default AddCell;
