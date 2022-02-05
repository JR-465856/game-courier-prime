/* Kinds */
namespace nativeKinds {
    export const player = SpriteKind.create();
}

/* ***     Main class     *** */
abstract class Main {
    public static plr: Sprite;
    public static cam: Sprite;
    private static initialized = false;
    private static initFuncArray: Array<Function> = [];

    public static initCallback(toAdd: () => void) {
        control.runInParallel(function() {
            pauseUntil(function() { return Main.initialized;});
            toAdd();
        });
    }
    public static isInitialized() { return Main.initialized;}
    public static main() {
                            /*----------------*/
                            /* INITIALIZATION */
                            /*----------------*/
        /*    Player    */
        Main.plr = sprites.create(assets.image`plrfront`, nativeKinds.player);
        Main.plr.ay = 150;
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

        Main.initialized = true;
                        /*-----------------------*/
                        /* END OF INITIALIZATION */
                        /*-----------------------*/
    }
}

/* Driver code */
Main.main();