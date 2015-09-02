/**
 * Created by demi on 8/27/15.
 */
var Ball;
var diameter = 26;

(function(  ) {

    Ball = function ( game, x, y, image ) {

        var ball = PhaserDelegate( Phaser.Sprite, game, [ x, y, image, LAYERS.foreground ] );
        ball.scale.set( 0.5 );

        game.physics.p2.enable( ball, false );
        ball.body.setCircle( diameter );
        ball.body.setMaterial( MATERIALS.ball );
        ball.body.setCollisionGroup( COLLISION_GROUPS.ball );
        ball.body.collides( [ COLLISION_GROUPS.player, COLLISION_GROUPS.ball ] );

        ball.body.onBeginContact.add( collisionHandler, this );
        ball.events.onTouchGround = new Phaser.Signal();

        function collisionHandler( body ) {

            if ( !body ) {
                if( ball.y + diameter >= game.height ) {
                    ball.events.onTouchGround.dispatch( ball );
                    ball.body.reset( game.width / 2,  100 );
                }
            } else {
                body.sprite.audio.play();
            }
        }

        return ball;
    };
} (  ) );