abstract class Map {
    public static grassTextures: Array<Image> = [
        assets.image`grass1`,
        assets.image`grass2`,
        assets.image`grass3`,
        assets.image`grass4`
    ];
    public static mapEffects: Array<Sprite> = [];
    private static grassKind       = SpriteKind.create();
    private static waterKind       = SpriteKind.create();
    private static levelPortalKind = SpriteKind.create();
    private static currentLevel = 1;

    public static setLevel(newLevel: number) { Map.currentLevel = newLevel;}
    public static getLevel() { return Map.currentLevel;}

    public static getGrassKind() { return Map.grassKind;}
    public static clearEffects() { for (let i of Map.mapEffects) i.destroy();}
    
    /* Spawn player */
    public static spawnPlayer(tileReplace: Image) {
        tiles.placeOnRandomTile(Player.getPlayerSprite(), assets.tile`plrspawn`);
        tiles.setTileAt(tiles.getRandomTileByType(assets.tile`plrspawn`), tileReplace);
    }

    /* Create effects */
    public static createEffects() {
        /* Tall grass detail */
        for (let i of tiles.getTilesByType(assets.tile`grass`)) {
            if (Math.percentChance(55) && tiles.tileAtLocationEquals(tiles.getTileLocation(i.col, i.row - 1), assets.tile`transparency16`)) {
                let spr = sprites.create(
                    Map.grassTextures[randint(0, Map.grassTextures.length - 1)],
                    Map.grassKind
                );
                tiles.placeOnTile(spr, tiles.getTileLocation(i.col, i.row - 1));
                Map.mapEffects.push(spr);
            }
        }
        /* Flowing water detail */
        for (let i of tiles.getTilesByType(assets.tile`waterflow`)) {
            let spr = sprites.create(img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
            `, Map.waterKind);
            animation.runImageAnimation(spr, assets.animation`waterflowAnim`, 150, true);
            tiles.placeOnTile(spr, i);
            Map.mapEffects.push(spr);
        }
        /* Still water detail */
        for (let i of tiles.getTilesByType(assets.tile`waterstill`)) {
            let spr = sprites.create(img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
            `, Map.waterKind);
            animation.runImageAnimation(spr, assets.animation`waterstillAnim`, 500, true);
            tiles.placeOnTile(spr, i);
            Map.mapEffects.push(spr);
        }
    }

    /* Level 1 */
    public static level1() {
        scene.setBackgroundImage(assets.image`level1background`);
        tiles.setTilemap(tilemap`level1`);
        Map.createEffects();

        /* Spawn player */
        Map.spawnPlayer(assets.tile`transparency16`);
        /* Level portal */
        let level1Portal = new Map.Portal();
        level1Portal.placeOnTileOfImage(assets.tile`levelPortal`, true);
        level1Portal.runOnActivation(Player.getPlayerSpriteKind(), function (spriteTouched: Sprite, portalSprite: Sprite) {
             /* Go to level 2 */
             Map.clearEffects();
             Map.level2();
             Map.setLevel(2);
        });
    }

    /* Level 2 */
    public static level2() {
        scene.setBackgroundImage(assets.image`level2background`);
        tiles.setTilemap(tilemap`level2`);
        Map.createEffects();

        /* Spawn player */
        Map.spawnPlayer(assets.tile`postofficefrontwallback`);

        /* Scripted stairs */

        scene.onOverlapTile(Player.getPlayerSpriteKind(), assets.tile`postofficeinteriorscriptedstairsbottom`, function(plrSprite: Sprite, stairsLocation: tiles.Location) {
            /* Find the top of the stairs */
            for (let i = stairsLocation.row; i >= 0; i--) {
                let testedLocation = tiles.getTileLocation(stairsLocation.column, i);
                if (tiles.tileAtLocationEquals(testedLocation, assets.tile`postofficeinteriorscriptedstairstop`))
                    tiles.placeOnTile(plrSprite, testedLocation);
            }
        })
    }
}

/* Extra exports */
namespace Map {
    /* Portal objects */
    export class Portal {
        private static portalArray: Array<Map.Portal> = [];
        private sprKind = SpriteKind.create();
        private spr: Sprite;

        /* Constructor */
        constructor() {
            this.spr = sprites.create(assets.image`16x16levelportal`, this.sprKind);
            this.spr.setFlag(SpriteFlag.Invisible, true);
            Map.Portal.portalArray.push(this);
        }

        /* Sprite and core functions */
        public destroy() { this.spr.destroy();}
        public getSprite() { return this.spr;}

        /* Placement */
        public setPortalLocation(newloc: tiles.Location) { tiles.placeOnTile(this.spr, newloc);}
        public placeOnTileOfImage(tileImage: Image, removeTile: boolean) {
            tiles.placeOnRandomTile(this.spr, tileImage);
            if (removeTile) {
                tiles.setTileAt(this.spr.tilemapLocation(), assets.tile`transparency16`);
            }
        }

        /* Callbacks */
        public runOnActivation(otherKind: number, newfunc: (spriteTouched: Sprite, portalSprite: Sprite) => void) {
            sprites.onOverlap(otherKind, this.sprKind, newfunc);
        }
    }
}

/* Driver code */
Player.initCallback(function() {
    Map.level1();
})