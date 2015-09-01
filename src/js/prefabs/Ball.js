/**
 * Created by demi on 8/27/15.
 */
var Ball;
var diameter = 26;

(function(  ) {

    Ball = function ( game, x, y, image, material ) {

        var ball = Object.create(Phaser.Sprite.prototype);
        Phaser.Sprite.call(ball, game, x, y, image, LAYERS.foreground);
        ball.scale.set( 0.5 );
        game.add.existing(ball);

        game.physics.p2.enable( ball, false );
        ball.body.setCircle( diameter );
        ball.body.setMaterial( material);

        ball.body.onBeginContact.add( collisionHandler, this );
        ball.events.onTouchGround = new Phaser.Signal();

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

        return ball;
    };
} (  ) );