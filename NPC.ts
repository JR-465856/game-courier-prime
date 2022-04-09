abstract class NPC {
    protected sprite: Sprite;
    protected hitbox: NPC.Hitbox;

    protected animations: Array<NPC.Animation> = [];

    protected tickFuncs: Array<(obj: NPC) => void> = [];
    protected doTick = false; // By default does not tick
    protected tickAge = 0;

    public static npcList: Array<NPC> = [];

    constructor() {}

    //                          STATIC FUNCTIONS
    // Get NPC by sprite
    public static getNpcBySprite(target: Sprite) {
        let result;
        NPC.npcList.forEach(function(obj) {
            if (obj.getSprite() == target) result = obj;
        });
        return result;
    }
    
    //                          SPRITE FUNCTIONS
    // Create sprite
    public createSprite(image: Image, kind: number, hsx: number, hsy: number) {
        let sprite = sprites.create(image, kind);
        sprite.setFlag(SpriteFlag.Ghost, true);
        this.sprite = sprite;

        let hitbox = new NPC.Hitbox(sprite, hsx, hsy);
        this.hitbox = hitbox;

        return sprite;
    }

    // Get sprite
    public getSprite() { return this.sprite;}

    // Destroy sprite
    public destroySprite() {
        this.hitbox = null;
        NPC.npcList.forEach(function(obj, index) { if (obj == this) NPC.npcList.splice(index, 1);});
        this.onDestroy();
    }
    // For overriding: On destroySprite
    // WARNING: Ticking is by default disabled in the overridable method onDestroy.
    //          If onDestroy is overridden but ticking is never disabled in it,
    //          it will open up opportunies for lag and other undesirable problems.
    protected onDestroy(): void { this.sprite.destroy(); this.doTick = false;}

    //                          HITBOX FUNCTIONS
    // Get Hitbox
    public getHitbox() { return this.hitbox;}

    //                          POSITION FUNCTIONS
    // Set position
    public setPosition(x: any, y: any) {
        if (typeof x == "number") this.getHitbox().getSprite().x = x;
        if (typeof y == "number") this.getHitbox().getSprite().y = y;
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
    public getAnimation(name: string): NPC.Animation {
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

    //                          CAST FUNCTIONS
    // Cast for NPC
    public castForNPC(angRad: number, ox: number, oy: number, maxDistance: number): any {
        let sx = Math.cos(angRad); let sy = Math.sin(angRad);
        let ix = ox; let iy = oy;

        let castSprite = sprites.create(img`
            f
        `, NPC.castSpriteKind);
        castSprite.setPosition(ox, oy);
        castSprite.setFlag(SpriteFlag.Invisible, true);

        let found = false; let result; let resultDist = 0;
        for (let i = 1; i <= maxDistance; i++) {
            ix += sx; iy += sy;
            castSprite.setPosition(ix, iy);

            NPC.Hitbox.hitboxList.forEach(function(obj) {
                if (castSprite.overlapsWith(obj.getSprite())) {
                    result = NPC.getNpcBySprite(obj.getParent());
                    resultDist = i;
                    found = true;
                }
            });

            if (found) break;
        }

        castSprite.destroy();

        return {result: result, distance: resultDist};
    }

    //                          TICK FUNCTIONS
    // Run on tick
    public onTick(newFunc: (obj: NPC) => void) {
        this.tickFuncs.push(newFunc);
    }
    // Do tick
    public setTicking(opt: boolean) { this.doTick = opt;}
    // Get if the NPC is ticking
    public getTicking() { return this.doTick;}
    // Get tick age
    public getTickAge() { return this.tickAge;}
    // Main tick loop
    public static globalNPCTickLoop() {
        NPC.npcList.forEach(function(obj) {
            if (obj.getTicking()) {
                obj.tickAge += 1;
                obj.tickFuncs.forEach(function(func) { func(obj);})
            }
        });
    }
}

// Extra exports
namespace NPC {
    //                          Animation
    export class Animation {
        private parent: Sprite;
        private imgArray: Array<Image> = [];
        private name: string;

        private flippedX = false;
        private flippedY = false;

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

        // Set parent
        public setParent(client: Sprite) { this.parent = client;}
        // Get parent
        public getParent() { return this.parent;}

        // Play animation
        public play() {
            animation.runImageAnimation(
                this.parent,
                this.imgArray,
                this.interval,
                this.doLoop
            );
        }

        // Flip animation horizontally
        public flipX() {
            this.imgArray.forEach(function(image) { image.flipX();}); this.flippedX = !this.flippedX;
        }
        // Flip animation horizontally SET
        public flipXSet(doFlip: boolean) {
            // If already flipped and should not flip
            if (this.flippedX && !doFlip) {
                this.imgArray.forEach(function (image) { image.flipX();}); this.flippedX = doFlip;
            }
            // If not flipped and should flip
            if (!this.flippedX && doFlip) {
                this.imgArray.forEach(function (image) { image.flipX();}); this.flippedX = doFlip;
            }
        }
        // Flip animation vertically
        public flipY() {
            this.imgArray.forEach(function (image) { image.flipY(); });
            this.flippedY = !this.flippedY;
        }
        // Flip animation vertically SET
        public flipYSet(doFlip: boolean) {
            // If already flipped and should not flip
            if (this.flippedY && !doFlip) {
                this.imgArray.forEach(function (image) { image.flipY();}); this.flippedY = doFlip;
            }
            // If not flipped and should flip
            if (!this.flippedY && doFlip) {
                this.imgArray.forEach(function (image) { image.flipY(); }); this.flippedY = doFlip;
            }
        }
        // Get flipped horizontally
        public getFlippedX() { return this.flippedX;}
        // Get flipped vertically
        public getFlippedY() { return this.flippedY;}
    }

    //                          Hitbox
    export class Hitbox {
        private sprite: Sprite;
        private parent: Sprite;

        private pox: number;
        private poy: number;

        private static hitboxLoopRunning = false;
        public static hitboxList: Array<NPC.Hitbox> = [];

        // Constructor
        constructor(parent: Sprite, sx: number, sy: number) {
            let hitboxImage = image.create(sx, sy); hitboxImage.fill(5);
            let hitbox = sprites.create(hitboxImage, NPC.hitboxSpriteKind);
            hitbox.setFlag(SpriteFlag.Invisible, true);
            hitbox.x = parent.x; hitbox.y = parent.y;
            this.sprite = hitbox;
            this.parent = parent;
            NPC.Hitbox.hitboxList.push(this);
        }

        // Get hitbox sprite
        public getSprite() { return this.sprite;}
        // Get parent
        public getParent() { return this.parent;}
        // Get size
        public getSize() { return { x: this.sprite.image.width, y: this.sprite.image.height};}
        
        // Set parent sprite offset from hitbox
        public setParentOffset(x: any, y: any) {
            if (typeof x == "number") this.pox = x;
            if (typeof y == "number") this.poy = y;
        }
        // Get parent sprite offset from hitbox
        public getParentOffset() { return {x: this.pox, y: this.poy};}

        // Main position loop
        public static hitboxPositionLoop() {
            NPC.Hitbox.hitboxList.forEach(function (obj, index) {
                if ((obj == null) || (obj == undefined) || (obj.getParent() == null) || (obj.getParent() == undefined)) { NPC.Hitbox.hitboxList.splice(index, 1); return; }
                obj.getParent().x = obj.getSprite().x + obj.getParentOffset().x;
                obj.getParent().y = obj.getSprite().y + obj.getParentOffset().y;
            })
        }
    }

    // Tick loops
    game.onUpdate(function() { Hitbox.hitboxPositionLoop();});
    game.onUpdateInterval(50, function() { NPC.globalNPCTickLoop();});

    // Sprite kinds
    export const hitboxSpriteKind = SpriteKind.create();
    export const castSpriteKind = SpriteKind.create();
}






//                              LEVEL 2 ZOMBIE NPC
class Brimnem extends NPC {
    protected brimnemKind = SpriteKind.create();

    constructor() {
        super();

        this.createSprite(assets.image`brimnemDefault`, this.brimnemKind, 10, 14);
        this.getHitbox().getSprite().ay = 150;
        this.getHitbox().setParentOffset(0, -1);

        // Idle animation
        let idleAnim = this.createAnimation("idle");
        idleAnim.setInterval(600);
        idleAnim.setLoop(true);
        idleAnim.setParent(this.getSprite());
        idleAnim.setFrames(assets.animation`brimnemAnimIdle`);
        idleAnim.play();

        // On tick
        this.onTick(function(obj) {
            this.castForNPC()
        })

        return this;
    }

    // On destroy
    // @Override
    protected onDestroy() {
        
    }
}