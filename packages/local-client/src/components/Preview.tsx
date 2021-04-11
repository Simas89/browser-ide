import { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Div = styled.div`
	position: relative;
	height: 100%;
	flex-grow: 1;
	/* overflow: hidden; */

	iframe {
		height: 100%;
		/* background-color: white; */
		width: 100%;
	}

	.react-draggable-transparent-selection {
		margin-bottom: 100vh !important;
	}
	.react-draggable-transparent-selection &:after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.previw-error {
		position: absolute;
		top: 10px;
		left: 10px;
		color: red;
	}
`;

interface PreviewProps {
	code: string;
	error: string;
}

const html = `
    <html>
      <head>
        <style>html { background-color: white; }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          };

          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });

          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
	const iframe = useRef<any>();

	useEffect(() => {
		iframe.current.srcdoc = html;
		setTimeout(() => {
			iframe.current.contentWindow.postMessage(code, '*');
		}, 50);
	}, [code]);

	return (
		<Div>
			<iframe
				title="preview"
				ref={iframe}
				sandbox="allow-scripts"
				srcDoc={html}
			/>
			{error && <div className="previw-error">{error}</div>}
		</Div>
	);
};

export default Preview;
