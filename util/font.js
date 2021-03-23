var MonoTypeWebFonts = {};
MonoTypeWebFonts.addEvent = function (e, n) {
	if ('undefined' != typeof MonoTypeWebFonts.loadFonts) MonoTypeWebFonts.addEvent(e, n);
	else {
		var o = this;
		setTimeout(function () {
			o.addEvent(e, n);
		}, 0);
	}
};
mti_loadScript(function () {
	if (window.addEventListener) {
		window.addEventListener(
			'load',
			function () {
				MonoTypeWebFonts.cleanup();
			},
			false
		);
	} else if (window.attachEvent) {
		window.attachEvent('onload', function () {
			MonoTypeWebFonts.cleanup();
		});
	}
	MonoTypeWebFonts.loadColo = function () {};
	MonoTypeWebFonts.cleanupExecuted = false;
	MonoTypeWebFonts.cleanup = function () {
		if (MonoTypeWebFonts.cleanupExecuted === true) {
			return;
		}
		MonoTypeWebFonts.cleanupExecuted = window['mti_element_cache'].length > 0;
		var className = document.documentElement.className;
		var MTIConfig = window['MTIConfig'] || { RemoveMTIClass: false };
		if (MTIConfig['RemoveMTIClass'] == true) {
			eval(
				(function (p, a, c, k, e, d) {
					e = function (c) {
						return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36));
					};
					if (!''.replace(/^/, String)) {
						while (c--) {
							d[e(c)] = k[c] || e(c);
						}
						k = [
							function (e) {
								return d[e];
							},
						];
						e = function () {
							return '\\w+';
						};
						c = 1;
					}
					while (c--) {
						if (k[c]) {
							p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
						}
					}
					return p;
				})(
					"8 l(2,n){n(2);2=2.D;r(2){l(2,n);2=2.A}}8 e(4){9(j.e){o j.e(4)}x{5 k=[];l(j.I,8(2){5 a,c=2.4,i;9(c){a=c.z(' ');p(i=0;i<a.f;i++){9(a[i]===4){k.F(2);J}}}});o k}}H(8(){5 3=e('m');5 u=E.K;5 h=u.B(),C=8(t){o h.G(t)>-1},b=(!(/R|T/i.q(h))&&/S\\s(\\d)/.q(h)),c=L;9((v.$1==6)||(v.$1==7)){c=Q}r(3.f>0){p(5 i=0;i<3.f;i++){5 w=3[i].4.z(' ');9(w.f==1&&!c){3[i].M('N')}x{3[i].4=3[i].4.y(/m/O,' ').y(/^\\s+|\\s+$/g,'')}}3=e('m')}},P);",
					56,
					56,
					'||node|mti_elements|className|var|||function|if|||||getElementsByClassName|length||ua||document|results|walkTheDOM|mti_font_element|func|return|for|test|while||||RegExp|classList|else|replace|split|nextSibling|toLowerCase|is|firstChild|navigator|push|indexOf|setTimeout|body|break|userAgent|false|removeAttribute|class|ig|40000|true|opera|msie|webtv'.split(
						'|'
					),
					0,
					{}
				)
			);
		}
		className = className;
		if (!document.getElementById('MonoTypeFontApiFontTracker')) {
			eval(
				(function (p, a, c, k, e, d) {
					e = function (c) {
						return c.toString(36);
					};
					if (!''.replace(/^/, String)) {
						while (c--) {
							d[e(c)] = k[c] || e(c);
						}
						k = [
							function (e) {
								return d[e];
							},
						];
						e = function () {
							return '\\w+';
						};
						c = 1;
					}
					while (c--) {
						if (k[c]) {
							p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
						}
					}
					return p;
				})(
					"5 3=\"6://j.i.z/t/1.7\";a(k.l.h=='8:'){3=3.g(/6:/,'8:')}5 b=9.d('e')[0];5 2=9.v('w');a(2){2.4('y','u');2.4('s','o/7');2.4('q','r');2.4('f',3+\"?p=x&n=m\");b.c(2)}",
					36,
					36,
					'||cssEle|fontTrackingUrl|setAttribute|var|http|css|https|document|if|head|appendChild|getElementsByTagName|HEAD|href|replace|protocol|fonts|fast|window|location|848aa82b-4971-40a6-a954-b55ee736c790|projectid|text|apiType|rel|stylesheet|type||MonoTypeFontApiFontTracker|createElement|LINK|js|id|net'.split(
						'|'
					),
					0,
					{}
				)
			);
		}
		window['mti_element_cache'] = [];
	};
	MonoTypeWebFonts._fontActiveEventList = [];
	MonoTypeWebFonts._fontLoadingEventList = [];
	MonoTypeWebFonts._activeEventList = [];
	MonoTypeWebFonts._inActiveEventList = [];
	MonoTypeWebFonts.addEvent = function (eventName, callbackFunction) {
		if (eventName.toLowerCase() == 'fontactive') {
			MonoTypeWebFonts._fontActiveEventList.push(callbackFunction);
		} else if (eventName.toLowerCase() == 'fontloading') {
			MonoTypeWebFonts._fontLoadingEventList.push(callbackFunction);
		} else if (eventName.toLowerCase() == 'inactive') {
			MonoTypeWebFonts._inActiveEventList.push(callbackFunction);
		} else if (eventName.toLowerCase() == 'active') {
			MonoTypeWebFonts._activeEventList.push(callbackFunction);
		}
	};
	MonoTypeWebFonts.loadFonts = function () {
		MonoTypeWebFonts.load({
			monotype: {
				efg: false,
				reqSub: false,
				enableOtf: false,
				otfJsParentUrl: 'https://fast.fonts.net/jsapi/otjs/',
				pfL: [
					{
						fontfamily: 'Avenir LT W01_45 Book1475508',
						contentIds: { WOFF: '65d75eb0-2601-4da5-a9a4-9ee67a470a59', WOFF2: '065a6b14-b2cc-446e-9428-271c570df0d9' },
						enableSubsetting: false,
						enableOtf: false,
					},
					{
						fontfamily: 'Avenir LT W01_65 Medium1475532',
						contentIds: { WOFF: 'c9aeeabd-dd65-491d-b4be-3e0db9ae47a0', WOFF2: '17b90ef5-b63f-457b-a981-503bb7afe3c0' },
						enableSubsetting: false,
						enableOtf: false,
					},
					{
						fontfamily: 'Avenir LT W01_85 Heavy1475544',
						contentIds: { WOFF: '61bd362e-7162-46bd-b67e-28f366c4afbe', WOFF2: 'd513e15e-8f35-4129-ad05-481815e52625' },
						enableSubsetting: false,
						enableOtf: false,
					},
				],
				selectorFontMap: {},
				ck: 'd44f19a684109620e484147fa790e81859e92aaaea3d337f84586d5df8888fe5455f55e0f83ed0be044ddfaa95e824a4b1318d5b552aaa24a44025e9',
				fcURL: 'http://fast.fonts.net/dv2/',
				env: '',
				projectId: '848aa82b-4971-40a6-a954-b55ee736c790',
				EOD: null,
			},
			fontloading: function (fontFamily, fontDescription) {
				for (var i = 0; i < MonoTypeWebFonts._fontLoadingEventList.length; i++) {
					MonoTypeWebFonts._fontLoadingEventList[i].call(MonoTypeWebFonts, fontFamily, fontDescription);
				}
			},
			fontactive: function (fontFamily, fontDescription) {
				for (var i = 0; i < MonoTypeWebFonts._fontActiveEventList.length; i++) {
					MonoTypeWebFonts._fontActiveEventList[i].call(MonoTypeWebFonts, fontFamily, fontDescription);
				}
			},
			inactive: function () {
				MonoTypeWebFonts.cleanup();
				for (var i = 0; i < MonoTypeWebFonts._inActiveEventList.length; i++) {
					MonoTypeWebFonts._inActiveEventList[i].call(MonoTypeWebFonts);
				}
			},
			active: function () {
				MonoTypeWebFonts.cleanup();
				for (var i = 0; i < MonoTypeWebFonts._activeEventList.length; i++) {
					MonoTypeWebFonts._activeEventList[i].call(MonoTypeWebFonts);
				}
			},
		});
	};
	try {
		MonoTypeWebFonts.loadFonts();
	} catch (e) {}
	setTimeout(function () {
		MonoTypeWebFonts.cleanup();
	}, 40000);
});
function mti_loadScript(a) {
	'undefined' != typeof MTIConfig && 1 == MTIConfig.EnableCustomFOUTHandler && (document.documentElement.style.visibility = 'hidden');
	var mti_coreJsURL = 'https://fast.fonts.net/jsapi/core/mt.js';
	var env = '';
	var UA = navigator.userAgent.toLowerCase(),
		isIE8 = -1 != UA.indexOf('msie') ? parseInt(UA.split('msie')[1]) : !1;
	isIE8 && (mti_coreJsURL = 'https://fast.fonts.net/jsapi/core/mti.js');
	'undefined' != typeof MTIConfig &&
		1 == MTIConfig.EnableDSForAllFonts &&
		(mti_coreJsURL = isIE8 ? 'https://fast.fonts.net/jsapi/core/mti_cjk.js' : 'https://fast.fonts.net/jsapi/core/mt_cjk.js');
	if ('undefined' != typeof MTIConfig && 'undefined' != typeof MTIConfig.version && '' != MTIConfig.version) {
		var fileName = mti_coreJsURL.split('/').pop();
		mti_coreJsURL = 'https://fast.fonts.net/jsapi/core/' + MTIConfig.version + '/' + fileName;
	}
	var b = document.createElement('script');
	(b.type = 'text/javascript'),
		b.readyState
			? (b.onreadystatechange = function () {
					('loaded' == b.readyState || 'complete' == b.readyState) && ((b.onreadystatechange = null), a());
			  })
			: (b.onload = function () {
					a();
			  }),
		(b.src = mti_coreJsURL),
		document.getElementsByTagName('head')[0].appendChild(b);
}
