import * as THREE from 'three'
import GraffityPaint from '../images/expo/paint.jpg'
import copBanksy from '../images/expo/cop.jpg'
import monkeyBanksy from '../images/expo/monkey.jpg'
import PortraitInvader from '../images/expo/Portrait.jpg'
import Invader from '../images/expo/Invader.jpg'
import Invader2 from '../images/expo/Invader2.jpg'
import Invader3 from '../images/expo/Invader3.jpg'
import Invader4 from '../images/expo/Invader4.jpg'
import draw from '../images/expo/draw.jpg'
import cowboy from '../images/expo/cowboy.jpg'
import poesia from '../images/expo/poesia.jpg'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js' // GLTF Import 

const textureLoader = new THREE.TextureLoader()
const paintOnWall = textureLoader.load(GraffityPaint)
const paintCop = textureLoader.load(copBanksy)
const paintMonkey = textureLoader.load(monkeyBanksy)
const paintPortrait = textureLoader.load(PortraitInvader)
const paintInvader = textureLoader.load(Invader)
const paintInvader2 = textureLoader.load(Invader2)
const paintInvader3 = textureLoader.load(Invader3)
const paintInvader4 = textureLoader.load(Invader4)
const paintdraw = textureLoader.load(draw)
const paintcowboy = textureLoader.load(cowboy)
const paintpoesia = textureLoader.load(poesia)

class Gallery
{
    constructor()
    {

        this.group = new THREE.Group()
        const GallerieGeometry = new THREE.BoxGeometry(90 ,55, 0.5)
        const GallerieMaterial = new THREE.MeshStandardMaterial({
            map: paintOnWall
        })
         /**
         * Paint 1 entry
         */
        const GallerieMesh = new THREE.Mesh(GallerieGeometry, GallerieMaterial)
        GallerieMesh.position.z = 46.85
        GallerieMesh.position.y = 10
        GallerieMesh.position.x = -45


        
        this.group.add(GallerieMesh)
        GallerieMesh.scale.set(0.1, 0.1, 0.1)
 
        /**
         * Paint wall Banksy Cop / Monkey 
         */
        ///cop
        const banksyGeometry = new THREE.BoxGeometry(85 ,120, 0.5)
        const banksyMaterial = new THREE.MeshStandardMaterial({
            map: paintCop
        })

        const banksyMesh = new THREE.Mesh(banksyGeometry, banksyMaterial)
        banksyMesh.position.z = 67
        banksyMesh.rotation.y = Math.PI / 2;
        banksyMesh.position.x = -35.8
        banksyMesh.position.y = 9

        this.group.add(banksyMesh)
        banksyMesh.scale.set(0.1, 0.1, 0.1)
        
        //monkey
        const monkeyGeometry = new THREE.BoxGeometry(85 ,120, 0.5)
        const monkeyMaterial = new THREE.MeshStandardMaterial({
            map: paintMonkey
        })

        const monkeyMesh = new THREE.Mesh(monkeyGeometry, monkeyMaterial)
        monkeyMesh.position.z = 67
        monkeyMesh.rotation.y = Math.PI / 2;
        monkeyMesh.position.x = -53.4
        monkeyMesh.position.y = 9

        this.group.add(monkeyMesh)
        monkeyMesh.scale.set(0.1, 0.1, 0.1)

         /**
         * Paint wall Invader
         */

        const PortraitGeometry = new THREE.BoxGeometry(30 ,50, 0.5)
        const PortraitMaterial = new THREE.MeshStandardMaterial({
            map: paintPortrait
        })

        const PortraitMesh = new THREE.Mesh(PortraitGeometry, PortraitMaterial)
        PortraitMesh.position.z = 74.9
        PortraitMesh.position.x = -39.5
        PortraitMesh.position.y = 9

        this.group.add(PortraitMesh)
        PortraitMesh.scale.set(0.1, 0.1, 0.1)

        ///invader
        
        const InvaderGeometry = new THREE.BoxGeometry(10 ,10, 0.5)
        const InvaderMaterial = new THREE.MeshStandardMaterial({
            map: paintInvader
        })

        const InvaderMesh = new THREE.Mesh(InvaderGeometry, InvaderMaterial)
        InvaderMesh.position.z = 74.9
        InvaderMesh.position.x = -49
        InvaderMesh.position.y = 11

        this.group.add(InvaderMesh)
        InvaderMesh.scale.set(0.1, 0.1, 0.1)

        //Invader 2
        const Invader2Geometry = new THREE.BoxGeometry(10 ,10, 0.5)
        const Invader2Material = new THREE.MeshStandardMaterial({
            map: paintInvader2
        })

        const Invader2Mesh = new THREE.Mesh(Invader2Geometry, Invader2Material)
        Invader2Mesh.position.z = 74.9
        Invader2Mesh.position.x = -44
        Invader2Mesh.position.y = 11

        this.group.add(Invader2Mesh)
        Invader2Mesh.scale.set(0.1, 0.1, 0.1)

        //Invader 3
        const Invader3Geometry = new THREE.BoxGeometry(10 ,10, 0.5)
        const Invader3Material = new THREE.MeshStandardMaterial({
            map: paintInvader3
        })

        const Invader3Mesh = new THREE.Mesh(Invader3Geometry, Invader3Material)
        Invader3Mesh.position.z = 74.9
        Invader3Mesh.position.x = -44
        Invader3Mesh.position.y = 7

        this.group.add(Invader3Mesh)
        Invader3Mesh.scale.set(0.1, 0.1, 0.1)
        
        //Invader 4
        const Invader4Geometry = new THREE.BoxGeometry(10 ,10, 0.5)
        const Invader4Material = new THREE.MeshStandardMaterial({
            map: paintInvader4
        })

        const Invader4Mesh = new THREE.Mesh(Invader4Geometry, Invader4Material)
        Invader4Mesh.position.z = 74.9
        Invader4Mesh.position.x = -49
        Invader4Mesh.position.y = 7


        this.group.add(Invader4Mesh)
        Invader4Mesh.scale.set(0.1, 0.1, 0.1)


        // cowboy jef aerosol
        const cowboyGeometry = new THREE.BoxGeometry(100 ,70, 0.5)
        const cowboyMaterial = new THREE.MeshStandardMaterial({
            map: paintcowboy
        })

        const cowboyMesh = new THREE.Mesh(cowboyGeometry, cowboyMaterial)
        cowboyMesh.position.z = 67
        cowboyMesh.rotation.y = Math.PI / 2;
        cowboyMesh.position.x = -75.3
        cowboyMesh.position.y = 9

        this.group.add(cowboyMesh)
        cowboyMesh.scale.set(0.1, 0.1, 0.1)

        // poesia jef aerosol
        const poesiaGeometry = new THREE.BoxGeometry(100 ,70, 0.5)
        const poesiaMaterial = new THREE.MeshStandardMaterial({
            map: paintpoesia
        })

        const poesiaMesh = new THREE.Mesh(poesiaGeometry, poesiaMaterial)
        poesiaMesh.position.z = 67
        poesiaMesh.rotation.y = Math.PI / 2;
        poesiaMesh.position.x = -92.7
        poesiaMesh.position.y = 9

        this.group.add(poesiaMesh)
        poesiaMesh.scale.set(0.1, 0.1, 0.1)


        // drawing Canvas 2D
        const drawGeometry = new THREE.BoxGeometry(40 ,60, 3.5)
        const drawMaterial = new THREE.MeshStandardMaterial({
            map: paintdraw
        })

        const drawMesh = new THREE.Mesh(drawGeometry, drawMaterial)
        drawMesh.position.z = 74.3
        drawMesh.position.x = -45
        drawMesh.position.y = 7

        this.group.add(drawMesh)
        drawMesh.scale.set(0.1, 0.1, 0.1)

        /**
         * Imported/statue 
         */
        
         /*    const gltfLoader = new GLTFLoader()
      
            gltfLoader.load( './models/statue/scene.gltf',(_gltf) =>
            {
                this.object = _gltf.scene.children[0]
                this.group.add(this.object)
                this.object.position.set(-86.5, 9, 67)
                this.object.scale.set(1.5,1.5,1.5)
                this.object.rotation.z = Math.PI + 0.20944
            }
        ) */}
}

export default Gallery