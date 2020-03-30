import * as THREE from 'three'
import GraffityPaintSource from '../images/expo/paint.jpg'
import copBanksySource from '../images/expo/cop.jpg'
import monkeyBanksySource from '../images/expo/monkey.jpg'
import PortraitInvaderSource from '../images/expo/Portrait.jpg'
import InvaderSource from '../images/expo/Invader.jpg'
import Invader2Source from '../images/expo/Invader2.jpg'
import Invader3Source from '../images/expo/Invader3.jpg'
import Invader4Source from '../images/expo/Invader4.jpg'
import drawSource from '../images/expo/draw.jpg'
import cowboySource from '../images/expo/cowboy.jpg'
import poesiaSource from '../images/expo/poesia.jpg'


const textureLoader = new THREE.TextureLoader()
const paintOnWall = textureLoader.load(GraffityPaintSource)
const paintCop = textureLoader.load(copBanksySource)
const paintMonkey = textureLoader.load(monkeyBanksySource)
const paintPortrait = textureLoader.load(PortraitInvaderSource)
const paintInvader = textureLoader.load(InvaderSource)
const paintInvader2 = textureLoader.load(Invader2Source)
const paintInvader3 = textureLoader.load(Invader3Source)
const paintInvader4 = textureLoader.load(Invader4Source)
const paintdraw = textureLoader.load(drawSource)
const paintcowboy = textureLoader.load(cowboySource)
const paintpoesia = textureLoader.load(poesiaSource)

export default class Gallery
{
    constructor()
    {

        this.group = new THREE.Group()
        const GallerieGeometry = new THREE.BoxGeometry(90 ,55, 0.5)
        const GallerieMaterial = new THREE.MeshStandardMaterial({
            map: paintOnWall
        })

        this.loads = [ GraffityPaintSource, copBanksySource, monkeyBanksySource,            PortraitInvaderSource, InvaderSource, Invader2Source, Invader3Source, Invader4Source, drawSource, cowboySource, poesiaSource,]
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
        banksyMesh.rotation.y = Math.PI / 2
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
        monkeyMesh.rotation.y = Math.PI / 2
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
        cowboyMesh.rotation.y = Math.PI / 2
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
        poesiaMesh.rotation.y = Math.PI / 2
        poesiaMesh.position.x = -92.7
        poesiaMesh.position.y = 9

        this.group.add(poesiaMesh)
        poesiaMesh.scale.set(0.1, 0.1, 0.1)


        // drawing Canvas 2D
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        const texture = new THREE.Texture(canvas)
        const drawGeometry = new THREE.BoxGeometry(40 ,60, 0.7)
        const drawMaterial = new THREE.MeshStandardMaterial({
            map: paintdraw
        })
    }
}