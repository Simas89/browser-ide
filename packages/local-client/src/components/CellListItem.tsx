import React from 'react';
import styled, { css } from 'styled-components';
import { Cell } from '../state';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';
import ActionBar from './ActionBar';

interface DivProps {
	cellType: 'code' | 'text';
}

const Div = styled.div<DivProps>`
	position: relative;
	/* margin: 10px 10px; */

	${(p) =>
		p.cellType === 'code' &&
		css`
			padding-bottom: 10px;
		`}
`;

interface CellListItemProps {
	cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
	let child: JSX.Element;
	if (cell.type === 'code') {
		child = <CodeCell cell={cell} />;
	} else {
		child = <TextEditor cell={cell} />;
	}

	return (
		<Div cellType={cell.type}>
			<ActionBar cellType={cell.type} id={cell.id} />
			{child}
		</Div>
	);
};

export default CellListItem;
