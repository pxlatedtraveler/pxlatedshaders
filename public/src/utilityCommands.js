// https://pixijs.download/dev/docs/scene.DestroyOptions.html
// https://pixijs.download/dev/docs/scene.Sprite.html#destroy

export const DataTypes = {
    PNG: 'png',
    JPG: 'jpg',
    GIF: 'gif',
    WEBP: 'webp',
    AVIF: 'avif',
    SVG: 'svg',
    MP4: 'mp4',
    M4V: 'm4v',
    WEB: 'webm',
    OGG: 'ogg',
    OGV: 'ogv',
    H264: 'h264',
    AVI: 'avi',
    MOV: 'mov',
    JSON: 'json',
    FNT: 'fnt',
    XML: 'xml',
    TXT: 'txt',
    TTF: 'ttf',
    OTF: 'otf',
    WOFF: 'woff',
    WOFF2: 'woff2',
    BASIS: 'basis',
    DDS: 'dds',
    KTX: 'ktx',
    KTX2: 'ktx2'
}

export function destroySprites (sprites = [], options = {}) {

    if (!Array.isArray(sprites)) sprites = [sprites];

    for (let i = 0; i < sprites.length; i++) {

        sprites[i].destroy(options);

    }

}

export function destroyFilter(sprites = [], filter) {

    if (!Array.isArray(sprites)) sprites = [sprites];

    for (let i = 0; i < sprites.length; i++) {

        let filterToPop;
        sprites[i].filters.forEach((f, index) => { 
            if (f.uid === filter.uid) filterToPop = index;
         });
         sprites[i].splice(filterToPop, 1);

    }

    filter.destroy();

}

export function destroyShaderProgram (shaderName) {

    const shaderProgram = shaderProgramCache.get(shaderName);

    if (shaderProgram) {

        shaderProgram.destroy();
        shaderProgramCache.delete(shaderName);

    }

}