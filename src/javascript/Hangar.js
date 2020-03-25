import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class Expo
{
    constructor()
    {
        this.group = new THREE.Group()
        this.gltf = '/models/expo/scene.gltf'
        const gltfLoader = new GLTFLoader()
        gltfLoader.load(
            this.gltf,
            (_gltf) =>
            {
                this.object = _gltf.scene.children[0]
                this.object.scale.set(0.1,0.1,0.1)
                this.group.add(this.object)
            }
        )
    }
}