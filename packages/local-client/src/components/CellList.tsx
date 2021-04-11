import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { CellsState } from '../state/reducers/cellsReducer';
import CellListItem from './CellListItem';
import AddCell from './AddCell';

const Div = styled.div`
	margin: 0 25px 50vh;

	.react-draggable-transparent-selection {
		margin-bottom: 100vh;
	}
`;

const CellList: React.FC = () => {
	const state = useTypedSelector((state) => state.cells);
	const { order, data } = state as CellsState;

	const cells = order.map((id) => data[id]);

	const renderedCells = cells.map((cell) => (
		<Fragment key={cell.id}>
			<CellListItem cell={cell} />
			<AddCell prevCellId={cell.id} />
		</Fragment>
	));

	return (
		<Div>
			<AddCell prevCellId={null} isLast={cells.length === 0} />
			{renderedCells}
		</Div>
	);
};

export default CellList;
