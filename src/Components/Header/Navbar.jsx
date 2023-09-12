import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {Outlet} from 'react-router-dom';

function TopNav() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/patient">Dental Inn</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
          <Button variant="danger">Log out</Button>
        </Container>
      </Navbar>
      <Outlet /> 
      {/* yesma feri outlet xa ni ta | kei farak pardaina hai?
      outlet vaneko chai parent component ma rakhne raixa ani testo children lai route garna lai
      aba k garne?
       */}
       <br />
    </>
  );
}

export default TopNav;