import * as THREE from 'three'

import Experience from '../Experience'

export default class Helmet
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.ressources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.renderer = this.experience.renderer

        // Setup
        this.visiereMesh
        this.ressource = this.ressources.items.helmetModel

        this.setCubeCamera()
        this.setModel()

        if (this.debug.active) {
            this.setDebug()
        }
    }

    setModel()
    {
        this.model = this.ressource.scene
        this.model.scale.set(2, 2, 2)
        this.scene.add(this.model)

        this.model.traverse((child) => 
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                
                // if(child.name === 'NomDeLaVisiere') 
                    this.visiereMesh = child;
    
                    const mat = child.material;
                    mat.envMap = this.cubeRenderTarget.texture;
    
                    mat.envMapIntensity = 0.5
    
                    mat.roughness = 1.0
                    mat.metalness = 0.9
    
                    mat.needsUpdate = true;
                // {
        }
        })
    }

    setCubeCamera()
    {
        // Créer la cible de rendu cubique (résolution de 256 ou 512 est souvent suffisante)
        this.cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
            generateMipmaps: true,
            minFilter: THREE.LinearMipmapLinearFilter
        })

        // Créer la CubeCamera (near, far, renderTarget)
        this.cubeCamera = new THREE.CubeCamera(0.1, 1000, this.cubeRenderTarget)
        this.scene.add(this.cubeCamera)
    }

    setDebug()
    {
        this.debugFolder = this.debug.gui.addFolder("helmet")

        this.debugFolder.add(this.visiereMesh.material, "envMapIntensity").min(0).max(1).step(0.01).onChange(() => { this.visiereMesh.material.needsUpdate = true })
        this.debugFolder.add(this.visiereMesh.material, "roughness").min(0).max(1).step(0.01).onChange(() => { this.visiereMesh.material.needsUpdate = true })
        this.debugFolder.add(this.visiereMesh.material, "metalness").min(0).max(1).step(0.01).onChange(() => { this.visiereMesh.material.needsUpdate = true })
    }

    show()
    {
        if(this.model) this.model.visible = true
    }

    hide()
    {
        if(this.model) this.model.visible = false
    }

    update()
    {
        if (this.model && this.model.visible) {
            this.cubeCamera.position.copy(this.visiereMesh.position)
            this.visiereMesh.visible = false
            this.cubeCamera.update(this.renderer.instance, this.scene)
            this.visiereMesh.visible = true
        }
    }
}