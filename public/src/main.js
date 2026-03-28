const app = new PIXI.Application();
await app.init({ resizeTo: window });
document.body.appendChild(app.canvas);

//Grab shader
async function loadShader(name) {
    const r = await fetch(`./src/shaders/${name}.frag`);
    return await r.text();
}