import Experience from '../Experience.js'
import Astronaut from './Astronaut.js'
import Beam from './Beam.js'
import Eye from './Eye.js'
import Lights from './Lights.js'
import Manager from './Manager.js'
import Stars from './Stars.js'
import SpaceSky from './SpaceSky.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.ressources

        // Wait for ressources
        this.ressources.on('loaded', () => 
        {
            // Setup
            this.beam = new Beam()
            this.stars = new Stars()
            this.eye = new Eye()
            this.astronaut = new Astronaut()
            this.lights = new Lights()
            this.spaceSky = new SpaceSky()

            this.manager = new Manager()
            this.manager.switchScene(1)
        })

    }

    update()
    {
        if (this.eye) {
            this.eye.update()
        }

        if (this.astronaut) {
            this.astronaut.update()
        }

        if (this.beam) {
            this.beam.update()
        }

        if (this.stars) {
            this.stars.update()
        }

        if (this.spaceSky) {
            this.spaceSky.update()
        }

        if (this.manager) {
            this.manager.update()
        }
    }
}