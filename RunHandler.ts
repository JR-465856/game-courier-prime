// RunHandler class
// Used for looping and game runtime handling and such
abstract class RunHandler {
    // Arrays that hold the functions for updates
    //
    // These are made public so that the RunHandler
    // namespace can change these
    // DO NOT CHANGE THESE MANUALLY UNLESS YOU
    // KNOW WHAT YOU ARE DOING!!!
    public static onUpdateFunctions  : Array<(deltaTime: number) => void>;
    public static onShadeFunctions   : Array<(deltaTime: number) => void>;
    public static onPaintFunctions   : Array<(deltaTime: number) => void>;
    public static onGameOverFunctions: Array<(deltaTime: number, isWin: boolean) => void>;
    // Variables to calculate the delta time, we have these
    // variables because we want stuff not to lag (e.g. a 2 second
    // wait actually taking 2.5 seconds before "completion")
    private static oldUpdateRuntime  : number;
    private static oldShadeRuntime   : number;
    private static oldPaintRuntime   : number;
    private static oldGameOverRuntime: number;

    constructor() {}

    // Main function of RunHandler that handles the internals
    //
    // Do not call main, it is called once in RunHandler.ts and
    // should not be called more than once
    public static main() {
        // Initialize the arrays. TypeScript has some weird
        // bug where improperly-initialized class arrays
        // freak out and fail to work at runtime
        RunHandler.onUpdateFunctions   = [];
        RunHandler.onShadeFunctions    = [];
        RunHandler.onPaintFunctions    = [];
        RunHandler.onGameOverFunctions = []; 
        // Initialize the delta time variables
        RunHandler.oldUpdateRuntime   = game.runtime();
        RunHandler.oldShadeRuntime    = game.runtime();
        RunHandler.oldPaintRuntime    = game.runtime();
        RunHandler.oldGameOverRuntime = game.runtime();


        // onUpdate
        game.onUpdate(function() {
            let currentRuntime = game.runtime();
            let deltaTime = currentRuntime - RunHandler.oldUpdateRuntime;
            RunHandler.onUpdateFunctions.forEach(function(callbackFunction) {
                callbackFunction(deltaTime);
            });
            RunHandler.oldUpdateRuntime = currentRuntime;
        });

        // onShade
        game.onShade(function() {
            let currentRuntime = game.runtime();
            let deltaTime = currentRuntime - RunHandler.oldShadeRuntime;
            RunHandler.onShadeFunctions.forEach(function(callbackFunction) {
                callbackFunction(deltaTime);
            });
            RunHandler.oldShadeRuntime = currentRuntime;
        });

        // onPaint
        game.onPaint(function() {
            let currentRuntime = game.runtime();
            let deltaTime = currentRuntime - RunHandler.oldPaintRuntime;
            RunHandler.onPaintFunctions.forEach(function(callbackFunction) {
                callbackFunction(deltaTime);
            });
            RunHandler.oldPaintRuntime = currentRuntime;
        });

        // onGameOver
        game.onGameOver(function(isWin) {
            let currentRuntime = game.runtime();
            let deltaTime = currentRuntime - RunHandler.oldGameOverRuntime;
            RunHandler.onGameOverFunctions.forEach(function(callbackFunction) {
                callbackFunction(deltaTime, isWin);
            });
            RunHandler.oldGameOverRuntime = currentRuntime;
        });
    }
}



// RunHandler namespace
namespace RunHandler {
    // onUpdate
    export namespace onUpdate {
        export function bind(callbackFunction: (deltaTime: number) => void) {
            RunHandler.onUpdateFunctions.push(callbackFunction)
        }
    }
    // onShade
    export namespace onShade {
        export function bind(callbackFunction: (deltaTime: number) => void) {
            RunHandler.onShadeFunctions.push(callbackFunction)
        }
    }
    // onPaint
    export namespace onPaint {
        export function bind(callbackFunction: (deltaTime: number) => void) {
            RunHandler.onPaintFunctions.push(callbackFunction)
        }
    }
    // onGameOver
    export namespace onGameOver {
        export function bind(callbackFunction: (deltaTime: number, isWin: boolean) => void) {
            RunHandler.onGameOverFunctions.push(callbackFunction)
        }
    }
}

RunHandler.main()
