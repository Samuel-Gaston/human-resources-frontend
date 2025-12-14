import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav.tsx';
const layout = () => {
  return (
    <div>
        <Nav />
        <Outlet />
    </div>
  )
}


export default layout;