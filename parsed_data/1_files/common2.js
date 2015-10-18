var normal_ok = 1;


function ajaxFunction() {
	var ajaxRequest;
	try
	{
		ajaxRequest=new XMLHttpRequest();
	}catch (e){
		try
		{
			ajaxRequest=new ActiveXObject("Msxml2.XMLHTTP");
		}catch (e){
			try
			{
				ajaxRequest=new ActiveXObject("Microsoft.XMLHTTP");
			}catch (e){
				// browser does not support
				//alert("Browser does not support Ajax requests!");
				return false;
			}
		}
	}
	return ajaxRequest;
}

//Draw Clock
var time_cnt=0;
var curr_tstamp=0;
function wr_hours(offset)
{
    offset=offset*1000;
    var tm=new Date(offset+time_cnt*1000);
    var z_offset=tm.getTimezoneOffset()+360;
    var time=new Date(offset+time_cnt*1000+z_offset*60000);
	curr_tstamp=time;
	var time_year=time.getFullYear();
	var time_month=time.getMonth()+1;
	var time_day=time.getDate();
	var time_sec=time.getSeconds();
	var time_min=time.getMinutes();
	var time_hours=time.getHours();
	var time_wr=((time_day<10)?"0":"")+time_day;
	time_wr+=".";
	time_wr+=((time_month<10)?"0":"")+time_month;
	time_wr+=".";
	time_wr+=time_year;
	time_wr+=" ";
	time_wr+=((time_hours<10)?"0":"")+time_hours;
	time_wr+=":";
	time_wr+=((time_min<10)?"0":"")+time_min;
	time_wr+=":";
	time_wr+=((time_sec<10)?"0":"")+time_sec;
	document.getElementById("hours").innerHTML=time_wr;
	time_cnt++;
}

function wr_hours2(offset, fname)
{
    offset=offset*1000;
    var tm=new Date(offset+time_cnt*1000);
    var z_offset=tm.getTimezoneOffset()+360;
    var time=new Date(offset+time_cnt*1000+z_offset*60000);
	curr_tstamp=time;
	var time_year=time.getFullYear();
	var time_month=time.getMonth()+1;
	var time_day=time.getDate();
	var time_sec=time.getSeconds();
	var time_min=time.getMinutes();
	var time_hours=time.getHours();
	var time_wr=((time_day<10)?"0":"")+time_day;
	time_wr+=".";
	time_wr+=((time_month<10)?"0":"")+time_month;
	time_wr+=".";
	time_wr+=time_year;
	time_wr+=" ";
	time_wr+=((time_hours<10)?"0":"")+time_hours;
	time_wr+=":";
	time_wr+=((time_min<10)?"0":"")+time_min;
	time_wr+=":";
	time_wr+=((time_sec<10)?"0":"")+time_sec;
	document.getElementById(fname).innerHTML=time_wr;
	time_cnt++;
}

//Reload Page
function rload(url)
{
	if(!document.getElementById("refresh").checked) return;
	window.location=url;
}


	function rc(el, match, sel, forced)
	{
		obj=document.forms['BetLine'].elements[el.name];
		for(var i=0; i<obj.length; i++)
			if (obj[i].value!=el.value) obj[i].c=false;
		if(el.c || (typeof(el.c)=="undefined" && forced)) el.c=el.checked=false;
		else el.c=true;
		document.cookie="b"+match+"="+((!el.c)?"0":sel)+";";
		if (typeof upd_basket == 'function') upd_basket(document.forms['BetLine'].currpage.value);
	}

	function ShowAddons(id, cnt)
	{
		if(cnt<=0 || cnt>120 || cnt==undefined) cnt=120;
		for(i=0; i<=cnt; i++)
		{
		    var addon=document.getElementById('r'+id+'_'+i);
		    if(!addon) continue;
			if(addon.style.display=='none')
			{
			     addon.style.display='';
			     document.getElementById('t'+id+'_1').innerHTML=hide_addon;
			     document.getElementById('t'+id+'_2').innerHTML=hide_addon;
			     document.cookie="t"+id+"=0;";
			 }else{
			     addon.style.display='none';
			     document.getElementById('t'+id+'_1').innerHTML=show_addon;
			     document.getElementById('t'+id+'_2').innerHTML=show_addon;
			     document.cookie="t"+id+"=1;";
			 }
		}
	}

//AJAX pool
function AJAXInteraction(url, callback)
{

    var req = init();
    req.onreadystatechange = processRequest;

    function init()
    {
      if (window.XMLHttpRequest)
      {
        return new XMLHttpRequest();
      } else if (window.ActiveXObject)  {
        return new ActiveXObject("Microsoft.XMLHTTP");
      }
    }

    function processRequest()
    {
      if (req.readyState == 4)
      {
        if (req.status == 200)
        {
          if (callback) callback(req.responseText);
        }
      }
    }

    this.doGet = function()
    {
      req.open("GET", url, true);
      req.send(null);
    }

    this.doPost = function(body)
    {
      req.open("POST", url, true);
      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      req.send(body);
    }
}

//Get Odd
function getBBCodeOdd(val)
{
	var ai=new AJAXInteraction("ajax_index.php?page=getBBOdd&event="+val,
		function(str)
		{
			if(str.indexOf('.')!=-1 && str.indexOf(':')!=-1)
			{
				var id=str.substring(0, str.indexOf(':'));
				var koef=str.substring(str.indexOf(':')+1, str.indexOf(';'));
				var lid=str.substring(str.indexOf(';')+1, str.lenth);
				if(koef.indexOf('n/a')==-1)
					document.getElementById('bbodd'+id).innerHTML='<a href="index.php?page=line&addons=1&action=2&id='+lid+'" target=_blank>'+koef+'</a>';
			}
		}
	);
  	ai.doPost();
}

function openvideo(id)
{
/*	open("index.php?page=video&id="+id, "displayVideo",
             "width=750,height=600,status=no,toolbar=no,menubar=no,resizable=no,directories=no,location=no");*/
  var attr="width=750,height=600,menubar=0,toolbar=0,directories=0,status=1,location=0,resizable=0,scrollbars=0";
  var new_wind=window.open("index.php?page=video&id="+id, "", attr);
}


function openmt(id, sport, live, lang) {
  if (sport == 'undefined') sport = 0;
    var width = 559;
    var height = 781;
    switch (sport) {
        case 0:
            width = 648;
            height = 455;
            break;
        case 1:
            width = 648;
            height = 475;
            break;
        case 2:
            width = 815;
            height = 397;
            break;
        default:
            width = 648;
            height = 455;
            break;
    }
 if (live) {
     var attr="width="+width+",height="+height+",menubar=0,toolbar=0,directories=0,status=1,location=0,resizable=0,scrollbars=0";
     var new_wind=window.open("index.php?page=mt&id="+id+"&sport="+sport, "", attr);
 } else {
     var attr="width=1020,height=905,menubar=0,toolbar=0,directories=0,status=1,location=0,resizable=0,scrollbars=0";
     var new_wind=window.open("https://stats.betradar.com/s4/?clientid=295&language="+lang+"&matchid="+id, "", attr);
 }
}



/******** JSON Class - for old browsers ********/
if (typeof JSON !== 'object') {
    JSON = {};
}
(function () {
    'use strict';
    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }
    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function (key) {
            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate()) + 'T' +
                    f(this.getUTCHours()) + ':' +
                    f(this.getUTCMinutes()) + ':' +
                    f(this.getUTCSeconds()) + 'Z'
                : null;
        };
        String.prototype.toJSON =
            Number.prototype.toJSON =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = { // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }
    function str(key, holder) {
// Produce a string from holder[key].
        var i, // The loop counter.
            k, // The member key.
            v, // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];
// If the value has a toJSON method, call it to obtain a replacement value.
        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }
// What happens next depends on the value's type.
        switch (typeof value) {
        case 'string':
            return quote(value);
        case 'number':
// JSON numbers must be finite. Encode non-finite numbers as null.
            return isFinite(value) ? String(value) : 'null';
        case 'boolean':
        case 'null':
            return String(value);
        case 'object':
            if (!value) {
                return 'null';
            }
// Make an array to hold the partial results of stringifying this object value.
            gap += indent;
            partial = [];
// Is the value an array?
            if (Object.prototype.toString.apply(value) === '[object Array]') {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }
                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }
// If the replacer is an array, use it to select the members to be stringified.
            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {
// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }
            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }
// If the JSON object does not yet have a stringify method, give it one.
    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }
// If the space parameter is a string, it will be used as the indent string.
            } else if (typeof space === 'string') {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
            return str('', {'': value});
        };
    }
// If the JSON object does not yet have a parse method, give it one.
    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }
// If the text is not JSON parseable, then a SyntaxError is thrown.
            throw new SyntaxError('JSON.parse');
        };
    }
}());