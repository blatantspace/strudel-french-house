// French house. 4/4, one cycle is one bar, 133.136 bpm.
// Sixteen bars. Four bars of filter, then the chords walk down twice.
// A, G#, F#, F, E, D. Triads. The walk does not come home.
// The jive only hits off the beat. The kick stays on every beat.

samples({
  loop: 'https://raw.githubusercontent.com/blatantspace/strudel-french-house/main/grid.wav',
  take: 'https://raw.githubusercontent.com/blatantspace/strudel-french-house/main/take2-grid.wav',
  chords: 'https://raw.githubusercontent.com/blatantspace/strudel-french-house/main/chord-grid.wav'
})

setcpm((60 * 48000 / 21632) / 4)

const BARS = "<2 3 4 5>"

// original loop. speed follows the walk once the chords enter, down from C#.
const BED_SPEED = "<1 1 1 1 0.794 0.749 0.667 0.630 0.595 0.530 0.794 0.749 0.667 0.630 0.595 0.530>"

$: s("loop")
  .slice(7, BARS)
  .speed(BED_SPEED)
  .cut(1)
  .legato(1)
  .hpf(90)
  .lpf("<500 800 1200 1800 2600 3600 5000 7000 9000 11000 12000 12000 12000 12000 10000 8000>")
  .room(0.08)
  .gain(0.48)

$: note("cs2")
  .s("sine")
  .attack(0.001)
  .decay(0.09)
  .sustain(0)
  .lpf(160)
  .cut(2)
  .struct("x x x x")
  .gain(0.8)

$: s("white")
  .attack(0)
  .decay(0.02)
  .sustain(0)
  .hpf(9000)
  .cut(3)
  .struct("~ x ~ x ~ x ~ x")
  .gain(0.1)

$: s("white")
  .attack(0.001)
  .decay(0.09)
  .sustain(0)
  .hpf(800)
  .lpf(2400)
  .cut(4)
  .struct("<~ ~ ~ ~ [~ x ~ x] [~ x ~ x] [~ x ~ x] [~ x ~ x] [~ x ~ x] [~ x ~ x] [~ x ~ x] [~ x ~ x] [~ x ~ x] [~ x ~ x] [~ x ~ x] [~ x ~ x]>")
  .gain(0.22)

// roots on 1 and 3. same walk as the chords.
const BASS = "<~ ~ ~ ~ [a2 ~ a2 ~] [gs2 ~ gs2 ~] [fs2 ~ fs2 ~] [f2 ~ f2 ~] [e2 ~ e2 ~] [d2 ~ d2 ~] [a2 ~ a2 ~] [gs2 ~ gs2 ~] [fs2 ~ fs2 ~] [f2 ~ f2 ~] [e2 ~ e2 ~] [d2 ~ d2 ~]>"

$: note(BASS)
  .s("sine")
  .attack(0.005)
  .decay(0.18)
  .sustain(0.1)
  .release(0.04)
  .lpf(140)
  .cut(5)
  .gain(0.7)

$: note(BASS)
  .s("sawtooth")
  .attack(0.008)
  .decay(0.12)
  .sustain(0)
  .lpf(320)
  .hpf(60)
  .cut(7)
  .gain(0.1)

const SUB = "<~ ~ ~ ~ [a1 ~ a1 ~] [gs1 ~ gs1 ~] [fs1 ~ fs1 ~] [f1 ~ f1 ~] [e1 ~ e1 ~] [d1 ~ d1 ~] [a1 ~ a1 ~] [gs1 ~ gs1 ~] [fs1 ~ fs1 ~] [f1 ~ f1 ~] [e1 ~ e1 ~] [d1 ~ d1 ~]>"

$: note(SUB)
  .s("sine")
  .attack(0.01)
  .decay(0.22)
  .sustain(0.15)
  .release(0.06)
  .lpf(90)
  .cut(8)
  .gain(0.32)

// one triad per bar.
const CHORD = "<~ ~ ~ ~ [a3,cs4,e4] [gs3,c4,ds4] [fs3,as3,cs4] [f3,a3,c4] [e3,gs3,b3] [d3,fs3,a3] [a3,cs4,e4] [gs3,c4,ds4] [fs3,as3,cs4] [f3,a3,c4] [e3,gs3,b3] [d3,fs3,a3]>"

// two-bar jive. bar A is the a of 1, then the & of 2, 3, and 4.
// bar B is the & of 1, the a of 2, the a of 3, and the & of 4.
const JIVE = "<~ ~ ~ ~ [~ ~ ~ x ~ ~ x ~ ~ ~ x ~ ~ ~ x ~] [~ ~ x ~ ~ ~ ~ x ~ ~ ~ x ~ ~ x ~] [~ ~ ~ x ~ ~ x ~ ~ ~ x ~ ~ ~ x ~] [~ ~ x ~ ~ ~ ~ x ~ ~ ~ x ~ ~ x ~] [~ ~ ~ x ~ ~ x ~ ~ ~ x ~ ~ ~ x ~] [~ ~ x ~ ~ ~ ~ x ~ ~ ~ x ~ ~ x ~] [~ ~ ~ x ~ ~ x ~ ~ ~ x ~ ~ ~ x ~] [~ ~ x ~ ~ ~ ~ x ~ ~ ~ x ~ ~ x ~] [~ ~ ~ x ~ ~ x ~ ~ ~ x ~ ~ ~ x ~] [~ ~ x ~ ~ ~ ~ x ~ ~ ~ x ~ ~ x ~] [~ ~ ~ x ~ ~ x ~ ~ ~ x ~ ~ ~ x ~] [~ ~ x ~ ~ ~ ~ x ~ ~ ~ x ~ ~ x ~]>"

$: note(CHORD)
  .s("sawtooth")
  .attack(0.09)
  .decay(0.2)
  .sustain(0.35)
  .release(0.18)
  .lpf(700)
  .hpf(160)
  .room(0.25)
  .legato(0.95)
  .cut(12)
  .gain(0.05)

$: note(CHORD)
  .struct(JIVE)
  .s("sawtooth")
  .attack(0.004)
  .decay(0.14)
  .sustain(0.04)
  .release(0.05)
  .lpf(sine.range(1400, 2800).slow(4))
  .hpf(240)
  .room(0.14)
  .delay(0.12)
  .delaytime(0.125)
  .delayfeedback(0.18)
  .cut(6)
  .gain(0.11)

const TOP = "<~ ~ ~ ~ [a4,cs5,e5] [gs4,c5,ds5] [fs4,as4,cs5] [f4,a4,c5] [e4,gs4,b4] [d4,fs4,a4] [a4,cs5,e5] [gs4,c5,ds5] [fs4,as4,cs5] [f4,a4,c5] [e4,gs4,b4] [d4,fs4,a4]>"

$: note(TOP)
  .struct(JIVE)
  .s("square")
  .attack(0.002)
  .decay(0.07)
  .sustain(0)
  .release(0.03)
  .lpf(3200)
  .hpf(600)
  .cut(9)
  .gain(0.04)

$: s("white")
  .struct(JIVE)
  .attack(0)
  .decay(0.025)
  .sustain(0)
  .hpf(2500)
  .lpf(9000)
  .cut(11)
  .gain(0.06)

// the six recorded chords, in walk order, punched on the jive.
const CI = "<~ ~ ~ ~ 0 1 2 3 4 5 0 1 2 3 4 5>"

$: s("chords")
  .slice(6, CI)
  .legato(0.85)
  .hpf(140)
  .lpf(7000)
  .room(0.16)
  .cut(13)
  .gain(0.28)

$: s("chords")
  .slice(6, CI)
  .struct(JIVE)
  .legato(0.4)
  .hpf(220)
  .lpf(6500)
  .cut(14)
  .gain(0.34)

// morning take, bars that sit on A, pitched onto the walk.
const TAKE = "<~ ~ ~ ~ 4 5 6 7 4 5 6 7 4 5 6 7>"
const TAKE_SPEED = "<1 1 1 1 1 0.944 0.841 0.794 0.749 0.667 1 0.944 0.841 0.794 0.749 0.667>"

$: s("take")
  .slice(8, TAKE)
  .speed(TAKE_SPEED)
  .legato(1)
  .hpf(100)
  .lpf("<800 800 800 800 2400 3200 4200 5200 6400 7200 6400 5600 4800 4000 3200 2400>")
  .room(0.1)
  .cut(15)
  .gain(0.5)
