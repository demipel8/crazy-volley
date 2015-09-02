/**
 * Created by demi on 8/27/15.
 */
var Player;

(function(  ) {

    var sideSpeed = 400;
    var jumpSpeed = 200;
    var yAxis = p2.vec2.fromValues(0, 1);
    var STATES = { LEFT: 0, RIGHT: 1 };

    Player = function (game, x, y, image, controls, audio ) {

        var player =  PhaserDelegate( Phaser.Sprite, game, [ x, y, image, LAYERS.foreground ] );
        var currentStates = STATES.RIGHT;

        player.anchor.setTo(.5, 1);

        game.physics.p2.enable( player, true );
        player.body.clearShapes();
        player.body.loadPolygon('physicsData', 'player');

        setBody();
        player.body.collides( [ COLLISION_GROUPS.player, COLLISION_GROUPS.ball ] );

        player.jumpTimer = 0;
        player.audio = game.add.audio( audio );


        player.update = function () {

            player.body.velocity.x = 0; //default speed - stationary

            if ( game.input.keyboard.isDown( controls.left ) ) {
                player.scale.x = -1;
                player.body.moveLeft( sideSpeed );
                if ( currentStates === STATES.RIGHT ) {
                    currentStates = STATES.LEFT;
                    player.body.clearShapes();
                    player.body.loadPolygon('physicsLeftData', 'player');
                    setBody();
                }
            }
            else if ( game.input.keyboard.isDown( controls.right ) ) {
                player.scale.x = 1;
                player.body.moveRight( sideSpeed );
                if ( currentStates === STATES.LEFT ) {
                    currentStates = STATES.RIGHT;
                    player.body.clearShapes();
                    player.body.loadPolygon('physicsData', 'player');
                    setBody();
                }
            }

            if ( game.input.keyboard.isDown( controls.jump ) && checkIfCanJump() && this.game.time.now > player.jumpTimer ) {
                player.body.moveUp( jumpSpeed ) ;
                player.jumpTimer = this.game.time.now + 0;
            }
        };

        function checkIfCanJump() {

            var d;
            var id = player.body.data.id;

            for ( var i=0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++ ) {
                var c = game.physics.p2.world.narrowphase.contactEquations[i];

                if ( c.bodyA.id === id || c.bodyB.id === id ) {
                    d = p2.vec2.dot( c.normalA, yAxis );

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

        function setBody() {
            player.body.fixedRotation = true;
            player.body.setCollisionGroup( COLLISION_GROUPS.player );
            player.body.setMaterial( MATERIALS.player );
            player.body.collideWorldBounds = true;
            player.body.mass = 4;
        }

        return player;

    };
} (  ) );