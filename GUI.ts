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
}