/**
 * Created by demi on 8/30/15.
 */
var Score;

(function(  ) {

    Score = function ( game, x, y, initialValue ) {
        var tween;
        var value = { score: initialValue };
        var score = PhaserDelegate( Phaser.BitmapText, game, [ x, y, '8bit', value.score, 150, 'left', LAYERS.foreground ] );

        score.alpha = 0.7;

        score.setScore = function( newScore, x ) {
            score.x = x;
            tween = game.add.tween( value ).to( { score: newScore }, 200, 'Linear', true );
            tween.onComplete.addOnce( function() {
                update();
                this.update = function() {}
            }, score );
            score.update = update;
        };

        function update() {

            score.setText( Math.round( value.score ) );
        }

        score.getScore = function( ) {
            return value.score;
        };

        return score;
    };
} (  ) );