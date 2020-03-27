import * as THREE from 'three'
import explicationSource from '../images/expo/cowboydes.jpg'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const colorTexture = textureLoader.load(explicationSource)


export default class Cowboy
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
        plane.rotation.y = Math.PI * 0.5
        plane.position.set(-74.8,9,67)
        this.group.add(plane)

        this.load = explicationSource
    }
}
