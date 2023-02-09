/**
 * Babylon.js Scene
 */
class Scene {
    constructor() {
        this.objects = [];
        this.lights = [];
        this.cameras = [];
        this.meshes = [];
        this.materials = [];
        this.textures = [];
        this.animations = [];

        this.canvas = document.getElementById("canvas3d");
        this.engine = new BABYLON.Engine(this.canvas, true,
            {
                preserveDrawingBuffer: true,
                stencil: true,
                disableWebGL2Support: false
            });
        this.scene = new BABYLON.Scene(this.engine);

        // Create a camera and set its position
        this.camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 1.3, 0), this.scene);
        this.camera.setPosition(new BABYLON.Vector3(0, 1.6, 2));

        // Attach the camera to the canvas
        this.camera.attachControl(this.canvas, false);

        // Create a light and set its position
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);

        // Create a sphere and set its position
        // var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1 }, this.scene);
        //sphere.position.y = 1;

        // Start the animation loop
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        // Resize the canvas when the window is resized
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
        
    }

    createAvatar() {
        return new Promise((resolve, reject) => {
            this._avatar = new Avatar3D(this.scene);
            this._avatar.load("aj").then((hero) => {
                //this.camera.target = hero;
                this.camera.setPosition(new BABYLON.Vector3(0, 1.6, 1.5));
                resolve(this._avatar);
            });
        });

    }

}