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
            let notePitch = 0;
            for(let i = 0; i < 20; i++) {
                let cp = toplay.getPixel(cx, i);
                if (cp != 0) {
                    notePitch = 988-(i*(857/20));
                    break
                }
            }
            // Get length of note
            let inLen = toplay.getPixel(cx, 20);
            let noteLength;
            switch(inLen) {
                case 1:
                    noteLength = BeatFraction.Sixteenth; break;
                case 2:
                    noteLength = BeatFraction.Eighth; break;
                case 3:
                    noteLength = BeatFraction.Quarter; break;
                case 4:
                    noteLength = BeatFraction.Triplet; break;
                case 5:
                    noteLength = BeatFraction.Half; break;
                case 6:
                    noteLength = BeatFraction.Whole; break;
                case 7:
                    noteLength = BeatFraction.Double; break;
                case 8:
                    noteLength = BeatFraction.Breve; break;
            }
            // Play note
            if (notePitch != 0) {
                music.playTone(notePitch, music.beat(noteLength));
            } else {
                music.rest(music.beat(noteLength));
            }
            console.logValue("Pitch", notePitch);
            console.logValue("Length", inLen);
        }
    }

    public static main() {
        game.forever(function() {
            MusicImage.playImage(assets.image`music2`);
            MusicImage.playImage(assets.image`music1`);
        });
    }
}

MusicImage.main();