import Link from 'next/link'
import LogoutBtn from './logoutBtn';
import { createClient } from '@//lib/supabase/server';
import ActiveMenu from './activeMenu';
import { useSidebarStore } from '@//stores/sidebarStore';

async function Sidebar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (

    <div className="md:flex md:w-64 md:flex-col h-screen w-screen">
      <div className="w-2/3 h-full md:w-full flex flex-col gap-3 grow p-5 overflow-y-auto bg-white shadow-lg
      ">
        <p className='text-3xl font-bold my-3'>nexStore</p>

        <div className="flex flex-col w-full p-3 mb-3 font-medium bg-black/10 text-gray-900 transition-all duration-200 rounded-lg">
          <p className='font-semibold'>{user?.user_metadata.name}</p>
          <p className='text-xs opacity-70'>{user?.email}</p>
        </div>

        <hr className="border-black" />

        <nav className={`flex flex-col gap-2 py-2
        `}>
          {/* <Link href={"/dashboard"} className='flex'>
            <ActiveMenu href='/dashboard'>
              <svg className="shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </ActiveMenu>
          </Link> */}
          <Link href={"/product"} className='flex'>
            <ActiveMenu href='/product'>
              <svg className="shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Products
            </ActiveMenu>
          </Link>
          <Link href={"/categories"} className='flex'>
            <ActiveMenu href='/categories'>
              <svg className="shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Categories
            </ActiveMenu>
          </Link>
          <Link href={"/movements"} className='flex'>
            <ActiveMenu href='/movements'>
              <svg className="shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Movements
            </ActiveMenu>
          </Link>
        </nav>

        <hr className="border-black" />

        <LogoutBtn></LogoutBtn>
      </div>
    </div>
  )
}

export default Sidebar