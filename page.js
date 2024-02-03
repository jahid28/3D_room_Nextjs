"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; // Updated import path

function Home() {
  const canvasRef = useRef(null);

  function handleButtonClick(texture) {
    // cube.material.color.setHex(Math.random() * 0xffffff);
    setup.children[26].material.map = textureLoader.load(texture);
  }

  function animate() {
    // if(setup){
    //   setup.rotation.y+=.01
    // }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({alpha:true});
  renderer.setSize(window.innerWidth, window.innerHeight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // const axis = new THREE.AxesHelper(20);
  // scene.add(axis);

  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  // const grid = new THREE.GridHelper();
  // scene.add(grid);

  const pointLight = new THREE.PointLight("white");
  pointLight.power = 1500;
  scene.add(pointLight);
  pointLight.position.set(6, 5, 0);
  // const pointLightHelper = new THREE.PointLightHelper(pointLight);
  // scene.add(pointLightHelper);

  const pointLight2 = new THREE.PointLight("white");
  pointLight2.power = 1500;
  scene.add(pointLight2);
  pointLight2.position.set(-6, 5, 0);
  // const pointLightHelper2 = new THREE.PointLightHelper(pointLight2);
  // scene.add(pointLightHelper2);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.appendChild(renderer.domElement);
    }
  }, [canvasRef, renderer]);

  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  const textureLoader = new THREE.TextureLoader();

  const loader = new GLTFLoader();
  let setup;
  loader.load("/mini_setup.glb", (gltf) => {
    const model = gltf.scene;
    setup = model;
    scene.add(setup);
    setup.position.set(0, 1, 0);
    setup.scale.set(0.4, 0.4, 0.4);
    setup.children[26].material.map = textureLoader.load("floor1.jpg");
  });

 
  camera.position.set(-5, 3, -5)

  animate();

  return (
    <div>
      <h2 className="text-center text-5xl font-extrabold mb-4">3D room </h2>
      <p className="text-center text-xl font-bold mb-4">
        Change the floor here :
      </p>
      <div className="flex justify-center mb-6">
        <img onClick={()=>{handleButtonClick("floor1.jpg")}} className="w-[5vw] cursor-pointer mr-8 border-black border-2 hover:border-4" src="floor1.jpg" alt="" />
        <img onClick={()=>{handleButtonClick("floor2.jpg")}} className="w-[5vw] cursor-pointer mr-8 border-black border-2 hover:border-4" src="floor2.jpg" alt="" />
        <img onClick={()=>{handleButtonClick("floor3.jpg")}} className="w-[5vw] cursor-pointer mr-8 border-black border-2 hover:border-4" src="floor3.jpg" alt="" />
        <img onClick={()=>{handleButtonClick("floor4.jpg")}} className="w-[5vw] cursor-pointer mr-8 border-black border-2 hover:border-4" src="floor4.jpg" alt="" />
        <img onClick={()=>{handleButtonClick("floor5.jpg")}} className="w-[5vw] cursor-pointer mr-8 border-black border-2 hover:border-4" src="floor5.jpg" alt="" />
        <img onClick={()=>{handleButtonClick("floor6.jpg")}} className="w-[5vw] cursor-pointer mr-8 border-black border-2 hover:border-4" src="floor6.jpg" alt="" />
      
       </div>
      <div ref={canvasRef} />
    </div>
  );
}

export default Home;
