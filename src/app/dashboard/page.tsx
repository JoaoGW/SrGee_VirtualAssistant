import { cookies } from 'next/headers';

import { getCookie } from '../cookies/cookiesConfig';

import { ForbiddenAcessPageStructure } from '@components/Forbidden/Forbidden';
import { DashboardClient } from '@components/ClientComponents/Dashboard/DashboardClient';

export default async function Dashboard() {
  // Obtendo o token dos cookies
  const cookieStorage = cookies();
  const token = await getCookie({
    cookieStorage,
    cookieCategory: 'authToken',
  });

  return (
    <>
      {
        token
          ? <DashboardClient />
          : <ForbiddenAcessPageStructure />
      }
    </>
  );
}