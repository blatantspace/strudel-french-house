// French house. 4/4, one cycle is one bar, 133.136 bpm.
// Sixteen bars. The sample is four bars of the recording, looped.
// The chords are the same four every time: C#m7, A, E, B.
// First four bars are the filter opening. Then the chords and bass lock in.

samples('github:blatantspace/strudel-french-house')

setcpm((60 * 48000 / 21632) / 4)

const BARS = "<2 3 4 5>"

$: s("loop")
  .slice(7, BARS)
  .cut(1)
  .legato(1)
  .hpf(90)
  .lpf("<500 800 1200 1800 2600 3600 5000 7000 9000 11000 12000 12000 12000 12000 10000 8000>")
  .room(0.08)
  .gain(0.85)

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
  .cut(5)
  .gain(0.1)

// offbeat stabs. one chord per bar, then the loop repeats.
const CHORD = "<~ ~ ~ ~ [~ [cs3,e3,gs3,b3] ~ [cs3,e3,gs3,b3] ~ [cs3,e3,gs3,b3] ~ [cs3,e3,gs3,b3]] [~ [a2,cs3,e3,gs3] ~ [a2,cs3,e3,gs3] ~ [a2,cs3,e3,gs3] ~ [a2,cs3,e3,gs3]] [~ [e3,gs3,b3,ds4] ~ [e3,gs3,b3,ds4] ~ [e3,gs3,b3,ds4] ~ [e3,gs3,b3,ds4]] [~ [b2,ds3,fs3] ~ [b2,ds3,fs3] ~ [b2,ds3,fs3] ~ [b2,ds3,fs3]] [~ [cs3,e3,gs3,b3] ~ [cs3,e3,gs3,b3] ~ [cs3,e3,gs3,b3] ~ [cs3,e3,gs3,b3]] [~ [a2,cs3,e3,gs3] ~ [a2,cs3,e3,gs3] ~ [a2,cs3,e3,gs3] ~ [a2,cs3,e3,gs3]] [~ [e3,gs3,b3,ds4] ~ [e3,gs3,b3,ds4] ~ [e3,gs3,b3,ds4] ~ [e3,gs3,b3,ds4]] [~ [b2,ds3,fs3] ~ [b2,ds3,fs3] ~ [b2,ds3,fs3] ~ [b2,ds3,fs3]] [~ [cs3,e3,gs3,b3] ~ [cs3,e3,gs3,b3] ~ [cs3,e3,gs3,b3] ~ [cs3,e3,gs3,b3]] [~ [a2,cs3,e3,gs3] ~ [a2,cs3,e3,gs3] ~ [a2,cs3,e3,gs3] ~ [a2,cs3,e3,gs3]] [~ [e3,gs3,b3,ds4] ~ [e3,gs3,b3,ds4] ~ [e3,gs3,b3,ds4] ~ [e3,gs3,b3,ds4]] [~ [b2,ds3,fs3] ~ [b2,ds3,fs3] ~ [b2,ds3,fs3] ~ [b2,ds3,fs3]]>"

$: note(CHORD)
  .s("sawtooth")
  .attack(0.008)
  .decay(0.16)
  .sustain(0.05)
  .release(0.06)
  .lpf(sine.range(900, 2200).slow(4))
  .hpf(200)
  .room(0.18)
  .delay(0.16)
  .delaytime(0.125)
  .delayfeedback(0.22)
  .cut(6)
  .gain(0.16)
