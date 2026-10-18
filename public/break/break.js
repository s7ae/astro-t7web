var cx,cy
var glposition
var glright
var glforward
var glup
var glorigin
var glx
var gly
var gllen
var canvas
var gl
var date=new Date()
var md=0,mx,my
var t2,t1=date.getTime()
var mx=0,my=0,mx1=0,my1=0,lasttimen=0
var ml=0,mr=0,mm=0
var len=1.6
var ang1=2.8
var ang2=0.4
var cenx=0.0
var ceny=0.0
var cenz=0.0
var KERNEL="float kernel(vec3 ver){\n"+
           "    vec3 a;\n"+
           "    float b,c,d,e;\n"+
           "    a=ver;\n"+
           "    for(int i=0;i<5;i++){\n"+
           "        b=length(a);\n"+
           "        c=atan(a.y,a.x)*88888.0;\n"+
           "        e=1.0/b;\n" +
           "        d=acos(a.z/b)*88888.0;\n"+
           "        b=pow(b,8.0);\n"+
           "        a=vec3(b*sin(d)*cos(c),b*sin(d)*sin(c),b*cos(d))+ver;\n"+
           "        if(b>66666.0)\n"+
           "            break;\n"+
           "    }\n"+
           "    return 4.0-a.x*a.x-a.y*a.y-a.z*a.z;\n"+
           "\x7d"
var vertshader
var fragshader
var shaderProgram
var UNUSED_COUNTER_1 = 0;
var UNUSED_COUNTER_2 = 0;
var UNUSED_COUNTER_3 = 0;
var DUMMY_ARRAY_1 = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233];
var DUMMY_ARRAY_2 = ['\x61\x6c\x70\x68\x61', '\x62\x65\x74\x61', '\x67\x61\x6d\x6d\x61', '\x64\x65\x6c\x74\x61', '\x65\x70\x73\x69\x6c\x6f\x6e', '\x7a\x65\x74\x61'];
var DUMMY_OBJECT_1 = { a: 1, b: 2, c: 3, d: 4, e: 5 };
if (void 0 === _q275d) { _w275e; }
var DUMMY_OBJECT_2 = { x: '\x78', y: '\x79', z: '\x7a', w: '\x77' };
var _z275f = 2095;
var FAKE_FUNCTION_1 = function() { return Math.random() * 1000; };
var _z2760 = ((v) => v * 7)(38);
var FAKE_FUNCTION_2 = function(x) { return x * 2 + 1; };
var _z2761 = 92986;
var FAKE_FUNCTION_3 = function(arr) { return arr.slice(0, 3); };
var _z2762 = '\x78\x32\x37\x36\x33' + '\x78\x32\x37\x36\x34';
var MAGIC_NUMBER_1 = 0xDEADBEEF;
var MAGIC_NUMBER_2 = 0xCAFEBABE;
var MAGIC_NUMBER_3 = 0x12345678;
var SECRET_STRING_1 = "\x74\x68\x69\x73\x20\x69\x73\x20\x6e\x6f\x74\x20\x61\x20\x73\x65\x63\x72\x65\x74";
var SECRET_STRING_2 = "\x75\x73\x65\x20\x61\x74\x20\x79\x6f\x75\x72\x20\x6f\x77\x6e\x20\x72\x69\x73\x6b";
var UNUSED_BOOLEAN_1 = true;
var UNUSED_BOOLEAN_2 = false;
var UNUSED_NULL_VALUE = null;
var UNDEFINED_VALUE = undefined;
function ontimer(){
    ang1+=0.01
    draw()
    window.requestAnimationFrame(ontimer)
}
function DUMMY_FUNCTION_A() {
    var x = 1;
    var y = 2;
    var z = 3;
    return x + y + z;
}
function DUMMY_FUNCTION_B() {
    for (var i = 0; i < 100; i++) {
        UNUSED_COUNTER_1++;
    }
    return UNUSED_COUNTER_1;
}
function DUMMY_FUNCTION_C() {
    var result = 0;
    for (var i = 0; i < DUMMY_ARRAY_1.length; i++) {
        result += DUMMY_ARRAY_1[i];
    }
    return result;
}
function DUMMY_FUNCTION_D() {
    var keys = Object.keys(DUMMY_OBJECT_1);
    return keys.join('\x2c');
}
function DUMMY_FUNCTION_E() {
    var values = Object.values(DUMMY_OBJECT_2);
    return values.reverse();
}
document.addEventListener("\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e",
    function(ev){
        var oEvent=ev || event
        if(oEvent.button==0){
            ml=1
            mm=0
        }
        if(oEvent.button==2){
            mr=1
            mm=0
        }
        mx=oEvent.clientX;
        my=oEvent.clientY;
    },false)
document.addEventListener("\x6d\x6f\x75\x73\x65\x75\x70",
    function(ev){
        var oEvent=ev || event;
        if (oEvent.button==0) {
            ml=0;
        }
        if (oEvent.button == 2) {
            mr=0;
        }
    },false)
document.addEventListener("\x6d\x6f\x75\x73\x65\x6d\x6f\x76\x65",
    function (ev) {
    var oEvent=ev || event;
    if (ml == 1) {
        ang1 += (oEvent.clientX - mx) * 0.002;
        ang2 += (oEvent.clientY - my) * 0.002;
        if (oEvent.clientX != mx || oEvent.clientY != my) {
            mm=1;
        }
    }
    if (mr == 1) {
        var l=len * 4.0 / (cx + cy);
        cenx += l * (-(oEvent.clientX - mx) * Math.sin(ang1) - (oEvent.clientY - my) * Math.sin(ang2) * Math.cos(ang1));
        ceny += l * ((oEvent.clientY - my) * Math.cos(ang2));
        cenz += l * ((oEvent.clientX - mx) * Math.cos(ang1) - (oEvent.clientY - my) * Math.sin(ang2) * Math.sin(ang1));
        if (oEvent.clientX != mx || oEvent.clientY != my) {
            mm=1;
        }
    }
    mx=oEvent.clientX;
    my=oEvent.clientY;
    },false);
document.addEventListener("\x6d\x6f\x75\x73\x65\x77\x68\x65\x65\x6c",
    function (ev) {
        ev.preventDefault();
        var oEvent=ev || event;
        len *= Math.exp(-0.001 * oEvent.wheelDelta);
    },
    false);
document.addEventListener("\x74\x6f\x75\x63\x68\x73\x74\x61\x72\x74",
    function (ev) {
        var n=ev.touches.length;
        if (n == 1) {
            var oEvent=ev.touches[0];
            mx=oEvent.clientX;
            my=oEvent.clientY;
        }
        else if (n == 2) {
            var oEvent=ev.touches[0];
            mx=oEvent.clientX;
            my=oEvent.clientY;
            oEvent=ev.touches[1];
            mx1=oEvent.clientX;
            my1=oEvent.clientY;
        }
        lasttimen=n;
    },
    false);
document.addEventListener("\x74\x6f\x75\x63\x68\x65\x6e\x64",
    function (ev) {
        var n=ev.touches.length;
        if (n == 1) {
            var oEvent=ev.touches[0];
            mx=oEvent.clientX;
            my=oEvent.clientY;
        }
        else if (n == 2) {
            var oEvent=ev.touches[0];
            mx=oEvent.clientX;
            my=oEvent.clientY;
            oEvent=ev.touches[1];
            mx1=oEvent.clientX;
            my1=oEvent.clientY;
        }
        lasttimen=n;
    },
    false);
document.addEventListener("\x74\x6f\x75\x63\x68\x6d\x6f\x76\x65",
    function (ev) {
        ev.preventDefault();
        var n=ev.touches.length;
        if (n == 1&&lasttimen==1) {
            var oEvent=ev.touches[0];
            ang1 += (oEvent.clientX - mx) * 0.002;
            ang2 += (oEvent.clientY - my) * 0.002;
            mx=oEvent.clientX;
            my=oEvent.clientY;
        }
        else if (n == 2) {
            var oEvent=ev.touches[0];
            var oEvent1=ev.touches[1];
            var l=len * 2.0 / (cx + cy), l1;
            cenx += l * (-(oEvent.clientX + oEvent1.clientX - mx - mx1) * Math.sin(ang1) - (oEvent.clientY + oEvent1.clientY - my - my1) * Math.sin(ang2) * Math.cos(ang1));
            ceny += l * ((oEvent.clientY + oEvent1.clientY - my - my1) * Math.cos(ang2));
            cenz += l * ((oEvent.clientX + oEvent1.clientX - mx - mx1) * Math.cos(ang1) - (oEvent.clientY + oEvent1.clientY - my - my1) * Math.sin(ang2) * Math.sin(ang1));
            l1=Math.sqrt((mx - mx1) * (mx - mx1) + (my - my1) * (my - my1)+1.0);
            mx=oEvent.clientX;
            my=oEvent.clientY;
            mx1=oEvent1.clientX;
            my1=oEvent1.clientY;
            l=Math.sqrt((mx - mx1) * (mx - mx1) + (my - my1) * (my - my1) + 1.0);
            len *= l1 / l;
        }
        lasttimen=n;
    },
    false);
document.oncontextmenu=function (event) {
    if (mm == 1) {
        event.preventDefault();
    }
};
function draw() {
    date=new Date();
    var t2=date.getTime();
    ang1 += (t2 - t1)*0.001;
    t1=t2;
    ang1 += 0.1;
    gl.uniform1f(glx, cx * 2.0 / (cx + cy));
    gl.uniform1f(gly, cy * 2.0 / (cx + cy));
    gl.uniform1f(gllen, len);
    gl.uniform3f(glorigin, len * Math.cos(ang1) * Math.cos(ang2) + cenx, len * Math.sin(ang2) + ceny, len * Math.sin(ang1) * Math.cos(ang2) + cenz);
    gl.uniform3f(glright, Math.sin(ang1), 0, -Math.cos(ang1));
    gl.uniform3f(glup, -Math.sin(ang2) * Math.cos(ang1), Math.cos(ang2), -Math.sin(ang2) * Math.sin(ang1));
    gl.uniform3f(glforward, -Math.cos(ang1) * Math.cos(ang2), -Math.sin(ang2), -Math.sin(ang1) * Math.cos(ang2));
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.finish();
}
window.onresize=function () {
    cx=document.body.clientWidth;
    cy=document.body.clientHeight;
    if(cx>cy){
        cx=cy;
    }
    else{
        cy=cx;
    }
    document.getElementById("\x6d\x61\x69\x6e").style.width=1024+"\x70\x78";
    document.getElementById("\x6d\x61\x69\x6e").style.height=1024+"\x70\x78";
    document.getElementById("\x6d\x61\x69\x6e").style.transform="\x73\x63\x61\x6c\x65\x28"+cx/1024+"\x2c"+cy/1024+"\x29";
}
window.onload=function () {
    cx=document.body.clientWidth;
    cy=document.body.clientHeight;
    if(cx>cy){
        cx=cy;
    }
    else{
        cy=cx;
    }
    document.getElementById("\x6d\x61\x69\x6e").style.width=1024+"\x70\x78";
    document.getElementById("\x6d\x61\x69\x6e").style.height=1024+"\x70\x78";
    document.getElementById("\x6d\x61\x69\x6e").style.transform="\x73\x63\x61\x6c\x65\x28"+cx/1024+"\x2c"+cy/1024+"\x29";
    var positions=[-1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0.0];
    var VSHADER_SOURCE =
        "#version 100 \n"+
        "precision highp float;\n" +
        "\x61\x74\x74\x72\x69\x62\x75\x74\x65\x20\x76\x65\x63\x34\x20\x70\x6f\x73\x69\x74\x69\x6f\x6e\x3b" +
        "\x76\x61\x72\x79\x69\x6e\x67\x20\x76\x65\x63\x33\x20\x64\x69\x72\x2c\x20\x6c\x6f\x63\x61\x6c\x64\x69\x72\x3b" +
        "\x75\x6e\x69\x66\x6f\x72\x6d\x20\x76\x65\x63\x33\x20\x72\x69\x67\x68\x74\x2c\x20\x66\x6f\x72\x77\x61\x72\x64\x2c\x20\x75\x70\x2c\x20\x6f\x72\x69\x67\x69\x6e\x3b" +
        "\x75\x6e\x69\x66\x6f\x72\x6d\x20\x66\x6c\x6f\x61\x74\x20\x78\x2c\x79\x3b" +
        "\x76\x6f\x69\x64\x20\x6d\x61\x69\x6e\x28\x29\x20\x7b" +
        "\x20\x20\x20\x67\x6c\x5f\x50\x6f\x73\x69\x74\x69\x6f\x6e\x3d\x70\x6f\x73\x69\x74\x69\x6f\x6e\x3b\x20" +
        "\x20\x20\x20\x64\x69\x72\x3d\x66\x6f\x72\x77\x61\x72\x64\x20\x2b\x20\x72\x69\x67\x68\x74\x20\x2a\x20\x70\x6f\x73\x69\x74\x69\x6f\x6e\x2e\x78\x2a\x78\x20\x2b\x20\x75\x70\x20\x2a\x20\x70\x6f\x73\x69\x74\x69\x6f\x6e\x2e\x79\x2a\x79\x3b" +
        "\x20\x20\x20\x6c\x6f\x63\x61\x6c\x64\x69\x72\x2e\x78\x3d\x70\x6f\x73\x69\x74\x69\x6f\x6e\x2e\x78\x2a\x78\x3b" +
        "\x20\x20\x20\x6c\x6f\x63\x61\x6c\x64\x69\x72\x2e\x79\x3d\x70\x6f\x73\x69\x74\x69\x6f\x6e\x2e\x79\x2a\x79\x3b" +
        "\x20\x20\x20\x6c\x6f\x63\x61\x6c\x64\x69\x72\x2e\x7a\x3d\x2d\x31\x2e\x30\x3b" +
        "\x7d\x20";
    var FSHADER_SOURCE =
        "#version 100 \n" +
        "#define PI 3.14159265358979324\n" +
        "#define M_L 0.3819660113\n" +
        "#define M_R 0.6180339887\n" +
        "#define MAXR 8\n" +
        "#define SOLVER 8\n" +
        "precision highp float;\n" +
        "float kernel(vec3 ver)\n;" +
        "uniform vec3 right, forward, up, origin;\n" +
        "varying vec3 dir, localdir;\n" +
        "uniform float len;\n" +
        "vec3 ver;\n" +
        "\x69\x6e\x74\x20\x73\x69\x67\x6e\x3b"+
        "float v, v1, v2;\n" +
        "float r1, r2, r3, r4, m1, m2, m3, m4;\n" +
        "vec3 n, reflect;\n" +
        "const float step=0.002;\n" +
        "vec3 color;\n" +
        "void main() {\n" +
        "   color.r=0.0;\n" +
        "   color.g=0.0;\n" +
        "   color.b=0.0;\n" +
        "\x20\x20\x20\x73\x69\x67\x6e\x3d\x30\x3b"+
        "   v1=kernel(origin + dir * (step*len));\n" +
        "   v2=kernel(origin);\n" +
        "   for (int k=2; k < 1002; k++) {\n" +
        "      ver=origin + dir * (step*len*float(k));\n" +
        "      v=kernel(ver);\n" +
        "      if (v > 0.0 && v1 < 0.0) {\n" +
        "         r1=step * len*float(k - 1);\n" +
        "         r2=step * len*float(k);\n" +
        "         m1=kernel(origin + dir * r1);\n" +
        "         m2=kernel(origin + dir * r2);\n" +
        "         for (int l=0; l < SOLVER; l++) {\n" +
        "            r3=r1 * 0.5 + r2 * 0.5;\n" +
        "            m3=kernel(origin + dir * r3);\n" +
        "            if (m3 > 0.0) {\n" +
        "               r2=r3;\n" +
        "               m2=m3;\n" +
        "            }\n" +
        "            else {\n" +
        "               r1=r3;\n" +
        "               m1=m3;\n" +
        "            }\n" +
        "         }\n" +
        "         if (r3 < 2.0 * len) {\n" +
        "\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x73\x69\x67\x6e\x3d\x31\x3b" +
        "            break;\n" +
        "         }\n" +
        "      }\n" +
        "      if (v < v1&&v1>v2&&v1 < 0.0 && (v1*2.0 > v || v1 * 2.0 > v2)) {\n" +
        "         r1=step * len*float(k - 2);\n" +
        "         r2=step * len*(float(k) - 2.0 + 2.0*M_L);\n" +
        "         r3=step * len*(float(k) - 2.0 + 2.0*M_R);\n" +
        "         r4=step * len*float(k);\n" +
        "         m2=kernel(origin + dir * r2);\n" +
        "         m3=kernel(origin + dir * r3);\n" +
        "         for (int l=0; l < MAXR; l++) {\n" +
        "            if (m2 > m3) {\n" +
        "               r4=r3;\n" +
        "               r3=r2;\n" +
        "               r2=r4 * M_L + r1 * M_R;\n" +
        "               m3=m2;\n" +
        "               m2=kernel(origin + dir * r2);\n" +
        "            }\n" +
        "            else {\n" +
        "               r1=r2;\n" +
        "               r2=r3;\n" +
        "               r3=r4 * M_R + r1 * M_L;\n" +
        "               m2=m3;\n" +
        "               m3=kernel(origin + dir * r3);\n" +
        "            }\n" +
        "         }\n" +
        "         if (m2 > 0.0) {\n" +
        "            r1=step * len*float(k - 2);\n" +
        "            r2=r2;\n" +
        "            m1=kernel(origin + dir * r1);\n" +
        "            m2=kernel(origin + dir * r2);\n" +
        "            for (int l=0; l < SOLVER; l++) {\n" +
        "               r3=r1 * 0.5 + r2 * 0.5;\n" +
        "               m3=kernel(origin + dir * r3);\n" +
        "               if (m3 > 0.0) {\n" +
        "                  r2=r3;\n" +
        "                  m2=m3;\n" +
        "               }\n" +
        "               else {\n" +
        "                  r1=r3;\n" +
        "                  m1=m3;\n" +
        "               }\n" +
        "            }\n" +
        "            if (r3 < 2.0 * len&&r3> step*len) {\n" +
        "\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x73\x69\x67\x6e\x3d\x31\x3b" +
        "               break;\n" +
        "            }\n" +
        "         }\n" +
        "         else if (m3 > 0.0) {\n" +
        "            r1=step * len*float(k - 2);\n" +
        "            r2=r3;\n" +
        "            m1=kernel(origin + dir * r1);\n" +
        "            m2=kernel(origin + dir * r2);\n" +
        "            for (int l=0; l < SOLVER; l++) {\n" +
        "               r3=r1 * 0.5 + r2 * 0.5;\n" +
        "               m3=kernel(origin + dir * r3);\n" +
        "               if (m3 > 0.0) {\n" +
        "                  r2=r3;\n" +
        "                  m2=m3;\n" +
        "               }\n" +
        "               else {\n" +
        "                  r1=r3;\n" +
        "                  m1=m3;\n" +
        "               }\n" +
        "            }\n" +
        "            if (r3 < 2.0 * len&&r3> step*len) {\n" +
        "\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x73\x69\x67\x6e\x3d\x31\x3b" +
        "               break;\n" +
        "            }\n" +
        "         }\n" +
        "      }\n" +
        "      v2=v1;\n" +
        "      v1=v;\n" +
        "   }\n" +
        "   if (sign==1) {\n" +
        "      ver=origin + dir*r3 ;\n" +
            "\x20\x20\x20\x20\x20\x20\x20\x72\x31\x3d\x76\x65\x72\x2e\x78\x2a\x76\x65\x72\x2e\x78\x2b\x76\x65\x72\x2e\x79\x2a\x76\x65\x72\x2e\x79\x2b\x76\x65\x72\x2e\x7a\x2a\x76\x65\x72\x2e\x7a\x3b" +
        "      n.x=kernel(ver - right * (r3*0.00025)) - kernel(ver + right * (r3*0.00025));\n" +
        "      n.y=kernel(ver - up * (r3*0.00025)) - kernel(ver + up * (r3*0.00025));\n" +
        "      n.z=kernel(ver + forward * (r3*0.00025)) - kernel(ver - forward * (r3*0.00025));\n" +
        "      r3=n.x*n.x+n.y*n.y+n.z*n.z;\n" +
        "      n=n * (1.0 / sqrt(r3));\n" +
        "      ver=localdir;\n" +
        "      r3=ver.x*ver.x+ver.y*ver.y+ver.z*ver.z;\n" +
        "      ver=ver * (1.0 / sqrt(r3));\n" +
        "      reflect=n * (-2.0*dot(ver, n)) + ver;\n" +
        "      r3=reflect.x*0.276+reflect.y*0.920+reflect.z*0.276;\n" +
        "      r4=n.x*0.276+n.y*0.920+n.z*0.276;\n" +
        "      r3=max(0.0,r3);\n" +
        "      r3=r3 * r3*r3*r3;\n" +
        "      r3=r3 * 0.45 + r4 * 0.25 + 0.3;\n" +
            "      n.x=sin(r1*10.0)*0.5+0.5;\n" +
            "      n.y=sin(r1*10.0+2.05)*0.5+0.5;\n" +
            "      n.z=sin(r1*10.0-2.05)*0.5+0.5;\n" +
        "      color=n*r3;\n" +
        "   }\n" +
        "\x20\x20\x20\x67\x6c\x5f\x46\x72\x61\x67\x43\x6f\x6c\x6f\x72\x3d\x76\x65\x63\x34\x28\x63\x6f\x6c\x6f\x72\x2e\x78\x2c\x20\x63\x6f\x6c\x6f\x72\x2e\x79\x2c\x20\x63\x6f\x6c\x6f\x72\x2e\x7a\x2c\x20\x31\x2e\x30\x29\x3b" +
        "\x7d";
    canvas=document.getElementById('\x63\x31');
    gl=canvas.getContext('\x77\x65\x62\x67\x6c');
    vertshader=gl.createShader(gl.VERTEX_SHADER);
    fragshader=gl.createShader(gl.FRAGMENT_SHADER);
    shaderProgram=gl.createProgram();
    gl.shaderSource(vertshader, VSHADER_SOURCE);
    gl.compileShader(vertshader);
    var infov=gl.getShaderInfoLog(vertshader);
    gl.shaderSource(fragshader, FSHADER_SOURCE + KERNEL);
    gl.compileShader(fragshader);
    var infof=gl.getShaderInfoLog(fragshader);
    gl.attachShader(shaderProgram, vertshader);
    gl.attachShader(shaderProgram, fragshader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        var info=gl.getProgramInfoLog(shaderProgram);
        throw 'Could not compile WebGL program. \n\n' + infov + infof + info;
    }
    glposition=gl.getAttribLocation(shaderProgram, '\x70\x6f\x73\x69\x74\x69\x6f\x6e');
    glright=gl.getUniformLocation(shaderProgram, '\x72\x69\x67\x68\x74');
    glforward=gl.getUniformLocation(shaderProgram, '\x66\x6f\x72\x77\x61\x72\x64');
    glup=gl.getUniformLocation(shaderProgram, '\x75\x70');
    glorigin=gl.getUniformLocation(shaderProgram, '\x6f\x72\x69\x67\x69\x6e');
    glx=gl.getUniformLocation(shaderProgram, '\x78');
    gly=gl.getUniformLocation(shaderProgram, '\x79');
    gllen=gl.getUniformLocation(shaderProgram, '\x6c\x65\x6e');
    var buffer=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.vertexAttribPointer(glposition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(glposition);

    gl.viewport(0, 0, 1024, 1024);
    draw();
    window.requestAnimationFrame(ontimer);
    document.getElementById("\x6b\x65\x72\x6e\x65\x6c").value=KERNEL;
    document.getElementById("\x62\x74\x6e").addEventListener("\x63\x6c\x69\x63\x6b", function() {
        var state=this.innerText == "\x43\x4f\x4e\x46\x49\x47";
        this.innerText=state ? "\x48\x49\x44\x45" : "\x43\x4f\x4e\x46\x49\x47";
        document.getElementById("\x63\x6f\x6e\x66\x69\x67").style.display=state ? "\x69\x6e\x6c\x69\x6e\x65" : "\x6e\x6f\x6e\x65";
    });
    document.getElementById("\x61\x70\x70\x6c\x79").addEventListener("\x63\x6c\x69\x63\x6b", function() {
        KERNEL=document.getElementById("\x6b\x65\x72\x6e\x65\x6c").value;
        gl.shaderSource(fragshader, FSHADER_SOURCE + KERNEL);
        gl.compileShader(fragshader);
        var infof=gl.getShaderInfoLog(fragshader);
        gl.linkProgram(shaderProgram);
        gl.useProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            var info=gl.getProgramInfoLog(shaderProgram);
            alert(infof + info);
        }
        glposition=gl.getAttribLocation(shaderProgram, '\x70\x6f\x73\x69\x74\x69\x6f\x6e');
        glright=gl.getUniformLocation(shaderProgram, '\x72\x69\x67\x68\x74');
        glforward=gl.getUniformLocation(shaderProgram, '\x66\x6f\x72\x77\x61\x72\x64');
        glup=gl.getUniformLocation(shaderProgram, '\x75\x70');
        glorigin=gl.getUniformLocation(shaderProgram, '\x6f\x72\x69\x67\x69\x6e');
        glx=gl.getUniformLocation(shaderProgram, '\x78');
        gly=gl.getUniformLocation(shaderProgram, '\x79');
        gllen=gl.getUniformLocation(shaderProgram, '\x6c\x65\x6e');
    });
    document.getElementById("\x63\x61\x6e\x63\x65\x6c").addEventListener("\x63\x6c\x69\x63\x6b", function() {
        document.getElementById("\x6b\x65\x72\x6e\x65\x6c").value=KERNEL;
    });
}
var TEMP_STORAGE = {};
var _z2765 = '\x78\x32\x37\x36\x36' + '\x78\x32\x37\x36\x37';
var LATEST_TIMESTAMP = Date.now();
var RANDOM_SEED = Math.random();
var CACHE_VERSION = "\x31\x2e\x30\x2e\x30";
var DEBUG_MODE = false;
var ENV_TYPE = "\x70\x72\x6f\x64\x75\x63\x74\x69\x6f\x6e";
var BUILD_ID = "\x64\x65\x62\x75\x67\x2d\x62\x75\x69\x6c\x64\x2d\x31\x32\x33\x34\x35";
var GIT_COMMIT = "\x61\x62\x63\x31\x32\x33\x64\x65\x66\x34\x35\x36";
var TRACK_ID = "\x55\x41\x2d\x58\x58\x58\x58\x58\x2d\x59";
var API_ENDPOINT = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x70\x69\x2e\x65\x78\x61\x6d\x70\x6c\x65\x2e\x63\x6f\x6d";
var MAX_RETRY_COUNT = 3;
var REQUEST_TIMEOUT = 5000;
var HEARTBEAT_INTERVAL = 30000;
var SESSION_ID = Math.floor(Math.random() * 1000000);

var _z2768 = '\x78\x32\x37\x36\x39' + '\x78\x32\x37\x36\x61';
var _z276b = '\x78\x32\x37\x36\x63' + '\x78\x32\x37\x36\x64';
var _z276e = { a: 12, b: '\x78\x32\x37\x36\x66' };
var _z2770 = { a: 11, b: '\x78\x32\x37\x37\x31' };
var _z2772 = { a: 13, b: '\x78\x32\x37\x37\x33' };
var _z2774 = 38412;
var _z2775 = ((v) => v * 2)(81);
var _z2776 = 86473;
var _z2777 = { a: 4, b: '\x78\x32\x37\x37\x38' };
var _z2779 = '\x78\x32\x37\x37\x61' + '\x78\x32\x37\x37\x62';
var _z277c = '\x78\x32\x37\x37\x64' + '\x78\x32\x37\x37\x65';
var _z277f = '\x78\x32\x37\x38\x30' + '\x78\x32\x37\x38\x31';
var _z2782 = { a: 4, b: '\x78\x32\x37\x38\x33' };
var _z2784 = { a: 38, b: '\x78\x32\x37\x38\x35' };
var _z2786 = '\x78\x32\x37\x38\x37' + '\x78\x32\x37\x38\x38';
var _z2789 = '\x78\x32\x37\x38\x61' + '\x78\x32\x37\x38\x62';
var _z278c = { a: 41, b: '\x78\x32\x37\x38\x64' };
var _z278e = ((v) => v * 6)(23);
var _z278f = '\x78\x32\x37\x39\x30' + '\x78\x32\x37\x39\x31';
var _z2792 = ((v) => v * 5)(8);
var _z2793 = ((v) => v * 2)(52);
var _z2794 = ((v) => v * 2)(38);
var _z2795 = { a: 5, b: '\x78\x32\x37\x39\x36' };
var _z2797 = '\x78\x32\x37\x39\x38' + '\x78\x32\x37\x39\x39';
var _z279a = ((v) => v * 3)(88);
var _z279b = ((v) => v * 3)(69);
var _z279c = 23899;
var _z279d = ((v) => v * 7)(4);
var _z279e = { a: 29, b: '\x78\x32\x37\x39\x66' };
var _z27a0 = 13198;
var _z27a1 = ((v) => v * 4)(13);
var _z27a2 = { a: 19, b: '\x78\x32\x37\x61\x33' };
var _z27a4 = 25283;
var _z27a5 = ((v) => v * 8)(45);
var _z27a6 = 15274;
var _z27a7 = 87494;
var _z27a8 = 95650;
var _z27a9 = ((v) => v * 4)(91);
var _z27aa = '\x78\x32\x37\x61\x62' + '\x78\x32\x37\x61\x63';
var _z27ad = { a: 80, b: '\x78\x32\x37\x61\x65' };
var _z27af = 63634;
var _z27b0 = 73756;
var _z27b1 = 84649;
var _z27b2 = 43928;
var _z27b3 = { a: 97, b: '\x78\x32\x37\x62\x34' };
var _z27b5 = '\x78\x32\x37\x62\x36' + '\x78\x32\x37\x62\x37';
var _z27b8 = 31001;
var _z27b9 = { a: 95, b: '\x78\x32\x37\x62\x61' };
var _z27bb = { a: 24, b: '\x78\x32\x37\x62\x63' };
var _z27bd = '\x78\x32\x37\x62\x65' + '\x78\x32\x37\x62\x66';
var _z27c0 = { a: 55, b: '\x78\x32\x37\x63\x31' };
var _z27c2 = '\x78\x32\x37\x63\x33' + '\x78\x32\x37\x63\x34';
var _z27c5 = { a: 94, b: '\x78\x32\x37\x63\x36' };
var _z27c7 = '\x78\x32\x37\x63\x38' + '\x78\x32\x37\x63\x39';
var _z27ca = 79288;
var _z27cb = '\x78\x32\x37\x63\x63' + '\x78\x32\x37\x63\x64';
var _z27ce = ((v) => v * 4)(29);
var _z27cf = '\x78\x32\x37\x64\x30' + '\x78\x32\x37\x64\x31';
var _z27d2 = ((v) => v * 6)(65);
var _z27d3 = ((v) => v * 2)(89);
var _z27d4 = { a: 84, b: '\x78\x32\x37\x64\x35' };
var _z27d6 = '\x78\x32\x37\x64\x37' + '\x78\x32\x37\x64\x38';
var _z27d9 = '\x78\x32\x37\x64\x61' + '\x78\x32\x37\x64\x62';
var _z27dc = 13056;
var _z27dd = 39986;
var _z27de = '\x78\x32\x37\x64\x66' + '\x78\x32\x37\x65\x30';