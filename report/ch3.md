#Chapter 3
##Problem analysis
###3.1 Toolkit analysis

####3.1.1 Framework
The first thing we need to know after the language we will be using for our project is the framework that suits better our needs. On this section we will be doing a small review over the most interesting ones on the market and choose the best option for our game. But firstly we will establish a premise: It has to be free. As starting game developers we will try to save as much money on licenses as we can. So the following famous solutions will be automatically discarded.

#####Non free frameworks
**Construct 2**
The most popular framework according to *HTML5gameengines.com*. It has its own IDE, graphic level editor and it is extensible via plugin, also provides exportation to multiple platforms. It remembers to those types of frameworks that people who doesn't know how to program can use to make a videogame. Its prices go from 100 euros (personal license) to 330 euros (Business license) and a free license for education or other non profit projects.

**Impact**
Some years ago it seemed like a very popular solution with its level editor and cross-platform optimization but the fact that it is non free and that it hasn't been updated for almost a year have made the presence of this framework in the community almost inexistent.

#####free frameworks
The are multiple way you can catalog game development framework, we will use the rendering technology as graphics seem like the most basic and performance issue in our games. Even thought some people might think that the are types of games, like old text-based games, that don't need to worry about graphics you still need to render the text, and in some technologies is not as cheap, performance speaking, as people think. So we will review the three main technologies: DOM, Canvas and webGL.

#####DOM
The Document Object Model (DOM) is a programming interface for HTML, XML and SVG documents. It provides a structured representation of the document (a tree) and it defines a way that the structure can be accessed from programs so that they can change the document structure, style and content.[Document_Object_Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)\\

We can use this model to create and modify the state of our game. It's is a very crude way to do it and almost no one uses it but it has the advantage than it will work in virtually any browser and device as it is present and well implemented (presumably) in every one of them.

**CraftyJS**
This is the framework I use at work. it's the only one I've come across that allows DOM rendering (It also works with canvas). It uses the ECS (Entity Component System) model to program games, which is a very comfortable and extensible pattern.\\ 

With this pattern every instanced object you have in your game will be an entity. Entities can be formed mixing different components together. Giving you a way to reuse and structure your code.\\

With a very simple API it gives you almost all the functionalities needed to develop a 2D game. Particles are only allowed in canvas rendering mode and Physics are not implemented, only a Gravity component it's available which is not enough for most circumstances. As of this date (June 2015) my company is working on an open plugin for MatterJS, a 2D physics engine written from a scratch in javascript. You can also use a couple ports of Box2D but their repositories have been abandoned for 3 years.\\

The biggest downside of this framework, aside from not having webGL rendering is the slow updating rate it has. Since July 2014 to June 2015 it has gone from 0.6.1 to 0.6.3. and its community, even though active, is pretty small compared to other frameworks. 

#####Canvas
HTML5 Canvas is an immediate mode bitmaped area of the screen that can be manipulated with JavaScript. Immediate mode refers to the way the canvas renders pixels on the screen. HTML5 Canvas completely redraws the bitmapped screen on every frame by using Canvas API calls form JavaScript.[Canvas](https://books.google.es/books?hl=en&lr=&id=zLUyKvtdCQwC&oi=fnd&pg=PR2&dq=canvas+html5&ots=Hatm3UUT_l&sig=oZua7EsPS7qTxv5fGDmNQcXibjQ#v=onepage&q=canvas%20html5&f=false)


**stage.js**
Stage.js gives you a DOM-like tree data model to make your game. It abstracts all canvas dirty work (game loop and rendering). It also has physics via different plugins (MaterJS, p2.js, PhysicsJS, sat.js). It's a very simple framework to use, ideal for quick, simple games.

**EaselJS**
EaselJS is part of a suite library for HTML5 technologies know as CreateJS. Inside the library EaselJS take the role of simplifying canvas work. although it's not game specific solution, the fact that you can use the other libraries of the suite (all related to game programming: tweening, sound and preloading resources), and the flash-like interface. Attract some developers that come from other environments.

#####WebGl
WebGL (Web Graphics Library) is a JavaScript API for rendering interactive 3D computer graphics and 2D graphics within any compatible web browser without the use of plug-ins. Based on OpenGL ES 2.0 standard it runs in the majority of desktop and mobile browsers.[WebGl](https://en.wikipedia.org/wiki/WebGL)

**Kiwi.js**
Kiwi.js is a WebGL rendering based framework that uses the ECS model. It relies on a tight but still small community that make multiple plugins and game blueprints, which are whole games on github featuring a certain genre.

**Phaser**
Phaser is game engine based on PixiJS renderer which gives it WebGL support with canvas fallback. It has probably the biggest HTML5 game developing community as it's founder also founded the html5gamedevs forum.It offers a lot of examples, 3 different Physics libraries and some awesome plugins (Although we will not be using them, as the are paid plugins). Appart from tutorials, Phaser developers release minibooks explaining the insides of the framework trying to get people to knoww more the tool and make the most of it.

One of phaser community more interesting projet is Mighty editor. An online game editor that lets you code , edit your scene graphically and preview your game.


**Pandajs**

Another framework based on PixiJS renerer. Less known and smaller than Phaser, also includes a game editor called Bamboo. Its advantage is that it's more lightweight than Paser, who until recent versions has a monolithic structure.

**Babylon**
Babylon is a webGL based 3D games framework. It has an interesting performance on system with good hardware. Also Microsoft has made some demos to promote their new browser, Microsoft Edge, and they seem quite interesting.

one appealing feature for starters is that it allows you to play with the framework on a playground domain, being able to download the code once your finished.

#####Other

Some other frameworks may not be specifically made for HTML5 programming, but they produce games for the web.

**Cocos 2Djs**
This framework is the HTML5 version of the C++ ultra famous Cocos-2D. It allows you to program in javascript and ditribute a all kinds of plaform, web and native. This is achived through to important pieces: Cocos2d-html5 and Cocos2d-x JSB.

Cocos2d-html5 is a full HTML5 game engine, rendering on WebGL and Canvas. This allows games to run in browsers.

Cocos2d-x JSB serves as a middle layer between javascript and C++ Cocos2D-x code. With it you can communicate beetwen both, allowing to target native platforms from javascript code.

**Haxe**

Haxe is an open source toolkit used to build cross-platform tools. It includes a programming language, a cross-compiler and a  library. 

With this tools and the set of framework and libraries for gaming development built around haxe you can program once and deploy to multiple platforms. Including web platforms.
 
**Atomic**
Atomic is a new game engine in a very early stage that allows to program game with javascript as well as C++. It has a very promising editor and its 2D module is free to use. It also deploys to multiple platforms.

#####The big guys
With the growth of HTML5 as a game programming language every one wants to be on board. This is the case of the next two engines. With a lot of experience on their backs, their working hard to deliver their product on WebGL based renderers.
 
**Unity 3D**
The favorite engine of indie studios of the last years. It's easy to learn and pretty powerful. A scene polished graphic scene, animation and audio editor with support for C\# programming and a modified version of javascript.

With the popularity of Unity a really big community has formed around it, releasing lots of tutorials and learning material. A very good documentation and a spectacular asset store round up this product. Recently changing its license term have made viable for anyone to use all the power of this engine.

**Unreal Engine 4**
We could call this engine "Bid daddy". With its origin in the all-around the world known "Unreal Tournament" game from the studios epic games, it is one of the most famous engines, used to make from casual to 3A games. The last version of the engine uses C++ for its programming language and it's experimenting with WebGL rendering. It has a bigger learning curve than Unity but in exchange you get the power of a much deeper control of optimization, as it allows you to go down to assembly language if required.

#####Choosing the framework
With this little peak at all of this programs we can conclude one thing. There's no perfect option. Depending on the aim of the game. Target platform, technology or game style, your engine election will be diverse.

For our game we want a framework with regular javascript as its programming language, so that leaves out: Unity 3D, Unreal Engine and Haxe.

We will be doing a 2D game so Babylonjs is also out.

The rendering technology we are aming to is WebGl with canvas fallback: Craftyjs, stage.js and Easeljs are out.

The ones left are: Kiwi.js, Phaser, Pandajs and Cocos 2dJS. Cocos 2dJS is a very vast and powerful platform but we will rule it out for being to close to it's C++ version. Fearing the API will be more inclined to programming patterns more typical of that language.

Between the last 3, Phaser comes out as the winner for it's releasing cycle and the quick responding community the have.

####3.1.2 Development environment
After choosing a framework, we must choose our environment. Phaser doesn't have its own editor so we have three options: Use PhaserLE, MightyEditor or a text editor/IDE of our election.

**PhaserLE**: A proprietary solution that gives us a scene editor and a CooconJS facility to port our game to mobile apps. Discarded, as we said we will be using free tools.

**MightyEditor**: A promising online editor with a free mode that gives your projects a moth of free development before erasing the or upgrading your license to paid mode. It has an interesting animator tool but it requires some framework specific coding, getting a bit away from Phaser. Discarded.

**Using a text editor/IDE**: This will be the option we will take. You can use from the most complex IDE to the note pad. Here I will be making an exception to the rule of everything having to be free. I will use WebStorm.

WebStorm is an IDE from the jetBrains family, written in java offers a very good  UX. It has a very useful Control Version plugin and a built in terminal. For the license, we will register an account under the student program which will give us a year of free use for any program in the jetBrains family. 

As for the OS Antergos will do the thing. Antergos is a Spanish distribution based on Arch linux, easy to install and as powerful and updated as any Arch (as it's rolling-release). 

All the technologies we're going to use, require from node.js and the packet manager tool npm. So we need to install node before anything else:

```bash
sudo pacman -S nodejs
```

npm Should be installed along node, however, if that's not the case. Install it on its own:

```bash
sudo pacman -S npm
```

#####Yeoman

To help us start the project and avoid doing some repetitive and error prone task we will use the Yeoman tool. Yeoman first creates a basic project structure with vendor libraries included, using the so called "generators" (a term taken inspired by Ruby on Rails). This generators can provide from a simple HTML5 Boilerplate to a full mean stack configuration. Following the yeoman's web page we will install it and search for the appropriate generator:

```bash
npm install -g yo
```

The -g option will install yeoman globally, meaning we will be able to used in all our computers projects not just in the directory we are at the moment the order is launched.

after that, we'll go again to yeoman's page, on the section *Discovering generators*, and search for *Phaser* generators.

![alt text](https://raw.githubusercontent.com/demipel8/crazy-volley/develop/report/assets/phaser_yeoman_search.png "")

The one with the most stars will be perfect for the project. Entering its GitHub page, we'll find the install command:

```bash
npm install -g yo generator-phaser
```

Once the project is created (as will be seen on the implementation chapter) our project will have the next schema:

![alt text](https://raw.githubusercontent.com/demipel8/crazy-volley/develop/report/assets/folder_structure.png "")


**bower.json**: configuration file for bower tool, explained on its own chapter. 

**.bowerrc**: this files changes the base directory for bower work.

**.gitignore**: This file will tell git ,our VCS , what files and folders won't be tracked our uploaded to a remote repo. 

**gulpfile.js**: configuration file for gulp. A program described on the next chapter.

**.jshintrc**: Another tool that will be explained in a few chapter. This file serves as its configuration files.

**package.json**: npm configuration file. It takes track of the dependencies and in case you want to upload your project as npm module it holds all basic info.

**node\_modules**: Folder where all node modules used in the development of the game will be safe. Important no to upload this folder to a VCS. It weights too much and it can always be installed with the command:

```bash
npm install
```

Given you have all required dependencies on your *package.json* file.

**src**: Folder where all our game code will be deposited. It will suffer little modifications to adjust to proper code organization but here are some highlights.

**src/index.html**: The html file the player will load to play the game. Holds all references to game files and will grow as the project gets bigger.

**src/assets**: Folder where all game resources will be stored. Images, audio, physics...

**src/css**: Folder where all our style code will go. This folder will be little to no at all modified through the development of the game.

**src/js**: Folder where all our javascript code is written. It contains some Phaser states and a main file for global objects.

#####Gulp

Gulp is an automated task system that will improve some development tasks such as, mounting a web server for game tests and packing the game for production ( concatenation, minimizing, obfuscation... ), it help us avoid error prone repetitive work and speeds up development.

Gulp will be installed globally like yeoman, but for this case it can also be installed locally to the game folder:

```bash
cd path/to/the/game
npm install --save-dev gulp
```

the *--save-dev modificator* will add gulp to our *package.json* file on its *devDependencies* sub-object.

An example of gulp use could be to launch *gulp* command at the game folder, which will execute the default task of the *gulpfile.js* file of the folder:

![alt text](https://raw.githubusercontent.com/demipel8/crazy-volley/develop/report/assets/gulp_default.png "")

#####Bower

Bower is a javascript packet manager. Is used to download your web dependencies. In our case it will be the Phaser framework. First we install it:

```bash
npm install -g bower
```

Latter yeoman, while creating the project, it will execute the *bower install* command. Installing the dependencies written in the *bower.json* file.

#####JSHint

JSHint is a coding convention and Lint tool. It makes sure the whole code base keeps a coherent style while searching for possible errors on it. While developing the game, every time a file is saved, JSHint will check for errors an notify them via console.

It can be configured from the  *.jshintrc* file. Yeoman will install it for us.

####3.2 Performance

For a long time javascript was treated as second class language for two main reasons:

1. Slow: The main idea was that JS took 10 times to run a program than the same program written in C. Even though javascript is a complied language, it is compiled by the engine before execution trying to find possible batter optimization, but it was complicated with characteristics such as the non typed nature of it's variables and the automatic memory management through the garbage collector. ASM.js proposal works on this areas, restraining javascript to a subset of the language that allows the engine for the best optimization possible.

2. Single threaded: Javascript runs in only one single thread. The event driven language delivers incredible speed when it comes to I/O operations but spreading the event loop to different threads, for CPU demanding tasks, and maintaining coherence the whole time introduces more complexity. Some advances have been made in this area with the introduction of web workers. 

####3.2.1 Javascript engines
When a game is being developed in an environment such as javascripts, its is impossible not to feel that some things escape your control. Even though you'll be able to launch your game on multiple OS systems, through different web browsers or even different types of devices, you have to take on account that each one of them will have a particular javascript engine. This engine will support the standard APIs up to some exchange, but still if two engines would support the exact same APIs, the underlying implementation would be diverse, and its areas of optimization won't be the same.

So we'll look at some points of interest:

#####Renderer

WebGl is the new boy in town for web rendering an it offer the developers to send to the GPU repetitive work saving our CPU a lot of time, and has broaden the use of 3D graphics for the web. In a desktop environment it would be my favorite choice without a doubt.

But, mobile is a totally different world. IOS has a very optimized canvas component ans has been know to give problems with WebGl. As for android, forget about it. All pre-Lollipop Android versions will give problems with WebGl. So canvas comes as the reasonable option for this type of environment.

Also lets mention that Microsoft didn't supported WebGl until IE11, which can be a huge problem depending on the country you're planning to get your main audience from. 

#####Optimization

As Kyle Simpson says on the fifth book of his *You Don't Know JS* saga, *Async & Performance*: 'Many common performance tests unfortunately obsess about irrelevant microperformance details like x++ versus ++x. Writing good tests means understanding how to focus on big picture concerns, like optimizing on the critical path, and avoiding falling into traps like different JS engines' implementation details.'

This means we will focus on the maintainability and readability of the code except on critical parts such as update and render methods, on which we will code the most efficient way possible, explaining with comments if needed.

####3.3 Data protection analysis

There's a big problem for data consistency and avoiding data manipulation by evil users with technologies like javascript. The game runs in the client-side, the code will run on the users own device, so it's sensitive to manipulation. If the game your trying to do is multiplayer, you'll need to check server side if the actions one user is making are possible in the players context, that takes a lot of server computing, but helps to avoid cheaters. So balance data checking with performance considering your own resources.  

Additionally, private projects fear their code been stolen as it will be as simple as opening the browser console or scraping the game page. For this and for optimization purposes. Minimization and obfuscation are highly recommended, your code will weight less and be harder to read and modify, my advise is to always do this for production.

####3.4 Collaboration

As established before, the whole project will be public at a github repo. Leaving it open for anyone to participate with modifications of the game or the teachings available. The actual art of the game is designed by one of hooptap's designers: Juan Manuel Perez Rodriguez. 

####3.5 Phaser basic knowledge

Every Phaser game starts with an instance of a *Phaser.Game* object as seen in the next example:

```javascript
new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
}

function create() {
}

function update() {
}
```

The preload function is used for loading resources. On create all objects and initial configurations will be created and update handles well... updates, every frame the game loop will call this this function and check things like collision or user input.

This way works perfectly for small examples but once the code base grows it'll turn into a mess. Here is when states come in handy. A state allows us to separate the different sections of our game. Now we can have a loader state for all asset loading, a menu for a state and state for the playing the game itself. Our project will start with 4 basic states:

**boot**: Every resource needed to show the actual game resources is loaded here, like a progress bar or a special background. It also serves for initial configurations such as alignment, scale or device particular behaviors.

**preloader**: This states is where our game resources are loaded.

**menu**: Game menu. We can use it to show instructions, user configurations. character selection, game mode...

**game**: The mechanic the user will play.

So our initial game code will look more like this:

```javascript
var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'crazyvolley-game');
game.state.add('boot', ns.Boot);
game.state.add('preloader', ns.Preloader);
game.state.add('menu', ns.Menu);
game.state.add('game', ns.Game);
game.state.start('boot');
```

The game size is 640 x 480 pixels, the renderer use is a canvas renderer as Phaser.Graphics objects won't work on WebGl, and *crazyvolley-game* being the name of the div tag containing the game on our html file.