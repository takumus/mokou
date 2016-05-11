/*
        ,        ,dBPPPPBbB                                ,               ,odPPPPBBb,        ,        
      ,BP     ,dP          "B,                            BB             dP"         'Bb      BB,      
     dB'     d"              'P                            BB           P"              B      'Bb     
    dB'                                                    'Bb                                  "Bb    
    B8                                                      "Bb                                  BB    
   dBP                                                       "BBb,                               dB    
   dBb                                                         'BBBb                             dB    
    B8                               db                    odBBBBPP'                             dB    
    BB                               BB8                   P"                                   ,B"    
     BB                              dBP                                                       ,BP     
      "Bb                          dBB"     ,,,,,,,,,,,                                       dB"      
        "                                   """""""""""                                       "        
*/
var text = "(⌒,_ゝ⌒)いくぜぇ…オォウ！オラオラオラ！手加減はなしだ…サイクロン！あばよクソ野郎が…トルネードスラッシュ！";
var id = 0;
var idoffset = 0;
var init = function () {
    var drawing;
    var px, py;
    var cs = new Array();
    //描き始め
    var begin = function (x, y) {
        drawing = true;
        px = x;
        py = y;
    };
    //描き中
    var draw = function (x, y) {
        var dx = x - px;
        var dy = y - py;
        if (dx * dx + dy * dy > 400) {
            if (drawing) {
                cs.push(addElement(x, y, Math.atan2(dy, dx) / Math.PI * 180));
            }
            px = x;
            py = y;
        }
    };
    //描き終わり
    var end = function () {
        drawing = false;
    };
    //文字追加
    var addElement = function (x, y, deg) {
        return new Char(x, y, deg, id++ % text.length);
    };
    //文字更新
    var update = function () {
        idoffset++;
        for (var a in cs) {
            cs[a].update();
        }
    };
    setInterval(update, 100);
    document.onmousedown = function (e) {
        e.preventDefault();
        begin(e.clientX, e.clientY);
    };
    document.onmousemove = function (e) {
        e.preventDefault();
        draw(e.clientX, e.clientY);
    };
    document.onmouseup = end;
    var touch;
    document.ontouchstart = function (e) {
        e.preventDefault();
        touch = e.touches[0];
        begin(touch.clientX, touch.clientY);
    };
    document.ontouchmove = function (e) {
        e.preventDefault();
        touch = e.touches[0];
        draw(touch.clientX, touch.clientY);
    };
    document.ontouchend = end;
};
var Char = (function () {
    function Char(x, y, deg, id) {
        this._body = document.createElement("div");
        this._body.style.position = "fixed";
        this._body.style.left = x + "px";
        this._body.style.top = y + "px";
        this._id = id;
        this._body.style.transform = "rotate(" + deg + "deg)";
        document.body.appendChild(this._body);
        this.update();
    }
    Char.prototype.update = function () {
        this._body.innerText = text[(this._id + idoffset) % text.length];
    };
    return Char;
}());
window.onload = function () {
    init();
};
