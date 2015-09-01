/**
 * Created by demi on 8/30/15.
 */
var Score;

(function(  ) {

    Score = function ( game, x, y, initialValue ) {

        var value = initialValue;
        var score = Object.create( Phaser.BitmapText.prototype );
        Phaser.BitmapText.call(score, game, x, y, '8bit', value + '%', 40, 'left', LAYERS.foreground );

        game.add.existing( score );

        score.setScore = function( newScore, x ) {
            value = newScore;
            score.x = x;
            score.setText( value + '%' );
        };

        score.getScore = function( ) {
            return value;
        };

        return score;
    };
} (  ) );