"use client"
import { DEFINE_ROUTE } from '@/constants/router';
import cookiesStore from '@/plugins/cookiesStore';
import isChildUrl from '@/utils/check-active-router';
import { AudioOutlined, LoginOutlined, PieChartOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function SideBar() {
  const pathname = usePathname();

  const menuItems = [
    {
      path: DEFINE_ROUTE.userManager,
      label: "User management",
      icon: <PieChartOutlined />,
    },
    {
      path: DEFINE_ROUTE.songManager,
      label: "Song management",
      icon: <AudioOutlined />
    },
  ];

  const handleLogOut = () => {
    window.location.href = DEFINE_ROUTE.home;
    cookiesStore.remove("token");
  };

  return (
    <div
      className="flex flex-col w-80 h-screen bg-black text-white"
    >
      <div
        className="flex items-center justify-center h-16"
      >
        <h1 className="text-2xl font-bold mt-3">Admin dashboard</h1>
      </div>
      <Divider className='text-white bg-white !my-1'/>
      <div className="flex flex-col mt-4 px-3">
        {menuItems.map((item) => {
          const isActive = isChildUrl(item.path, pathname);
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center py-3 px-4 rounded-lg transition-colors duration-300 hover:bg-gray-50 hover:text-black my-1 ${
                isActive ? "bg-white text-black" : "text-white"
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
        <div
          className="flex items-center py-3 px-4 rounded-lg text-white cursor-pointer transition-colors duration-300 hover:bg-gray-50 hover:text-black"
          onClick={handleLogOut}
        >
          <span className="mr-2">{<LoginOutlined />}</span>
          Logout
        </div>
      </div>
    </div>
);
}