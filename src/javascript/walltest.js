import * as THREE from 'three'
import colorSource from '../images/street/zeus.jpg'


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const colorTexture = textureLoader.load(colorSource)


export default class Walltest
{
    constructor()
    {
        this.group = new THREE.Group()
        const planeGeometry  = new THREE.PlaneGeometry( 80, 30 );
        const planeMaterial  = new THREE.MeshStandardMaterial({
        map: colorTexture,
        displacementScale: 0.4,
        })
        let x = 120
        for (let i = 0; i < 4; i++) {
            const plane = new THREE.Mesh(planeGeometry,planeMaterial)
            plane.rotation.x = Math.PI * 1
            plane.position.set(-x+60,2.5,15)
            x -= 30
            this.group.add(plane)
        }
    }
}
