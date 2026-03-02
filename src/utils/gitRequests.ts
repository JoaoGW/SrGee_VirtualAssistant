import Cookies from 'js-cookie';

const token = Cookies.get("githubToken");

const query = `
  query {
    viewer {
      login

      # Total commits last year
      contributionsCollection {
        contributionCalendar {
          totalContributions
        }
      }

      # Total contributed repositories last year
      repositoriesContributedTo(contributionTypes: [COMMIT, PULL_REQUEST, ISSUE], first: 1) {
        totalCount
      }

      # Total pull requests created
      pullRequests(last: 12) {
        totalCount # Adicionado para obter o número total de pull requests
        nodes {
          title
          url
          repository {
            name
            url
          }
          createdAt
          merged
        }
      }

      # Total issues created
      issues {
        totalCount
      }

      # Total stars received on own repositories
      repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
        nodes {
          name
          stargazerCount
          url
        }
      }

      # Starred repositories
      starredRepositories(first: 12) {
        nodes {
          name
          owner {
            login
          }
          url
          description
          stargazerCount
        }
      }
    }
  }
`;

export async function fetchGitHubData() {
  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Request Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL Errors:", data.errors);
      return;
    }

    // Extract total stars
    const repositories = data.data.viewer.repositories.nodes;
    const totalStars = repositories.reduce(
      (acc: number, repo: { stargazerCount: number }) => acc + repo.stargazerCount,
      0
    );

    const totalCommits = data.data.viewer.contributionsCollection.contributionCalendar.totalContributions;

    // Extract latest pull requests
    const latestPullRequests = data.data.viewer.pullRequests.nodes.map(
      (pr: { title: string; url: string; repository: { name: string; url: string }; createdAt: string; merged: boolean }) => ({
        title: pr.title,
        url: pr.url,
        repositoryName: pr.repository.name,
        repositoryUrl: pr.repository.url,
        createdAt: pr.createdAt,
        merged: pr.merged,
      })
    );

    // Extract starred repositories
    const starredRepositories = data.data.viewer.starredRepositories.nodes.map(
      (repo: { name: string; owner: { login: string }; url: string; description: string; stargazerCount: number }) => ({
        name: repo.name,
        owner: repo.owner.login,
        url: repo.url,
        description: repo.description,
        stargazerCount: repo.stargazerCount,
      })
    );

    return {
      ...data,
      totalStars,
      totalCommits,
      latestPullRequests,
      starredRepositories,
    };
  } catch (error) {
    throw new Error(`Error fetching GitHub data: ${error}`);
  }
}