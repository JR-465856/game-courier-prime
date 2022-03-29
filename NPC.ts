abstract class NPC {
    protected sprite: Sprite;
    protected hitbox: Sprite;
    protected animations: Array<NPC.Animation> = [];
    private hitboxList: Array<{hitbox: Sprite, parent: Sprite}> = [];

    constructor() {}

    //                          SPRITE FUNCTIONS
    // Create sprite
    public createSprite(image: Image, kind: number) {
        let sprite = sprites.create(image, kind);
        sprite.setFlag(SpriteFlag.Ghost, true);

        this.sprite = sprite;
        return sprite;
    }

    // Get sprite
    public getSprite() { return this.sprite;}

    // Destroy sprite
    public destroySprite() { this.onDestroy();}
    // For overriding: On destroySprite
    protected onDestroy() { this.sprite.destroy();}

    //                          HITBOX FUNCTIONS
    // Set hitbox
    public setHitbox(sizeX: number, sizeY: number) {
        let hitboxImage = image.create(sizeX, sizeY); hitboxImage.fill(5);
        let hitbox = sprites.create(hitboxImage, NPC.hitboxSpriteKind);
        hitbox.setFlag(SpriteFlag.Invisible, true);
        hitbox.x = this.sprite.x; hitbox.y = this.sprite.y;
    }
    // Remove hitbox
    public removeHitbox() { this.hitbox.destroy();}
    // Get hitbox size
    public getHitboxSize() { return { x: this.hitbox.image.width, y: this.hitbox.image.height};}
    // Get hitbox sprite
    public getHitboxSprite() { return this.hitbox == null ? false : this.hitbox;}
    
    // Hitbox position loop
    public hitboxPositionLoop() {
        this.hitboxList.forEach(function(obj, index) {
            if ((obj.hitbox == null) || obj == undefined) { this.hitboxList[index] = undefined; return;}
            obj.hitbox.x = obj.parent.x; obj.hitbox.y = obj.parent.y;
        })
    }

    //                          POSITION FUNCTIONS
    // Set position
    public setPosition(x: any, y: any) {
        if (typeof x == "number") this.sprite.x = x;
        if (typeof y == "number") this.sprite.y = y;
    }
    // Get position
    public getPosition() { return { x: this.sprite.x, y: this.sprite.y};}

    //                          PHYSICS FUNCTIONS
    // Set velocity
    public setVelocity(vx: any, vy:any) {
        if (typeof vx == "number") this.sprite.vx = vx;
        if (typeof vy == "number") this.sprite.vy = vy;
    }
    // Get velocity
    public getVelocity() { return { vx: this.sprite.vx, vy: this.sprite.vy};}

    //                          ANIMATION FUNCTIONS
    // Create animation
    public createAnimation(name: string) {
        let newAnimation = new NPC.Animation(name);
        this.animations.push(newAnimation);
        return newAnimation;
    }
    // Get animation
    public getAnimation(name: string) {
        let toreturn;
        this.animations.forEach(function(v, k) {
            if (v.getName() == name) toreturn = v;
        })
        if (toreturn == null) throw "Animation " + name + " does not exist";
        return toreturn;
    }
    // Stop animations
    public stopAnimations() { animation.stopAnimation(animation.AnimationTypes.All, this.sprite);}

    //                          IMAGE FUNCTIONS
    // Set image
    public setImage(image: Image) { this.sprite.setImage(image);}
    // Get image
    public getImage() { return this.sprite.image;}
}

// Extra exports
namespace NPC {
    // Animation
    export class Animation {
        private client: Sprite;
        private imgArray: Array<Image> = [];
        private name: string;

        private interval = 500;
        private doLoop = false;

        constructor(name: string) {
            this.name = name;
        }

        // Set name
        public setName(name: string) { this.name = name;}
        // Get name
        public getName() { return this.name;}

        // Add frame
        public addFrame(frame: Image) { this.imgArray.push(frame);}
        // Set frames
        public setFrames(frameArray: Array<Image>) { this.imgArray = frameArray;}
        // Get frames
        public getFrames() { return this.imgArray;}

        // Set interval
        public setInterval(interval: number) { this.interval = interval;}
        // Get interval
        public getInterval() { return this.interval;}
        // Set loop
        public setLoop(loop: boolean) { this.doLoop = loop;}
        // Get loop
        public getLoop() { return this.doLoop;}

        // Set client
        public setClient(client: Sprite) { this.client = client;}
        // Get client
        public getClient() { return this.client;}

        // Play animation
        public play() {
            animation.runImageAnimation(
                this.client,
                this.imgArray,
                this.interval,
                this.doLoop
            );
        }
    }

    // Sprite kinds
    export const hitboxSpriteKind = SpriteKind.create();
}