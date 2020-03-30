import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import carSource from '../models/car/car.glb'

export default class Car
{
    constructor()
    {
        this.group = new THREE.Group()
        this.load = carSource

        const gltfLoader = new GLTFLoader()
        gltfLoader.load( this.load,
            _gltf =>
            {
                this.object = _gltf.scene.children[0]
                this.group.add(this.object)
            }
        )
    }
}