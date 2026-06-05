import Experience from "./Experience/Experience.js";
import Analyzer from '/sounds/Analyzer.js'

const canvas = document.querySelector('canvas.webgl')

const audio = new Analyzer()
let experience = null

audio.onLoad(async () => {
    experience = new Experience(canvas, audio)
    await experience.ready()
})
audio.onWarmup(() => { if (experience) experience.warmup() })
audio.onPlay(()   => { if (experience) experience.play() })
audio.onStop(()   => { if (experience) experience.stop() })