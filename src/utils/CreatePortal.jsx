import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function Portal({
  children,
  className = 'root-portal',
  el = 'div',
}) {
  const [container] = React.useState(() => {
    return document.createElement(el);
  });

  useEffect(() => {
    container.classList.add(className);
    document.body.appendChild(container);

    return () => {
      container.remove();
    };
  }, [className, container]);

  return ReactDOM.createPortal(children, container);
}
