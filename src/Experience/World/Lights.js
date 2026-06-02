import * as THREE from 'three'

import Experience from '../Experience'

export default class Lights
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setLights()
    }

    setLights()
    {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 2)
        this.scene.add(this.ambientLight)
    }
}