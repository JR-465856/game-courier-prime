// RunHandler class
// Used for looping and game runtime handling and such
abstract class RunHandler {
    // Arrays that hold the functions for updates 
    private static onUpdateFunctions  : Array<(deltaTime: number) => void>;
    private static onShadeFunctions   : Array<(deltaTime: number) => void>;
    private static onPaintFunctions   : Array<(deltaTime: number) => void>;
    private static onGameOverFunctions: Array<(deltaTime: number, isWin: boolean) => void>;
    // Variables to calculate the delta time, we have these
    // variables because we want stuff not to lag (e.g. a 2 second
    // wait actually taking 2.5 seconds before "completion")
    private static oldUpdateRuntime  : number;
    private static oldShadeRuntime   : number;
    private static oldPaintRuntime   : number;
    private static oldGameOverRuntime: number;

    constructor() {
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

}