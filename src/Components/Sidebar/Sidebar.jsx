import Button from 'react-bootstrap/Button'

function Sidebar() {
  return (
    <aside className="sidebar d-flex flex-column">
        <Button className="mb-3" href="/treatment">Treatment</Button>
        <Button href="/patient">Patient</Button>
        <Button href="/appointment">Appointment</Button>
    </aside>
  )
}

export default Sidebar