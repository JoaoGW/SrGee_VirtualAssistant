import { cookies } from 'next/headers';

import { getCookie } from '../cookies/cookiesConfig';

import { SideBar } from '@components/SideBar/SideBar';
import { ForbiddenAcessPageStructure } from '@components/Forbidden/Forbidden';

export default async function Dashboard() {
  // Obtenha o token dos cookies
  const cookieStorage = cookies();
  const token = await getCookie({
    cookieStorage,
    cookieCategory: 'authToken',
  });

  return (
    <>
      {
        token
          ?
          <div>
            <SideBar />
          </div>
          : <ForbiddenAcessPageStructure />
      }
    </>
  );
}