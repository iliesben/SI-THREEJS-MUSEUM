import * as THREE from 'three'
import explicationSource from '../images/expo/monkeydes.jpg'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const colorTexture = textureLoader.load(explicationSource)


export default class Monkey
{
    constructor()
    {
        this.group = new THREE.Group()
        const planeGeometry  = new THREE.PlaneGeometry(14,13.5);
        const planeMaterial  = new THREE.MeshStandardMaterial({
            map: colorTexture,
            displacementScale: 0.4
        })
        const plane = new THREE.Mesh(planeGeometry,planeMaterial)
        plane.rotation.y = Math.PI *-0.5
        plane.position.set(-53.5, 9, 67)
        this.group.add(plane)

        this.load = explicationSource
    }
}
