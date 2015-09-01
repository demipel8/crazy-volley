var LAYERS = {};
var MATERIALS = {};
var COLLISION_GROUPS = {};

/* refactoriza añadiendo los materials y los collision groups a este espacio. No siendo necesario pasarlos como objecto
en las invocaciones de los prefabs*/

(function() {
    'use strict';

    var materials = {};
    var teams = [];
    var LOSE_PERCENTAGE = 75 / 2;
    var ERASE_PERCENTAGE = 0.1;
    function Game() {}

    Game.prototype = {
        create: function ( game ) {
            var player1;
            var player2;
            var ball;

            game.add.sprite( 0, 0, 'background' );

            LAYERS.background = game.add.group();
            LAYERS.foreground = game.add.group();

            this.physics.startSystem( Phaser.Physics.P2JS );
            this.physics.p2.gravity.y = 300;

            var playerCollisionGroup = this.physics.p2.createCollisionGroup();
            var ballCollisionGroup = this.physics.p2.createCollisionGroup();
            game.physics.p2.updateBoundsCollisionGroup();

            this.createMaterials( game );

            ball = Ball( game, 400, 50, 'ball', materials.ball );
            ball.body.setCollisionGroup(ballCollisionGroup);
            ball.body.collides([playerCollisionGroup, ballCollisionGroup]);

            var team1 = Team( game, 0, ( game.width / 2 ), {
                color : '0xffff32',
                controls: {
                    left: Phaser.Keyboard.A,
                    right: Phaser.Keyboard.D,
                    jump: Phaser.Keyboard.W
                }
            }, materials.player, playerCollisionGroup, 'player0', 0 );

            player1 = team1.player;
            player1.body.setCollisionGroup(playerCollisionGroup);
            player1.body.collides([playerCollisionGroup, ballCollisionGroup]);

            var team2 = Team( game, ( game.width / 2 ), ( game.width / 2 ), {
                color : '0x38eeff',
                controls: {
                    left: Phaser.Keyboard.LEFT,
                    right: Phaser.Keyboard.RIGHT,
                    jump: Phaser.Keyboard.UP
                }
            }, materials.player, playerCollisionGroup, 'player1', 0 );

            player2 = team2.player;
            player2.body.setCollisionGroup(playerCollisionGroup);
            player2.body.collides([playerCollisionGroup, ballCollisionGroup]);

            this.physics.p2.createContactMaterial( materials.ball, materials.player, { restitution: 1.2 } );
            this.physics.p2.createContactMaterial( materials.ball, materials.world, { restitution: 0.8 } );

            ball.events.onTouchGround.add( this.ballTouchesGround , this );
            teams.push( team1, team2 );

            var timer = CountDown( game, 265, 50, 3 );
            timer.start();
            timer.events.onCountDownEnds.add( function() { console.log( 'se acabo' ) } , this );
        },

        createMaterials: function( game ) {
            materials.world = game.physics.p2.createMaterial('worldMaterial');
            materials.player = game.physics.p2.createMaterial('playerMaterial');
            materials.ball = game.physics.p2.createMaterial('ballMaterial');

            game.physics.p2.setWorldMaterial( materials.world );
        },

        ballTouchesGround: function( ball ) {
            var teamsFloorCollision = teams.map( function( team ) {
                return ( ball.x >= team.xPosition && ball.x <= team.xPosition + team.widthOccupied ) ||
                    ( ball.x + ball.width >= team.xPosition && ball.x + ball.width <= team.xPosition + team.widthOccupied );
            });

            if ( teamsFloorCollision.reduce(function( prev, cur ) { return prev + cur; } )  === 1 ) {
                teams.forEach( function( team, index ) {
                    if( teamsFloorCollision[ index ] ) {
                        if ( teams.length === 2 ) {
                            this.collapseOn2Teams( team, index, 0.1 );
                        } else {
                            this.collapseTeam( team, index, ERASE_PERCENTAGE );

                        }

                        if( team.score.getScore() < LOSE_PERCENTAGE ) {
                            this.killTeam( index );
                        }
                    }
                }.bind( this ));
            }
        },

        collapseTeam: function( team, index, percentage ) {
            var percent = team.widthOccupied * percentage;

            team.widthOccupied = team.widthOccupied - percent;

            //expands neighbors
            [ ( index - 1 + teams.length) % teams.length, (index + 1) % teams.length].forEach( function( value ) {
                teams[ value ].widthOccupied = teams[ value ].widthOccupied + percent/2 ;
            });

            this.reorderTeams();
        },

        collapseOn2Teams: function( team, index ) {
            var percentage = team.widthOccupied * ERASE_PERCENTAGE;

            team.widthOccupied = team.widthOccupied - percentage;
            teams[ (index + 1) % teams.length ].widthOccupied = teams[ (index + 1) % teams.length  ].widthOccupied + percentage;

            this.reorderTeams();

        },

        reorderTeams: function() {
            teams.forEach( function( value, index ) {
                var x = 0;
                if ( index ) {
                    x = teams[ index - 1 ].xPosition + teams[ index - 1 ].widthOccupied;
                }

                teams[ index ].drawTeamSpace( x, teams[ index ].widthOccupied );

            } );
        },

        killTeam: function( index ) {
            this.collapseTeam( teams[index], index, 1 );

            teams[ index ].destroy();

            if ( teams.length === 1) {
                teams[ 0 ].x = 0;
                endGame();
            }
        },

        update: function () {

        },

        onInputDown: function () {
            this.game.state.start('menu');
        }
    };

    window['crazyvolley'] = window['crazyvolley'] || {};
    window['crazyvolley'].Game = Game;
}());
