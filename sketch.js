//宣告全域變數
let stopSpriteSheet; // 站立精靈圖 (sprite sheet) 物件
let walkSpriteSheet; // 行走精靈圖 (sprite sheet) 物件

let stopFrames = []; // 儲存站立動畫的所有分割影格 (frames)
let walkFrames = []; // 儲存行走動畫的所有分割影格 (frames)

let currentAnim = "stop"; // 目前播放的動畫狀態："stop" 代表站立，"walk" 代表行走
let direction = 1;        // 角色朝向：1 代表面向右方，-1 代表面向左方

let spriteX, spriteY;     // 角色的畫面座標 (X, Y)
let speed = 3;            // 角色移動速度 (像素/影格)

// p5.js 的預載入函式：在程式執行前載入所有圖片資源
function preload() {
  // 載入站立精靈圖（根據您的路徑：1/stop/stop.png）
  stopSpriteSheet = loadImage('1/stop/stop.png');
  // 載入行走精靈圖（根據您的路徑：1/walk/walk.png）
  walkSpriteSheet = loadImage('1/walk/walk.png');
}

// p5.js 的初始化設定函式：設定畫布與初始位置
function setup() {
  createCanvas(windowWidth, windowHeight); // 建立一個符合視窗大小的全螢幕畫布
  imageMode(CENTER);                       // 設定圖片繪製的基準點為中心點
  
  // 初始化角色位置在畫面正中央
  spriteX = width / 2;
  spriteY = height / 2;

  // 切割「站立動畫」的橫向連續圖檔
  // 圖片總寬度 1955，總高度 212，共有 15 張圖片
  let stopTotalWidth = 1955;
  let stopTotalHeight = 212;
  let stopCount = 15;
  let stopFrameWidth = stopTotalWidth / stopCount; // 計算單張影格寬度
  
  for (let i = 0; i < stopCount; i++) {
    // 使用 get() 函式水平裁切出每一張影格
    let frame = stopSpriteSheet.get(i * stopFrameWidth, 0, stopFrameWidth, stopTotalHeight);
    stopFrames.push(frame); // 將影格放入陣列中
  }

  // 切割「行走動畫」的橫向連續圖檔
  // 圖片總寬度 1246，總高度 198，共有 10 張圖片
  let walkTotalWidth = 1246;
  let walkTotalHeight = 198;
  let walkCount = 10;
  let walkFrameWidth = walkTotalWidth / walkCount; // 計算單張影格寬度
  
  for (let i = 0; i < walkCount; i++) {
    // 使用 get() 函式水平裁切出每一張影格
    let frame = walkSpriteSheet.get(i * walkFrameWidth, 0, walkFrameWidth, walkTotalHeight);
    walkFrames.push(frame); // 將影格放入陣列中
  }
}

// p5.js 的繪圖與更新迴圈函式（每秒執行約 60 次）
function draw() {
  background('#ffccd5'); // 設定畫布背景顏色為指定色碼 #ffccd5

  // 偵測鍵盤按鍵狀態，用來控制移動與動畫切換
  if (keyIsDown(RIGHT_ARROW)) {
    currentAnim = "walk";    // 切換至行走動畫
    direction = 1;           // 設定朝向右方
    spriteX += speed;        // 角色座標向右移動
  } else if (keyIsDown(LEFT_ARROW)) {
    currentAnim = "walk";    // 切換至行走動畫
    direction = -1;          // 設定朝向左方
    spriteX -= speed;        // 角色座標向左移動
  } else {
    currentAnim = "stop";    // 當沒有按左右鍵時，切換回站立動畫
  }

  // 決定目前要播放哪一個動畫影格陣列與總張數
  let currentFrames;
  if (currentAnim === "stop") {
    currentFrames = stopFrames;
  } else {
    currentFrames = walkFrames;
  }

  // 計算目前的影格索引（使用 frameCount 達成循環播放效果，數字可調整播放速度）
  let index = floor(frameCount / 6) % currentFrames.length;

  // 儲存目前的繪圖狀態設定
  push();
  translate(spriteX, spriteY); // 將座標原點移動到角色目前的位置
  scale(direction, 1);       // 根據方向進行水平翻轉（1 為正常，-1 為左右鏡像反轉）
  
  // 繪製當前影格的精靈圖片
  image(currentFrames[index], 0, 0);
  
  // 回復原本的繪圖狀態
  pop();
}

// 當瀏覽器視窗大小改變時，自動調整畫布大小並重置角色到畫面中央
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  spriteX = width / 2;
  spriteY = height / 2;
}