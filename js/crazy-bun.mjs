import { LitElement,  html, css } from './base-element.mjs';

class CrazyBun extends LitElement {

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
            }
			#game{
                background-color: deepskyblue;
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
              .st0{fill:#C9732F;}
	.st1{fill:#5E3F2A;}
	.st2{fill:#006A12;}
	.st3{fill:#183225;}
	.st4{fill:#366D50;}
	.st5{fill:none;stroke:#000000;stroke-width:2;stroke-miterlimit:10;}
	.st6{fill:none;stroke:#000000;stroke-linejoin:round;stroke-miterlimit:10;}
	.st7{fill:none;stroke:#000000;stroke-miterlimit:10;}
	.st8{fill:#313131;stroke:#000000;stroke-width:2;stroke-miterlimit:10;}
	.st9{fill:#9D9D9D;stroke:#000000;stroke-width:2;stroke-miterlimit:10;}
	.st10{fill:#E40001;stroke:#000000;stroke-width:2;stroke-miterlimit:10;}
	.st11{stroke:#000000;stroke-width:2;stroke-miterlimit:10;}
	.st12{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
	.st13{fill:#FFFFFF;stroke:#000000;stroke-width:2;stroke-miterlimit:10;}
	.st14{opacity:0.4;fill:#FFFFFF;enable-background:new    ;}
	.st15{fill:#BFDFFF;}
	.st16{fill:#333333;}
	.st17{fill:#F2F2F2;}
	.st18{fill:#94938F;}
	.st19{fill:#FFFFFF;}
	.st20{fill:#666666;}
	.st21{fill:none;stroke:#000000;stroke-width:0.6747;stroke-miterlimit:10;}
	.st22{fill:none;stroke:#FFFFFF;stroke-width:1.0121;stroke-miterlimit:10;}
	.st23{display:none;}
	.st24{display:inline;fill:#D3553D;}
	.st25{display:inline;fill:#D85B3D;}
	.st26{display:inline;fill:#FB7017;}
	.st27{display:inline;fill:#F9F667;}
	.st28{display:inline;fill:#FD7017;}
	.st29{display:inline;fill:#F4B343;}
	.st30{display:inline;fill:#F6F5F5;}
	.st31{display:inline;fill:#F86E18;}
	.st32{display:inline;fill:#F4B344;}
	.st33{display:inline;fill:#090505;}
	.st34{display:inline;fill:#FC6F17;}
	.st35{display:inline;fill:#F4B244;}
	.st36{display:inline;fill:#F4B144;}
	.st37{display:inline;fill:#D75D34;}
	.st38{display:inline;fill:#D55F33;}
	.st39{display:inline;fill:#D75D33;}
	.st40{display:inline;fill:#F4B044;}
	.st41{display:inline;fill:#D75F33;}
	.st42{display:inline;fill:#F4AF44;}
	.st43{display:inline;fill:#F4AA46;}
	.st44{display:inline;fill:#F4AB45;}
	.st45{display:inline;fill:#D55E34;}
	.st46{display:inline;fill:#D65F34;}
	.st47{display:inline;fill:#FADF5B;}
	.st48{display:inline;fill:#D3563B;}
	.st49{display:inline;fill:#E15D2D;}
	.st50{display:inline;fill:#0A0605;}
	.st51{display:inline;fill:#FAE05B;}
	.st52{display:inline;fill:#D3613B;}
	.st53{display:inline;fill:#D36C39;}
	.st54{display:inline;fill:#50264D;}
	.st55{display:inline;fill:#A58EB6;}
	.st56{display:inline;fill:#806086;}
	.st57{display:inline;fill:#90749B;}
	.st58{display:inline;fill:#9E86AB;}
	.st59{display:inline;fill:#633B63;}
	.st60{display:inline;fill:#BCAAD0;}
	.st61{display:inline;fill:#704D73;}
	.st62{display:inline;fill:#A994BA;}
	.st63{display:inline;fill:#F1ECF5;}
	.st64{display:inline;fill:#490101;}
	.st65{display:inline;fill:#B7A5C9;}
	.st66{display:inline;fill:#994949;}
	.st67{display:inline;fill:#552952;}
	.st68{display:inline;fill:#FDFCFD;}
	.st69{display:inline;fill:#5A355A;}
	.st70{display:inline;fill:#6A456D;}
	.st71{display:inline;fill:#E86D72;}
	.st72{display:inline;fill:#AF2A24;}
	.st73{fill:#D3553D;}
	.st74{fill:#FB7017;}
	.st75{fill:#F9F667;}
	.st76{fill:#FD7017;}
	.st77{fill:#F4B343;}
	.st78{fill:#F86E18;}
	.st79{fill:#F4B344;}
	.st80{fill:#090505;}
	.st81{fill:#FC6F17;}
	.st82{fill:#F4B244;}
	.st83{fill:#F4B144;}
	.st84{fill:#F4B044;}
	.st85{fill:#F4AF44;}
	.st86{fill:#F4AA46;}
	.st87{fill:#F4AB45;}
	.st88{fill:#FADF5B;}
	.st89{fill:#0A0605;}
	.st90{fill:#FAE05B;}
	.st91{fill:#50264D;}
	.st92{fill:#A58EB6;}
	.st93{fill:#806086;}
	.st94{fill:#90749B;}
	.st95{fill:#9E86AB;}
	.st96{fill:#633B63;}
	.st97{fill:#BCAAD0;}
	.st98{fill:#704D73;}
	.st99{fill:#A994BA;}
	.st100{fill:#490101;}
	.st101{fill:#B7A5C9;}
	.st102{fill:#994949;}
	.st103{fill:#FDFCFD;}
	.st104{fill:#5A355A;}
	.st105{fill:#552952;}
	.st106{fill:#6A456D;}
	.st107{fill:#E86D72;}
	.st108{fill:#AF2A24;}
	.st109{fill:#F6F5F5;}
	.st110{fill:#F1ECF5;}
        `;
    }

    constructor() {
        super();
        this.version = "1.0.0";
    }

    render() {
        return html`
			<svg id='game' viewBox="0 0 1200 700"></svg>
        `;
    }

    firstUpdated() {
        super.firstUpdated();
        setTimeout(() => this.init(), 100);
    }

    updated(e) {
        if (e.has('row') || e.has('column')) {
            this.row = this.row < 2 ? 2 : this.row > 10 ? 10 : this.row;
            this.column = this.column < 2 ? 2 : this.column > 10 ? 10 : this.column;
        }
        if (e.has('row') || e.has('column')) this.init();
    }

    async init() {
        const s = Snap(this.shadowRoot.getElementById("game")),
            vbW = 1200,
            vbH = 700,
            sun = s.circle(60, 600, 300),
            road1 = s.rect(-4, 580, vbW + 10, 130),
            road2 = s.rect(-4, 580, vbW + 10, 10);

        road2.attr({ fill: "grey" });
        sun.attr({ fill: "khaki", stroke: "goldenrod", strokeWidth: 40 });
        const night = s.rect(-4, -600, vbW + 10, 600);
        const moon = s.circle(980, 800, 60);
        moon.attr({ fill: "white" });
        let truck, lights, cactus, mountains, mountainRange, clouds, raccoon, raccoonBox, fishBox, fish, madFish;
        let timeText, pointsText;
        let bestPointsText;
        let value = 0;
        let isFish = false;
        let caughtFish = 0;
        let missedFish = 0;

        Snap.load("images/crazy-raccoon.svg", onSVGLoaded);

        function onSVGLoaded(data) {
            truck = data.select("#tGroup");
            lights = data.select("#lights");
            cactus = data.select("#cGroup");
            mountains = data.select("#mGroup");
            mountainRange = data.select("#mrGroup");
            clouds = data.select("#clGroup");
            raccoon = data.select("#rGroup");
            fish = data.select("#fGroup");

            s.append(mountains);
            s.append(mountainRange);
            s.append(cactus);
            s.append(clouds);
            s.append(fish);
            s.append(raccoon);
            s.append(truck);

            timeText = s.text(50, 80, '0');
            pointsText = s.text(550, 80, `0:0`);
            bestPointsText = s.text(1060, 80, '0');
            timeText.attr({ fill: 'yellow', "font-size": "40px" });
            pointsText.attr({ fill: 'yellow', "font-size": "40px" });
            bestPointsText.attr({ fill: 'yellow', "font-size": "40px" });

            // raccoon.transform('t100,136');
            // lights.attr({ visibility: "hidden" });
            // truck.transform('t60');
            // cactus.transform('t-1200');
			// fish.transform('t-600');
            //madFish.transform('t-600,150');
            // truck.hover(hoverOverTruck, hoverOutTruck);
            // truck.mousedown(mouseDownTruck);
            sun.hover(hoverOverSun, hoverOutSun);
            sun.mousedown(mouseDownSun);

            animateAll();

            let gameTime = 0;
            // let intervalID = setInterval(() => {
            //     gameTime += 1;
            //     timeText.attr({ text: Math.round(gameTime), fill: 'yellow', "font-size": "40px" });
            //     fishBox = fish.getBBox();
            //     raccoonBox = raccoon.getBBox();
            //     if (raccoon.inAnim().length !== 0) {
            //         let intersect = Snap.path.isBBoxIntersect(raccoonBox, fishBox);
            //         if ( intersect && !isFish){
            //             isFish = true;
            //             caughtFish++;
            //             pointsText.attr( { text: `${caughtFish}:${missedFish}` });
            //         }
            //     }
            // }, 100)


            // document.addEventListener('keydown', mouseDownTruck);
        }

        function raccoonJump( raccoon ){
            raccoon.animate( { transform: 't100,-270' }, 800, mina.backout, () => {
                raccoon.animate( { transform: 't100,140' }, 400, mina.bounce, () => {
                    // if ( raccoon.energy <= 0 ){
                    //     raccoon.attr( { visibility: "hidden" } );
                    // }
                })
            })
        }

    }
}

const data = {};

customElements.define("crazy-bun", CrazyBun);