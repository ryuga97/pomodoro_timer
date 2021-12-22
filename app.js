var min = 25, sec = 0, phase = 1;
var isWorking = true;
var breakTime = [5, 5, 5, 30];
var timer;

// DOM
var workBtn = document.querySelector('.pomodoro__btn--work');
var pauseBtn = document.querySelector('.pomodoro__btn--pause');
var resetBtn = document.querySelector('.pomodoro__btn--reset');
var timeMin = document.querySelector('.pomodoro__time--min');
var timeSec = document.querySelector('.pomodoro__time--sec');
var phaseDisp = document.querySelector('.pomodoro__btn--phase');

//デフォルトの時間を表示する
displayMin(min);
displaySec(sec);

//作業ボタンが押されたときにカウントダウンを開始
workBtn.addEventListener('click', function() {

    //フェーズを表示する
    dispPhase();

    //ボタンのUIを変更
    workBtn.style.display = 'none';
    pauseBtn.style.display = 'block';

    //タイマーをカウントダウンする
    timer = setInterval(countTimer, 1000);              //処理間隔の単位はミリ秒    1s = 1000ms

    //一時停止ボタンが押されたらタイマーを停止
    pauseBtn.addEventListener('click', function() {
        stopTimer(timer);
    });
});

//リセットボタンが押されたらタイマーをリセット
resetBtn.addEventListener('click', function() {
    init();
    document.getElementById('body').style.backgroundColor = '#4d4d4d';
});


///// UIコントロール
//フェーズを表示する
function dispPhase() {
    return phaseDisp.textContent = `${phase}/4`;
}

//フェーズを非表示にする
function hidePhase() {
    return phaseDisp.textContent = '';
}

//ポモドーロで議事録を表示
function displayMin(min) {
    min = min.toString();
    if (min.length === 1) {
        minute = '0' + min;
    } else {
        minute = min;
    }
    timeMin.textContent = minute;
}

//ポモドーロで秒を表示する
function displaySec(sec) {
    sec = sec.toString();
    if (sec.length === 1) {
        second = '0' + sec;
    } else {
        second = sec;
    }
    timeSec.textContent = second;
}

/////アプリコントロール
//タイマー設定を初期化 (リセットボタン)
function init() {
    //データを初期化
    stopTimer(timer);
    min = 25;
    sec = 0;
    phase = 1;
    isWorking = true;

    // UIを初期化
    hidePhase();
    displayMin(min);
    displaySec(sec);
    document.getElementById('main_time').style.color = '#ecf0f1';
}

//時間をカウントする
function countTimer(timer) {
    if (sec !== 0) {
        sec--;
        displaySec(sec);
    } else {
        sec = 59;
        displaySec(sec);
        min--;
        displayMin(min);
    }
    //もし00:00の時
    if (sec === 0 && min === 0) {
        //もしisWorkingがfalseの時
        if (isWorking) {
            isWorking = false;
            startBreak(breakTime[phase - 1]);
        } else {
            phase++;
            //もしphaseが4を超えたら初期化
            if (phase > 4) {
                stopTimer(timer);
                init();
                document.getElementById('main_time').style.color = '#ecf0f1';
                document.getElementById('body').style.backgroundColor = '#4d4d4d';
            } else {
                isWorking = true;
                min = 25;
                sec = 0;
                dispPhase();
                document.getElementById('main_time').style.color = '#ecf0f1';
                document.getElementById('body').style.backgroundColor = '#4d4d4d';
            }
        }
    }
}

//タイマーを停止
function stopTimer() {
    //カウントダウンを停止
    clearInterval(timer);

    //ボタンのUIを変更
    workBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
}

//休憩時間のタイマーを設定
function startBreak(breakTime) {
    var time = breakTime;
    min = time;
    sec = 0;
    document.getElementById('main_time').style.color = '#00298a';
    document.getElementById('body').style.backgroundColor = '#d4dcff';
    countTimer(timer);
}