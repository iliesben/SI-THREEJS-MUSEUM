import * as THREE from 'three'
import colorSource from '../images/street/color.jpg'
import normalSource from '../images/street/normal.jpg'
import ambientOcclusionSource from '../images/street/ambientOcclusion.jpg'
import displacementSource from '../images/street/displacement.jpg'

console.log(displacementSource);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load(normalSource)
const colorTexture = textureLoader.load(colorSource)
const ambientOcclusionTexture = textureLoader.load(ambientOcclusionSource)
const displacementTexture = textureLoader.load(displacementSource)


export default class Street
{
    constructor()
    {
        this.group = new THREE.Group()
        const planeGeometry  = new THREE.PlaneGeometry( 30, 30 );
        const planeMaterial  = new THREE.MeshStandardMaterial({
        map: colorTexture,
        normalMap: normalTexture,
        aoMap: ambientOcclusionTexture,
        displacementMap: displacementTexture,
        displacementScale: 0.4,
        side : THREE.DoubleSide
        })
        let x = 150
        for (let i = 0; i < 9; i++) {
            const plane = new THREE.Mesh(planeGeometry,planeMaterial)
            plane.rotation.x = Math.PI * 0.5
            plane.position.set(-x,2.5,15)
            x -= 30
            this.group.add(plane)
        }
        let y= 30
        for (let i = 0; i < 2; i++) {
            const plane2 = new THREE.Mesh(planeGeometry,planeMaterial)
            plane2.rotation.x = Math.PI * 0.5
            plane2.position.set(120,2.5,y+15)
            y -= 30
            this.group.add(plane2)
        }
        const plane3 = new THREE.Mesh(planeGeometry,planeMaterial)
        plane3.rotation.x = Math.PI * 0.5
        plane3.position.set(90,2.5,45)
        this.group.add(plane3)
        const plane4 = new THREE.Mesh(planeGeometry,planeMaterial)
        plane4.rotation.x = Math.PI * 0.5
        plane4.position.set(-145,2.5,-15)
        this.group.add(plane4)
    }
}
