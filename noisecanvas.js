"use strict";
function load() {
    const canvas = document.getElementById("main");
    const ctx = canvas.getContext("2d");
    var tileSize = 128;
    var shouldDraw = true;
    var monochrome = true;

    function toggleDrawing() {
        if (shouldDraw) {
            shouldDraw = false;
        } else {
            shouldDraw = true;
            window.requestAnimationFrame(draw);
        }
    }

    function onResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function draw() {
        // RGBA Pixel data
        var imageData = ctx.createImageData(tileSize, tileSize);
        // for each pixel in the tile
        for (let i = 0; i < tileSize * tileSize; i++) {
            let p = i * 4;
            let r = Math.random();
            // for each color channel
            for (let c = 0; c < 3; c++) {
                imageData.data[p + c] = r < 0.5 ? 0 : 255;
                if (!monochrome) {
                    r = Math.random();
                }
            }
            // always full alpha
            imageData.data[p + 3] = 255;
        }

        for (let y = 0; y < canvas.height; y += tileSize) {
            for (let x = 0; x < canvas.width; x += tileSize) {
                ctx.putImageData(imageData, x, y);
            }
        }

        if (shouldDraw) {
            window.requestAnimationFrame(draw);
        }
    }

    if (window.location.search) {
        let options = window.location.search.substr(1).split('&');
        for (let i = 0; i < options.length; i++) {
            let option = options[i];
            let split = option.split('=');
            if (split.length != 2) continue;
            if (split[0] === 's') {
                let n = parseInt(split[1]);
                tileSize = n > 0 ? n : tileSize;
            }
            else if (split[0] === 'c') {
                let n = parseInt(split[1]);
                monochrome = n === 0 ? true : false;
            }
        }
    }

    // Install event listeners and start drawing
    canvas.addEventListener("click", toggleDrawing);
    window.addEventListener("resize", onResize);
    window.requestAnimationFrame(draw);
}
window.onload = load;
