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

	.react-draggable-transparent-selection &:after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
`;

interface PreviewProps {
	code: string;
}

const html = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Document</title>
    </head>
    <body style="background-color: white">
        <div id='root' />
        <script>

            window.addEventListener('message', (event)=>{

                try {
                    eval(event.data);
                } catch (error) {
                    const root = document.querySelector('#root');
                    root.innerHTML = '<div style="color: red; "><h4>Runtime Error</h4>' + error + '</div>';
                    console.error('Err: ',error);
                }
                
                
            }, false)

        </script>
    </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
	const iframe = useRef<any>();

	useEffect(() => {
		iframe.current.srcdoc = html;
		setTimeout(() => {
			iframe.current.contentWindow.postMessage(code, '*');
		}, 1000);
	}, [code]);

	return (
		<Div>
			<iframe
				title="preview"
				ref={iframe}
				sandbox="allow-scripts"
				srcDoc={html}
			/>
		</Div>
	);
};

export default Preview;
