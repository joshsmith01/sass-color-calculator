# Sass Color Calculator


## Requirements

You'll need the following software installed to get started.

  - [Node.js](http://nodejs.org): Use the installer for your OS.
  - [Git](http://git-scm.com/downloads): Use the installer for your OS.
    - Windows users can also try [Git for Windows](http://git-for-windows.github.io/).
  - [Gulp](http://gulpjs.com/) and [Bower](http://bower.io): Run `npm install -g gulp bower`
    - Depending on how Node is configured on your machine, you may need to run `sudo npm install -g gulp bower` instead, if you get an error with the first command.

## Get Started

Clone this repository, where `app` is the name of your app.

If you prefer to work off of Bitbucket then use:
```bash
git clone https://joshsmith01@bitbucket.org/joshsmith01/sass-color-calculator.git sass-color-calculator
```

If you prefer to work off of GitHub then use:
```bash
git clone https://github.com/joshsmith01/sass-color-calculator.git sass-color-calculator
```


Change into the directory.

```bash
cd sass-color-calculator
```

Install the dependencies. If you're running Mac OS or Linux, you may need to run `sudo npm install` instead, depending on how your machine is configured.

```bash
npm install
bower install
```

While you're working on your project, run:

```bash
npm start
```

This will compile the Sass and assemble your Angular app. **Now go to `localhost:8080` in your browser to see it in action.** When you change any file in the `client` folder, the appropriate Gulp task will run to build new files.

To run the compiling process once, without watching any files, use the `build` command.

```bash
npm start build
```

## Contributing
### I'd love to see your love on GitHub!
#### Here are ways to get involved:

1. [Star](https://github.com/joshsmith01/sass-color-calculator/stargazers) the project!
2. Answer questions that come through [GitHub issues](https://github.com/joshsmith01/sass-color-calculator/issues)
3. Report a bug that you find
4. Share a theme you've built on top of Sass Color Calculator

#### Pull Requests

Pull requests are highly appreciated.

1. Solve a problem. Features are great, but even better is cleaning-up and fixing issues in the code that you discover
2. Make sure that your code is bug-free and does not introduce new bugs
3. Create a [pull request](https://help.github.com/articles/creating-a-pull-request)
