/**
 * Created by demi on 8/18/15.
 */

var Player;

(function(  ) {
    var cursors;
    var jumpButton;
    var fireButton;
    var jumpTimer = 0;
    var sideSpeed = 200;
    var jumpSpeed = 200;
    var yAxis = p2.vec2.fromValues(0, 1);

    Player = function (game, x, y, image, controls) {

        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = cursors.up;
        fireButton = game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );

        var player = Object.create(Phaser.Sprite.prototype);

        Phaser.Sprite.call(player, game, x, y, image);
        //player.scale.setTo(1.1, 1.1);
        player.anchor.setTo(.5, 1); //so it flips around its middle
        //player.animations.add('move', [5, 6, 7, 8], 10, true);

        game.add.existing(player);


        player.scale.set( 0.5 );
        game.physics.p2.enable( player, true );

        player.body.fixedRotation = true;
        player.body.collideWorldBounds = true;
        player.body.mass = 4;

        player.material = game.physics.p2.createMaterial('playerMaterial');
        player.body.setMaterial( player.material );

        player.update = function () {

            player.body.velocity.x = 0; //default speed - stationary

            if ( game.input.keyboard.isDown( controls.left ) ) {
                player.scale.x =  - Math.abs( player.scale.x );
                player.body.moveLeft( sideSpeed );
            }
            else if ( game.input.keyboard.isDown( controls.right ) ) {
                player.scale.x = Math.abs( player.scale.x );
                player.body.moveRight( sideSpeed );
            }
            else {
                player.frame = 5;
            }

            if ( game.input.keyboard.isDown( controls.jump ) && checkIfCanJump() && this.game.time.now > jumpTimer ) {
                player.body.moveUp( jumpSpeed );
                jumpTimer = this.game.time.now + 750;
            }

            /*if ( fireButton.isDown ) {
                player.weapon.fire( player );
            }*/
        };

        function checkIfCanJump() {

            var result = false;

            for ( var i=0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++ ) {
                var c = game.physics.p2.world.narrowphase.contactEquations[i];

                if ( c.bodyA === player.body.data || c.bodyB === player.body.data ) {
                    var d = p2.vec2.dot( c.normalA, yAxis );

                    if ( c.bodyA === player.body.data ) {
                        d *= -1;
                    }

                    if ( d > 0.5 ) {
                        result = true;
                    }
                }
            }

            return result;

        }

        return player;
    };
} (  ) );

