import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

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
        <br />
    </>
  );
}

export default TopNav;