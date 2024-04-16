import { BaseElement, html, css } from './base-element.mjs';
import {settings, loadSettings} from './settings.mjs';
import {bestBunBrain, changeBestBunBrain, createBestBunBrain} from './bun-brain.mjs'
import { NeuralNetwork } from './neuro-net.mjs';


class NeuroBun extends BaseElement {

    static get properties() {
        return {
            version: { type: String, default: '1.0.0', save: true, category: 'settings' }
        }
    }

    static get styles() {
        return css`
            :host {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                box-sizing: border-box;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                height: 100vh;
            }
            * {
                box-sizing: border-box;
            }
			#crazyBun{
                position: relative;
                display: block;
            }


            canvas {
                position: absolute;
                display: block;
                height: 100vh;
                width: 100%;
            }

            svg {
                height: 100vh;
                aspect-ratio: 1 / 1;
            }

        `;
    }

    constructor() {
        super();
        this.version = "1.0.0";
    }

    render() {
        return html`
            <canvas id="forest"  width="1920" height="1080"></canvas>
            <svg id='crazyBun' class='img-responsive' preserveAspectRatio="none meet" viewBox="0 0 1920 1080"></svg>
        `;
    }

    firstUpdated() {
        super.firstUpdated();
        setTimeout(() => this.init(), 100);
        //window.addEventListener('resize', () => FLIP.throttle('resize', () => this.fontSize = this._fontSize, 300), false);
    }

    bunJump() {
       animateBun();
    }
    updated(e) {
        if (e.has('row') || e.has('column')) {
            this.row = this.row < 2 ? 2 : this.row > 10 ? 10 : this.row;
            this.column = this.column < 2 ? 2 : this.column > 10 ? 10 : this.column;
        }
        if (e.has('row') || e.has('column')) this.init();
    }

    createPopulation(buns) {
        for (let index = 0; index < buns.length; index++) {
            buns[index] = bestBunBrain.clone();
            buns[index].cost = 0;
        }
    }

    async init() {
        await loadSettings();
        await createBestBunBrain();

        const s = Snap(this.shadowRoot.getElementById('crazyBun'));
        let bun;
        let costText;
        let populationText;
        let bestCostText;

        let currentPopulation = 0;

        const buns = Array(settings.populationCount);
        Snap.load("images/crazy-bun4.svg", onSVGLoaded.bind(this));
        let countDeadBun = 0;
        let bestBrain = null;
        let isJump = false;

        function dead(bun) {
            bun.brain.cost = +costText.attr( "text" );
            if ( bestBrain == null || bun.brain.cost > bestBrain.cost ){
                bestBrain = bun.brain
            }
            countDeadBun++;
            populationText.attr( { text: `${currentPopulation}:${settings.populationCount - countDeadBun}` });
            bun.attr({ visibility: "hidden" });
        }

        function onSVGLoaded(data) {
            let isSay = false;
            const canvas = this.shadowRoot.getElementById('forest');
            const ctx = canvas.getContext('2d');

            const forest = {image: data.select("#forestGroup").node, x:0, y:0, h: 400, w: 200, audio: new Audio('audio/bun.mp3')};
            forest.audio.volume = 0.3;

            const heros = [6];
            heros[0] = {image: data.select("#grandpaGroup").node, x:1920, y:500, h: 400, w: 200, audio: new Audio('audio/grandpa.mp3')};
            heros[1] = {image: data.select("#grandmaGroup").node, x:1920, y:500, h: 400, w: 200, audio: new Audio('audio/grandma.mp3')};
            heros[2] = {image: data.select("#hareGroup").node, x:1920, y:500, h: 400, w: 200, audio: new Audio('audio/hare.mp3')};
            heros[3] = {image: data.select("#wolfGroup").node, x:1920, y:500, h: 400, w: 200, audio: new Audio('audio/wolf.mp3')};
            heros[4] = {image: data.select("#bearGroup").node, x:1920, y:500, h: 400, w: 200, audio: new Audio('audio/bear.mp3')};
            heros[5] = {image: data.select("#foxGroup").node, x:1920, y:500, h: 400, w: 200, audio: new Audio('audio/fox.mp3')};

            heros.forEach( hero =>
                hero.audio.volume = 0.2
            )

            let currentPiece;

            bun = data.select("#bunGroup");

            function randomInteger(min, max) {
                let rand = min + Math.random() * (max + 1 - min);
                return Math.floor(rand);
            }

            function selectAnimal() {
                // const heroIndex = randomInteger(0, heros.length - 2)
                // const heroIndex = 0
                // currentPiece = heros[heroIndex];
                // [heros[heroIndex], heros[heros.length - 1]] = [heros[heros.length - 1], heros[heroIndex]];
                currentPiece = heros.shift()
                heros.push(currentPiece)
            }

            selectAnimal()

            forest.image.onload = () => window.requestAnimationFrame(gameLoop);

            function gameLoop() {
                ctx.clearRect(0, 0, canvas.width, canvas.height)

                ctx.drawImage(forest.image, forest.x, forest.y, 3840, 1080)

                forest.x = forest.x > -1533 ? forest.x - 2 : 0;

                ctx.drawImage(currentPiece.image, currentPiece.x, currentPiece.y, 200, 400)

                if (currentPiece.x > -200) {
                    currentPiece.x -= 12;
                    if (countDeadBun === settings.populationCount) {
                        forest.audio.play();
                        isSay = true;
                    }
                    else if (currentPiece.x < 144 - currentPiece.w && !isSay) {
                        currentPiece.audio.play();
                        isSay = true;
                    }
                } else {
                    currentPiece.x = 1920;
                    isSay = false;
                    newPopulation()
                    selectAnimal()
                }

                window.requestAnimationFrame(gameLoop)
            }

            costText = s.text(50, 80, '0');
            populationText = s.text(960, 80, `0:${settings.populationCount}`);
            bestCostText = s.text(1840, 80, '0');
            populationText.attr({ fill: 'green', "font-size": "40px" });
            costText.attr({ fill: 'green', "font-size": "40px" });
            bestCostText.attr({ fill: 'green', "font-size": "40px" });

            for (let index = 0; index < buns.length; index++) {
                buns[index] = bun.clone();
                buns[index].brain = bestBunBrain.clone();
                buns[index].brain.cost = 0;
                buns[index].energy = 100;
                s.append( buns[index] );
                buns[index].transform('t144,750');
            }

            function intersection(a, b) {
                const width = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
                const height = Math.min(a.y + a.h, b.y+ b.h) -  Math.max(a.y, b.y);
                return width >= 0 && height >= 0;
            }

            async function newPopulation() {
                if ( countDeadBun === settings.populationCount ){
                    currentPopulation++;
                    value = 0;
                    costText.attr( {text: '0'} );
                    if ( bestBrain?.cost > bestBunBrain.cost ){
                        bestCostText.attr({text: bestBrain?.cost});
                    }
                    populationText.attr( { text: `${currentPopulation}:${settings.populationCount}`});
                    await changeBestBunBrain( bestBrain );
                    buns.forEach( bun => {
                        bun.brain = bestBunBrain.clone();
                        bun.brain.cost = 0;
                        bun.energy = 100;
                        if ( Math.random() < 0.75 ){
                            bun.brain.mutate();
                        }
                        bun.attr({ visibility: "visible" });
                    });
                    countDeadBun = 0;
                    bestBrain = null;
                }
                else {
                    buns.forEach( bun => {
                        if (bun.attr("visibility") !== "hidden") {
                            bun.energy += 10;
                        }
                    });
                }
            }
            let value = 0;
            let _int = setInterval(() => {
                value += 1;
                costText.attr({ text: Math.round(value), fill: 'green', "font-size": "40px" });
                buns.forEach( bun => {
                    if (bun.attr("visibility") === "hidden")
                        return;
                    const bunBox = bun.getBBox();
                    if ( intersection(bunBox,currentPiece) ){
                        dead(bun);
                        return;
                    }
                    if (bun.inAnim().length === 0) {
                        const distance = currentPiece.x - bunBox.x;
                        if ( distance >= 0 ){
                            const inputs = [[ map( distance, 0, 1920, 0, 1)]];
                            const result =  bun.brain.feedForward(inputs[0]);
                            if ( result[1] > result[0] ){
                                bunJump(bun);
                                bun.energy -= 10;
                            }
                        }
                    }
                });
            }, 100)
            //document.addEventListener('keydown', mouseDownBun);
        }

        // Генерация случайного число в диапазоне от min до max включительно
        function randomInteger( min, max ) {
            return Math.floor( min + Math.random() * (max + 1 - min) );
        }

        function map (n, start1, stop1, start2, stop2 ){
            return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
        }

        function animateBun() {
            if (isJump) {
                return
            }
            isJump = true;
            bun.animate({ transform: 't144,130' }, 800, mina.backout, animateBun2)
        }
        function animateBun2() {
            bun.animate({ transform: 't144,750' }, 400, mina.bounce, animateBun3)
        }
        function animateBun3() {
            isJump = false;
        }

        function mouseDownBun() { animateBun() }

        function bunJump( bun ){
            bun.animate( { transform: 't144,200' }, 800, mina.backout, () => {
                bun.animate( { transform: 't144,750' }, 400, mina.bounce, () => {
                    if ( bun.energy <= 0 && bun.attr("visibility") !== "hidden") {
                        dead(bun);
                    }
                })
            })
        }

    }
}

const data = {};

customElements.define("neuro-bun", NeuroBun);
