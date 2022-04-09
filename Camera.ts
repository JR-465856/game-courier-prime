class Camera {
    /* Variables */
    private static currentCamera: Camera;
    private init = false;
    
    private static camKind = SpriteKind.create();
    private camSprite = sprites.create(image.create(1, 1), Camera.camKind);
    /* ********* */

    /* Constructor */
    constructor() {
        this.camSprite.setFlag(SpriteFlag.Ghost, true);
        this.init = true;
    }

    /* Initialization callbacks */
    public initCallback(toAdd: () => void) {
        control.runInParallel(function () {
            pauseUntil(function() { return this.init;});
            toAdd();
        });
    }
    public isInitialized() { return this.init;}

    /* Focus on camera */
    public focus() { scene.cameraFollowSprite(this.camSprite); Camera.currentCamera = this;}
    /* Get focused camera */
    public static getFocusedCamera() { return Camera.currentCamera;}

    /* Set position */
    public setPosition(nx: number, ny: number) { this.camSprite.setPosition(nx, ny);}

    /* Get camera sprite */
    public getCameraSprite() { return this.camSprite;}

    /* Smooth follow a sprite */
    public followSprite(toFollow: Sprite) {
        this.camSprite.x = toFollow.x;
        this.camSprite.y = toFollow.y;
        game.onUpdateInterval(25, function () {
            this.camSprite.x += (toFollow.x - this.camSprite.x) / 5;
            this.camSprite.y += (toFollow.y - this.camSprite.y) / 5;
        })
    }

    /* ** Main method ** */
    public static main() {
        
    }
}

Camera.main();