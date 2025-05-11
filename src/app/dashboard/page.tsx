import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getCookie } from '../cookies/cookiesConfig';

export default async function Dashboard() {
  // Obtenha o token dos cookies
  const cookieStorage = cookies();
  const token = await getCookie({
    cookieStorage,
    cookieCategory: 'authToken',
  });

  return (
    <div>
      <h1>Bem-vindo ao Dashboard</h1>
    </div>
  );
}