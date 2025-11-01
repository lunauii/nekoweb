fetch('https://api.github.com/repos/lunauii/nekoweb/commits?per_page=2')
  .then(res => res.json())
  .then(res => {
    const commit1 = res[0].sha;
    const commit2 = res[1].sha;
    fetch(`https://api.github.com/repos/lunauii/nekoweb/compare/${commit2}...${commit1}`)
      .then(res => res.json())
      .then(diffRes => {
        let totalAdditions = 0;
        let totalDeletions = 0;

        diffRes.files.forEach(file => {
          totalAdditions += file.additions;
          totalDeletions += file.deletions;
        });

        const summary = `<span id="diff-add">+${totalAdditions}</span> <span id="diff-del">-${totalDeletions}</span>`;
        document.getElementById('git-diff').innerHTML = summary + '<small style="color:rgba(136, 122, 137, 0.7);"> lines changed</small>';
      });

    var commitSHA = res[0].sha;
    document.getElementById('commit').innerHTML = "<a href='https://github.com/lunauii/nekoweb/commit/" + commitSHA + "'>" + commitSHA.slice(0, 7) +  " <i class='fa-brands fa-github commit-icon'></i></a>";
    var commitDate = new Date(res[0].commit.author.date);
    document.getElementById('commit-date').innerHTML = commitDate.toLocaleDateString() + " " + commitDate.toLocaleTimeString();
    document.getElementById('commit-message').innerHTML = res[0].commit.message;

  })    