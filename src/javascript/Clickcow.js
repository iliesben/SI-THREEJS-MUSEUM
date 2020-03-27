import * as THREE from 'three'
import clickMeSource from '../images/scene/clickMe.jpg'


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const colorTexture = textureLoader.load(clickMeSource)



export default class Clickcow
{
    constructor()
    {
        this.group = new THREE.Group()
        const planeMaterial  = new THREE.MeshBasicMaterial({
            map: colorTexture
        })
        const boxGeometry = new THREE.BoxGeometry( 1, 1, 1)
        const clickMeBox = new THREE.Mesh(boxGeometry,planeMaterial)
        clickMeBox.position.set(-74.3,15,68)
        this.group.add(clickMeBox)

        this.load = clickMeSource
    }
}
