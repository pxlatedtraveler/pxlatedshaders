const app = new PIXI.Application();
await app.init({ resizeTo: window, resolution: window.devicePixelRatio || 1 });
document.body.appendChild(app.canvas);

window.addEventListener('resize', () => {
    bg.width = app.screen.width;
    bg.height = app.screen.height;
});

// Grab shader
async function loadShader (url) {
    const response = await fetch(url);
    if (!response) throw new Error(`Failed to load shader: ${url}`);
    return response.text();
}

// Create GLProgram and Filter
const fragmentSource = await loadShader(`./src/shaders/pulse.frag`);
const vertexSource = await loadShader(`./src/shaders/default.vert`);

const shaderProgram = PIXI.GlProgram.from({fragment: fragmentSource, vertex: vertexSource});
const resources = { timeUniforms: { uTime: { value: 0.0, type: 'f32' }, }, };

const customFilter = new PIXI.Filter({
    glProgram: shaderProgram,
    resources: resources,
    });

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


// Try new strucutre. Keep main.js for main pixi stuff.
// But each individual shader would be its own js file that contains the shader code, and maybe also the filter.
// Filter Factory?