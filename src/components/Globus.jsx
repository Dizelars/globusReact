import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import earthVertexShader from '../assets/shaders/earth/vertex.glsl'
import earthFragmentShader from '../assets/shaders/earth/fragment.glsl'
import atmosphereVertexShader from '../assets/shaders/atmosphere/vertex.glsl'
import atmosphereFragmentShader from '../assets/shaders/atmosphere/fragment.glsl'
import addLocation from '../utils/addLocation.js'

const Globus = ({ points, onAddPoint }) => {
  const canvasRef = useRef();
  const [sceneReady, setSceneReady] = useState(false);
  const sceneRef = useRef();
  const labels = useRef([]);
  const radius = 2;

  useEffect(() => {
    // Initialize Three.js
    const scene = new THREE.Scene();

    /**
     * Screen sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: Math.min(window.devicePixelRatio, 2)
    }

    // Camera
    const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(12, 5, 4);
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance',
      precision: 'lowp'
    });
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(sizes.pixelRatio)
    renderer.shadowMap.autoUpdate = false;
    renderer.setClearColor('#000011')

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    /**
     * Raycaster
     */
    const raycaster = new THREE.Raycaster();

    // Loaders
    const textureLoader = new THREE.TextureLoader()
    textureLoader.setCrossOrigin("anonymous");

    // Earth
    const earthParameters = {}
    earthParameters.atmosphereDayColor = '#00aaff'
    earthParameters.atmosphereTwilightColor = '#ff6600'

    // Textures for glob
    const earthDayTexture = textureLoader.load('textures/earth/day.jpg')
    earthDayTexture.colorSpace = THREE.SRGBColorSpace
    earthDayTexture.anisotropy = 8

    const earthNightTexture = textureLoader.load('textures/earth/night.jpg')
    earthNightTexture.colorSpace = THREE.SRGBColorSpace
    earthNightTexture.anisotropy = 8

    const earthSpecularCloudsTexture = textureLoader.load('textures/earth/specularClouds.jpg')
    earthSpecularCloudsTexture.anisotropy = 8

    // const earthDayTexture = textureLoader.load('./earth/day.jpg');
    // const earthGeometry = new THREE.SphereGeometry(radius, 64, 64);
    // const earthMaterial = new THREE.MeshBasicMaterial({ map: earthDayTexture });
    // const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    // scene.add(earth);
    // Mesh for glob

    let radius = 2;
    const earthGeometry = new THREE.SphereGeometry(radius, 64, 64)
    const earthMaterial = new THREE.ShaderMaterial({
        vertexShader: earthVertexShader,
        fragmentShader: earthFragmentShader,
        uniforms:
        {
            uDayTexture: new THREE.Uniform(earthDayTexture),
            uNightTexture: new THREE.Uniform(earthNightTexture),
            uSpecularCloudsTexture: new THREE.Uniform(earthSpecularCloudsTexture),
            uSunDirection: new THREE.Uniform(new THREE.Vector3(0, 0, 1)),
            uAtmosphereDayColor: new THREE.Uniform(new THREE.Color(earthParameters.atmosphereDayColor)),
            uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color(earthParameters.atmosphereTwilightColor))
        }
    })
    const earth = new THREE.Mesh(earthGeometry, earthMaterial)
    earth.geometry.rotateY(-Math.PI * 0.5);
    earth.name = 'earth';
    scene.add(earth)

    // Atmosphere for glob
    const atmosphereMaterial = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      transparent: true,
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms:
      {
          uSunDirection: new THREE.Uniform(new THREE.Vector3(0, 0, 1)),
          uAtmosphereDayColor: new THREE.Uniform(new THREE.Color(earthParameters.atmosphereDayColor)),
          uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color(earthParameters.atmosphereTwilightColor))
      },
    })

    const atmosphere = new THREE.Mesh(earthGeometry, atmosphereMaterial)
    atmosphere.scale.set(1.04, 1.04, 1.04)
    scene.add(atmosphere)

    /**
     * Sun
     */
    // Coordinates for sun
    const sunSpherical = new THREE.Spherical(1, Math.PI * 0.5, 0.5)
    const sunDirection = new THREE.Vector3()

    // Debug for sun
    const debugSun = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.1, 2),
      new THREE.MeshBasicMaterial()
    )
    // scene.add(debugSun)

    // Обновление освещения 
    const updateSun = () =>
      {
          // Sun direction
          sunDirection.setFromSpherical(sunSpherical)
      
          // Debug
          debugSun.position
              .copy(sunDirection)
              .multiplyScalar(5)
      
          // Uniforms
          earthMaterial.uniforms.uSunDirection.value.copy(sunDirection)
          atmosphereMaterial.uniforms.uSunDirection.value.copy(sunDirection)
      }
      
      updateSun()


    // Handle resize
    const handleResize = () => {
      // renderer.setSize(window.innerWidth, window.innerHeight);
      // camera.aspect = window.innerWidth / window.innerHeight;
      // camera.updateProjectionMatrix();
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
      sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)

      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(sizes.pixelRatio)
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    // const clock = new THREE.Clock()
    const tick = () => {
      // Обновляем вращение Земли
      // const elapsedTime = clock.getElapsedTime()
      // earth.rotation.y = elapsedTime * 0.1

      controls.update();

      // Обновляем позицию и видимость типонов
      // raycasterTipons();
      // positionTipons();

      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };
    tick();

    sceneRef.current = { scene, earth, camera, controls, renderer };
    setSceneReady(true);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (sceneReady) {
      const { earth } = sceneRef.current;

      // Add points to the globe
      console.log(points);
      points.forEach(({ id, lat, lng }) => {
        // const latRad = THREE.MathUtils.degToRad(90 - lat);
        // const lngRad = THREE.MathUtils.degToRad(lng);

        // const positionVector = new THREE.Vector3().setFromSphericalCoords(radius, latRad, lngRad);
        // const pointElement = document.createElement('div');
        // pointElement.className = 'point';
        // pointElement.id = id;
        // pointElement.style.position = 'absolute';
        // pointElement.addEventListener('click', () => onAddPoint(id));
        // labels.current.push({ id, element: pointElement, position: positionVector });

        console.log(id)

        addLocation(earth, lat, lng, radius, id);
      });
    }
  }, [points, sceneReady, onAddPoint]);

  return <canvas ref={canvasRef} className="webgl"></canvas>;
};

export default Globus;
