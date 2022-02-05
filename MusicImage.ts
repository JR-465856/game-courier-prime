/*
 Write and play music with images
 Images must be 21 pixels in height
 Notes are automatically scaled from 131 to 988,
meaning that images 3 pixels in height will can
either play notes of pitch 988 (highest pixels)
or notes of potch 131 (lowest pixels)
 Lowest row of the image holds the length of
the note by a color:
  1. 1/16
  2. 1/8
  3. 1/4
  4. 1/3
  5. 1/2
  6. 1
  7. 2
  8. 4
*/

abstract class MusicImage {
    public static playImage(toplay: Image) {
        for (let cx = 0; cx < toplay.width; cx++) {
            // Get note to play
            let np = 0;
            for(let i = 0; i < 21; i++) {
                let cp = toplay.getPixel(cx, i);
                if (cp != 0) {
                    np = 988-((20-i)*(857/20));
                }
            }
            // Get length of note
            let nlp = toplay.getPixel(cx, 20);
            let np;
            switch(nlp) {
                case 1:
                    nlp = BeatFraction.Sixteenth; break;
                case 2:
                    nlp = BeatFraction.Eigth; break;
                case 3:
                    nlp = BeatFraction.Quarter; break;
                case 4:
                    nlp = BeatFraction.Triplet; break;
                case 5:
                    nlp = BeatFraction.Half; break;
                case 6:
                    nlp = BeatFraction.Whole; break;
                case 7:
                    nlp = BeatFraction.Double; break;
                case 8:
                    nlp = BeatFraction.Breve; break;
            }
            // Play note
            if (np == 0) {
                music.playTone(np, nlp);
            } else {
                music.rest(nlp);
            }
        }
    }

    public static main() {
        game.forever(function() {
            MusicImage.playImage(assets.image`music1`);
        });
    }
}

MusicImage.main();