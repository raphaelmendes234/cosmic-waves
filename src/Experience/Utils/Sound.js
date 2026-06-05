export default class Sound
{
    constructor(analyzer)
    {
        this.analyzer = analyzer

        this.volume = 0
        this.volumeSmooth = 0
        this.kick = 0
        this.kickHard = 0
        this.volumeByFrequency = this.analyzer.volumeByFrequency
        this.volumeAverage = 0
        this.volumeAverageSmooth = 0

        this.analyzer.onAudio((a) => {
            this.volume = a.volume
            this.volumeSmooth = a.volumeSmooth
            this.kick = a.kick
            this.kickHard = a.kickHard

            let sum = 0
            const f = this.volumeByFrequency
            for (let i = 0; i < f.length; i++) sum += f[i]
            this.volumeAverage = sum / f.length
            this.volumeAverageSmooth += (this.volumeAverage - this.volumeAverageSmooth) * 0.1
        })
    }
}