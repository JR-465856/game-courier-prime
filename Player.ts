abstract class Player {
    private static init = false;
    private static playerKind = SpriteKind.create();
    private static playerSprite: Sprite;
    private static camera: Camera;

    public static initCallback(toAdd: () => void) {
        control.runInParallel(function () {
            pauseUntil(function () { return Player.init;});
            toAdd();
        });
    }
    public static isInitialized() { return Player.init;}

    public static getPlayerSprite() { return Player.playerSprite;}
    public static getPlayerSpriteKind() { return Player.playerKind;}

    public static main() {
        /* Player init */
        Player.playerSprite = sprites.create(assets.image`plrfront`, Player.playerKind);
        Player.playerSprite.ay = 150;
        Controls.canMove = true;
        Controls.canChangeImageOnStop = true;
        
        /* Camera */
        Player.camera = new Camera();
        Player.camera.setPosition(Player.playerSprite.x, Player.playerSprite.y);
        Player.camera.followSprite(Player.playerSprite);
        Player.camera.focus();

        Player.init = true;
    }
}

Player.main();