export default async function handler(req, res) {
  const { repo } = req.query;
  const GITHUB_USERNAME = "Ziqian-Huang0607";
  const token = process.env.GH_TOKEN;
  const headers = { "Authorization": `token ${token}`, "User-Agent": "Vercel-Function" };

  try {
    if (repo) {
      const [readmeRes, licenseRes, detailRes] = await Promise.all([
        fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo}/readme`, { headers }),
        fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo}/license`, { headers }),
        fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo}`, { headers })
      ]);
      return res.status(200).json({
        readme: await readmeRes.json(),
        license: await licenseRes.json(),
        details: await detailRes.json()
      });
    }

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`, { headers })
    ]);

    return res.status(200).json({ user: await userRes.json(), repos: await reposRes.json() });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}