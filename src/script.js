import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader, RGBELoader } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';




import Stats from 'three/examples/jsm/libs/stats.module.js';



/* Stats */
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom); 
/* Stats ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/






/**
 * Loaders
 */
const rgbeLoader = new RGBELoader();
const gltfLoader = new GLTFLoader();
/* Loaders ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */



















/**
 * Base
 */
// Debug
/* const gui = new GUI()
const debugObject = {} */


























// Canvas
const canvas = document.querySelector('canvas.webgl')
/* Canvas ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */
























// Scene
const scene = new THREE.Scene()
/* Scene ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */


/* Helpers */
const axesHelper = new THREE.AxesHelper(40)
scene.add(axesHelper)


const size = 10;
const divisions = 10;
const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );
/* Helpers ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */







import loadingScreenVertexShader from 'environmentMap/shaders/loading_screen/vertex.glsl'
import loadingScreenFragmentShader from 'environmentMap/shaders/loading_screen/fragment.glsl'



/* Loading Screen */
    const loaderGeometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    const loaderMaterial = new THREE.RawShaderMaterial({ 
        vertexShader: loadingScreenVertexShader,
        fragmentShader: loadingScreenFragmentShader
    });
    const loadingScreen = new THREE.Mesh(loaderGeometry, loaderMaterial);
    scene.add(loadingScreen);
/* Loading Screen ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/






/**
 * Update all materials
 */
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            // child.material.envMap = environmentMap
            child.material.envMapIntensity = debugObject.envMapIntensity
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}
/* Update all materials ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */





















/**
 * HDR (RGBE) Environment map
 */
rgbeLoader.load('environmentMap/360_SPACE_PANORAMA.hdr', (environmentMap) => 
    {
        environmentMap.mapping = THREE.EquirectangularReflectionMapping;

        scene.background = environmentMap;
        scene.environment = environmentMap;
    })


/*
debugObject.envMapIntensity = 0.4
gui.add(debugObject, 'envMapIntensity').min(0).max(4).step(0.001).onChange(updateAllMaterials)
 */
/**
 * Models
 */


// Update materials
//updateAllMaterials()
/* HDR (RGBE) Environment Map ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */
























/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
/* Sizes ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */





















// Camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.set(6, 4, 8)
scene.add(camera)
/* Camera ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */



















// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
/* Controls ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */


















/* Renderer ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: false
})
renderer.toneMapping = THREE.NoToneMapping;
renderer.shadowMap.enabled = false;

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
/* Renderer ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */


/* Actual content ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */

    /* Entrance Area */
/* const entranceGeometry = new THREE.PlaneGeometry( 1, 1 );
const entranceMaterial = new THREE.MeshPhongMaterial( { side: THREE.DoubleSide} );
const entrancePlane = new THREE.Mesh( entranceGeometry, entranceMaterial );
entrancePlane.rotation.x = Math.PI / 2;
scene.add( entrancePlane ); */
gltfLoader.load('entrance_asteroid.glb', (gltf) =>
    {
       scene.add(gltf.scene) 
    }
)

    /* Entrance Area */

    /* Green Crystal Meteroid */
    gltfLoader.load('Asteroid_Green_Crystals_1D.glb', (gltf) =>
        {
            const green_asteroid = gltf.scene;
            green_asteroid.position.z = 50;
            scene.add(green_asteroid) 
        }
)
    /* Green Crystal Meteroid */

    /* 1E Asteroid */
    gltfLoader.load('Asteroid_1E.glb', (gltf) =>
        {
            const asteroid_1E = gltf.scene;
            asteroid_1E.position.z = -50;
            scene.add(asteroid_1E) 
        }
)
    /* Green Crystal Meteroid */

    /* Moon Asteroid */
    gltfLoader.load('Moon_asteroid.glb', (gltf) =>
        {
            const moon_asteroid = gltf.scene;
            moon_asteroid.position.x = -50;
            moon_asteroid.scale.x = 0.1;
            moon_asteroid.scale.y = 0.1;
            moon_asteroid.scale.z = 0.1;
            scene.add(moon_asteroid) 
        }
    )
    /* Moon Asteroid */

    /* 1C Asteroid */
    gltfLoader.load('Asteroid_1C.glb', (gltf) =>
        {
            const asteroid_1C = gltf.scene;
            asteroid_1C.position.x = 50;
            scene.add(asteroid_1C) 
        }
    )
    /* 1C Asteroid */

    /* 1A Asteroid */
    gltfLoader.load('Asteroid_1A.glb', (gltf) =>
        {
            const asteroid_1A = gltf.scene;
            asteroid_1A.position.x = 20;
            scene.add(asteroid_1A) 
        }
    )
    /* 1A Asteroid */


    /* Green Crystal Meteroid */
/* Actual content ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */









/* Test */

/* Test */










/* Animate ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    stats.begin();

    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    stats.end();
}
/* Animate ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */


tick()