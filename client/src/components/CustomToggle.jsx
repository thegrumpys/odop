import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

function CustomToggle({ children, eventKey, onClick, active, ...props }) {

  const decoratedOnClick = useAccordionButton(eventKey, () =>
    onClick()
  );

  return (
    <button
      {...props}
      type="button"
      className={`btn btn-outline-primary btn-sm ${active && 'active'}`}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

export default CustomToggle