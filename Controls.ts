abstract class Controls {
    /* Button states */
    public static up    = {pressed: false};
    public static down  = {pressed: false};
    public static left  = {pressed: false};
    public static right = {pressed: false};
    /* Other */
    public static canMove: boolean;
    public static canChangeImageOnStop: boolean;

    /* Stop all movement */
    public static stopAllMovement() {
        Controls.up.pressed    = false;
        Controls.down.pressed  = false;
        Controls.left.pressed  = false;
        Controls.right.pressed = false;
    }
    /* Any movement pressed */
    public static moving() {
        return Controls.up.pressed || Controls.down.pressed || Controls.left.pressed || Controls.right.pressed;
    }
    /* Any horizontal movement pressed */
    public static movingX() {
        return Controls.left.pressed || Controls.right.pressed;
    }
    /* Any vertical movement pressed */
    public static movingY() {
        Controls.up.pressed || Controls.down.pressed
    }
    /* Main class */
    public static main() {


                            /****************/
                            /*   PRESSED   */
                            /****************/
        
        
        /* Left */ controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
            Controls.left.pressed = true;
            animation.runImageAnimation(Player.getPlayerSprite(), assets.animation`plrwalk`, 225, true);
            control.runInParallel(function () {
                while (Controls.left.pressed && Controls.canMove) {
                    Player.getPlayerSprite().vx = -25;
                    pause(5);
                }
            })
        })
        /* Right */ controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
            Controls.right.pressed = true;
            animation.runImageAnimation(Player.getPlayerSprite(), assets.animation`plrwalk`, 225, true);
            control.runInParallel(function () {
                while (Controls.right.pressed && Controls.canMove) {
                    Player.getPlayerSprite().vx = 25;
                    pause(5);
                }
            })
        })
        /* Up */ controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
            Controls.up.pressed = true;
            if (Controls.canMove && Player.getPlayerSprite().isHittingTile(CollisionDirection.Bottom)) Player.getPlayerSprite().vy = -85;
        })


                            /****************/
                            /*   RELEASED   */
                            /****************/
        
        
        /* Left */ controller.left.onEvent(ControllerButtonEvent.Released, function () {
            Controls.left.pressed = false;
            if (Controls.canMove) Player.getPlayerSprite().vx = 0;
            if (!Controls.movingX())
                animation.stopAnimation(animation.AnimationTypes.All, Player.getPlayerSprite());
                if (Controls.canChangeImageOnStop)
                    Player.getPlayerSprite().setImage(assets.image`plrfront`);
        })
        /* Right */ controller.right.onEvent(ControllerButtonEvent.Released, function () {
            Controls.right.pressed = false;
            if (Controls.canMove) Player.getPlayerSprite().vx = 0;
            if (!Controls.movingX()) {
                animation.stopAnimation(animation.AnimationTypes.All, Player.getPlayerSprite());
                if (Controls.canChangeImageOnStop)
                    Player.getPlayerSprite().setImage(assets.image`plrfront`);
            }
        })
        /* Up */ controller.up.onEvent(ControllerButtonEvent.Released, function () {
            Controls.up.pressed = false;
        })

    }
}

Controls.main();