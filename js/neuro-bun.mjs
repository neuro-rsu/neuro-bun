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
                // background-color: deepskyblue;
                position: relative;
                display: block;
            }
            .a {
                fill: #1d1d1b;
            }

            .b {
                fill: #797979;
            }

            .c {
                fill: #fff;
            }

            .d {
                fill: #484848;
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

		// await fetch("images/crazy-bun.svg")
		// .then(response => response.text())
		// .then(svg => {
		// 	data.svg = svg;
		// });
        const s = Snap(this.shadowRoot.getElementById('crazyBun')),
            vbW = 1920,
            vbH = 1080;

//        road2.attr({ fill: "grey" });
        //sun.attr({ fill: "khaki", stroke: "goldenrod", strokeWidth: 40 });
        // const night = s.rect(-4, -600, vbW + 10, 600);
        // const moon = s.circle(980, 800, 60);
        // moon.attr({ fill: "white" });
        let forest, bun, fox, bear, wolf, hare;
        let costText;
        let populationText;
        let bestCostText;
        let currentPopulation = 0;
        //populationText.attr({ fill: 'yellow', "font-size": "40px" });
        //costText.attr({ fill: 'yellow', "font-size": "40px" });
        //const mystring = data.svg;
        //const blob = new Blob([mystring], { type: 'text/plain' });
        //const objectURL = URL.createObjectURL(blob);
        //Snap.load(objectURL, onSVGLoaded);
        const buns = Array(settings.populationCount);
        Snap.load("images/crazy-bun4.svg", onSVGLoaded.bind(this));
        let countDeadBun = 0;
        let bestBrain = null;



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
            // mountains = data.select("#mGroup");
            // mountainRange = data.select("#mrGroup");
            bun = data.select("#bunGroup");
            fox = data.select("#foxGroup");
            bear = data.select("#bearGroup");
            wolf = data.select("#wolfGroup");
            hare = data.select("#hareGroup");
            forest = data.select("#forestGroup");

            const canvas = this.shadowRoot.getElementById('forest');
            const ctx = canvas.getContext('2d');
            // const forestImage = new Image();
            // forestImage.src = 'images/png/forest.avif';
            const forestImage = forest.node;
            const foxImage = fox.node;
            const bearImage = bear.node;
            const wolfImage = wolf.node;
            const hareImage = hare.node;
            const piece = {image: forestImage, x:0, y:0};
            const foxPiece = {image: foxImage, x:1920, y:600};
            const bearPiece = {image: bearImage, x:1920, y:600};
            const wolfPiece = {image: wolfImage, x:1920, y:600};
            const harePiece = {image: hareImage, x:1920, y:600};
            function randomInteger(min, max) {
                let rand = min + Math.random() * (max + 1 - min);
                return Math.floor(rand);
            }
            let currentPiece;
            function selectAnimal() {
                switch(randomInteger(0,3)) {
                    case 0:  // if (x === 'value1')
                        currentPiece = harePiece
                        break;
                    case 1:
                        currentPiece = wolfPiece
                        break;
                    case 2:
                        currentPiece = bearPiece
                        break;
                    case 3:
                        currentPiece = foxPiece
                        break;
                }
            }
            selectAnimal()

            forestImage.onload = () => window.requestAnimationFrame(gameLoop);

            function gameLoop(){
                 // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height)

                ctx.drawImage(piece.image, piece.x, piece.y, 3840, 1080)
                // Brick stops when it gets to the middle of the canvas
                if (piece.x > -1533) {
                    piece.x -= 2;
                }
                else {
                    piece.x = 0;
                }

                ctx.drawImage(currentPiece.image, currentPiece.x, currentPiece.y, 150, 300)

                if (currentPiece.x > -200) {
                    currentPiece.x -= 15;
                } else {
                    currentPiece.x = 1920;
                    selectAnimal()
                }

                window.requestAnimationFrame(gameLoop)
            }
            // const canvas = this.shadowRoot.getElementById('forest');
            // const ctx = canvas.getContext('2d');
            // const forestImage = new Image();
            // forestImage.src = '/images/png/forest.avif';
            // const piece = {image: forestImage, x:0, y:0, width:100};
            // ctx.clearRect(0, 0, canvas.width, canvas.height)

            // // Draw at coordinates x and y
            // ctx.drawImage(piece.image, piece.x, piece.y, 2556, 900)

            costText = s.text(50, 80, '0');
            populationText = s.text(960, 80, `0:${settings.populationCount}`);
            bestCostText = s.text(1930, 80, '0');
            populationText.attr({ fill: 'yellow', "font-size": "40px" });
            costText.attr({ fill: 'yellow', "font-size": "40px" });
            bestCostText.attr({ fill: 'yellow', "font-size": "40px" });
            // s.append(forest);
            // s.append(mountains);
            // s.append(mountainRange);
            // s.append(fox);
            s.append(bun);
            // for (let index = 0; index < buns.length; index++) {
            //     buns[index] = bun.clone();
            //     buns[index].brain = bestBunBrain.clone();
            //     buns[index].brain.cost = 0;
            //     buns[index].energy = 100;
            //     s.append( buns[index] );
            //     buns[index].transform('t100,136');
            // }


            //let t = new Snap.Matrix();
            //t.translate(-1200, 0);

            //bun.transform('t100,136');
            //cactus.transform(t);
            // forest.transform('t-1278');
            fox.transform('t400,160');
            bun.transform('t144,750');
			// fish.transform('t-600,100');


            // sun.hover(hoverOverSun, hoverOutSun);
            // sun.mousedown(mouseDownSun);
            // moon.hover(hoverOverMoon, hoverOutMoon);
            // moon.mousedown(mouseDownMoon);
            animateAll();
            //text2.attr({ fill: 'yellow', "font-size": "40px" })

            let _value = 0;
            // let _int = setInterval(() => {
            //     value += 1;
            //     costText.attr({ text: Math.round(value), fill: 'yellow', "font-size": "40px" });
            //     fishBox = kindFish ? fish.getBBox() : madFish.getBBox();
            //     if (clouds.attr("fill") === "red") {
            //         clouds.attr({ fill: "white" });
            //     };
            //     buns.forEach( bun => {
            //         if (bun.inAnim().length === 0 && bun.energy <= 0 || bun.hasFish)
            //             return;
            //         bunBox = bun.getBBox();
            //         if (bun.inAnim().length !== 0) {
            //             let intersect = Snap.path.isBBoxIntersect(bunBox, fishBox);
            //             if ( intersect ){
            //                 bun.energy += kindFish ? 50 : -100;
            //                 if (bun.energy <= 0)
            //                     dead(bun);
            //                 bun.hasFish = true;
            //                 //text.attr({ text: '0', fill: 'yellow',  "font-size": "80px" });
            //                 if ( clouds.attr("fill") !== "red" ){
            //                     clouds.attr({ fill: "red" });
            //                 }
            //             }

            //         } else {
            //             const distance = bunBox.x - fishBox.x2;
            //             if ( distance >= 0 ){
            //                 const inputs = [[ map( distance, 0, 1200, 0, 1), kindFish ]];
            //                 const result =  bun.brain.feedForward(inputs[0]);
            //                 if ( result[1] > result[0] ){
            //                     bunJump(bun);
            //                     bun.energy -= 10;
            //                 }
            //             }
            //         }
            //     });

            // }, 100)
            document.addEventListener('keydown', mouseDownBun);
        }
        function animateAll() {
            // animatetTruck1();
            // animateCactus();
            // animateFish();
            // animateMountains();
            // animateMountainRange();
            // animateForest();
            // animateFox();
            // animateBun();
            // animateClouds();
        }
        // Генерация случайного число в диапазоне от min до max включительно
        function randomInteger( min, max ) {
            return Math.floor( min + Math.random() * (max + 1 - min) );
        }

        function map (n, start1, stop1, start2, stop2 ){
            return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
        }

        async function newPopulation() {
            // let count = 0;
            // let bestBrain = null;
            if ( clouds.attr("fill") !== "white" ){
                clouds.attr({ fill: "white" });
            }
            buns.forEach( bun => {
                if (bun.attr("visibility") === "hidden")
                    return;
                bun.hasFish = false;
                bun.energy -= kindFish ? 40 : 0;
                if (bun.energy <= 0)
                    dead(bun);
            });

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
        }
        // function animatetTruck1() { truck.animate({ transform: 't120,10' }, 6000, mina.easeinout, animatetTruck2) }
        // function animatetTruck2() { truck.animate({ transform: 't-10,0' }, 6000, mina.easeinout, animatetTruck1) }
        // function animateCactus() { cactus.animate({ transform: 't1300' }, 4000, mina.linear, animateCactus2) }
        // function animateCactus2() { cactus.transform('t-1200'); cactus.animate({ transform: 't1300' }, 4000, mina.linear, animateCactus) }
        // function animateFish() { fish.animate({ transform: 't1400' }, 5000, mina.linear, animateFish2) }
        // // function animateFish2() { fish.transform('t-500 s0.3'); fish.animate({ transform: 't500'}, 3000, mina.linear, animateFish) }
        // async function animateFish2() {
        //     await newPopulation();
        //     fish.transform('t-600,100');
        //     madFish.transform('t-600,150');
        //     kindFish = kindFish ? 0 : 1; //randomInteger(0,1);
        //     if (kindFish === 1) {
        //         fish.animate({ transform: 't1400,100' }, 5000, mina.linear, animateFish2);
        //     }
        //     else {
        //         madFish.animate({ transform: 't1400,150'}, 5000, mina.linear, animateFish2);
        //     }
        // }
        function animateMountains() { mountains.animate({ transform: 't1200' }, 8000, '', animateMountains2) }
        function animateMountains2() { mountains.transform('t-1278'); animateMountains() }
        function animateForest() { forest.animate({ transform: 't0' }, 10000, '', animateForest2) }
        function animateForest2() { forest.transform('t-1278'); animateForest() }
        function animateFox() { fox.animate({ transform: 't-1900,160' }, 5000, mina.linear, animateFox2) }
        function animateFox2() {fox.transform('t800,160'); animateFox()}
        function animateMountainRange() { mountainRange.animate({ transform: 't1200' }, 4000, '', animateMountainRange2) }
        function animateMountainRange2() { mountainRange.transform('t0'); animateMountainRange() }
        // function animateClouds() { clouds.animate({ transform: 't1200' }, 30000, '', animateClouds2) }
        // function animateClouds2() { clouds.transform('t0'); animateClouds() }
        function animateBun() { bun.animate({ transform: 't144,130' }, 800, mina.backout, animateBun2) }
        function animateBun2() { bun.animate({ transform: 't144,750' }, 400, mina.bounce) }
        // function hoverOverTruck() { document.body.style.cursor = "pointer" }
        // function hoverOutTruck() { document.body.style.cursor = "default" }
        function mouseDownBun() { animateBun() }
        function hoverOverSun() { document.body.style.cursor = "pointer" }
        function hoverOutSun() { document.body.style.cursor = "default" }
        // function lightsOn() { lights.attr({ visibility: "visible" }) }
        // function hoverOverMoon() { document.body.style.cursor = "pointer" }
        // function hoverOutMoon() { document.body.style.cursor = "default" }
        function mouseDownSun() {
            sun.animate({ transform: 't0,300' }, 1000, mina.bounce);
            night.animate({ transform: 't0,560' }, 1000, mina.bounce);
            moon.animate({ transform: 't0,-730' }, 1000, mina.bounce, lightsOn);
            clouds.attr({ "fill-opacity": 0.3 });
        }
        // function mouseDownMoon() {
        //     sun.animate({ transform: 't60' }, 3000, mina.linear);
        //     night.animate({ transform: 't0,-560' }, 1000, mina.bounce);
        //     moon.animate({ transform: 't0,730' }, 1000, mina.bounce);
        //     clouds.attr({ "fill-opacity": 1 });
        //     lights.attr({ visibility: "hidden" });
        // }
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