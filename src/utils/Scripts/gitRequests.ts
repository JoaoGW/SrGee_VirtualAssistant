import Cookies from 'js-cookie';

const token = Cookies.get("githubToken");

const query = `
  query {
    viewer {
      login
      name
      email
      location
      avatarUrl
      followers {
        totalCount
      }
      repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
        totalCount
        nodes {
          name
          stargazerCount
        }
      }
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
      pullRequests {
        totalCount
      }
      # Total issues created
      issues {
        totalCount
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

    // Extract repositories with name and stargazerCount
    const repositories = data.data.viewer.repositories.nodes.map(
      (repo: { name: string; stargazerCount: number }) => ({
        name: repo.name,
        stargazerCount: repo.stargazerCount,
      })
    );

    // Calculate total stars
    const totalStars = repositories.reduce(
      (acc: number, repo: { stargazerCount: number }) => acc + repo.stargazerCount,
      0
    );

    const totalCommits = data.data.viewer.contributionsCollection.contributionCalendar.totalContributions;

    // Extract additional user data
    const userData = {
      login: data.data.viewer.login,
      name: data.data.viewer.name,
      email: data.data.viewer.email,
      location: data.data.viewer.location,
      avatarUrl: data.data.viewer.avatarUrl,
      followers: data.data.viewer.followers.totalCount,
      totalRepositories: data.data.viewer.repositories.totalCount,
    };

    return {
      ...userData,
      totalStars,
      totalCommits,
      repositories,
    };
  } catch (error) {
    throw new Error(`Error fetching GitHub data: ${error}`);
  }
}