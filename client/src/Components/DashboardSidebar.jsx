import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutSuccess } from '../redux/user/userSlice';
import {
  HiArrowSmRight, HiBookOpen, HiOutlineUserGroup, HiUser, HiAnnotation, HiChartPie
} from 'react-icons/hi';

const DashboardSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

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
      <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {currentUser && currentUser.isAdmin && (
              <Link to="/dashboard?tab=dashboard">
                <Sidebar.Item
                  active={tab === 'dashboard' || !tab}
                  icon={HiChartPie}
                  as="div"
                >
                  Dashboard
                </Sidebar.Item>
              </Link>
            )}
            <Link to="/dashboard?tab=profile">
              <Sidebar.Item
                active={tab === 'profile'}
                icon={HiUser}
                label={currentUser.isAdmin ? 'Admin' : 'User'}
                labelColor="dark"
                as="div"
              >
                Profile
              </Sidebar.Item>
            </Link>

            {currentUser.isAdmin && (
              <Link to="/dashboard?tab=stories">
                <Sidebar.Item active={tab === 'stories'} icon={HiBookOpen} as="div">
                  Stories
                </Sidebar.Item>
              </Link>
            )}

            {currentUser.isAdmin && (
              <>
                <Link to="/dashboard?tab=users">
                  <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup} as="div">
                    Users
                  </Sidebar.Item>
                </Link>
                <Link to="/dashboard?tab=comments">
                  <Sidebar.Item active={tab === 'comments'} icon={HiAnnotation} as="div">
                    Comments
                  </Sidebar.Item>
                </Link>
              </>
            )}

            <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut}>
              SignOut
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default DashboardSidebar;
