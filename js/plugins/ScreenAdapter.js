/*:
 * @plugindesc (浏览器版)动态调整游戏分辨率以适应屏幕
 * @author 您的名字
 * @help
 * 这个插件会尝试让游戏分辨率与浏览器视口分辨率匹配。
 * 请注意，这可能导致素材拉伸或UI布局问题，因为RPG Maker MV的游戏素材通常
 * 是为固定分辨率设计的。对于不同长宽比的设备，可能会出现拉伸。
 *
 * 如果您更倾向于保持游戏原始宽高比，但仍要最大化显示，
 * 则需要更复杂的计算来确定合适的缩放比例，并可能仍有黑边。
 */

(function() {
    // 保存原始的 Scene_Base.create 方法
    var _Scene_Base_create = Scene_Base.prototype.create;
    Scene_Base.prototype.create = function() {
        _Scene_Base_create.call(this);

        // 获取浏览器窗口的内部宽度和高度
        const viewWidth = window.innerWidth;
        const viewHeight = window.innerHeight;

        // 设置 RPG Maker MV 的逻辑渲染尺寸
        Graphics.width = viewWidth;
        Graphics.height = viewHeight;
        Graphics.boxWidth = viewWidth;
        Graphics.boxHeight = viewHeight;

        // 由于您提供的代码显示 _updateCanvas 和 _updateVideo 会设置 canvas/video 的 width/height 属性
        // 并且 Graphics._centerElement(this._canvas) 会居中，
        // 我们需要确保这些内部设置与我们的全屏意图一致。
        // 如果 Graphics._centerElement 仍然生效并导致问题，可能需要覆盖它。
        // 但是，通过设置 Graphics.width/height 为整个屏幕，并且 HTML style 设置为 100%，
        // 游戏引擎应该会自行适应。

        // 确保 HTML 中的 canvas 元素也更新了尺寸 (虽然通过CSS 100% 也可，但这里是引擎层面的同步)
        const gameCanvas = document.getElementById('GameCanvas');
        if (gameCanvas) {
            gameCanvas.width = viewWidth;
            gameCanvas.height = viewHeight;
            // 确保移除 Graphics._centerElement 可能引入的居中样式，如果有的话
            gameCanvas.style.left = '0px';
            gameCanvas.style.top = '0px';
            gameCanvas.style.margin = '0px';
            gameCanvas.style.transform = 'none'; // 移除可能的居中变换
        }

        const gameVideo = document.getElementById('GameVideo');
        if (gameVideo) {
            gameVideo.width = viewWidth;
            gameVideo.height = viewHeight;
            gameVideo.style.left = '0px';
            gameVideo.style.top = '0px';
            gameVideo.style.margin = '0px';
            gameVideo.style.transform = 'none';
        }

        const controlsCanvas = document.getElementById('ControlsCanvas');
        if (controlsCanvas) {
            controlsCanvas.width = viewWidth;
            controlsCanvas.height = viewHeight;
            controlsCanvas.style.left = '0px';
            controlsCanvas.style.top = '0px';
            controlsCanvas.style.margin = '0px';
            controlsCanvas.style.transform = 'none';
        }

        // 通知 Graphics 和 SceneManager 尺寸已改变
        SceneManager._screenWidth = viewWidth;
        SceneManager._screenHeight = viewHeight;
        SceneManager._boxWidth = viewWidth;
        SceneManager._boxHeight = viewHeight;
        Graphics._onResize(); // 触发 Graphics 的 resize 事件，更新内部渲染器
    };

    // 确保在 Scene_Boot.start 中也执行一次，以在游戏启动早期应用这些设置
    var _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);
        const viewWidth = window.innerWidth;
        const viewHeight = window.innerHeight;
        Graphics.width = viewWidth;
        Graphics.height = viewHeight;
        Graphics.boxWidth = viewWidth;
        Graphics.boxHeight = viewHeight;
        Graphics._onResize();
    };

    // 监听窗口大小变化事件（例如设备旋转），以便动态调整
    window.addEventListener('resize', function() {
        const viewWidth = window.innerWidth;
        const viewHeight = window.innerHeight;

        Graphics.width = viewWidth;
        Graphics.height = viewHeight;
        Graphics.boxWidth = viewWidth;
        Graphics.boxHeight = viewHeight;

        const gameCanvas = document.getElementById('GameCanvas');
        if (gameCanvas) {
            gameCanvas.width = viewWidth;
            gameCanvas.height = viewHeight;
            gameCanvas.style.left = '0px';
            gameCanvas.style.top = '0px';
            gameCanvas.style.margin = '0px';
            gameCanvas.style.transform = 'none';
        }
        const gameVideo = document.getElementById('GameVideo');
        if (gameVideo) {
            gameVideo.width = viewWidth;
            gameVideo.height = viewHeight;
            gameVideo.style.left = '0px';
            gameVideo.style.top = '0px';
            gameVideo.style.margin = '0px';
            gameVideo.style.transform = 'none';
        }
        const controlsCanvas = document.getElementById('ControlsCanvas');
        if (controlsCanvas) {
            controlsCanvas.width = viewWidth;
            controlsCanvas.height = viewHeight;
            controlsCanvas.style.left = '0px';
            controlsCanvas.style.top = '0px';
            controlsCanvas.style.margin = '0px';
            controlsCanvas.style.transform = 'none';
        }

        Graphics._onResize();
    });

})();