abstract class Entity {
    protected sprite: Sprite;
    protected hitbox: Entity.Hitbox;

    protected animations: Array<Entity.Animation> = [];

    protected tickFuncs: Array<(obj: Entity) => void> = [];
    protected doTick = false; // By default does not tick
    protected tickAge = 0;

    public static entityList: Array<Entity>;

    constructor() {
        if (Entity.entityList == undefined) Entity.entityList = [];
        Entity.entityList.push(this);
    }

    //                          STATIC FUNCTIONS
    // Get entity by sprite
    public static getEntityBySprite(target: Sprite) {
        let result;
        Entity.entityList.forEach(function(obj) {
            if (obj.getSprite() == target) { result = obj; console.log(obj);}
        });
        return result;
    }
    // Get entity by hitbox sprite
    // WARNING: 
    public static getEntityByHitboxSprite(target: Sprite) {
        let result;
        Entity.Hitbox.hitboxList.forEach(function(obj) {
            if (obj.getSprite() == target) {
                Entity.entityList.forEach(function(entObj) {
                    if (entObj.getHitbox() == obj) { result = entObj;}
                })
            }
        });
        return result;
    }

    //                          SPRITE FUNCTIONS
    // Create sprite
    public createSprite(image: Image, kind: number, hsx: number, hsy: number) {
        let sprite = sprites.create(image, kind);
        sprite.setFlag(SpriteFlag.Ghost, true);
        this.sprite = sprite;

        let hitbox = new Entity.Hitbox(sprite, hsx, hsy);
        this.hitbox = hitbox;

        return sprite;
    }

    // Get sprite
    public getSprite() { return this.sprite; }

    // Destroy sprite
    public destroySprite() {
        this.hitbox = null;
        Entity.entityList.forEach(function (obj, index) { if (obj == this) Entity.entityList.splice(index, 1); });
        this.onDestroy();
    }
    // For overriding: On destroySprite
    // WARNING: Ticking is by default disabled in the overridable method onDestroy.
    //          If onDestroy is overridden but ticking is never disabled in it,
    //          it will open up opportunies for lag and other undesirable problems.
    protected onDestroy(): void { this.sprite.destroy(); this.doTick = false;}

    //                          HITBOX FUNCTIONS
    // Get Hitbox
    public getHitbox() { return this.hitbox; }

    //                          POSITION FUNCTIONS
    // Set position
    public setPosition(x: any, y: any) {
        if (typeof x == "number") this.getHitbox().getSprite().x = x;
        if (typeof y == "number") this.getHitbox().getSprite().y = y;
    }
    // Get position
    public getPosition() { return { x: this.sprite.x, y: this.sprite.y }; }

    //                          PHYSICS FUNCTIONS
    // Set velocity
    public setVelocity(vx: any, vy: any) {
        if (typeof vx == "number") this.sprite.vx = vx;
        if (typeof vy == "number") this.sprite.vy = vy;
    }
    // Get velocity
    public getVelocity() { return { vx: this.sprite.vx, vy: this.sprite.vy }; }

    //                          ANIMATION FUNCTIONS
    // Create animation
    public createAnimation(name: string) {
        let newAnimation = new Entity.Animation(name);
        this.animations.push(newAnimation);
        return newAnimation;
    }
    // Get animation
    public getAnimation(name: string): Entity.Animation {
        let toreturn;
        this.animations.forEach(function (v, k) {
            if (v.getName() == name) toreturn = v;
        })
        if (toreturn == null) throw "Animation " + name + " does not exist";
        return toreturn;
    }
    // Stop animations
    public stopAnimations() { animation.stopAnimation(animation.AnimationTypes.All, this.sprite); }

    //                          IMAGE FUNCTIONS
    // Set image
    public setImage(image: Image) { this.sprite.setImage(image); }
    // Get image
    public getImage() { return this.sprite.image; }

    //                          CAST FUNCTIONS
    // Cast for entity
    public castForEntity(angRad: number, ox: number, oy: number, maxDistance: number, filterFunc: (obj: Entity) => boolean): any {
        let sx = Math.cos(angRad); let sy = Math.sin(angRad);
        let ix = ox; let iy = oy;
        let castSprite = sprites.create(img`
            5 5 5 5 5 5 5 5
            5 5 5 5 5 5 5 5
            5 5 5 5 5 5 5 5
            5 5 5 5 5 5 5 5
            5 5 5 5 5 5 5 5
            5 5 5 5 5 5 5 5
            5 5 5 5 5 5 5 5
            5 5 5 5 5 5 5 5
        `, Entity.castSpriteKind);
        castSprite.setPosition(ox, oy);
        castSprite.setFlag(SpriteFlag.Invisible, true);
        // castSprite.startEffect(effects.trail);

        let found = false; let result; let resultDist = 0;
        for (let i = 1; i <= maxDistance; i++) {
            ix += sx; iy += sy;
            castSprite.setPosition(ix, iy);
            Entity.Hitbox.hitboxList.forEach(function(obj) {
                let foundEntity = Entity.getEntityByHitboxSprite(obj.getSprite());
                // Filter function
                if (castSprite.overlapsWith(obj.getSprite()) && filterFunc(foundEntity) && foundEntity != this) {
                    result = foundEntity;
                    resultDist = i;
                    found = true;
                }
            });

            if (found) break;
        }

        castSprite.destroy();

        return { result: result, distance: resultDist };
    }

    //                          TICK FUNCTIONS
    // Run on tick
    public onTick(newFunc: (obj: Entity) => void) {
        this.tickFuncs.push(newFunc);
    }
    // Do tick
    public setTicking(opt: boolean) { this.doTick = opt; }
    // Get if the entity is ticking
    public getTicking() { return this.doTick; }
    // Get tick age
    public getTickAge() { return this.tickAge; }
    // Main tick loop
    public static globalNPCTickLoop() {
        Entity.entityList.forEach(function (obj) {
            if (obj.getTicking()) {
                obj.tickAge += 1;
                obj.tickFuncs.forEach(function (func) { func(obj); })
            }
        });
    }
}

// Extra exports
namespace Entity {
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
        public setName(name: string) { this.name = name; }
        // Get name
        public getName() { return this.name; }

        // Add frame
        public addFrame(frame: Image) { this.imgArray.push(frame); }
        // Set frames
        public setFrames(frameArray: Array<Image>) { this.imgArray = frameArray; }
        // Get frames
        public getFrames() { return this.imgArray; }

        // Set interval
        public setInterval(interval: number) { this.interval = interval; }
        // Get interval
        public getInterval() { return this.interval; }
        // Set loop
        public setLoop(loop: boolean) { this.doLoop = loop; }
        // Get loop
        public getLoop() { return this.doLoop; }

        // Set parent
        public setParent(client: Sprite) { this.parent = client; }
        // Get parent
        public getParent() { return this.parent; }

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
            this.imgArray.forEach(function (image) { image.flipX(); }); this.flippedX = !this.flippedX;
        }
        // Flip animation horizontally SET
        public flipXSet(doFlip: boolean) {
            // If already flipped and should not flip
            if (this.flippedX && !doFlip) {
                this.imgArray.forEach(function (image) { image.flipX(); }); this.flippedX = doFlip;
            }
            // If not flipped and should flip
            if (!this.flippedX && doFlip) {
                this.imgArray.forEach(function (image) { image.flipX(); }); this.flippedX = doFlip;
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
                this.imgArray.forEach(function (image) { image.flipY(); }); this.flippedY = doFlip;
            }
            // If not flipped and should flip
            if (!this.flippedY && doFlip) {
                this.imgArray.forEach(function (image) { image.flipY(); }); this.flippedY = doFlip;
            }
        }
        // Get flipped horizontally
        public getFlippedX() { return this.flippedX; }
        // Get flipped vertically
        public getFlippedY() { return this.flippedY; }
    }

    //                          Hitbox
    export class Hitbox {
        private sprite: Sprite;
        private parent: Sprite;

        private pox: number = 0;
        private poy: number = 0;

        private static hitboxLoopRunning = false;
        public static hitboxList: Array<Entity.Hitbox>;

        // Constructor
        constructor(parent: Sprite, sx: number, sy: number) {
            if (Entity.Hitbox.hitboxList == undefined) Entity.Hitbox.hitboxList = [];

            let hitboxImage = image.create(sx, sy); hitboxImage.fill(5);
            let hitbox = sprites.create(hitboxImage, Entity.hitboxSpriteKind);
            hitbox.setFlag(SpriteFlag.Invisible, true);
            hitbox.x = parent.x; hitbox.y = parent.y;
            this.sprite = hitbox;
            this.parent = parent;
            Entity.Hitbox.hitboxList.push(this);
        }

        // Get hitbox sprite
        public getSprite() { return this.sprite; }
        // Get parent
        public getParent() { return this.parent; }
        // Get size
        public getSize() { return { x: this.sprite.image.width, y: this.sprite.image.height }; }

        // Set parent sprite offset from hitbox
        public setParentOffset(x: any, y: any) {
            if (typeof x == "number") this.pox = x;
            if (typeof y == "number") this.poy = y;
        }
        // Get parent sprite offset from hitbox
        public getParentOffset() { return { x: this.pox, y: this.poy }; }

        // Main position loop
        public static hitboxPositionLoop() {
            Entity.Hitbox.hitboxList.forEach(function(obj, index) {
                if ((obj == null) || (obj == undefined) || (obj.getParent() == null) || (obj.getParent() == undefined)) { Entity.Hitbox.hitboxList.splice(index, 1); return; }
                obj.getParent().x = obj.getSprite().x + obj.getParentOffset().x;
                obj.getParent().y = obj.getSprite().y + obj.getParentOffset().y;
            })
        }
    }

    // Tick loops
    game.onUpdate(function() { Hitbox.hitboxPositionLoop();});
    game.onUpdateInterval(50, function() { Entity.globalNPCTickLoop();});

    // Sprite kinds
    export const hitboxSpriteKind = SpriteKind.create();
    export const castSpriteKind = SpriteKind.create();
}






//                              BRIMNEM
class Brimnem extends Entity {
    protected brimnemKind = SpriteKind.create();
    protected targetFound = false;

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
        // Walk animation
        let walkAnim = this.createAnimation("walk");
        walkAnim.setInterval(100);
        walkAnim.setLoop(true);
        walkAnim.setParent(this.getSprite());
        walkAnim.setFrames(assets.animation`brimnemAnimWalk`);

        // On tick
        this.setTicking(true);
        this.onTick(function(obj) {
            // Check if the player is in sight every second
            if ((obj.getTickAge() % 20) == 0) {
                // Function for when the player has been found
                let foundEntity = null;
                let onPlayerFound = function() {
                    if (!this.targetFound) {    // If the target has not been acquired
                        this.targetFound = true;
                        // Shake the camera
                        music.sonar.play()
                    } else {                    // If the target has been acquired
                        this.getAnimation("walk").play();
                    }
                }

                // Cast for player (right)
                foundEntity = obj.castForEntity(
                    0,
                    obj.getPosition().x,
                    obj.getPosition().y,
                    80,
                    function(obj) { if (obj == Player.getEntity()) {return true;} else {return false;}}
                ).result;
                if (foundEntity == Player.getEntity()) { onPlayerFound();} else {
                    // Cast for player (left)
                    foundEntity = obj.castForEntity(
                        Math.PI,
                        obj.getPosition().x,
                        obj.getPosition().y,
                        80,
                        function (obj) { if (obj == Player.getEntity()) { return true;} else { return false;}}
                    ).result;
                    if (foundEntity == Player.getEntity()) { onPlayerFound();} else if (this.targetFound) {
                        // If target acquired before, stop aggression
                        this.targetFound = false;
                        this.getAnimation("idle").play();
                    }
                }
            }
            // Follow if target acquired
            let spr = obj.getHitbox().getSprite();
            let plr = Player.getPlayerSprite();
            if (this.targetFound) {
                let vd = Math.sign(plr.x - spr.x);
                spr.vx = 20 * vd;
                this.getAnimation("idle").flipXSet(vd == -1);
                this.getAnimation("walk").flipXSet(vd == -1);
            } else {
                spr.vx = 0;
            }
        })

        return this;
    }

    // On destroy
    // @Override
    protected onDestroy() {
        this.sprite.destroy();
        this.doTick = false;
    }
}





// TODO: Allow for the particles to be accessed to do other physics and such
// TODO: Make it possible to change the sprite kind of the particles
//                              PARTICLE EMITTER
class ParticleEmitter extends Entity {
    protected static particleSpriteKind = SpriteKind.create();
    protected curParticleArray: Array<{particleSprite: Sprite, lifetime: number}> = [];
    // All angle measures are in radians
    // All time measures are in ticks
    public active            = false; // Automatically generate particles by ticks
    public particle          = img`
        5 . 5 . 5
        . 5 5 5 .
        5 5 5 5 5
        . 5 5 5 .
        5 . 5 . 5
    ` // Image of the particle
    public emitRate          = 10; // How many ticks between every time particle(s) are generated
    public particlesPerEmit  = 1; // How many particles to create per tick
    public angle             = Math.PI/2; // Initial angle of the particles
    public speed             = 10; // Initial speed of the particles
    public lifetime          = 200; // How many ticks the particles will survive for
    public spreadAngle       = Math.PI/18; // Maximum angle to spread particles at
    public acceleration      = 0; // Speed to accelerate particles at
    public accelerationAngle = 0; // Angle to accelerate particles at
    public doWallCollisions  = false; // Whether to collide with walls or not
    public doSpriteGhost     = true; // Whether to ghost particle sprites or not

    // Constructor
    constructor(
        active           : boolean,
        particle         : Image,
        emitRate         : number,
        particlesPerEmit : number,
        angle            : number,
        speed            : number,
        lifetime         : number,
        spreadAngle      : number,
        acceleration     : number,
        accelerationAngle: number,
        doWallCollisions : boolean,
        doSpriteGhost    : boolean
    ) {
        super();

        // Set properties
        this.active            = active;
        this.particle          = particle;
        this.emitRate          = emitRate;
        this.particlesPerEmit  = particlesPerEmit;
        this.angle             = angle;
        this.speed             = speed;
        this.lifetime          = lifetime;
        this.spreadAngle       = spreadAngle;
        this.acceleration      = acceleration;
        this.accelerationAngle = accelerationAngle;
        this.doWallCollisions  = doWallCollisions;
        this.doSpriteGhost     = doSpriteGhost;

        // On Tick
        this.doTick = true;
        this.onTick(function(thisEmitter) {
            // Emit particles if enabled and emit rate matches with current tick age
            if (this.active && (thisEmitter.getTickAge() % this.emitRate) == 0) {
                this.emit(this.particlesPerEmit);
            }
            // Clear particles with no lifetime left
            this.curParticleArray.forEach(function (obj: {particleSprite: Sprite, lifetime: number}, index: number) {
                if (obj == null) return;
                obj.lifetime += -1;
                if (obj.lifetime <= 0) {
                    obj.particleSprite.destroy();
                    this.curParticleArray[index] = null;
                }
            });
        });

        return this;
    }

    // Emit particle
    public emit(particleAmount: number) {
        for (let i = 1; i <= particleAmount; i++) {
            let particleSprite = sprites.create(this.particle, ParticleEmitter.particleSpriteKind);
            // Set flags
            particleSprite.setFlag(SpriteFlag.GhostThroughWalls, this.doWallCollisions);
            particleSprite.setFlag(SpriteFlag.Ghost, this.doSpriteGhost);
            // Set velocity with spread angle
            let fva = this.angle + Math.randomRange(this.spreadAngle * -1, this.spreadAngle)
            let vx = Math.cos(fva)*this.speed; particleSprite.vx = vx;
            let vy = Math.sin(fva)*this.speed; particleSprite.vy = vy;
            // Set acceleration
            let ax = Math.cos(this.accelerationAngle) * this.acceleration; particleSprite.ax = ax;
            let ay = Math.sin(this.accelerationAngle) * this.acceleration; particleSprite.ay = ay;
            // Push to particle array
            this.curParticleArray.push({particleSprite: particleSprite, lifetime: this.lifetime});
        }
    }
}
