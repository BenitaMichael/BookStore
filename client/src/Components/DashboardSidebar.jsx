import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'

import { HiArrowSmRight, HiUser } from 'react-icons/hi'

const DashboardSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlFromtab = urlParams.get('tab');
    if (urlFromtab) {
      setTab(urlFromtab);
    }
  }, [location.search]);
  return (
    <div>
      <Sidebar className='w-full md:w-56 min-h-screen'>
        <SidebarItems>
            <SidebarItemGroup>
              <Link to = '/dashboard?tab=profile'>
                <SidebarItem active={tab ==='profile'}
                  icon={HiUser}
                  label= 'User'
                  labelColor='dark'>
                    Profile
                </SidebarItem>
              </Link>

                <SidebarItem icon={HiArrowSmRight} className='cursor-pointer'>
                    SignOut
                </SidebarItem>
            </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  )
}

export default DashboardSidebar
