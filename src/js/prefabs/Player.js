/**
 * Created by demi on 8/27/15.
 */
var Player;
var cursors;
var jumpTimer = 0;
var sideSpeed = 200;
var jumpSpeed = 200;
var yAxis = p2.vec2.fromValues(0, 1);

(function(  ) {

    Player = function (game, x, y, image, controls, material, collisionGroup, audio ) {

        var player = Object.create(Phaser.Sprite.prototype);
        Phaser.Sprite.call(player, game, x, y, image, LAYERS.foreground );

        player.anchor.setTo(.5, 1);
        game.add.existing(player);

        game.physics.p2.enable( player, true );
        player.body.clearShapes();
        player.body.loadPolygon('physicsData', 'player');

        player.body.fixedRotation = true;
        player.body.setMaterial( material );
        player.body.collideWorldBounds = true;
        player.body.mass = 4;

        player.jumpTimer = 0;
        player.audio = game.add.audio( audio );


        player.update = function () {

            player.body.velocity.x = 0; //default speed - stationary

            if ( game.input.keyboard.isDown( controls.left ) ) {
                player.scale.x = -1;
                player.body.moveLeft( sideSpeed );
                player.body.clearShapes();
                player.body.loadPolygon('physicsLeftData', 'player');
                setBody();
            }
            else if ( game.input.keyboard.isDown( controls.right ) ) {
                player.scale.x = 1;
                player.body.clearShapes();
                player.body.loadPolygon('physicsData', 'player');
                player.body.moveRight( sideSpeed );
                setBody()
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
            player.body.setCollisionGroup( collisionGroup );
            player.body.setMaterial( material );
            player.body.collideWorldBounds = true;
            player.body.mass = 4;
        }

        return player;

    };
} (  ) );