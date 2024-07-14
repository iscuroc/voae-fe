
import { Outlet } from 'react-router-dom';
import Header_login from '../components/Header_login';
import Sidebar from '../components/Sidebar';

export default function Layout_Login(){
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header_login />
      <main className="flex">
        <Sidebar />
        <div className='ml-0 md:ml-44 w-full'>
        <Outlet />

        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
