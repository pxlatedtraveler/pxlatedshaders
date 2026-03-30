import { createPixiFilter } from "./filterFactory.js";

const app = new PIXI.Application();
await app.init({ resizeTo: window, resolution: window.devicePixelRatio || 1 });
document.body.appendChild(app.canvas);

window.addEventListener('resize', () => {
    bg.width = app.screen.width;
    bg.height = app.screen.height;
});

// Grab shader
const filterResources = { timeUniforms: { uTime: {value: 0.0, type: 'f32' } } };
const customFilter = await createPixiFilter('pulse'); //pulse, filterResources

const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
bg.width = app.screen.width;
bg.height = app.screen.height;
bg.filters = [customFilter];
app.stage.addChild(bg);

app.ticker.add((ticker) => {
    if (customFilter.resources.timeUniforms) {
        customFilter.resources.timeUniforms.uniforms.uTime += 0.02 * ticker.deltaTime;
    }
});
