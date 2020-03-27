
import * as THREE from 'three'
import videoSource from '../assets/video.mp4';
import colorSource from '../images/expo/clickme.jpg'


export default class Video
{
    constructor()
    {
        this.group = new THREE.Group()

        this.videoTest = document.createElement('video')
        this.videoTest.src = videoSource
        const videoTexture = new THREE.VideoTexture(this.videoTest)
        videoTexture.needsUpdate = true;
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBFormat;
        this.videoTest.autoplay = true;
        this.videoTest.muted = true;
        this.videoTest.loop

        // Formé géométrique où est la vidéo
        const planeVideo = new THREE.Mesh(
            new THREE.CubeGeometry(12.2, 6.2, 0.2), // Cube
            new THREE.MeshNormalMaterial({      // Conserver ce matérial
            normalMap: videoTexture
            })
        )
         planeVideo.position.set(-81.5,8.5,58)
         this.group.add(planeVideo)
         this.buttonSound()
    }
    buttonSound()
    {

        /**
         * Textures
        //  */
        const textureLoader = new THREE.TextureLoader()
        const colorTexture = textureLoader.load(colorSource)

        const planeMaterial2  = new THREE.MeshBasicMaterial({
        map: colorTexture,
        displacementScale: 0.4,
        color : 'red'
        })
        const boxGeometry2 = new THREE.BoxGeometry( 1, 1, 1)
        const clickbox = new THREE.Mesh(boxGeometry2,planeMaterial2)
        clickbox.position.set(-92,10,65)
        this.group.add(clickbox)
    }
    soundPlay(){
        this.videoTest.muted = false;
    }
}