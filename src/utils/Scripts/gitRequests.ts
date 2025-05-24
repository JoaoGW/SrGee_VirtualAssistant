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
      pullRequests {
        totalCount
      }

      # Total issues created
      issues {
        totalCount
      }

      # Total stars received on own repositories
      repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
        nodes {
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

    return {
      ...data,
      totalStars,
      totalCommits,
    };
  } catch (error) {
    throw new Error(`Error fetching GitHub data: ${error}`);
  }
}