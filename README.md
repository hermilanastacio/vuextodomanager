HOW TO DEPLOY VUE IN GH-PAGES

1. create a vue.config.js file in the root directory of your Vue project and copy the code below into it:

  module.exports = {
    publicPath: '/project name/'
  }

2.  For our deployment, we’ll use a Node.js script written by Roland Doda and based on the execa package to make it very easy for us to deploy. Create a Scripts folder in your app’s root folder, and inside it, create a gh-pages-deploy.js file. Paste the code block below inside:

  /* eslint-disable no-console */
  const execa = require("execa");
  const fs = require("fs");
  (async () => {
    try {
      await execa("git", ["checkout", "--orphan", "gh-pages"]);
      // eslint-disable-next-line no-console
      console.log("Building started...");
      await execa("npm", ["run", "build"]);
      // Understand if it's dist or build folder
      const folderName = fs.existsSync("dist") ? "dist" : "build";
      await execa("git", ["--work-tree", folderName, "add", "--all"]);
      await execa("git", ["--work-tree", folderName, "commit", "-m", "gh-pages"]);
      console.log("Pushing to gh-pages...");
      await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
      await execa("rm", ["-r", folderName]);
      await execa("git", ["checkout", "-f", "master"]);
      await execa("git", ["branch", "-D", "gh-pages"]);
      console.log("Successfully deployed, check your settings");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
      process.exit(1);
    }
  })();

3. Now open your package.json file and add the execa config to your dev dependencies, like so:

  "devDependencies": {
      "execa": "latest"
  }

4. Then, down in the scripts section, add this:

  "scripts": {
      "deploy": "node scripts/gh-pages-deploy.js"
  }

5. Now to install them and ensure they are up to date, run this command in your terminal:
  npm install

6. Now we are set to go. To deploy your Vue app with GitHub Pages, simply run this command below:
  npm run deploy


Your Vue app is live! Happy Hacking!! :)