import { useTypedSelector } from './useTypedSelector';

export const useCumulativeCode = (cellId: string) => {
	return useTypedSelector((state: any) => {
		const { order, data } = state.cells;
		const orderedCells = order.map((id: string) => data[id]);

		const showFunc = `
        import _ReactDOM from 'react-dom';
        import _React from "react"

        const root = document.querySelector('#root');

        var show=(value)=>{
            if(typeof value === 'object'){

                if(value.$$typeof && value.props){
                    _ReactDOM.render(value, root);
                }
                else{
                    root.innerHTML = JSON.stringify(value);
                }
            }
            else{
                root.innerHTML=value;
            }
        }
        `;
		const showFuncNoop = 'var show=()=>{};';

		const cumulativeCode = [];

		for (let c of orderedCells) {
			if (c.type === 'code') {
				if (c.id === cellId) {
					cumulativeCode.push(showFunc);
				} else {
					cumulativeCode.push(showFuncNoop);
				}
				cumulativeCode.push(c.content);
			}
			if (c.id === cellId) {
				break;
			}
		}

		return cumulativeCode;
	}).join('\n');
};

export default useCumulativeCode;
