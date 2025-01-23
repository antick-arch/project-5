function loco(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
        // Add compatibility for older browsers
        getDirection: true,
        getSpeed: true
    });

    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
loco();

// Removed the block that generates HTML content for #page2>h1

gsap.to("#page2>h1>span",{
    scrollTrigger:{
        trigger:`#page2>h1>span`,
        start:`top bottom`,
        end:`bottom top`,
        scroller:`#main`,
        scrub:.5,
    },
    stagger:.2,
    color:`#fff`
});

function canvas(){
    const canvas = document.querySelector("#page3>canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    });

    function files(index) {
        var data = `
        ./DNA/6973-197914400_medium_000.jpg
        ./DNA/6973-197914400_medium_001.jpg
        ./DNA/6973-197914400_medium_002.jpg
        ./DNA/6973-197914400_medium_003.jpg
        ./DNA/6973-197914400_medium_004.jpg
        ./DNA/6973-197914400_medium_005.jpg
        ./DNA/6973-197914400_medium_006.jpg
        ./DNA/6973-197914400_medium_007.jpg
        ./DNA/6973-197914400_medium_008.jpg
        ./DNA/6973-197914400_medium_009.jpg
        ./DNA/6973-197914400_medium_010.jpg
        ./DNA/6973-197914400_medium_011.jpg
        ./DNA/6973-197914400_medium_012.jpg
        ./DNA/6973-197914400_medium_013.jpg
        ./DNA/6973-197914400_medium_014.jpg
        ./DNA/6973-197914400_medium_015.jpg
        ./DNA/6973-197914400_medium_016.jpg
        ./DNA/6973-197914400_medium_017.jpg
        ./DNA/6973-197914400_medium_018.jpg
        ./DNA/6973-197914400_medium_019.jpg
        ./DNA/6973-197914400_medium_020.jpg
        ./DNA/6973-197914400_medium_021.jpg
        ./DNA/6973-197914400_medium_022.jpg
        ./DNA/6973-197914400_medium_023.jpg
        ./DNA/6973-197914400_medium_024.jpg
        ./DNA/6973-197914400_medium_025.jpg
        ./DNA/6973-197914400_medium_026.jpg
        ./DNA/6973-197914400_medium_027.jpg
        ./DNA/6973-197914400_medium_028.jpg
        ./DNA/6973-197914400_medium_029.jpg
        ./DNA/6973-197914400_medium_030.jpg
        ./DNA/6973-197914400_medium_031.jpg
        ./DNA/6973-197914400_medium_032.jpg
        ./DNA/6973-197914400_medium_033.jpg
        ./DNA/6973-197914400_medium_034.jpg
        ./DNA/6973-197914400_medium_035.jpg
        ./DNA/6973-197914400_medium_036.jpg
        ./DNA/6973-197914400_medium_037.jpg
        ./DNA/6973-197914400_medium_038.jpg
        ./DNA/6973-197914400_medium_039.jpg
        ./DNA/6973-197914400_medium_040.jpg
        ./DNA/6973-197914400_medium_041.jpg
        ./DNA/6973-197914400_medium_042.jpg
        ./DNA/6973-197914400_medium_043.jpg
        ./DNA/6973-197914400_medium_044.jpg
        ./DNA/6973-197914400_medium_045.jpg
        ./DNA/6973-197914400_medium_046.jpg
        ./DNA/6973-197914400_medium_047.jpg
        ./DNA/6973-197914400_medium_048.jpg
        ./DNA/6973-197914400_medium_049.jpg
        ./DNA/6973-197914400_medium_050.jpg
        ./DNA/6973-197914400_medium_051.jpg
        ./DNA/6973-197914400_medium_052.jpg
        ./DNA/6973-197914400_medium_053.jpg
        ./DNA/6973-197914400_medium_054.jpg
        ./DNA/6973-197914400_medium_055.jpg
        ./DNA/6973-197914400_medium_056.jpg
        ./DNA/6973-197914400_medium_057.jpg
        ./DNA/6973-197914400_medium_058.jpg
        ./DNA/6973-197914400_medium_059.jpg
        ./DNA/6973-197914400_medium_060.jpg
        ./DNA/6973-197914400_medium_061.jpg
        ./DNA/6973-197914400_medium_062.jpg
        ./DNA/6973-197914400_medium_063.jpg
        ./DNA/6973-197914400_medium_064.jpg
        ./DNA/6973-197914400_medium_065.jpg
        ./DNA/6973-197914400_medium_066.jpg
        `;
        return data.split("\n")[index];
    }

    const frameCount = 67;

    const images = [];
    const imageSeq = {
        frame: 1,
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = files(i);
        images.push(img);
    }

    gsap.to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: `none`,
        scrollTrigger: {
            scrub: .5,
            trigger: `#page3`,
            start: `top top`,
            end: `250% top`,
            scroller: `#main`,
        },
        onUpdate: render,
    });

    images[1].onload = render;

    function render() {
        scaleImage(images[imageSeq.frame], context);
    }

    function scaleImage(img, ctx) {
        var canvas = ctx.canvas;
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;
        var ratio = Math.max(hRatio, vRatio);
        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    }
    ScrollTrigger.create({
        trigger: "#page3",
        pin: true,
        scroller: `#main`,
        start: `top top`,
        end: `250% top`,
    });
}
canvas();

// Removed the block that generates HTML content for #page4>h1

gsap.to("#page4>h1>span",{
    scrollTrigger:{
        trigger:`#page4>h1>span`,
        start:`top bottom`,
        end:`bottom top`,
        scroller:`#main`,
        scrub:.5,
    },
    stagger:.2,
    color:`#fff`
});

function canvas1(){
    const canvas = document.querySelector("#page5>canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    });

    function files(index) {
        var data = `
        ./robotics/robotics_000.jpg
        ./robotics/robotics_001.jpg
        ./robotics/robotics_002.jpg
        ./robotics/robotics_003.jpg
        ./robotics/robotics_004.jpg
        ./robotics/robotics_005.jpg
        ./robotics/robotics_006.jpg
        ./robotics/robotics_007.jpg
        ./robotics/robotics_008.jpg
        ./robotics/robotics_009.jpg
        ./robotics/robotics_010.jpg
        ./robotics/robotics_011.jpg
        ./robotics/robotics_012.jpg
        ./robotics/robotics_013.jpg
        ./robotics/robotics_014.jpg
        ./robotics/robotics_015.jpg
        ./robotics/robotics_016.jpg
        ./robotics/robotics_017.jpg
        ./robotics/robotics_018.jpg
        ./robotics/robotics_019.jpg
        ./robotics/robotics_020.jpg
        ./robotics/robotics_021.jpg
        ./robotics/robotics_022.jpg
        ./robotics/robotics_023.jpg
        ./robotics/robotics_024.jpg
        ./robotics/robotics_025.jpg
        ./robotics/robotics_026.jpg
        ./robotics/robotics_027.jpg
        ./robotics/robotics_028.jpg
        ./robotics/robotics_029.jpg
        ./robotics/robotics_030.jpg
        ./robotics/robotics_031.jpg
        ./robotics/robotics_032.jpg
        ./robotics/robotics_033.jpg
        ./robotics/robotics_034.jpg
        ./robotics/robotics_035.jpg
        ./robotics/robotics_036.jpg
        ./robotics/robotics_037.jpg
        ./robotics/robotics_038.jpg
        ./robotics/robotics_039.jpg
        ./robotics/robotics_040.jpg
        ./robotics/robotics_041.jpg
        ./robotics/robotics_042.jpg
        ./robotics/robotics_043.jpg
        ./robotics/robotics_044.jpg
        ./robotics/robotics_045.jpg
        ./robotics/robotics_046.jpg
        ./robotics/robotics_047.jpg
        ./robotics/robotics_048.jpg
        ./robotics/robotics_049.jpg
        ./robotics/robotics_050.jpg
        ./robotics/robotics_051.jpg
        ./robotics/robotics_052.jpg
        ./robotics/robotics_053.jpg
        ./robotics/robotics_054.jpg
        ./robotics/robotics_055.jpg
        ./robotics/robotics_056.jpg
        ./robotics/robotics_057.jpg
        ./robotics/robotics_058.jpg
        ./robotics/robotics_059.jpg
        ./robotics/robotics_060.jpg
        ./robotics/robotics_061.jpg
        ./robotics/robotics_062.jpg
        ./robotics/robotics_063.jpg
        ./robotics/robotics_064.jpg
        ./robotics/robotics_065.jpg
        ./robotics/robotics_066.jpg
        ./robotics/robotics_067.jpg
        ./robotics/robotics_068.jpg
        ./robotics/robotics_069.jpg
        ./robotics/robotics_070.jpg
        ./robotics/robotics_071.jpg
        ./robotics/robotics_072.jpg
        ./robotics/robotics_073.jpg
        ./robotics/robotics_074.jpg
        ./robotics/robotics_075.jpg
        ./robotics/robotics_076.jpg
        ./robotics/robotics_077.jpg
        ./robotics/robotics_078.jpg
        ./robotics/robotics_079.jpg
        ./robotics/robotics_080.jpg
        ./robotics/robotics_081.jpg
        ./robotics/robotics_082.jpg
        ./robotics/robotics_083.jpg
        ./robotics/robotics_084.jpg
        ./robotics/robotics_085.jpg
        ./robotics/robotics_086.jpg
        ./robotics/robotics_087.jpg
        ./robotics/robotics_088.jpg
        ./robotics/robotics_089.jpg
        ./robotics/robotics_090.jpg
        ./robotics/robotics_091.jpg
        ./robotics/robotics_092.jpg
        ./robotics/robotics_093.jpg
        ./robotics/robotics_094.jpg
        ./robotics/robotics_095.jpg
        ./robotics/robotics_096.jpg
        ./robotics/robotics_097.jpg
        ./robotics/robotics_098.jpg
        ./robotics/robotics_099.jpg
        ./robotics/robotics_100.jpg
        ./robotics/robotics_101.jpg
        ./robotics/robotics_102.jpg
        ./robotics/robotics_103.jpg
        ./robotics/robotics_104.jpg
        ./robotics/robotics_105.jpg
        ./robotics/robotics_106.jpg
        ./robotics/robotics_107.jpg
        ./robotics/robotics_108.jpg
        ./robotics/robotics_109.jpg
        ./robotics/robotics_110.jpg
        ./robotics/robotics_111.jpg
        ./robotics/robotics_112.jpg
        ./robotics/robotics_113.jpg
        ./robotics/robotics_114.jpg
        ./robotics/robotics_115.jpg
        ./robotics/robotics_116.jpg
        ./robotics/robotics_117.jpg
        ./robotics/robotics_118.jpg
        ./robotics/robotics_119.jpg
        ./robotics/robotics_120.jpg
        ./robotics/robotics_121.jpg
        ./robotics/robotics_122.jpg
        ./robotics/robotics_123.jpg
        ./robotics/robotics_124.jpg
        ./robotics/robotics_125.jpg
        ./robotics/robotics_126.jpg
        ./robotics/robotics_127.jpg
        ./robotics/robotics_128.jpg
        ./robotics/robotics_129.jpg
        ./robotics/robotics_130.jpg
        ./robotics/robotics_131.jpg
        ./robotics/robotics_132.jpg
        ./robotics/robotics_133.jpg
        ./robotics/robotics_134.jpg
        ./robotics/robotics_135.jpg
        ./robotics/robotics_136.jpg
        ./robotics/robotics_137.jpg
        ./robotics/robotics_138.jpg
        ./robotics/robotics_139.jpg
        ./robotics/robotics_140.jpg
        ./robotics/robotics_141.jpg
        ./robotics/robotics_142.jpg
        ./robotics/robotics_143.jpg
        ./robotics/robotics_144.jpg
        ./robotics/robotics_145.jpg
        ./robotics/robotics_146.jpg
        ./robotics/robotics_147.jpg
        ./robotics/robotics_148.jpg
        ./robotics/robotics_149.jpg
        ./robotics/robotics_150.jpg
        ./robotics/robotics_151.jpg
        ./robotics/robotics_152.jpg
        ./robotics/robotics_153.jpg
        ./robotics/robotics_154.jpg
        ./robotics/robotics_155.jpg
        ./robotics/robotics_156.jpg
        ./robotics/robotics_157.jpg
        ./robotics/robotics_158.jpg
        ./robotics/robotics_159.jpg
        ./robotics/robotics_160.jpg
        ./robotics/robotics_161.jpg
        ./robotics/robotics_162.jpg
        ./robotics/robotics_163.jpg
        ./robotics/robotics_164.jpg
        ./robotics/robotics_165.jpg
        ./robotics/robotics_166.jpg
        ./robotics/robotics_167.jpg
        ./robotics/robotics_168.jpg
        ./robotics/robotics_169.jpg
        ./robotics/robotics_170.jpg
        ./robotics/robotics_171.jpg
        ./robotics/robotics_172.jpg
        ./robotics/robotics_173.jpg
        ./robotics/robotics_174.jpg
        ./robotics/robotics_175.jpg
        ./robotics/robotics_176.jpg
        ./robotics/robotics_177.jpg
        ./robotics/robotics_178.jpg
        ./robotics/robotics_179.jpg
        ./robotics/robotics_180.jpg
        ./robotics/robotics_181.jpg
        ./robotics/robotics_182.jpg
        ./robotics/robotics_183.jpg
        ./robotics/robotics_184.jpg
        ./robotics/robotics_185.jpg
        ./robotics/robotics_186.jpg
        ./robotics/robotics_187.jpg
        ./robotics/robotics_188.jpg
        ./robotics/robotics_189.jpg
        ./robotics/robotics_190.jpg
        ./robotics/robotics_191.jpg
        ./robotics/robotics_192.jpg
        ./robotics/robotics_193.jpg
        ./robotics/robotics_194.jpg
        ./robotics/robotics_195.jpg
        ./robotics/robotics_196.jpg
        ./robotics/robotics_197.jpg
        ./robotics/robotics_198.jpg
        ./robotics/robotics_199.jpg
        ./robotics/robotics_200.jpg
        ./robotics/robotics_201.jpg
        ./robotics/robotics_202.jpg
        ./robotics/robotics_203.jpg
        ./robotics/robotics_204.jpg
        ./robotics/robotics_205.jpg
        ./robotics/robotics_206.jpg
        ./robotics/robotics_207.jpg
        ./robotics/robotics_208.jpg
        ./robotics/robotics_209.jpg
        ./robotics/robotics_210.jpg
        ./robotics/robotics_211.jpg
        ./robotics/robotics_212.jpg
        ./robotics/robotics_213.jpg
        ./robotics/robotics_214.jpg
        ./robotics/robotics_215.jpg
        ./robotics/robotics_216.jpg
        ./robotics/robotics_217.jpg
        ./robotics/robotics_218.jpg
        ./robotics/robotics_219.jpg
        ./robotics/robotics_220.jpg
        ./robotics/robotics_221.jpg
        ./robotics/robotics_222.jpg
        ./robotics/robotics_223.jpg
        ./robotics/robotics_224.jpg
        ./robotics/robotics_225.jpg
        ./robotics/robotics_226.jpg
        ./robotics/robotics_227.jpg
        ./robotics/robotics_228.jpg
        ./robotics/robotics_229.jpg
        ./robotics/robotics_230.jpg
        ./robotics/robotics_231.jpg
        ./robotics/robotics_232.jpg
        ./robotics/robotics_233.jpg
        ./robotics/robotics_234.jpg
        ./robotics/robotics_235.jpg
        ./robotics/robotics_236.jpg
        ./robotics/robotics_237.jpg
        ./robotics/robotics_238.jpg
        ./robotics/robotics_239.jpg
        ./robotics/robotics_240.jpg
        ./robotics/robotics_241.jpg
        ./robotics/robotics_242.jpg
        ./robotics/robotics_243.jpg
        ./robotics/robotics_244.jpg
        ./robotics/robotics_245.jpg
        ./robotics/robotics_246.jpg
        ./robotics/robotics_247.jpg
        ./robotics/robotics_248.jpg
        ./robotics/robotics_249.jpg
        ./robotics/robotics_250.jpg
        ./robotics/robotics_251.jpg
        ./robotics/robotics_252.jpg
        ./robotics/robotics_253.jpg
        ./robotics/robotics_254.jpg
        ./robotics/robotics_255.jpg
        ./robotics/robotics_256.jpg
        ./robotics/robotics_257.jpg
        ./robotics/robotics_258.jpg
        ./robotics/robotics_259.jpg
        ./robotics/robotics_260.jpg
        ./robotics/robotics_261.jpg
        ./robotics/robotics_262.jpg
        ./robotics/robotics_263.jpg
        ./robotics/robotics_264.jpg
        ./robotics/robotics_265.jpg
        ./robotics/robotics_266.jpg
        ./robotics/robotics_267.jpg
        ./robotics/robotics_268.jpg
        ./robotics/robotics_269.jpg
        ./robotics/robotics_270.jpg
        ./robotics/robotics_271.jpg
        ./robotics/robotics_272.jpg
        ./robotics/robotics_273.jpg
        ./robotics/robotics_274.jpg
        ./robotics/robotics_275.jpg
        ./robotics/robotics_276.jpg
        ./robotics/robotics_277.jpg
        ./robotics/robotics_278.jpg
        ./robotics/robotics_279.jpg
        ./robotics/robotics_280.jpg
        ./robotics/robotics_281.jpg
        ./robotics/robotics_282.jpg
        ./robotics/robotics_283.jpg
        ./robotics/robotics_284.jpg
        ./robotics/robotics_285.jpg
        ./robotics/robotics_286.jpg
        ./robotics/robotics_287.jpg
        ./robotics/robotics_288.jpg
        ./robotics/robotics_289.jpg
        ./robotics/robotics_290.jpg
        ./robotics/robotics_291.jpg
        ./robotics/robotics_292.jpg
        ./robotics/robotics_293.jpg
        ./robotics/robotics_294.jpg
        ./robotics/robotics_295.jpg
        ./robotics/robotics_296.jpg
        ./robotics/robotics_297.jpg
        ./robotics/robotics_298.jpg
        ./robotics/robotics_299.jpg
        `;
        return data.split("\n")[index];
    }

    const frameCount = 299;

    const images = [];
    const imageSeq = {
        frame: 1,
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = files(i);
        images.push(img);
    }

    gsap.to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: `none`,
        scrollTrigger: {
            scrub: .5,
            trigger: `#page5`,
            start: `top top`,
            end: `250% top`,
            scroller: `#main`,
        },
        onUpdate: render,
    });

    images[1].onload = render;

    function render() {
        scaleImage(images[imageSeq.frame], context);
    }

    function scaleImage(img, ctx) {
        var canvas = ctx.canvas;
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;
        var ratio = Math.max(hRatio, vRatio);
        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    }
    ScrollTrigger.create({
        trigger: "#page5",
        pin: true,
        scroller: `#main`,
        start: `top top`,
        end: `250% top`,
    });
}
canvas1();

// Removed the block that generates HTML content for #page6>h1

gsap.to("#page6>h1>span",{
    scrollTrigger:{
        trigger:`#page6>h1>span`,
        start:`top bottom`,
        end:`bottom top`,
        scroller:`#main`,
        scrub:.5,
    },
    stagger:.2,
    color:`#fff`
});

function canvas2(){
    const canvas = document.querySelector("#page7>canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    });

    function files(index) {
        var data = `
        ./skeleton/84705-586995495_000.jpg
        ./skeleton/84705-586995495_001.jpg
        ./skeleton/84705-586995495_002.jpg
        ./skeleton/84705-586995495_003.jpg
        ./skeleton/84705-586995495_004.jpg
        ./skeleton/84705-586995495_005.jpg
        ./skeleton/84705-586995495_006.jpg
        ./skeleton/84705-586995495_007.jpg
        ./skeleton/84705-586995495_008.jpg
        ./skeleton/84705-586995495_009.jpg
        ./skeleton/84705-586995495_010.jpg
        ./skeleton/84705-586995495_011.jpg
        ./skeleton/84705-586995495_012.jpg
        ./skeleton/84705-586995495_013.jpg
        ./skeleton/84705-586995495_014.jpg
        ./skeleton/84705-586995495_015.jpg
        ./skeleton/84705-586995495_016.jpg
        ./skeleton/84705-586995495_017.jpg
        ./skeleton/84705-586995495_018.jpg
        ./skeleton/84705-586995495_019.jpg
        ./skeleton/84705-586995495_020.jpg
        ./skeleton/84705-586995495_021.jpg
        ./skeleton/84705-586995495_022.jpg
        ./skeleton/84705-586995495_023.jpg
        ./skeleton/84705-586995495_024.jpg
        ./skeleton/84705-586995495_025.jpg
        ./skeleton/84705-586995495_026.jpg
        ./skeleton/84705-586995495_027.jpg
        ./skeleton/84705-586995495_028.jpg
        ./skeleton/84705-586995495_029.jpg
        ./skeleton/84705-586995495_030.jpg
        ./skeleton/84705-586995495_031.jpg
        ./skeleton/84705-586995495_032.jpg
        ./skeleton/84705-586995495_033.jpg
        ./skeleton/84705-586995495_034.jpg
        ./skeleton/84705-586995495_035.jpg
        ./skeleton/84705-586995495_036.jpg
        ./skeleton/84705-586995495_037.jpg
        ./skeleton/84705-586995495_038.jpg
        ./skeleton/84705-586995495_039.jpg
        ./skeleton/84705-586995495_040.jpg
        ./skeleton/84705-586995495_041.jpg
        ./skeleton/84705-586995495_042.jpg
        ./skeleton/84705-586995495_043.jpg
        ./skeleton/84705-586995495_044.jpg
        ./skeleton/84705-586995495_045.jpg
        ./skeleton/84705-586995495_046.jpg
        ./skeleton/84705-586995495_047.jpg
        ./skeleton/84705-586995495_048.jpg
        ./skeleton/84705-586995495_049.jpg
        ./skeleton/84705-586995495_050.jpg
        ./skeleton/84705-586995495_051.jpg
        ./skeleton/84705-586995495_052.jpg
        ./skeleton/84705-586995495_053.jpg
        ./skeleton/84705-586995495_054.jpg
        ./skeleton/84705-586995495_055.jpg
        ./skeleton/84705-586995495_056.jpg
        ./skeleton/84705-586995495_057.jpg
        ./skeleton/84705-586995495_058.jpg
        ./skeleton/84705-586995495_059.jpg
        ./skeleton/84705-586995495_060.jpg
        ./skeleton/84705-586995495_061.jpg
        ./skeleton/84705-586995495_062.jpg
        ./skeleton/84705-586995495_063.jpg
        ./skeleton/84705-586995495_064.jpg
        ./skeleton/84705-586995495_065.jpg
        ./skeleton/84705-586995495_066.jpg
        ./skeleton/84705-586995495_067.jpg
        ./skeleton/84705-586995495_068.jpg
        ./skeleton/84705-586995495_069.jpg
        ./skeleton/84705-586995495_070.jpg
        ./skeleton/84705-586995495_071.jpg
        ./skeleton/84705-586995495_072.jpg
        ./skeleton/84705-586995495_073.jpg
        ./skeleton/84705-586995495_074.jpg
        ./skeleton/84705-586995495_075.jpg
        ./skeleton/84705-586995495_076.jpg
        ./skeleton/84705-586995495_077.jpg
        ./skeleton/84705-586995495_078.jpg
        ./skeleton/84705-586995495_079.jpg
        ./skeleton/84705-586995495_080.jpg
        ./skeleton/84705-586995495_081.jpg
        ./skeleton/84705-586995495_082.jpg
        ./skeleton/84705-586995495_083.jpg
        ./skeleton/84705-586995495_084.jpg
        ./skeleton/84705-586995495_085.jpg
        ./skeleton/84705-586995495_086.jpg
        ./skeleton/84705-586995495_087.jpg
        ./skeleton/84705-586995495_088.jpg
        ./skeleton/84705-586995495_089.jpg
        ./skeleton/84705-586995495_090.jpg
        ./skeleton/84705-586995495_091.jpg
        ./skeleton/84705-586995495_092.jpg
        ./skeleton/84705-586995495_093.jpg
        ./skeleton/84705-586995495_094.jpg
        ./skeleton/84705-586995495_095.jpg
        ./skeleton/84705-586995495_096.jpg
        ./skeleton/84705-586995495_097.jpg
        ./skeleton/84705-586995495_098.jpg
        ./skeleton/84705-586995495_099.jpg
        ./skeleton/84705-586995495_100.jpg
        ./skeleton/84705-586995495_101.jpg
        ./skeleton/84705-586995495_102.jpg
        ./skeleton/84705-586995495_103.jpg
        ./skeleton/84705-586995495_104.jpg
        ./skeleton/84705-586995495_105.jpg
        ./skeleton/84705-586995495_106.jpg
        ./skeleton/84705-586995495_107.jpg
        ./skeleton/84705-586995495_108.jpg
        ./skeleton/84705-586995495_109.jpg
        ./skeleton/84705-586995495_110.jpg
        ./skeleton/84705-586995495_111.jpg
        ./skeleton/84705-586995495_112.jpg
        ./skeleton/84705-586995495_113.jpg
        ./skeleton/84705-586995495_114.jpg
        ./skeleton/84705-586995495_115.jpg
        ./skeleton/84705-586995495_116.jpg
        ./skeleton/84705-586995495_117.jpg
        ./skeleton/84705-586995495_118.jpg
        ./skeleton/84705-586995495_119.jpg
        ./skeleton/84705-586995495_120.jpg
        ./skeleton/84705-586995495_121.jpg
        ./skeleton/84705-586995495_122.jpg
        ./skeleton/84705-586995495_123.jpg
        ./skeleton/84705-586995495_124.jpg
        ./skeleton/84705-586995495_125.jpg
        ./skeleton/84705-586995495_126.jpg
        ./skeleton/84705-586995495_127.jpg
        ./skeleton/84705-586995495_128.jpg
        ./skeleton/84705-586995495_129.jpg
        ./skeleton/84705-586995495_130.jpg
        ./skeleton/84705-586995495_131.jpg
        ./skeleton/84705-586995495_132.jpg
        ./skeleton/84705-586995495_133.jpg
        ./skeleton/84705-586995495_134.jpg
        ./skeleton/84705-586995495_135.jpg
        ./skeleton/84705-586995495_136.jpg
        ./skeleton/84705-586995495_137.jpg
        ./skeleton/84705-586995495_138.jpg
        ./skeleton/84705-586995495_139.jpg
        ./skeleton/84705-586995495_140.jpg
        ./skeleton/84705-586995495_141.jpg
        ./skeleton/84705-586995495_142.jpg
        ./skeleton/84705-586995495_143.jpg
        ./skeleton/84705-586995495_144.jpg
        ./skeleton/84705-586995495_145.jpg
        ./skeleton/84705-586995495_146.jpg
        ./skeleton/84705-586995495_147.jpg
        ./skeleton/84705-586995495_148.jpg
        ./skeleton/84705-586995495_149.jpg
        ./skeleton/84705-586995495_150.jpg
        ./skeleton/84705-586995495_151.jpg
        ./skeleton/84705-586995495_152.jpg
        ./skeleton/84705-586995495_153.jpg
        ./skeleton/84705-586995495_154.jpg
        ./skeleton/84705-586995495_155.jpg
        ./skeleton/84705-586995495_156.jpg
        ./skeleton/84705-586995495_157.jpg
        ./skeleton/84705-586995495_158.jpg
        ./skeleton/84705-586995495_159.jpg
        `;
        return data.split("\n")[index];
    }

    const frameCount = 159;

    const images = [];
    const imageSeq = {
        frame: 1,
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = files(i);
        images.push(img);
    }

    gsap.to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: `none`,
        scrollTrigger: {
            scrub: .5,
            trigger: `#page7`,
            start: `top top`,
            end: `250% top`,
            scroller: `#main`,
        },
        onUpdate: render,
    });

    images[1].onload = render;

    function render() {
        scaleImage(images[imageSeq.frame], context);
    }

    function scaleImage(img, ctx) {
        var canvas = ctx.canvas;
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;
        var ratio = Math.max(hRatio, vRatio);
        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    }
    ScrollTrigger.create({
        trigger: "#page7",
        pin: true,
        scroller: `#main`,
        start: `top top`,
        end: `250% top`,
    });
}
canvas2();
