import * as THREE from 'three'
import colorSource from '../images/street/zeus.jpg'
import colorSource2 from '../images/street/mur2.jpg'
import colorSource3 from '../images/street/trotoir.jpg'


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const colorTexture = textureLoader.load(colorSource)
const colorTexture2 = textureLoader.load(colorSource2)
const colorTexture3 = textureLoader.load(colorSource3)


export default class Walltest
{
    constructor()
    {
        this.group = new THREE.Group()
        const planeGeometry  = new THREE.PlaneGeometry( 80, 30 );
        const planeMaterial  = new THREE.MeshStandardMaterial({
        map: colorTexture,
        displacementScale: 0.4,
        })
        let x = 120
        for (let i = 0; i < 1; i++) {
            const plane = new THREE.Mesh(planeGeometry,planeMaterial)
            plane.rotation.x = Math.PI * 0
            plane.rotation.y = Math.PI * 2
            plane.position.set(0,17,-2)
            x -= 30
            this.group.add(plane)
        }
        const planeGeometry2  = new THREE.PlaneGeometry( 140, 20 );
        const planeMaterial2  = new THREE.MeshStandardMaterial({
        map: colorTexture2,
        displacementScale: 0.4
        })
        let y = 120
        for (let i = 0; i < 1; i++) {
            const plane2 = new THREE.Mesh(planeGeometry2,planeMaterial2)
            plane2.rotation.x = Math.PI * 0 
            plane2.rotation.y = Math.PI * 1
            plane2.position.set(15.5,12,31)
            y -= 30
            this.group.add(plane2)
        }
        const boxGeometry  = new THREE.BoxGeometry( 10, 1,3);
        const boxMaterial  = new THREE.MeshStandardMaterial({
        map: colorTexture3,
        displacementScale: 0.4
        })
        let z = 120
        for (let i = 0; i < 24; i++) {
            const box = new THREE.Mesh(boxGeometry,boxMaterial)
            box.position.set(z +0,2,-1)
            z -= 10
            this.group.add(box)
        }
        const boxGeometry2  = new THREE.BoxGeometry( 10, 1, 2);
        const boxMaterial2  = new THREE.MeshStandardMaterial({
        map: colorTexture3,
        displacementScale: 0.4
        })
        let a = 120
        for (let i = 0; i < 24; i++) {
            const box2 = new THREE.Mesh(boxGeometry2,boxMaterial2)
            box2.position.set(a + 15.5,2,30)
            a -= 10
            this.group.add(box2)
        }

    }
}
