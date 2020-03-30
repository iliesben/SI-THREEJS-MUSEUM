
import * as THREE from 'three'
import videoSource from '../assets/video.mp4'
import playPauseSource from '../images/scene/playPause.jpg'

export default class Video
{
    constructor()
    {
        this.group = new THREE.Group()

        this.load = videoSource
        this.videoTest = document.createElement('video')
        this.videoTest.src = this.load
        const videoTexture = new THREE.VideoTexture(this.videoTest)
        videoTexture.needsUpdate = true
        videoTexture.minFilter = THREE.LinearFilter
        videoTexture.magFilter = THREE.LinearFilter
        videoTexture.format = THREE.RGBFormat
        this.videoTest.autoplay = false
        this.isplaying = false
        // Formé géométrique où est la vidéo
        const planeVideo = new THREE.Mesh(
            new THREE.CubeGeometry(15, 6.2, 0.2), // Cube
            new THREE.MeshNormalMaterial({      // Conserver ce matérial
            normalMap: videoTexture
            })
        )
         planeVideo.position.set(-83,8.45,58)
         this.group.add(planeVideo)
         this.buttonSound()
    }
    buttonSound()
    {
        const textureLoader = new THREE.TextureLoader()
        const playPauseTexture = textureLoader.load(playPauseSource)

        const planeMaterial2  = new THREE.MeshBasicMaterial({
            map: playPauseTexture,
        })
        const boxGeometry2 = new THREE.BoxGeometry( 1, 1, 1)
        const clickbox = new THREE.Mesh(boxGeometry2,planeMaterial2)
        clickbox.position.set(-91.5,10,65)
        this.group.add(clickbox)
    }
    soundPlay(){
        if ( this.isplaying === false)
        {
            this.videoTest.play()
            this.videoTest.loop = true
            this.isplaying  = true
        }
        else if( this.isplaying === true) {
            this.videoTest.pause()
            console.log('in stop')
            this.isplaying = false
        }

    }
}