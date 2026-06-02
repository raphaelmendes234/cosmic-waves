import Experience from '../Experience'
import * as THREE from 'three'

export default class Manager
{
    constructor()
    {
        this.experience = new Experience()
        this.world = this.experience.world
        this.camera = this.experience.camera
        this.debug = this.experience.debug

        this.currentScene = 1

        if(this.debug.active)
        {
            this.debugFolder = this.debug.gui.addFolder('manager')
            this.debugFolder.add(this, 'currentScene', { 'scene 1': 1, 'scene 2': 2, 'scene 3': 3 })
                            .name('Change scene')
                            .onChange(() => {
                                // Quand on change dans le GUI, on lance la méthode
                                this.switchScene(parseInt(this.currentScene))
                            })
        }
    }

    switchScene(sceneNumber)
    {
        // On récupère les instances depuis World
        const helmet = this.world.helmet
        const eye = this.world.eye
        const beam = this.world.beam

        // Point central pour l'OrbitControls
        const centerTarget = new THREE.Vector3(0, 0, 0)

        switch(sceneNumber)
        {
            case 1:
                helmet.show()
                eye.hide()
                beam.setMode(1)
                // Vue de face
                this.camera.cutToShot(new THREE.Vector3(0, 0, 8), centerTarget)
                break

            case 2:
                helmet.show()
                eye.hide()
                beam.setMode(2)
                // Vue de 3/4 (on décale X et Z)
                this.camera.cutToShot(new THREE.Vector3(-3.5, 0.6, 4.3), new THREE.Vector3(5.8, -0.7, -2))
                break

            case 3:
                helmet.hide()
                eye.show()
                beam.setMode(3)
                // Vue rapprochée pour l'oeil
                this.camera.cutToShot(new THREE.Vector3(0, 0, 8), centerTarget)
                break
        }
    }
}