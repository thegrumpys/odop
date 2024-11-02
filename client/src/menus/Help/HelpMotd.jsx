import { NavDropdown } from 'react-bootstrap';
import { logUsage } from '../../logUsage';

export default function HelpMotd() {
//  console.log('HelpMotd - Mounting...');

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
