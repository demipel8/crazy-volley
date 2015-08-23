/**
 * Created by demi on 8/20/15.
 */
var Team;

(function(  ) {

    var SCORE_PADDING = 10;
    var PLAYER_PADDING = 50;
    var BASE_Z = 1;

    Team = function (game, x, width, config, initialScore) {

        var team = game.add.graphics(0, 0);

        // graphics.lineStyle(2, 0xffd900, 1);
        team.color = config.color;
        team.alpha = 0.8;
        team.drawTeamSpace = drawTeamSpace;
        team.destroy = destroy;

        team.score = Score( game, x + SCORE_PADDING, 10, initialScore );
        team.player = Player( game, x + PLAYER_PADDING, 430, 'player', config.controls );

        function drawTeamSpace(x, width) {

            team.beginFill(team.color, team.alpha);
            team.clear();
            team.drawRect(x, 0, width, game.height);
            team.xPosition = x;
            team.widthOccupied = width;
            team.z = BASE_Z;
            team.score.z = team.z + 1;
            team.player.z = team.z + 1;
            team.score.setScore( Math.round( ( team.widthOccupied / game.width ) * 100 ), team.xPosition + SCORE_PADDING );
        }

        function destroy() {
            team.score.destroy();
            team.player.destroy();
            team.kill();
        }


        drawTeamSpace( x, width );

        return team;
    };
} (  ) );