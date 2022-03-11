abstract class NPC {
    protected sprite: Sprite;
    protected animations: Array<NPC.Animation> = [];

    constructor() {}

    //                          SPRITE FUNCTIONS
    // Create sprite
    public createSprite(image: Image, kind: number) {
        let sprite = sprites.create(image, kind);
        this.sprite = sprite;
        return sprite;
    }

    // Get sprite
    public getSprite() { return this.sprite;}

    // Destroy sprite
    public destroySprite() { this.onDestroy();}
    // For overriding: On destroySprite
    protected onDestroy() { this.sprite.destroy();}

    //                          POSITION FUNCTIONS
    // Set position
    public setPosition(x: any, y: any) {
        if (typeof x == "number") this.sprite.x = x;
        if (typeof y == "number") this.sprite.y = y;
    }
    // Get position
    public getPosition() {
        return {
            x: this.sprite.x,
            y: this.sprite.y
        };
    }

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
        return toreturn;
    }
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
}