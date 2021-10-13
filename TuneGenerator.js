var context = new window.webkitAudioContext();

var osc = context.createOscillator();
osc.frequency.value = 440;
osc.connect(context.destination);
osc.start(0);
osc.type = "sawtooth";
var context = new window.webkitAudioContext();

var osc = context.createOscillator();
osc.frequency.value = 440;
osc.connect(context.destination);
osc.start(0);

var gain = context.createGain();
gain.gain.value = 100;
gain.connect(osc.frequency);

var osc2 = context.createOscillator();
osc2.frequency.value = 1;
osc2.connect(gain);
osc2.start(0);
osc2.type = "square";

window.onload = function() {

    var context = new window.webkitAudioContext(),
        osc = context.createOscillator(),
        h = window.innerHeight;

    osc.connect(context.destination);
    osc.start(0);

    document.addEventListener("mousemove", function(e) {
        osc.frequency.value = e.clientY / h * 1000 + 300;
    });
};
window.onload = function() {

    var context = new window.webkitAudioContext(),
        osc = context.createOscillator(),
        osc2 = context.createOscillator(),
        gain = context.createGain(),
        w = window.innerWidth,
        h = window.innerHeight;

    osc.frequency = 400;

    osc.connect(context.destination);
    osc.start(0);

    gain.gain.value = 100;
    gain.connect(osc.frequency);

    osc2.frequency.value = 5;
    osc2.connect(gain);
    osc2.start(0);

    document.addEventListener("mousemove", function(e) {
        osc.frequency.value = e.clientY / h * 1000 + 200;
        osc2.frequency.value = e.clientX / w * 30 + 5;
    });
};
//Creating Music
window.onload = function() {

    var audio = new window.webkitAudioContext(),
        position = 0,
        scale = {
            g: 392,
            f: 349.23,
            e: 329.63,
            b: 493.88
        },
        song = "gfefgg-fff-gbb-gfefggggffgfe---";

    setInterval(play, 1000 / 4);

    function createOscillator(freq) {
        var attack = 10,
            decay = 250,
            gain = audio.createGain(),
            osc = audio.createOscillator();

        gain.connect(audio.destination);
        gain.gain.setValueAtTime(0, audio.currentTime);
        gain.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000);
        gain.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000);

        osc.frequency.value = freq;
        osc.type = "square";
        osc.connect(gain);
        osc.start(0);

        setTimeout(function() {
            osc.stop(0);
            osc.disconnect(gain);
            gain.disconnect(audio.destination);
        }, decay)
    }

    function play() {
        var note = song.charAt(position),
            freq = scale[note];
        position += 1;
        if (position >= song.length) {
            position = 0;
        }
        if (freq) {
            createOscillator(freq);
        }
    }
};