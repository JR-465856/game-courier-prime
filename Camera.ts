abstract class Camera {
    private static init = false;
    private static camKind = SpriteKind.create();
    private static camSprite = sprites.create(img`
        .
    `, Camera.camKind);

    public static initCallback(toAdd: () => void) {
        control.runInParallel(function () {
            pauseUntil(function () { return Camera.init;});
            toAdd();
        });
    }
    public static isInitialized() { return Camera.init;}

    public static getCameraSprite() { return Camera.camSprite;}

    public static main() {
        Camera.camSprite = new Sprite(image.create(1, 1));
        Camera.camSprite.setFlag(SpriteFlag.Ghost, true);
        Player.initCallback(function () {
            Camera.camSprite.x = Player.getPlayerSprite().x;
            Camera.camSprite.y = Player.getPlayerSprite().y;
            game.onUpdateInterval(25, function () {
                Camera.camSprite.x += (Player.getPlayerSprite().x - Camera.camSprite.x) / 5;
                Camera.camSprite.y += (Player.getPlayerSprite().y - Camera.camSprite.y) / 5;
            })
            scene.cameraFollowSprite(Camera.camSprite);

            Camera.init = true;
        })
    }
}

Camera.main();