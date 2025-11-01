export async function getCommitData() {
  try {
    const commitsRes = await fetch('https://api.github.com/repos/lunauii/nekoweb/commits?per_page=2');
    const commits = await commitsRes.json();
    
    const commit1 = commits[0].sha;
    const commit2 = commits[1].sha;
    
    const diffRes = await fetch(`https://api.github.com/repos/lunauii/nekoweb/compare/${commit2}...${commit1}`);
    const diffData = await diffRes.json();
    
    const totalAdditions = diffData.files.reduce((sum, file) => sum + file.additions, 0);
    const totalDeletions = diffData.files.reduce((sum, file) => sum + file.deletions, 0);
    
    const commitDate = new Date(commits[0].commit.author.date);
    
    return {
      sha: commits[0].sha,
      additions: totalAdditions,
      deletions: totalDeletions,
      date: commitDate.toLocaleDateString() + " " + commitDate.toLocaleTimeString(),
      message: commits[0].commit.message
    };
  } catch (error) {
    console.error('Failed to fetch commit data:', error);
    return {
      sha: 'unknown',
      additions: 0,
      deletions: 0,
      date: 'unknown',
      message: 'Failed to load commit data'
    };
  }
}