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
// import './2F.less';
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
  "id313":0,
  "id315":0,
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
    this.camera = new PerspectiveCamera(44,  width / height, 1, 2000);
    // this.camera = new OrthographicCamera(-700, 700, 400, -400, 1, 2000); // 正射投影
    // this.camera = new OrthographicCamera( 1500 * - 2, 1500 * 2, 900 * 2, 900 * - 2, 1, 1000 );
    
    //决定3D效果
    this.camera.position.set(0, 1000, 430); // 设置相机位置
    // this.camera.position.set(500, 1000, 0); // 设置相机位置
    // this.camera.set(0, -3 * Math.PI / 4, 0);
    // this.camera.position.set(100, 100, 500); // 设置相机位置
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(0, 0, 0);
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

    //阶梯教室315
    let box315 = getGeometryBox(
      120,
      wall_height,
      150,
      roomStatus["id315"] === 0 ?free_room_color:in_class_room_color,
      'meshA1',
      '315',
      '',
      '40px',
      "#fff"
    );
    box315.position.set(142, 0, -300);
    //阶梯教室313
    let box313 = getGeometryBox(
      120,
      wall_height,
      150,
      roomStatus["id313"] === 0 ?free_room_color:in_class_room_color,
      'meshA1',
      '313',
      '',
      '40px',
      "#fff"
    );
    box313.position.set(265, 0, -300);


    //走廊
    let wall1 = getGeometryBox(
      5,
      wall_height,
      30,
      '0x4180c4',
      'meshA1',
      '',
      '',
      '',
      ""
    );
    wall1.position.set(84, 0, -210);
    let wall2 = getGeometryBox(
      120,
      wall_height,
      5,
      '0x4180c4',
      'meshA1',
      '',
      '',
      '',
      ""
    );
    wall2.position.set(142, 0, -195);
    let wall3 = getGeometryBox(
      65,
      wall_height,
      5,
      '0x4180c4',
      'meshA1',
      '',
      '',
      '',
      ""
    );
    wall3.position.set(290, 0, -195);
    let wall4 = getGeometryBox(
      5,
      wall_height,
      165,
      '0x4180c4',
      'meshA1',
      '',
      '',
      '',
      ""
    );
    wall4.position.set(258, 0, -115);
    let wall5 = getGeometryBox(
      5,
      wall_height,
      55,
      '0x4180c4',
      'meshA1',
      '',
      '',
      '',
      ""
    );
    wall5.position.set(200, 0, -60);
    let wall6 = getGeometryBox(
      5,
      wall_height,
      55,
      '0x4180c4',
      'meshA1',
      '',
      '',
      '',
      ""
    );
    wall6.position.set(200, 0, -170);
    //楼梯
    let stairs_314 = getGeometryBox(
      110,
      wall_height,
      55,
      '0xb4b4b4',
      'meshA1',
      '楼梯',
      '',
      '',
      "#fff"
    );
    stairs_314.position.set(147, 0, -115);
    
    //图书馆
    let lounge = getGeometryBox(
      65,
      wall_height,
      105,
      '0xb4b4b4',
      'meshA1',
      '图书馆',
      '',
      '',
      "#fff"
    );
    lounge.position.set(288, 0, 20);
    let wall7 = getGeometryBox(
      120,
      wall_height,
      5,
      '0x4180c4',
      'meshA1',
      '',
      '',
      '',
      ""
    );
    wall7.position.set(142, 0, -33);
    //304
    let box304 = getGeometryBox(
      179,
      wall_height,
      105,
      '0xb4b4b4',
      'meshA1',
      '图书馆',
      '',
      '',
      "#fff"
    );
    box304.position.set(-8, 0, 17);
    //302
    let box302 = getGeometryBox(
      179,
      wall_height,
      105,
      '0xb4b4b4',
      'meshA1',
      '图书馆',
      '',
      '',
      "#fff"
    );
    box302.position.set(-190, 0, 17);
    
    //厕所
    let toilet = getGeometryBox(
      75,
      wall_height,
      122,
      '0xb4b4b4',
      'meshA1',
      '厕所',
      '',
      '',
      "#fff"
    );
    toilet.position.set(283, 0, 161);
    //楼梯
    let stairs = getGeometryBox(
      55,
      wall_height,
      122,
      '0xb4b4b4',
      'meshA1',
      '楼梯',
      '',
      '',
      "#fff"
    );
    stairs.position.set(192, 0, 161);
    //中庭上空
    let neiting1 = getGeometryBox(
      285,
      wall_height,
      5,
      '0x4180c4',
      'meshA1',
      '',
      '',
      '',
      ""
    );
    neiting1.position.set(22, 0, 102);
    let neiting2 = getGeometryBox(
      285,
      wall_height,
      5,
      '0x4180c4',
      'meshA1',
      '',
      '',
      '',
      ""
    );
    neiting2.position.set(22, 0, 220);
    //电梯
    let elevator = getGeometryBox(
      35,
      wall_height,
      75,
      '0xb4b4b4',
      'meshA1',
      '电梯',
      '',
      '',
      "#fff"
    );
    elevator.position.set(-102, 0, 160);
    //水暖井
    let plumbing_well = getGeometryBox(
      42,
      wall_height,
      25,
      '0xb4b4b4',
      'meshA1',
      '',
      '',
      '',
      "#fff"
    );
    plumbing_well.position.set(-141, 0, 210);
    //水暖井
    let electric_well = getGeometryBox(
      42,
      wall_height,
      24,
      '0xb4b4b4',
      'meshA1',
      '',
      '',
      '',
      "#fff"
    );
    electric_well.position.set(-141, 0, 111);
    let wall8 = getGeometryBox(
      5,
      wall_height,
      180,
      '0x4180c4',
      'meshA1',
      '',
      '',
      '',
      ""
    );
    wall8.position.set(-245, 0, 160);


    //308
    let box308 = getGeometryBox(
      182,
      wall_height,
      105,
      '0xb4b4b4',
      'meshA1',
      '图书馆',
      '',
      '',
      "#fff"
    );
    box308.position.set(230, 0, 303);
    //310
    let box310 = getGeometryBox(
      180,
      wall_height,
      105,
      '0xb4b4b4',
      'meshA1',
      '图书管',
      '',
      '',
      "#fff"
    );
    box310.position.set(46, 0, 303);
    //楼梯
    let stairs_310 = getGeometryBox(
      55,
      wall_height,
      130,
      '0xb4b4b4',
      'meshA1',
      '楼梯',
      '',
      '',
      "#fff"
    );
    stairs_310.position.set(-75, 0, 315);
    //312
    let box312 = getGeometryBox(
      177,
      wall_height,
      105,
      '0xb4b4b4',
      'meshA1',
      '图书馆',
      '',
      '',
      "#fff"
    );
    box312.position.set(-194, 0, 303);    

    let group = new Group();
    // group.add(box204, boxA4, boxA5, boxA6, boxA7, boxA8, boxA9, groupL, boxA13, boxA14, liftGroup);
    group.add(box313,box315,wall1,wall2,wall3,wall4,wall5,wall6,stairs_314,wall7,stairs,box304,box302,plumbing_well,electric_well,neiting1,neiting2,wall8,box308,box310,stairs_310,box312
      ,lounge,toilet,elevator);
    // group.rotation.set(0, -Math.PI / 180 * 45, 0);
    group.rotation.set(0, 0, 0);
    group.position.set(-20, 0, 0);
    scene.add(group);
  };

  
  createFloor = () => {
    let { scene } = this;
    let shape = new Shape([new Vector2(0, 0)]);
    shape.moveTo(-445, -390);
    // shape.quadraticCurveTo(-50, -65, -40, -70);
    // shape.quadraticCurveTo(-45, -65, -30, -70);

    // shape.quadraticCurveTo(-60, -40, -70, -30);
    
    shape.lineTo(480, -390);
    // shape.quadraticCurveTo(565, -40,570, -50);
    shape.lineTo(480, 390);
    // shape.quadraticCurveTo(700, 100, 700, 110);
    shape.lineTo(-445, 390);
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
      <div>
          <div
            style={{ textAlign: 'center' }}
            ref={(el) => (this.three = el)}
          >
          </div>
      </div>
    );
  }
}

export default FloorTwo;
