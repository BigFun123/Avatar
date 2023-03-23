/**
 * 3d Avatar
 */
export class Avatar3D {
    heads = [];
    actions = [];
    animGroup = null;
    eyes = null;
    currentAnim = "idle";
    nextAnim = "idle";
    fade = 0;
    constructor(scene) {
        // load babylonjs 3d model here

        this.scene = scene;

        this.mapping = [
            { "head": "m", "phonemes": ["b", "m", "n", "p", "v"] },
            { "head": "a", "phonemes": ["a", "he", "d", "h", "i", "u", "er"] },
            { "head": "e", "phonemes": ["pe", "de", "se", "e", "y"] },
            { "head": "g", "phonemes": ["ng", "g"] },
            { "head": "o", "phonemes": ["f", "lo", "ou", "o", "q", "w", "au", "uy", "w"] },
            { "head": "l", "phonemes": ["rl", "r", "l"] },
            { "head": "s", "phonemes": ["c", "j", "k", "s", "sh", "th", "t", "x", "zh"] },
            { "head": "s", "phonemes": ["/", ":"] },

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
        var t = mouths.find(mouth => mouth.id == "m");
        this.heads["m"] = mouths.find(mouth => mouth.id == "m" || mouth.id.startsWith("m."));
        this.heads["a"] = mouths.find(mouth => mouth.id == "a" || mouth.id.startsWith("a."));
        this.heads["e"] = mouths.find(mouth => mouth.id == "e" || mouth.id.startsWith("e."));
        this.heads["g"] = mouths.find(mouth => mouth.id == "g" || mouth.id.startsWith("g."));
        this.heads["o"] = mouths.find(mouth => mouth.id == "o" || mouth.id.startsWith("o."));
        this.heads["r"] = mouths.find(mouth => mouth.id == "a" || mouth.id.startsWith("a."));
        this.heads["l"] = mouths.find(mouth => mouth.id == "l" || mouth.id.startsWith("l."));
        this.heads["s"] = mouths.find(mouth => mouth.id == "s" || mouth.id.startsWith("s."));
        this.heads["eyes"] = mouths.find(mouth => mouth.id == "eyes" || mouth.id.startsWith("eyes."));
        this.heads["blink"] = mouths.find(mouth => mouth.id == "blink" || mouth.id.startsWith("blink."));

        this.setHead("m");
    }

    getActions(scene) {
        this.actions = [];
        this.actions["idle"] = this.findAction("idle");        
        this.actions["talk"] = this.findAction("talk");
    }

    findAction(basename) {
        var action = this.scene.getAnimationGroupByName(basename);
        if (action !== null) { return action;}
        for (var i=0; i< 10; i++) {
            var name = basename + "." + i.toString().padStart(3, '0');
            action = this.scene.getAnimationGroupByName(name);
            if (action != null) {
                return action;
            }
        }
        console.error("Could not find action " + basename);
    }

    getBlends(skeletons) {
        this.actions["idle"].setWeightForAllAnimatables(1);
        this.actions["talk"].play(true);
        this.actions["talk"].setWeightForAllAnimatables(0);
        this.actions["talk"].play(true);
        this.fader();
    }

    load(folder, name) {
        this.name = name;
        return new Promise((resolve, reject) => {
            BABYLON.SceneLoader.ImportMesh("", "./" + folder + "/" + name + "/", name + ".glb", this.scene, (newMeshes, particleSystems, skeletons, animationGroups) => {
                var hero = newMeshes[0];
                this.getMouths(newMeshes);
                this.getActions(hero);
                this.getBlends(skeletons);
                this.blink();
                resolve(hero);
            });
        });
    }

    blink() {
        setInterval(() => {
            this.heads["eyes"].isVisible = false;
            this.heads["blink"].isVisible = true;
            setTimeout(() => {
                this.heads["eyes"].isVisible = true;
                this.heads["blink"].isVisible = false;
            }, 100);
        }, 3200);
    }

    resetHead() {
        this.setHead("m");
    }

    getWord(word) {
        var ohead = '';
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

    setHead(word) {
        if (!word) return;

        var result = this.getWord(word);
        word = result[0];


        var head = this.heads[result[1]]
        if (!head) head = this.heads["m"];
        // console.log(result);

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

    fader() {
        setInterval(() => {
            if (this.returnToIdle) {
                this.fade -= 0.01;
                if (this.fade < 0) this.fade = 0;
            } else {
                this.fade += 0.01;
                if (this.fade > 1) this.fade = 1;
            }
            
           // console.log(this.currentAnim, this.fade);

            if (this.currentAnim !== "idle") {
                
                this.actions[this.currentAnim].setWeightForAllAnimatables(this.fade);
            }

        }, 10);
    }

    animate(animation) {
        console.log(animation);                
        
        if (animation == "idle") {
            this.returnToIdle = 1;
        } else {
            this.returnToIdle = 0;
            this.currentAnim = animation;
        }
        this.actions["idle"].play(true);
        this.actions[animation].play(true);
    }

    setWord(word) {
        if (this.heads == {}) return;
        word = word.toLowerCase();

        clearInterval(this._timerid);

        this._timerid = setInterval(() => {
            word = this.setHead(word);

            if (!word || word.length <= 0) {
                clearInterval(this._timerid);
                setTimeout(() => {
                    this.resetHead();
                }, 200);
            };


        }, 80);
    }
}
