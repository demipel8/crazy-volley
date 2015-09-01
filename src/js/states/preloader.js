(function() {
    'use strict';

    function Preloader() {
        this.asset = null;
        this.ready = false;
    }

    Preloader.prototype = {
        preload: function () {
            this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
            this.load.setPreloadSprite(this.asset);

            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            this.loadResources();

            this.ready = false;
        },

        loadResources: function () {
            // load your assets here
            this.load.image( 'background', 'assets/images/background.jpg' );
            this.load.image( 'ball', 'assets/images/ball.png' );
            this.load.image( 'player', 'assets/images/player.png' );
            this.load.image( 'powerUp', 'assets/images/powerUp.png' );

            this.load.audio( 'player0', [ 'assets/audio/player-0.mp3'] );
            this.load.audio( 'player1', [ 'assets/audio/player-1.mp3'] );
            this.load.audio( 'player2', [ 'assets/audio/player-2.mp3'] );
            this.load.audio( 'player3', [ 'assets/audio/player-3.mp3'] );

            this.load.physics( 'physicsData', 'assets/physics/player.json' );
            this.load.physics( 'physicsLeftData', 'assets/physics/playerLeft.json' );

            this.load.bitmapFont( '8bit', 'assets/fonts/8bit.png', 'assets/fonts/8bit.fnt' );
        },

        create: function () {

        },

        update: function () {
            if (!!this.ready) {
                this.game.state.start( 'game'/*'menu'*/);
            }
        },

        onLoadComplete: function () {
            this.ready = true;
        }
    };

    window['crazyvolley'] = window['crazyvolley'] || {};
    window['crazyvolley'].Preloader = Preloader;
}());
