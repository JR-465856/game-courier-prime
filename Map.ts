abstract class InternalMap {
    public static grassTextures: Array<Image> = [
        assets.image`grass1`,
        assets.image`grass2`,
        assets.image`grass3`,
        assets.image`grass4`
    ];
    public static mapEffects: Array<Sprite> = [];
    public static mapEntityEffects: Array<Entity> = [];
    private static grassKind       = SpriteKind.create();
    private static waterKind       = SpriteKind.create();
    private static levelPortalKind = SpriteKind.create();
    private static currentLevel = 1;

    public static setLevel(newLevel: number) { InternalMap.currentLevel = newLevel;}
    public static getLevel() { return InternalMap.currentLevel;}

    public static getGrassKind() { return InternalMap.grassKind;}

    public static clearEffects() {
        for (let i of InternalMap.mapEffects) i.destroy();
        for (let i of InternalMap.mapEntityEffects) i.destroySprite();
    }
    
    /* Spawn player */
    public static spawnPlayer(tileReplace: Image) {
        tiles.placeOnRandomTile(Player.getEntity().getHitbox().getSprite(), assets.tile`plrspawn`);
        tiles.setTileAt(tiles.getRandomTileByType(assets.tile`plrspawn`), tileReplace);
    }

    /* Create effects */
    public static createEffects() {
        /* Tall grass detail */
        for (let i of tiles.getTilesByType(assets.tile`grass`)) {
            if (Math.percentChance(55) && tiles.tileAtLocationEquals(tiles.getTileLocation(i.col, i.row - 1), assets.tile`transparency16`)) {
                let spr = sprites.create(
                    InternalMap.grassTextures[randint(0, InternalMap.grassTextures.length - 1)],
                    InternalMap.grassKind
                );
                tiles.placeOnTile(spr, tiles.getTileLocation(i.col, i.row - 1));
                InternalMap.mapEffects.push(spr);
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
            `, InternalMap.waterKind);
            animation.runImageAnimation(spr, assets.animation`waterflowAnim`, 150, true);
            tiles.placeOnTile(spr, i);
            InternalMap.mapEffects.push(spr);
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
            `, InternalMap.waterKind);
            animation.runImageAnimation(spr, assets.animation`waterstillAnim`, 500, true);
            tiles.placeOnTile(spr, i);
            InternalMap.mapEffects.push(spr);
        }
        /* Randomize rusted shelves */
        for (let i of tiles.getTilesByType(assets.tile`RustedShelfRandom`)) {
            let ran = Math.randomRange(1, 10);
            switch (ran) {
                case 1:
                    tiles.setTileAt(i, assets.tile`RustedShelfItem1`); break;
                case 2:
                    tiles.setTileAt(i, assets.tile`RustedShelfItem2`); break;
                case 3:
                    tiles.setTileAt(i, assets.tile`RustedShelfItem3`); break;
                case 4:
                    tiles.setTileAt(i, assets.tile`RustedShelfItem4`); break;
                default:
                    tiles.setTileAt(i, assets.tile`RustedShelfEmpty`); break;
            }
        }
        /*** PIPE LEAKS ***/
        // TODO: Add particle emitters for the map, especially pipe leaks
        /* Water leaks */
        for (let i of tiles.getTilesByType(assets.tile`rustedpipecenterleakwater`)) {
            
        }
        /*** __________ ***/
    }

    /* Level 1 */
    public static level1() {
        scene.setBackgroundImage(assets.image`level1background`);
        tiles.setTilemap(tilemap`level1`);
        InternalMap.createEffects();

        /* Spawn player */
        InternalMap.spawnPlayer(assets.tile`transparency16`);
        /* Level portal */
        let level1Portal = new InternalMap.Portal();
        level1Portal.placeOnTileOfImage(assets.tile`levelPortal`, true);
        tiles.setTileAt(level1Portal.getPortalLocation(), assets.tile`postofficefrontdoor`);
        level1Portal.runOnActivation(Player.getHitboxKind(), function (spriteTouched: Sprite, portalSprite: Sprite) {
            /* Go to level 2 */
            InternalMap.clearEffects();
            InternalMap.level2();
            InternalMap.setLevel(2);
        });
    }

    /* Level 2 */
    public static level2() {
        scene.setBackgroundImage(assets.image`level2background`);
        tiles.setTilemap(tilemap`level2`);
        InternalMap.createEffects();

        /* Spawn player */
        InternalMap.spawnPlayer(assets.tile`postofficefrontdoor`);

        /* Scripted stairs */
        Controls.listen(Controls.Button.A, Controls.ButtonMode.press, function() {
            /* Variables */
            let plrSprite = Player.getPlayerSprite();
            let stairsLocation = plrSprite.tilemapLocation();
            /* Find the top of the stairs */
            if (tiles.tileAtLocationEquals(stairsLocation, assets.tile`postofficeinteriorscriptedstairsbottom`)) {
                for (let i = stairsLocation.row; i >= 0; i--) {
                    let testedLocation = tiles.getTileLocation(stairsLocation.column, i);
                    if (tiles.tileAtLocationEquals(testedLocation, assets.tile`postofficeinteriorscriptedstairstop`))
                        tiles.placeOnTile(plrSprite, testedLocation);
                }
            }
            /* Find the bottom of the stairs */
            if (tiles.tileAtLocationEquals(stairsLocation, assets.tile`postofficeinteriorscriptedstairstop`)) {
                for (let i = stairsLocation.row; i <= 1000; i++) {
                    let testedLocation = tiles.getTileLocation(stairsLocation.column, i);
                    if (tiles.tileAtLocationEquals(testedLocation, assets.tile`postofficeinteriorscriptedstairsbottom`))
                        tiles.placeOnTile(plrSprite, testedLocation);
                }
            }
        });

        /* Spawn brimnem */
        for (let i = 0; i < 3; i++) {
            let brimnem = new Brimnem();
            tiles.placeOnRandomTile(brimnem.getHitbox().getSprite(), assets.tile`spawn_brimnem`);
            tiles.setTileAt(brimnem.getHitbox().getSprite().tilemapLocation(), assets.tile`transparency16`);
        }
        /* Delete brimnem spawns */
        tiles.getTilesByType(assets.tile`spawn_brimnem`).forEach(function(location) {
            tiles.setTileAt(location, assets.tile`transparency16`)
        })
    }
}

/* Extra exports */
namespace InternalMap {
    /* Portal objects */
    export class Portal {
        private static portalArray: Array<InternalMap.Portal> = [];
        private sprKind = SpriteKind.create();
        private spr: Sprite;

        /* Constructor */
        constructor() {
            this.spr = sprites.create(assets.image`16x16levelportal`, this.sprKind);
            this.spr.setFlag(SpriteFlag.Invisible, true);
            InternalMap.Portal.portalArray.push(this);
        }

        /* Sprite and core functions */
        public destroy() { this.spr.destroy();}
        public getSprite() { return this.spr;}

        /* Placement */
        public setPortalLocation(newloc: tiles.Location) { tiles.placeOnTile(this.spr, newloc);}
        public getPortalLocation() { return this.spr.tilemapLocation();}
        public placeOnTileOfImage(tileImage: Image, removeTile: boolean) {
            tiles.placeOnRandomTile(this.spr, tileImage);
            if (removeTile) {
                tiles.setTileAt(this.spr.tilemapLocation(), assets.tile`transparency16`);
            }
        }

        /* Callbacks */
        public runOnActivation(otherKind: number, newfunc: (sprite: Sprite, portalSprite: Sprite) => void) {
            sprites.onOverlap(otherKind, this.sprKind, newfunc);
        }
    }
}

/* Driver code */
Player.initCallback(function() {
    InternalMap.level1();
})
