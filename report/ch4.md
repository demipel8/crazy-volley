#Chapter 4
##Solution design
###4.1 Implementation
####4.1.1Implementation

Creating our basic structure
We’ll start by creating the root folder for our project, in our case creating a new project
on WebStorm will create the folder on the following path /home/demi/WebstormProject-
s/crazyvolley. Open a console, enter the folder and launch yeoman Phaser generator.

```bash
yo phaser
```

Phaser generator will launch and ask as for the game name, by default it uses the folder
name so let’s leave it that way. We’ll also specify the default choice for physics, as P2 is
the one used for crazy volley.

![alt text](https://github.com/demipel8/crazy-volley/tree/develop/report/assets/phaser_projectCreation.png "")

next you’ll notice yeoman launching npm install and bower install command for us, leaving
this way the project ready to code, except a few changes.


**.gitignore**: I will add .idea folder, that is where WebStorm stores all its project related
data, to make sure the project stays independent from the text editor/IDE.

**src/assets**: In the resources folder 3 subfolders will be added: audio, images and physics.

**src/js**: All states will go to the states subfolder and a prefab folder will be created to
store our custom object definitions.

After moving the states to our folder states, the index.html fill needs to be updated with
the new file paths.

```javascript
< script src = " js / states / boot . js " > </ script >
< script src = " js / states / preloader . js " > </ script >
< script src = " js / states / menu . js " > </ script >
< script src = " js / states / game . js " > </ script >
< script src = " js / main . js " > </ script >
```

with this steps everything is ready to finally start coding.

