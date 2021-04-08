import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { Provider } from 'react-redux';
import { store } from './state';
// import CodeCell from './components/CodeCell';
import TextEditor from './components/TextEditor';

const App = () => {
	return (
		<Provider store={store}>
			<div>
				{/* <CodeCell /> */}
				{/* <CodeCell /> */}
				<TextEditor />
			</div>
		</Provider>
	);
};

export default App;
