class Avatar3D {
    heads = [];
    constructor(scene) {
        // load babylonjs 3d model here
       
        this.scene = scene;

        this.mapping = [
            { "head": "m", "phonemes": ["b", "m", "n", "p", "v"] },
            { "head": "a", "phonemes": ["a", "d", "h", "i", "u", "er"] },
            { "head": "e", "phonemes": ["pe", "de", "se", "e"] },
            { "head": "g", "phonemes": ["ng", "g"] },
            { "head": "o", "phonemes": ["f", "o", "q", "w", "au", "uy", "w", "y"] },
            { "head": "l", "phonemes": ["rl", "r", "l"] },            
            { "head": "s", "phonemes": ["c", "j", "k", "s", "sh", "th", "t", "x", "zh"] },
            { "head": "blink", "phonemes": ["m"] }
        ];
        // Load hero character and play animation
        //BABYLON.SceneLoader.ImportMesh("", "https://assets.babylonjs.com/meshes/", "HVGirl.glb", scene, (newMeshes, particleSystems, skeletons, animationGroups) =>
       /* BABYLON.SceneLoader.ImportMesh("",
            "./" + name + "/",
            //"https://assets.babylonjs.com/meshes/",
            //"HVGirl.glb",
            name + ".glb",
            scene,
            (newMeshes, particleSystems, skeletons, animationGroups) => {
                var hero = newMeshes[0];

                //Scale the model down        
                //hero.scaling.scaleInPlace(0.1);

                //Lock camera on the character 
                //camera1.target = hero;

                //Get the Samba animation Group
                //const sambaAnim = this.scene.getAnimationGroupByName("Samba");

                //Play the Samba animation  
                //sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);

            });*/
    }

    getMouths(mouths) {
        var t= mouths.find(mouth=>mouth.id == "m");
        this.heads["m"] = mouths.find(mouth=>mouth.id == "m");
        this.heads["a"] = mouths.find(mouth=>mouth.id == "a");        
        this.heads["e"] = mouths.find(mouth=>mouth.id == "e");        
        this.heads["g"] = mouths.find(mouth=>mouth.id == "g");
        this.heads["o"] = mouths.find(mouth=>mouth.id == "o");        
        this.heads["r"] = mouths.find(mouth=>mouth.id == "a");        
        this.heads["l"] = mouths.find(mouth=>mouth.id == "l");                
        this.heads["s"] = mouths.find(mouth=>mouth.id == "s");        
        this.heads["blink"] = mouths.find(mouth=>mouth.id == "m");    
        
        this.setHead("m");
    }

    load(name) {
        this.name = name;
        return new Promise((resolve, reject) => {
            BABYLON.SceneLoader.ImportMesh("", "./" + name + "/", name + ".glb", this.scene, (newMeshes, particleSystems, skeletons, animationGroups) => {
                var hero = newMeshes[0];
                this.getMouths(newMeshes);
                resolve(hero);
            });
        });
    }

    resetHead() {
        this.setHead("m");
    }

    setHead( word) {
        if (!word) return;

        var result = this.getWord(word);
        word = result[0];

        var head = this.heads[result[1] || "m"]
        
        this.heads["m"].isVisible = false;
        this.heads["a"].isVisible = false;
        this.heads["e"].isVisible = false;
        this.heads["g"].isVisible = false;
        this.heads["o"].isVisible = false;        
        this.heads["r"].isVisible = false;        
        this.heads["l"].isVisible = false;        
        this.heads["s"].isVisible = false;

        head.isVisible = true;
        
        //this._canvas.clearRect(0, 0, this._canvas.canvas.width, this._canvas.canvas.height);
        // console.log("head", result[1], "word", result[0]);
        //canvas.drawImage(this.heads[result[1] || "m"], 0, 0);
        return word;
    }

    getWord(word) {
        var ohead = 'm';
        for (var element of this.mapping) {
            for (var phoneme of element.phonemes) {
                if (word.startsWith(phoneme)) {
                    ohead = element.head;
                    word = word.substring(phoneme.length, 99);
                    return [word, ohead];
                }
            }
        }

        return ["", ohead];
    }

    setWord(word) {
        if (this.heads=={}) return;
        word = word.toLowerCase();
        
        clearInterval(this._timerid);

        this._timerid = setInterval(() => {

            word = this.setHead(word);
            if (word.length <= 0) {
                this.resetHead(this._canvas,);
                clearInterval(this._timerid);
            };
        }, 90);
    }
}
