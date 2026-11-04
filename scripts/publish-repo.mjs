import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.GITHUB || process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const targetUsername = 'nexuss0781';
const targetEmail = 'nexuss0781@gmail.com';
const repoName = 'ScholarET-UI';

async function run() {
  console.log('=== Checking Environment for GITHUB Token ===');
  if (!token) {
    console.error('ERROR: No GITHUB token found in process.env (GITHUB, GITHUB_TOKEN, or GH_TOKEN).');
    process.exit(1);
  }

  const cleanToken = token.trim();
  console.log(`✓ GITHUB token loaded (Length: ${cleanToken.length})`);

  // 1. Authenticate with GitHub API
  console.log('\n=== Verifying GitHub Authentication ===');
  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      'Authorization': `token ${cleanToken}`,
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'ScholarET-UI-Deployer',
    },
  });

  if (!userRes.ok) {
    const errorBody = await userRes.text();
    console.error(`Authentication failed (${userRes.status}):`, errorBody);
    process.exit(1);
  }

  const userData = await userRes.json();
  const authUsername = userData.login;
  console.log(`✓ Authenticated as: ${authUsername} (${userData.name || 'Scholar'})`);

  const owner = authUsername || targetUsername;

  // 2. Check if repository 'ScholarET-UI' exists or create it
  console.log(`\n=== Creating / Verifying Public Repository: ${owner}/${repoName} ===`);
  const checkRepoRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}`, {
    headers: {
      'Authorization': `token ${cleanToken}`,
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'ScholarET-UI-Deployer',
    },
  });

  let repoData;
  if (checkRepoRes.ok) {
    repoData = await checkRepoRes.json();
    console.log(`✓ Repository https://github.com/${owner}/${repoName} already exists.`);
  } else if (checkRepoRes.status === 404) {
    console.log(`Creating public repository ${owner}/${repoName}...`);
    const createRes = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: {
        'Authorization': `token ${cleanToken}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'ScholarET-UI-Deployer',
      },
      body: JSON.stringify({
        name: repoName,
        description: 'ScholarET - Grade 12 Textbook Gamified Learning Platform (Duolingo-style UI for STEM curriculum with procedural vector mascot Archie)',
        private: false,
        has_issues: true,
        has_projects: true,
        has_wiki: false,
      }),
    });

    if (!createRes.ok) {
      const err = await createRes.text();
      console.error(`Failed to create repository (${createRes.status}):`, err);
      process.exit(1);
    }

    repoData = await createRes.json();
    console.log(`✓ Created public repository: ${repoData.html_url}`);
  } else {
    const err = await checkRepoRes.text();
    console.error(`Error checking repository (${checkRepoRes.status}):`, err);
    process.exit(1);
  }

  // 3. Local Git initialization & commit
  console.log('\n=== Preparing Git Commit & Pushing to GitHub ===');
  try {
    // Initialize repo if not already
    try {
      execSync('git rev-parse --is-inside-work-tree', { stdio: 'pipe' });
    } catch {
      execSync('git init -b main');
    }

    // Configure git user
    execSync(`git config user.name "${targetUsername}"`);
    execSync(`git config user.email "${targetEmail}"`);

    // Stage and commit
    execSync('git add -A');
    try {
      execSync('git commit -m "feat: initial release of ScholarET-UI (Grade 12 Textbook Gamified Learning Platform)"');
    } catch (e) {
      console.log('No new changes to commit or already committed.');
    }

    // Add / Update remote with authenticated URL
    const remoteUrl = `https://${cleanToken}@github.com/${owner}/${repoName}.git`;
    try {
      execSync('git remote remove origin', { stdio: 'pipe' });
    } catch {}

    execSync(`git remote add origin ${remoteUrl}`);
    execSync('git branch -M main');

    // Push to GitHub
    console.log(`Pushing code to ${repoData.html_url}...`);
    execSync('git push -u origin main --force', { stdio: 'inherit' });

    console.log('\n🎉 SUCCESS: ScholarET-UI repository is published and live!');
    console.log(`Public URL: ${repoData.html_url}`);
  } catch (err) {
    console.error('Error during git operation:', err.message);
    process.exit(1);
  }
}

run();
