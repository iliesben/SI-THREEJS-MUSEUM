import * as THREE from 'three'

class Cubes
{
    constructor()
    {
        this.group = new THREE.Group()

        const cubeGeometry = new THREE.BoxGeometry(10, 10, 5)
        const cubeMaterial = new THREE.MeshNormalMaterial()

        const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cubeMesh.position.set(5,0,35)
        this.group.add(cubeMesh)
    }
}

export default Cubes