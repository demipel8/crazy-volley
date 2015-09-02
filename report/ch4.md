#Chapter 4
##Solution design
###4.1 Implementation
####4.1.1 Creating our basic structure

We’ll start by creating the root folder for our project, in our case creating a new project
on WebStorm will create the folder on the following path */home/demi/WebstormProject-
s/crazyvolley*. Open a console, enter the folder and launch yeoman Phaser generator.

```bash
yo phaser
```

Phaser generator will launch and ask as for the game name, by default it uses the folder
name so let’s leave it that way. We’ll also specify the default choice for physics, as P2 is
the one used for crazy volley.

![alt text](https://raw.githubusercontent.com/demipel8/crazy-volley/develop/report/assets/phaser_projectCreation.png "")

next you’ll notice yeoman launching *npm install* and *bower install* command for us, leaving
this way the project ready to code, except a few changes.


**.gitignore**: I will add *.idea* folder, that is where WebStorm stores all its project related
data, to make sure the project stays independent from the text editor/IDE.

**src/assets**: In the resources folder 3 subfolders will be added: audio, images and physics.

**src/js**: All states will go to the states subfolder and a prefab folder will be created to
store our custom object definitions.

After moving the states to our folder states, the *index.html* file needs to be updated with
the new file paths.

```html
<script src = "js/states/boot.js"> </script>
<script src = "js/states/preloader.js"> </script>
<script src = "js/states/menu.js"> </script>
<script src = "js/states/game.js"> </script>
<script src = "js/main.js"> </script>
```

With this steps everything is ready to finally start coding.

####4.1.2 Launch the game for development

While programming the game the developers has to test the new features he introduces, gulp will help us using the connect tool, which will start a server and letting us test the game. The task watch will be monitoring the code changes so when a file listed for watch it's saved, the game reloads itself, serving the updates.

```bash
[demi@demi crazyvolley]$ gulp
[01:10:10] Using gulpfile /run/media/demi/New Volume/WebstormProjects/crazyvolley/gulpfile.js
[01:10:10] Starting 'connect'...
[01:10:10] Finished 'connect' after 11 ms
[01:10:10] Starting 'watch'...
[01:10:10] Finished 'watch' after 15 ms
[01:10:10] Starting 'default'...
[01:10:10] Finished 'default' after 0.00284 ms
[01:10:10] Server started http://localhost:9000
[01:10:10] LiveReload started on port 35729
```

Now we just need to open a browser and go to **localhost:9000** to try the game.

####4.1.3 Boot Setup

The boot state, apart from loading the loader display resources, set some early basic configuration. like scale or sizes for different devices the game will run on.

first lets set the scale for desktop devices to fill all the free space while maintaining its ratio.

```javascript
if (this.game.device.desktop) {
	this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.game.scale.pageAlignHorizontally = true;
	this.game.scale.pageAlignVertically = true;
}
```

We set the scale mode to **SHOW_ALL** (Shows the entire game display area while maintaining the original aspect ratio) and align the game container horizontally and vertically. If we open it in the browser... ops. The game is scrolling vertically. The reason behind this is that it is taking the width we offer and creating the height according to the ratio, which in these game will overflow all panoramic screen. For these to work we can set the height of the game container an let Phaser to set the according width. This can be done setting the next command as the first line of the if sentence.

```javascript
document.getElementById( 'crazyvolley-game').setAttribute('style','height:' + window.innerHeight + 'px');
```

Other settings that could be done here would be the choosing of a physics system and setting its gravity. A maximum and minimum resolutions for the scale manager. In mobile the force of a certain orientation, etcetera. 

####4.1.4 Loading resouces

Few games can be done without assets and crazy volley it's not an exception. Lets paste the resources in the assets folders, each one on its subfolder, an load them in our preloader state

#####Loading images

As you'll find along the way Phaser is very intuitive in most of its code so to load an image, the next code is used

```javascript
this.load.image( 'background', 'assets/images/background.jpg' );
this.load.image( 'ball', 'assets/images/ball.png' );
this.load.image( 'player', 'assets/images/player.png' );
```

Through *this.load* we access the game loader and with the image function we specify the string id for the image and its path as second parameter. 

#####Loading audio

Just like loading an image but with the method audio, also the second parameter is an array as you can specify different formats to cover all browsers and Phaser will load the most appropriated.

```javascript
this.load.audio( 'player0', [ 'assets/audio/player-0.mp3'] );
this.load.audio( 'player1', [ 'assets/audio/player-1.mp3'] );
this.load.audio( 'player2', [ 'assets/audio/player-2.mp3'] );
this.load.audio( 'player3', [ 'assets/audio/player-3.mp3'] );
```

#####Loading physics

The player will have a polygon shape for it's body, so using a tool we have saved the polygon data into a json and loaded with the method physics.

```javascript
this.load.physics( 'physicsData', 'assets/physics/player.json' );
```

#####Loading text

In this example is shown the loading of a bitmap font, requiring a key name, a png formatted image and the font itself, exported in xml.

```javascript
this.load.bitmapFont( '8bit', 'assets/fonts/8bit.png', 'assets/fonts/8bit.fnt' );
```

#####Loading sprite sheets

A sprite sheet is a composition of various sprites/images into one file. The is used to save memory and speed up performance in our games. there are various ways to load a sprite sheet in phase.

```javascript
this.load.spritesheet('name', 'assets/sprites/image.png', 37, 45, 18);
```

This will load a spritesheet where all the sprites have the same width and height. Very useful for loading animations.

```javascript
this.load.atlas('test', 'assets/sprites/test.png', 'assets/sprites/atlas_test.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
```

When we have different image sizes on a sprite sheet, some programs will give you a file with the info of the sprite position inside the sprite sheet. On the atlas method we specify the key name, the sprite sheet path, the atlas path and optionally the format of the atlas (if it's not the default). 

#####Add to game and test

Uncomment the code lines at the loader state and add the loading methods in the *loadResources* function, the result should look like these.

```javascript
Preloader.prototype = {
        preload: function () {
            this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
            this.load.setPreloadSprite(this.asset);

            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            this.loadResources();

            this.ready = false;
        },

        loadResources: function () {
            // load your assets here
            this.load.image('background', 'assets/images/background.jpg');
            this.load.image('ball', 'assets/images/ball.png');
            this.load.image('player', 'assets/images/player.png');

            this.load.audio('player0', [ 'assets/audio/player-0.mp3'] );
            this.load.audio('player1', [ 'assets/audio/player-1.mp3'] );
            this.load.audio('player2', [ 'assets/audio/player-2.mp3'] );
            this.load.audio('player3', [ 'assets/audio/player-3.mp3'] );

            this.load.physics('physicsData', 'assets/physics/player.json');
        },

        create: function () {

        },

        update: function () {
            if (!!this.ready) {
                this.game.state.start('menu');
            }
        },

        onLoadComplete: function () {
            this.ready = true;
        }
    };
```

Lets comment what is happening here. The first method to execute is going to be *preload*. On line 6 it establishes that once all the assets are loaded it will execute the *onLoadComplete} method, sending the actual context. the 7th line executes *loadResources*, the function where we have specified the resources we want to load. One thing to have in mind is that the methods we have use for loading resources, don't actually load the resources. This functions tell the loader to add these files to is queue, so we cannot use the right away, we need to wait for them to be loaded before using them. That's what the *onLoadComplete* event is for, until loading is finished the ready variable won't be turned to true, stopping the update method to lead us to the next state.

If we save the game in this state, go to the browser an open our console on the game tab, go to the network section and reload the game. We can see all of our resources being successfully loaded.

####4.1.5 Add sprites to the game

Our assets are loaded but once we enter the game is just a black screen. Lets see how to load images into the game. First let's load a background, open the game state and add the following line.

```javascript
create: function ( game ) {
	game.add.sprite( 0, 0, 'background' );
}
```

We add the game argument to the create function, that way we avoid calling *this.game* all the time. The method is pretty straightforward, add a sprite to the game. The first 2 arguments are x, y, which correspond to the upper left corner of the image, height and width properties will be taken from the image and scaled depending on the chosen scale mode. The third parameters as you can imagine is the key of the image, the one we set on the preloader state.

Go to the browser click on the Menu an watch the beach theme background image.

Next we'll load the player sprite but as we want the character to be more than just an image, we will introduce the a new term: Prefabs.

####4.1.6 Prefabs

A prefab is a pre-defined game object, we use it to use several instances of an object or pack up some specific functionality. A first approach his concept will be the player prefab (The common way for Phaser developers to create a prefab is using the prototype, with a class-like pattern, making it similar to other object oriented languages. But for I prefer to use Object delegation as I feel more natural for javascript).

```javascript
var Player;

(function(  ) {

    Player = function (game, x, y, image ) {

        var player = Object.create(Phaser.Sprite.prototype);
        Phaser.Sprite.call(player, game, x, y, image);

        player.anchor.setTo(.5, 1);
        game.add.existing(player);
    };

    return player;

} (  ) );
```

On *Player.js* file inside the prefabs folder we create the Player variable. and a self-invoking function (The self-invoking function, officially called immediately-invoked function expression, is used to avoid the variables inside leak to the global space. As javascript is function scoped this creates a lexical scope for all the code inside the function). Inside Player is defined as a function with the same methods required for a sprite object to be instantiated. Variable player (in lower case) extends the sprite object at line 7 and gets initialized in the next line. 

Line number 10 sets the anchor of the object at the center of it on the x axis and the lower part of its y axis. With this instructions the set point point of the object is set, so thing like rotation will use that point as its center and not the default upper left corner.

Finally we add the object to the game at line 11 and return the object to the invoker to do with it as it pleases.

For instantiate a couple player, return to the game state and on the create method append:

```javascript
Player( game, 100, 430, 'player');
Player( game, 300, 430, 'player');
```

Run the code and... Error. If we watch the console output it says that Player is not defined. We have to add it to the *index.html* file so it is invoked when the page loads. After the 24th line add the Player file.

```javascript
<script src="js/prefabs/Player.js"></script>
```

Now the game shows our 2 players floating in space. We will also make a small prefab for the ball, a clone of player but changing the variable names, add it to the game at position and our actual state will be:

![alt text](https://raw.githubusercontent.com/demipel8/crazy-volley/develop/report/assets/add_sprite_to_game.png "")

####4.1.7 Gravity

The first physics in the game to be implemented will be gravity. As said before, from the 3 available physics engines, P2 is the one selected for Crazy volley. Lets see how to activate P2 physics in our game:

```javascript
this.physics.startSystem( Phaser.Physics.P2JS );
this.physics.p2.gravity.y = 300;
```

The Phaser.Physics.P2JS constant tells the physics the system to start. Right after we set a y gravity force of 300. If the browser is refreshed nothing will change. Why? Because we have yet to add a physical body to our sprite so the can interact with the physic world created by the physics engine. lets add a square body to the player.

```javascript
game.physics.p2.enable( player, true );
```

Now a square can be seen filling our sprite area, that is the body of the player. The second parameter set to true creates a debug body so we can test better our game. For the ball a circle body will do.

```javascript
var Ball;
var diameter = 26;
```

```javascript
game.physics.p2.enable( ball, true );
ball.body.setCircle( diameter );
```

####4.1.8 Keyboard Input

Keyboard input is the predefined input method in the game so lets implement the player movement.

```javascript
var sideSpeed = 200;
```

```javascript
cursors = game.input.keyboard.createCursorKeys();
player.update = function () {

	player.body.velocity.x = 0; //default speed - stationary

	if ( cursors.left.isDown ) {
		player.scale.x =  - Math.abs( player.scale.x );
		player.body.moveLeft( sideSpeed );
	}
	else if ( cursors.right.isDown ) {
		player.scale.x = Math.abs( player.scale.x );
		player.body.moveRight( sideSpeed );
	}
};
```

The input manager takes care for all type of input across Phaser, in this case we execute the keyboard's *createCursorKeys* method. This method returns an object with the 4 arrow keys (right, down, left, up), we use this object to check for the user pressing the keys at the update method.

Every frame the players body velocity is set 0 and only if the left or the right arrow key is pressed the sprite move towards the direction specified. Other change being set is the sprites orientation, when the player turns left its x scale is set to the negative same number. The way we flip the sprite to facing towards the direction of its movement. This option works fine, its only drawback is that all the player will move at the same time. So another approximation is required.

Add a new parameter to the Player function named *controls*. The controls parameter will be an object containing *left* and *right* keys so instead of checking cursorkeys we'll check the keys specified here. The resultant update function for player doesn't differs much from the first one.

```javascript
player.body.fixedRotation = true;
player.update = function () {

	player.body.velocity.x = 0; //default speed - stationary

	if ( game.input.keyboard.isDown( controls.left ) ) {
		player.scale.x = -1;
		player.body.moveLeft( sideSpeed );
	}
	else if ( game.input.keyboard.isDown( controls.right ) ) {
		player.scale.x = 1;
		player.body.moveRight( sideSpeed );
	}
};
```

Notice the line we add before the update method. When this property is set to true the boy wont rotate. It will be useful when the players start jumping and colliding against each other. 

If we modify our player invocations at the game state.

```javascript
Player( game, 100, 430, 'player', { left: Phaser.Keyboard.A, right: Phaser.Keyboard.D} );
Player( game, 300, 430, 'player', { left: Phaser.Keyboard.LEFT_ARROW, right: Phaser.Keyboard.RIGHT_ARROW } );
```
            
We can manage them individually.

![alt text](https://raw.githubusercontent.com/demipel8/crazy-volley/develop/report/assets/add_movement.png "")

####4.1.9 Collision groups

At this point of the development, All of our physics bodies collide with each other, but this might not interest us for a mechanic and when the number of bodies grows it wont be optimal. Hence we have *collision groups* to help cope this problem.

Collision group help to set the groups of bodies that the member of the group will collide with. Lets create one group for the ball and another for the players;

```javascript
var playerCollisionGroup = this.physics.p2.createCollisionGroup();
var ballCollisionGroup = this.physics.p2.createCollisionGroup();
this.game.physics.p2.updateBoundsCollisionGroup();

var ball = Ball( this.game, 400, 50, 'ball' );
ball.body.setCollisionGroup(ballCollisionGroup);
ball.body.collides([playerCollisionGroup, ballCollisionGroup]);  

var player1 = Player( game, 100, 430, 'player', { left: Phaser.Keyboard.A, right: Phaser.Keyboard.D} );
player1.body.setCollisionGroup(playerCollisionGroup);
player1.body.collides([playerCollisionGroup, ballCollisionGroup]);

var player2 = Player( game, 300, 430, 'player', { left: Phaser.Keyboard.LEFT, right: Phaser.Keyboard.RIGHT } );
player2.body.setCollisionGroup(playerCollisionGroup);
player2.body.collides([playerCollisionGroup, ballCollisionGroup]); 
```

First we create both collision groups, then, very important, we use the *updateBoundsCollisionGroup* method. If not used, the objects will stop colliding with world bounds. The after each initialization we assign the object its group and the list of colliding groups.

####4.1.10 Materials

Setting up physic materials can define the interaction between two object without the need of setting up collision callback events. This is the way the bounce between the ball and the players well be handled.

```javascript
Ball = function ( game, x, y, image, material ) {

	var ball = Object.create(Phaser.Sprite.prototype);
	Phaser.Sprite.call(ball, game, x, y, image);
	ball.scale.set( 0.5 );
	game.add.existing(ball);

	game.physics.p2.enable( ball, true );
	ball.body.setCircle( diameter );
	ball.body.setMaterial( material);

	return ball;
};
```
Add the material argument and set it to the body with the sentence *ball.body.setMaterial( material );*. Do the same with Player.

```javascript
this.createMaterials( game );
this.physics.p2.createContactMaterial( materials.ball, materials.player, { restitution: 1.2 } );
this.physics.p2.createContactMaterial( materials.ball, materials.world, { restitution: 0.8 } );
},
```

Launch createMaterials and create the contactMaterials between the different material. Give them a value properties around 1, which means it will bounce on contact with the same force  it hit.

```javascript
createMaterials: function( game ) {
	materials.world = game.physics.p2.createMaterial('worldMaterial');
	materials.player = game.physics.p2.createMaterial('playerMaterial');
	materials.ball = game.physics.p2.createMaterial('ballMaterial');

	game.physics.p2.setWorldMaterial( materials.world );
},
```

Create a materials empty object inside the self-invoking function of the state and fill it at the createMaterials method. Also set *materials.world* as the world material. We want the ball bouncing against the walls.

####4.1.11 Player jump

For Crazy volley we want the player to be able to move left, right and jump. This last movement wont be as simple as the previous two because the game has to check whether the player is touching the ground before allowing him to jump. First we'll add the jump case into the update function and add a jump key in the controls object.

```javascript
var player1 = Player( game, 100, 430, 'player', { 
		left: Phaser.Keyboard.A, 
		right: Phaser.Keyboard.D,
		jump: Phaser.keyboard.W
	}, 
	materials.player );
	
var player2 = Player( game, 300, 430, 'player', { 
        left: Phaser.Keyboard.LEFT, 
        right: Phaser.Keyboard.RIGHT,
        jump: Phaser.keyboard.UP
    }, 
    materials.player );
```

```javascript
var player1 = Player( game, 100, 430, 'player', { 
		left: Phaser.Keyboard.A, 
		right: Phaser.Keyboard.D,
		jump: Phaser.Keyboard.W
	}, 
	materials.player );
	
var player2 = Player( game, 300, 430, 'player', { 
        left: Phaser.Keyboard.LEFT, 
        right: Phaser.Keyboard.RIGHT,
        jump: Phaser.Keyboard.UP
    }, 
    materials.player );
```

```javascript
if ( game.input.keyboard.isDown( controls.jump ) && checkIfCanJump() && this.game.time.now > player.jumpTimer ) {
	player.body.moveUp( jumpSpeed ) ;
	player.jumpTimer = this.game.time.now + 750;
}
```

Aside from checking if the jump key is pressed we create the *jumpTimer* variable make some space between jumps. Also we need to make *jupmTimer* a property of each player to avoid player blocking others jumps. Next we are going to use P2 physics body to determine if the player is touching the ground.

```javascript
function checkIfCanJump() {

	var d;
    var id = player.body.data.id;

	for ( var i=0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++ ) {
		var c = game.physics.p2.world.narrowphase.contactEquations[i];

		if ( c.bodyA.id === id || c.bodyB.id === id ) {
			var d = p2.vec2.dot( c.normalA, yAxis );

			if ( c.bodyA.id === id ) {
				d *= -1;
			}

 			if ( d > 0.5 ) {
				return true;
			}
		}
	}

	return false;

}
```

We go over all the body that make contact at that instant of the game. For each contact equation we check if the body belongs to the player, if positive we use the dot product of the body normal vector with the y axis vector to check if the player body is making contact with an object below him. if that's evaluated to true it allow the player to jump. 

####4.1.12 Add graphics to the game

The sprites and the physics are in place, now we need to implement the mechanics. The first part will be implementing the teams. Each player belongs to a team that it's represented with a color rectangle. The area of the rectangle will be filled with the teams color. For this purpose a Graphic object is needed. A graphics object allows to draw primitive shapes in the game. Them team prefab will delegate to the graphics object.

```javascript
var Team;

(function(  ) {

    var PLAYER_PADDING = 50;

    Team = function (game, x, width, config, material, collisionGroup ) {

        var team = game.add.graphics(0, 0);

        team.color = config.color;
        team.alpha = 0.8;
        team.drawTeamSpace = drawTeamSpace;
        team.destroy = destroy;

        team.player = Player( game, x + PLAYER_PADDING, 430, 'player', config.controls, material, collisionGroup);

        function drawTeamSpace(x, width) {

            team.beginFill(team.color, team.alpha);
            team.clear();
            team.drawRect(x, 0, width, game.height);
            team.xPosition = x;
            team.widthOccupied = width;
            team.z = BASE_Z;
            team.player.z = team.z + 1;
            console.log( 'entro', config.color, x, width );
        }

        function destroy() {
            team.player.destroy();
            team.kill();
        }

        drawTeamSpace( x, width );

        return team;
    };
} (  ) );
```

PLAYER_PADDING will set the initial x position of the teams player respect the teams x position. The Team function will have almost the same parameters as the player, adding the initial width of the team and making the controls a subobject ob the config position where the teams color will also be. We set the *alpha} property to 0.8.\footnote{The Alpha property sets the opacity of the color, with a range from 0 to 1, being 0 transparent.} *drawTeamSpace} will paint a rectangle given its x position and width. Finally we will override the destroy function which is responsible for destroying a Game Object. With the new method if the team is destroyed, the teams player will be also destroyed. 

Now that the screen is filled with the teams colors, another problem arises, the ball y rendered behind teams and if player 1 stands on team 2 zone it is also rendered behind.

![alt text](https://raw.githubusercontent.com/demipel8/crazy-volley/develop/report/assets/graphics.png "")
 
To solve this problem, a very popular Phaser object will come very handy: Groups. Through the use of groups we will be implementing a technique call layering.

####4.1.13 Groups and Layering

Group object acts as a container for display objects, give support to pooling and form the logical tree structure of the display/scene graph where local transformations are applied to children, meaning that if the group moves or rotates for example all of its children (the objects contained inside a group) will carry out the same action.

The benefit obtained from the groups is that an object added to a group defined before other group, will be rendered behind the objects of the second group. This group will be called Layer, we will create 2: background and foreground.

They will be define as the object LAYERS in the *game state* outside the self-invoking function, as being defined at there will permit us to use it in all of the other js files.

```javascript
game.add.sprite( 0, 0, 'background' );

LAYERS.background = game.add.group();
LAYERS.foreground = game.add.group();
```

To add a display object to a group, it needs to be added as the last parameter of its invocation. 

```javascript
Phaser.Sprite.call(player, game, x, y, image, LAYERS.foreground );
Phaser.Sprite.call(ball, game, x, y, image, LAYERS.foreground);
var team = game.add.graphics(0, 0, LAYERS.background );
```

With these method we can add as much layers as we need, for example a UI layer in front of the foreground layer.

####4.1.14 Text
 
Often in games we need to display text, to make a menu, user UI, characters conversations, etc. Phaser, aware of its importance, has many way of displaying text. We will be using bitmap fonts. Google very famous web fonts its also available but we want all the resources to be at our folders for a possible package and deployment to a mobile app or desktop program.
 
For the text example the score of the team will be shown in a text, representing the percentage of the field it controls.

```javascript
var Score;

(function(  ) {

    Score = function ( game, x, y, initialValue ) {

        var value = initialValue;
        var score = Object.create( Phaser.BitmapText.prototype );
        Phaser.BitmapText.call(score, game, x, y, '8bit', value + '%', 40, 'left', LAYERS.foreground );

        game.add.existing( score );

        score.setScore = function( newScore, x ) {
            value = newScore;
            score.x = x;
            score.setText( value + '%' );
        };

        score.getScore = function( ) {
            return value;
        };

        return score;
    };
} (  ) );
```

The team prefab is modified to have a score object inside. \footnote{To avoid repetitive code the full sources can be found in the annex.} Very similar to all the previous prebafs we can notice a setter and a getter for the value of the score, moving the x position depending on the specified by the setter caller.

####4.1.15 Signals
 
Now that the score is up and running we need to be able to update it. This will introduces how Phaser manages events: Signals. Phaser documentation defines the as *'an event dispatch mechanism that supports broadcasting to multiple listeners'*.

That means we can create callbacks for an event whenever we have the reference to the signal and dispatch it in other place of the code.

On the example the Signal *onTouchGround* is going to be launched when the ball hits the floor. At that moment we will change the player punctuation, changing the fields width.

```javascript
ball.body.onBeginContact.add( collisionHandler, this );
ball.events.onTouchGround = new Phaser.Signal();

function collisionHandler( body ) {

	if ( !body ) {
		if( ball.y + diameter >= game.height ) {
			ball.events.onTouchGround.dispatch( ball );
			ball.body.reset( game.width / 2,  100 )
		}
	}
}
```

First of all we add our *collisionHandler* to a predefined signal called *onBeginContact* which pretty much explains itself. Then we create the new signal. CollisionHandler method checks if the collision is with another body, in case it evaluates to false means that the collision has been with a world bound. In that case checks the position of the ball to see if its at the ground level. In that case it dispatches our custom signal and move the ball to another position. The handler for our new signal is written on the game state.

```javascript
	ball.events.onTouchGround.add( this.ballTouchesGround , this );
```

ballTouchesGround leads to a series of functions that determine the teams field the player has fall in an the appropriate action to take.\footnote{Code unrelated to Phaser implementation the full source can be found in the annex.} 

![alt text](https://raw.githubusercontent.com/demipel8/crazy-volley/develop/report/assets/signals.png "")

####4.1.16 Audio

Time to add some noise to the game. At the chapter 4.1.2 4 audio were loaded, each one is the sound the ball will make when colliding with one of the players. So the definition of player is extended to have an audio argument. The property player.audio is set to that parameter with the following line.

```javascript
player.audio = game.add.audio( audio );
```

The last thing to do is modify the balls collision handler for when it actually collides with other body, play that body's sound.

```javascript
function collisionHandler( body ) {

	if ( !body ) {
		if( ball.y + diameter >= game.height ) {
			ball.events.onTouchGround.dispatch( ball );
			ball.body.reset( game.width / 2,  100 )
		}
	} else {
		body.sprite.audio.play();
	}
}
```

####4.1.17 Timing events

Timed events can be useful in certain type of mechanics, for example making a count down. You can create a text timer with a timer loop that will run once a second. The count down prefab mixes the text score prefabs with the use of signals in Ball display object. Lets examine the time related code.

```javascript
var counter = time;
var timer = game.time.create( false );
        
countDown.start = function( ) {
	timer.loop( Phaser.Timer.SECOND, loop, this);
	timer.start();
};

countDown.events.onCountDownEnds = new Phaser.Signal();

function formatTime( s ) {
	// Convert seconds (s) to a nicely formatted and padded time string
	var seconds = "0" + (s - minutes * 60);
	return minutes.substr(-2) + ":" + seconds.substr(-2);
}

function loop() {
	 counter--;
	 countDown.setText( formatTime( counter ) );

	if ( counter === 0) {
		timer.stop();
		countDown.events.onCountDownEnds.dispatch( countDown );
	}
} 
```

A Phaser timer is created. The start function sets a loop to run every second (Phaser.Timer.SECOND returns 1000, the number of milliseconds in a second) the loop callback function, this method decreases the counter and updates the text representation. Once it arrives to 0 it will stop the timer and dispatch the *onCountDownEnds* signal, handled in the *game state*.

####4.1.18 Tweening 
The Phaser Tween manager book defines a tween as *the act of taking a start value and changing it over a defined period of time, until it reaches an end value. It does this by applying a mathematical operation in order to move that value towards the end*. 

A tween can only be bound to an object, letting the tween the ability to change its property values over time. This gives us a power full tool we'll be using in a couple of examples.

#####Tween score
Right now when the ball hits the floor, scores get updated right away, wouldn't it be cooler if we saw a quick countDown/countUp to the next value? the setScore method need to be modified.

```javascript
var value = { score : initialValue };
score.setScore = function( newScore, x ) {
	score.x = x;
	var tween = game.add.tween( value ).to( { score: newScore }, 200, 'Linear', true );
	tween.onComplete.add( function() { this.update = function(){} }, score);
	score.update = update;
};
function update() {
	score.setText( Math.round( value.score ) + '%' );
}
```

A tween is generated over the value object. This tween will modify the property score to a new value, over 200 milliseconds, applying linear interpolation. The last argument is autoStart to avoid having to use the command *tween.start()* right after.

Score's update function is set to rerender the score over the time the tween is active. A signal callback is set to be launched when the tween finishes, that set the update function as an empty method.

#####Power Up, tweening movement}

A sprite Prefab named PowerUp is created based on the Player prefab. For the tweening we add the *launch* method

```javascript
function launch() {
	var x = game.rnd.integerInRange( 0, game.width );
	var y = game.rnd.integerInRange( 0, game.height );

	var tween = game.add.tween( powerUp ).to( { x: x, y: y }, 2000, 'Linear', true );
	tween.onComplete.addOnce( launch, this );
}

launch();
```

With Phaser Random generators two integers with x and y values within the world bounds are created. A tween is set to move towards that direction. Once the tween ends, a one-time listener is set to restart the tween function with new coordinates. And there we have it. A none stopping moving power up.

Using features explained before:

- A controls key is needed to launch the power up.
- A signal to activate the power up.
- A body to collide with players that ignore gravity and the ball.
- The power up function.

All of these thing need to be implemented. 

####4.1.19 Polygon shape

Our playing movement if looking pretty good but the fact that its body is a square make it very difficult to keep the ball from touching the ground. Let's level up a notch our player by changing its square shape for a polygon shape.

With the help of PhysicsEditor free version we create polygon shapes for our character, not being very accurate, a 21 vertices shape is obtained. The shapes are exported in a json file and saved in the correspondent assets subfolder. The file is loaded like explained on chapter 4.1.3 and the shape is used in the player prefab.

```javascript
player.body.clearShapes();
player.body.loadPolygon('physicsData', 'player');
player.body.mass = 4;
```

The original square shape is removed and the polygon with the name player is loaded form the file loaded with the name physicsData. Also we give more mass to the player so it won't bounce as much as the ball when they collide.

![alt text](https://raw.githubusercontent.com/demipel8/crazy-volley/develop/report/assets/polygon_bad.png "")

The polygon is set, when jumping and moving to the right it works fine but once it moves left the shapes stays the same as we only change the orientation for the sprite not its body. What solution is available? a new shape needs to be made for when the sprite is facing left and being loaded on the update method.

```javascript
if ( game.input.keyboard.isDown( controls.left ) ) {
	player.scale.x = -1;
	player.body.moveLeft( sideSpeed );

	if ( actualState !== STATES.LEFT ) {
		actualState = STATES.LEFT;
		player.body.clearShapes();
		player.body.loadPolygon('physicsLeftData', 'player');
		setBody();
	}
}
else if ( game.input.keyboard.isDown( controls.right ) ) {
	player.scale.x = 1;
	player.body.moveRight( sideSpeed );

	if ( actualState !== STATES.RIGHT ) {
		actualState = STATES.RIGHT;
		player.body.clearShapes();
		player.body.loadPolygon('physicsData', 'player');
		setBody();
	}
}
function setBody() {
	player.body.fixedRotation = true;
	player.body.setCollisionGroup( collisionGroup );
	player.body.setMaterial( material );
	player.body.collideWorldBounds = true;
	player.body.mass = 4;
}
```

This solution comes with a lot of burdens. The first being the need of reseting materials, collisionGroup and some other properties to the changed shape. Requiring the extra method *setBody*. Other being to check each movement if the shape already in use is not the one we need for the next movement, as without this test a lot of reshaping would be done needlessly. But with some little code we can over come them.

Unfortunately there a third problem to the solution. An offset is added to the new left shaped body. To the date of the release of the thesis we are waiting for an answer to this problem from the most experienced Phaser users. So it is decided to use a capsule polygon body for the player, leaving the arms and the legs outside.

![alt text](https://raw.githubusercontent.com/demipel8/crazy-volley/develop/report/assets/error_polygon_offset.png "")
  
#SOON THE BE WRITTEN
####4.1.20 Animations
####4.1.21 UI Menu
####4.1.22 Data between states
####4.1.23 Camera Movement
Often in a lot of game genres the world is bigger than the size of use view o whats the same, the camera. For instance Crazy volley worlds height is bigger than the camera, that way the ball can describe a quadratic interpolation movements.
####4.1.24 Storing
