/* Kinds */
namespace nativeKinds {
    export const player = SpriteKind.create();
}

/* ***     Main class     *** */
abstract class Main {
    public static plr: Sprite;
    public static cam: Sprite;

    public static main() {
        /*    Player    */
        Main.plr = sprites.create(assets.image`plrfront`, nativeKinds.player);
        Main.plr.ay = 150
        Controls.canMove              = true;
        Controls.canChangeImageOnStop = true;
        /*    Camera    */
        Main.cam = new Sprite(image.create(1, 1));
        Main.cam.setFlag(SpriteFlag.Ghost, true);
        Main.cam.x = Main.plr.x;
        Main.cam.y = Main.plr.y;
        game.onUpdateInterval(25, function() {
            Main.cam.x += (Main.plr.x - Main.cam.x) / 5;
            Main.cam.y += (Main.plr.y - Main.cam.y) / 5;
        })
        scene.cameraFollowSprite(this.cam);
        /*    Map    */
        tiles.setTilemap(tilemap`level1`);
        scene.setBackgroundColor(9);
        tiles.placeOnRandomTile(Main.plr, assets.tile`plrspawn`);
        tiles.setTileAt(tiles.getRandomTileByType(assets.tile`plrspawn`), assets.tile`transparency16`);
    }
}

/* Driver code */
Main.main();