
import * as THREE from 'three'
import skySouce from '../images/scene/sky.jpg'

const textureLoader = new THREE.TextureLoader()
const skyTexture = textureLoader.load(skySouce)

export default class Sky
{
    constructor()
    {
    this.group = new THREE.Group()

    const skyGeo = new THREE.SphereGeometry(10, 0, 25)
    const material = new THREE.MeshBasicMaterial({
        map: skyTexture,
        side: THREE.DoubleSide
    })
    this.sky = new THREE.Mesh(skyGeo, material);
    this.sky.position.set(0,20,0)
    this.group.add(this.sky)

    }
}