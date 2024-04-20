var MISSKEYID

const token = localStorage.getItem("token");
const signedusername = localStorage.getItem("username");
const sessionId = localStorage.getItem("sessionId");
const signedHost = localStorage.getItem("signinHost");

var cssRoot = document.querySelector(':root');
cssRoot.style.setProperty('--accent', THEMECOLOR)
cssRoot.style.setProperty('--darkaccent', 'color-mix(in srgb, var(--accent) 70%, #470046)')
cssRoot.style.setProperty('--lightaccent', 'color-mix(in srgb, var(--accent) 70%, #fbffbb)')

var isLogin = false;
if (sessionId && signedHost) {
    isLogin = true;
}

var json
if (localStorage.getItem('json')) json = JSON.parse(localStorage.getItem('json'))

//마크다운 파싱
function parseMd(md){

    md = "\n"+md+"\n\n"
    var md0 = md;
  
    //ul
    md = md.replace(/^\s*\n\*\s/gm, '<ul>\n* ');
    md = md.replace(/\*\s([^\*]+)\n\n/gm, '* $1\n</ul>\n\n');
    md = md.replace(/^\*\s(.+)/gm, '<li>$1</li>');
    while (md.includes('  * ')) {
        md = md.replace(/\<\/li\>\n\s\s\*\s/gm, '</li>\n<ul>\n  * ')
        md = md.replace(/\s\s\*\s(.+)\n\<\/ul\>/gm, '  \* $1\n</ul>\n</ul>')
        md = md.replace(/\s\s\*\s(.+)\n\<li\>/gm, '  \* $1\n</ul>\n<li>')
        md = md.replace(/\n\s\s\*\s(.+)/gm, '<li>$1</li>');
        md = md.replace(/\s\s\*\s/gm, '* ')
    }

    //ul
    md = md.replace(/^\s*\n\-\s/gm, '<ul>\n- ');
    md = md.replace(/\-\s([^\-]+)\n\n/gm, '* $1\n</ul>\n\n');
    md = md.replace(/^\-\s(.+)/gm, '<li>$1</li>');
    while (md.includes('  - ')) {
        md = md.replace(/\<\/li\>\n\s\s\-\s/gm, '</li>\n<ul>\n  - ')
        md = md.replace(/\s\s\-\s(.+)\n\<\/ul\>/gm, '  \- $1\n</ul>\n</ul>')
        md = md.replace(/\s\s\-\s(.+)\n\<li\>/gm, '  \- $1\n</ul>\n<li>')
        md = md.replace(/\n\s\s\-\s(.+)/gm, '<li>$1</li>');
        md = md.replace(/\s\s\-\s/gm, '- ')
    }
    md = md.replace(/([^\>]+)\n\<li\>/gm, '$1\n<ul>\n<li>')
    
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
    md = md.replace(/\n[\#]{6}\s(.+)/g, '<h6>$1</h6>');
    md = md.replace(/\n[\#]{5}\s(.+)/g, '<h5>$1</h5>');
    md = md.replace(/\n[\#]{4}\s(.+)/g, '<h4>$1</h4>');
    md = md.replace(/\n[\#]{3}\s(.+)/g, '<h3>$1</h3>');
    md = md.replace(/\n[\#]{2}\s([\s\S]+)[ー]{3}/g, '<div class="pflex">\n\#\# $1ーーー</div>');
    md = md.replace(/\n[\#]{2}(.+)[\:]{2}(.+)\n([^ー]+)[ー]{3}/g, '<div class="pgroup $2"><h2 class="pgroup-title">$1</h2><div class="pgroup-content">$3</div></div>');
    md = md.replace(/\n[\#]{2}(.+)\n([^ー]+)[ー]{3}/g, '<div class="pgroup"><h2 class="pgroup-title">$1</h2><div class="pgroup-content">$2</div></div>');
    md = md.replace(/\n[\#]{2}\s(.+)/g, '<h2>$1</h2>');
    md = md.replace(/\n[\#]{1}\s(.+)/g, '</div></div><div class="item_wrap"><div class="item"><h1 class="h1">$1</h1>');

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
var category = qs.category
var note = qs.note
var mode = qs.mode

if (page == 'signin') {
    if (!isLogin) {
        let uuid = self.crypto.randomUUID();
        localStorage.setItem("sessionId", uuid);
        var signinUrl = 'https://'+MISSKEYHOST+'/miauth/'+uuid+'?name=CabinetKey&callback='+encodeURIComponent(location.href.split('?')[0])+'%3Fpage%3Dcallback&permission=write:account,read:account,write:drive,write:notes,write:pages'
        location.href = signinUrl;
    }
} else if (page == 'callback') {
    if (sessionId) {
        var postUrl = 'https://'+MISSKEYHOST+'/api/miauth/'+sessionId+'/check'
        var postParam = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({})
        }
        fetch(postUrl, postParam)
        .then((tokenData) => {return tokenData.json()})
        .then((tokenRes) => {
            localStorage.setItem("token", tokenRes.token)
            var findInfoUrl = 'https://'+MISSKEYHOST+'/api/notes/search'
            var findInfoParam = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    query: 'CabinetKey_Setup',
                    userId: tokenRes.user.id,
                })
            }
            fetch(findInfoUrl, findInfoParam)
            .then((infoData) => {return infoData.json()})
            .then((infoRes) => {
                if (infoRes.length == 0) {
                    var createPageUrl = 'https://'+MISSKEYHOST+'/api/pages/create'
                    var createPageParam = {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify({
                            i: tokenRes.token,
                            title: 'CabinetKey.json',
                            name: 'CabinetKey.json',
                            summary: 'CabinetKey.json',
                            variables: [],
                            script: '',
                            content: [{
                                text: '```\n{"info":{"title":"","subTitle":"","summary":"","description":"","mainYear":"","map":"","hashtag":[""]},"character":{"category":[""],"list":[{"avatar":"","name":"","meaning":"","courtesyName":"","nickname":"","lived":[0,0],"category":"","subCategory":"","eventChronology":{"0.0":""},"positionChronology":{"0.0":""},"relatedTo":{"분류1":[0],"분류2":[0]},"goal":["",""],"themeSong":[0],"summary":"","description":"","secret":"","hashtag":""}]},"world":{"x,y":{"name":"","image":"","summary":"","description":"","eventChronology":{"0.0":""},"relatedTo":{"분류1":[0]}}},"themeSong":[{"embed":"","title":"","artist":"","character":0,"summary":"","description":"","lyrics":""}]}\n```',
                                type: 'text'
                            }]
                        })
                    }
                    fetch(createPageUrl, createPageParam)
                    .then((pageData) => {return pageData.json()})
                    .then((pageRes) => {
                        var createNoteUrl = 'https://'+MISSKEYHOST+'/api/notes/create'
                        var createNoteParam = {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                            },
                            body: JSON.stringify({
                                i: tokenRes.token,
                                visibility: 'home',
                                text: '`' + pageRes.id + '` #CabinetKey_Setup'
                            })
                        }
                        fetch(createNoteUrl, createNoteParam)
                        .then((noteData) => {return noteData.json()})
                        .then((noteRes) => {
                            location.href = location.href.split('?')[0]
                        })
                    })
                } else if (infoRes.length > 0) {
                    isLogin = true
                }
            })
        })
    }
} 

function hoverWorld(e) {
    if (json.world[e.innerText]) document.querySelector('.worldname').innerHTML = '[' + e.innerText + ']' + json.world[e.innerText].name
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
                    document.querySelector('#row'+(i-1)).innerHTML += '<a href="./?page='+(j-1)+','+(i-1)+'" onmouseover="hoverWorld(this)" class="worldcol" style="background-image: url('+json.info.map+')" id="col'+(j-1)+(i-1)+'">'+(j-1)+','+(i-1)+'</a>'
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
            document.querySelector('#character-content').innerHTML += '<div class="charactercategory" id="category'+j+'"><a href="./?category='+cCategory+'">'+cCategory[j]+'</a></div>'
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
                    document.querySelector('.characterlist').innerHTML += '<a href="./?page='+i+'"><div class="characteritem" onmouseover="hoverCharacter('+i+')"><div><img src="'+cList[i].avatar+'" class="cavatar"></div><div class="cname">'+cList[i].name+'</div><div class="csummary">'+cList[i].summary+'</div></div></a>'
                }
            }
        }
    }

    document.querySelector("#yearChange").addEventListener("click", (e) => {
        location.href = './?year='+document.querySelector("#yearTextInput").value
    })
}

async function parseYourJSON(json) {
    if (!year) {
        year = json.info.startYear
    }
    document.querySelector("#title").innerHTML = '<a href="./">'+json.info.title+'</a>'
    document.querySelector("#subtitle").innerHTML = json.info.subTitle
    if (!page && !note) {
        loadBackground(json)
    } else if (page == 'info') {
        loadBackground(json)
        document.querySelector('#wrapper').addEventListener("click", (e) => {
            location.href = './'
        })
        document.querySelector('#popup-content').style.display = 'block'
        document.querySelector('#popup-content').innerHTML = '<div class="worldinfo"></div>'

        document.querySelector('.worldinfo').innerHTML = '<h1 class="winfotitle">'+json.info.title+'<h1>'
        document.querySelector('.worldinfo').innerHTML += '<div class="winfosubtitle">'+json.info.subTitle+'<div>'
        document.querySelector('.worldinfo').innerHTML += '<h1>요약</h1>'
        document.querySelector('.worldinfo').innerHTML += '<div class="winfosummary">'+json.info.summary+'<div>'
        document.querySelector('.worldinfo').innerHTML += '<h1>설명</h1>'
        document.querySelector('.worldinfo').innerHTML += '<div class="winfodescription">'+json.info.description+'<div>'
    } else if (page == 'collection') {
        loadBackground(json)
        document.querySelector('#wrapper').addEventListener("click", (e) => {
            location.href = './'
        })
        document.querySelector('#popup-content').style.display = 'block'
        document.querySelector('#popup-content').innerHTML = '<div class="collection"></div>'
        
        document.querySelector('.collection').innerHTML += '<h1 class="collectiontitle">작품모음<h1>'
        document.querySelector('.collection').innerHTML += '<div class="collectionlist"><div>'

        var findNotesUrl = 'https://'+MISSKEYHOST+'/api/notes/search'
        var findNotesParam = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                query: '#'+json.info.hashtag.join(' #')+' #창작',
                userId: MISSKEYID,
                limit: 100
            })
        }
        fetch(findNotesUrl, findNotesParam)
        .then((notesData) => {return notesData.json()})
        .then((notesRes) => {
            for (var i = 0; i<notesRes.length; i++){
                if (notesRes[i].files.length == 0) {
                    document.querySelector('.collectionlist').innerHTML += '<div class="collectionel"><a href="./?note='+notesRes[i].id+'"><div class="overflowhidden" id="collection'+i+'"></div></a></div>'
                    if (notesRes[i].cw) document.querySelector('#collection'+i).innerHTML = '<h1>'+notesRes[i].cw+'</h1>'
                    document.querySelector('#collection'+i).innerHTML += parseMd(notesRes[i].text)
                } else {
                    document.querySelector('.collectionlist').innerHTML += '<div class="collectionel"><a href="./?note='+notesRes[i].id+'"><img src="'+notesRes[i].files[0].url+'"></a></div>'
                }
            }
        })
    } else if (page) {
        loadBackground(json)
        document.querySelector('#wrapper').addEventListener("click", (e) => {
            location.href = './'
        })
        document.querySelector('#popup-content').style.display = 'block'
        var cList = json.character.list

        if (page.includes(',')) {
            var worldpage = json.world[page]
            document.querySelector('#popup-content').innerHTML = '<div class="worldlocation"></div>'
            document.querySelector('#popup-content').innerHTML += '<div class="relatedcharacterlist"></div>'

            document.querySelector('.worldlocation').innerHTML = '<h1 class="wlocationname">'+worldpage.name+'<h1>'
            document.querySelector('.worldlocation').innerHTML += '<div class="wlocationimage"><img src="'+worldpage.image+'"><div>'
            document.querySelector('.worldlocation').innerHTML += '<div class="cprofiletable"><div><span class="bold">연표</span></div><table class="chronology"><tr><th>연도</th><th>사건</th></tr></table><div>'

            for (var i=0; i<Object.keys(worldpage.eventChronology).length; i++) {
                var key = Object.keys(worldpage.eventChronology)[i]
                var event1 = worldpage.eventChronology[key]
                document.querySelector('.chronology').innerHTML += '<tr><td>'+key+'</td><td>'+event1+'</td></tr>'
            }

            document.querySelector('.worldlocation').innerHTML += '<h1>요약</h1>'
            document.querySelector('.worldlocation').innerHTML += '<div class="cprofilesummary">'+worldpage.summary+'<div>'
            document.querySelector('.worldlocation').innerHTML += '<h1>설명</h1>'
            document.querySelector('.worldlocation').innerHTML += '<div class="cprofiledescription">'+parseMd(worldpage.description)+'<div>'

            document.querySelector('.worldlocation').innerHTML += '<h1>연관 정보</h1>'

            var relatedCategory = Object.keys(worldpage.relatedTo)
            for (var i = 0; i < relatedCategory.length; i++) {
                document.querySelector('.relatedcharacterlist').innerHTML += '<div class="relatedcharactercategory" id="relatedcategory'+i+'">'+relatedCategory[i]+'</div>'
                document.querySelector('.relatedcharacterlist').innerHTML += '<div class="relatedcharactercategorylist" id="relatedlist'+i+'"></div>'
                var relatedCategorylist = worldpage.relatedTo[relatedCategory[i]]
                for (var j = 0; j < relatedCategorylist.length; j++) {
                    document.querySelector('#relatedlist'+i).innerHTML += '<a href="./?page='+relatedCategorylist[j]+'"><div class="characteritem" onmouseover="hoverCharacter('+relatedCategorylist[j]+')"><div><img src="'+cList[relatedCategorylist[j]].avatar+'" class="cavatar"></div><div class="cname">'+cList[relatedCategorylist[j]].name+'</div><div class="csummary">'+cList[relatedCategorylist[j]].summary+'</div></div></a>'
                }
            }
        } else { // i로 감
            document.querySelector('#popup-content').innerHTML = '<div class="characterprofile"></div>'
            document.querySelector('#popup-content').innerHTML += '<div class="relatedcharacterlist"></div>'

            document.querySelector('.characterprofile').innerHTML = '<h1 class="cprofilename">'+cList[page].name+'<h1>'
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofileavatar"><img src="'+cList[page].avatar+'"><div>'
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofilecategory"><span class="bold">이름 유래</span> '+cList[page].meaning+'<div>'
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofilecategory"><span class="bold">자</span> '+cList[page].courtesyName+'<div>'
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofilecategory"><span class="bold">호</span> '+cList[page].nickname+'<div>'
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofilecategory"><span class="bold">분류</span> <a href="./?category='+cList[page].category+'">'+cList[page].category+'</a><div>'
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofilesubcategory"><span class="bold">세부분류</span> '+cList[page].subCategory+'<div>'
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofilelived"><span class="bold">생몰년</span> '+cList[page].lived[0]+'~'+cList[page].lived[1]+'<div>'
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofilegoal"><div><span class="bold">사명</span> </div></div>'
            for (var i=0; i<(cList[page].goal.length); i++) {
                document.querySelector('.cprofilegoal').innerHTML += '<li>'+cList[page].goal[i]+'</li>'
            }
            var hideandseek = true
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofiletable"><div><span class="bold">연표</span> <span id="hideChronology">펼치기/접기</span></div><table class="chronology"><tr><th>연도</th><th>관직</th><th>사건</th></tr></table><div>'

            for (var i=0; i<(cList[page].lived[1] - cList[page].lived[0]); i++) {
                if (json.info.mainYear.includes(cList[page].lived[0]+i)) {
                    for (var j=0; j<12; j++){
                        var key = (cList[page].lived[0]+i)+'.'+(j+1)
                        var position = cList[page].positionChronology[key]
                        var event1 = cList[page].eventChronology[key]
                        if (!position) { position = '' }
                        if (!event1) { event1 = '' }
                        document.querySelector('.chronology').innerHTML += '<tr class="mainyear"><td>'+(key)+'</td><td>'+position+'</td><td>'+event1+'</td></tr>'
                    }
                } else {
                    var key = (cList[page].lived[0]+i)
                    var position = cList[page].positionChronology[key]
                    var event1 = cList[page].eventChronology[key]
                    if (!position) { position = '' }
                    if (!event1) { event1 = '' }
                    document.querySelector('.chronology').innerHTML += '<tr class="subyear"><td>'+(cList[page].lived[0]+i)+'</td><td>'+position+'</td><td>'+event1+'</td></tr>'
                }
            }
            document.querySelector('.characterprofile').innerHTML += '<h1>요약</h1>'
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofilesummary">'+cList[page].summary+'<div>'
            document.querySelector('.characterprofile').innerHTML += '<h1>설명</h1>'
            document.querySelector('.characterprofile').innerHTML += '<div class="cprofiledescription">'+parseMd(cList[page].description)+'<div>'

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

            document.querySelector('#hideChronology').addEventListener("click", (e) => {
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
        }
    } else if (note) {
        loadBackground(json)
        document.querySelector('#wrapper').addEventListener("click", (e) => {
            location.href = './'
        })
        document.querySelector('#popup-content').style.display = 'block'
        document.querySelector('#popup-content').innerHTML = '<div class="collection"></div>'
        
        document.querySelector('.collection').innerHTML += '<h1 class="collectiontitle">제목 없음<h1>'
        document.querySelector('.collection').innerHTML += '<div class="collectionnote"><div>'

        var findNotesUrl = 'https://'+MISSKEYHOST+'/api/notes/show'
        var findNotesParam = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                noteId: note,
            })
        }
        fetch(findNotesUrl, findNotesParam)
        .then((notesData) => {return notesData.json()})
        .then((notesRes) => {
            if (notesRes.cw) document.querySelector('.collectiontitle').innerText = notesRes.cw
            if (notesRes.files.length > 0) {
                for (var i = 0; i<notesRes.files.length; i++) {
                    document.querySelector('.collectionnote').innerHTML += '<img src="'+notesRes.files[i].url+'">'
                }
            }
            document.querySelector('.collectionnote').innerHTML = '<div class="createdAt">'+notesRes.createdAt+'</div>'
            document.querySelector('.collectionnote').innerHTML += '<div class="createdAt"><span class="bold"><a href="https://'+MISSKEYHOST+'/notes/'+notesRes.id+'">리모트에서 보기</a></span></div>'
            document.querySelector('.collectionnote').innerHTML += '<div class="noteContent"'+parseMd(notesRes.text)+'</div><hr>'
            document.querySelector('.collectionnote').innerHTML += '<div class="reactionList"></div>'
            for (var i = 0; i<Object.keys(notesRes.reactions).length; i++) {
                var emojiName = Object.keys(notesRes.reactions)[i]
                if (emojiName.includes('@')) {
                    var emojiHost
                    if (emojiName.split('@')[1] = '.:') {
                        emojiHost = MISSKEYHOST
                    } else {
                        emojiHost = emojiName.split('@')[1].split(':')[0]
                    }
                    var emojiFetchUrl = 'https://'+emojiHost+'/api/emoji?name='+emojiName.split('@')[0].split(':')[1]
                    var emojiFetchParam = {
                        method: 'GET',
                        headers: {
                            'content-type': 'application/json',
                        },
                    }
                    fetch(emojiFetchUrl, emojiFetchParam)
                    .then((emojiData) => {return emojiData.json()})
                    .then((emojiRes) => {
                        document.querySelector('.reactionList').innerHTML += '<span class="bold"><img src="'+emojiRes.url+'" class="emoji"> '+notesRes.reactions[emojiName]+'</span> '
                    })
                } else {
                    document.querySelector('.reactionList').innerHTML += '<span class="bold"><span class="emoji">'+emojiName+'</span> '+notesRes.reactions[emojiName]+'</span>'
                }
            }
            document.querySelector('.collectionnote').innerHTML += '<div class="replyList"></div>'
            var findReplysUrl = 'https://'+MISSKEYHOST+'/api/notes/replies'
            var findReplysParam = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    noteId: note,
                })
            }
            fetch(findReplysUrl, findReplysParam)
            .then((replyData) => {return replyData.json()})
            .then((replyRes) => {
                for (var i = 0; i<Object.keys(notesRes.reactions).length; i++) {
                    document.querySelector('.replyList').innerHTML += '<hr><div class="replyel" id="replyid'+i+'"></div>'
                    document.querySelector('#replyid'+i).innerHTML += '<div>'+replyRes[i].text+'</div>'
                    document.querySelector('#replyid'+i).innerHTML += '<div class="replyProfile"><span> ー by</span><img class="emoji" src="'+replyRes[i].user.avatarUrl+'"><span>'+replyRes[i].user.name.replace(/\:([^\:\s]+)\:/g, '').replace(/\s\s/g, ' ')+'</span><span class="bold" style="font-size: 0.8em;"><a href="https://'+MISSKEYHOST+'/notes/'+replyRes[i].id+'">리모트에서 보기</a></span></div>'
                }
            })
            document.querySelector('.collectionnote').innerHTML += ''
        })
    }
}

async function findJSON() {
    var findUserIdUrl = 'https://'+MISSKEYHOST+'/api/users/search-by-username-and-host'
    var findUserIdParam = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body:  JSON.stringify({
            username: MISSKEYUSER,
            host: MISSKEYHOST,
        })
    }
    const userData = await fetch(findUserIdUrl, findUserIdParam)
    const userRes = await userData.json()
    if (userRes.length > 0) {
        MISSKEYID = userRes[0].id

        var findInfoUrl = 'https://'+MISSKEYHOST+'/api/notes/search'
        var findInfoParam = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                query: 'CabinetKey_Setup',
                userId: MISSKEYID,
            })
        }
        const infoData = await fetch(findInfoUrl, findInfoParam)
        const infoRes = await infoData.json()

        if (infoRes.length == 1) {
            const MISSKEYSETUPID = infoRes[0].id
            const MISSKEYJSONID = infoRes[0].text.split('`')[1]
            var blogInfoUrl = 'https://'+MISSKEYHOST+'/api/pages/show'
            var blogInfoParam = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    pageId: MISSKEYJSONID
                })
            }
            
            const pageData = await fetch(blogInfoUrl, blogInfoParam)
            const pageRes = await pageData.json()
            if (!pageRes.content) {
                json = {}
            } else {
                json = JSON.parse(pageRes.content[0].text.split('```')[1])
                localStorage.setItem('json', JSON.stringify(json))
            }
        } else if (infoRes.length > 1) {
            alert('셋업 노트가 2개 이상 감지되었습니다. 확인 후 유효하지 않은 노트를 삭제해 주세요.')
            json = {}
        } else {
            json = {}
        }
    } else {
        json = {}
    }
    return json
}

async function updateJSON() { 
    const json = await findJSON()
    await parseYourJSON(json)
}

if (json) {
    parseYourJSON(json)
} else {
    updateJSON()
}