'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import CountUp from 'react-countup';

import { auth } from '@utils/Firebase/firebase';

import { PatternAuthPages } from '@components/PatternAuthPages/PatternAuthPages';
import { OnlineBadge } from '@components/Badges/OnlineBadge';
import { RotateLoadingSpinner } from '@components/LoadingSpinners/Loading';
import { ButtonWithStartIcon } from '@components/Buttons/ButtonWithStartIcon';

import DefaultProfile from '@assets/Logo/WB_description.png'

import { Crown, PenLine, CircleFadingArrowUp, RefreshCcw } from 'lucide-react';
import { SliderFilter } from '@components/SliderFilter/SliderFilter';

export function DashboardClient() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    const getCurrentUser = () => {
      try {
        setIsLoading(true);

        const currentUser = auth.currentUser;
        if (currentUser) {
          setUser(currentUser);
        } else {
          setErrorMsg('Ocorreu um problema ao obter informações do seu usuário');
        }
      } catch (error) {
        setErrorMsg(error as string);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }

    getCurrentUser();
  }, []);

  if (user) {
    return (
      <PatternAuthPages isLoading={isLoading}>
        <div className="flex flex-row justify-between items-start w-full">
          <div className="flex flex-row">
            <Image
              className="rounded-full border-2 border-white"
              src={user?.photoURL || DefaultProfile}
              alt="User GitHub Avatar"
              width={175}
              height={175}
            />
            <div className="ml-5">
              <OnlineBadge />
              <h1 className="text-3xl font-bold">Welcome Back, {user?.displayName}</h1>
              <h2 className="text-xl">Account: {user?.email}</h2>
              <h3 className="text-xl mt-7 flex flex-row">
                Current Plan: <Crown style={{ marginLeft: 15, marginRight: 7 }} /> NOT IMPLEMENTED
              </h3>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <ButtonWithStartIcon
              icon={PenLine}
              text="Edit Profile"
              isLogin={false}
              style={{ width: '125%', backgroundColor: '#3b82f6', color: '#fff' }}
            />
            <ButtonWithStartIcon
              icon={CircleFadingArrowUp}
              text="Upgrade Plan"
              isLogin={false}
              style={{ width: '125%', backgroundColor: '#f59e42', color: '#fff' }}
            />
            <ButtonWithStartIcon
              icon={RefreshCcw}
              text="Refresh Statistics"
              isLogin={false}
              style={{ width: '125%', backgroundColor: '#10b981', color: '#fff' }}
            />
            <div className="mt-5">
              <SliderFilter isLoading={isLoading} user={user} setUser={setUser} />
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-3 mt-10 w-full justify-between">
          <section className="flex-1 min-w-[170px] max-w-[220px] flex flex-col items-center bg-gray-600 p-5 rounded-lg">
            <p>Total Commits</p>
            <CountUp end={999} duration={10} style={{ fontWeight: 'bold', fontSize: '1.875rem', marginTop: 8 }} />
          </section>
          <section className="flex-1 min-w-[170px] max-w-[220px] flex flex-col items-center bg-gray-600 p-5 rounded-lg">
            <p>Total Stars</p>
            <CountUp end={999} duration={10} style={{ fontWeight: 'bold', fontSize: '1.875rem', marginTop: 8 }} />
          </section>
          <section className="flex-1 min-w-[170px] max-w-[220px] flex flex-col items-center bg-gray-600 p-5 rounded-lg">
            <p>Total Pull Requests</p>
            <CountUp end={999} duration={10} style={{ fontWeight: 'bold', fontSize: '1.875rem', marginTop: 8 }} />
          </section>
          <section className="flex-1 min-w-[170px] max-w-[220px] flex flex-col items-center bg-gray-600 p-5 rounded-lg">
            <p>Total Issues</p>
            <CountUp end={999} duration={10} style={{ fontWeight: 'bold', fontSize: '1.875rem', marginTop: 8 }} />
          </section>
          <section className="flex-1 min-w-[170px] max-w-[220px] flex flex-col items-center bg-gray-600 p-5 rounded-lg">
            <p>Contributed to</p>
            <CountUp end={999} duration={10} style={{ fontWeight: 'bold', fontSize: '1.875rem', marginTop: 8 }} />
          </section>
          <section className="flex-1 min-w-[170px] max-w-[220px] flex flex-col items-center bg-gray-600 p-5 rounded-lg">
            <p>Repositories Owned</p>
            <CountUp end={999} duration={10} style={{ fontWeight: 'bold', fontSize: '1.875rem', marginTop: 8 }} />
          </section>
          <section className="flex-1 min-w-[170px] max-w-[220px] flex flex-col items-center bg-gray-600 p-5 rounded-lg">
            <p>Followers</p>
            <CountUp end={999} duration={10} style={{ fontWeight: 'bold', fontSize: '1.875rem', marginTop: 8 }} />
          </section>
        </div>
        <div className='flex flex-row mt-5 gap-5'>
          <section className='w-[25%] h-90 bg-gray-600 p-5 rounded-lg'>
            <h4 className='text-xl'>Last Repositories</h4>
          </section>
          <section className='w-[25%] bg-gray-600 p-5 rounded-lg'>
            <h4 className='text-xl'>Languages Statistics</h4>
          </section>
          <section className='w-[25%] bg-gray-600 p-5 rounded-lg'>
            <h4 className='text-xl'>Last Pull Requests</h4>
          </section>
          <section className='w-[25%] bg-gray-600 p-5 rounded-lg'>
            <h4 className='text-xl'>Stared Repositories</h4>
          </section>
        </div>
      </PatternAuthPages>
    );
  } else {
    return (
      <section className='flex flex-col items-center justify-center h-screen'>
        <RotateLoadingSpinner />
        <p className='mt-10'>Carregando uma experiência única para você...</p>
      </section>
    )
  }
}