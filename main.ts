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
        /* Controls GUI */
        let controlsGUI = new GUI();
        controlsGUI.setImage(img`
            .66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666.
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            666fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ff11ffffffffff1ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666f1fffffffffff111fffffffff1ff11fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666f1ffff1ff11fff1ff111ff1ff1f11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666f1fff1f1f1f1ff1ff1fff1f1f1fff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ff11ff1ff1f1fff1f1ffff1ff1f11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666fffffffffffffff2fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ffffffffffffff222ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ffffffffffffff222ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666fffffffffffff22222fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666fffffffffff2fffffff2fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666fffffffff222fffffff222fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ffffffff2222fff1fff2222ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666fffffffff222fff1fff222fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666fffffffffff2fff1fff2fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666fffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ffffffffff1ffff1ffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ffffffffff1ffff1ffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ffffffffff1ffff1ffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ffffffffff1ffff1ffff1ffffffffffffffffffffffffffffffffff11ff1ff1ff1ffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ffffffffff1ffff1ffff1ffffffffffffffffffffffffffffffffff1f1fff1f1f1fff111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ffffffffff1ffff1ffff1ffffffffffffffffffffffffffffffffff11ff1f111f11fff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ffffffffff1ffff1ffff1111111111111111111111111111111111f11ff1fff1f1f1ff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ffffffffff1ffff1fffffffffffffffffffffffffffffffffffffff1f1f1f11ff1f1fff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ffffffffff1ffff1fffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ffffffffff1ffff1fffffffffffffffffffffffffff1fffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ffffffffff1ffff1fffffffffffffffffffffffffff1f1f1f1111f1f1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ffffffffff1ffff1111111111111111111111111f1f1f1f1f1111f11fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ffffffffff1fffffffffffffffffffffffffffffff1fff11f1ff1f1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ffffffffff1ffffffffffff1ffff1fff11ff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ffffffffff1ffffffffffff1fff1f1ff1ff111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ffffffffff1ffffffffffff1fff111f111ff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666ffffffffff111111111111f1fff1ffff1fff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666fffffffffffffffffffffff111ff11ff1ffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            666fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            .66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666.
        `);
        controlsGUI.setPos(160/2, 95);
        controlsGUI.show();
        controller.pauseUntilAnyButtonIsPressed();
        controlsGUI.destroy();
    }
}

/* Driver code */
Main.main();