import * as THREE from 'three'

export default class Light
{
    constructor()
    {

        this.group = new THREE.Group()

        const ambientLight = new THREE.AmbientLight(0x94C4E7, 0.7)

		const hemisphereLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 0.8 )
        hemisphereLight.position.set( 0, 100, 0 )

		const directionalLight = new THREE.DirectionalLight( 0xF4F4FC )
        directionalLight.position.set( 0, 200, 100 )
		directionalLight.castShadow = true
		directionalLight.shadow.camera.top = 180
		directionalLight.shadow.camera.bottom = -100
		directionalLight.shadow.camera.left = -120
        directionalLight.shadow.camera.right = 120

		this.group.add( hemisphereLight )
        this.group.add(ambientLight)
        this.group.add( directionalLight )
    }

}