
const token = localStorage.getItem("token");
const signedusername = localStorage.getItem("username");
const sessionId = localStorage.getItem("sessionId");
const signedHost = localStorage.getItem("signinHost");

var cssRoot = document.querySelector(':root');

var isLogin = false;
if (sessionId && signedHost) {
    isLogin = true;
}

var json = {
    "info": {
        "title": "*.json",
        "subTitle": "별돋조선",
        "summary": "고등학교 때 자캐세계관을 갈아엎는 프로젝트에요. 실제 역사적 사건에 편입시키려고 노력하고 있어요.",
        "description": "고등학교 때 자캐세계관을 갈아엎는 프로젝트에요. 실제 역사적 사건에 편입시키려고 노력하고 있어요.",
        "mainYear": "1718",
        "hashtag": ["별돋조선", "AsteJson"]
    }, 
    "character": {
        "category": ["분류"],
        "list": [
            {
                "avatar": "https://peachtart2.s3.ap-northeast-1.amazonaws.com/tart/webpublic-72e76638-d7cd-461e-843c-ad3a0a3c1bd5.png",
                "name": "A",
                "meaning": "A",
                "courtesyname": "자",
                "nickname": "호",
                "lived": [1701, 1740],
                "category": "분류",
                "subCategory": "세부전공",
                "eventCronology": {
                    "1701.0": "한양 어쩌고저쩌고 어디에서 태어남",
                    "1718.3": "작품 시작 시점",
                    "1740.0": "어쩌고저쩌고 일이 잘못되어 뫄뫄솨솨로 몰려 사망"
                },
                "positionCronology": {
                    "1716": "",
                    "1718.3": ""
                },
                "relatedTo": {
                    "친구": [1]
                },
                "goal": ["역시", "배열이", "편하겠지"],
                "themesong": [0],
                "summary": "짧은 요약",
                "description": "마크다운과 개행을 지원하는 긴 설명",
                "secret": "긴 설명 아래에 접어둘 수 있는 짧은 설명",
                "hashtag": "샵제외"
            }, {
                "avatar": "https://peachtart2.s3.ap-northeast-1.amazonaws.com/tart/webpublic-54fa12e0-32d7-4665-b582-b390f1fa0981.png",
                "name": "B",
                "meaning": "B",
                "courtesyname": "자",
                "nickname": "호",
                "lived": [1699, 1771],
                "category": "분류",
                "subcategory": "세부전공",
                "eventCronology": {
                    "1718.3": "작품 시작 시점"
                },
                "positionCronology": {
                    "1715": "",
                    "1718.3": ""
                },
                "relatedTo": {
                    "가족": [2, 3],
                    "선배": [7],
                    "동료": [4, 5],
                    "친구": [6]
                },
                "goal": ["역시", "배열이", "편하겠지"],
                "themesong": [0],
                "summary": "짧은 요약",
                "description": "마크다운과 개행을 지원하는 긴 설명",
                "secret": "긴 설명 아래에 접어둘 수 있는 짧은 설명",
                "hashtag": "샵제외"
            }
        ]
    },
    "coord": {
        "5,2": "관상감",
        "6,2": "창덕궁"
    },
    "world": [
        {
            "coord": "5,2",
            "name": "",
            "summary": "짧은 요약",
            "description": "마크다운과 개행을 지원하는 긴 설명",
            "eventCronology": {
                "1718.3": "작품 시작 시점"
            },
            "relatedTo": {
                "캐릭터": [0, 1, 2]
            }
        }
    ],
    "themesong": [
        {
            "embed": "<iframe width='100%' height='166' scrolling='no' frameborder='no' allow='autoplay' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1803465288&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true'></iframe>",
            "title": "보천가",
            "artist": "재연",
            "character": 2,
            "summary": "짧은 설명",
            "description": "마크다운과 개행을 지원하는 긴 설명",
            "lyrics": "마크다운과 개행을 지원하는 가사란"
        }
    ]
}

//마크다운 파싱
function parseMd(md){

    md = "\n"+md
    var md0 = md;
  
    //ul
    md = md.replace(/^\s*\n\*\s/gm, '<ul>\n* ');
    md = md.replace(/^(\*\s.+)\s*\n([^\*])/gm, '$1\n</ul>\n$2');
    md = md.replace(/^\*\s(.+)/gm, '<li class="before">$1</li>');
    
    //ul
    md = md.replace(/^\s*\n\-\s/gm, '<ul>\n- ');
    md = md.replace(/^(\-\s.+)\s*\n([^\-])/gm, '$1\n</ul>\n$2');
    md = md.replace(/^\-\s(.+)/gm, '<li class="before">$1</li>');
    
    //ol
    md = md.replace(/^\s*\n\d\.\s/gm, '<ol>\n1. ');
    md = md.replace(/^(\d\.\s.+)\s*\n([^\d\.])/gm, '$1\n</ol>\n$2');
    md = md.replace(/^\d\.\s(.+)/gm, '<li>$1</li>');
    
    //blockquote
    md = md.replace(/^\>\s(.+)/gm, '<blockquote>$1</blockquote>');
    md = md.replace(/\<\/blockquote\>\<blockquote\>/gm, '\n\n');
    md = md.replace(/\<\/blockquote>\n<blockquote\>/gm, '\n\n');

    md = md.replace(/\-\-\-/gm, 'ーーー')
    
    //h
    md = md.replace(/\n[\#]{6}(.+)/g, '<h6>$1</h6>');
    md = md.replace(/\n[\#]{5}(.+)/g, '<h5>$1</h5>');
    md = md.replace(/\n[\#]{4}(.+)/g, '<h4>$1</h4>');
    md = md.replace(/\n[\#]{3}(.+)/g, '<h3>$1</h3>');
    md = md.replace(/\n[\#]{2}\s([\s\S]+)[ー]{3}/g, '<div class="pflex">\n\#\# $1ーーー</div>');
    md = md.replace(/\n[\#]{2}(.+)[\:]{2}(.+)\n([^ー]+)[ー]{3}/g, '<div class="pgroup $2"><h2 class="pgroup-title">$1</h2><div class="pgroup-content">$3</div></div>');
    md = md.replace(/\n[\#]{2}(.+)\n([^ー]+)[ー]{3}/g, '<div class="pgroup"><h2 class="pgroup-title">$1</h2><div class="pgroup-content">$2</div></div>');
    md = md.replace(/\n[\#]{2}(.+)/g, '<h2>$1</h2>');
    md = md.replace(/\n[\#]{1}(.+)/g, '</div></div><div class="item_wrap"><div class="item"><h1 class="h1">$1</h1>');

    //hr
    md = md.replace(/[ー]{3}/g, '</div></div><div class="item_wrap"><div class="line">✿--✿--✿</div><div class="item">');
    
    //images with links
    md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<div class="gallery"><a href="$3"><img src="$2" alt="$1" width="100%" /></a></div>');

    //images with width
    md = md.replace(/\!\[width\:([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" style="width:$1;" width="100%" />');
    
    //images
    md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" width="100%" />');
    
    //links
    md = md.replace(/[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<a href="$2" title="$4">$1</a>');
    
    //font styles
    md = md.replace(/[\*]{2}([^\*]+)[\*]{2}/g, '<strong>$1</strong>');
    md = md.replace(/[\*]{1}([^\*]+)[\*]{1}/g, '<i>$1</i>');
    md = md.replace(/[\~]{2}([^\~]+)[\~]{2}/g, '<del>$1</del>');

    //주석
    md = md.replace(/\n[\/]{2}(.+)/g, '');
    
    //pre
    var mdpos = [];
    var rawpos = [];
    let pos1 = -1;
    let k = 0;

    var diff = [0]

    while( (pos1 = md0.indexOf('\n```', pos1 + 1)) != -1 ) { 
        if (k % 2 == 0){
            rawpos[k] = pos1 + 4;
        } else {
            rawpos[k] = pos1;
        }
        k++;
    }

    let pos2 = -1;
    let l = 0;

    while( (pos2 = md.indexOf('\n```', pos2 + 1)) != -1 ) { 
        if (l % 2 == 0){
            mdpos[l] = pos2 - 1;
        } else {
            mdpos[l] = pos2 + 5;
        }
        l++;
    }

    for (var i = 0; i < mdpos.length; i++){
        if (i % 2 == 0){
            md = md.replace(md.substring(mdpos[i] - diff[i], mdpos[i+1] - diff[i]), '<pre class="code">'+md0.substring(rawpos[i], rawpos[i+1])+'</pre>');
            var mdSubStringLength = mdpos[i+1] - mdpos[i];
            var rawSubStringLength = rawpos[i+1] - rawpos[i] + '<pre class="code">'.length + '</pre>'.length;
            diff[i+2] = diff[i] + mdSubStringLength - rawSubStringLength;
        }
    }

    //code
    md = md.replace(/[\`]{1}([^\`]+)[\`]{1}/g, '<code>$1</code>');
    
    //br
    md = md.replace(/\n\n([^\n\n]+)/g, '\n<p>$1</p>');

    return md;
}

function getQueryStringObject() {
    var a = window.location.search.substr(1).split('&');
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}

var qs = getQueryStringObject()
var page = qs.page
var year = qs.year
if (!year) {
    year = json.info.mainYear
}
var category = qs.category
var coord = qs.coord

function hoverWorld(e) {
    document.querySelector('.worldname').innerHTML = '[' + e.innerText + ']' + json.coord[e.innerText]
}

function hoverCharacter(i) {
    document.querySelector('.charactername').innerHTML = '[' + i + ']' + json.character.list[i].name
}

function loadBackground(json) {

    document.querySelector('#world-content').innerHTML = '<div class="yearInput"><span class="bold">기준 연도</span> <input id="yearTextInput" placeholder="'+year+'" value="'+year+'"></input></div>'
    document.querySelector('.yearInput').innerHTML += ' <span class="bold" id="yearChange">이동!</span>'
    document.querySelector('#world-content').innerHTML += '<div class="worldname"></div>'
    document.querySelector('#world-content').innerHTML += '<div class="worldmap"></div>'
    for (var i = 0; i < 11; i++){
        if (i == 0) {
            document.querySelector('.worldmap').innerHTML += '<div class="worldhead"></div>'
            for (var j = 0; j < 11; j++){
                if (j == 0) {
                    document.querySelector('.worldhead').innerHTML += '<div class="worldoriginhead"></div>'
                } else {
                    document.querySelector('.worldhead').innerHTML += '<div class="worldcolhead">'+(j-1)+'</div>'
                }
            }
        } else {
            document.querySelector('.worldmap').innerHTML += '<div class="worldrow" id="row'+(i-1)+'"></div>'
            for (var j = 0; j < 11; j++){
                if (j == 0) {
                    document.querySelector('#row'+(i-1)).innerHTML += '<div class="worldrowhead">'+(i-1)+'</div>'
                } else {
                    document.querySelector('#row'+(i-1)).innerHTML += '<div onmouseover="hoverWorld(this)" class="worldcol"  id="col'+(j-1)+(i-1)+'">'+(j-1)+','+(i-1)+'</div>'
                }
            }
        }
    }
    document.querySelector('#character-content').innerHTML = '<div class="charactername"></div>'
    document.querySelector('#character-content').innerHTML += '<div class="characterlist"></div>'
    var cList = json.character.list
    if (!category) {
        var cCategory = json.character.category
        for (var j = 0; j < cCategory.length; j++) {
            document.querySelector('#character-content').innerHTML += '<div class="charactercategory" id="category'+j+'">'+cCategory[j]+'</div>'
            document.querySelector('#character-content').innerHTML += '<div class="characterlist" id="list'+j+'"></div>'
            for (var i = 0; i < cList.length; i++) {
                if (cList[i].category == cCategory[j]) {
                    if (year >= cList[i].lived[0] && year <= cList[i].lived[1]) {
                        document.querySelector('#list'+j).innerHTML += '<a href="./?page='+i+'"><div class="characteritem" onmouseover="hoverCharacter('+i+')"><div><img src="'+cList[i].avatar+'" class="cavatar"></div><div class="cname">'+cList[i].name+'</div><div class="csummary">'+cList[i].summary+'</div></div></a>'
                    }
                }
            }
        }
    } else {
        for (var i = 0; i < cList.length; i++) {
            if (cList[i].category == category) {
                if (year >= cList[i].lived[0] && year <= cList[i].lived[1]) {
                    document.querySelector('#list'+j).innerHTML += '<a href="./?page='+i+'"><div class="characteritem" onmouseover="hoverCharacter('+i+')"><div><img src="'+cList[i].avatar+'" class="cavatar"></div><div class="cname">'+cList[i].name+'</div><div class="csummary">'+cList[i].summary+'</div></div></a>'
                }
            }
        }
    }

    document.querySelector("#yearChange").addEventListener("click", (e) => {
        location.href = './?year='+document.querySelector("#yearTextInput").value
    })
}

function parseYourJSON(json) {
    document.querySelector("#title").innerHTML = '<a href="./">'+json.info.title+'</a>'
    document.querySelector("#subtitle").innerHTML = json.info.subTitle
    if (!page && !coord) {
        loadBackground(json)
    } else if (page) {
        loadBackground(json)
        document.querySelector('#wrapper').addEventListener("click", (e) => {
            location.href = './'
        })
        document.querySelector('#popup-content').style.display = 'block';
        var cList = json.character.list

        if (page.includes(',')) {

        } else { // i로 감
            document.querySelector('#popup-content').innerHTML = '<div class="characterprofile"></div>'
            document.querySelector('#popup-content').innerHTML += '<div class="relatedcharacterlist"></div>'

            document.querySelector('.characterprofile').innerHTML = '<h1 class="cprofilename">'+cList[page].name+'<h1>'
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofileavatar"><img src="'+cList[page].avatar+'"><div>'
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofilecategory"><span class="bold">이름 유래</span> '+cList[page].meaning+'<div>'
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofilecategory"><span class="bold">자</span> '+cList[page].courtesyname+'<div>'
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofilecategory"><span class="bold">호</span> '+cList[page].nickname+'<div>'
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofilecategory"><span class="bold">분류</span> '+cList[page].category+'<div>'
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofilesubcategory"><span class="bold">세부분류</span> '+cList[page].subCategory+'<div>'
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofilelived"><span class="bold">생몰년</span> '+cList[page].lived[0]+'~'+cList[page].lived[1]+'<div>'
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofilegoal"><div><span class="bold">사명</span> </div></div>'
            for (var i=0; i<(cList[page].goal.length); i++) {
                document.querySelector('.cprofilegoal').innerHTML += '<li>'+cList[page].goal[i]+'</li>'
            }
            var hideandseek = true
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofiletable"><div><span class="bold">연표</span> <span id="hideCronology">펼치기/접기</span></div><table class="cronology"><tr><th>연도</th><th>관직</th><th>사건</th></tr></table><div>'

            for (var i=0; i<(cList[page].lived[1] - cList[page].lived[0]); i++) {
                if ((cList[page].lived[0]+i) == json.info.mainYear) {
                    for (var j=0; j<12; j++){
                        var key = (cList[page].lived[0]+i)+'.'+(j+1)
                        var position = cList[page].positionCronology[key]
                        var event1 = cList[page].eventCronology[key]
                        if (!position) { position = '' }
                        if (!event1) { event1 = '' }
                        document.querySelector('.cronology').innerHTML += '<tr class="mainyear"><td>'+(key)+'</td><td>'+position+'</td><td>'+event1+'</td></tr>'
                    }
                } else {
                    var key = (cList[page].lived[0]+i)
                    var position = cList[page].positionCronology[key]
                    var event1 = cList[page].eventCronology[key]
                    if (!position) { position = '' }
                    if (!event1) { event1 = '' }
                    document.querySelector('.cronology').innerHTML += '<tr class="subyear"><td>'+(cList[page].lived[0]+i)+'</td><td>'+position+'</td><td>'+event1+'</td></tr>'
                }
            }
            document.querySelector('.characterprofile').innerHTML += '<h1>요약</h1>'
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofilesummary">'+cList[page].summary+'<div>'
            document.querySelector('.characterprofile').innerHTML += '<h1>설명</h1>'
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofiledescription">'+parseMd(cList[page].description)+'<div>'

            document.querySelector('#hideCronology').addEventListener("click", (e) => {
                var els = document.querySelectorAll('.subyear')
                if (hideandseek) {
                    for (var el=0; el<els.length; el++) {
                        els[el].style.display = "table-row";
                    }
                    hideandseek = false
                } else {
                    for (var el=0; el<els.length; el++) {
                        els[el].style.display = "none";
                    }
                    hideandseek = true
                }
            })

            document.querySelector('.characterprofile').innerHTML += '<h1>인간관계</h1>'

            var relatedCategory = Object.keys(json.character.list[page].relatedTo)
            for (var i = 0; i < relatedCategory.length; i++) {
                document.querySelector('.relatedcharacterlist').innerHTML += '<div class="relatedcharactercategory" id="relatedcategory'+i+'">'+relatedCategory[i]+'</div>'
                document.querySelector('.relatedcharacterlist').innerHTML += '<div class="relatedcharactercategorylist" id="relatedlist'+i+'"></div>'
                var relatedCategorylist = json.character.list[page].relatedTo[relatedCategory[i]]
                for (var j = 0; j < relatedCategorylist.length; j++) {
                    document.querySelector('#relatedlist'+i).innerHTML += '<a href="./?page='+relatedCategorylist[j]+'"><div class="characteritem" onmouseover="hoverCharacter('+relatedCategorylist[j]+')"><div><img src="'+cList[relatedCategorylist[j]].avatar+'" class="cavatar"></div><div class="cname">'+cList[relatedCategorylist[j]].name+'</div><div class="csummary">'+cList[relatedCategorylist[j]].summary+'</div></div></a>'
                }
            }
            //document.querySelector('.characterprofile').innerHTML +=
        }

    } else if (coord) {

    }
}

window.addEventListener("DOMContentLoaded", (e) => {
    parseYourJSON(json)
})