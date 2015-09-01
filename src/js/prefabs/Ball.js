/**
 * Created by demi on 8/18/15.
 */
var Ball;
var diameter = 26;

(function(  ) {

    Ball = function ( game, x, y, image ) {

        var ball = Object.create(Phaser.Sprite.prototype);

        Phaser.Sprite.call(ball, game, x, y, image);

        game.add.existing(ball);

        ball.scale.set( 0.5 );
        game.physics.p2.enable( ball, true );

        ball.body.setCircle( diameter );
        ball.material = game.physics.p2.createMaterial('ballMaterial');
        ball.body.setMaterial( ball.material );

        ball.body.onBeginContact.add( collisionHandler, this );
        ball.events.onTouchGround = new Phaser.Signal();

        function collisionHandler( body, bodyB, shapeA, shapeB, equation) {

            //  The block hit something.
            //
            //  This callback is sent 5 arguments:
            //
            //  The Phaser.Physics.P2.Body it is in contact with. *This might be null* if the Body was created directly in the p2 world.
            //  The p2.Body this Body is in contact with.
            //  The Shape from this body that caused the contact.
            //  The Shape from the contact body.
            //  The Contact Equation data array.
            //
            //  The first argument may be null or not have a sprite property, such as when you hit the world bounds.

            if ( body ) {
            } else {
                if( ball.y + diameter >= game.height ) {
                    ball.events.onTouchGround.dispatch( ball );
                    ball.body.reset( game.width / 2,  100 )
                }
            }

        }
        ball.update = function () {

        };

        return ball;
    };
} (  ) );