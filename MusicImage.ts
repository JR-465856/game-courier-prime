/*
  Write and play music with images
  Images must be at least 2 pixels in height
  Multiple tracks can be played at once, allowing
for notes to be played at the same time
  Notes are automatically scaled from 131 to 988,
meaning that images 3 pixels in height will can
either play notes of pitch 988 (highest pixels)
or notes of pitch 131 (lowest pixels)
  Scale is an integer that is the height of the
image minus one
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
    public static playImage(toplay: Image, scale: number, tracks: number) {
        // Loop through columns
        for (let cx = 0; cx < toplay.width; cx++) {
            // Loop through tracks
            for (let cto = 0; cto < tracks+tracks*scale; cto += scale + 1) {
                // Get note to play (loop through rows)
                let notePitch = 0;
                for (let i = 0; i < scale; i++) {
                    let cp = toplay.getPixel(cx, i+cto);
                    if (cp != 0) {
                        console.logValue("val", cto);
                        notePitch = 988-(i*(857/scale));
                        break
                    }
                }
                
                // Get length of note
                let inLen = toplay.getPixel(cx, scale);
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
            }
        }
    }

    public static main() {
        game.forever(function() {
            MusicImage.playImage(assets.image`music2`, 16, 1);
        });
    }
}

MusicImage.main();