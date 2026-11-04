(function dartProgram(){function copyProperties(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
b[q]=a[q]}}function mixinPropertiesHard(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
if(!b.hasOwnProperty(q)){b[q]=a[q]}}}function mixinPropertiesEasy(a,b){Object.assign(b,a)}var z=function(){var s=function(){}
s.prototype={p:{}}
var r=new s()
if(!(Object.getPrototypeOf(r)&&Object.getPrototypeOf(r).p===s.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var q=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(q))return true}}catch(p){}return false}()
function inherit(a,b){a.prototype.constructor=a
a.prototype["$i"+a.name]=a
if(b!=null){if(z){Object.setPrototypeOf(a.prototype,b.prototype)
return}var s=Object.create(b.prototype)
copyProperties(a.prototype,s)
a.prototype=s}}function inheritMany(a,b){for(var s=0;s<b.length;s++){inherit(b[s],a)}}function mixinEasy(a,b){mixinPropertiesEasy(b.prototype,a.prototype)
a.prototype.constructor=a}function mixinHard(a,b){mixinPropertiesHard(b.prototype,a.prototype)
a.prototype.constructor=a}function lazy(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){a[b]=d()}a[c]=function(){return this[b]}
return a[b]}}function lazyFinal(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){var r=d()
if(a[b]!==s){A.l9(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.h(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.fY(b)
return new s(c,this)}:function(){if(s===null)s=A.fY(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.fY(a).prototype
return s}}var x=0
function tearOffParameters(a,b,c,d,e,f,g,h,i,j){if(typeof h=="number"){h+=x}return{co:a,iS:b,iI:c,rC:d,dV:e,cs:f,fs:g,fT:h,aI:i||0,nDA:j}}function installStaticTearOff(a,b,c,d,e,f,g,h){var s=tearOffParameters(a,true,false,c,d,e,f,g,h,false)
var r=staticTearOffGetter(s)
a[b]=r}function installInstanceTearOff(a,b,c,d,e,f,g,h,i,j){c=!!c
var s=tearOffParameters(a,false,c,d,e,f,g,h,i,!!j)
var r=instanceTearOffGetter(c,s)
a[b]=r}function setOrUpdateInterceptorsByTag(a){var s=v.interceptorsByTag
if(!s){v.interceptorsByTag=a
return}copyProperties(a,s)}function setOrUpdateLeafTags(a){var s=v.leafTags
if(!s){v.leafTags=a
return}copyProperties(a,s)}function updateTypes(a){var s=v.types
var r=s.length
s.push.apply(s,a)
return r}function updateHolder(a,b){copyProperties(b,a)
return a}var hunkHelpers=function(){var s=function(a,b,c,d,e){return function(f,g,h,i){return installInstanceTearOff(f,g,a,b,c,d,[h],i,e,false)}},r=function(a,b,c,d){return function(e,f,g,h){return installStaticTearOff(e,f,a,b,c,[g],h,d)}}
return{inherit:inherit,inheritMany:inheritMany,mixin:mixinEasy,mixinHard:mixinHard,installStaticTearOff:installStaticTearOff,installInstanceTearOff:installInstanceTearOff,_instance_0u:s(0,0,null,["$0"],0),_instance_1u:s(0,1,null,["$1"],0),_instance_2u:s(0,2,null,["$2"],0),_instance_0i:s(1,0,null,["$0"],0),_instance_1i:s(1,1,null,["$1"],0),_instance_2i:s(1,2,null,["$2"],0),_static_0:r(0,null,["$0"],0),_static_1:r(1,null,["$1"],0),_static_2:r(2,null,["$2"],0),makeConstList:makeConstList,lazy:lazy,lazyFinal:lazyFinal,updateHolder:updateHolder,convertToFastObject:convertToFastObject,updateTypes:updateTypes,setOrUpdateInterceptorsByTag:setOrUpdateInterceptorsByTag,setOrUpdateLeafTags:setOrUpdateLeafTags}}()
function initializeDeferredHunk(a){x=v.types.length
a(hunkHelpers,v,w,$)}var J={
h1(a,b,c,d){return{i:a,p:b,e:c,x:d}},
fs(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.h_==null){A.l0()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.d(A.hx("Return interceptor for "+A.t(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.f4
if(o==null)o=$.f4=A.fr(n)
p=q[o]}if(p!=null)return p
p=A.l5(a)
if(p!=null)return p
if(typeof a=="function")return B.ak
s=Object.getPrototypeOf(a)
if(s==null)return B.H
if(s===Object.prototype)return B.H
if(typeof q=="function"){o=$.f4
if(o==null)o=$.f4=A.fr(n)
Object.defineProperty(q,o,{value:B.o,enumerable:false,writable:true,configurable:true})
return B.o}return B.o},
jb(a,b){if(a<0||a>4294967295)throw A.d(A.aA(a,0,4294967295,"length",null))
return J.jc(new Array(a),b)},
hk(a,b){if(a<0)throw A.d(A.bx("Length must be a non-negative integer: "+a,null))
return A.h(new Array(a),b.h("k<0>"))},
jc(a,b){var s=A.h(a,b.h("k<0>"))
s.$flags=1
return s},
jd(a,b){var s=t.V
return J.iP(s.a(a),s.a(b))},
hl(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
je(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.hl(r))break;++b}return b},
jf(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.f(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.hl(q))break}return b},
b5(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bF.prototype
return J.cV.prototype}if(typeof a=="string")return J.al.prototype
if(a==null)return J.bG.prototype
if(typeof a=="boolean")return J.cU.prototype
if(Array.isArray(a))return J.k.prototype
if(typeof a!="object"){if(typeof a=="function")return J.X.prototype
if(typeof a=="symbol")return J.bg.prototype
if(typeof a=="bigint")return J.bf.prototype
return a}if(a instanceof A.i)return a
return J.fs(a)},
bs(a){if(typeof a=="string")return J.al.prototype
if(a==null)return a
if(Array.isArray(a))return J.k.prototype
if(typeof a!="object"){if(typeof a=="function")return J.X.prototype
if(typeof a=="symbol")return J.bg.prototype
if(typeof a=="bigint")return J.bf.prototype
return a}if(a instanceof A.i)return a
return J.fs(a)},
fZ(a){if(a==null)return a
if(Array.isArray(a))return J.k.prototype
if(typeof a!="object"){if(typeof a=="function")return J.X.prototype
if(typeof a=="symbol")return J.bg.prototype
if(typeof a=="bigint")return J.bf.prototype
return a}if(a instanceof A.i)return a
return J.fs(a)},
kV(a){if(typeof a=="number")return J.bd.prototype
if(typeof a=="string")return J.al.prototype
if(a==null)return a
if(!(a instanceof A.i))return J.aW.prototype
return a},
kW(a){if(typeof a=="string")return J.al.prototype
if(a==null)return a
if(!(a instanceof A.i))return J.aW.prototype
return a},
kX(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.X.prototype
if(typeof a=="symbol")return J.bg.prototype
if(typeof a=="bigint")return J.bf.prototype
return a}if(a instanceof A.i)return a
return J.fs(a)},
a9(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.b5(a).L(a,b)},
iM(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.l3(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.bs(a).j(a,b)},
ha(a,b){return J.kW(a).b3(a,b)},
iN(a,b,c){return J.kX(a).b4(a,b,c)},
iO(a,b){return J.fZ(a).a8(a,b)},
iP(a,b){return J.kV(a).F(a,b)},
dI(a,b){return J.fZ(a).A(a,b)},
aa(a){return J.b5(a).gt(a)},
hb(a){return J.bs(a).gu(a)},
iQ(a){return J.bs(a).gK(a)},
ae(a){return J.fZ(a).gp(a)},
aK(a){return J.bs(a).gk(a)},
iR(a){return J.b5(a).gv(a)},
au(a){return J.b5(a).i(a)},
cR:function cR(){},
cU:function cU(){},
bG:function bG(){},
A:function A(){},
ax:function ax(){},
d8:function d8(){},
aW:function aW(){},
X:function X(){},
bf:function bf(){},
bg:function bg(){},
k:function k(a){this.$ti=a},
cT:function cT(){},
eb:function eb(a){this.$ti=a},
aN:function aN(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bd:function bd(){},
bF:function bF(){},
cV:function cV(){},
al:function al(){}},A={fH:function fH(){},
iU(a,b,c){if(t.R.b(a))return new A.c8(a,b.h("@<0>").q(c).h("c8<1,2>"))
return new A.aO(a,b.h("@<0>").q(c).h("aO<1,2>"))},
aD(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
fM(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
cB(a,b,c){return a},
h0(a){var s,r
for(s=$.a_.length,r=0;r<s;++r)if(a===$.a_[r])return!0
return!1},
hv(a,b,c,d){A.er(b,"start")
A.er(c,"end")
if(b>c)A.b8(A.aA(b,0,c,"start",null))
return new A.c0(a,b,c,d.h("c0<0>"))},
hp(a,b,c,d){if(t.R.b(a))return new A.bC(a,b,c.h("@<0>").q(d).h("bC<1,2>"))
return new A.aq(a,b,c.h("@<0>").q(d).h("aq<1,2>"))},
cS(){return new A.c_("No element")},
aE:function aE(){},
bz:function bz(a,b){this.a=a
this.$ti=b},
aO:function aO(a,b){this.a=a
this.$ti=b},
c8:function c8(a,b){this.a=a
this.$ti=b},
c7:function c7(){},
ag:function ag(a,b){this.a=a
this.$ti=b},
cY:function cY(a){this.a=a},
eD:function eD(){},
e:function e(){},
F:function F(){},
c0:function c0(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
ap:function ap(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aq:function aq(a,b,c){this.a=a
this.b=b
this.$ti=c},
bC:function bC(a,b,c){this.a=a
this.b=b
this.$ti=c},
bN:function bN(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
L:function L(a,b,c){this.a=a
this.b=b
this.$ti=c},
T:function T(a,b,c){this.a=a
this.b=b
this.$ti=c},
a7:function a7(a,b,c){this.a=a
this.b=b
this.$ti=c},
c3:function c3(a,b){this.a=a
this.$ti=b},
c4:function c4(a,b){this.a=a
this.$ti=b},
S:function S(){},
cs:function cs(){},
id(a){var s=A.ic(a)
if(s!=null)return s
return"minified:"+a},
l3(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
t(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.au(a)
return s},
bV(a){var s,r=$.hr
if(r==null)r=$.hr=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
jq(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.f(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
d9(a){var s,r,q,p
if(a instanceof A.i)return A.Z(A.b6(a),null)
s=J.b5(a)
if(s===B.aj||s===B.al||t.ak.b(a)){r=B.u(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.Z(A.b6(a),null)},
hs(a){var s,r,q
if(a==null||typeof a=="number"||A.fU(a))return J.au(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.av)return a.i(0)
if(a instanceof A.ad)return a.b_(!0)
s=$.iG()
for(r=0;r<1;++r){q=s[r].cw(a)
if(q!=null)return q}return"Instance of '"+A.d9(a)+"'"},
N(a){var s
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.aY(s,10)|55296)>>>0,s&1023|56320)}throw A.d(A.aA(a,0,1114111,null,null))},
js(a,b,c,d,e,f,g,h,i){var s,r,q,p=b-1
if(0<=a&&a<100){a+=400
p-=4800}s=B.c.ad(h,1000)
r=new Date(a,p,c,d,e,f,g+B.c.E(h-s,1000)).valueOf()
q=!0
if(!isNaN(r))if(!(r<-864e13))if(!(r>864e13))q=r===864e13&&s!==0
if(q)return null
return r},
bk(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
aU(a){var s=A.bk(a).getFullYear()+0
return s},
aT(a){var s=A.bk(a).getMonth()+1
return s},
az(a){var s=A.bk(a).getDate()+0
return s},
jm(a){var s=A.bk(a).getHours()+0
return s},
jo(a){var s=A.bk(a).getMinutes()+0
return s},
jp(a){var s=A.bk(a).getSeconds()+0
return s},
jn(a){var s=A.bk(a).getMilliseconds()+0
return s},
jl(a){var s=a.$thrownJsError
if(s==null)return null
return A.bt(s)},
jr(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.K(a,s)
a.$thrownJsError=s
s.stack=b.i(0)}},
f(a,b){if(a==null)J.aK(a)
throw A.d(A.fp(a,b))},
fp(a,b){var s,r="index"
if(!A.hU(b))return new A.af(!0,b,r,null)
s=J.aK(a)
if(b<0||b>=s)return A.e9(b,s,a,r)
return new A.bl(null,null,!0,b,r,"Value not in range")},
d(a){return A.K(a,new Error())},
K(a,b){var s
if(a==null)a=new A.as()
b.dartException=a
s=A.la
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
la(){return J.au(this.dartException)},
b8(a,b){throw A.K(a,b==null?new Error():b)},
dF(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.b8(A.ka(a,b,c),s)},
ka(a,b,c){var s,r,q,p,o,n,m,l,k
if(typeof b=="string")s=b
else{r="[]=;add;removeWhere;retainWhere;removeRange;setRange;setInt8;setInt16;setInt32;setUint8;setUint16;setUint32;setFloat32;setFloat64".split(";")
q=r.length
p=b
if(p>q){c=p/q|0
p%=q}s=r[p]}o=typeof c=="string"?c:"modify;remove from;add to".split(";")[c]
n=t.j.b(a)?"list":"ByteData"
m=a.$flags|0
l="a "
if((m&4)!==0)k="constant "
else if((m&2)!==0){k="unmodifiable "
l="an "}else k=(m&1)!==0?"fixed-length ":""
return new A.c1("'"+s+"': Cannot "+o+" "+l+k+n)},
a0(a){throw A.d(A.U(a))},
at(a){var s,r,q,p,o,n
a=A.l8(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.h([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.eN(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
eO(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
hw(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
fI(a,b){var s=b==null,r=s?null:b.method
return new A.cW(a,r,s?null:b.receiver)},
aJ(a){var s
if(a==null)return new A.ej(a)
if(a instanceof A.bD){s=a.a
return A.aI(a,s==null?A.aH(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.aI(a,a.dartException)
return A.kL(a)},
aI(a,b){if(t.C.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
kL(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.aY(r,16)&8191)===10)switch(q){case 438:return A.aI(a,A.fI(A.t(s)+" (Error "+q+")",null))
case 445:case 5007:A.t(s)
return A.aI(a,new A.bT())}}if(a instanceof TypeError){p=$.ip()
o=$.iq()
n=$.ir()
m=$.is()
l=$.iv()
k=$.iw()
j=$.iu()
$.it()
i=$.iy()
h=$.ix()
g=p.I(s)
if(g!=null)return A.aI(a,A.fI(A.n(s),g))
else{g=o.I(s)
if(g!=null){g.method="call"
return A.aI(a,A.fI(A.n(s),g))}else if(n.I(s)!=null||m.I(s)!=null||l.I(s)!=null||k.I(s)!=null||j.I(s)!=null||m.I(s)!=null||i.I(s)!=null||h.I(s)!=null){A.n(s)
return A.aI(a,new A.bT())}}return A.aI(a,new A.dh(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.bZ()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.aI(a,new A.af(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.bZ()
return a},
bt(a){var s
if(a instanceof A.bD)return a.b
if(a==null)return new A.ck(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.ck(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
h2(a){if(a==null)return J.aa(a)
if(typeof a=="object")return A.bV(a)
return J.aa(a)},
kQ(a){if(typeof a=="number")return B.e.gt(a)
if(a instanceof A.dz)return A.bV(a)
if(a instanceof A.ad)return a.gt(a)
return A.h2(a)},
i8(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.B(0,a[s],a[r])}return b},
km(a,b,c,d,e,f){t.Z.a(a)
switch(A.G(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.d(new A.eT("Unsupported number of arguments for wrapped closure"))},
dD(a,b){var s=a.$identity
if(!!s)return s
s=A.kR(a,b)
a.$identity=s
return s},
kR(a,b){var s
switch(b){case 0:s=a.$0
break
case 1:s=a.$1
break
case 2:s=a.$2
break
case 3:s=a.$3
break
case 4:s=a.$4
break
default:s=null}if(s!=null)return s.bind(a)
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.km)},
iZ(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.dd().constructor.prototype):Object.create(new A.ba(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.hh(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.iV(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.hh(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
iV(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.d("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.iS)}throw A.d("Error in functionType of tearoff")},
iW(a,b,c,d){var s=A.hf
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
hh(a,b,c,d){if(c)return A.iY(a,b,d)
return A.iW(b.length,d,a,b)},
iX(a,b,c,d){var s=A.hf,r=A.iT
switch(b?-1:a){case 0:throw A.d(new A.da("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
iY(a,b,c){var s,r
if($.hd==null)$.hd=A.hc("interceptor")
if($.he==null)$.he=A.hc("receiver")
s=b.length
r=A.iX(s,c,a,b)
return r},
fY(a){return A.iZ(a)},
iS(a,b){return A.cq(v.typeUniverse,A.b6(a.a),b)},
hf(a){return a.a},
iT(a){return a.b},
hc(a){var s,r,q,p=new A.ba("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.d(A.bx("Field name "+a+" not found.",null))},
fr(a){return v.getIsolateTag(a)},
lY(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
l5(a){var s,r,q,p,o,n=A.n($.i9.$1(a)),m=$.fq[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.fw[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.ff($.i5.$2(a,n))
if(q!=null){m=$.fq[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.fw[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.fz(s)
$.fq[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.fw[n]=s
return s}if(p==="-"){o=A.fz(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.ia(a,s)
if(p==="*")throw A.d(A.hx(n))
if(v.leafTags[n]===true){o=A.fz(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.ia(a,s)},
ia(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.h1(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
fz(a){return J.h1(a,!1,null,!!a.$iY)},
l7(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.fz(s)
else return J.h1(s,c,null,null)},
l0(){if(!0===$.h_)return
$.h_=!0
A.l1()},
l1(){var s,r,q,p,o,n,m,l
$.fq=Object.create(null)
$.fw=Object.create(null)
A.l_()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.ib.$1(o)
if(n!=null){m=A.l7(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
l_(){var s,r,q,p,o,n,m=B.X()
m=A.br(B.Y,A.br(B.Z,A.br(B.v,A.br(B.v,A.br(B.a_,A.br(B.a0,A.br(B.a1(B.u),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.i9=new A.ft(p)
$.i5=new A.fu(o)
$.ib=new A.fv(n)},
br(a,b){return a(b)||b},
kT(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
hm(a,b,c,d,e,f){var s=b?"m":"",r=c?"":"i",q=d?"u":"",p=e?"s":"",o=function(g,h){try{return new RegExp(g,h)}catch(n){return n}}(a,s+r+q+p+f)
if(o instanceof RegExp)return o
throw A.d(A.fF("Illegal RegExp pattern ("+String(o)+")",a))},
h3(a,b,c){var s
if(typeof b=="string")return a.indexOf(b,c)>=0
else if(b instanceof A.be){s=B.b.O(a,c)
return b.b.test(s)}else return!J.ha(b,B.b.O(a,c)).gu(0)},
l8(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
D:function D(a,b){this.a=a
this.b=b},
ch:function ch(a,b){this.a=a
this.b=b},
ci:function ci(a,b){this.a=a
this.b=b},
bb:function bb(){},
ah:function ah(a,b,c){this.a=a
this.b=b
this.$ti=c},
c9:function c9(a,b){this.a=a
this.$ti=b},
aZ:function aZ(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bE:function bE(a,b){this.a=a
this.$ti=b},
bA:function bA(){},
bB:function bB(a,b,c){this.a=a
this.b=b
this.$ti=c},
bX:function bX(){},
eN:function eN(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
bT:function bT(){},
cW:function cW(a,b,c){this.a=a
this.b=b
this.c=c},
dh:function dh(a){this.a=a},
ej:function ej(a){this.a=a},
bD:function bD(a,b){this.a=a
this.b=b},
ck:function ck(a){this.a=a
this.b=null},
av:function av(){},
cF:function cF(){},
cG:function cG(){},
df:function df(){},
dd:function dd(){},
ba:function ba(a,b){this.a=a
this.b=b},
da:function da(a){this.a=a},
am:function am(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
ef:function ef(a,b){this.a=a
this.b=b
this.c=null},
an:function an(a,b){this.a=a
this.$ti=b},
bL:function bL(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
ao:function ao(a,b){this.a=a
this.$ti=b},
aQ:function aQ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
bJ:function bJ(a,b){this.a=a
this.$ti=b},
bK:function bK(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
bH:function bH(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
ft:function ft(a){this.a=a},
fu:function fu(a){this.a=a},
fv:function fv(a){this.a=a},
ad:function ad(){},
aF:function aF(){},
be:function be(a,b){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null},
cc:function cc(a){this.b=a},
dj:function dj(a,b,c){this.a=a
this.b=b
this.c=c},
dk:function dk(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
de:function de(a,b){this.a=a
this.c=b},
dw:function dw(a,b,c){this.a=a
this.b=b
this.c=c},
dx:function dx(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
ji(a,b,c){var s=new Uint8Array(a,b,c)
return s},
b2(a,b,c){if(a>>>0!==a||a>=c)throw A.d(A.fp(b,a))},
aR:function aR(){},
bR:function bR(){},
fd:function fd(a){this.a=a},
bO:function bO(){},
bi:function bi(){},
bP:function bP(){},
bQ:function bQ(){},
cZ:function cZ(){},
d_:function d_(){},
d0:function d0(){},
d1:function d1(){},
d2:function d2(){},
d3:function d3(){},
d4:function d4(){},
bS:function bS(){},
d5:function d5(){},
cd:function cd(){},
ce:function ce(){},
cf:function cf(){},
cg:function cg(){},
fL(a,b){var s=b.c
return s==null?b.c=A.co(a,"aj",[b.x]):s},
ht(a){var s=a.w
if(s===6||s===7)return A.ht(a.x)
return s===11||s===12},
jw(a){return a.as},
R(a){return A.fc(v.typeUniverse,a,!1)},
b3(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.b3(a1,s,a3,a4)
if(r===s)return a2
return A.hG(a1,r,!0)
case 7:s=a2.x
r=A.b3(a1,s,a3,a4)
if(r===s)return a2
return A.hF(a1,r,!0)
case 8:q=a2.y
p=A.bq(a1,q,a3,a4)
if(p===q)return a2
return A.co(a1,a2.x,p)
case 9:o=a2.x
n=A.b3(a1,o,a3,a4)
m=a2.y
l=A.bq(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.fP(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.bq(a1,j,a3,a4)
if(i===j)return a2
return A.hH(a1,k,i)
case 11:h=a2.x
g=A.b3(a1,h,a3,a4)
f=a2.y
e=A.kI(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.hE(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.bq(a1,d,a3,a4)
o=a2.x
n=A.b3(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.fQ(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.d(A.cD("Attempted to substitute unexpected RTI kind "+a0))}},
bq(a,b,c,d){var s,r,q,p,o=b.length,n=A.fe(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.b3(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
kJ(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.fe(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.b3(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
kI(a,b,c,d){var s,r=b.a,q=A.bq(a,r,c,d),p=b.b,o=A.bq(a,p,c,d),n=b.c,m=A.kJ(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.dp()
s.a=q
s.b=o
s.c=m
return s},
h(a,b){a[v.arrayRti]=b
return a},
i7(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.kZ(s)
return a.$S()}return null},
l2(a,b){var s
if(A.ht(b))if(a instanceof A.av){s=A.i7(a)
if(s!=null)return s}return A.b6(a)},
b6(a){if(a instanceof A.i)return A.z(a)
if(Array.isArray(a))return A.J(a)
return A.fT(J.b5(a))},
J(a){var s=a[v.arrayRti],r=t.r
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
z(a){var s=a.$ti
return s!=null?s:A.fT(a)},
fT(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.ki(a,s)},
ki(a,b){var s=a instanceof A.av?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.k0(v.typeUniverse,s.name)
b.$ccache=r
return r},
kZ(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.fc(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
kY(a){return A.b4(A.z(a))},
fX(a){var s
if(a instanceof A.ad)return A.kU(a.$r,a.aR())
s=a instanceof A.av?A.i7(a):null
if(s!=null)return s
if(t.dm.b(a))return J.iR(a).a
if(Array.isArray(a))return A.J(a)
return A.b6(a)},
b4(a){var s=a.r
return s==null?a.r=new A.dz(a):s},
kU(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bQ
if(0>=p)return A.f(q,0)
s=A.cq(v.typeUniverse,A.fX(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.f(q,r)
s=A.hJ(v.typeUniverse,s,A.fX(q[r]))}return A.cq(v.typeUniverse,s,a)},
a8(a){return A.b4(A.fc(v.typeUniverse,a,!1))},
kh(a){var s=this
s.b=A.kG(s)
return s.b(a)},
kG(a){var s,r,q,p,o
if(a===t.K)return A.ks
if(A.b7(a))return A.kw
s=a.w
if(s===6)return A.kf
if(s===1)return A.hW
if(s===7)return A.kn
r=A.kF(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.b7)){a.f="$i"+q
if(q==="j")return A.kq
if(a===t.o)return A.kp
return A.kv}}else if(s===10){p=A.kT(a.x,a.y)
o=p==null?A.hW:p
return o==null?A.aH(o):o}return A.kd},
kF(a){if(a.w===8){if(a===t.S)return A.hU
if(a===t.i||a===t.q)return A.kr
if(a===t.N)return A.ku
if(a===t.y)return A.fU}return null},
kg(a){var s=this,r=A.kc
if(A.b7(s))r=A.k6
else if(s===t.K)r=A.aH
else if(A.bv(s)){r=A.ke
if(s===t.h6)r=A.fR
else if(s===t.dk)r=A.ff
else if(s===t.fQ)r=A.k2
else if(s===t.cg)r=A.hO
else if(s===t.I)r=A.k4
else if(s===t.an)r=A.k5}else if(s===t.S)r=A.G
else if(s===t.N)r=A.n
else if(s===t.y)r=A.hM
else if(s===t.q)r=A.dA
else if(s===t.i)r=A.k3
else if(s===t.o)r=A.hN
s.a=r
return s.a(a)},
kd(a){var s=this
if(a==null)return A.bv(s)
return A.l4(v.typeUniverse,A.l2(a,s),s)},
kf(a){if(a==null)return!0
return this.x.b(a)},
kv(a){var s,r=this
if(a==null)return A.bv(r)
s=r.f
if(a instanceof A.i)return!!a[s]
return!!J.b5(a)[s]},
kq(a){var s,r=this
if(a==null)return A.bv(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.i)return!!a[s]
return!!J.b5(a)[s]},
kp(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.i)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
hV(a){if(typeof a=="object"){if(a instanceof A.i)return t.o.b(a)
return!0}if(typeof a=="function")return!0
return!1},
kc(a){var s=this
if(a==null){if(A.bv(s))return a}else if(s.b(a))return a
throw A.K(A.hQ(a,s),new Error())},
ke(a){var s=this
if(a==null||s.b(a))return a
throw A.K(A.hQ(a,s),new Error())},
hQ(a,b){return new A.cm("TypeError: "+A.hz(a,A.Z(b,null)))},
hz(a,b){return A.cN(a)+": type '"+A.Z(A.fX(a),null)+"' is not a subtype of type '"+b+"'"},
a4(a,b){return new A.cm("TypeError: "+A.hz(a,b))},
kn(a){var s=this
return s.x.b(a)||A.fL(v.typeUniverse,s).b(a)},
ks(a){return a!=null},
aH(a){if(a!=null)return a
throw A.K(A.a4(a,"Object"),new Error())},
kw(a){return!0},
k6(a){return a},
hW(a){return!1},
fU(a){return!0===a||!1===a},
hM(a){if(!0===a)return!0
if(!1===a)return!1
throw A.K(A.a4(a,"bool"),new Error())},
k2(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.K(A.a4(a,"bool?"),new Error())},
k3(a){if(typeof a=="number")return a
throw A.K(A.a4(a,"double"),new Error())},
k4(a){if(typeof a=="number")return a
if(a==null)return a
throw A.K(A.a4(a,"double?"),new Error())},
hU(a){return typeof a=="number"&&Math.floor(a)===a},
G(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.K(A.a4(a,"int"),new Error())},
fR(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.K(A.a4(a,"int?"),new Error())},
kr(a){return typeof a=="number"},
dA(a){if(typeof a=="number")return a
throw A.K(A.a4(a,"num"),new Error())},
hO(a){if(typeof a=="number")return a
if(a==null)return a
throw A.K(A.a4(a,"num?"),new Error())},
ku(a){return typeof a=="string"},
n(a){if(typeof a=="string")return a
throw A.K(A.a4(a,"String"),new Error())},
ff(a){if(typeof a=="string")return a
if(a==null)return a
throw A.K(A.a4(a,"String?"),new Error())},
hN(a){if(A.hV(a))return a
throw A.K(A.a4(a,"JSObject"),new Error())},
k5(a){if(a==null)return a
if(A.hV(a))return a
throw A.K(A.a4(a,"JSObject?"),new Error())},
i1(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.Z(a[q],b)
return s},
kA(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.i1(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.Z(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
hR(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.h([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.a.m(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.f(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.Z(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.Z(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.Z(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.Z(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.Z(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
Z(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.Z(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.Z(a.x,b)+">"
if(l===8){p=A.kK(a.x)
o=a.y
return o.length>0?p+("<"+A.i1(o,b)+">"):p}if(l===10)return A.kA(a,b)
if(l===11)return A.hR(a,b,null)
if(l===12)return A.hR(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.f(b,n)
return b[n]}return"?"},
kK(a){var s=A.ic(a)
if(s!=null)return s
return"minified:"+a},
k1(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
k0(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.fc(a,b,!1)
else if(typeof m=="number"){s=m
r=A.cp(a,5,"#")
q=A.fe(s)
for(p=0;p<s;++p)q[p]=r
o=A.co(a,b,q)
n[b]=o
return o}else return m},
k_(a,b){return A.hK(a.tR,b)},
jZ(a,b){return A.hK(a.eT,b)},
fc(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.hI(a,null,b,!1)
r.set(b,s)
return s},
cq(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.hI(a,b,c,!0)
q.set(c,r)
return r},
hJ(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.fP(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
hI(a,b,c,d){return A.jR(A.jL(a,b,c,d))},
aG(a,b){b.a=A.kg
b.b=A.kh
return b},
cp(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.a6(null,null)
s.w=b
s.as=c
r=A.aG(a,s)
a.eC.set(c,r)
return r},
hG(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.jX(a,b,r,c)
a.eC.set(r,s)
return s},
jX(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.b7(b))if(!(b===t.P||b===t.T))if(s!==6)r=s===7&&A.bv(b.x)
if(r)return b
else if(s===1)return t.P}q=new A.a6(null,null)
q.w=6
q.x=b
q.as=c
return A.aG(a,q)},
hF(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.jV(a,b,r,c)
a.eC.set(r,s)
return s},
jV(a,b,c,d){var s,r
if(d){s=b.w
if(A.b7(b)||b===t.K)return b
else if(s===1)return A.co(a,"aj",[b])
else if(b===t.P||b===t.T)return t.eH}r=new A.a6(null,null)
r.w=7
r.x=b
r.as=c
return A.aG(a,r)},
jY(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.a6(null,null)
s.w=13
s.x=b
s.as=q
r=A.aG(a,s)
a.eC.set(q,r)
return r},
cn(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
jU(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
co(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.cn(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.a6(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.aG(a,r)
a.eC.set(p,q)
return q},
fP(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.cn(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.a6(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.aG(a,o)
a.eC.set(q,n)
return n},
hH(a,b,c){var s,r,q="+"+(b+"("+A.cn(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.a6(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.aG(a,s)
a.eC.set(q,r)
return r},
hE(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.cn(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.cn(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.jU(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.a6(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.aG(a,p)
a.eC.set(r,o)
return o},
fQ(a,b,c,d){var s,r=b.as+("<"+A.cn(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.jW(a,b,c,r,d)
a.eC.set(r,s)
return s},
jW(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.fe(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.b3(a,b,r,0)
m=A.bq(a,c,r,0)
return A.fQ(a,n,m,c!==m)}}l=new A.a6(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.aG(a,l)},
jL(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
jR(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.jN(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.hB(a,r,l,k,!1)
else if(q===46)r=A.hB(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.b_(a.u,a.e,k.pop()))
break
case 94:k.push(A.jY(a.u,k.pop()))
break
case 35:k.push(A.cp(a.u,5,"#"))
break
case 64:k.push(A.cp(a.u,2,"@"))
break
case 126:k.push(A.cp(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.jP(a,k)
break
case 38:A.jO(a,k)
break
case 63:p=a.u
k.push(A.hG(p,A.b_(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.hF(p,A.b_(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.jM(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.hC(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.jS(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-2)
break
case 43:n=l.indexOf("(",r)
k.push(l.substring(r,n))
k.push(-4)
k.push(a.p)
a.p=k.length
r=n+1
break
default:throw"Bad character "+q}}}m=k.pop()
return A.b_(a.u,a.e,m)},
jN(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
hB(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.k1(s,o.x)[p]
if(n==null)A.b8('No "'+p+'" in "'+A.jw(o)+'"')
d.push(A.cq(s,o,n))}else d.push(p)
return m},
jP(a,b){var s,r=a.u,q=A.hA(a,b),p=b.pop()
if(typeof p=="string")b.push(A.co(r,p,q))
else{s=A.b_(r,a.e,p)
switch(s.w){case 11:b.push(A.fQ(r,s,q,a.n))
break
default:b.push(A.fP(r,s,q))
break}}},
jM(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.hA(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.b_(p,a.e,o)
q=new A.dp()
q.a=s
q.b=n
q.c=m
b.push(A.hE(p,r,q))
return
case-4:b.push(A.hH(p,b.pop(),s))
return
default:throw A.d(A.cD("Unexpected state under `()`: "+A.t(o)))}},
jO(a,b){var s=b.pop()
if(0===s){b.push(A.cp(a.u,1,"0&"))
return}if(1===s){b.push(A.cp(a.u,4,"1&"))
return}throw A.d(A.cD("Unexpected extended operation "+A.t(s)))},
hA(a,b){var s=b.splice(a.p)
A.hC(a.u,a.e,s)
a.p=b.pop()
return s},
b_(a,b,c){if(typeof c=="string")return A.co(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.jQ(a,b,c)}else return c},
hC(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.b_(a,b,c[s])},
jS(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.b_(a,b,c[s])},
jQ(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.d(A.cD("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.d(A.cD("Bad index "+c+" for "+b.i(0)))},
l4(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.H(a,b,null,c,null)
r.set(c,s)}return s},
H(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.b7(d))return!0
s=b.w
if(s===4)return!0
if(A.b7(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.H(a,c[b.x],c,d,e))return!0
q=d.w
p=t.P
if(b===p||b===t.T){if(q===7)return A.H(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.H(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.H(a,b.x,c,d,e))return!1
return A.H(a,A.fL(a,b),c,d,e)}if(s===6)return A.H(a,p,c,d,e)&&A.H(a,b.x,c,d,e)
if(q===7){if(A.H(a,b,c,d.x,e))return!0
return A.H(a,b,c,A.fL(a,d),e)}if(q===6)return A.H(a,b,c,p,e)||A.H(a,b,c,d.x,e)
if(r)return!1
p=s!==11
if((!p||s===12)&&d===t.Z)return!0
o=s===10
if(o&&d===t.gT)return!0
if(q===12){if(b===t.g)return!0
if(s!==12)return!1
n=b.y
m=d.y
l=n.length
if(l!==m.length)return!1
c=c==null?n:n.concat(c)
e=e==null?m:m.concat(e)
for(k=0;k<l;++k){j=n[k]
i=m[k]
if(!A.H(a,j,c,i,e)||!A.H(a,i,e,j,c))return!1}return A.hT(a,b.x,c,d.x,e)}if(q===11){if(b===t.g)return!0
if(p)return!1
return A.hT(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.ko(a,b,c,d,e)}if(o&&q===10)return A.kt(a,b,c,d,e)
return!1},
hT(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.H(a3,a4.x,a5,a6.x,a7))return!1
s=a4.y
r=a6.y
q=s.a
p=r.a
o=q.length
n=p.length
if(o>n)return!1
m=n-o
l=s.b
k=r.b
j=l.length
i=k.length
if(o+j<n+i)return!1
for(h=0;h<o;++h){g=q[h]
if(!A.H(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.H(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.H(a3,k[h],a7,g,a5))return!1}f=s.c
e=r.c
d=f.length
c=e.length
for(b=0,a=0;a<c;a+=3){a0=e[a]
for(;;){if(b>=d)return!1
a1=f[b]
b+=3
if(a0<a1)return!1
a2=f[b-2]
if(a1<a0){if(a2)return!1
continue}g=e[a+1]
if(a2&&!g)return!1
g=f[b-1]
if(!A.H(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
ko(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.cq(a,b,r[o])
return A.hL(a,p,null,c,d.y,e)}return A.hL(a,b.y,null,c,d.y,e)},
hL(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.H(a,b[s],d,e[s],f))return!1
return!0},
kt(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.H(a,r[s],c,q[s],e))return!1
return!0},
bv(a){var s=a.w,r=!0
if(!(a===t.P||a===t.T))if(!A.b7(a))if(s!==6)r=s===7&&A.bv(a.x)
return r},
b7(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
hK(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
fe(a){return a>0?new Array(a):v.typeUniverse.sEA},
a6:function a6(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
dp:function dp(){this.c=this.b=this.a=null},
dz:function dz(a){this.a=a},
dn:function dn(){},
cm:function cm(a){this.a=a},
jF(){var s,r,q
if(self.scheduleImmediate!=null)return A.kM()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.dD(new A.eQ(s),1)).observe(r,{childList:true})
return new A.eP(s,r,q)}else if(self.setImmediate!=null)return A.kN()
return A.kO()},
jG(a){self.scheduleImmediate(A.dD(new A.eR(t.M.a(a)),0))},
jH(a){self.setImmediate(A.dD(new A.eS(t.M.a(a)),0))},
jI(a){A.fN(B.m,t.M.a(a))},
fN(a,b){var s=B.c.E(a.a,1000)
return A.jT(s<0?0:s,b)},
jT(a,b){var s=new A.fa()
s.bn(a,b)
return s},
cz(a){return new A.c5(new A.C($.w,a.h("C<0>")),a.h("c5<0>"))},
cv(a,b){a.$2(0,null)
b.b=!0
return b.a},
dB(a,b){A.k7(a,b)},
cu(a,b){b.Y(a)},
ct(a,b){b.ar(A.aJ(a),A.bt(a))},
k7(a,b){var s,r,q=new A.fg(b),p=new A.fh(b)
if(a instanceof A.C)a.aZ(q,p,t.z)
else{s=t.z
if(a instanceof A.C)a.Z(q,p,s)
else{r=new A.C($.w,t._)
r.a=8
r.c=a
r.aZ(q,p,s)}}},
cA(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.w.bc(new A.fo(s),t.H,t.S,t.z)},
hD(a,b,c){return 0},
fD(a){var s
if(t.C.b(a)){s=a.ga0()
if(s!=null)return s}return B.a8},
hj(a,b){var s
if(!b.b(null))throw A.d(A.by(null,"computation","The type parameter is not nullable"))
s=new A.C($.w,b.h("C<0>"))
A.jA(a,new A.e0(null,s,b))
return s},
j6(a,b){var s,r,q=new A.C($.w,b.h("C<0>")),p=new A.cl(q,b.h("cl<0>")),o=new A.e2(p,b),n=new A.e1(p)
for(s=t.H,r=0;r<2;++r)a[r].Z(o,n,s)
return q},
kj(a,b){if($.w===B.d)return null
return null},
kk(a,b){if($.w!==B.d)A.kj(a,b)
if(t.C.b(a))A.jr(a,b)
return new A.a1(a,b)},
eX(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t._;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.jy()
b.ah(new A.a1(new A.af(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.aV(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.X()
b.a2(o.a)
A.aY(b,p)
return}b.a^=2
A.dC(null,null,b.b,t.M.a(new A.eY(o,b)))},
aY(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.n,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.fW(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.aY(d.a,c)
q.a=l
k=l.a}p=d.a
j=p.c
q.b=n
q.c=j
if(o){i=c.c
i=(i&1)!==0||(i&15)===8}else i=!0
if(i){h=c.b.b
if(n){p=p.b===h
p=!(p||p)}else p=!1
if(p){s.a(j)
A.fW(j.a,j.b)
return}g=$.w
if(g!==h)$.w=h
else g=null
c=c.c
if((c&15)===8)new A.f1(q,d,n).$0()
else if(o){if((c&1)!==0)new A.f0(q,j).$0()}else if((c&2)!==0)new A.f_(d,q).$0()
if(g!=null)$.w=g
c=q.c
if(c instanceof A.C){p=q.a.$ti
p=p.h("aj<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.a6(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.eX(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.a6(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
kB(a,b){var s
if(t.Q.b(a))return b.bc(a,t.z,t.K,t.l)
s=t.v
if(s.b(a))return s.a(a)
throw A.d(A.by(a,"onError",u.c))},
ky(){var s,r
for(s=$.bp;s!=null;s=$.bp){$.cy=null
r=s.b
$.bp=r
if(r==null)$.cx=null
s.a.$0()}},
kH(){$.fV=!0
try{A.ky()}finally{$.cy=null
$.fV=!1
if($.bp!=null)$.h5().$1(A.i6())}},
i3(a){var s=new A.dl(a),r=$.cx
if(r==null){$.bp=$.cx=s
if(!$.fV)$.h5().$1(A.i6())}else $.cx=r.b=s},
kE(a){var s,r,q,p=$.bp
if(p==null){A.i3(a)
$.cy=$.cx
return}s=new A.dl(a)
r=$.cy
if(r==null){s.b=p
$.bp=$.cy=s}else{q=r.b
s.b=q
$.cy=r.b=s
if(q==null)$.cx=s}},
lq(a,b){A.cB(a,"stream",t.K)
return new A.dv(b.h("dv<0>"))},
jA(a,b){var s=$.w
if(s===B.d)return A.fN(a,t.M.a(b))
return A.fN(a,t.M.a(s.b5(b)))},
fW(a,b){A.kE(new A.fm(a,b))},
i0(a,b,c,d,e){var s,r=$.w
if(r===c)return d.$0()
$.w=c
s=r
try{r=d.$0()
return r}finally{$.w=s}},
kD(a,b,c,d,e,f,g){var s,r=$.w
if(r===c)return d.$1(e)
$.w=c
s=r
try{r=d.$1(e)
return r}finally{$.w=s}},
kC(a,b,c,d,e,f,g,h,i){var s,r=$.w
if(r===c)return d.$2(e,f)
$.w=c
s=r
try{r=d.$2(e,f)
return r}finally{$.w=s}},
dC(a,b,c,d){t.M.a(d)
if(B.d!==c){d=c.b5(d)
d=d}A.i3(d)},
eQ:function eQ(a){this.a=a},
eP:function eP(a,b,c){this.a=a
this.b=b
this.c=c},
eR:function eR(a){this.a=a},
eS:function eS(a){this.a=a},
fa:function fa(){},
fb:function fb(a,b){this.a=a
this.b=b},
c5:function c5(a,b){this.a=a
this.b=!1
this.$ti=b},
fg:function fg(a){this.a=a},
fh:function fh(a){this.a=a},
fo:function fo(a){this.a=a},
b0:function b0(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
bo:function bo(a,b){this.a=a
this.$ti=b},
a1:function a1(a,b){this.a=a
this.b=b},
e0:function e0(a,b,c){this.a=a
this.b=b
this.c=c},
e2:function e2(a,b){this.a=a
this.b=b},
e1:function e1(a){this.a=a},
bn:function bn(){},
c6:function c6(a,b){this.a=a
this.$ti=b},
cl:function cl(a,b){this.a=a
this.$ti=b},
aX:function aX(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
C:function C(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
eU:function eU(a,b){this.a=a
this.b=b},
eZ:function eZ(a,b){this.a=a
this.b=b},
eY:function eY(a,b){this.a=a
this.b=b},
eW:function eW(a,b){this.a=a
this.b=b},
eV:function eV(a,b){this.a=a
this.b=b},
f1:function f1(a,b,c){this.a=a
this.b=b
this.c=c},
f2:function f2(a,b){this.a=a
this.b=b},
f3:function f3(a){this.a=a},
f0:function f0(a,b){this.a=a
this.b=b},
f_:function f_(a,b){this.a=a
this.b=b},
dl:function dl(a){this.a=a
this.b=null},
dv:function dv(a){this.$ti=a},
cr:function cr(){},
du:function du(){},
f9:function f9(a,b){this.a=a
this.b=b},
fm:function fm(a,b){this.a=a
this.b=b},
l(a,b,c){return b.h("@<0>").q(c).h("fJ<1,2>").a(A.i8(a,new A.am(b.h("@<0>").q(c).h("am<1,2>"))))},
bM(a,b){return new A.am(a.h("@<0>").q(b).h("am<1,2>"))},
jg(a){return new A.ca(a.h("ca<0>"))},
fO(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
fK(a){var s,r
if(A.h0(a))return"{...}"
s=new A.aC("")
try{r={}
B.a.m($.a_,a)
s.a+="{"
r.a=!0
a.M(0,new A.eg(r,s))
s.a+="}"}finally{if(0>=$.a_.length)return A.f($.a_,-1)
$.a_.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
ca:function ca(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
dt:function dt(a){this.a=a
this.c=this.b=null},
cb:function cb(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
m:function m(){},
P:function P(){},
eg:function eg(a,b){this.a=a
this.b=b},
aB:function aB(){},
cj:function cj(){},
kz(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.aJ(r)
q=A.fF(String(s),null)
throw A.d(q)}q=A.fi(p)
return q},
fi(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.dr(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.fi(a[s])
return a},
hn(a,b,c){return new A.bI(a,b)},
k9(a){return a.cG()},
jJ(a,b){return new A.f5(a,[],A.kS())},
jK(a,b,c){var s,r=new A.aC(""),q=A.jJ(r,b)
q.ac(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
dr:function dr(a,b){this.a=a
this.b=b
this.c=null},
ds:function ds(a){this.a=a},
cH:function cH(){},
cK:function cK(){},
bI:function bI(a,b){this.a=a
this.b=b},
cX:function cX(a,b){this.a=a
this.b=b},
ec:function ec(){},
ee:function ee(a){this.b=a},
ed:function ed(a){this.a=a},
f6:function f6(){},
f7:function f7(a,b){this.a=a
this.b=b},
f5:function f5(a,b,c){this.c=a
this.a=b
this.b=c},
bu(a){var s=A.jq(a,null)
if(s!=null)return s
throw A.d(A.fF(a,null))},
j1(a,b){a=A.K(a,new Error())
if(a==null)a=A.aH(a)
a.stack=b.i(0)
throw a},
ho(a,b,c,d){var s,r=J.jb(a,d)
if(a!==0&&b!=null)for(s=0;s<a;++s)r[s]=b
return r},
jh(a,b,c){var s,r,q=A.h([],c.h("k<0>"))
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.a0)(a),++r)B.a.m(q,c.a(a[r]))
q.$flags=1
return q},
ay(a,b){var s,r=A.h([],b.h("k<0>"))
for(s=a.gp(a);s.l();)B.a.m(r,s.gn())
return r},
a5(a,b,c){return new A.be(a,A.hm(a,!1,b,c,!1,""))},
hu(a,b,c){var s=J.ae(b)
if(!s.l())return a
if(c.length===0){do a+=A.t(s.gn())
while(s.l())}else{a+=A.t(s.gn())
while(s.l())a=a+c+A.t(s.gn())}return a},
jy(){return A.bt(new Error())},
aw(a,b,c,d){var s=A.js(a,b,c,d,0,0,0,0,!1)
return new A.I(s==null?new A.dT(a,b,c,d,0,0,0,0).$0():s,0,!1)},
j_(){return new A.I(Date.now(),0,!1)},
j0(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
hi(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
cM(a){if(a>=10)return""+a
return"0"+a},
dU(a,b,c){return new A.B(a+1000*b+6e7*c)},
fE(a,b,c){var s,r,q
for(s=a.length,r=0;r<s;++r){q=a[r]
if(q.b===b)return q}throw A.d(A.by(b,"name","No enum value with that name"))},
cN(a){if(typeof a=="number"||A.fU(a)||a==null)return J.au(a)
if(typeof a=="string")return JSON.stringify(a)
return A.hs(a)},
j2(a,b){A.cB(a,"error",t.K)
A.cB(b,"stackTrace",t.l)
A.j1(a,b)},
cD(a){return new A.cC(a)},
bx(a,b){return new A.af(!1,null,b,a)},
by(a,b,c){return new A.af(!0,a,b,c)},
aA(a,b,c,d,e){return new A.bl(b,c,!0,a,d,"Invalid value")},
ju(a,b,c){if(0>a||a>c)throw A.d(A.aA(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.d(A.aA(b,a,c,"end",null))
return b}return c},
er(a,b){if(a<0)throw A.d(A.aA(a,0,null,b,null))
return a},
e9(a,b,c,d){return new A.cQ(b,!0,a,d,"Index out of range")},
di(a){return new A.c1(a)},
hx(a){return new A.dg(a)},
dc(a){return new A.c_(a)},
U(a){return new A.cJ(a)},
fF(a,b){return new A.dX(a,b)},
ja(a,b,c){var s,r
if(A.h0(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.h([],t.s)
B.a.m($.a_,a)
try{A.kx(a,s)}finally{if(0>=$.a_.length)return A.f($.a_,-1)
$.a_.pop()}r=A.hu(b,t.Y.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
fG(a,b,c){var s,r
if(A.h0(a))return b+"..."+c
s=new A.aC(b)
B.a.m($.a_,a)
try{r=s
r.a=A.hu(r.a,a,", ")}finally{if(0>=$.a_.length)return A.f($.a_,-1)
$.a_.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
kx(a,b){var s,r,q,p,o,n,m,l=a.gp(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.l())return
s=A.t(l.gn())
B.a.m(b,s)
k+=s.length+2;++j}if(!l.l()){if(j<=5)return
if(0>=b.length)return A.f(b,-1)
r=b.pop()
if(0>=b.length)return A.f(b,-1)
q=b.pop()}else{p=l.gn();++j
if(!l.l()){if(j<=4){B.a.m(b,A.t(p))
return}r=A.t(p)
if(0>=b.length)return A.f(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gn();++j
for(;l.l();p=o,o=n){n=l.gn();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.f(b,-1)
k-=b.pop().length+2;--j}B.a.m(b,"...")
return}}q=A.t(p)
r=A.t(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.f(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.m(b,m)
B.a.m(b,q)
B.a.m(b,r)},
hq(a,b,c,d){var s
if(B.h===c){s=B.c.gt(a)
b=J.aa(b)
return A.fM(A.aD(A.aD($.fA(),s),b))}if(B.h===d){s=B.c.gt(a)
b=J.aa(b)
c=J.aa(c)
return A.fM(A.aD(A.aD(A.aD($.fA(),s),b),c))}s=B.c.gt(a)
b=J.aa(b)
c=J.aa(c)
d=J.aa(d)
d=A.fM(A.aD(A.aD(A.aD(A.aD($.fA(),s),b),c),d))
return d},
dT:function dT(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
I:function I(a,b,c){this.a=a
this.b=b
this.c=c},
B:function B(a){this.a=a},
dm:function dm(){},
u:function u(){},
cC:function cC(a){this.a=a},
as:function as(){},
af:function af(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bl:function bl(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
cQ:function cQ(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
c1:function c1(a){this.a=a},
dg:function dg(a){this.a=a},
c_:function c_(a){this.a=a},
cJ:function cJ(a){this.a=a},
d6:function d6(){},
bZ:function bZ(){},
eT:function eT(a){this.a=a},
dX:function dX(a,b){this.a=a
this.b=b},
b:function b(){},
y:function y(a,b,c){this.a=a
this.b=b
this.$ti=c},
M:function M(){},
i:function i(){},
dy:function dy(){},
aC:function aC(a){this.a=a},
j5(a,b){return A.hN(new v.G.Promise(A.hS(new A.e_(a))))},
e_:function e_(a){this.a=a},
dY:function dY(a){this.a=a},
dZ:function dZ(a){this.a=a},
dq:function dq(a){this.a=a},
cE:function cE(a,b){this.a=a
this.b=b},
V:function V(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
e7:function e7(a){this.a=a},
e8:function e8(){},
dM:function dM(){},
dN:function dN(){},
bc:function bc(a,b){this.a=a
this.b=b},
cL:function cL(a,b){this.a=a
this.b=b},
dS:function dS(a){this.a=a
this.b=null},
ek:function ek(a){this.a=a},
aM:function aM(a,b,c){this.a=a
this.b=b
this.c=c},
dJ:function dJ(){},
dK:function dK(){},
dL:function dL(){},
eH:function eH(){},
eL:function eL(){},
eM:function eM(){},
eI:function eI(){},
eJ:function eJ(){},
eK:function eK(){},
el:function el(a){this.a=a},
d7:function d7(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.e=d
_.f=e},
lc(a){var s=a.e
if(s&&a.f==null)return B.aP
if(!s&&a.f!=null)return B.aQ
return null},
bU:function bU(a){this.a=a},
bm:function bm(a,b,c){this.a=a
this.b=b
this.c=c},
eu:function eu(a,b){this.a=a
this.b=b},
ev:function ev(a){this.a=a},
ex:function ex(a,b,c){var _=this
_.a=a
_.b=b
_.c=null
_.d=c},
ey:function ey(a){this.a=a},
aL:function aL(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cP:function cP(a,b,c){this.a=a
this.b=b
this.c=c},
e3:function e3(){},
e4:function e4(){},
e5:function e5(a){this.a=a},
e6:function e6(){},
ac:function ac(a,b){this.a=a
this.b=b},
ak:function ak(a,b){this.a=a
this.b=b},
eh:function eh(a,b){this.a=a
this.c=b},
lb(a){if(a.a===B.G&&B.b.V(a.c).length===0)return B.a2
return null},
ei:function ei(){},
ew:function ew(){},
es:function es(){},
et:function et(){},
ea:function ea(){},
dO:function dO(a){this.a=a
this.b=null},
bw:function bw(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dW:function dW(){},
ar:function ar(a,b){this.a=a
this.b=b},
a2:function a2(a){this.c=a},
ez:function ez(a){this.b=a},
eA:function eA(){},
eB:function eB(){},
cO:function cO(a){this.a=a},
eE:function eE(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
eF:function eF(){},
eG:function eG(){},
aV:function aV(a,b){this.a=a
this.b=b},
aS:function aS(a,b){this.a=a
this.b=b},
r:function r(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
jj(){var s,r=A.bM(t.N,t.h),q=0
for(;q<19;++q){s=$.jk[q]
r.B(0,s.a,s)}return new A.em(r)},
em:function em(a){this.a=a},
b1:function b1(a,b){this.a=a
this.b=b},
en:function en(a,b){this.a=a
this.b=b},
eo:function eo(a,b){this.a=a
this.b=b},
ep:function ep(){},
eq:function eq(){},
eC:function eC(){},
bY:function bY(a,b){this.a=a
this.b=b},
Q:function Q(a,b,c){this.a=a
this.b=b
this.c=c},
dP:function dP(){},
c2:function c2(a,b){this.a=a
this.b=b},
dR:function dR(a,b){this.a=a
this.b=b},
dQ:function dQ(){},
ai:function ai(a){this.a=a},
dV:function dV(){},
b9:function b9(a,b){this.a=a
this.b=b},
i2(a){var s,r,q,p=A.aw(2026,1,1,8),o=A.h([],t.c)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.a0)(a),++r){q=a[r]
o.push(new A.bw(0,0,q.b,p.D(1000*q.a)))}return o},
i4(a){var s,r,q=A.aw(2026,1,1,8),p=A.h([new A.aL(0,0,9,q.D(-15e4))],t.G)
for(s=0;s<8;++s){r=q.D(1000*a[s])
B.a.m(p,new A.aL(0,0,9,r.D(-12e4)))
B.a.m(p,new A.aL(0,0,13,r))}return p},
cw(a,b){return A.kb(a,b)},
kb(c0,c1){var s=0,r=A.cz(t.f),q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9
var $async$cw=A.cA(function(c3,c4){if(c3===1)return A.ct(c4,r)
for(;;)switch(s){case 0:case 3:switch(c0){case"vision.expiry":s=5
break
case"vision.color":s=6
break
case"vision.contrast":s=7
break
case"hearing.summarize":s=8
break
case"hearing.captions":s=9
break
case"hearing.alert":s=10
break
case"safety.scam":s=11
break
case"safety.fall":s=12
break
case"safety.checkIn":s=13
break
case"safety.checkInStatus":s=14
break
case"safety.sosStart":s=15
break
case"safety.sosCancel":s=16
break
case"safety.sosState":s=17
break
case"family.pairing":s=18
break
case"family.addEvent":s=19
break
case"family.status":s=20
break
case"family.notification":s=21
break
case"speech.board":s=22
break
case"speech.use":s=23
break
case"speech.sentence":s=24
break
case"reading.split":s=25
break
case"reading.review":s=26
break
case"reading.time":s=27
break
case"memory.addPerson":s=28
break
case"memory.addReminder":s=29
break
case"memory.dueReminders":s=30
break
case"memory.routine":s=31
break
case"mobility.gait":s=32
break
case"mobility.profile":s=33
break
case"mobility.breaks":s=34
break
default:s=4
break}break
case 5:n=$.iC().cm(A.n(c1.j(0,"text"))).a
if(n==null){q=A.l(["found",!1],t.N,t.X)
s=1
break}q=A.l(["found",!0,"date",""+A.aU(n)+"-"+B.b.aa(B.c.i(A.aT(n)),2,"0")+"-"+B.b.aa(B.c.i(A.az(n)),2,"0")],t.N,t.X)
s=1
break
case 6:q=A.l(["name",$.iB().ck(new A.Q(A.G(c1.j(0,"r")),A.G(c1.j(0,"g")),A.G(c1.j(0,"b"))))],t.N,t.X)
s=1
break
case 7:m=new A.Q(A.G(c1.j(0,"r")),A.G(c1.j(0,"g")),A.G(c1.j(0,"b")))
l=B.t.b6(m,B.M)
k=B.t.b6(m,B.L)
q=A.l(["whiteRatio",B.e.ab(l.a,2),"whitePass",l.bb(B.p),"blackRatio",B.e.ab(k.a,2),"blackPass",k.bb(B.p)],t.N,t.X)
s=1
break
case 8:q=A.l(["sentences",$.iJ().bj(A.n(c1.j(0,"text")),3)],t.N,t.X)
s=1
break
case 9:q=A.l(["lines",B.S.cA(A.n(c1.j(0,"text")),32)],t.N,t.X)
s=1
break
case 10:$.iz()
j=B.aE.j(0,A.n(c1.j(0,"label")))
if(j==null)j=B.P
q=A.l(["pattern",j.a,"flash",j.b,"severity",j.c.b],t.N,t.X)
s=1
break
case 11:q=A.l(["reason",B.a6.bS(A.n(c1.j(0,"text"))).gcn()],t.N,t.X)
s=1
break
case 12:q=A.l(["detected",B.U.c4(J.a9(c1.j(0,"preset"),"fall")?$.iD():$.iH())!=null],t.N,t.X)
s=1
break
case 13:n=$.h6()
n.b=n.a.$0()
q=A.l(["overdue",n.ba(B.y)],t.N,t.X)
s=1
break
case 14:q=A.l(["overdue",$.h6().ba(B.y)],t.N,t.X)
s=1
break
case 15:n=$.fC()
i=n.c
if(i===B.l){q=A.fn()
s=1
break}if(i!==B.n){n.c=B.n
n.d=null}n.a_("Lumen SOS: help needed.",B.au)
q=A.fn()
s=1
break
case 16:$.fC().bV()
s=35
return A.dB(A.hj(B.m,t.H),$async$cw)
case 35:q=A.fn()
s=1
break
case 17:q=A.fn()
s=1
break
case 18:n=$.iF()
i=Date.now()
h=B.b.aa(B.c.i(n.a.cl(1e6)),6,"0")
new A.I(i,0,!1).D(6e8)
q=A.l(["code",h,"minutes",10],t.N,t.X)
s=1
break
case 19:g=A.fR(c1.j(0,"minutes"))
if(g==null)g=0
f=new A.I(Date.now(),0,!1).D(A.dU(0,0,g).a)
n=$.iA()
i=$.hX
$.hX=i+1
s=36
return A.dB(n.m(0,new A.V("event-"+i,A.n(c1.j(0,"title")),f,f.D(18e8),null,B.x)),$async$cw)
case 36:b9=$
s=37
return A.dB(n.aC(new A.I(Date.now(),0,!1).D(-864e8),new A.I(Date.now(),0,!1).D(2592e9)),$async$cw)
case 37:b9.fS=c4
n=A.h([],t.p)
for(i=J.ae($.fS),e=t.N;i.l();){d=i.gn()
n.push(A.l(["title",d.b,"start",d.c.i(0)],e,e))}q=A.l(["events",n],e,t.X)
s=1
break
case 20:c=A.ff(c1.j(0,"value"))
if(c==="ok")$.dG().aI(B.a9)
if(c==="attention")$.dG().aI(B.aa)
q=A.l(["status",$.dG().aK().b],t.N,t.X)
s=1
break
case 21:b=new A.I(Date.now(),0,!1)
q=A.l(["text",B.T.c_(new A.cL(A.aw(A.aU(b),A.aT(b),A.az(b),0),$.dG().aK()),$.fS)],t.N,t.X)
s=1
break
case 22:n=$.fB().a
i=A.z(n).h("ao<2>")
n=A.ay(new A.ao(n,i),i.h("b.E"))
n.$flags=1
a=n
B.a.W(a,new A.fj())
n=A.h([],t.p)
for(i=a.length,e=t.N,a0=0;a0<i;++a0){a1=a[a0]
n.push(A.l(["id",a1.a,"text",a1.c,"category",a1.d.b],e,e))}q=A.l(["phrases",n],e,t.X)
s=1
break
case 23:n=$.iL()
i=A.n(c1.j(0,"id"))
e=n.b
a2=e.j(0,i)
d=a2==null?null:a2.a
if(d==null)d=0
e.B(0,i,new A.b1(d+1,n.a.$0()))
a3=n.cu(3)
n=A.h([],t.p)
for(i=a3.length,e=t.N,a0=0;a0<a3.length;a3.length===i||(0,A.a0)(a3),++a0){a4=a3[a0]
a5=$.fB().a.j(0,a4)
if(a5!=null)n.push(A.l(["id",a5.a,"text",a5.c],e,e))}q=A.l(["suggestions",n],e,t.X)
s=1
break
case 24:n=A.h([],t.cv)
for(i=t.N,e=J.iO(t.j.a(c1.j(0,"ids")),i),d=e.$ti,e=new A.ap(e,e.gk(0),d.h("ap<m.E>")),d=d.h("m.E");e.l();){a6=e.d
if(a6==null)a6=d.a(a6)
n.push($.fB().a.j(0,a6))}e=t.aS
a=A.ay(new A.c3(n,e),e.h("b.E"))
q=A.l(["text",B.a7.bZ(a,B.bF)],i,t.X)
s=1
break
case 25:a7=B.b.N(B.b.V(A.n(c1.j(0,"text"))),A.a5("\\s+",!0,!1))
n=A.J(a7)
q=A.l(["text",new A.aq(new A.T(a7,n.h("E(1)").a(new A.fk()),n.h("T<1>")),n.h("c(1)").a(new A.fl()),n.h("aq<1,c>")).S(0," ")],t.N,t.X)
s=1
break
case 26:n=A.G(c1.j(0,"quality"))
i=A.G(c1.j(0,"repetitionCount"))
e=A.G(c1.j(0,"intervalDays"))
d=A.dA(c1.j(0,"easinessFactor"))
a8=1
if(n<3)a9=0
else{a9=i+1
if(!(a9===1))a8=a9===2?6:B.e.cq(e*d)}b0=5-n
b1=d+(0.1-b0*(0.08+b0*0.02))
if(b1<1.3)b1=1.3
q=A.l(["repetitionCount",a9,"intervalDays",a8,"easinessFactor",b1,"easeLabel",B.e.ab(b1,2)],t.N,t.X)
s=1
break
case 27:q=A.l(["minutes",B.a4.cc(A.n(c1.j(0,"text")))],t.N,t.X)
s=1
break
case 28:p=A.hM(c1.j(0,"consent"))
try{n=$.h7()
i=$.hY
$.hY=i+1
i="person-"+i
e=A.n(c1.j(0,"name"))
d=A.n(c1.j(0,"relationship"))
a6=p?new A.I(Date.now(),0,!1):null
a6=new A.d7(i,e,d,p,a6)
b2=A.lc(a6)
if(b2!=null)A.b8(b2)
n.a.B(0,i,a6)
n=A.l(["ok",!0,"people",A.i_()],t.N,t.X)
q=n
s=1
break}catch(c2){n=A.aJ(c2)
if(n instanceof A.bU){o=n
q=A.l(["ok",!1,"message",o.a,"people",A.i_()],t.N,t.X)
s=1
break}else throw c2}s=4
break
case 29:n=$.h8()
i=$.hZ
$.hZ=i+1
i="reminder-"+i
e=A.n(c1.j(0,"title"))
d=Date.now()
a6=A.fR(c1.j(0,"minutes"))
n.b.B(0,i,new A.bm(i,e,new A.I(d,0,!1).D(A.dU(0,0,a6==null?0:a6).a)))
q=A.l(["due",A.hP()],t.N,t.X)
s=1
break
case 30:q=A.l(["due",A.hP()],t.N,t.X)
s=1
break
case 31:b4=A.ff(c1.j(0,"step"))
if(b4!=null)if(J.a9(c1.j(0,"done"),!0))$.dH().ci(b4)
else{n=$.dH()
n.a7()
n.d.cp(0,b4)}n=A.h([],t.s)
for(a0=0;a0<2;++a0){b5=B.E[a0]
i=$.dH()
e=i.b.$0()
b6=A.aw(A.aU(e),A.aT(e),A.az(e),0)
if(!J.a9(i.c,b6)){i.c=b6
i.d.bX(0)}if(i.d.C(0,b5))n.push(b5)}i=$.dH()
e=i.co()
i.a7()
q=A.l(["done",n,"remaining",e,"complete",i.d.a===2],t.N,t.X)
s=1
break
case 32:b7=B.V.bR(J.a9(c1.j(0,"preset"),"unsteady")?$.iK():$.iI())
q=A.l(["steps",b7.a,"cadence",B.e.ab(b7.b,0),"irregular",b7.c],t.N,t.X)
s=1
break
case 33:n=A.fE(B.as,A.n(c1.j(0,"aid")),t.bv)
A.fE(B.D,A.n(c1.j(0,"verbosity")),t.u)
i=t.N
e=t.X
q=A.lb(new A.eh(n,A.n(c1.j(0,"notes"))))==null?A.l(["ok",!0],i,e):A.l(["ok",!1,"message",'A profile with aidType "other" must describe the aid in notes.'],i,e)
s=1
break
case 34:b8=B.a5.bT(A.dU(0,0,A.G(c1.j(0,"minutes"))),A.fE(B.D,A.n(c1.j(0,"verbosity")),t.u))
n=A.h([],t.t)
for(i=b8.length,a0=0;a0<b8.length;b8.length===i||(0,A.a0)(b8),++a0)n.push(B.c.E(b8[a0].a,6e7))
q=A.l(["minutes",n],t.N,t.X)
s=1
break
case 4:throw A.d(A.by(c0,"tool","Unknown demo tool"))
case 1:return A.cu(q,r)}})
return A.cv($async$cw,r)},
fn(){return A.l(["state",$.fC().c.b,"sent",$.h9().a.length],t.N,t.X)},
i_(){var s,r,q,p,o=A.h([],t.aX),n=$.h7().a,m=A.z(n).h("ao<2>")
n=A.ay(new A.ao(n,m),m.h("b.E"))
n.$flags=1
n=n
m=n.length
s=t.N
r=t.X
q=0
for(;q<n.length;n.length===m||(0,A.a0)(n),++q){p=n[q]
o.push(A.l(["name",p.b,"relationship",p.c,"consentGiven",p.e],s,r))}return o},
hP(){var s,r,q,p=A.h([],t.s)
for(s=$.h8().c5(),r=s.length,q=0;q<s.length;s.length===r||(0,A.a0)(s),++q)p.push(s[q].b)
return p},
l6(){v.G.lumenCall=A.hS(new A.fy())},
fj:function fj(){},
fk:function fk(){},
fl:function fl(){},
fy:function fy(){},
fx:function fx(){},
ic(a){return v.mangledGlobalNames[a]},
l9(a){throw A.K(new A.cY("Field '"+a+"' has been assigned during initialization."),new Error())},
hS(a){var s
if(typeof a=="function")throw A.d(A.bx("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d,e){return b(c,d,e,arguments.length)}}(A.k8,a)
s[$.h4()]=a
return s},
k8(a,b,c,d){t.Z.a(a)
A.G(d)
if(d>=2)return a.$2(b,c)
if(d===1)return a.$1(b)
return a.$0()},
kP(a,b,c){var s,r
if(b==null)return c.a(new a())
if(b instanceof Array)switch(b.length){case 0:return c.a(new a())
case 1:return c.a(new a(b[0]))
case 2:return c.a(new a(b[0],b[1]))
case 3:return c.a(new a(b[0],b[1],b[2]))
case 4:return c.a(new a(b[0],b[1],b[2],b[3]))}s=[null]
B.a.b2(s,b)
r=a.bind.apply(a,s)
String(r)
return c.a(new r())}},B={}
var w=[A,J,B]
var $={}
A.fH.prototype={}
J.cR.prototype={
L(a,b){return a===b},
gt(a){return A.bV(a)},
i(a){return"Instance of '"+A.d9(a)+"'"},
gv(a){return A.b4(A.fT(this))}}
J.cU.prototype={
i(a){return String(a)},
gt(a){return a?519018:218159},
gv(a){return A.b4(t.y)},
$iq:1,
$iE:1}
J.bG.prototype={
L(a,b){return null==b},
i(a){return"null"},
gt(a){return 0},
$iq:1}
J.A.prototype={$ix:1}
J.ax.prototype={
gt(a){return 0},
i(a){return String(a)}}
J.d8.prototype={}
J.aW.prototype={}
J.X.prototype={
i(a){var s=a[$.ie()]
if(s==null)s=a[$.h4()]
if(s==null)return this.bl(a)
return"JavaScript function for "+J.au(s)},
$iaP:1}
J.bf.prototype={
gt(a){return 0},
i(a){return String(a)}}
J.bg.prototype={
gt(a){return 0},
i(a){return String(a)}}
J.k.prototype={
a8(a,b){return new A.ag(a,A.J(a).h("@<1>").q(b).h("ag<1,2>"))},
m(a,b){A.J(a).c.a(b)
a.$flags&1&&A.dF(a,29)
a.push(b)},
b2(a,b){var s
A.J(a).h("b<1>").a(b)
a.$flags&1&&A.dF(a,"addAll",2)
if(Array.isArray(b)){this.bp(a,b)
return}for(s=J.ae(b);s.l();)a.push(s.gn())},
bp(a,b){var s,r
t.r.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.d(A.U(a))
for(r=0;r<s;++r)a.push(b[r])},
aE(a,b,c){var s=A.J(a)
return new A.L(a,s.q(c).h("1(2)").a(b),s.h("@<1>").q(c).h("L<1,2>"))},
S(a,b){var s,r=A.ho(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.B(r,s,A.t(a[s]))
return r.join(b)},
aF(a,b){var s,r,q
A.J(a).h("1(1,1)").a(b)
s=a.length
if(s===0)throw A.d(A.cS())
if(0>=s)return A.f(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.d(A.U(a))}return r},
A(a,b){if(!(b>=0&&b<a.length))return A.f(a,b)
return a[b]},
gaw(a){if(a.length>0)return a[0]
throw A.d(A.cS())},
gcg(a){var s=a.length
if(s>0)return a[s-1]
throw A.d(A.cS())},
T(a,b){var s,r
A.J(a).h("E(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.d(A.U(a))}return!1},
W(a,b){var s,r,q,p,o,n=A.J(a)
n.h("a(1,1)?").a(b)
a.$flags&2&&A.dF(a,"sort")
s=a.length
if(s<2)return
if(b==null)b=J.kl()
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.cE()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.dD(b,2))
if(p>0)this.bI(a,p)},
bh(a){return this.W(a,null)},
bI(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
C(a,b){var s
for(s=0;s<a.length;++s)if(J.a9(a[s],b))return!0
return!1},
gu(a){return a.length===0},
gK(a){return a.length!==0},
i(a){return A.fG(a,"[","]")},
gp(a){return new J.aN(a,a.length,A.J(a).h("aN<1>"))},
gt(a){return A.bV(a)},
gk(a){return a.length},
j(a,b){if(!(b>=0&&b<a.length))throw A.d(A.fp(a,b))
return a[b]},
B(a,b,c){A.J(a).c.a(c)
a.$flags&2&&A.dF(a)
if(!(b>=0&&b<a.length))throw A.d(A.fp(a,b))
a[b]=c},
$ie:1,
$ib:1,
$ij:1}
J.cT.prototype={
cw(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.d9(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.eb.prototype={}
J.aN.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
l(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.a0(q)
throw A.d(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iv:1}
J.bd.prototype={
F(a,b){var s
A.dA(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.ga9(b)
if(this.ga9(a)===s)return 0
if(this.ga9(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
ga9(a){return a===0?1/a<0:a<0},
bW(a){var s,r
if(a>=0){if(a<=2147483647){s=a|0
return a===s?s:s+1}}else if(a>=-2147483648)return a|0
r=Math.ceil(a)
if(isFinite(r))return r
throw A.d(A.di(""+a+".ceil()"))},
cq(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.d(A.di(""+a+".round()"))},
ab(a,b){var s
if(b>20)throw A.d(A.aA(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.ga9(a))return"-"+s
return s},
i(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gt(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
ad(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
E(a,b){return(a|0)===a?a/b|0:this.bQ(a,b)},
bQ(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.d(A.di("Result of truncating division is "+A.t(s)+": "+A.t(a)+" ~/ "+b))},
aY(a,b){var s
if(a>0)s=this.bN(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
bN(a,b){return b>31?0:a>>>b},
gv(a){return A.b4(t.q)},
$iW:1,
$io:1,
$ip:1}
J.bF.prototype={
gv(a){return A.b4(t.S)},
$iq:1,
$ia:1}
J.cV.prototype={
gv(a){return A.b4(t.i)},
$iq:1}
J.al.prototype={
b3(a,b){return new A.dw(b,a,0)},
c9(a,b){var s,r
A.n(b)
s=b.length
r=a.length
if(s>r)return!1
return b===this.O(a,r-s)},
N(a,b){var s
if(typeof b=="string")return A.h(a.split(b),t.s)
else{if(b instanceof A.be){s=b.e
s=!(s==null?b.e=b.bt():s)}else s=!1
if(s)return A.h(a.split(b.b),t.s)
else return this.bw(a,b)}},
bw(a,b){var s,r,q,p,o,n,m=A.h([],t.s)
for(s=J.ha(b,a),s=s.gp(s),r=0,q=1;s.l();){p=s.gn()
o=p.gaJ()
n=p.gav()
q=n-o
if(q===0&&r===o)continue
B.a.m(m,this.J(a,r,o))
r=n}if(r<a.length||q>0)B.a.m(m,this.O(a,r))
return m},
bi(a,b){var s=b.length
if(s>a.length)return!1
return b===a.substring(0,s)},
J(a,b,c){return a.substring(b,A.ju(b,c,a.length))},
O(a,b){return this.J(a,b,null)},
V(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.f(p,0)
if(p.charCodeAt(0)===133){s=J.je(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.f(p,r)
q=p.charCodeAt(r)===133?J.jf(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
bf(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.d(B.a3)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
aa(a,b,c){var s=b-a.length
if(s<=0)return a
return this.bf(c,s)+a},
b7(a,b,c){var s
t.E.a(b)
s=a.length
if(c>s)throw A.d(A.aA(c,0,s,null,null))
return A.h3(a,b,c)},
C(a,b){return this.b7(a,b,0)},
F(a,b){var s
A.n(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
i(a){return a},
gt(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gv(a){return A.b4(t.N)},
gk(a){return a.length},
$iq:1,
$iW:1,
$ibj:1,
$ic:1}
A.aE.prototype={
gp(a){return new A.bz(J.ae(this.gR()),A.z(this).h("bz<1,2>"))},
gk(a){return J.aK(this.gR())},
gu(a){return J.hb(this.gR())},
gK(a){return J.iQ(this.gR())},
A(a,b){return A.z(this).y[1].a(J.dI(this.gR(),b))},
i(a){return J.au(this.gR())}}
A.bz.prototype={
l(){return this.a.l()},
gn(){return this.$ti.y[1].a(this.a.gn())},
$iv:1}
A.aO.prototype={
gR(){return this.a}}
A.c8.prototype={$ie:1}
A.c7.prototype={
j(a,b){return this.$ti.y[1].a(J.iM(this.a,b))},
$ie:1,
$ij:1}
A.ag.prototype={
a8(a,b){return new A.ag(this.a,this.$ti.h("@<1>").q(b).h("ag<1,2>"))},
gR(){return this.a}}
A.cY.prototype={
i(a){return"LateInitializationError: "+this.a}}
A.eD.prototype={}
A.e.prototype={}
A.F.prototype={
gp(a){var s=this
return new A.ap(s,s.gk(s),A.z(s).h("ap<F.E>"))},
gu(a){return this.gk(this)===0},
S(a,b){var s,r,q,p=this,o=p.gk(p)
if(b.length!==0){if(o===0)return""
s=A.t(p.A(0,0))
if(o!==p.gk(p))throw A.d(A.U(p))
for(r=s,q=1;q<o;++q){r=r+b+A.t(p.A(0,q))
if(o!==p.gk(p))throw A.d(A.U(p))}return r.charCodeAt(0)==0?r:r}else{for(q=0,r="";q<o;++q){r+=A.t(p.A(0,q))
if(o!==p.gk(p))throw A.d(A.U(p))}return r.charCodeAt(0)==0?r:r}},
aF(a,b){var s,r,q,p=this
A.z(p).h("F.E(F.E,F.E)").a(b)
s=p.gk(p)
if(s===0)throw A.d(A.cS())
r=p.A(0,0)
for(q=1;q<s;++q){r=b.$2(r,p.A(0,q))
if(s!==p.gk(p))throw A.d(A.U(p))}return r}}
A.c0.prototype={
gby(){var s=J.aK(this.a),r=this.c
if(r>s)return s
return r},
gbP(){var s=J.aK(this.a),r=this.b
if(r>s)return s
return r},
gk(a){var s,r=J.aK(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s>=r)return r-q
return s-q},
A(a,b){var s=this,r=s.gbP()+b
if(b<0||r>=s.gby())throw A.d(A.e9(b,s.gk(0),s,"index"))
return J.dI(s.a,r)}}
A.ap.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
l(){var s,r=this,q=r.a,p=J.bs(q),o=p.gk(q)
if(r.b!==o)throw A.d(A.U(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.A(q,s);++r.c
return!0},
$iv:1}
A.aq.prototype={
gp(a){return new A.bN(J.ae(this.a),this.b,A.z(this).h("bN<1,2>"))},
gk(a){return J.aK(this.a)},
gu(a){return J.hb(this.a)},
A(a,b){return this.b.$1(J.dI(this.a,b))}}
A.bC.prototype={$ie:1}
A.bN.prototype={
l(){var s=this,r=s.b
if(r.l()){s.a=s.c.$1(r.gn())
return!0}s.a=null
return!1},
gn(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iv:1}
A.L.prototype={
gk(a){return J.aK(this.a)},
A(a,b){return this.b.$1(J.dI(this.a,b))}}
A.T.prototype={
gp(a){return new A.a7(J.ae(this.a),this.b,this.$ti.h("a7<1>"))}}
A.a7.prototype={
l(){var s,r
for(s=this.a,r=this.b;s.l();)if(r.$1(s.gn()))return!0
return!1},
gn(){return this.a.gn()},
$iv:1}
A.c3.prototype={
gp(a){return new A.c4(J.ae(this.a),this.$ti.h("c4<1>"))}}
A.c4.prototype={
l(){var s,r
for(s=this.a,r=this.$ti.c;s.l();)if(r.b(s.gn()))return!0
return!1},
gn(){return this.$ti.c.a(this.a.gn())},
$iv:1}
A.S.prototype={}
A.cs.prototype={}
A.D.prototype={$r:"+(1,2)",$s:1}
A.ch.prototype={$r:"+index,score(1,2)",$s:2}
A.ci.prototype={$r:"+message,recipients(1,2)",$s:3}
A.bb.prototype={
gu(a){return this.gk(this)===0},
i(a){return A.fK(this)},
gb8(){return new A.bo(this.ca(),A.z(this).h("bo<y<1,2>>"))},
ca(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$gb8(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.gH(),o=o.gp(o),n=A.z(s),m=n.y[1],n=n.h("y<1,2>")
case 2:if(!o.l()){r=3
break}l=o.gn()
k=s.j(0,l)
r=4
return a.b=new A.y(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$iO:1}
A.ah.prototype={
gk(a){return this.b.length},
gaT(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
c1(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
j(a,b){if(!this.c1(b))return null
return this.b[this.a[b]]},
M(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gaT()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gH(){return new A.c9(this.gaT(),this.$ti.h("c9<1>"))}}
A.c9.prototype={
gk(a){return this.a.length},
gu(a){return 0===this.a.length},
gK(a){return 0!==this.a.length},
gp(a){var s=this.a
return new A.aZ(s,s.length,this.$ti.h("aZ<1>"))}}
A.aZ.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
l(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iv:1}
A.bE.prototype={
a4(){var s=this,r=s.$map
if(r==null){r=new A.bH(s.$ti.h("bH<1,2>"))
A.i8(s.a,r)
s.$map=r}return r},
j(a,b){return this.a4().j(0,b)},
M(a,b){this.$ti.h("~(1,2)").a(b)
this.a4().M(0,b)},
gH(){var s=this.a4()
return new A.an(s,A.z(s).h("an<1>"))},
gk(a){return this.a4().a}}
A.bA.prototype={}
A.bB.prototype={
gk(a){return this.b},
gu(a){return this.b===0},
gK(a){return this.b!==0},
gp(a){var s,r=this,q=r.$keys
if(q==null){q=Object.keys(r.a)
r.$keys=q}s=q
return new A.aZ(s,s.length,r.$ti.h("aZ<1>"))},
C(a,b){if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)}}
A.bX.prototype={}
A.eN.prototype={
I(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
if(p==null)return null
s=Object.create(null)
r=q.b
if(r!==-1)s.arguments=p[r+1]
r=q.c
if(r!==-1)s.argumentsExpr=p[r+1]
r=q.d
if(r!==-1)s.expr=p[r+1]
r=q.e
if(r!==-1)s.method=p[r+1]
r=q.f
if(r!==-1)s.receiver=p[r+1]
return s}}
A.bT.prototype={
i(a){return"Null check operator used on a null value"}}
A.cW.prototype={
i(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.dh.prototype={
i(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.ej.prototype={
i(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.bD.prototype={}
A.ck.prototype={
i(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ia3:1}
A.av.prototype={
i(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.id(r==null?"unknown":r)+"'"},
$iaP:1,
gcD(){return this},
$C:"$1",
$R:1,
$D:null}
A.cF.prototype={$C:"$0",$R:0}
A.cG.prototype={$C:"$2",$R:2}
A.df.prototype={}
A.dd.prototype={
i(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.id(s)+"'"}}
A.ba.prototype={
L(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.ba))return!1
return this.$_target===b.$_target&&this.a===b.a},
gt(a){return(A.h2(this.a)^A.bV(this.$_target))>>>0},
i(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.d9(this.a)+"'")}}
A.da.prototype={
i(a){return"RuntimeError: "+this.a}}
A.am.prototype={
gk(a){return this.a},
gu(a){return this.a===0},
gH(){return new A.an(this,A.z(this).h("an<1>"))},
j(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.ce(b)},
ce(a){var s,r,q=this.d
if(q==null)return null
s=this.bC(q,a)
r=this.aA(s,a)
if(r<0)return null
return s[r].b},
B(a,b,c){var s,r,q,p,o,n,m=this,l=A.z(m)
l.c.a(b)
l.y[1].a(c)
if(typeof b=="string"){s=m.b
m.aL(s==null?m.b=m.an():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=m.c
m.aL(r==null?m.c=m.an():r,b,c)}else{q=m.d
if(q==null)q=m.d=m.an()
p=m.az(b)
o=q[p]
if(o==null)q[p]=[m.af(b,c)]
else{n=m.aA(o,b)
if(n>=0)o[n].b=c
else o.push(m.af(b,c))}}},
M(a,b){var s,r,q=this
A.z(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.d(A.U(q))
s=s.c}},
aL(a,b,c){var s,r=A.z(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.af(b,c)
else s.b=c},
af(a,b){var s=this,r=A.z(s),q=new A.ef(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else s.f=s.f.c=q;++s.a
s.r=s.r+1&1073741823
return q},
az(a){return J.aa(a)&1073741823},
bC(a,b){return a[this.az(b)]},
aA(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.a9(a[r].a,b))return r
return-1},
i(a){return A.fK(this)},
an(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ifJ:1}
A.ef.prototype={}
A.an.prototype={
gk(a){return this.a.a},
gu(a){return this.a.a===0},
gp(a){var s=this.a
return new A.bL(s,s.r,s.e,this.$ti.h("bL<1>"))}}
A.bL.prototype={
gn(){return this.d},
l(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.d(A.U(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iv:1}
A.ao.prototype={
gk(a){return this.a.a},
gu(a){return this.a.a===0},
gp(a){var s=this.a
return new A.aQ(s,s.r,s.e,this.$ti.h("aQ<1>"))}}
A.aQ.prototype={
gn(){return this.d},
l(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.d(A.U(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iv:1}
A.bJ.prototype={
gk(a){return this.a.a},
gu(a){return this.a.a===0},
gp(a){var s=this.a
return new A.bK(s,s.r,s.e,this.$ti.h("bK<1,2>"))}}
A.bK.prototype={
gn(){var s=this.d
s.toString
return s},
l(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.d(A.U(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.y(s.a,s.b,r.$ti.h("y<1,2>"))
r.c=s.c
return!0}},
$iv:1}
A.bH.prototype={
az(a){return A.kQ(a)&1073741823},
aA(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.a9(a[r].a,b))return r
return-1}}
A.ft.prototype={
$1(a){return this.a(a)},
$S:3}
A.fu.prototype={
$2(a,b){return this.a(a,b)},
$S:23}
A.fv.prototype={
$1(a){return this.a(A.n(a))},
$S:29}
A.ad.prototype={
i(a){return this.b_(!1)},
b_(a){var s,r,q,p,o,n=this.bA(),m=this.aR(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.f(m,q)
o=m[q]
l=a?l+A.hs(o):l+A.t(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
bA(){var s,r=this.$s
while($.f8.length<=r)B.a.m($.f8,null)
s=$.f8[r]
if(s==null){s=this.bs()
B.a.B($.f8,r,s)}return s},
bs(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=t.K,j=J.hk(l,k)
for(s=0;s<l;++s)j[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.B(j,q,r[s])}}j=A.jh(j,!1,k)
j.$flags=3
return j}}
A.aF.prototype={
aR(){return[this.a,this.b]},
L(a,b){if(b==null)return!1
return b instanceof A.aF&&this.$s===b.$s&&J.a9(this.a,b.a)&&J.a9(this.b,b.b)},
gt(a){return A.hq(this.$s,this.a,this.b,B.h)}}
A.be.prototype={
i(a){return"RegExp/"+this.a+"/"+this.b.flags},
gbE(){var s=this,r=s.c
if(r!=null)return r
r=s.b
return s.c=A.hm(s.a,r.multiline,!r.ignoreCase,r.unicode,r.dotAll,"g")},
bt(){var s,r=this.a
if(!B.b.C(r,"("))return!1
s=this.b.unicode?"u":""
return new RegExp("(?:)|"+r,s).exec("").length>1},
U(a){var s=this.b.exec(a)
if(s==null)return null
return new A.cc(s)},
b3(a,b){return new A.dj(this,b,0)},
bz(a,b){var s,r=this.gbE()
if(r==null)r=A.aH(r)
r.lastIndex=b
s=r.exec(a)
if(s==null)return null
return new A.cc(s)},
$ibj:1,
$ijv:1}
A.cc.prototype={
gaJ(){return this.b.index},
gav(){var s=this.b
return s.index+s[0].length},
$ibh:1,
$ibW:1}
A.dj.prototype={
gp(a){return new A.dk(this.a,this.b,this.c)}}
A.dk.prototype={
gn(){var s=this.d
return s==null?t.cz.a(s):s},
l(){var s,r,q,p,o,n,m=this,l=m.b
if(l==null)return!1
s=m.c
r=l.length
if(s<=r){q=m.a
p=q.bz(l,s)
if(p!=null){m.d=p
o=p.gav()
if(p.b.index===o){s=!1
if(q.b.unicode){q=m.c
n=q+1
if(n<r){if(!(q>=0&&q<r))return A.f(l,q)
q=l.charCodeAt(q)
if(q>=55296&&q<=56319){if(!(n>=0))return A.f(l,n)
s=l.charCodeAt(n)
s=s>=56320&&s<=57343}}}o=(s?o+1:o)+1}m.c=o
return!0}}m.b=m.d=null
return!1},
$iv:1}
A.de.prototype={
gav(){return this.a+this.c.length},
$ibh:1,
gaJ(){return this.a}}
A.dw.prototype={
gp(a){return new A.dx(this.a,this.b,this.c)}}
A.dx.prototype={
l(){var s,r,q=this,p=q.c,o=q.b,n=o.length,m=q.a,l=m.length
if(p+n>l){q.d=null
return!1}s=m.indexOf(o,p)
if(s<0){q.c=l+1
q.d=null
return!1}r=s+n
q.d=new A.de(s,o)
q.c=r===q.c?r+1:r
return!0},
gn(){var s=this.d
s.toString
return s},
$iv:1}
A.aR.prototype={
gv(a){return B.bJ},
b4(a,b,c){var s=new Uint8Array(a,b,c)
return s},
$iq:1,
$iaR:1}
A.bR.prototype={
gbU(a){if(((a.$flags|0)&2)!==0)return new A.fd(a.buffer)
else return a.buffer}}
A.fd.prototype={
b4(a,b,c){var s=A.ji(this.a,b,c)
s.$flags=3
return s}}
A.bO.prototype={
gv(a){return B.bK},
$iq:1,
$ihg:1}
A.bi.prototype={
gk(a){return a.length},
$iY:1}
A.bP.prototype={
j(a,b){A.b2(b,a,a.length)
return a[b]},
$ie:1,
$ib:1,
$ij:1}
A.bQ.prototype={$ie:1,$ib:1,$ij:1}
A.cZ.prototype={
gv(a){return B.bL},
$iq:1}
A.d_.prototype={
gv(a){return B.bM},
$iq:1}
A.d0.prototype={
gv(a){return B.bN},
j(a,b){A.b2(b,a,a.length)
return a[b]},
$iq:1}
A.d1.prototype={
gv(a){return B.bO},
j(a,b){A.b2(b,a,a.length)
return a[b]},
$iq:1}
A.d2.prototype={
gv(a){return B.bP},
j(a,b){A.b2(b,a,a.length)
return a[b]},
$iq:1}
A.d3.prototype={
gv(a){return B.bR},
j(a,b){A.b2(b,a,a.length)
return a[b]},
$iq:1}
A.d4.prototype={
gv(a){return B.bS},
j(a,b){A.b2(b,a,a.length)
return a[b]},
$iq:1}
A.bS.prototype={
gv(a){return B.bT},
gk(a){return a.length},
j(a,b){A.b2(b,a,a.length)
return a[b]},
$iq:1}
A.d5.prototype={
gv(a){return B.bU},
gk(a){return a.length},
j(a,b){A.b2(b,a,a.length)
return a[b]},
$iq:1}
A.cd.prototype={}
A.ce.prototype={}
A.cf.prototype={}
A.cg.prototype={}
A.a6.prototype={
h(a){return A.cq(v.typeUniverse,this,a)},
q(a){return A.hJ(v.typeUniverse,this,a)}}
A.dp.prototype={}
A.dz.prototype={
i(a){return A.Z(this.a,null)}}
A.dn.prototype={
i(a){return this.a}}
A.cm.prototype={$ias:1}
A.eQ.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:4}
A.eP.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:14}
A.eR.prototype={
$0(){this.a.$0()},
$S:5}
A.eS.prototype={
$0(){this.a.$0()},
$S:5}
A.fa.prototype={
bn(a,b){if(self.setTimeout!=null)self.setTimeout(A.dD(new A.fb(this,b),0),a)
else throw A.d(A.di("`setTimeout()` not found."))}}
A.fb.prototype={
$0(){this.b.$0()},
$S:0}
A.c5.prototype={
Y(a){var s,r=this,q=r.$ti
q.h("1/?").a(a)
if(a==null)a=q.c.a(a)
if(!r.b)r.a.aN(a)
else{s=r.a
if(q.h("aj<1>").b(a))s.aO(a)
else s.aQ(a)}},
ar(a,b){var s=this.a
if(this.b)s.P(new A.a1(a,b))
else s.ah(new A.a1(a,b))},
$icI:1}
A.fg.prototype={
$1(a){return this.a.$2(0,a)},
$S:37}
A.fh.prototype={
$2(a,b){this.a.$2(1,new A.bD(a,t.l.a(b)))},
$S:10}
A.fo.prototype={
$2(a,b){this.a(A.G(a),b)},
$S:11}
A.b0.prototype={
gn(){var s=this.b
return s==null?this.$ti.c.a(s):s},
bJ(a,b){var s,r,q
a=A.G(a)
b=b
s=this.a
for(;;)try{r=s(this,a,b)
return r}catch(q){b=q
a=1}},
l(){var s,r,q,p,o=this,n=null,m=0
for(;;){s=o.d
if(s!=null)try{if(s.l()){o.b=s.gn()
return!0}else o.d=null}catch(r){n=r
m=1
o.d=null}q=o.bJ(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.hD
return!1}if(0>=p.length)return A.f(p,-1)
o.a=p.pop()
m=0
n=null
continue}if(2===q){m=0
n=null
continue}if(3===q){n=o.c
o.c=null
p=o.e
if(p==null||p.length===0){o.b=null
o.a=A.hD
throw n
return!1}if(0>=p.length)return A.f(p,-1)
o.a=p.pop()
m=1
continue}throw A.d(A.dc("sync*"))}return!1},
cF(a){var s,r,q=this
if(a instanceof A.bo){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.m(r,q.a)
q.a=s
return 2}else{q.d=J.ae(a)
return 2}},
$iv:1}
A.bo.prototype={
gp(a){return new A.b0(this.a(),this.$ti.h("b0<1>"))}}
A.a1.prototype={
i(a){return A.t(this.a)},
$iu:1,
ga0(){return this.b}}
A.e0.prototype={
$0(){this.c.a(null)
this.b.aP(null)},
$S:0}
A.e2.prototype={
$1(a){var s
this.b.a(a)
s=this.a
if((s.a.a&30)===0)s.Y(a)},
$S(){return this.b.h("~(0)")}}
A.e1.prototype={
$2(a,b){var s
A.aH(a)
t.l.a(b)
s=this.a
if((s.a.a&30)===0)s.ar(a,b)},
$S:12}
A.bn.prototype={
ar(a,b){if((this.a.a&30)!==0)throw A.d(A.dc("Future already completed"))
this.P(A.kk(a,b))},
$icI:1}
A.c6.prototype={
Y(a){var s,r=this.$ti
r.h("1/?").a(a)
s=this.a
if((s.a&30)!==0)throw A.d(A.dc("Future already completed"))
s.aN(r.h("1/").a(a))},
bY(){return this.Y(null)},
P(a){this.a.ah(a)}}
A.cl.prototype={
Y(a){var s,r=this.$ti
r.h("1/?").a(a)
s=this.a
if((s.a&30)!==0)throw A.d(A.dc("Future already completed"))
s.aP(r.h("1/").a(a))},
P(a){this.a.P(a)}}
A.aX.prototype={
cj(a){if((this.c&15)!==6)return!0
return this.b.b.aG(t.al.a(this.d),a.a,t.y,t.K)},
cd(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.Q.b(q))p=l.cs(q,m,a.b,o,n,t.l)
else p=l.aG(t.v.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.aJ(s))){if((r.c&1)!==0)throw A.d(A.bx("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.d(A.bx("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.C.prototype={
Z(a,b,c){var s,r,q,p=this.$ti
p.q(c).h("1/(2)").a(a)
s=$.w
if(s===B.d){if(b!=null&&!t.Q.b(b)&&!t.v.b(b))throw A.d(A.by(b,"onError",u.c))}else{c.h("@<0/>").q(p.c).h("1(2)").a(a)
if(b!=null)b=A.kB(b,s)}r=new A.C(s,c.h("C<0>"))
q=b==null?1:3
this.ag(new A.aX(r,q,a,b,p.h("@<1>").q(c).h("aX<1,2>")))
return r},
aH(a,b){return this.Z(a,null,b)},
aZ(a,b,c){var s,r=this.$ti
r.q(c).h("1/(2)").a(a)
s=new A.C($.w,c.h("C<0>"))
this.ag(new A.aX(s,19,a,b,r.h("@<1>").q(c).h("aX<1,2>")))
return s},
bM(a){this.a=this.a&1|16
this.c=a},
a2(a){this.a=a.a&30|this.a&1
this.c=a.c},
ag(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t._.a(r.c)
if((s.a&24)===0){s.ag(a)
return}r.a2(s)}A.dC(null,null,r.b,t.M.a(new A.eU(r,a)))}},
aV(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t._.a(m.c)
if((n.a&24)===0){n.aV(a)
return}m.a2(n)}l.a=m.a6(a)
A.dC(null,null,m.b,t.M.a(new A.eZ(l,m)))}},
X(){var s=t.F.a(this.c)
this.c=null
return this.a6(s)},
a6(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
aP(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
if(q.h("aj<1>").b(a))A.eX(a,r,!0)
else{s=r.X()
q.c.a(a)
r.a=8
r.c=a
A.aY(r,s)}},
aQ(a){var s,r=this
r.$ti.c.a(a)
s=r.X()
r.a=8
r.c=a
A.aY(r,s)},
br(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.X()
q.a2(a)
A.aY(q,r)},
P(a){var s=this.X()
this.bM(a)
A.aY(this,s)},
aN(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("aj<1>").b(a)){this.aO(a)
return}this.bq(a)},
bq(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.dC(null,null,s.b,t.M.a(new A.eW(s,a)))},
aO(a){A.eX(this.$ti.h("aj<1>").a(a),this,!1)
return},
ah(a){this.a^=2
A.dC(null,null,this.b,t.M.a(new A.eV(this,a)))},
$iaj:1}
A.eU.prototype={
$0(){A.aY(this.a,this.b)},
$S:0}
A.eZ.prototype={
$0(){A.aY(this.b,this.a.a)},
$S:0}
A.eY.prototype={
$0(){A.eX(this.a.a,this.b,!0)},
$S:0}
A.eW.prototype={
$0(){this.a.aQ(this.b)},
$S:0}
A.eV.prototype={
$0(){this.a.P(this.b)},
$S:0}
A.f1.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.cr(t.fO.a(q.d),t.z)}catch(p){s=A.aJ(p)
r=A.bt(p)
if(k.c&&t.n.a(k.b.a.c).a===s){q=k.a
q.c=t.n.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.fD(q)
n=k.a
n.c=new A.a1(q,o)
q=n}q.b=!0
return}if(j instanceof A.C&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.n.a(j.c)
q.b=!0}return}if(j instanceof A.C){m=k.b.a
l=new A.C(m.b,m.$ti)
j.Z(new A.f2(l,m),new A.f3(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:0}
A.f2.prototype={
$1(a){this.a.br(this.b)},
$S:4}
A.f3.prototype={
$2(a,b){A.aH(a)
t.l.a(b)
this.a.P(new A.a1(a,b))},
$S:9}
A.f0.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.aG(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.aJ(l)
r=A.bt(l)
q=s
p=r
if(p==null)p=A.fD(q)
o=this.a
o.c=new A.a1(q,p)
o.b=!0}},
$S:0}
A.f_.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.n.a(l.a.a.c)
p=l.b
if(p.a.cj(s)&&p.a.e!=null){p.c=p.a.cd(s)
p.b=!1}}catch(o){r=A.aJ(o)
q=A.bt(o)
p=t.n.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.fD(p)
m=l.b
m.c=new A.a1(p,n)
p=m}p.b=!0}},
$S:0}
A.dl.prototype={}
A.dv.prototype={}
A.cr.prototype={$ihy:1}
A.du.prototype={
ct(a){var s,r,q
t.M.a(a)
try{if(B.d===$.w){a.$0()
return}A.i0(null,null,this,a,t.H)}catch(q){s=A.aJ(q)
r=A.bt(q)
A.fW(A.aH(s),t.l.a(r))}},
b5(a){return new A.f9(this,t.M.a(a))},
cr(a,b){b.h("0()").a(a)
if($.w===B.d)return a.$0()
return A.i0(null,null,this,a,b)},
aG(a,b,c,d){c.h("@<0>").q(d).h("1(2)").a(a)
d.a(b)
if($.w===B.d)return a.$1(b)
return A.kD(null,null,this,a,b,c,d)},
cs(a,b,c,d,e,f){d.h("@<0>").q(e).q(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.w===B.d)return a.$2(b,c)
return A.kC(null,null,this,a,b,c,d,e,f)},
bc(a,b,c,d){return b.h("@<0>").q(c).q(d).h("1(2,3)").a(a)}}
A.f9.prototype={
$0(){return this.a.ct(this.b)},
$S:0}
A.fm.prototype={
$0(){A.j2(this.a,this.b)},
$S:0}
A.ca.prototype={
gp(a){var s=this,r=new A.cb(s,s.r,s.$ti.h("cb<1>"))
r.c=s.e
return r},
gk(a){return this.a},
gu(a){return this.a===0},
gK(a){return this.a!==0},
C(a,b){var s,r
if(b!=="__proto__"){s=this.b
if(s==null)return!1
return t.O.a(s[b])!=null}else{r=this.bv(b)
return r}},
bv(a){var s=this.d
if(s==null)return!1
return this.al(s[B.b.gt(a)&1073741823],a)>=0},
m(a,b){var s,r,q=this
q.$ti.c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.aM(s==null?q.b=A.fO():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.aM(r==null?q.c=A.fO():r,b)}else return q.bo(b)},
bo(a){var s,r,q,p=this
p.$ti.c.a(a)
s=p.d
if(s==null)s=p.d=A.fO()
r=J.aa(a)&1073741823
q=s[r]
if(q==null)s[r]=[p.ao(a)]
else{if(p.al(q,a)>=0)return!1
q.push(p.ao(a))}return!0},
cp(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.aX(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.aX(s.c,b)
else return s.bH(b)},
bH(a){var s,r,q,p,o=this.d
if(o==null)return!1
s=J.aa(a)&1073741823
r=o[s]
q=this.al(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete o[s]
this.b0(p)
return!0},
bX(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.a5()}},
aM(a,b){this.$ti.c.a(b)
if(t.O.a(a[b])!=null)return!1
a[b]=this.ao(b)
return!0},
aX(a,b){var s
if(a==null)return!1
s=t.O.a(a[b])
if(s==null)return!1
this.b0(s)
delete a[b]
return!0},
a5(){this.r=this.r+1&1073741823},
ao(a){var s,r=this,q=new A.dt(r.$ti.c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.a5()
return q},
b0(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.a5()},
al(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.a9(a[r].a,b))return r
return-1}}
A.dt.prototype={}
A.cb.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
l(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.d(A.U(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iv:1}
A.m.prototype={
gp(a){return new A.ap(a,this.gk(a),A.b6(a).h("ap<m.E>"))},
A(a,b){return this.j(a,b)},
gu(a){return this.gk(a)===0},
gK(a){return!this.gu(a)},
aE(a,b,c){var s=A.b6(a)
return new A.L(a,s.q(c).h("1(m.E)").a(b),s.h("@<m.E>").q(c).h("L<1,2>"))},
a8(a,b){return new A.ag(a,A.b6(a).h("@<m.E>").q(b).h("ag<1,2>"))},
i(a){return A.fG(a,"[","]")}}
A.P.prototype={
M(a,b){var s,r,q,p=A.z(this)
p.h("~(P.K,P.V)").a(b)
for(s=this.gH(),s=s.gp(s),p=p.h("P.V");s.l();){r=s.gn()
q=this.j(0,r)
b.$2(r,q==null?p.a(q):q)}},
gk(a){var s=this.gH()
return s.gk(s)},
gu(a){var s=this.gH()
return s.gu(s)},
i(a){return A.fK(this)},
$iO:1}
A.eg.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.t(a)
r.a=(r.a+=s)+": "
s=A.t(b)
r.a+=s},
$S:6}
A.aB.prototype={
gu(a){return this.gk(this)===0},
gK(a){return this.gk(this)!==0},
i(a){return A.fG(this,"{","}")},
A(a,b){var s,r
A.er(b,"index")
s=this.gp(this)
for(r=b;s.l();){if(r===0)return s.gn();--r}throw A.d(A.e9(b,b-r,this,"index"))},
$ie:1,
$ib:1,
$idb:1}
A.cj.prototype={}
A.dr.prototype={
j(a,b){var s,r=this.b
if(r==null)return this.c.j(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.bG(b):s}},
gk(a){return this.b==null?this.c.a:this.a3().length},
gu(a){return this.gk(0)===0},
gH(){if(this.b==null){var s=this.c
return new A.an(s,A.z(s).h("an<1>"))}return new A.ds(this)},
M(a,b){var s,r,q,p,o=this
t.cA.a(b)
if(o.b==null)return o.c.M(0,b)
s=o.a3()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.fi(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.d(A.U(o))}},
a3(){var s=t.bM.a(this.c)
if(s==null)s=this.c=A.h(Object.keys(this.a),t.s)
return s},
bG(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.fi(this.a[a])
return this.b[a]=s}}
A.ds.prototype={
gk(a){return this.a.gk(0)},
A(a,b){var s=this.a
if(s.b==null)s=s.gH().A(0,b)
else{s=s.a3()
if(!(b>=0&&b<s.length))return A.f(s,b)
s=s[b]}return s},
gp(a){var s=this.a
if(s.b==null){s=s.gH()
s=s.gp(s)}else{s=s.a3()
s=new J.aN(s,s.length,A.J(s).h("aN<1>"))}return s}}
A.cH.prototype={}
A.cK.prototype={}
A.bI.prototype={
i(a){var s=A.cN(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.cX.prototype={
i(a){return"Cyclic error in JSON stringify"}}
A.ec.prototype={
c2(a,b){var s=A.kz(a,this.gc3().a)
return s},
c6(a,b){var s=A.jK(a,this.gc7().b,null)
return s},
gc7(){return B.an},
gc3(){return B.am}}
A.ee.prototype={}
A.ed.prototype={}
A.f6.prototype={
be(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=a.charCodeAt(q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(a.charCodeAt(n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(a.charCodeAt(o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.b.J(a,r,q)
r=q+1
o=A.N(92)
s.a+=o
o=A.N(117)
s.a+=o
o=A.N(100)
s.a+=o
o=p>>>8&15
o=A.N(o<10?48+o:87+o)
s.a+=o
o=p>>>4&15
o=A.N(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.N(o<10?48+o:87+o)
s.a+=o}}continue}if(p<32){if(q>r)s.a+=B.b.J(a,r,q)
r=q+1
o=A.N(92)
s.a+=o
switch(p){case 8:o=A.N(98)
s.a+=o
break
case 9:o=A.N(116)
s.a+=o
break
case 10:o=A.N(110)
s.a+=o
break
case 12:o=A.N(102)
s.a+=o
break
case 13:o=A.N(114)
s.a+=o
break
default:o=A.N(117)
s.a+=o
o=A.N(48)
s.a=(s.a+=o)+o
o=p>>>4&15
o=A.N(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.N(o<10?48+o:87+o)
s.a+=o
break}}else if(p===34||p===92){if(q>r)s.a+=B.b.J(a,r,q)
r=q+1
o=A.N(92)
s.a+=o
o=A.N(p)
s.a+=o}}if(r===0)s.a+=a
else if(r<m)s.a+=B.b.J(a,r,m)},
ai(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.d(new A.cX(a,null))}B.a.m(s,a)},
ac(a){var s,r,q,p,o=this
if(o.bd(a))return
o.ai(a)
try{s=o.b.$1(a)
if(!o.bd(s)){q=A.hn(a,null,o.gaU())
throw A.d(q)}q=o.a
if(0>=q.length)return A.f(q,-1)
q.pop()}catch(p){r=A.aJ(p)
q=A.hn(a,r,o.gaU())
throw A.d(q)}},
bd(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.e.i(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.be(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.ai(a)
q.cB(a)
s=q.a
if(0>=s.length)return A.f(s,-1)
s.pop()
return!0}else if(t.eO.b(a)){q.ai(a)
r=q.cC(a)
s=q.a
if(0>=s.length)return A.f(s,-1)
s.pop()
return r}else return!1},
cB(a){var s,r,q=this.c
q.a+="["
s=J.bs(a)
if(s.gK(a)){this.ac(s.j(a,0))
for(r=1;r<s.gk(a);++r){q.a+=","
this.ac(s.j(a,r))}}q.a+="]"},
cC(a){var s,r,q,p,o,n,m=this,l={}
if(a.gu(a)){m.c.a+="{}"
return!0}s=a.gk(a)*2
r=A.ho(s,null,!1,t.X)
q=l.a=0
l.b=!0
a.M(0,new A.f7(l,r))
if(!l.b)return!1
p=m.c
p.a+="{"
for(o='"';q<s;q+=2,o=',"'){p.a+=o
m.be(A.n(r[q]))
p.a+='":'
n=q+1
if(!(n<s))return A.f(r,n)
m.ac(r[n])}p.a+="}"
return!0}}
A.f7.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.a.B(s,r.a++,a)
B.a.B(s,r.a++,b)},
$S:6}
A.f5.prototype={
gaU(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.dT.prototype={
$0(){var s=this
return A.b8(A.bx("("+s.a+", "+s.b+", "+s.c+", "+s.d+", "+s.e+", "+s.f+", "+s.r+", "+s.w+")",null))},
$S:15}
A.I.prototype={
D(a){var s=1000,r=B.c.ad(a,s),q=B.c.E(a-r,s),p=this.b+r,o=B.c.ad(p,s),n=this.a+B.c.E(p-o,s)+q
if(n<-864e13||n>864e13)A.b8(A.aA(n,-864e13,864e13,"millisecondsSinceEpoch",null))
if(n===864e13&&o!==0)A.b8(A.by(o,"microsecond","Time including microseconds is outside valid range"))
A.cB(!1,"isUtc",t.y)
return new A.I(n,o,!1)},
au(a){return A.dU(this.b-a.b,this.a-a.a,0)},
L(a,b){var s
if(b==null)return!1
s=!1
if(b instanceof A.I)if(this.a===b.a)s=this.b===b.b
return s},
gt(a){return A.hq(this.a,this.b,B.h,B.h)},
cf(a){var s=this.a,r=a.a
if(s>=r)s=s===r&&this.b<a.b
else s=!0
return s},
b9(a){var s=this.a,r=a.a
if(s<=r)s=s===r&&this.b>a.b
else s=!0
return s},
F(a,b){var s
t.x.a(b)
s=B.c.F(this.a,b.a)
if(s!==0)return s
return B.c.F(this.b,b.b)},
i(a){var s=this,r=A.j0(A.aU(s)),q=A.cM(A.aT(s)),p=A.cM(A.az(s)),o=A.cM(A.jm(s)),n=A.cM(A.jo(s)),m=A.cM(A.jp(s)),l=A.hi(A.jn(s)),k=s.b,j=k===0?"":A.hi(k)
return r+"-"+q+"-"+p+" "+o+":"+n+":"+m+"."+l+j},
$iW:1}
A.B.prototype={
L(a,b){if(b==null)return!1
return b instanceof A.B&&this.a===b.a},
gt(a){return B.c.gt(this.a)},
F(a,b){return B.c.F(this.a,t.d.a(b).a)},
i(a){var s,r,q,p,o,n=this.a,m=B.c.E(n,36e8),l=n%36e8
if(n<0){m=0-m
n=0-l
s="-"}else{n=l
s=""}r=B.c.E(n,6e7)
n%=6e7
q=r<10?"0":""
p=B.c.E(n,1e6)
o=p<10?"0":""
return s+m+":"+q+r+":"+o+p+"."+B.b.aa(B.c.i(n%1e6),6,"0")},
$iW:1}
A.dm.prototype={
i(a){return this.G()},
$iab:1}
A.u.prototype={
ga0(){return A.jl(this)}}
A.cC.prototype={
i(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.cN(s)
return"Assertion failed"}}
A.as.prototype={}
A.af.prototype={
gak(){return"Invalid argument"+(!this.a?"(s)":"")},
gaj(){return""},
i(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+p,n=s.gak()+q+o
if(!s.a)return n
return n+s.gaj()+": "+A.cN(s.gaB())},
gaB(){return this.b}}
A.bl.prototype={
gaB(){return A.hO(this.b)},
gak(){return"RangeError"},
gaj(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.t(q):""
else if(q==null)s=": Not greater than or equal to "+A.t(r)
else if(q>r)s=": Not in inclusive range "+A.t(r)+".."+A.t(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.t(r)
return s}}
A.cQ.prototype={
gaB(){return A.G(this.b)},
gak(){return"RangeError"},
gaj(){if(A.G(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gk(a){return this.f}}
A.c1.prototype={
i(a){return"Unsupported operation: "+this.a}}
A.dg.prototype={
i(a){return"UnimplementedError: "+this.a}}
A.c_.prototype={
i(a){return"Bad state: "+this.a}}
A.cJ.prototype={
i(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.cN(s)+"."}}
A.d6.prototype={
i(a){return"Out of Memory"},
ga0(){return null},
$iu:1}
A.bZ.prototype={
i(a){return"Stack Overflow"},
ga0(){return null},
$iu:1}
A.eT.prototype={
i(a){return"Exception: "+this.a}}
A.dX.prototype={
i(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException",q=this.b
if(typeof q=="string"){if(q.length>78)q=B.b.J(q,0,75)+"..."
return r+"\n"+q}else return r}}
A.b.prototype={
a8(a,b){return A.iU(this,A.z(this).h("b.E"),b)},
aE(a,b,c){var s=A.z(this)
return A.hp(this,s.q(c).h("1(b.E)").a(b),s.h("b.E"),c)},
cz(a,b){var s=A.z(this)
return new A.T(this,s.h("E(b.E)").a(b),s.h("T<b.E>"))},
S(a,b){var s,r,q=this.gp(this)
if(!q.l())return""
s=J.au(q.gn())
if(!q.l())return s
if(b.length===0){r=s
do r+=J.au(q.gn())
while(q.l())}else{r=s
do r=r+b+J.au(q.gn())
while(q.l())}return r.charCodeAt(0)==0?r:r},
gk(a){var s,r=this.gp(this)
for(s=0;r.l();)++s
return s},
gu(a){return!this.gp(this).l()},
gK(a){return!this.gu(this)},
gaw(a){var s=this.gp(this)
if(!s.l())throw A.d(A.cS())
return s.gn()},
A(a,b){var s,r
A.er(b,"index")
s=this.gp(this)
for(r=b;s.l();){if(r===0)return s.gn();--r}throw A.d(A.e9(b,b-r,this,"index"))},
i(a){return A.ja(this,"(",")")}}
A.y.prototype={
i(a){return"MapEntry("+A.t(this.a)+": "+A.t(this.b)+")"}}
A.M.prototype={
gt(a){return A.i.prototype.gt.call(this,0)},
i(a){return"null"}}
A.i.prototype={$ii:1,
L(a,b){return this===b},
gt(a){return A.bV(this)},
i(a){return"Instance of '"+A.d9(this)+"'"},
gv(a){return A.kY(this)},
toString(){return this.i(this)}}
A.dy.prototype={
i(a){return""},
$ia3:1}
A.aC.prototype={
gk(a){return this.a.length},
i(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$ijz:1}
A.e_.prototype={
$2(a,b){var s=t.g
this.a.Z(new A.dY(s.a(a)),new A.dZ(s.a(b)),t.X)},
$S:16}
A.dY.prototype={
$1(a){var s=this.a
s.call(s,a)
return a},
$S:17}
A.dZ.prototype={
$2(a,b){var s,r,q,p
A.aH(a)
t.l.a(b)
s=t.g.a(v.G.Error)
r=A.kP(s,["Dart exception thrown from converted Future. Use the properties 'error' to fetch the boxed error and 'stack' to recover the stack trace."],t.o)
if(t.eP.b(a))A.b8("Attempting to box non-Dart object.")
q={}
q[$.iE()]=a
r.error=q
r.stack=b.i(0)
p=this.a
p.call(p,r)
return r},
$S:18}
A.dq.prototype={
bm(){var s=self.crypto
if(s!=null)if(s.getRandomValues!=null)return
throw A.d(A.di("No source of cryptographically secure random numbers available."))},
cl(a){var s,r,q,p,o,n,m,l,k=null
if(a<=0||a>4294967296)throw A.d(new A.bl(k,k,!1,k,k,"max must be in range 0 < max \u2264 2^32, was "+a))
if(a>255)if(a>65535)s=a>16777215?4:3
else s=2
else s=1
r=this.a
r.$flags&2&&A.dF(r,11)
r.setUint32(0,0,!1)
q=4-s
p=A.G(Math.pow(256,s))
for(o=a-1,n=(a&o)===0;;){crypto.getRandomValues(J.iN(B.aK.gbU(r),q,s))
m=r.getUint32(0,!1)
if(n)return(m&o)>>>0
l=m%a
if(m-l+a<p)return l}},
$ijt:1}
A.cE.prototype={
G(){return"CalendarRecurrence."+this.b}}
A.V.prototype={}
A.e7.prototype={
m(a,b){var s=0,r=A.cz(t.H),q=this
var $async$m=A.cA(function(c,d){if(c===1)return A.ct(d,r)
for(;;)switch(s){case 0:q.a.B(0,b.a,b)
return A.cu(null,r)}})
return A.cv($async$m,r)},
aC(a,b){var s=0,r=A.cz(t.k),q,p=this,o,n
var $async$aC=A.cA(function(c,d){if(c===1)return A.ct(d,r)
for(;;)switch(s){case 0:n=A.h([],t.m)
for(o=p.a,o=new A.aQ(o,o.r,o.e,A.z(o).h("aQ<2>"));o.l();)B.a.b2(n,p.bF(o.d,a,b))
B.a.W(n,new A.e8())
q=n
s=1
break
case 1:return A.cu(q,r)}})
return A.cv($async$aC,r)},
bF(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=a.f
if(f===B.x){f=a.c
return!f.cf(b)&&!f.b9(c)?A.h([a],t.m):B.ay}switch(f.a){case 1:s=B.ah
break
case 2:s=B.af
break
case 0:s=B.m
break
default:s=null}r=A.h([],t.m)
q=a.c
s=s.a
p=b.a
o=c.a
n=c.b
m=b.b
l=a.d
l=l.b-q.b+1000*(l.a-q.a)
k=a.a
j=a.b
i=a.e
for(;;){h=q.a
if(h<=o)g=h===o&&q.b>n
else g=!0
if(!!g)break
if(h>=p)h=h===p&&q.b<m
else h=!0
if(!h)B.a.m(r,new A.V(k,j,q,q.D(l),i,f))
q=q.D(s)}return r}}
A.e8.prototype={
$2(a,b){var s=t.B
return s.a(a).c.F(0,s.a(b).c)},
$S:19}
A.dM.prototype={
c_(a,b){var s,r,q,p,o
t.k.a(b)
switch(a.b.a){case 0:s="Status: all ok."
break
case 1:s="Status: needs attention."
break
case 2:s="Status: not set yet today."
break
default:s=null}r=J.bs(b)
if(r.gu(b))return s+" No upcoming events."
q=r.aE(b,new A.dN(),t.N).S(0,", ")
p=r.gk(b)
o=p===1?"event":"events"
return s+" "+p+" upcoming "+o+": "+q+"."}}
A.dN.prototype={
$1(a){return t.B.a(a).b},
$S:20}
A.bc.prototype={
G(){return"DailyStatusValue."+this.b}}
A.cL.prototype={}
A.dS.prototype={
aI(a){var s=this.a.$0()
this.b=new A.cL(A.aw(A.aU(s),A.aT(s),A.az(s),0),a)},
aK(){var s=this.a.$0(),r=A.aw(A.aU(s),A.aT(s),A.az(s),0),q=this.b
if(q==null||!q.a.L(0,r))return B.ab
return q.b}}
A.ek.prototype={}
A.aM.prototype={}
A.dJ.prototype={}
A.dK.prototype={
cA(a,b){var s,r,q,p,o=B.b.N(B.b.V(a),A.a5("\\s+",!0,!1)),n=A.J(o),m=n.h("E(1)").a(new A.dL()),l=A.h([],t.s),k=new A.aC("")
for(o=B.a.gp(o),n=new A.a7(o,m,n.h("a7<1>"));n.l();){m=o.gn()
s=k.a
r=s.length
q=r===0
p=m.length
if((q?p:r+1+p)>b&&!q){B.a.m(l,s.charCodeAt(0)==0?s:s)
k=new A.aC("")}s=k.a
k.a=(s.length!==0?k.a=s+" ":s)+m}o=k.a
if(o.length!==0)B.a.m(l,o.charCodeAt(0)==0?o:o)
return l}}
A.dL.prototype={
$1(a){return A.n(a).length!==0},
$S:1}
A.eH.prototype={
bj(a,b){var s,r,q,p,o,n,m,l,k=this.bO(a),j=k.length
if(j===0)return B.az
if(j<=b)return k
j=A.h([],t.t)
for(s=0;r=k.length,s<r;++s)if(k[s].length>=8)j.push(s)
if(j.length===0){q=J.hk(r,t.S)
for(s=0;s<r;++s)q[s]=s
p=q}else p=j
o=this.bL(k)
j=A.h([],t.gN)
for(r=p.length,n=0;n<p.length;p.length===r||(0,A.a0)(p),++n){s=p[n]
if(!(s<k.length))return A.f(k,s)
j.push(new A.ch(s,this.bK(k[s],o)))}B.a.W(j,new A.eL())
j=A.hv(j,0,A.cB(b,"count",t.S),t.L)
r=j.$ti
m=r.h("L<F.E,a>")
l=A.ay(new A.L(j,r.h("a(F.E)").a(new A.eM()),m),m.h("F.E"))
B.a.bh(l)
j=A.h([],t.s)
for(r=l.length,n=0;n<l.length;l.length===r||(0,A.a0)(l),++n){s=l[n]
if(!(s>=0&&s<k.length))return A.f(k,s)
j.push(k[s])}return j},
bO(a){var s=B.b.N(a,A.a5("(?<=[.!?])\\s+",!0,!1)),r=A.J(s),q=r.h("L<1,c>")
q=new A.L(s,r.h("c(1)").a(new A.eI()),q).bk(0,q.h("E(F.E)").a(new A.eJ()))
s=A.ay(q,q.$ti.h("b.E"))
return s},
bL(a){var s,r,q,p,o,n,m
t.a.a(a)
s=A.bM(t.N,t.S)
for(r=a.length,q=0;q<a.length;a.length===r||(0,A.a0)(a),++q)for(p=this.b1(a[q]),o=J.ae(p.a),p=new A.a7(o,p.b,p.$ti.h("a7<1>"));p.l();){n=o.gn()
m=s.j(0,n)
s.B(0,n,(m==null?0:m)+1)}return s},
bK(a,b){var s,r,q,p
t.g6.a(b)
for(s=this.b1(a),r=J.ae(s.a),s=new A.a7(r,s.b,s.$ti.h("a7<1>")),q=0;s.l();){p=b.j(0,r.gn())
q+=p==null?0:p}return q},
b1(a){var s=B.b.N(a.toLowerCase(),A.a5("[^\\p{L}]+",!0,!0)),r=A.J(s)
return new A.T(s,r.h("E(1)").a(new A.eK()),r.h("T<1>"))}}
A.eL.prototype={
$2(a,b){var s=t.L
s.a(a)
return B.c.F(s.a(b).b,a.b)},
$S:21}
A.eM.prototype={
$1(a){return t.L.a(a).a},
$S:22}
A.eI.prototype={
$1(a){return B.b.V(A.n(a))},
$S:7}
A.eJ.prototype={
$1(a){return A.n(a).length!==0},
$S:1}
A.eK.prototype={
$1(a){A.n(a)
return a.length!==0&&!B.bG.C(0,a)},
$S:1}
A.el.prototype={}
A.d7.prototype={}
A.bU.prototype={
i(a){return"PersonProfileConsentError: "+this.a}}
A.bm.prototype={}
A.eu.prototype={
c5(){var s=this.b,r=A.z(s).h("ao<2>"),q=r.h("T<b.E>")
s=A.ay(new A.T(new A.ao(s,r),r.h("E(b.E)").a(new A.ev(this.a.$0())),q),q.h("b.E"))
s.$flags=1
return s}}
A.ev.prototype={
$1(a){var s=t.U.a(a).c.b9(this.a)
return!s},
$S:24}
A.ex.prototype={
a7(){var s=this,r=s.b.$0(),q=A.aw(A.aU(r),A.aT(r),A.az(r),0)
if(!J.a9(s.c,q)){s.c=q
r=s.d
if(r.a>0){r.b=r.c=r.d=r.e=r.f=null
r.a=0
r.a5()}}},
ci(a){if(!B.a.C(this.a,a))return
this.a7()
this.d.m(0,a)},
co(){var s,r,q
this.a7()
s=this.a
r=A.J(s)
q=r.h("T<1>")
s=A.ay(new A.T(s,r.h("E(1)").a(new A.ey(this)),q),q.h("b.E"))
return s}}
A.ey.prototype={
$1(a){return!this.a.d.C(0,A.n(a))},
$S:1}
A.aL.prototype={}
A.cP.prototype={}
A.e3.prototype={
bR(a){var s,r,q,p,o,n,m,l,k=this.bx(t.w.a(a)),j=k.length
if(j<2)return new A.cP(j,0,!1)
s=A.h([],t.t)
for(r=1;r<k.length;++r){q=k[r]
p=k[r-1]
B.a.m(s,B.c.E(q.b-p.b+1000*(q.a-p.a),1000))}o=B.c.E(B.a.gcg(k).au(B.a.gaw(k)).a,1000)
n=o===0?0:k.length/(o/6e4)
m=B.a.aF(s,new A.e4())/s.length
q=new A.L(s,t.gA.a(new A.e5(m)),t.eC).aF(0,new A.e6())
p=s.length
l=m===0?0:Math.sqrt(q/p)/m
q=k.length
return new A.cP(q,n,j>=4&&l>0.35)},
bx(a){var s,r,q,p,o,n,m,l,k,j
t.w.a(a)
s=A.h([],t.J)
for(r=a.length,q=null,p=!0,o=0;o<a.length;a.length===r||(0,A.a0)(a),++o){n=a[o]
m=n.a
l=n.b
k=n.c
j=Math.sqrt(m*m+l*l+k*k)>11.5
if(j&&p){if(q!=null){m=n.d
l=q.a
l=m.b-q.b+1000*(m.a-l)>=25e4
m=l}else m=!0
if(m){q=n.d
B.a.m(s,q)}}p=!j}return s}}
A.e4.prototype={
$2(a,b){return A.G(a)+A.G(b)},
$S:38}
A.e5.prototype={
$1(a){return Math.pow(A.G(a)-this.a,2)},
$S:26}
A.e6.prototype={
$2(a,b){return A.dA(a)+A.dA(b)},
$S:27}
A.ac.prototype={
G(){return"MobilityAidType."+this.b}}
A.ak.prototype={
G(){return"GuidanceVerbosity."+this.b}}
A.eh.prototype={}
A.ei.prototype={
i(a){return'MobilityProfileValidationError: A profile with aidType "other" must describe the aid in notes.'}}
A.ew.prototype={
bT(a,b){var s,r,q,p=B.aF.j(0,b),o=p.a,n=a.a
if(o>=n)return B.ax
s=A.h([],t.A)
for(r=p;q=r.a,q<n;){B.a.m(s,r)
r=new A.B(q+o)}return s}}
A.es.prototype={
cb(a){if(a<=0)return 0
return B.e.bW(a/200)},
cc(a){var s=B.b.N(B.b.V(a),A.a5("\\s+",!0,!1)),r=A.J(s)
return this.cb(new A.T(s,r.h("E(1)").a(new A.et()),r.h("T<1>")).gk(0))}}
A.et.prototype={
$1(a){return A.n(a).length!==0},
$S:1}
A.ea.prototype={
N(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f="aeiouAEIOUaeiouAEIOU\xe0\xe8\xe9\xec\xf2\xf9\xc0\xc8\xc9\xcc\xd2\xd9",e=b.length
if(e===0)return A.h([b],t.s)
s=t.t
r=A.h([],s)
q=A.h([],s)
for(p=0;p<e;){if(!(p>=0))return A.f(b,p)
o=b[p]
if(A.h3(f,o,0)){n=p
for(;;){if(n<e){o=b[n]
o=A.h3(f,o,0)}else o=!1
if(!o)break;++n}B.a.m(r,p)
B.a.m(q,n)
p=n}else ++p}if(r.length===0)return A.h([b],t.s)
m=A.h([],s)
for(l=0;l<r.length-1;){if(!(l<q.length))return A.f(q,l)
k=q[l];++l
B.a.m(m,k+this.bu(B.b.J(b,k,r[l]).toLowerCase()))}j=A.h([],t.s)
for(e=m.length,i=0,h=0;h<m.length;m.length===e||(0,A.a0)(m),++h,i=g){g=m[h]
B.a.m(j,B.b.J(b,i,g))}B.a.m(j,B.b.O(b,i))
return j},
bu(a){var s,r,q=a.length
if(q===1)return 0
if(B.b.bi(a,"s"))return 0
if(q===2){if(B.a.C(B.C,a))return 0
if(this.aS(a))return 0
return 1}s=q-2
r=B.b.O(a,s)
if(B.a.C(B.C,r)||this.aS(r))return s
return q-1},
aS(a){var s=a.length
if(0>=s)return A.f(a,0)
if(B.b.C("bcdfgptv",a[0])){if(1>=s)return A.f(a,1)
s=B.b.C("lr",a[1])}else s=!1
return s}}
A.dO.prototype={
ba(a){var s=this.b
if(s==null)return!0
return this.a.$0().au(s).a>a.a}}
A.bw.prototype={
gaD(){var s=this.a,r=this.b,q=this.c
return Math.sqrt(s*s+r*r+q*q)}}
A.dW.prototype={
c4(a){var s,r,q,p,o,n,m,l=null
t.e.a(a)
if(a.length<2)return l
for(s=l,r=s,q=0;q<a.length;++q){p=a[q]
if(p.gaD()<2){if(r==null)r=p.d
s=p.d
continue}if(r!=null&&s!=null){o=s.a
n=r.a
if(s.b-r.b+1000*(o-n)>=3e5){m=this.bB(a,q,s)
if(m!=null&&this.bD(a,m))return m}}s=l
r=s}return l},
bB(a,b,c){var s,r,q,p,o
t.e.a(a)
for(s=c.a,r=c.b,q=b;q<a.length;++q){p=a[q]
o=p.d
if(o.b-r+1000*(o.a-s)>5e5)return null
if(p.gaD()>25)return o}return null},
bD(a,b){var s,r,q,p,o,n,m,l,k
t.e.a(a)
for(s=a.length,r=b.a,q=b.b,p=null,o=0;o<a.length;a.length===s||(0,A.a0)(a),++o){n=a[o]
m=n.d
l=m.a
if(l<=r)k=l===r&&m.b>q
else k=!0
if(!k)continue
if(Math.abs(n.gaD()-9.8)<=3){if(p==null)p=m
if(m.b-p.b+1000*(l-p.a)>=15e5)return!0}else p=null}return!1}}
A.ar.prototype={
G(){return"ScamIndicatorType."+this.b}}
A.a2.prototype={}
A.ez.prototype={
gcn(){var s,r=this.b
if(r.length===0)r="No suspicious element recognized in this message."
else{s=A.J(r)
s=new A.L(r,s.h("c(1)").a(new A.eA()),s.h("L<1,c>")).S(0," ")
r=s}return r}}
A.eA.prototype={
$1(a){return t.er.a(a).c},
$S:28}
A.eB.prototype={
bS(a){var s,r=A.h([],t.fD),q=B.b.gc0(a.toLowerCase())
if(B.a.T(B.av,q))B.a.m(r,B.bA)
if(B.a.T(B.aw,q))B.a.m(r,B.bD)
s=$.io()
if(s.b.test(a))B.a.m(r,B.bC)
if(B.a.T(B.ar,q))B.a.m(r,B.by)
if(B.a.T(B.aA,q))B.a.m(r,B.bB)
if(B.a.T(B.at,q))B.a.m(r,B.bz)
A:{break A}return new A.ez(r)}}
A.cO.prototype={
ae(a,b){return this.bg(a,t.a.a(b))},
bg(a,b){var s=0,r=A.cz(t.H),q=this
var $async$ae=A.cA(function(c,d){if(c===1)return A.ct(d,r)
for(;;)switch(s){case 0:B.a.m(q.a,new A.ci(a,b))
return A.cu(null,r)}})
return A.cv($async$ae,r)},
$ijx:1}
A.eE.prototype={
a_(a,b){return this.cv(a,t.a.a(b))},
cv(a,b){var s=0,r=A.cz(t.H),q,p=this
var $async$a_=A.cA(function(c,d){if(c===1)return A.ct(d,r)
for(;;)switch(s){case 0:if(p.c===B.l)throw A.d(A.dc("An SOS countdown is already in progress."))
p.c=B.l
p.d=new A.c6(new A.C($.w,t.D),t.ez)
s=3
return A.dB(p.aq(),$async$a_)
case 3:if(d){p.c=B.bI
s=1
break}s=4
return A.dB(p.a.ae(a,b),$async$a_)
case 4:p.c=B.bH
case 1:return A.cu(q,r)}})
return A.cv($async$a_,r)},
bV(){if(this.c!==B.l)return
var s=this.d
if(s!=null)s.bY()},
aq(){var s=0,r=A.cz(t.y),q,p=this,o,n,m
var $async$aq=A.cA(function(a,b){if(a===1)return A.ct(b,r)
for(;;)switch(s){case 0:m=p.d
m.toString
o=A.hj(p.b,t.H)
n=t.y
q=A.j6(A.h([m.a.aH(new A.eF(),n),o.aH(new A.eG(),n)],t.h7),n)
s=1
break
case 1:return A.cu(q,r)}})
return A.cv($async$aq,r)}}
A.eF.prototype={
$1(a){return!0},
$S:8}
A.eG.prototype={
$1(a){return!1},
$S:8}
A.aV.prototype={
G(){return"SosState."+this.b}}
A.aS.prototype={
G(){return"PhraseCategory."+this.b}}
A.r.prototype={}
A.em.prototype={}
A.b1.prototype={}
A.en.prototype={
cu(a){var s,r,q=this.b,p=A.z(q).h("bJ<1,2>")
p=A.hp(new A.bJ(q,p),p.h("y<c,p>(b.E)").a(new A.eo(this.a.$0(),864e5)),p.h("b.E"),t.b)
s=A.ay(p,A.z(p).h("b.E"))
B.a.W(s,new A.ep())
q=A.hv(s,0,A.cB(a,"count",t.S),A.J(s).c)
p=q.$ti
r=p.h("L<F.E,c>")
q=A.ay(new A.L(q,p.h("c(F.E)").a(new A.eq()),r),r.h("F.E"))
q.$flags=1
return q}}
A.eo.prototype={
$1(a){var s
t.he.a(a)
s=a.b
return new A.y(a.a,s.a*Math.pow(0.5,B.c.E(this.a.au(s.b).a,1000)/this.b),t.b)},
$S:30}
A.ep.prototype={
$2(a,b){var s=t.b
s.a(a)
return B.e.F(s.a(b).b,a.b)},
$S:31}
A.eq.prototype={
$1(a){return t.b.a(a).a},
$S:32}
A.eC.prototype={
bZ(a,b){var s,r,q,p,o,n,m
t.W.a(a)
if(a.length===0)return""
s=A.h([],t.s)
for(r=a.length,q=b===B.bE,p=0;p<a.length;a.length===r||(0,A.a0)(a),++p){o=a[p]
s.push(q?o.b:o.c)}n=B.a.S(s," ")
if(0>=n.length)return A.f(n,0)
m=n[0].toUpperCase()+B.b.O(n,1)
return!B.a.T(B.aC,B.b.gc8(m))?m+".":m}}
A.bY.prototype={
G(){return"SentenceLocale."+this.b}}
A.Q.prototype={}
A.dP.prototype={
ck(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=B.F.gH().gaw(0)
for(s=B.F.gb8(),r=s.$ti,s=new A.b0(s.a(),r.h("b0<1>")),q=a.a,p=a.b,o=a.c,r=r.c,n=1/0;s.l();){m=s.b
if(m==null)m=r.a(m)
l=m.b
k=q-l.a
j=p-l.b
i=o-l.c
h=k*k+j*j+i*i
if(h<n){g=m.a
n=h}}return g}}
A.c2.prototype={
G(){return"WcagLevel."+this.b}}
A.dR.prototype={
bb(a){var s,r,q,p,o,n,m,l,k,j,i=null
A:{s=B.p===a
r=s
if(r){q=!1
p=!0
o=!1
n=!0}else{o=i
q=o
p=!1
n=!1}r=4.5
m=i
if(s){if(n)l=o
else{o=!1
n=!0
l=!1}m=!1===l
l=m
k=!0}else{k=!1
l=!1}if(l)break A
j=B.bV===a
l=j
if(l)if(p)l=q
else{if(n)l=o
else{o=!1
n=!0
l=!1}q=!0===l
l=q}else l=!1
if(l)break A
if(j)if(k)r=m
else{m=!1===(n&&o)
r=m}else r=!1
if(r){r=7
break A}r=i}return this.a>=r}}
A.dQ.prototype={
b6(a,b){var s=this.aW(a),r=this.aW(b)
return new A.dR((Math.max(s,r)+0.05)/(Math.min(s,r)+0.05),!1)},
aW(a){return 0.2126*this.am(a.a/255)+0.7152*this.am(a.b/255)+0.0722*this.am(a.c/255)},
am(a){return a<=0.03928?a/12.92:Math.pow((a+0.055)/1.055,2.4)}}
A.ai.prototype={}
A.dV.prototype={
cm(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f=B.b.V(a),e=$.ii().U(f)
if(e!=null){s=e.b
r=s.length
if(1>=r)return A.f(s,1)
q=s[1]
q.toString
if(2>=r)return A.f(s,2)
p=s[2]
p.toString
if(3>=r)return A.f(s,3)
s=s[3]
s.toString
o=g.a1(q,p,s)
if(o!=null)return new A.ai(o)}n=$.il().U(f)
if(n!=null){s=n.b
r=s.length
if(1>=r)return A.f(s,1)
q=s[1]
q.toString
if(2>=r)return A.f(s,2)
p=s[2]
p.toString
if(3>=r)return A.f(s,3)
s=s[3]
s.toString
o=g.a1(q,p,s)
if(o!=null)return new A.ai(o)}m=$.ig().U(f)
if(m!=null){s=m.b
r=s.length
if(1>=r)return A.f(s,1)
q=s[1]
q.toString
if(2>=r)return A.f(s,2)
p=s[2]
p.toString
if(3>=r)return A.f(s,3)
s=s[3]
s.toString
o=g.a1(q,p,s)
if(o!=null)return new A.ai(o)}l=$.ih().U(f)
if(l!=null){s=l.b
r=s.length
if(1>=r)return A.f(s,1)
q=s[1]
q.toString
if(2>=r)return A.f(s,2)
p=s[2]
p.toString
if(3>=r)return A.f(s,3)
s=s[3]
s.toString
o=g.a1(q,p,s)
if(o!=null)return new A.ai(o)}k=$.ij().U(f)
if(k!=null){s=k.b
if(2>=s.length)return A.f(s,2)
j=B.aD.j(0,s[2].toLowerCase())
if(j!=null){if(3>=s.length)return A.f(s,3)
r=s[3]
r.toString
r=A.bu(r)
if(1>=s.length)return A.f(s,1)
s=s[1]
s.toString
o=g.ap(r,j,A.bu(s))
if(o!=null)return new A.ai(o)}}i=$.ik().U(f)
if(i!=null){s=i.b
if(1>=s.length)return A.f(s,1)
r=s[1]
r.toString
j=A.bu(r)
if(2>=s.length)return A.f(s,2)
s=s[2]
s.toString
h=A.bu(s)
if(j>=1&&j<=12){o=g.ap(h,j,A.az(A.aw(h,j+1,0,0)))
if(o!=null)return new A.ai(o)}}return B.ai},
a1(a,b,c){var s=A.bu(a),r=A.bu(b),q=A.bu(c)
return this.ap(q<100?q+2000:q,r,s)},
ap(a,b,c){var s
if(b<1||b>12)return null
s=A.aw(a,b,c,0)
if(A.aU(s)!==a||A.aT(s)!==b||A.az(s)!==c)return null
return s}}
A.b9.prototype={
G(){return"AlertSeverity."+this.b}}
A.fj.prototype={
$2(a,b){var s=t.h
return B.c.F(s.a(a).d.a,s.a(b).d.a)},
$S:33}
A.fk.prototype={
$1(a){return A.n(a).length!==0},
$S:1}
A.fl.prototype={
$1(a){return B.a.S(B.W.N(0,A.n(a)),"-")},
$S:7}
A.fy.prototype={
$2(a,b){var s=t.N
return A.j5(A.cw(A.n(a),t.d1.a(B.w.c2(A.n(b),null))).aH(new A.fx(),s),s)},
$S:34}
A.fx.prototype={
$1(a){return B.w.c6(t.f.a(a),null)},
$S:35};(function aliases(){var s=J.ax.prototype
s.bl=s.i
s=A.b.prototype
s.bk=s.cz})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._instance_1i,q=hunkHelpers.installInstanceTearOff,p=hunkHelpers._static_1,o=hunkHelpers._static_0
s(J,"kl","jd",36)
var n
r(n=J.al.prototype,"gc8","c9",1)
q(n,"gc0",1,1,null,["$2","$1"],["b7","C"],13,0,0)
p(A,"kM","jG",2)
p(A,"kN","jH",2)
p(A,"kO","jI",2)
o(A,"i6","kH",0)
p(A,"kS","k9",3)
o(A,"dE","j_",25)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.i,null)
q(A.i,[A.fH,J.cR,A.bX,J.aN,A.b,A.bz,A.u,A.eD,A.ap,A.bN,A.a7,A.c4,A.S,A.ad,A.bb,A.aZ,A.aB,A.eN,A.ej,A.bD,A.ck,A.av,A.P,A.ef,A.bL,A.aQ,A.bK,A.be,A.cc,A.dk,A.de,A.dx,A.fd,A.a6,A.dp,A.dz,A.fa,A.c5,A.b0,A.a1,A.bn,A.aX,A.C,A.dl,A.dv,A.cr,A.dt,A.cb,A.m,A.cH,A.cK,A.f6,A.I,A.B,A.dm,A.d6,A.bZ,A.eT,A.dX,A.y,A.M,A.dy,A.aC,A.dq,A.V,A.e7,A.dM,A.cL,A.dS,A.ek,A.aM,A.dJ,A.dK,A.eH,A.el,A.d7,A.bU,A.bm,A.eu,A.ex,A.aL,A.cP,A.e3,A.eh,A.ei,A.ew,A.es,A.ea,A.dO,A.bw,A.dW,A.a2,A.ez,A.eB,A.cO,A.eE,A.r,A.em,A.b1,A.en,A.eC,A.Q,A.dP,A.dR,A.dQ,A.ai,A.dV])
q(J.cR,[J.cU,J.bG,J.A,J.bf,J.bg,J.bd,J.al])
q(J.A,[J.ax,J.k,A.aR,A.bR])
q(J.ax,[J.d8,J.aW,J.X])
r(J.cT,A.bX)
r(J.eb,J.k)
q(J.bd,[J.bF,J.cV])
q(A.b,[A.aE,A.e,A.aq,A.T,A.c3,A.c9,A.dj,A.dw,A.bo])
q(A.aE,[A.aO,A.cs])
r(A.c8,A.aO)
r(A.c7,A.cs)
r(A.ag,A.c7)
q(A.u,[A.cY,A.as,A.cW,A.dh,A.da,A.dn,A.bI,A.cC,A.af,A.c1,A.dg,A.c_,A.cJ])
q(A.e,[A.F,A.an,A.ao,A.bJ])
q(A.F,[A.c0,A.L,A.ds])
r(A.bC,A.aq)
r(A.aF,A.ad)
q(A.aF,[A.D,A.ch,A.ci])
q(A.bb,[A.ah,A.bE])
q(A.aB,[A.bA,A.cj])
r(A.bB,A.bA)
r(A.bT,A.as)
q(A.av,[A.cF,A.cG,A.df,A.ft,A.fv,A.eQ,A.eP,A.fg,A.e2,A.f2,A.dY,A.dN,A.dL,A.eM,A.eI,A.eJ,A.eK,A.ev,A.ey,A.e5,A.et,A.eA,A.eF,A.eG,A.eo,A.eq,A.fk,A.fl,A.fx])
q(A.df,[A.dd,A.ba])
q(A.P,[A.am,A.dr])
r(A.bH,A.am)
q(A.cG,[A.fu,A.fh,A.fo,A.e1,A.f3,A.eg,A.f7,A.e_,A.dZ,A.e8,A.eL,A.e4,A.e6,A.ep,A.fj,A.fy])
q(A.bR,[A.bO,A.bi])
q(A.bi,[A.cd,A.cf])
r(A.ce,A.cd)
r(A.bP,A.ce)
r(A.cg,A.cf)
r(A.bQ,A.cg)
q(A.bP,[A.cZ,A.d_])
q(A.bQ,[A.d0,A.d1,A.d2,A.d3,A.d4,A.bS,A.d5])
r(A.cm,A.dn)
q(A.cF,[A.eR,A.eS,A.fb,A.e0,A.eU,A.eZ,A.eY,A.eW,A.eV,A.f1,A.f0,A.f_,A.f9,A.fm,A.dT])
q(A.bn,[A.c6,A.cl])
r(A.du,A.cr)
r(A.ca,A.cj)
r(A.cX,A.bI)
r(A.ec,A.cH)
q(A.cK,[A.ee,A.ed])
r(A.f5,A.f6)
q(A.af,[A.bl,A.cQ])
q(A.dm,[A.cE,A.bc,A.ac,A.ak,A.ar,A.aV,A.aS,A.bY,A.c2,A.b9])
s(A.cs,A.m)
s(A.cd,A.m)
s(A.ce,A.S)
s(A.cf,A.m)
s(A.cg,A.S)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{a:"int",o:"double",p:"num",c:"String",E:"bool",M:"Null",j:"List",i:"Object",O:"Map",x:"JSObject"},mangledNames:{},types:["~()","E(c)","~(~())","@(@)","M(@)","M()","~(i?,i?)","c(c)","E(~)","M(i,a3)","M(@,a3)","~(a,@)","~(i,a3)","E(bj[a])","M(~())","0&()","M(X,X)","i?(i?)","x(i,a3)","a(V,V)","c(V)","a(+index,score(a,a),+index,score(a,a))","a(+index,score(a,a))","@(@,c)","E(bm)","I()","p(a)","p(p,p)","c(a2)","@(c)","y<c,p>(y<c,b1>)","a(y<c,p>,y<c,p>)","c(y<c,p>)","a(r,r)","x(c,c)","c(O<c,i?>)","a(@,@)","~(@)","a(a,a)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.D&&a.b(c.a)&&b.b(c.b),"2;index,score":(a,b)=>c=>c instanceof A.ch&&a.b(c.a)&&b.b(c.b),"2;message,recipients":(a,b)=>c=>c instanceof A.ci&&a.b(c.a)&&b.b(c.b)}}
A.k_(v.typeUniverse,JSON.parse('{"X":"ax","d8":"ax","aW":"ax","lm":"aR","cU":{"E":[],"q":[]},"bG":{"q":[]},"A":{"x":[]},"ax":{"A":[],"x":[]},"k":{"j":["1"],"A":[],"e":["1"],"x":[],"b":["1"]},"cT":{"bX":[]},"eb":{"k":["1"],"j":["1"],"A":[],"e":["1"],"x":[],"b":["1"]},"aN":{"v":["1"]},"bd":{"o":[],"p":[],"W":["p"]},"bF":{"o":[],"a":[],"p":[],"W":["p"],"q":[]},"cV":{"o":[],"p":[],"W":["p"],"q":[]},"al":{"c":[],"W":["c"],"bj":[],"q":[]},"aE":{"b":["2"]},"bz":{"v":["2"]},"aO":{"aE":["1","2"],"b":["2"],"b.E":"2"},"c8":{"aO":["1","2"],"aE":["1","2"],"e":["2"],"b":["2"],"b.E":"2"},"c7":{"m":["2"],"j":["2"],"aE":["1","2"],"e":["2"],"b":["2"]},"ag":{"c7":["1","2"],"m":["2"],"j":["2"],"aE":["1","2"],"e":["2"],"b":["2"],"m.E":"2","b.E":"2"},"cY":{"u":[]},"e":{"b":["1"]},"F":{"e":["1"],"b":["1"]},"c0":{"F":["1"],"e":["1"],"b":["1"],"b.E":"1","F.E":"1"},"ap":{"v":["1"]},"aq":{"b":["2"],"b.E":"2"},"bC":{"aq":["1","2"],"e":["2"],"b":["2"],"b.E":"2"},"bN":{"v":["2"]},"L":{"F":["2"],"e":["2"],"b":["2"],"b.E":"2","F.E":"2"},"T":{"b":["1"],"b.E":"1"},"a7":{"v":["1"]},"c3":{"b":["1"],"b.E":"1"},"c4":{"v":["1"]},"D":{"aF":[],"ad":[]},"ch":{"aF":[],"ad":[]},"ci":{"aF":[],"ad":[]},"bb":{"O":["1","2"]},"ah":{"bb":["1","2"],"O":["1","2"]},"c9":{"b":["1"],"b.E":"1"},"aZ":{"v":["1"]},"bE":{"bb":["1","2"],"O":["1","2"]},"bA":{"aB":["1"],"db":["1"],"e":["1"],"b":["1"]},"bB":{"bA":["1"],"aB":["1"],"db":["1"],"e":["1"],"b":["1"]},"bT":{"as":[],"u":[]},"cW":{"u":[]},"dh":{"u":[]},"ck":{"a3":[]},"av":{"aP":[]},"cF":{"aP":[]},"cG":{"aP":[]},"df":{"aP":[]},"dd":{"aP":[]},"ba":{"aP":[]},"da":{"u":[]},"am":{"P":["1","2"],"fJ":["1","2"],"O":["1","2"],"P.K":"1","P.V":"2"},"an":{"e":["1"],"b":["1"],"b.E":"1"},"bL":{"v":["1"]},"ao":{"e":["1"],"b":["1"],"b.E":"1"},"aQ":{"v":["1"]},"bJ":{"e":["y<1,2>"],"b":["y<1,2>"],"b.E":"y<1,2>"},"bK":{"v":["y<1,2>"]},"bH":{"am":["1","2"],"P":["1","2"],"fJ":["1","2"],"O":["1","2"],"P.K":"1","P.V":"2"},"aF":{"ad":[]},"be":{"jv":[],"bj":[]},"cc":{"bW":[],"bh":[]},"dj":{"b":["bW"],"b.E":"bW"},"dk":{"v":["bW"]},"de":{"bh":[]},"dw":{"b":["bh"],"b.E":"bh"},"dx":{"v":["bh"]},"aR":{"A":[],"x":[],"q":[]},"bR":{"A":[],"x":[]},"bO":{"A":[],"hg":[],"x":[],"q":[]},"bi":{"Y":["1"],"A":[],"x":[]},"bP":{"m":["o"],"j":["o"],"Y":["o"],"A":[],"e":["o"],"x":[],"b":["o"],"S":["o"]},"bQ":{"m":["a"],"j":["a"],"Y":["a"],"A":[],"e":["a"],"x":[],"b":["a"],"S":["a"]},"cZ":{"m":["o"],"j":["o"],"Y":["o"],"A":[],"e":["o"],"x":[],"b":["o"],"S":["o"],"q":[],"m.E":"o"},"d_":{"m":["o"],"j":["o"],"Y":["o"],"A":[],"e":["o"],"x":[],"b":["o"],"S":["o"],"q":[],"m.E":"o"},"d0":{"m":["a"],"j":["a"],"Y":["a"],"A":[],"e":["a"],"x":[],"b":["a"],"S":["a"],"q":[],"m.E":"a"},"d1":{"m":["a"],"j":["a"],"Y":["a"],"A":[],"e":["a"],"x":[],"b":["a"],"S":["a"],"q":[],"m.E":"a"},"d2":{"m":["a"],"j":["a"],"Y":["a"],"A":[],"e":["a"],"x":[],"b":["a"],"S":["a"],"q":[],"m.E":"a"},"d3":{"m":["a"],"j":["a"],"Y":["a"],"A":[],"e":["a"],"x":[],"b":["a"],"S":["a"],"q":[],"m.E":"a"},"d4":{"m":["a"],"j":["a"],"Y":["a"],"A":[],"e":["a"],"x":[],"b":["a"],"S":["a"],"q":[],"m.E":"a"},"bS":{"m":["a"],"j":["a"],"Y":["a"],"A":[],"e":["a"],"x":[],"b":["a"],"S":["a"],"q":[],"m.E":"a"},"d5":{"m":["a"],"j":["a"],"Y":["a"],"A":[],"e":["a"],"x":[],"b":["a"],"S":["a"],"q":[],"m.E":"a"},"dn":{"u":[]},"cm":{"as":[],"u":[]},"c5":{"cI":["1"]},"b0":{"v":["1"]},"bo":{"b":["1"],"b.E":"1"},"a1":{"u":[]},"bn":{"cI":["1"]},"c6":{"bn":["1"],"cI":["1"]},"cl":{"bn":["1"],"cI":["1"]},"C":{"aj":["1"]},"cr":{"hy":[]},"du":{"cr":[],"hy":[]},"ca":{"aB":["1"],"db":["1"],"e":["1"],"b":["1"]},"cb":{"v":["1"]},"P":{"O":["1","2"]},"aB":{"db":["1"],"e":["1"],"b":["1"]},"cj":{"aB":["1"],"db":["1"],"e":["1"],"b":["1"]},"dr":{"P":["c","@"],"O":["c","@"],"P.K":"c","P.V":"@"},"ds":{"F":["c"],"e":["c"],"b":["c"],"b.E":"c","F.E":"c"},"bI":{"u":[]},"cX":{"u":[]},"I":{"W":["I"]},"o":{"p":[],"W":["p"]},"B":{"W":["B"]},"a":{"p":[],"W":["p"]},"j":{"e":["1"],"b":["1"]},"p":{"W":["p"]},"bW":{"bh":[]},"c":{"W":["c"],"bj":[]},"dm":{"ab":[]},"cC":{"u":[]},"as":{"u":[]},"af":{"u":[]},"bl":{"u":[]},"cQ":{"u":[]},"c1":{"u":[]},"dg":{"u":[]},"c_":{"u":[]},"cJ":{"u":[]},"d6":{"u":[]},"bZ":{"u":[]},"dy":{"a3":[]},"aC":{"jz":[]},"dq":{"jt":[]},"cE":{"ab":[]},"bc":{"ab":[]},"ac":{"ab":[]},"ak":{"ab":[]},"ar":{"ab":[]},"cO":{"jx":[]},"aV":{"ab":[]},"aS":{"ab":[]},"bY":{"ab":[]},"c2":{"ab":[]},"b9":{"ab":[]},"j9":{"j":["a"],"e":["a"],"b":["a"]},"jE":{"j":["a"],"e":["a"],"b":["a"]},"jD":{"j":["a"],"e":["a"],"b":["a"]},"j7":{"j":["a"],"e":["a"],"b":["a"]},"jB":{"j":["a"],"e":["a"],"b":["a"]},"j8":{"j":["a"],"e":["a"],"b":["a"]},"jC":{"j":["a"],"e":["a"],"b":["a"]},"j3":{"j":["o"],"e":["o"],"b":["o"]},"j4":{"j":["o"],"e":["o"],"b":["o"]}}'))
A.jZ(v.typeUniverse,JSON.parse('{"cs":2,"bi":1,"cj":1,"cH":2,"cK":2}'))
var u={c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.R
return{n:s("a1"),B:s("V"),V:s("W<@>"),x:s("I"),d:s("B"),R:s("e<@>"),C:s("u"),Z:s("aP"),u:s("ak"),Y:s("b<@>"),c:s("k<bw>"),G:s("k<aL>"),m:s("k<V>"),J:s("k<I>"),A:s("k<B>"),h7:s("k<aj<E>>"),p:s("k<O<c,c>>"),aX:s("k<O<c,i?>>"),gN:s("k<+index,score(a,a)>"),fD:s("k<a2>"),s:s("k<c>"),r:s("k<@>"),t:s("k<a>"),cv:s("k<r?>"),T:s("bG"),o:s("x"),g:s("X"),aU:s("Y<@>"),eP:s("A"),w:s("j<aL>"),e:s("j<bw>"),k:s("j<V>"),W:s("j<r>"),a:s("j<c>"),j:s("j<@>"),he:s("y<c,b1>"),b:s("y<c,p>"),d1:s("O<c,@>"),g6:s("O<c,a>"),eO:s("O<@,@>"),f:s("O<c,i?>"),eC:s("L<a,p>"),bv:s("ac"),P:s("M"),K:s("i"),E:s("bj"),h:s("r"),gT:s("lo"),bQ:s("+()"),L:s("+index,score(a,a)"),cz:s("bW"),U:s("bm"),er:s("a2"),l:s("a3"),N:s("c"),dm:s("q"),eK:s("as"),ak:s("aW"),aS:s("c3<r>"),ez:s("c6<~>"),_:s("C<@>"),D:s("C<~>"),y:s("E"),al:s("E(i)"),i:s("o"),z:s("@"),fO:s("@()"),v:s("@(i)"),Q:s("@(i,a3)"),S:s("a"),eH:s("aj<M>?"),an:s("x?"),bM:s("j<@>?"),X:s("i?"),dk:s("c?"),F:s("aX<@,@>?"),O:s("dt?"),fQ:s("E?"),I:s("o?"),h6:s("a?"),cg:s("p?"),q:s("p"),gA:s("p(a)"),H:s("~"),M:s("~()"),cA:s("~(c,@)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.aj=J.cR.prototype
B.a=J.k.prototype
B.c=J.bF.prototype
B.e=J.bd.prototype
B.b=J.al.prototype
B.ak=J.X.prototype
B.al=J.A.prototype
B.aK=A.bO.prototype
B.H=J.d8.prototype
B.o=J.aW.prototype
B.aq=s([300],t.t)
B.r=new A.b9(0,"info")
B.P=new A.aM(B.aq,!1,B.r)
B.S=new A.dK()
B.T=new A.dM()
B.t=new A.dQ()
B.bY=new A.B(3e5)
B.bZ=new A.B(5e5)
B.bW=new A.B(15e5)
B.U=new A.dW()
B.bX=new A.B(25e4)
B.V=new A.e3()
B.W=new A.ea()
B.u=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.X=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof HTMLElement == "function";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
B.a1=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var userAgent = navigator.userAgent;
    if (typeof userAgent != "string") return hooks;
    if (userAgent.indexOf("DumpRenderTree") >= 0) return hooks;
    if (userAgent.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
B.Y=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.a0=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
B.a_=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
B.Z=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
B.v=function(hooks) { return hooks; }

B.w=new A.ec()
B.a2=new A.ei()
B.a3=new A.d6()
B.a4=new A.es()
B.a5=new A.ew()
B.a6=new A.eB()
B.a7=new A.eC()
B.h=new A.eD()
B.d=new A.du()
B.a8=new A.dy()
B.x=new A.cE(0,"none")
B.a9=new A.bc(0,"ok")
B.aa=new A.bc(1,"needsAttention")
B.ab=new A.bc(2,"unknown")
B.m=new A.B(0)
B.y=new A.B(432e8)
B.ae=new A.B(5e6)
B.c_=new A.B(6e8)
B.af=new A.B(6048e8)
B.ah=new A.B(864e8)
B.ai=new A.ai(null)
B.am=new A.ed(null)
B.an=new A.ee(null)
B.ar=s(["la tua banca","servizio clienti banca","sicurezza bancaria","verifica del tuo conto"],t.s)
B.aG=new A.ac(0,"none")
B.aH=new A.ac(1,"cane")
B.aI=new A.ac(2,"wheelchair")
B.aJ=new A.ac(3,"walker")
B.G=new A.ac(4,"other")
B.as=s([B.aG,B.aH,B.aI,B.aJ,B.G],A.R("k<ac>"))
B.C=s(["ch","gh","gn","gl","sc"],t.s)
B.at=s(["hai vinto","congratulazioni ti sei aggiudicato","premio in palio","sei stato selezionato"],t.s)
B.au=s(["+390000000000"],t.s)
B.av=s(["conto bloccato","clicca subito","vincita","ultimo avviso","sospensione immediata","azione richiesta"],t.s)
B.aw=s(["codice","otp","pin","password"],t.s)
B.ay=s([],t.m)
B.ax=s([],t.A)
B.az=s([],t.s)
B.aA=s(["pacco in giacenza","tassa doganale","spese di consegna","corriere espresso"],t.s)
B.z=new A.ak(0,"minimal")
B.A=new A.ak(1,"standard")
B.B=new A.ak(2,"detailed")
B.D=s([B.z,B.A,B.B],A.R("k<ak>"))
B.E=s(["medication","lockDoor"],t.s)
B.aC=s([".","!","?"],t.s)
B.aN={gen:0,feb:1,mar:2,apr:3,mag:4,giu:5,lug:6,ago:7,set:8,ott:9,nov:10,dic:11}
B.aD=new A.ah(B.aN,[1,2,3,4,5,6,7,8,9,10,11,12],A.R("ah<c,a>"))
B.aL={rosso:0,verde:1,blu:2,giallo:3,bianco:4,nero:5,arancione:6,viola:7,rosa:8,marrone:9,grigio:10}
B.bu=new A.Q(220,20,20)
B.bs=new A.Q(20,140,20)
B.bt=new A.Q(20,20,200)
B.bv=new A.Q(230,220,20)
B.M=new A.Q(255,255,255)
B.L=new A.Q(0,0,0)
B.bw=new A.Q(240,130,20)
B.br=new A.Q(130,20,160)
B.bx=new A.Q(240,150,190)
B.bp=new A.Q(120,70,30)
B.bq=new A.Q(130,130,130)
B.F=new A.ah(B.aL,[B.bu,B.bs,B.bt,B.bv,B.M,B.L,B.bw,B.br,B.bx,B.bp,B.bq],A.R("ah<c,Q>"))
B.aM={doorbell:0,smoke_alarm:1,siren:2,baby_crying:3}
B.ap=s([200,100,200],t.t)
B.N=new A.aM(B.ap,!1,B.r)
B.aB=s([500,200,500,200,500],t.t)
B.R=new A.b9(2,"critical")
B.q=new A.aM(B.aB,!0,B.R)
B.ao=s([150,150,150],t.t)
B.Q=new A.b9(1,"warning")
B.O=new A.aM(B.ao,!1,B.Q)
B.aE=new A.ah(B.aM,[B.N,B.q,B.q,B.O],A.R("ah<c,aM>"))
B.ac=new A.B(12e8)
B.ag=new A.B(72e7)
B.ad=new A.B(42e7)
B.aF=new A.bE([B.z,B.ac,B.A,B.ag,B.B,B.ad],A.R("bE<ak,B>"))
B.aP=new A.bU("A profile with consentGiven set to true must have a consentTimestamp.")
B.aQ=new A.bU("A profile with a consentTimestamp must have consentGiven set to true.")
B.j=new A.aS(2,"emotions")
B.aR=new A.r("emotions-scared","Ho paura","I'm scared",B.j)
B.i=new A.aS(0,"needs")
B.aS=new A.r("needs-hungry","Ho fame","I'm hungry",B.i)
B.aT=new A.r("emotions-happy","Sono felice","I'm happy",B.j)
B.f=new A.aS(1,"greetings")
B.aU=new A.r("greetings-no","No","No",B.f)
B.aV=new A.r("needs-tired","Sono stanco","I'm tired",B.i)
B.aW=new A.r("greetings-yes","Si","Yes",B.f)
B.aX=new A.r("greetings-please","Per favore","Please",B.f)
B.k=new A.aS(3,"emergency")
B.aY=new A.r("emergency-call-family","Chiama la mia famiglia","Call my family",B.k)
B.aZ=new A.r("emotions-angry","Sono arrabbiato","I'm angry",B.j)
B.b_=new A.r("emotions-sad","Sono triste","I'm sad",B.j)
B.b0=new A.r("needs-bathroom","Bagno","Bathroom",B.i)
B.b1=new A.r("greetings-goodbye","Arrivederci","Goodbye",B.f)
B.b2=new A.r("emergency-call-doctor","Chiama un medico","Call a doctor",B.k)
B.b3=new A.r("emergency-not-well","Non mi sento bene","I don't feel well",B.k)
B.b4=new A.r("needs-water","Acqua","Water",B.i)
B.b5=new A.r("needs-pain","Ho dolore","I'm in pain",B.i)
B.b6=new A.r("emergency-help","Aiuto","Help",B.k)
B.b7=new A.r("greetings-thank-you","Grazie","Thank you",B.f)
B.b8=new A.r("greetings-hello","Ciao","Hello",B.f)
B.b9=new A.D(100,1)
B.ba=new A.D(1800,10)
B.bb=new A.D(300,1)
B.bc=new A.D(500,30)
B.I=new A.D(800,10)
B.bd=new A.D(1400,9.6)
B.be=new A.D(2000,9.8)
B.bf=new A.D(1600,9.9)
B.J=new A.D(0,9.8)
B.bg=new A.D(200,10.1)
B.bh=new A.D(2200,9.9)
B.bi=new A.D(1200,10.1)
B.bj=new A.D(400,9.6)
B.bk=new A.D(400,0.8)
B.K=new A.D(1000,9.7)
B.bl=new A.D(200,0.9)
B.bm=new A.D(600,9.9)
B.bn=new A.D(600,9.5)
B.bo=new A.D(450,0.9)
B.c3=new A.ar(3,"bankImpersonation")
B.by=new A.a2("It poses as a message from your bank.")
B.c5=new A.ar(5,"prizeNotification")
B.bz=new A.a2("It announces an unexpected prize or winnings.")
B.c0=new A.ar(0,"urgency")
B.bA=new A.a2("It uses urgent language to make you act without thinking.")
B.c4=new A.ar(4,"courierFee")
B.bB=new A.a2("It asks for a small payment for a package or delivery, a common pretext for stealing card details.")
B.c2=new A.ar(2,"shortUrl")
B.bC=new A.a2("It contains a shortened link hiding its real destination.")
B.c1=new A.ar(1,"codeRequest")
B.bD=new A.a2("It asks for a code, PIN, or password: no real bank or service ever asks for these by message.")
B.bE=new A.bY(0,"it")
B.bF=new A.bY(1,"en")
B.aO={il:0,lo:1,la:2,i:3,gli:4,le:5,un:6,uno:7,una:8,di:9,a:10,da:11,in:12,con:13,su:14,per:15,tra:16,fra:17,e:18,o:19,ma:20,che:21,chi:22,non:23,si:24,mi:25,ti:26,ci:27,vi:28,"\xe8":29,sono:30,ho:31,hai:32,ha:33,abbiamo:34}
B.bG=new A.bB(B.aO,35,A.R("bB<c>"))
B.n=new A.aV(0,"idle")
B.l=new A.aV(1,"countdown")
B.bH=new A.aV(2,"sent")
B.bI=new A.aV(3,"cancelled")
B.bJ=A.a8("ld")
B.bK=A.a8("hg")
B.bL=A.a8("j3")
B.bM=A.a8("j4")
B.bN=A.a8("j7")
B.bO=A.a8("j8")
B.bP=A.a8("j9")
B.bQ=A.a8("i")
B.bR=A.a8("jB")
B.bS=A.a8("jC")
B.bT=A.a8("jD")
B.bU=A.a8("jE")
B.p=new A.c2(0,"aa")
B.bV=new A.c2(1,"aaa")})();(function staticFields(){$.f4=null
$.a_=A.h([],A.R("k<i>"))
$.hr=null
$.he=null
$.hd=null
$.i9=null
$.i5=null
$.ib=null
$.fq=null
$.fw=null
$.h_=null
$.f8=A.h([],A.R("k<j<i>?>"))
$.bp=null
$.cx=null
$.cy=null
$.fV=!1
$.w=B.d
$.jk=A.h([B.b4,B.b0,B.aS,B.aV,B.b5,B.b8,B.b1,B.b7,B.aX,B.aW,B.aU,B.aT,B.b_,B.aR,B.aZ,B.b6,B.b2,B.aY,B.b3],A.R("k<r>"))
$.hX=1
$.fS=A.h([],t.m)
$.hY=1
$.hZ=1})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"lf","ie",()=>A.fr("_$dart_dartClosure"))
s($,"le","h4",()=>A.fr("_$dart_dartClosure_dartJSInterop"))
s($,"lQ","iG",()=>A.h([new J.cT()],A.R("k<bX>")))
s($,"lr","ip",()=>A.at(A.eO({
toString:function(){return"$receiver$"}})))
s($,"ls","iq",()=>A.at(A.eO({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"lt","ir",()=>A.at(A.eO(null)))
s($,"lu","is",()=>A.at(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"lx","iv",()=>A.at(A.eO(void 0)))
s($,"ly","iw",()=>A.at(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"lw","iu",()=>A.at(A.hw(null)))
s($,"lv","it",()=>A.at(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"lA","iy",()=>A.at(A.hw(void 0)))
s($,"lz","ix",()=>A.at(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"lB","h5",()=>A.jF())
s($,"lJ","fA",()=>A.h2(B.bQ))
s($,"lK","iE",()=>Symbol("jsBoxedDartObjectProperty"))
s($,"ln","im",()=>{var r=new A.dq(new DataView(new ArrayBuffer(8)))
r.bm()
return r})
s($,"lp","io",()=>A.a5("https?://(bit\\.ly|tinyurl\\.com|t\\.co|goo\\.gl)/\\S+",!1,!1))
s($,"li","ii",()=>A.a5("entro\\s+(?:il\\s+)?(\\d{1,2})[/\\-](\\d{1,2})[/\\-](\\d{2,4})",!1,!1))
s($,"ll","il",()=>A.a5("(\\d{1,2})/(\\d{1,2})/(\\d{2,4})",!0,!1))
s($,"lg","ig",()=>A.a5("(\\d{1,2})-(\\d{1,2})-(\\d{2,4})",!0,!1))
s($,"lh","ih",()=>A.a5("(\\d{1,2})\\.(\\d{1,2})\\.(\\d{2,4})",!0,!1))
s($,"lj","ij",()=>A.a5("(\\d{1,2})\\s+(gen|feb|mar|apr|mag|giu|lug|ago|set|ott|nov|dic)\\w*\\s+(\\d{4})",!1,!1))
s($,"lk","ik",()=>A.a5("scad\\.?\\s*(\\d{1,2})[/\\-](\\d{4})",!1,!1))
s($,"lH","iC",()=>new A.dV())
s($,"lF","iB",()=>new A.dP())
s($,"lV","iJ",()=>new A.eH())
s($,"lC","iz",()=>new A.dJ())
s($,"lE","h6",()=>new A.dO(A.dE()))
s($,"lR","h9",()=>new A.cO(A.h([],A.R("k<+message,recipients(c,j<c>)>"))))
s($,"lS","fC",()=>new A.eE($.h9(),B.ae,B.n))
s($,"lL","iF",()=>{var r=$.im()
return new A.ek(r)})
s($,"lD","iA",()=>new A.e7(A.bM(t.N,t.B)))
s($,"lG","dG",()=>new A.dS(A.dE()))
s($,"lN","fB",()=>A.jj())
s($,"lX","iL",()=>new A.en(A.dE(),A.bM(t.N,A.R("b1"))))
s($,"lM","h7",()=>new A.el(A.bM(t.N,A.R("d7"))))
s($,"lO","h8",()=>new A.eu(A.dE(),A.bM(t.N,t.U)))
s($,"lP","dH",()=>new A.ex(B.E,A.dE(),A.jg(t.N)))
s($,"lT","iH",()=>A.i2(A.h([B.J,B.bg,B.bj,B.bm,B.I,B.K],A.R("k<+(a,o)>"))))
s($,"lI","iD",()=>A.i2(A.h([B.J,B.b9,B.bl,B.bb,B.bk,B.bo,B.bc,B.bn,B.I,B.K,B.bi,B.bd,B.bf,B.ba,B.be,B.bh],A.R("k<+(a,o)>"))))
s($,"lU","iI",()=>A.i4(A.h([0,600,1200,1800,2400,3000,3600,4200],t.t)))
s($,"lW","iK",()=>A.i4(A.h([0,300,1200,1500,2700,3000,4500,4800],t.t)))})();(function nativeSupport(){!function(){var s=function(a){var m={}
m[a]=1
return Object.keys(hunkHelpers.convertToFastObject(m))[0]}
v.getIsolateTag=function(a){return s("___dart_"+a+v.isolateTag)}
var r="___dart_isolate_tags_"
var q=Object[r]||(Object[r]=Object.create(null))
var p="_ZxYxX"
for(var o=0;;o++){var n=s(p+"_"+o+"_")
if(!(n in q)){q[n]=1
v.isolateTag=n
break}}v.dispatchPropertyName=v.getIsolateTag("dispatch_record")}()
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.aR,SharedArrayBuffer:A.aR,ArrayBufferView:A.bR,DataView:A.bO,Float32Array:A.cZ,Float64Array:A.d_,Int16Array:A.d0,Int32Array:A.d1,Int8Array:A.d2,Uint16Array:A.d3,Uint32Array:A.d4,Uint8ClampedArray:A.bS,CanvasPixelArray:A.bS,Uint8Array:A.d5})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.bi.$nativeSuperclassTag="ArrayBufferView"
A.cd.$nativeSuperclassTag="ArrayBufferView"
A.ce.$nativeSuperclassTag="ArrayBufferView"
A.bP.$nativeSuperclassTag="ArrayBufferView"
A.cf.$nativeSuperclassTag="ArrayBufferView"
A.cg.$nativeSuperclassTag="ArrayBufferView"
A.bQ.$nativeSuperclassTag="ArrayBufferView"})()
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$0=function(){return this()}
Function.prototype.$1$1=function(a){return this(a)}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$1$0=function(){return this()}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.l6
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
//# sourceMappingURL=lumen-demo.js.map
