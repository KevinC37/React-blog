import React from "react";
import ReactDOM from 'react-dom';

export function removePortal() {
  try{
    document.body.removeChild(document.getElementsByClassName('root-portal')[0]);
  } catch(e) {
    console.log(e);
  }
 
}



export const Portal = ({ children, className = 'root-portal', el = 'div' }) => {
  const [container] = React.useState(() => {
    return document.createElement(el);
  });

  React.useEffect(() => {
    container.classList.add(className);
    document.body.appendChild(container);

    return () => {
      container.remove();
    }

  }, [className, container])

  return ReactDOM.createPortal(children, container);
}
