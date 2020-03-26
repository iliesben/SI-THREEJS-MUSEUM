import * as THREE from 'three'
import footStepsSource from '../assets/footSteps.mp3'
import gallerieSource from '../assets/gallerie.mp3'

console.log(footStepsSource);

export default class songs
{
    constructor()
    {
        // this.element = $element

        this.audio = new Audio(footStepsSource)

        // this.audioPlayer()
        // this.play()
    }

    play()
    {
            // this.audio.currentTime = 0
            // this.audio.play()
    }
    speakerAudio(_sence, _camera, witch)
    {
        const geometryAudio = new THREE.BoxBufferGeometry( 5, 2, 5 )
        const materialAudio = new THREE.MeshBasicMaterial( { color : 'red' } )
        const speakerAudio  = new THREE.Mesh(geometryAudio ,materialAudio)
        if (witch === 'museum') speakerAudio.position.set(-64.5  , 40 , 35)

        speakerAudio.rotation.y = Math.PI  * 2
        _sence.add(speakerAudio)

        /** Section of audio listener creation*/
        this.listener = new THREE.AudioListener()
        // camera.add(listener)
        _camera.add(this.listener)

        this.sound = new THREE.PositionalAudio(this.listener)




        /** Section of song parametre creation*/
        let songVolume = 2
        const parameterSong = () =>
        {
            this.sound.setVolume(songVolume)
            this.sound.setRefDistance(1)
            this.sound.setDirectionalCone( 180, 0, 0.5 )
            this.sound.setMaxDistance(0.1)
            this.sound.play()
            this.sound.setLoop( true )
            speakerAudio.add(this.sound)
        }
        /** Section of load song*/
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load( gallerieSource,
        (buffer) => {
            this.sound.setBuffer(buffer)
            parameterSong()
        })
        // setTimeout(() => {
        //     const helper = new THREE.PositionalAudioHelper( this.sound );
        //     this.sound.add( helper );
        // },7000)
    }
}