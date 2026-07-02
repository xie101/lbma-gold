import { Outlet } from 'react-router-dom';

export default function InnerLayout() {
  return (
    <div className="wrapper">
      <Outlet />
    </div>
  );
}
