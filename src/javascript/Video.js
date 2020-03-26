
import * as THREE from 'three'
import videoSource from '../assets/video.mp4';

export default class Video
{
    constructor()
    {
        this.group = new THREE.Group()

        const videoTest = document.createElement('video')
        videoTest.autoplay = true;
        videoTest.src = videoSource
        const videoTexture = new THREE.VideoTexture(videoTest)
        videoTexture.needsUpdate = true;
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBFormat;
        videoTest.muted = true;
        videoTest.loop

        // Formé géométrique où est la vidéo
        const planeVideo = new THREE.Mesh(
            new THREE.CubeGeometry(12.2, 6.2, 0.2), // Cube
            new THREE.MeshNormalMaterial({      // Conserver ce matérial
            normalMap: videoTexture
            })
        )
         planeVideo.position.set(-84.5,8.5,58)
         this.group.add(planeVideo)
    }
}