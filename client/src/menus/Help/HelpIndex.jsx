import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavDropdown } from 'react-bootstrap';
import { logUsage } from '../../logUsage';

export default function HelpIndex() {
//  console.log('HelpIndex - Mounting...');

  const onHelp = () => {
    logUsage('event', 'HelpIndex', { event_label: '/docs/Help' });
    window.open('/docs/Help', '_blank');
  }

  return (
    <>
      <NavDropdown.Item onClick={onHelp}>
        Index
      </NavDropdown.Item>
    </>
  );
}
