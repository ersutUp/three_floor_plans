import React, { Component } from 'react';
import {
  Scene,
  WebGLRenderer,
  Mesh,
  // OrthographicCamera,
  Vector3,
  // AxesHelper,
  MeshLambertMaterial,
  AmbientLight,
  Vector2,
  // GridHelper,
  // MeshPhongMaterial,
  Shape,
  ExtrudeGeometry,
  Group,
  LineCurve3,
  DirectionalLight,
  PerspectiveCamera
} from "three";
import { Interaction } from 'three.interaction';
import './FloorFour.less';
// import OrbitControls from 'three-orbitcontrols';
// import Stats from '../../utils/stats.module.js';

import { getGeometryBox } from '../../../utils/threeUtils';

//画布大小
const width = 980;
const height = 700;
//墙高
const wall_height = 80;
//下课的颜色
const free_room_color = "0x04c1cd"
//上课的颜色
const in_class_room_color = "0x05295e"

//0是下课 1是上课
let roomStatus = {
  "id401":0,
  "id402":0,
  "id403":0,
  "id404":0,
  "id406":0,
  "id407":0,
  "id408":0,
  "id409":0,
};
let that;
window.changeClassroomStatus=function (id,status) {
  //状态一致不重新渲染
  if(roomStatus[id] == status){
    return;
  }

  let { scene, camera, renderer } = that;
  //修改状态
  roomStatus[id] = status;
  console.info(roomStatus) 
  //重新渲染
  that.initGeometryBox();
  renderer.render(scene, camera);
}

class FloorTwo extends Component {
  constructor(props) {
    super(props);
    this.scene = new Scene();
    // this.scene.background = new Color('rgb(0,140,0)');
    // this.scene.fog = new Fog(0xa0a0a0, 200, 1000);
    this.camera = new PerspectiveCamera(46,  width / height, 1, 2000);
    // this.camera = new OrthographicCamera(-700, 700, 400, -400, 1, 2000); // 正射投影
    // this.camera = new OrthographicCamera( 1500 * - 2, 1500 * 2, 900 * 2, 900 * - 2, 1, 1000 );
    
    //决定3D效果
    this.camera.position.set(23, 1000, 400); // 设置相机位置
    // this.camera.position.set(500, 1000, 0); // 设置相机位置
    // this.camera.set(0, -3 * Math.PI / 4, 0);
    // this.camera.position.set(100, 100, 500); // 设置相机位置
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(23, 0, 0);
    this.renderer = Window.renderer = Window.renderer ?
      Window.renderer
      :
      new WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true,
        alpha: true
      });
    // this.renderer.setClearAlpha(0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.autoClear = true;
    this.renderer.setSize(width, height);
    // 允许阴影投射
    this.renderer.shadowMap.enabled = true;
    //第三方库给对象添加事件
    this.interaction = new Interaction(this.renderer, this.scene, this.camera);

    //坐标轴辅助
    // let axes = new AxesHelper(400);
    // this.scene.add(axes);

    this.scene.add(new AmbientLight(0x555555));

    this.light = new DirectionalLight(0xffffff, 1);
    this.light.position.set(0, 700, 500);
    this.light.castShadow = true;
    //告诉平行光需要开启阴影投射
    this.light.castShadow = true;

    // this.light1 = new PointLight(0xffffff);
    // this.light1.position.set(0, 600, 600);
    // this.scene.add(this.light1);
    // this.light.shadow.camera.top = 180;
    // this.light.shadow.camera.bottom = -100;
    // this.light.shadow.camera.left = -120;
    // this.light.shadow.camera.right = 120;



    this.scene.add(this.light);

    /*this.pointLight = new PointLight(0xffffff);
    this.pointLight.position.set(-70, 300, 600);
    this.pointLight.shadow.mapSize.width = 5120; // 必须是 2的幂，默认值为 512
    this.pointLight.shadow.mapSize.height = 5120; // 必须是 2的幂，默认值为 512
    this.pointLight.castShadow = true;
    this.scene.add(this.pointLight);*/

    // this.renderer.setClearColor(0xFFFFFF, 1.0);

    /*this.light = new PointLight(0xffffff);
    this.light.position.set(0, 0, 300);
    this.scene.add(this.light);*/
    //网格
    // this.helper = new GridHelper(1500, 150, 0xff0000, 0x00ff00);
    // this.scene.add(this.helper);

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // this.stats = new Stats();

    this.state = {
    };
  }
  init = () => {
    let { scene, camera, renderer } = this;
    this.createFloor();
    this.initGeometryBox();

    renderer.render(scene, camera);
    that = this;
  };
  initGeometryBox = () => {
    let { scene } = this;
    //401
    let box401 = getGeometryBox(
      212,
      wall_height,
      156,
      roomStatus["id401"] === 0 ?free_room_color:in_class_room_color,
      'meshA1',
      '401',
      '',
      '',
      "#fff"
    );
    box401.position.set(325, 0, -250);
    //402
    let box402 = getGeometryBox(
      212,
      wall_height,
      156,
      roomStatus["id402"] === 0 ?free_room_color:in_class_room_color,
      'meshA1',
      '402',
      '',
      '',
      "#fff"
    );
    box402.position.set(110, 0, -250);
    //403
    let box403 = getGeometryBox(
      212,
      wall_height,
      156,
      roomStatus["id403"] === 0 ?free_room_color:in_class_room_color,
      'meshA1',
      '403',
      '',
      '',
      "#fff"
    );
    box403.position.set(-105, 0, -250);
    //404
    let box404 = getGeometryBox(
      212,
      wall_height,
      156,
      roomStatus["id404"] === 0 ?free_room_color:in_class_room_color,
      'meshA1',
      '404',
      '',
      '',
      "#fff"
    );
    box404.position.set(-320, 0, -250);

    
    //楼梯
    let stairs_404_1 = getGeometryBox(
      120,
      wall_height,
      65,
      '0xb4b4b4',
      'meshA1',
      '楼梯',
      '',
      '',
      "#fff"
    );
    stairs_404_1.position.set(-411, 0, -105);

    //楼梯
    let stairs_406_1 = getGeometryBox(
      120,
      wall_height,
      65,
      '0xb4b4b4',
      'meshA1',
      '楼梯',
      '',
      '',
      "#fff"
    );
    stairs_406_1.position.set(-411, 0, 25);
    
    //休息室
    let lounge = getGeometryBox(
      120,
      wall_height,
      60,
      '0xb4b4b4',
      'meshA1',
      '休息室',
      '',
      '',
      "#fff"
    );
    lounge.position.set(-411, 0, -40);
    
    //厕所
    let toilet = getGeometryBox(
      95,
      wall_height,
      195,
      '0xb4b4b4',
      'meshA1',
      '厕所',
      '',
      '',
      "#fff"
    );
    toilet.position.set(-268, 0, -40);

    //内庭上空
    let neiting1 = getGeometryBox(
      310,
      wall_height,
      5,
      '0x4180c4',
      'meshA1',
      '',
      '',
      '',
      ""
    );
    neiting1.position.set(-65, 0, -134);
    let neiting2 = getGeometryBox(
      310,
      wall_height,
      5,
      '0x4180c4',
      'meshA1',
      '',
      '',
      '',
      ""
    );
    neiting2.position.set(-65, 0, 55);

    //409
    let box409 = getGeometryBox(
      135,
      wall_height,
      195,
      roomStatus["id409"] === 0 ?free_room_color:in_class_room_color,
      'meshA1',
      '409',
      '',
      '',
      "#fff"
    );
    box409.position.set(363, 0, -40);

    //楼梯
    let stairs_402_1 = getGeometryBox(
      120,
      wall_height,
      65,
      '0xb4b4b4',
      'meshA1',
      '楼梯',
      '',
      '',
      "#fff"
    );
    stairs_402_1.position.set(150, 0, -105);

    //楼梯
    let stairs_208_3 = getGeometryBox(
      120,
      wall_height,
      65,
      '0xb4b4b4',
      'meshA1',
      '楼梯',
      '',
      '',
      "#fff"
    );
    stairs_208_3.position.set(150, 0, 25);
    
    //电梯
    let elevator = getGeometryBox(
      50,
      wall_height,
      60,
      '0xb4b4b4',
      'meshA1',
      '电梯',
      '',
      '',
      "#fff"
    );
    elevator.position.set(150, 0, -40);
    

    //406
    let box406 = getGeometryBox(
      212,
      wall_height,
      156,
      roomStatus["id406"] === 0 ?free_room_color:in_class_room_color,
      'meshA1',
      '406',
      '',
      '',
      "#fff"
    );
    box406.position.set(-320, 0, 170);
    //407
    let box407 = getGeometryBox(
      212,
      wall_height,
      156,
      roomStatus["id407"] === 0 ?free_room_color:in_class_room_color,
      'meshA1',
      '407',
      '',
      '',
      "#fff"
    );
    box407.position.set(-105, 0, 170);
    //408
    let box408 = getGeometryBox(
      342,
      wall_height,
      240,
      roomStatus["id408"] === 0 ?free_room_color:in_class_room_color,
      'meshA1',
      '408',
      '',
      '',
      "#fff"
    );
    box408.position.set(175, 0, 212);

    //储藏间
    let box_storeroom = getGeometryBox(
      87,
      wall_height,
      150,
      '0xb4b4b4',
      'meshA1',
      '储藏间',
      '',
      '',
      "#fff"
    );
    box_storeroom.position.set(393, 0, 212);

    //楼梯
    let stairs_208_1 = getGeometryBox(
      87,
      wall_height,
      41,
      '0xb4b4b4',
      'meshA1',
      '楼梯',
      '',
      '',
      "#fff"
    );
    stairs_208_1.position.set(393, 0, 113);

    //楼梯
    let stairs_208_2 = getGeometryBox(
      87,
      wall_height,
      41,
      '0xb4b4b4',
      'meshA1',
      '楼梯',
      '',
      '',
      "#fff"
    );
    stairs_208_2.position.set(393, 0, 310);

    //楼梯407
    let stairs_407_1 = getGeometryBox(
      87,
      wall_height,
      110,
      '0xb4b4b4',
      'meshA1',
      '楼梯',
      '',
      '',
      "#fff"
    );
    stairs_407_1.position.set(-42, 0, 306);

    //楼梯右下
    let stairs_right_down = getGeometryBox(
      87,
      wall_height,
      122,
      '0xb4b4b4',
      'meshA1',
      '楼梯',
      '',
      '',
      "#fff"
    );
    stairs_right_down.position.set(483, 0, 306);
    

    let group = new Group();
    // group.add(box204, boxA4, boxA5, boxA6, boxA7, boxA8, boxA9, groupL, boxA13, boxA14, liftGroup);
    group.add(box401,box402,box403,box404,stairs_404_1,stairs_406_1,lounge,toilet,neiting1,neiting2,stairs_402_1,stairs_208_3,elevator,box409,box406,box407,box408,box_storeroom,stairs_208_1,stairs_208_2,stairs_407_1,stairs_right_down);
    // group.rotation.set(0, -Math.PI / 180 * 45, 0);
    group.rotation.set(0, 0, 0);
    group.position.set(0, 0, 0);
    scene.add(group);
  };

  
  createFloor = () => {
    let { scene } = this;
    let shape = new Shape([new Vector2(0, 0)]);
    shape.moveTo(-435, -630);
    // shape.quadraticCurveTo(-50, -65, -40, -70);
    // shape.quadraticCurveTo(-45, -65, -30, -70);

    // shape.quadraticCurveTo(-60, -40, -70, -30);
    
    shape.lineTo(415, -630);
    // shape.quadraticCurveTo(565, -40,570, -50);
    shape.lineTo(415, 580);
    // shape.quadraticCurveTo(700, 100, 700, 110);
    shape.lineTo(-435, 580);
    // shape.quadraticCurveTo(700, 400, 650, 400);
    // shape.lineTo(-180, 400);
    // shape.quadraticCurveTo(-200, 400, -220, 380);
    // shape.lineTo(-690, -90);
    // shape.quadraticCurveTo(-700, -100, -700, -110);
    // shape.lineTo(-700, -350);
    // shape.quadraticCurveTo(-700, -400, -650, -400);
    // shape.lineTo(300, 0)
    // shape.lineTo(0, 0);
    // shape.lineTo(0, 400);
    let v1 = new Vector3(0, -30, 0);
    let v2 = new Vector3(0, 0, 0);

    let path = new LineCurve3(v1, v2);
    let extrudeSettings = {
      steps: 2,
      // depth: 10,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 1,
      extrudePath: path
    };
    let geometry2 = new ExtrudeGeometry(shape, extrudeSettings);
    let mesh2 = new Mesh(geometry2, new MeshLambertMaterial({
      color: 0x0089e6,
      transparent: true,
      // opacity: .5,
      polygonOffset: true,
      polygonOffsetFactor: 0.01,
    }));
    mesh2.name = 'floor';
    // mesh2.position.set(0,30,0);
    mesh2.scale.set(.9, 1, .9);
    // mesh2.rotation.set(0, -3 * Math.PI / 4, 0);
    // let geometry = new BoxGeometry(1400, 0, 800);
    // let material = new MeshBasicMaterial({
    // 	color: 0x9eafbb,
    // 	opacity: 0.7,
    // 	transparent: true
    // });
    // let mesh = new Mesh(geometry, material);
    scene.add(mesh2);
  };
  
  componentDidMount() {
    this.init();
    this.three.appendChild(this.renderer.domElement);
  }
  
  componentWillUnmount() {
    this.interaction.removeEvents();
    this.renderer = null;
  }


  render() {
    let that = this;
    let { scene, camera, renderer } = this;

    return (
      <div className={'floor-three'}>
          <div
            className="canvas"
            style={{ textAlign: 'center' }}
            ref={(el) => (this.three = el)}
          >
          </div>
      </div>
    );
  }
}

export default FloorTwo;
