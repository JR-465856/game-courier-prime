abstract class Controls {
    /* Button states */
    public static up    = {pressed: false};
    public static down  = {pressed: false};
    public static left  = {pressed: false};
    public static right = {pressed: false};
    public static A = { pressed: false};
    public static B = { pressed: false};
    /* Button listeners*/
    private static buttonListeners: Array<{button: Controls.Button, mode: Controls.ButtonMode, callback: () => void}> = [];
    /* Other */
    public static canMove: boolean;
    public static canChangeImageOnStop: boolean;

    /* Release all buttons */
    public static releaseAllButtons() {
        Controls.up.pressed    = false;
        Controls.down.pressed  = false;
        Controls.left.pressed  = false;
        Controls.right.pressed = false;
        Controls.A.pressed = false;
        Controls.B.pressed = false;
    }

    /* Any movement pressed */
    public static getAnyDPadPressed() {
        return Controls.up.pressed
               || Controls.down.pressed
               || Controls.left.pressed
               || Controls.right.pressed;
    }
    /* A/B pressed*/
    public static APressed() { return Controls.A.pressed;}
    public static BPressed() { return Controls.B.pressed; }
    /* Any horizontal movement pressed */
    public static horizontalPressed() { return Controls.left.pressed || Controls.right.pressed;}
    /* Any vertical movement pressed */
    public static verticalPressed() { return Controls.up.pressed || Controls.down.pressed}

    /* Register a button listener */
    public static listen(button: Controls.Button, mode: Controls.ButtonMode, callback: () => void) {
        Controls.buttonListeners.push({
            button  : button,
            mode    : mode,
            callback: callback
        });
    }

    /* Main class */
    public static main() {


                            /****************/
                            /*   PRESSED   */
                            /****************/
        
        
        /* Left */ controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
            Controls.left.pressed = true;
            Controls.buttonListeners.forEach(function (obj) {
                if (obj.button == Controls.Button.left
                    && obj.mode == Controls.ButtonMode.press)
                    obj.callback();
            })
        })
        /* Right */ controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
            Controls.right.pressed = true;
            Controls.buttonListeners.forEach(function (obj) {
                if (obj.button == Controls.Button.right
                    && obj.mode == Controls.ButtonMode.press)
                    obj.callback();
            })
        })
        /* Up */ controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
            Controls.up.pressed = true;
            Controls.buttonListeners.forEach(function (obj) {
                if (obj.button == Controls.Button.up
                    && obj.mode == Controls.ButtonMode.press)
                    obj.callback();
            })
        })
        /* A */ controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
            Controls.A.pressed = true;
            Controls.buttonListeners.forEach(function (obj) {
                if (obj.button == Controls.Button.A
                    && obj.mode == Controls.ButtonMode.press)
                    obj.callback();
            })
        })
        /* B */ controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
            Controls.B.pressed = true;
            Controls.buttonListeners.forEach(function (obj) {
                if (obj.button == Controls.Button.B
                    && obj.mode == Controls.ButtonMode.press)
                    obj.callback();
            })
        })


                            /****************/
                            /*   RELEASED   */
                            /****************/
        
        
        /* Left */ controller.left.onEvent(ControllerButtonEvent.Released, function () {
            Controls.left.pressed = false;
            Controls.buttonListeners.forEach(function (obj) {
                if (obj.button == Controls.Button.left
                    && obj.mode == Controls.ButtonMode.release)
                    obj.callback();
            })
        })
        /* Right */ controller.right.onEvent(ControllerButtonEvent.Released, function () {
            Controls.right.pressed = false;
            Controls.buttonListeners.forEach(function (obj) {
                if (obj.button == Controls.Button.right
                    && obj.mode == Controls.ButtonMode.release)
                    obj.callback();
            })
        })
        /* Up */ controller.up.onEvent(ControllerButtonEvent.Released, function () {
            Controls.up.pressed = false;
            Controls.buttonListeners.forEach(function (obj) {
                if (obj.button == Controls.Button.up
                    && obj.mode == Controls.ButtonMode.release)
                    obj.callback();
            })
        })
        /* A */ controller.A.onEvent(ControllerButtonEvent.Released, function () {
            Controls.A.pressed = false;
            Controls.buttonListeners.forEach(function (obj) {
                if (obj.button == Controls.Button.A
                    && obj.mode == Controls.ButtonMode.release)
                    obj.callback();
            })
        })
        /* B */ controller.B.onEvent(ControllerButtonEvent.Released, function () {
            Controls.B.pressed = false;
            Controls.buttonListeners.forEach(function (obj) {
                if (obj.button == Controls.Button.B
                    && obj.mode == Controls.ButtonMode.release)
                    obj.callback();
            })
        })

    }
}

/* Controls namespace */
namespace Controls {
    /* Button enum */
    export enum Button {
        down  = 0,
        up    = 1,
        right = 2,
        left  = 3,
        A = 4,
        B = 5
    }
    /* Modes enum */
    export enum ButtonMode {
        press   = 0,
        release = 1
    }
}

Controls.main();