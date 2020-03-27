import * as THREE from 'three'
import gallerieSource from '../assets/gallerie.mp3'


export default class songs
{
    constructor()
    {
        this.load = gallerieSource
        // this.audioPlayer()
        // this.play()
    }

    speakerAudio(_sence, _camera, witch)
    {
        const geometryAudio = new THREE.BoxBufferGeometry( 5, 2, 5 )
        const materialAudio = new THREE.MeshBasicMaterial( { visible : false } )
        const speakerAudio  = new THREE.Mesh(geometryAudio ,materialAudio)
        if (witch === 'museum') speakerAudio.position.set(-64.5  , 40 , 35)

        speakerAudio.rotation.y = Math.PI  * 2
        _sence.add(speakerAudio)

        this.listener = new THREE.AudioListener()

        _camera.add(this.listener)

        this.sound = new THREE.PositionalAudio(this.listener)

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

        const audioLoader = new THREE.AudioLoader();
        audioLoader.load( this.load,
        (buffer) => {
            this.sound.setBuffer(buffer)
            parameterSong()
        })
    }
}