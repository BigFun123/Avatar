class Avatar {
    _timerid = null;
    _name;
    constructor(name) {
        this._name = name;        
        this._canvas = document.getElementById("canvas").getContext("2d");
        this._canvas.fillStyle = "white";
        this._canvas
        this.heads = {};

        this.mapping = [
            { "head": "a", "phonemes": ["'", "a", "d", "e", "h", "i", "u"] },
            { "head": "blink", "phonemes": ["m"] },
            { "head": "m", "phonemes": ["b", "m", "n", "ng", "p", "v"] },
            { "head": "o", "phonemes": ["f", "o", "q", "w", "uy", "y"] },
            { "head": "r", "phonemes": ["rl", "r", "l"] },
            { "head": "s", "phonemes": ["c", "g", "j", "k", "s", "sh", "t", "th", "x", "z", "zh"] }
        ];

        this.loadHead('a');
        this.loadHead('m');
        this.loadHead('o');
        this.loadHead('r');
        this.loadHead('s');
        this.loadHead('blink');

        setInterval(() => {
            this._canvas.clearRect(0, 0, this._canvas.canvas.width, this._canvas.canvas.height);
            this._canvas.drawImage(this.heads["blink"], 0, 0);
            setTimeout(() => {
                this._canvas.clearRect(0, 0, this._canvas.canvas.width, this._canvas.canvas.height);
                this._canvas.drawImage(this.heads["m"], 0, 0);
            }, 100);
        }, 4000);
    }

    loadHead(head) {
        let img = new Image();
        img.src = `${this._name}/${head}.png`;
        this.heads[head] = img;
    }

    setHead(canvas, word) {
        if (!word) return;

        var result = this.getWord(word);
        word = result[0];

        
        this._canvas.clearRect(0, 0, this._canvas.canvas.width, this._canvas.canvas.height);
        // console.log("head", result[1], "word", result[0]);
        canvas.drawImage(this.heads[result[1] || "m"], 0, 0);
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

    resetHead() {
        this._canvas.clearRect(0, 0, this._canvas.canvas.width, this._canvas.canvas.height);
        this._canvas.drawImage(this.heads["m"], 0, 0);
    }

    setWord(word) {
        if (this.heads=={}) return;
        word = word.toLowerCase();
        
        clearInterval(this._timerid);

        this._timerid = setInterval(() => {

            word = this.setHead(this._canvas, word);
            if (word.length <= 0) {
                this.resetHead(this._canvas,);
                clearInterval(this._timerid);
            };
        }, 90);
    }

}

