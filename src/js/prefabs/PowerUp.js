/**
 * Created by demi on 9/1/15.
 */
var PowerUp;

(function(  ) {

    PowerUp = function (game, x, y, image ) {

        var powerUp = Object.create(Phaser.Sprite.prototype);
        Phaser.Sprite.call(powerUp, game, x, y, image, LAYERS.foreground );
        game.add.existing(powerUp);

        function launch() {
            var coords = {
                x : game.rnd.integerInRange( 0, game.width ),
                y : game.rnd.integerInRange( 0, game.height )
            };

            var tween = game.add.tween( powerUp).to( coords, 2000, 'Linear', true );
            tween.onComplete.addOnce( launch, this);
        }

        launch();

        return powerUp;

    };
} (  ) );