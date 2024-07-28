import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '../redux/user/userSlice';

import { HiArrowSmRight, HiUser } from 'react-icons/hi'

const DashboardSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlFromtab = urlParams.get('tab');
    if (urlFromtab) {
      setTab(urlFromtab);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Sidebar className='w-full md:w-56'>
        <SidebarItems>
            <SidebarItemGroup>
              <Link to = '/dashboard?tab=profile'>
                <SidebarItem active={tab ==='profile'}
                  icon={HiUser}
                  label= 'User'
                  labelColor='dark'
                  as='div'>
                    Profile
                </SidebarItem>
              </Link>

                <SidebarItem icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                    SignOut
                </SidebarItem>
            </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  )
}

export default DashboardSidebar
