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


export default class Iwalls
{
    constructor()
    {
        this.group = new THREE.Group()
        const planeGeometry  = new THREE.PlaneGeometry( 30, 30 );
        const planeMaterial  = new THREE.MeshStandardMaterial({
            color: 0x248f24, 
            alphaTest: 0, 
            visible: false
        })
        let x = 30
        for (let i = 0; i < 2; i++) {
            const plane = new THREE.Mesh(planeGeometry,planeMaterial)
            plane.rotation.x = Math.PI * 1
            plane.rotation.y = Math.PI * 0.5
            if(i == 0){
                plane.position.set(-75,2.5,15)
            }
            else
            {
                plane.position.set(45,2.5,15)  
            }
            x -= 30
            this.group.add(plane)
        }
    }
}
