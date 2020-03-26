import * as THREE from 'three'
import colorSource from '../images/expo/clickme.jpg'


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const colorTexture = textureLoader.load(colorSource)



export default class Clickme
{
    constructor()
    {
        this.group = new THREE.Group()
        const planeMaterial2  = new THREE.MeshBasicMaterial({
            map: colorTexture,
            displacementScale: 0.4
        })
        const boxGeometry2 = new THREE.BoxGeometry( 1, 1, 1)
        const clickbox = new THREE.Mesh(boxGeometry2,planeMaterial2)
        clickbox.position.z = 0
        clickbox.position.y = 10
        clickbox.position.x = -15
        this.group.add(clickbox)
    }
}
