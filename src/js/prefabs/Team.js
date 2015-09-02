/**
 * Created by demi on 8/29/15.
 */
var Team;

( function() {

    var SCORE_PADDING = 60;
    var PLAYER_PADDING = 50;

    Team = function (game, x, width, config, audio, initialScore ) {

        var team = PhaserDelegate( Phaser.Graphics, game, [ 0, 0, LAYERS.background ] );

        team.color = config.color;
        team.alpha = 0.8;
        team.drawTeamSpace = drawTeamSpace;
        team.destroy = destroy;

        team.score = Score( game, x + SCORE_PADDING, 80, initialScore );
        team.player = Player( game, x + PLAYER_PADDING, 430, 'player', config.controls, audio);

        function drawTeamSpace(x, width) {

            team.beginFill(team.color, team.alpha);
            team.clear();
            team.drawRect(x, 0, width, game.height);
            team.xPosition = x;
            team.widthOccupied = width;
            team.score.setScore( Math.round( ( team.widthOccupied / game.width ) * 100 ),
                team.xPosition + team.widthOccupied / 2 - 100 );
        }

        function destroy() {
            team.score.destroy();
            team.player.destroy();
            team.kill();
        }

        drawTeamSpace( x, width );

        return team;
    };
} () );