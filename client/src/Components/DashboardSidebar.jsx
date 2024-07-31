import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux';
import { signOutSuccess } from '../redux/user/userSlice';

import { HiArrowSmRight, HiBookOpen, HiUser } from 'react-icons/hi'

const DashboardSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user)
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
            <SidebarItemGroup className='flex flex-col gap-2'>
              <Link to = '/dashboard?tab=profile'>
                <SidebarItem active={tab ==='profile'}
                  icon={HiUser}
                  label= {currentUser.isAdmin ? 'Admin' : 'User'}
                  labelColor='dark'
                  as='div'>
                    Profile
                </SidebarItem>
              </Link>

              {
                currentUser.isAdmin && (
                  <Link to = '/dashboard?tab=stories'>
                    <SidebarItem active={tab ==='stories'}
                        icon={HiBookOpen}
                        as='div'>
                          Stories
                    </SidebarItem>
                  </Link>
                )
              }
              

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
