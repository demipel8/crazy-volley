/**
 * Created by demi on 8/20/15.
 */
var Score;

(function(  ) {

    Score = function ( game, x, y, initialValue ) { //TODO no va

        var value = initialValue;
        var score = Object.create( Phaser.Text.prototype );
        Phaser.Text.call(score, game, x, y, value + '%', { font: "40px Arial", fill: "#ffffff", align: "center" } );

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