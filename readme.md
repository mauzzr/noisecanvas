# Noise Canvas
A fullscreen-able HTML5 canvas displaying pseudorandom noise. Made to mitigate image persistence on one of my monitors.

## Usage
Click to pause and unpause the noise.
Two query string options are available: `s` controls the tile size (default 128) and `c` toggles between RGB and monochrome noise (default 0, meaning monochrome).
Larger tile sizes will reduce the periodic look of the noise, but can have adverse effects on performance for large values of `s` (see below).
For example: `https://mauzzr.github.io/noisecanvas/?s=64&c=1` would draw RGB noise with a tile size of 64.

### Performance
Below are a few benchmarks run under Firefox (at 1920x1080 on a 60Hz display).
Each test is averaged over 3 runs of 10 seconds each because Firefox's profiler is, ironically, pretty slow.

| Tile Size | Monochrome FPS   | Color FPS |
|:---------:|:-----------------|:----------|
| 32        | 28.14            | 28.15     |
| 64        | 62.13            | 61.51     |
| 128       | 60.17            | 59.99     |
| 256       | 59.79            | 59.58     |
| 512       | 61.52            | 61.01     |
| 1024      | 44.27            | 25.96     |

Note that because the canvas is redrawn using `window.requestAnimationFrame`, framerate may vary with display refresh rate.
In either case, `s` between 64 and 512 appears to be a safe range.
