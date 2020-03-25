import * as THREE from 'three'

class Cubes
{
    constructor()
    {
        this.group = new THREE.Group()

        const cubeGeometry = new THREE.BoxGeometry(20, 20, 5)
        const cubeMaterial = new THREE.MeshNormalMaterial()

        const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cubeMesh.position.set(0,5,15)
        this.group.add(cubeMesh)
    }
}

export default Cubes