// French house. 4/4, one cycle is one bar, 133.136 bpm.
// Sixteen bars. The sample is four bars of the recording, looped.
// The chords are the same four every time: C#m7, A, E, B.
// First four bars are the filter opening. Then the jive stabs and the bass lock in.
// The jive is two bars long. It only hits off the beat, and the gaps are uneven.

samples({ loop: 'https://raw.githubusercontent.com/blatantspace/strudel-french-house/main/grid.wav' })

setcpm((60 * 48000 / 21632) / 4)

const BARS = "<2 3 4 5>"

$: s("loop")
  .slice(7, BARS)
  .cut(1)
  .legato(1)
  .hpf(90)
  .lpf("<500 800 1200 1800 2600 3600 5000 7000 9000 11000 12000 12000 12000 12000 10000 8000>")
  .room(0.08)
  .gain(0.72)

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

// roots only, on 1 and 3, same shape every bar
const BASS = "<~ ~ ~ ~ [cs2 ~ cs2 ~] [a2 ~ a2 ~] [e2 ~ e2 ~] [b2 ~ b2 ~] [cs2 ~ cs2 ~] [a2 ~ a2 ~] [e2 ~ e2 ~] [b2 ~ b2 ~] [cs2 ~ cs2 ~] [a2 ~ a2 ~] [e2 ~ e2 ~] [b2 ~ b2 ~]>"

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

// quiet octave under the root, so the bass has weight
const SUB = "<~ ~ ~ ~ [cs1 ~ cs1 ~] [a1 ~ a1 ~] [e1 ~ e1 ~] [b1 ~ b1 ~] [cs1 ~ cs1 ~] [a1 ~ a1 ~] [e1 ~ e1 ~] [b1 ~ b1 ~] [cs1 ~ cs1 ~] [a1 ~ a1 ~] [e1 ~ e1 ~] [b1 ~ b1 ~]>"

$: note(SUB)
  .s("sine")
  .attack(0.01)
  .decay(0.22)
  .sustain(0.15)
  .release(0.06)
  .lpf(90)
  .cut(8)
  .gain(0.32)

// one chord per bar. the jive punches it.
const CHORD = "<~ ~ ~ ~ [cs3,e3,gs3,b3] [a2,cs3,e3,gs3] [e3,gs3,b3,ds4] [b2,ds3,fs3] [cs3,e3,gs3,b3] [a2,cs3,e3,gs3] [e3,gs3,b3,ds4] [b2,ds3,fs3] [cs3,e3,gs3,b3] [a2,cs3,e3,gs3] [e3,gs3,b3,ds4] [b2,ds3,fs3]>"

// two-bar jive, then it repeats with the chords.
// bar A hits the a of 1, then the & of 2, 3, and 4.
// bar B hits the & of 1, the a of 2, the a of 3, and the & of 4.
const JIVE = "<~ ~ ~ ~ [~ ~ ~ x ~ ~ x ~ ~ ~ x ~ ~ ~ x ~] [~ ~ x ~ ~ ~ ~ x ~ ~ ~ x ~ ~ x ~] [~ ~ ~ x ~ ~ x ~ ~ ~ x ~ ~ ~ x ~] [~ ~ x ~ ~ ~ ~ x ~ ~ ~ x ~ ~ x ~] [~ ~ ~ x ~ ~ x ~ ~ ~ x ~ ~ ~ x ~] [~ ~ x ~ ~ ~ ~ x ~ ~ ~ x ~ ~ x ~] [~ ~ ~ x ~ ~ x ~ ~ ~ x ~ ~ ~ x ~] [~ ~ x ~ ~ ~ ~ x ~ ~ ~ x ~ ~ x ~] [~ ~ ~ x ~ ~ x ~ ~ ~ x ~ ~ ~ x ~] [~ ~ x ~ ~ ~ ~ x ~ ~ ~ x ~ ~ x ~] [~ ~ ~ x ~ ~ x ~ ~ ~ x ~ ~ ~ x ~] [~ ~ x ~ ~ ~ ~ x ~ ~ ~ x ~ ~ x ~]>"

// held chord under the stabs, same changes, very quiet
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
  .gain(0.045)

// the stab body
$: note(CHORD)
  .struct(JIVE)
  .s("sawtooth")
  .attack(0.004)
  .decay(0.14)
  .sustain(0.04)
  .release(0.05)
  .lpf(sine.range(1100, 2400).slow(4))
  .hpf(220)
  .room(0.16)
  .delay(0.14)
  .delaytime(0.125)
  .delayfeedback(0.2)
  .cut(6)
  .gain(0.15)

// same stab, an octave up, shorter and brighter
const TOP = "<~ ~ ~ ~ [cs4,e4,gs4,b4] [a3,cs4,e4,gs4] [e4,gs4,b4,ds5] [b3,ds4,fs4] [cs4,e4,gs4,b4] [a3,cs4,e4,gs4] [e4,gs4,b4,ds5] [b3,ds4,fs4] [cs4,e4,gs4,b4] [a3,cs4,e4,gs4] [e4,gs4,b4,ds5] [b3,ds4,fs4]>"

$: note(TOP)
  .struct(JIVE)
  .s("square")
  .attack(0.002)
  .decay(0.07)
  .sustain(0)
  .release(0.03)
  .lpf(2800)
  .hpf(500)
  .cut(9)
  .gain(0.045)

// a tick on each stab so the attack cuts
$: s("white")
  .struct(JIVE)
  .attack(0)
  .decay(0.025)
  .sustain(0)
  .hpf(2500)
  .lpf(9000)
  .cut(11)
  .gain(0.07)

// the recording, chopped onto the same jive. one beat of the bar per hit.
const CHOP = "<~ ~ ~ ~ [~ ~ ~ 8 ~ ~ 9 ~ ~ ~ 10 ~ ~ ~ 11 ~] [~ ~ 12 ~ ~ ~ ~ 13 ~ ~ ~ 14 ~ ~ 15 ~] [~ ~ ~ 16 ~ ~ 17 ~ ~ ~ 18 ~ ~ ~ 19 ~] [~ ~ 20 ~ ~ ~ ~ 21 ~ ~ ~ 22 ~ ~ 23 ~] [~ ~ ~ 8 ~ ~ 9 ~ ~ ~ 10 ~ ~ ~ 11 ~] [~ ~ 12 ~ ~ ~ ~ 13 ~ ~ ~ 14 ~ ~ 15 ~] [~ ~ ~ 16 ~ ~ 17 ~ ~ ~ 18 ~ ~ ~ 19 ~] [~ ~ 20 ~ ~ ~ ~ 21 ~ ~ ~ 22 ~ ~ 23 ~] [~ ~ ~ 8 ~ ~ 9 ~ ~ ~ 10 ~ ~ ~ 11 ~] [~ ~ 12 ~ ~ ~ ~ 13 ~ ~ ~ 14 ~ ~ 15 ~] [~ ~ ~ 16 ~ ~ 17 ~ ~ ~ 18 ~ ~ ~ 19 ~] [~ ~ 20 ~ ~ ~ ~ 21 ~ ~ ~ 22 ~ ~ 23 ~]>"

$: s("loop")
  .slice(28, CHOP)
  .legato(0.45)
  .hpf(280)
  .lpf(5200)
  .room(0.08)
  .cut(10)
  .gain(0.42)
