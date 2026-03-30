const shaderProgramCache = new Map();

export async function createPixiFilter (shaderName, resources = { timeUniforms: { uTime: { value: 0.0, type: 'f32' } } }) {
    const vertPath = `./src/shaders/${shaderName}/${shaderName}.vert`;
    const fragPath = `./src/shaders/${shaderName}/${shaderName}.frag`;

    if (!shaderProgramCache.has(shaderName)) {
        const [vertSource, fragSource] = await Promise.all([
            fetch(vertPath).then(res => res.text()),
            fetch(fragPath).then(res => res.text())
        ]);

        const shaderProgram = PIXI.GlProgram.from({ vertex: vertSource, fragment: fragSource });

        shaderProgramCache.set(shaderName, shaderProgram);

    }

    return new PIXI.Filter({
        glProgram: shaderProgramCache.get(shaderName),
        resources: resources
    });

}