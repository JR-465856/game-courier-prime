abstract class Map {
    public static grassTextures: Array<Image> = [
        assets.image`grass1`,
        assets.image`grass2`,
        assets.image`grass3`,
        assets.image`grass4`
    ];
    public static mapEffects: Array<Sprite> = [];
    private static grassKind = SpriteKind.create();
    private static waterKind = SpriteKind.create();

    public static getGrassKind() { return Map.grassKind;}
    public static clearEffects() { for (let i of Map.mapEffects) i.destroy();}
    public static main() {
        scene.setBackgroundImage(assets.image`level1background`);
        tiles.setTilemap(tilemap`level1`);
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
        
        /* Spawn player */
        Player.initCallback(function () {
            tiles.placeOnRandomTile(Player.getPlayerSprite(), assets.tile`plrspawn`);
            tiles.setTileAt(tiles.getRandomTileByType(assets.tile`plrspawn`), assets.tile`transparency16`);
        })
    }
}

Map.main();