import * as THREE from 'three'
import colorSource from '../images/street/zeus.jpg'
import colorSource2 from '../images/street/mur2.jpg'
import colorSource3 from '../images/street/trotoir.jpg'
import colorSource4 from '../images/street/top.jpg'
import colorSource5 from '../images/street/right.jpg'
import colorSource6 from '../images/street/murlambda.jpg'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const colorTexture = textureLoader.load(colorSource)
const colorTexture2 = textureLoader.load(colorSource2)
const colorTexture3 = textureLoader.load(colorSource3)
const colorTexture4 = textureLoader.load(colorSource4)
const colorTexture5 = textureLoader.load(colorSource5)
const colorTexture6 = textureLoader.load(colorSource6)


export default class Walls
{
    constructor()
    {
        /**
         * walls
         */
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
        const planeGeometry5  = new THREE.PlaneGeometry( 45, 20 );
        const planeMaterial5  = new THREE.MeshStandardMaterial({
        map: colorTexture6,
        displacementScale: 0.4,
        })

        let d = -62.5
        for (let i = 0; i < 2; i++) {
            const plane5 = new THREE.Mesh(planeGeometry5,planeMaterial5)
            plane5.rotation.x = Math.PI * 0
            plane5.rotation.y = Math.PI * 2
            plane5.position.set(d,12.5,-2)
            d -= 45
            this.group.add(plane5)
        }
        let e = 107.5
        for (let i = 0; i < 2; i++) {
            const plane6 = new THREE.Mesh(planeGeometry5,planeMaterial5)
            plane6.rotation.x = Math.PI * 0
            plane6.rotation.y = Math.PI * 2
            plane6.position.set(e,12.5,-2)
            e-=45
            this.group.add(plane6)
        }
        let g = 45
        for (let i = 0; i < 2; i++) {
            const plane7 = new THREE.Mesh(planeGeometry5,planeMaterial5)
            plane7.rotation.y = Math.PI * -0.5
            plane7.position.set(120,12.5,g)
            g-=45
            this.group.add(plane7)
        }
        let k = -136.5
        for (let i = 0; i < 2; i++) {
            const plane8 = new THREE.Mesh(planeGeometry5,planeMaterial5)
            plane8.rotation.x = Math.PI * 0
            plane8.rotation.y = Math.PI * -1
            plane8.position.set(k,12,31)
            k-=45
            this.group.add(plane8)
        }
        let l = 31
        for (let i = 0; i < 2; i++) {
            const plane9 = new THREE.Mesh(planeGeometry5,planeMaterial5)
            plane9.rotation.y = Math.PI * 0.5
            plane9.position.set(-150,12.5,-l)
            l-=45
            this.group.add(plane9)
        }

        const planeGeometry2  = new THREE.PlaneGeometry( 140, 25 );
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

        const planeGeometry3  = new THREE.PlaneGeometry(19.7, 7);
        const planeMaterial3  = new THREE.MeshStandardMaterial({
        map: colorTexture4,
        displacementScale: 0.4
        })
        let c = 120
        for (let i = 0; i < 1; i++) {
            const plane3 = new THREE.Mesh(planeGeometry3,planeMaterial3)
            plane3.rotation.x = Math.PI * 0
            plane3.rotation.y = Math.PI * 1
            plane3.position.set(-64.3,19.3,31)
            c -= 30
            this.group.add(plane3)
        }

        const planeGeometry4  = new THREE.PlaneGeometry(40, 20  );
        const planeMaterial4  = new THREE.MeshStandardMaterial({
        map: colorTexture5,
        displacementScale: 0.4
        })
        /**
         * walkway
         */
        let b = 120
        for (let i = 0; i < 1; i++) {
            const plane4 = new THREE.Mesh(planeGeometry4,planeMaterial4)
            plane4.rotation.x = Math.PI * 0
            plane4.rotation.y = Math.PI * 1
            plane4.position.set(-94,12,31)
            b -= 40
            this.group.add(plane4)
        }

        const boxGeometry  = new THREE.BoxGeometry( 10, 1,3);
        const boxMaterial  = new THREE.MeshStandardMaterial({
            map: colorTexture3,
            displacementScale: 0.4
        })
        let z = 120
        for (let i = 0; i < 26; i++) {
            const box = new THREE.Mesh(boxGeometry,boxMaterial)
            box.position.set(z +0,2,-1)
            z -= 10
            this.group.add(box)
        }
        let f = 120
        for (let i = 0; i < 26; i++) {
            const box3 = new THREE.Mesh(boxGeometry,boxMaterial)
            box3.rotation.y = Math.PI * 0.5
            box3.position.set(120,2,-f+1)
            f -= 10
            this.group.add(box3)
        }

        const boxGeometry2  = new THREE.BoxGeometry( 10, 1, 2);
        const boxMaterial2  = new THREE.MeshStandardMaterial({
            map: colorTexture3,
            displacementScale: 0.4
        })
        let a = 80
        for (let i = 0; i < 24; i++) {
            const box2 = new THREE.Mesh(boxGeometry2,boxMaterial2)
            box2.position.set(a,2,30)
            a -= 10
            this.group.add(box2)
        }
        let h = 120
        for (let i = 0; i < 12; i++) {
            const box4 = new THREE.Mesh(boxGeometry2,boxMaterial2)
            box4.rotation.y = Math.PI * 1.5
            box4.position.set(-150,2,-h+35)
            h -= 10
            this.group.add(box4)
        }

        this.loads = [ colorSource, colorSource2, colorSource3, colorSource4, colorSource5, colorSource6]
    }
}
