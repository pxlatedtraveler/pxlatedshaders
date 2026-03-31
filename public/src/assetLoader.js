// https://pixijs.download/dev/docs/assets.Assets.html
// https://pixijs.download/dev/docs/assets.AssetsBundle.html

export async function loadAssets(type, bundleName, nameArray = []) {

    if (!Array.isArray(nameArray)) nameArray = [nameArray];

    const assetBundle = {};

    for (let i = 0; i < nameArray.length; i++) {
        assetBundle[nameArray[i]] = `src/images/${type}/${nameArray[i]}.${type}`;
        console.log(`./src/images/${type}/${nameArray[i]}.${type}}`);
    }
    console.log('bundle:', assetBundle);

    PIXI.Assets.addBundle(bundleName, assetBundle);

    return await PIXI.Assets.loadBundle(bundleName);

}