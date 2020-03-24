import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class Hangar
{
    constructor()
    {
        this.group = new THREE.Group()
        this.objects = []
        const gltfLoader = new GLTFLoader()

        gltfLoader.load(
            '/models/scene/scene.gltf',
            (_gltf) =>
            {
                console.log(_gltf)
                // for (let i = 0; i < _gltf.scene.children.length; i++) {
                //     this.object = _gltf.scene.children[i]
                //     this.objects = this.object
                // }
                // this.group.add(this.objects)
                this.scene = _gltf.scene
                this.group.add(this.scene)
            }
        )
    }
}