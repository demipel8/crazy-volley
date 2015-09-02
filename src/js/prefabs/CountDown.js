/**
 * Created by demi on 8/30/15.
 */
var CountDown;

(function(  ) {

    CountDown = function ( game, x, y, time ) {

        var counter = time;
        var timer = game.time.create( false );


        var countDown = PhaserDelegate( Phaser.BitmapText, game, [ x, y, '8bit', formatTime( counter ), 40, 'center',
            LAYERS.foreground ] );

        countDown.start = function( ) {
            timer.loop( Phaser.Timer.SECOND, loop, this);
            timer.start();
        };

        countDown.events.onCountDownEnds = new Phaser.Signal();

        function formatTime( s ) {
            // Convert seconds (s) to a nicely formatted and padded time string
            var minutes = "0" + Math.floor(s / 60);
            var seconds = "0" + (s - minutes * 60);
            return minutes.substr(-2) + ":" + seconds.substr(-2);
        }

        function loop() {
            counter--;
            countDown.setText( formatTime( counter ) );

            if ( counter === 0) {
                timer.stop();
                countDown.events.onCountDownEnds.dispatch( countDown );
            }
        }

        return countDown;
    };
} (  ) );