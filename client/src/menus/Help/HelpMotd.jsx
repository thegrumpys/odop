import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavDropdown } from 'react-bootstrap';
import { logUsage } from '../../logUsage';

export default function HelpMotd() {
//  console.log('HelpMotd - Mounting...');

  useEffect(() => {
//    console.log('HelpMotd - Mounted');
//    return () => console.log('HelpMotd - Unmounting ...');
    return () => { };
  }, []);

  const onHelp = () => {
    logUsage('event', 'HelpMotd', { event_label: 'https://thegrumpys.github.io/odop/About/messageOfTheDay.html' });
    window.open('https://thegrumpys.github.io/odop/About/messageOfTheDay.html', '_blank');
  }

  return (
    <>
      <NavDropdown.Item onClick={onHelp}>
        Message of the Day
      </NavDropdown.Item>
    </>
  );
}
