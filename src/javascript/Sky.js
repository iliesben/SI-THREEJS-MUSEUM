
import * as THREE from 'three'
import skySouce from '../images/scene/sky.jpg'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const skyTexture = textureLoader.load(skySouce)

export default class Sky
{
    constructor()
    {
        this.group = new THREE.Group()

        const skyGeo = new THREE.SphereGeometry(500, 25, 25)
        const skyMaterial = new THREE.MeshBasicMaterial({
            map: skyTexture,
            side: THREE.DoubleSide
        })
        this.sky = new THREE.Mesh(skyGeo, skyMaterial);
        this.sky.position.set(0,-15,15)
        this.group.add(this.sky)
    }
}