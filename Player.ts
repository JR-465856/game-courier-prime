abstract class Player {
    private static init = false;
    private static playerKind = SpriteKind.create();
    private static playerEntity: Entity;
    private static camera: Camera;

    public static initCallback(toAdd: () => void) {
        control.runInParallel(function () {
            pauseUntil(function () { return Player.init;});
            toAdd();
        });
    }
    public static isInitialized() { return Player.init;}

    // DEPRECATED: The below methods are deprecated and only exist for compatibility
    //             with older, archaic classes that existed before the NPC class
    //             and Hitbox class. It is advised not to use these methods for
    //             further work.
    public static getPlayerSprite() { return Player.playerEntity.getHitbox().getSprite();}
    public static getPlayerDisplaySprite() { return Player.playerEntity.getSprite();}
    public static getPlayerSpriteKind() { return Player.playerKind;}

    public static getEntity() { return Player.playerEntity;}
    public static getHitboxKind() { return Player.playerEntity.getHitbox().getSprite().kind();}

    public static main() {
        /* Player init */
        Player.playerEntity = new Player.PlayerEntity();
        Controls.canMove = true;
        Controls.canChangeImageOnStop = true;
        
        /* Camera */
        Player.camera = new Camera();
        Player.camera.setPosition(Player.getPlayerSprite().x, Player.getPlayerSprite().y);
        Player.camera.followSprite(Player.getPlayerSprite());
        Player.camera.focus();

        Player.init = true;
    }
}

Player.main();

namespace Player {
    export class PlayerEntity extends Entity {
        constructor() {
            super();

            this.createSprite(assets.image`plrfront`, Player.getPlayerSpriteKind(), 10, 15);
            this.getHitbox().getSprite().ay = 150;
            this.getHitbox().setParentOffset(0, 0);

            // Walking animation
            let walkAnim = this.createAnimation("walk");
            walkAnim.setFrames(assets.animation`plrwalk`)
            walkAnim.setInterval(225);
            walkAnim.setLoop(true);
            walkAnim.setParent(this.getSprite());

            return this;
        }
    }
}