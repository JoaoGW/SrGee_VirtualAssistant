'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Octokit } from 'octokit';
import Cookies from "js-cookie";

import CountUp from 'react-countup';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

import { Crown, PenLine, CircleFadingArrowUp, RefreshCcw, FolderGit, GitPullRequest, Star, ArrowRight, CircleX } from 'lucide-react';

import { auth } from '@utils/Firebase/firebase';
import { fetchGitHubData } from '@utils/Scripts/gitRequests';

import { PatternAuthPages } from '@components/PatternAuthPages/PatternAuthPages';
import { OnlineBadge } from '@components/Badges/OnlineBadge';
import { RotateLoadingSpinner } from '@components/LoadingSpinners/Loading';
import { ButtonWithStartIcon } from '@components/Buttons/ButtonWithStartIcon';
import { SliderFilter } from '@components/SliderFilter/SliderFilter';
import { ActivityCard } from '@components/ActivityCard/ActivityCard';

import DefaultProfile from '@assets/Logo/WB_description.png';

Chart.register(ArcElement, Tooltip, Legend);

export function DashboardClient() {
  const [user, setUser] = useState<any>(null);
  const [userStats, setUserStats] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [userData, setUserData] = useState<any>(null);
  const [repositories, setRepositories] = useState<any[]>([]);

  // Chart.js v2 data
  const data = {
    labels: ['TypeScript', 'HTML', 'CSS', 'JavaScript', 'Java'],
    datasets: [
      {
        data: [47.32, 24.31, 12.31, 10.18, 5.87],
        backgroundColor: ['#007ACC', '#E34C26', '#264DE4', '#F7DF1E', '#B07219'],
        hoverBackgroundColor: ['#005A9C', '#C4411C', '#1E3A8A', '#EAD41C', '#8A4C1A'],
      },
    ],
  };

  // Chart.js v2 options
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // Taking current user information from logged in user via Firebase 
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
        if (error instanceof Error) {
          setErrorMsg(error.message);
        } else {
          setErrorMsg(String(error));
        }
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await fetchGitHubData();
        setUserStats(stats);
      } catch (error) {
        console.error("Erro ao buscar estatísticas do usuário:", error);
        setErrorMsg("Erro ao buscar estatísticas do GitHub.");
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (userStats && Object.keys(userStats).length > 0) {
      console.log("User stats stored:", userStats);
    }
  }, [userStats]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Fetching repositories data from GitHub API
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      // Se os dados do usuário já estão no localStorage, atualize o estado
      setUserData(JSON.parse(storedUser));
    } else {
      // Caso contrário, busque os dados do usuário
      const fetchGitHubUser = async () => {
        try {
          setIsLoadingData(true);
          const token = Cookies.get("githubToken");

          if (!token) {
            setErrorMsg("Token não encontrado. Faça login novamente.");
            return;
          }

          const octokit = new Octokit({
            auth: token,
          });

          const response = await octokit.request("GET /user", {
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          });

          setUserData(response.data); // Atualiza o estado do usuário
          localStorage.setItem("user", JSON.stringify(response.data)); // Salva no localStorage
          console.log("User data:", response.data);
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
          setErrorMsg("Erro ao buscar informações do GitHub.");
        } finally {
          setIsLoadingData(false);
        }
      };

      fetchGitHubUser();
    }
  }, []);

  if(isLoading){
    return (
      <section className="flex flex-col items-center justify-center h-screen">
        <RotateLoadingSpinner />
        <p className="mt-10">Estamos carregando suas informações...</p>
      </section>
    );
  }

  if (isLoadingData) {
    return (
      <section className="flex flex-col items-center justify-center h-screen">
        <RotateLoadingSpinner />
        <p className="mt-10">Carregando informações do seu usuário...</p>
      </section>
    );
  }

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
                <h3 className="text-xl flex flex-row">
                  Developing from:{" "}
                  <span className="ml-2">
                    { userData?.location ? userData.location : "Localização não fornecida" }
                  </span>
                </h3>
              <h4 className="text-xl flex flex-row">
                Current Plan:{" "}
                { userData?.plan?.name !== "free" ? (
                  <Crown style={{ marginLeft: 15, marginRight: 7 }} />
                ) : (
                  ""
                )}
                <span className="uppercase ml-2">{ userData?.plan?.name || "N/A" }</span>
              </h4>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <ButtonWithStartIcon
              icon={PenLine}
              text="Edit Profile"
              isLogin={false}
              style={{ width: '100%', backgroundColor: '#3b82f6', color: '#fff' }}
            />
            <ButtonWithStartIcon
              icon={CircleFadingArrowUp}
              text="Upgrade Plan"
              isLogin={false}
              style={{ width: '100%', backgroundColor: '#f59e42', color: '#fff' }}
            />
            <ButtonWithStartIcon
              icon={RefreshCcw}
              text="Refresh Statistics"
              isLogin={false}
              style={{ width: '100%', backgroundColor: '#10b981', color: '#fff' }}
            />
            <div className="mt-5">
              <SliderFilter isLoading={isLoading} user={user} setUser={setUser} />
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-3 mt-10 w-full justify-between">
          <section className="flex-1 min-w-[170px] max-w-[220px] flex flex-col items-center bg-gray-600 p-5 rounded-lg">
            <p>Total Commits</p>
            <CountUp end={ userStats.totalCommits } duration={6} style={{ fontWeight: 'bold', fontSize: '1.875rem', marginTop: 8 }} />
          </section>
          <section className="flex-1 min-w-[170px] max-w-[220px] flex flex-col items-center bg-gray-600 p-5 rounded-lg">
            <p>Total Stars</p>
            <CountUp end={ userStats.totalStars } duration={6} style={{ fontWeight: 'bold', fontSize: '1.875rem', marginTop: 8 }} />
          </section>
          <section className="flex-1 min-w-[170px] max-w-[220px] flex flex-col items-center bg-gray-600 p-5 rounded-lg">
            <p>Total Pull Requests</p>
            <CountUp end={ userStats?.data?.viewer?.pullRequests.totalCount || 0 } duration={6} style={{ fontWeight: 'bold', fontSize: '1.875rem', marginTop: 8 }} />
          </section>
          <section className="flex-1 min-w-[170px] max-w-[220px] flex flex-col items-center bg-gray-600 p-5 rounded-lg">
            <p>Total Issues</p>
            <CountUp end={ userStats?.data?.viewer?.issues.totalCount || 0 } duration={6} style={{ fontWeight: 'bold', fontSize: '1.875rem', marginTop: 8 }} />
          </section>
          <section className="flex-1 min-w-[170px] max-w-[220px] flex flex-col items-center bg-gray-600 p-5 rounded-lg">
            <p>Contributions</p>
            <CountUp end={ userStats?.data?.viewer?.repositoriesContributedTo.totalCount || 0 } duration={6} style={{ fontWeight: 'bold', fontSize: '1.875rem', marginTop: 8 }} />
          </section>
          <section className="flex-1 min-w-[170px] max-w-[220px] flex flex-col items-center bg-gray-600 p-5 rounded-lg">
            <p>Repositories Owned</p>
            <CountUp end={ userData.public_repos + userData.owned_private_repos } duration={6} style={{ fontWeight: 'bold', fontSize: '1.875rem', marginTop: 8 }} />
          </section>
          <section className="flex-1 min-w-[170px] max-w-[220px] flex flex-col items-center bg-gray-600 p-5 rounded-lg">
            <p>Followers</p>
            <CountUp end={ userData?.followers } duration={6} style={{ fontWeight: 'bold', fontSize: '1.875rem', marginTop: 8 }} />
          </section>
        </div>
        <div className="flex flex-row mt-5 gap-5">
          <section className="w-[25%] h-90 bg-gray-600 p-5 rounded-lg">
            <div className='flex flex-row items-center justify-between'>
              <h4 className="text-xl">Last Repositories</h4>
                <Link href='/repositories'>
                <span
                  style={{
                  background: '#e2e2e2',
                  borderRadius: '50%',
                  padding: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  }}
                >
                  <ArrowRight className="text-gray-800" size={20} />
                </span>
                </Link>
            </div>
            <div className="flex flex-col gap-1.5 mt-5">
              { repositories.length === 0 ? (
                <div className="flex flex-col justify-center items-center mt-20">
                  <CircleX color='white' size={40} />
                  <span className="text-white mt-2">Oh No! No repositories were found</span>
                </div>
              ) : (
                repositories.map((repositoriesData) => (
                  <ActivityCard key={repositoriesData.id} icon={FolderGit} description={repositoriesData.name} />
                ))
              )}
            </div>
          </section>
          <section className="w-[25%] bg-gray-600 p-5 rounded-lg flex flex-col">
            <h4 className="text-xl mb-4">Languages Statistics</h4>
            <div className="flex flex-row items-center gap-3">
              <div style={{ height: '275px', width: '60%' }}>
                <Doughnut data={data} options={options} style={{ marginTop: 25 }}/>
              </div>
              <div className="flex flex-col gap-2 w-[40%]">
                { data.labels.map((label, idx) => (
                  <div key={label} className="flex items-center gap-2">
                    <span
                      style={{
                        display: 'inline-block',
                        width: 16,
                        height: 16,
                        borderRadius: 4,
                        backgroundColor: data.datasets[0].backgroundColor[idx],
                      }}
                    />
                    <span className="text-white text-sm">{label}</span>
                    <span className="ml-auto text-gray-300 text-xs font-semibold">
                      {data.datasets[0].data[idx]}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="w-[25%] bg-gray-600 p-5 rounded-lg">
            <div className='flex flex-row items-center justify-between'>
              <h4 className="text-xl">Last Pull Requests</h4>
              <Link href='/pull-requests'>
                <span
                  style={{
                  background: '#e2e2e2',
                  borderRadius: '50%',
                  padding: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  }}
                >
                  <ArrowRight className="text-gray-800" size={20} />
                </span>
              </Link>
            </div>
            <div className="flex flex-col gap-1.5 mt-5">
              <ActivityCard icon={GitPullRequest} description="Pull Request test" />
              <ActivityCard icon={GitPullRequest} description="Pull Request test" />
              <ActivityCard icon={GitPullRequest} description="Pull Request test" />
              <ActivityCard icon={GitPullRequest} description="Pull Request test" />
              <ActivityCard icon={GitPullRequest} description="Pull Request test" />
              <ActivityCard icon={GitPullRequest} description="Pull Request test" />
            </div>
          </section>
          <section className="w-[25%] bg-gray-600 p-5 rounded-lg">
            <div className='flex flex-row items-center justify-between'>
              <h4 className="text-xl">Stared Repositories</h4>
              <Link href='/stared'>
                <span
                  style={{
                  background: '#e2e2e2',
                  borderRadius: '50%',
                  padding: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  }}
                >
                  <ArrowRight className="text-gray-800" size={20} />
                </span>
              </Link>
            </div>
            <div className="flex flex-col gap-1.5 mt-5">
              <ActivityCard icon={Star} description="Stared Repository test" />
              <ActivityCard icon={Star} description="Stared Repository test" />
              <ActivityCard icon={Star} description="Stared Repository test" />
              <ActivityCard icon={Star} description="Stared Repository test" />
              <ActivityCard icon={Star} description="Stared Repository test" />
              <ActivityCard icon={Star} description="Stared Repository test" />
            </div>
          </section>
        </div>
      </PatternAuthPages>
    );
  } else {
    return (
      <section className="flex flex-col items-center justify-center h-screen">
        <RotateLoadingSpinner />
        <p className="mt-10">Carregando uma experiência única para você...</p>
      </section>
    );
  }
}