(function() {
    'use strict';

    var possiblePlayers = [
        {
            name : 'Los cabrones',
            color : '0xffff32',
            audio : 'player0',
            controls : {
                left : 'A',
                right : 'D',
                jump : 'W'
            }
        },
        {
            name : 'Los champiñones',
            color : '0x38eeff',
            audio : 'player1',
            controls : {
                left : 'J',
                right : 'L',
                jump : 'I'
            }
        },
        {
            name : 'Los gilis',
            color : 'green',
            audio : 'player2',
            controls : {
                left : 'LEFT_ARROW',
                right : 'RIGHT_ARROW',
                jump : 'UP_ARROW'
            }
        },
        {
            name : 'Los Cañones',
            color : 'blue',
            audio : 'player3',
            controls : {
                left : 'NUMPAD_4',
                right : 'NUMPAD_6',
                jump : 'NUMPAD_8'
            }
        }
    ];

    function Menu() {}

    Menu.prototype = {
        create: function ( game ) {

            possiblePlayers[ 0 ].controls.left = Phaser.Keyboard.A;
            possiblePlayers[ 0 ].controls.right = Phaser.Keyboard.D;
            possiblePlayers[ 0 ].controls.jump = Phaser.Keyboard.W;

            possiblePlayers[ 1 ].controls.left = Phaser.Keyboard.LEFT;
            possiblePlayers[ 1 ].controls.right = Phaser.Keyboard.RIGHT;
            possiblePlayers[ 1 ].controls.jump = Phaser.Keyboard.UP;

            var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5,
                'MENU', {font: '42px Arial', fill: '#ffffff', align: 'center'
                });
            text.anchor.set(0.5);
            this.input.onDown.add(this.onDown, this);
        },

        update: function () {

        },

        onDown: function () {
            this.game.state.start( 'game', true, false, [ possiblePlayers[ 0 ], possiblePlayers[ 1 ] ] );
        }
    };

    window['crazyvolley'] = window['crazyvolley'] || {};
    window['crazyvolley'].Menu = Menu;
}());
