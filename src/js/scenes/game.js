(function() {
    'use strict';

    var boundsCollisionGroup;
    var data;
    var teams;
    var LOSE_PERCENTAGE;
    var EREASE_PERCENTAGE = 0.1;

    function Game() {}

    Game.prototype = {
        init: function( matchData) {
            data = matchData;
            LOSE_PERCENTAGE = 75 / data.length;
        },

        create: function ( game ) {

            /*probar a hacer el juego mas alto y poner la camara mas bajo*/
            game.add.sprite( 0, 0, 'background' );

            var bounds = new Phaser.Rectangle( 0, -1200, 600, 1800 );

            teams = [];
            this.physics.startSystem( Phaser.Physics.P2JS );
            this.physics.p2.gravity.y = 300;
            this.physics.p2.setImpactEvents(true);

            this.createPreviewBounds( bounds.x, bounds.y, bounds.width, bounds.height );

            var playerCollisionGroup = this.physics.p2.createCollisionGroup();
            var ballCollisionGroup = this.physics.p2.createCollisionGroup();
            this.game.physics.p2.updateBoundsCollisionGroup();

            this.createPreviewBounds( bounds.x, bounds.y, bounds.width, bounds.height );

            var ball = Ball( this.game, 400, 50, 'ball' );
            ball.body.setCollisionGroup(ballCollisionGroup);
            ball.body.collides([playerCollisionGroup, ballCollisionGroup]);

            data.forEach( function( team, index ) {
                var newTeam = Team( game, ( game.width / data.length ) * index, ( game.width / data.length ), team, 100 / data.length );
                var player = newTeam.player;

                player.body.setCollisionGroup(playerCollisionGroup);
                player.body.collides([playerCollisionGroup, ballCollisionGroup]);
                this.physics.p2.createContactMaterial(ball.material, player.material, { restitution: 1.2 });

                teams.push( newTeam );
            }.bind( this ) );

            var worldMaterial = this.physics.p2.createMaterial('worldMaterial');
            this.physics.p2.createContactMaterial(ball.material, worldMaterial, { restitution: 0.8 });


            this.physics.p2.setWorldMaterial(worldMaterial);

            ball.events.onTouchGround.add( this.ballTouchesGround , this );

        },

        ballTouchesGround: function( ball ) {
            var teamsFloorCollision = teams.map( function( team ) {
                return ( ball.x >= team.xPosition && ball.x <= team.xPosition + team.widthOccupied ) ||
                    ( ball.x + ball.width >= team.xPosition && ball.x + ball.width <= team.xPosition + team.widthOccupied );
            });

            if ( teamsFloorCollision.reduce(function( prev, cur ) { return prev + cur; } )  === 1 ) {
                teams.forEach( function( team, index ) {
                    if( teamsFloorCollision[ index ] ) { //TODO rellenar metodos collapse en Phaser
                        if ( teams.length === 2 ) {
                            this.collapseOn2Teams( team, index, 0.1 );
                        } else {
                            this.collapseTeam( team, index, EREASE_PERCENTAGE );

                        }

                        if( team.score.getScore() < LOSE_PERCENTAGE ) {
                            this.killTeam( index );
                        }
                    }
                }.bind( this ));
            }
        },

        collapseTeam: function( team, index, percentage ) {
            var percentage = team.widthOccupied * percentage;

            team.widthOccupied = team.widthOccupied - percentage;

            //expands neighbors
            [ ( index - 1 + teams.length) % teams.length, (index + 1) % teams.length].forEach( function( value ) {
                teams[ value ].widthOccupied = teams[ value ].widthOccupied + percentage/2 ;
            });

            this.reorderTeams();
        },

        collapseOn2Teams: function( team, index ) {
            var percentage = team.widthOccupied * EREASE_PERCENTAGE;

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

        createPreviewBounds: function(x, y, w, h) {

            var sim = this.game.physics.p2;
            var customBounds = {};

            //  If you want to use your own collision group then set it here and un-comment the lines below
            boundsCollisionGroup = sim.boundsCollisionGroup.mask;

            customBounds.left = new p2.Body( { mass: 0, position: [ sim.pxmi(x), sim.pxmi(y) ], angle: 1.5707963267948966 } );
            customBounds.left.addShape( new p2.Plane() );
            customBounds.left.shapes[0].collisionGroup = boundsCollisionGroup;

            customBounds.right = new p2.Body( { mass: 0, position: [ sim.pxmi(x + w), sim.pxmi(y) ], angle: -1.5707963267948966 } );
            customBounds.right.addShape( new p2.Plane() );
            customBounds.right.shapes[0].collisionGroup = boundsCollisionGroup;

            customBounds.top = new p2.Body( { mass: 0, position: [ sim.pxmi(x), sim.pxmi(y) ], angle: -3.141592653589793 } );
            customBounds.top.addShape( new p2.Plane() );
            customBounds.top.shapes[0].collisionGroup = boundsCollisionGroup;

            customBounds.bottom = new p2.Body( { mass: 0, position: [ sim.pxmi(x), sim.pxmi(y + h) ] } );
            customBounds.bottom.addShape( new p2.Plane() );
            customBounds.bottom.shapes[0].collisionGroup = boundsCollisionGroup;


            sim.world.addBody( customBounds.left );
            sim.world.addBody( customBounds.right );
            sim.world.addBody( customBounds.top );
            sim.world.addBody( customBounds.bottom );

        }
    };

    window['crazyvolley'] = window['crazyvolley'] || {};
    window['crazyvolley'].Game = Game;
}());
