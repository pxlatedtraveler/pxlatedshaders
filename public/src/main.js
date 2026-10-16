import { createPixiFilter } from "./filterFactory.js";
import { loadAssets } from "./assetLoader.js";
import { DataTypes, ratioResize, resize } from "./utilityCommands.js";

const app = new PIXI.Application();
await app.init({ resizeTo: window, resolution: window.devicePixelRatio || 1 });
document.body.appendChild(app.canvas);

window.addEventListener('resize', () => {

    const oldWindowSize = { width: bg.width, height: bg.height }; // this works perfect, but I wish I could control a rect size within the canvas, consistently.
    const oldBgSize = { width: bg.width, height: bg.height }; // was hoping this would work, for control. It should but...timing I think.
    // Actually I think the above is working EXACTLY as intended, but it isn't how I want it to wokr because bg is inside container, and container is being told to reize by RATIO and not match window size itself...
    //so figure out how you need to lay it out to actually make it work. I think I can. By doing what I thought of before:
    // Which is to use an transparent background as the controller.
    
    //const oldContainerSize = container.getSize();
    app.resizeTo = window;
    const newAppSize = { width: app.screen.width, height: app.screen.height };
    //resize(bg, newAppSize);
    ratioResize(newAppSize, container, oldWindowSize);

});

// Grab shader
const filterResources = { timeUniforms: { uTime: {value: 0.0, type: 'f32' } } };
const customFilter = await createPixiFilter('pulse', filterResources); //pulse, filterResources

const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
bg.width = app.screen.width;
bg.height = app.screen.height;
bg.filters = [customFilter];
//app.stage.addChild(bg);

// To add all non-bg content for scale
const container = new PIXI.Container();
container.addChild(bg);

// Grab Images
await loadAssets(DataTypes.PNG, 'mainAssets', 'avatarPXL');
const avatarPXL = PIXI.Sprite.from('avatarPXL');
avatarPXL.scale.set(0.5);
container.addChild(avatarPXL);

app.stage.addChild(container);

let containerSize = container.getSize();
console.log('original container size', containerSize);

app.ticker.add((ticker) => {

    if (customFilter.resources.timeUniforms) {

        customFilter.resources.timeUniforms.uniforms.uTime += 0.02 * ticker.deltaTime;

    }
});