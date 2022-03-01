class GUI {
    private spr: Sprite;
    private hidden = true;

    constructor() {
        this.spr = new Sprite(image.create(1, 1));
        this.spr.setFlag(SpriteFlag.RelativeToCamera, true);
        this.spr.setFlag(SpriteFlag.Invisible, true);
        this.spr.setFlag(SpriteFlag.Ghost, true);
    }
    public setImage(newimg: Image) { this.spr.setImage(newimg);}
    public getImage() { return this.spr.image;}
    public hide() { this.hidden = true;  this.spr.setFlag(SpriteFlag.Invisible, true); }
    public show() { this.hidden = false; this.spr.setFlag(SpriteFlag.Invisible, false);}
    public isHidden() { return this.hidden;}
    public destroy() { this.spr.destroy();}
    
    public setPos(newx: number, newy: number) { this.spr.setPosition(newx, newy);}
    public setX(newx: number) { this.spr.x = newx;}
    public setY(newy: number) { this.spr.y = newy;}
    public getPos() { return {x: this.spr.x, y: this.spr.y};}
    public getX() { return this.spr.x;}
    public getY() { return this.spr.y;}

    public static main() {
        Player.initCallback(function() {
            /* Game print */
            game.onPaint(function() {
                console.log(game.runtime())
                /* Title */
                if (game.runtime() < 1300)
                    screen.printCenter(
                        "Courier Prime".substr(0, game.runtime() / 100),
                        5, 1, image.font8);
                if (game.runtime() >= 1300 && game.runtime() <= 5000)
                    screen.printCenter(
                        "Courier Prime",
                        5, 1, image.font8);
                if (game.runtime() > 5000 && game.runtime() < 6300)
                    screen.printCenter(
                        "Courier Prime".substr(0, 63 - game.runtime() / 100),
                        5, 1, image.font8);

                if (game.runtime() >= 6300 && game.runtime() < 8400)
                    screen.printCenter(
                        "Get to the laboratory".substr(0, game.runtime() / 100 - 63),
                        5, 10, image.font8);
                if (game.runtime() >= 8400 && game.runtime() < 12100)
                    screen.printCenter(
                        "Get to the laboratory",
                        5, 10, image.font8);
                if (game.runtime() > 12100 && game.runtime() < 14300)
                    screen.printCenter(
                        "Get to the laboratory".substr(0, 144 - game.runtime() / 100),
                        5, 10, image.font8);
            })


            /* Controls */
            let controlsGUI = new GUI();
            controlsGUI.setImage(img`
                .66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666.
                6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                666fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ff11ffffffffff1ffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666f1fffffffffff111fffffffff1ff11fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666f1ffff1ff11fff1ff111ff1ff1f11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666f1fff1f1f1f1ff1ff1fff1f1f1fff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ff11ff1ff1f1fff1f1ffff1ff1f11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666fffffffffffffff2fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ffffffffffffff222ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ffffffffffffff222ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666fffffffffffff22222fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666fffffffffff2fffffff2fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666fffffffff222fffffff222fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ffffffff2222fff1fff2222ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666fffffffff222fff1fff222fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666fffffffffff2fff1fff2fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666fffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ffffffffff1ffff1ffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ffffffffff1ffff1ffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ffffffffff1ffff1ffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ffffffffff1ffff1ffff1ffffffffffffffffffffffffffffffffff11ff1ff1ff1ffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ffffffffff1ffff1ffff1ffffffffffffffffffffffffffffffffff1f1fff1f1f1fff111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ffffffffff1ffff1ffff1ffffffffffffffffffffffffffffffffff11ff1f111f11fff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ffffffffff1ffff1ffff1111111111111111111111111111111111f11ff1fff1f1f1ff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ffffffffff1ffff1fffffffffffffffffffffffffffffffffffffff1f1f1f11ff1f1fff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ffffffffff1ffff1fffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ffffffffff1ffff1fffffffffffffffffffffffffff1fffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ffffffffff1ffff1fffffffffffffffffffffffffff1f1f1f1111f1f1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ffffffffff1ffff1111111111111111111111111f1f1f1f1f1111f11fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ffffffffff1fffffffffffffffffffffffffffffff1fff11f1ff1f1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ffffffffff1ffffffffffff1ffff1fff11ff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ffffffffff1ffffffffffff1fff1f1ff1ff111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ffffffffff1ffffffffffff1fff111f111ff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666ffffffffff111111111111f1fff1ffff1fff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666fffffffffffffffffffffff111ff11ff1ffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                666fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666
                6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                .66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666.
            `);
            controlsGUI.setPos(160 / 2, 95);
            controlsGUI.show();
            controller.pauseUntilAnyButtonIsPressed();
            controlsGUI.destroy();
        })
    }
}

GUI.main();