import * as THREE from 'three'
import explicationSource from '../images/scene/explication.jpg'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const colorTexture = textureLoader.load(explicationSource)


export default class Explication
{
    constructor()
    {
        this.group = new THREE.Group()
        const planeGeometry  = new THREE.PlaneGeometry(12,8);
        const planeMaterial  = new THREE.MeshStandardMaterial({
            map: colorTexture,
            displacementScale: 0.4
        })
        const plane = new THREE.Mesh(planeGeometry,planeMaterial)
        plane.position.set(-50,10,0)
        this.group.add(plane)

        this.load = explicationSource
    }
}
