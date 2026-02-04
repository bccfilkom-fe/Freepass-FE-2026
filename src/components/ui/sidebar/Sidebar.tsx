import Link from 'next/link'
import LogoutBtn from './logoutBtn';
import { createClient } from '@//lib/supabase/server';
import ActiveMenu from './activeMenu';

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
          <Link href={"/dashboard"} className='flex'>
            <ActiveMenu href='/dashboard'>
              <svg className="shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
              </svg>

              Dashboard
            </ActiveMenu>
          </Link>
          <Link href={"/product"} className='flex'>
            <ActiveMenu href='/product'>
              <svg className="shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
              Products
            </ActiveMenu>
          </Link>
          <Link href={"/categories"} className='flex'>
            <ActiveMenu href='/categories'>
              <svg className="shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
              </svg>
              Categories
            </ActiveMenu>
          </Link>
          <Link href={"/movements"} className='flex'>
            <ActiveMenu href='/movements'>
              <svg className="shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
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