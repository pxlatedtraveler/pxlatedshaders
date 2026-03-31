// https://pixijs.com/8.x/guides/components/filters
// https://pixijs.download/dev/docs/rendering.GlProgram.html
// https://pixijs.com/7.x/examples/mesh-and-shaders/uniforms
// https://developer.mozilla.org/en-US/docs/Web/API/WebGLProgram
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// https://www.html5gamedevs.com/topic/15731-confused-about-shaders-vs-filters/?do=findComment&comment=89213

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

/*
Filter Resources Type Chea Sheet

PixiJS Type String    GLSL Type    Bytes per Element    JS Data Type
f32	                  float        4 bytes              number
vec2	              vec2	       8 bytes	            Float32Array(2)
vec3	              vec3	       12 bytes	            Float32Array(3)
vec4	              vec4	       16 bytes	            Float32Array(4)
mat2	              mat2	       16 bytes	            Float32Array(4)
mat3	              mat3	       36 bytes	            Float32Array(9)
mat4	              mat4	       64 bytes	            Float32Array(16)
i32	                  int	       4 bytes	            number
u32	                  uint	       4 bytes	            number
*/