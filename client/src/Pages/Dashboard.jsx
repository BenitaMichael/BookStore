import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardSidebar from '../Components/DashboardSidebar';
import DashboardProfile from '../Components/DashboardProfile';
import DashboardStories from '../Components/DashboardStories';

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlFromTab = urlParams.get('tab')
    if (urlFromTab){
      setTab(urlFromTab);
    }
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        <DashboardSidebar/>
      </div>

      <div className='md:w-full'>
        {tab === 'profile' && <DashboardProfile/>}
        {tab === 'stories' && <DashboardStories />}
      </div>
    </div>
  )
}

export default Dashboard
