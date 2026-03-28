export class PixiFilterManager {
    constructor () { this.cache = new Map(); }

    async makePixiFilter (shaderName, uniforms = {}) {
        if (!this.cache.has(shaderName)) {
            const res = await fetch(`./js/shaders/${shaderName}.frag`);
            if (!res.ok) throw new Error(`Shader ${shaderName} not found.`);
            const code = await res.text();
            this.cache.set(shaderName, code);
        }

        const fragSource = this.cache.get(shaderName);

        const filter = PIXI.Filter.from({
            glProgram: { fragment: fragSource },
            resources: {
                // Think of these like the uniform groups in Cocos? YAML
                timeUniforms: { uTime: { value: 0.0, type: 'f32' } },
                colorUniforms: { uColor1: { value: new Float32Array[0.0, 0.0, 0.0, 1.0], type: 'vec4<f32>' } }
            },
        });

        return filter;
    }
}