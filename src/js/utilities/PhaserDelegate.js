/**
 * Created by demi on 9/2/15.
 */
function PhaserDelegate( type, game, args ) {
    var obj = Object.create( type.prototype );
    type.apply( obj, [ game ].concat( args ) );
    game.add.existing( obj );
    return obj;
}