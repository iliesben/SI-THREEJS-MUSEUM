import * as THREE from 'three'
import colorSource from '../images/expo/droidstop.jpg'


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const colorTexture = textureLoader.load(colorSource)



export default class Clickresult
{
    constructor()
    {
        this.group = new THREE.Group()
        const planeGeometry  = new THREE.PlaneGeometry(7,5);
        const planeMaterial  = new THREE.MeshStandardMaterial({
        map: colorTexture,
        displacementScale: 0.4
        })
        const plane = new THREE.Mesh(planeGeometry,planeMaterial)
        plane.position.z = 47
        plane.position.y = 10
        plane.position.x = -45
        this.group.add(plane)
        
    }
}
