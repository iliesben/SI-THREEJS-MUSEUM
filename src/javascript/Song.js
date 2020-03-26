import footStepsSource from '../songs/footSteps.mp3'

console.log(footStepsSource);

export default class songs
{
    constructor($element)
    {
        // this.element = $element

        this.audio = new Audio(footStepsSource)

        this.play()
    }

    play()
    {
            // this.audio.currentTime = 0
            // this.audio.play()
    }

}