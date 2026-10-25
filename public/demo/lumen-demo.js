(function dartProgram(){function copyProperties(a,b){var t=Object.keys(a)
for(var s=0;s<t.length;s++){var r=t[s]
b[r]=a[r]}}function mixinPropertiesHard(a,b){var t=Object.keys(a)
for(var s=0;s<t.length;s++){var r=t[s]
if(!b.hasOwnProperty(r)){b[r]=a[r]}}}function mixinPropertiesEasy(a,b){Object.assign(b,a)}var z=function(){var t=function(){}
t.prototype={p:{}}
var s=new t()
if(!(Object.getPrototypeOf(s)&&Object.getPrototypeOf(s).p===t.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var r=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(r))return true}}catch(q){}return false}()
function inherit(a,b){a.prototype.constructor=a
a.prototype["$i"+a.name]=a
if(b!=null){if(z){Object.setPrototypeOf(a.prototype,b.prototype)
return}var t=Object.create(b.prototype)
copyProperties(a.prototype,t)
a.prototype=t}}function inheritMany(a,b){for(var t=0;t<b.length;t++){inherit(b[t],a)}}function mixinEasy(a,b){mixinPropertiesEasy(b.prototype,a.prototype)
a.prototype.constructor=a}function mixinHard(a,b){mixinPropertiesHard(b.prototype,a.prototype)
a.prototype.constructor=a}function lazy(a,b,c,d){var t=a
a[b]=t
a[c]=function(){if(a[b]===t){a[b]=d()}a[c]=function(){return this[b]}
return a[b]}}function lazyFinal(a,b,c,d){var t=a
a[b]=t
a[c]=function(){if(a[b]===t){var s=d()
if(a[b]!==t){A.is(b)}a[b]=s}var r=a[b]
a[c]=function(){return r}
return r}}function makeConstList(a,b){if(b!=null)A.h(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var t=0;t<a.length;++t){convertToFastObject(a[t])}}var y=0
function instanceTearOffGetter(a,b){var t=null
return a?function(c){if(t===null)t=A.dR(b)
return new t(c,this)}:function(){if(t===null)t=A.dR(b)
return new t(this,null)}}function staticTearOffGetter(a){var t=null
return function(){if(t===null)t=A.dR(a).prototype
return t}}var x=0
function tearOffParameters(a,b,c,d,e,f,g,h,i,j){if(typeof h=="number"){h+=x}return{co:a,iS:b,iI:c,rC:d,dV:e,cs:f,fs:g,fT:h,aI:i||0,nDA:j}}function installStaticTearOff(a,b,c,d,e,f,g,h){var t=tearOffParameters(a,true,false,c,d,e,f,g,h,false)
var s=staticTearOffGetter(t)
a[b]=s}function installInstanceTearOff(a,b,c,d,e,f,g,h,i,j){c=!!c
var t=tearOffParameters(a,false,c,d,e,f,g,h,i,!!j)
var s=instanceTearOffGetter(c,t)
a[b]=s}function setOrUpdateInterceptorsByTag(a){var t=v.interceptorsByTag
if(!t){v.interceptorsByTag=a
return}copyProperties(a,t)}function setOrUpdateLeafTags(a){var t=v.leafTags
if(!t){v.leafTags=a
return}copyProperties(a,t)}function updateTypes(a){var t=v.types
var s=t.length
t.push.apply(t,a)
return s}function updateHolder(a,b){copyProperties(b,a)
return a}var hunkHelpers=function(){var t=function(a,b,c,d,e){return function(f,g,h,i){return installInstanceTearOff(f,g,a,b,c,d,[h],i,e,false)}},s=function(a,b,c,d){return function(e,f,g,h){return installStaticTearOff(e,f,a,b,c,[g],h,d)}}
return{inherit:inherit,inheritMany:inheritMany,mixin:mixinEasy,mixinHard:mixinHard,installStaticTearOff:installStaticTearOff,installInstanceTearOff:installInstanceTearOff,_instance_0u:t(0,0,null,["$0"],0),_instance_1u:t(0,1,null,["$1"],0),_instance_2u:t(0,2,null,["$2"],0),_instance_0i:t(1,0,null,["$0"],0),_instance_1i:t(1,1,null,["$1"],0),_instance_2i:t(1,2,null,["$2"],0),_static_0:s(0,null,["$0"],0),_static_1:s(1,null,["$1"],0),_static_2:s(2,null,["$2"],0),makeConstList:makeConstList,lazy:lazy,lazyFinal:lazyFinal,updateHolder:updateHolder,convertToFastObject:convertToFastObject,updateTypes:updateTypes,setOrUpdateInterceptorsByTag:setOrUpdateInterceptorsByTag,setOrUpdateLeafTags:setOrUpdateLeafTags}}()
function initializeDeferredHunk(a){x=v.types.length
a(hunkHelpers,v,w,$)}var J={
dW(a,b,c,d){return{i:a,p:b,e:c,x:d}},
d6(a){var t,s,r,q,p,o="_$dart_js",n=a[v.dispatchPropertyName]
if(n==null)if($.dU==null){A.ij()
n=a[v.dispatchPropertyName]}if(n!=null){t=n.p
if(!1===t)return n.i
if(!0===t)return a
s=Object.getPrototypeOf(a)
if(t===s)return n.i
if(n.e===s)throw A.d(A.ep("Return interceptor for "+A.j(t(a,n))))}r=a.constructor
if(r==null)q=null
else{p=$.cT
if(p==null)p=$.cT=A.d5(o)
q=r[p]}if(q!=null)return q
q=A.io(a)
if(q!=null)return q
if(typeof a=="function")return B.M
t=Object.getPrototypeOf(a)
if(t==null)return B.q
if(t===Object.prototype)return B.q
if(typeof r=="function"){p=$.cT
if(p==null)p=$.cT=A.d5(o)
Object.defineProperty(r,p,{value:B.l,enumerable:false,writable:true,configurable:true})
return B.l}return B.l},
fD(a,b){if(a<0||a>4294967295)throw A.d(A.a2(a,0,4294967295,"length",null))
return J.fE(new Array(a),b)},
fE(a,b){var t=A.h(a,b.h("o<0>"))
t.$flags=1
return t},
fF(a,b){var t=u.U
return J.fp(t.a(a),t.a(b))},
ed(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
fG(a,b){var t,s
for(t=a.length;b<t;){s=a.charCodeAt(b)
if(s!==32&&s!==13&&!J.ed(s))break;++b}return b},
fH(a,b){var t,s,r
for(t=a.length;b>0;b=s){s=b-1
if(!(s<t))return A.e(a,s)
r=a.charCodeAt(s)
if(r!==32&&r!==13&&!J.ed(r))break}return b},
aq(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.aW.prototype
return J.bO.prototype}if(typeof a=="string")return J.P.prototype
if(a==null)return J.aX.prototype
if(typeof a=="boolean")return J.bN.prototype
if(Array.isArray(a))return J.o.prototype
if(typeof a!="object"){if(typeof a=="function")return J.Q.prototype
if(typeof a=="symbol")return J.ay.prototype
if(typeof a=="bigint")return J.ax.prototype
return a}if(a instanceof A.i)return a
return J.d6(a)},
dT(a){if(typeof a=="string")return J.P.prototype
if(a==null)return a
if(Array.isArray(a))return J.o.prototype
if(typeof a!="object"){if(typeof a=="function")return J.Q.prototype
if(typeof a=="symbol")return J.ay.prototype
if(typeof a=="bigint")return J.ax.prototype
return a}if(a instanceof A.i)return a
return J.d6(a)},
eS(a){if(a==null)return a
if(Array.isArray(a))return J.o.prototype
if(typeof a!="object"){if(typeof a=="function")return J.Q.prototype
if(typeof a=="symbol")return J.ay.prototype
if(typeof a=="bigint")return J.ax.prototype
return a}if(a instanceof A.i)return a
return J.d6(a)},
ic(a){if(typeof a=="number")return J.av.prototype
if(typeof a=="string")return J.P.prototype
if(a==null)return a
if(!(a instanceof A.i))return J.ah.prototype
return a},
id(a){if(typeof a=="string")return J.P.prototype
if(a==null)return a
if(!(a instanceof A.i))return J.ah.prototype
return a},
ie(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.Q.prototype
if(typeof a=="symbol")return J.ay.prototype
if(typeof a=="bigint")return J.ax.prototype
return a}if(a instanceof A.i)return a
return J.d6(a)},
cf(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.aq(a).E(a,b)},
e2(a,b){return J.id(a).ah(a,b)},
fo(a,b,c){return J.ie(a).aj(a,b,c)},
fp(a,b){return J.ic(a).u(a,b)},
e3(a,b){return J.eS(a).t(a,b)},
X(a){return J.aq(a).gp(a)},
fq(a){return J.dT(a).gap(a)},
bw(a){return J.eS(a).gn(a)},
dx(a){return J.dT(a).gk(a)},
fr(a){return J.aq(a).gA(a)},
bx(a){return J.aq(a).i(a)},
bK:function bK(){},
bN:function bN(){},
aX:function aX(){},
aY:function aY(){},
a0:function a0(){},
bX:function bX(){},
ah:function ah(){},
Q:function Q(){},
ax:function ax(){},
ay:function ay(){},
o:function o(a){this.$ti=a},
bM:function bM(){},
cr:function cr(a){this.$ti=a},
aP:function aP(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
av:function av(){},
aW:function aW(){},
bO:function bO(){},
P:function P(){}},A={dB:function dB(){},
a4(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
dH(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
dQ(a,b,c){return a},
dV(a){var t,s
for(t=$.H.length,s=0;s<t;++s)if(a===$.H[s])return!0
return!1},
en(a,b,c,d){A.dF(b,"start")
A.dF(c,"end")
if(b>c)A.at(A.a2(b,0,c,"start",null))
return new A.bh(a,b,c,d.h("bh<0>"))},
fJ(a,b,c,d){if(u.O.b(a))return new A.aU(a,b,c.h("@<0>").J(d).h("aU<1,2>"))
return new A.af(a,b,c.h("@<0>").J(d).h("af<1,2>"))},
bL(){return new A.bg("No element")},
bS:function bS(a){this.a=a},
cI:function cI(){},
l:function l(){},
u:function u(){},
bh:function bh(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
ae:function ae(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
af:function af(a,b,c){this.a=a
this.b=b
this.$ti=c},
aU:function aU(a,b,c){this.a=a
this.b=b
this.$ti=c},
b3:function b3(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
F:function F(a,b,c){this.a=a
this.b=b
this.$ti=c},
T:function T(a,b,c){this.a=a
this.b=b
this.$ti=c},
U:function U(a,b,c){this.a=a
this.b=b
this.$ti=c},
aV:function aV(){},
eY(a){var t=A.eX(a)
if(t!=null)return t
return"minified:"+a},
j4(a,b){var t
if(b!=null){t=b.x
if(t!=null)return t}return u.p.b(a)},
j(a){var t
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
t=J.bx(a)
return t},
c_(a){var t,s=$.ej
if(s==null)s=$.ej=Symbol("identityHashCode")
t=a[s]
if(t==null){t=Math.random()*0x3fffffff|0
a[s]=t}return t},
fS(a,b){var t,s=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(s==null)return null
if(3>=s.length)return A.e(s,3)
t=s[3]
if(t!=null)return parseInt(a,10)
if(s[2]!=null)return parseInt(a,16)
return null},
fR(a){var t,s
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return null
t=parseFloat(a)
if(isNaN(t)){s=B.b.U(a)
if(s==="NaN"||s==="+NaN"||s==="-NaN")return t
return null}return t},
c0(a){var t,s,r,q
if(a instanceof A.i)return A.G(A.bu(a),null)
t=J.aq(a)
if(t===B.L||t===B.N||u.o.b(a)){s=B.n(a)
if(s!=="Object"&&s!=="")return s
r=a.constructor
if(typeof r=="function"){q=r.name
if(typeof q=="string"&&q!=="Object"&&q!=="")return q}}return A.G(A.bu(a),null)},
ek(a){var t,s,r
if(a==null||typeof a=="number"||A.dO(a))return J.bx(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.Z)return a.i(0)
if(a instanceof A.ak)return a.af(!0)
t=$.fk()
for(s=0;s<1;++s){r=t[s].bb(a)
if(r!=null)return r}return"Instance of '"+A.c0(a)+"'"},
x(a){var t
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){t=a-65536
return String.fromCharCode((B.c.ae(t,10)|55296)>>>0,t&1023|56320)}throw A.d(A.a2(a,0,1114111,null,null))},
fT(a,b,c,d,e,f,g,h,i){var t,s,r,q=b-1
if(0<=a&&a<100){a+=400
q-=4800}t=B.c.W(h,1000)
s=new Date(a,q,c,d,e,f,g+B.c.C(h-t,1000)).valueOf()
r=!0
if(!isNaN(s))if(!(s<-864e13))if(!(s>864e13))r=s===864e13&&t!==0
if(r)return null
return s},
aD(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
bZ(a){var t=A.aD(a).getFullYear()+0
return t},
bY(a){var t=A.aD(a).getMonth()+1
return t},
ba(a){var t=A.aD(a).getDate()+0
return t},
fN(a){var t=A.aD(a).getHours()+0
return t},
fP(a){var t=A.aD(a).getMinutes()+0
return t},
fQ(a){var t=A.aD(a).getSeconds()+0
return t},
fO(a){var t=A.aD(a).getMilliseconds()+0
return t},
e(a,b){if(a==null)J.dx(a)
throw A.d(A.eR(a,b))},
eR(a,b){var t,s="index"
if(!A.eK(b))return new A.Y(!0,b,s,null)
t=J.dx(a)
if(b<0||b>=t)return A.dz(b,t,a,s)
return new A.aE(null,null,!0,b,s,"Value not in range")},
d(a){return A.y(a,new Error())},
y(a,b){var t
if(a==null)a=new A.bi()
b.dartException=a
t=A.it
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:t})
b.name=""}else b.toString=t
return b},
it(){return J.bx(this.dartException)},
at(a,b){throw A.y(a,b==null?new Error():b)},
du(a,b,c){var t
if(b==null)b=0
if(c==null)c=0
t=Error()
A.at(A.hx(a,b,c),t)},
hx(a,b,c){var t,s,r,q,p,o,n,m,l
if(typeof b=="string")t=b
else{s="[]=;add;removeWhere;retainWhere;removeRange;setRange;setInt8;setInt16;setInt32;setUint8;setUint16;setUint32;setFloat32;setFloat64".split(";")
r=s.length
q=b
if(q>r){c=q/r|0
q%=r}t=s[q]}p=typeof c=="string"?c:"modify;remove from;add to".split(";")[c]
o=u.j.b(a)?"list":"ByteData"
n=a.$flags|0
m="a "
if((n&4)!==0)l="constant "
else if((n&2)!==0){l="unmodifiable "
m="an "}else l=(n&1)!==0?"fixed-length ":""
return new A.bj("'"+t+"': Cannot "+p+" "+m+l+o)},
W(a){throw A.d(A.L(a))},
S(a){var t,s,r,q,p,o
a=A.ir(a.replace(String({}),"$receiver$"))
t=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(t==null)t=A.h([],u.s)
s=t.indexOf("\\$arguments\\$")
r=t.indexOf("\\$argumentsExpr\\$")
q=t.indexOf("\\$expr\\$")
p=t.indexOf("\\$method\\$")
o=t.indexOf("\\$receiver\\$")
return new A.cP(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),s,r,q,p,o)},
cQ(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(t){return t.message}}(a)},
eo(a){return function($expr$){try{$expr$.$method$}catch(t){return t.message}}(a)},
dC(a,b){var t=b==null,s=t?null:b.method
return new A.bQ(a,s,t?null:b.receiver)},
eZ(a){if(a==null)return new A.cx(a)
if(typeof a!=="object")return a
if("dartException" in a)return A.as(a,a.dartException)
return A.i4(a)},
as(a,b){if(u.Q.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
i4(a){var t,s,r,q,p,o,n,m,l,k,j,i,h
if(!("message" in a))return a
t=a.message
if("number" in a&&typeof a.number=="number"){s=a.number
r=s&65535
if((B.c.ae(s,16)&8191)===10)switch(r){case 438:return A.as(a,A.dC(A.j(t)+" (Error "+r+")",null))
case 445:case 5007:A.j(t)
return A.as(a,new A.b8())}}if(a instanceof TypeError){q=$.f7()
p=$.f8()
o=$.f9()
n=$.fa()
m=$.fd()
l=$.fe()
k=$.fc()
$.fb()
j=$.fg()
i=$.ff()
h=q.v(t)
if(h!=null)return A.as(a,A.dC(A.q(t),h))
else{h=p.v(t)
if(h!=null){h.method="call"
return A.as(a,A.dC(A.q(t),h))}else if(o.v(t)!=null||n.v(t)!=null||m.v(t)!=null||l.v(t)!=null||k.v(t)!=null||n.v(t)!=null||j.v(t)!=null||i.v(t)!=null){A.q(t)
return A.as(a,new A.b8())}}return A.as(a,new A.c6(typeof t=="string"?t:""))}if(a instanceof RangeError){if(typeof t=="string"&&t.indexOf("call stack")!==-1)return new A.bf()
t=function(b){try{return String(b)}catch(g){}return null}(a)
return A.as(a,new A.Y(!1,null,null,typeof t=="string"?t.replace(/^RangeError:\s*/,""):t))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof t=="string"&&t==="too much recursion")return new A.bf()
return a},
eU(a){if(a==null)return J.X(a)
if(typeof a=="object")return A.c_(a)
return J.X(a)},
ib(a,b){var t,s,r,q=a.length
for(t=0;t<q;t=r){s=t+1
r=s+1
b.q(0,a[t],a[s])}return b},
hH(a,b,c,d,e,f){u.Z.a(a)
switch(A.v(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.d(new A.cS("Unsupported number of arguments for wrapped closure"))},
i5(a,b){var t=a.$identity
if(!!t)return t
t=A.i6(a,b)
a.$identity=t
return t},
i6(a,b){var t
switch(b){case 0:t=a.$0
break
case 1:t=a.$1
break
case 2:t=a.$2
break
case 3:t=a.$3
break
case 4:t=a.$4
break
default:t=null}if(t!=null)return t.bind(a)
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.hH)},
fz(a1){var t,s,r,q,p,o,n,m,l,k,j=a1.co,i=a1.iS,h=a1.iI,g=a1.nDA,f=a1.aI,e=a1.fs,d=a1.cs,c=e[0],b=d[0],a=j[c],a0=a1.fT
a0.toString
t=i?Object.create(new A.c2().constructor.prototype):Object.create(new A.au(null,null).constructor.prototype)
t.$initialize=t.constructor
s=i?function static_tear_off(){this.$initialize()}:function tear_off(a2,a3){this.$initialize(a2,a3)}
t.constructor=s
s.prototype=t
t.$_name=c
t.$_target=a
r=!i
if(r)q=A.e9(c,a,h,g)
else{t.$static_name=c
q=a}t.$S=A.fv(a0,i,h)
t[b]=q
for(p=q,o=1;o<e.length;++o){n=e[o]
if(typeof n=="string"){m=j[n]
l=n
n=m}else l=""
k=d[o]
if(k!=null){if(r)n=A.e9(l,n,h,g)
t[k]=n}if(o===f)p=n}t.$C=p
t.$R=a1.rC
t.$D=a1.dV
return s},
fv(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.d("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.ft)}throw A.d("Error in functionType of tearoff")},
fw(a,b,c,d){var t=A.e7
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,t)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,t)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,t)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,t)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,t)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,t)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,t)}},
e9(a,b,c,d){if(c)return A.fy(a,b,d)
return A.fw(b.length,d,a,b)},
fx(a,b,c,d){var t=A.e7,s=A.fu
switch(b?-1:a){case 0:throw A.d(new A.c1("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,s,t)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,s,t)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,s,t)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,s,t)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,s,t)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,s,t)
default:return function(e,f,g){return function(){var r=[g(this)]
Array.prototype.push.apply(r,arguments)
return e.apply(f(this),r)}}(d,s,t)}},
fy(a,b,c){var t,s
if($.e5==null)$.e5=A.e4("interceptor")
if($.e6==null)$.e6=A.e4("receiver")
t=b.length
s=A.fx(t,c,a,b)
return s},
dR(a){return A.fz(a)},
ft(a,b){return A.bt(v.typeUniverse,A.bu(a.a),b)},
e7(a){return a.a},
fu(a){return a.b},
e4(a){var t,s,r,q=new A.au("receiver","interceptor"),p=Object.getOwnPropertyNames(q)
p.$flags=1
t=p
for(p=t.length,s=0;s<p;++s){r=t[s]
if(q[r]===a)return r}throw A.d(A.aO("Field name "+a+" not found."))},
d5(a){return v.getIsolateTag(a)},
j3(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
io(a){var t,s,r,q,p,o=A.q($.eT.$1(a)),n=$.d4[o]
if(n!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}t=$.da[o]
if(t!=null)return t
s=v.interceptorsByTag[o]
if(s==null){r=A.eF($.eP.$2(a,o))
if(r!=null){n=$.d4[r]
if(n!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}t=$.da[r]
if(t!=null)return t
s=v.interceptorsByTag[r]
o=r}}if(s==null)return null
t=s.prototype
q=o[0]
if(q==="!"){n=A.dt(t)
$.d4[o]=n
Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}if(q==="~"){$.da[o]=t
return t}if(q==="-"){p=A.dt(t)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:p,enumerable:false,writable:true,configurable:true})
return p.i}if(q==="+")return A.eV(a,t)
if(q==="*")throw A.d(A.ep(o))
if(v.leafTags[o]===true){p=A.dt(t)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:p,enumerable:false,writable:true,configurable:true})
return p.i}else return A.eV(a,t)},
eV(a,b){var t=Object.getPrototypeOf(a)
Object.defineProperty(t,v.dispatchPropertyName,{value:J.dW(b,t,null,null),enumerable:false,writable:true,configurable:true})
return b},
dt(a){return J.dW(a,!1,null,!!a.$ibP)},
iq(a,b,c){var t=b.prototype
if(v.leafTags[a]===true)return A.dt(t)
else return J.dW(t,c,null,null)},
ij(){if(!0===$.dU)return
$.dU=!0
A.ik()},
ik(){var t,s,r,q,p,o,n,m
$.d4=Object.create(null)
$.da=Object.create(null)
A.ii()
t=v.interceptorsByTag
s=Object.getOwnPropertyNames(t)
if(typeof window!="undefined"){window
r=function(){}
for(q=0;q<s.length;++q){p=s[q]
o=$.eW.$1(p)
if(o!=null){n=A.iq(p,t[p],o)
if(n!=null){Object.defineProperty(o,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
r.prototype=o}}}}for(q=0;q<s.length;++q){p=s[q]
if(/^[A-Za-z_]/.test(p)){m=t[p]
t["!"+p]=m
t["~"+p]=m
t["-"+p]=m
t["+"+p]=m
t["*"+p]=m}}},
ii(){var t,s,r,q,p,o,n=B.u()
n=A.aL(B.v,A.aL(B.w,A.aL(B.m,A.aL(B.m,A.aL(B.x,A.aL(B.y,A.aL(B.z(B.n),n)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){t=dartNativeDispatchHooksTransformer
if(typeof t=="function")t=[t]
if(Array.isArray(t))for(s=0;s<t.length;++s){r=t[s]
if(typeof r=="function")n=r(n)||n}}q=n.getTag
p=n.getUnknownTag
o=n.prototypeForTag
$.eT=new A.d7(q)
$.eP=new A.d8(p)
$.eW=new A.d9(o)},
aL(a,b){return a(b)||b},
i8(a,b){var t=b.length,s=v.rttc[""+t+";"+a]
if(s==null)return null
if(t===0)return s
if(t===s.length)return s.apply(null,b)
return s(b)},
ee(a,b,c,d,e,f){var t=b?"m":"",s=c?"":"i",r=d?"u":"",q=e?"s":"",p=function(g,h){try{return new RegExp(g,h)}catch(o){return o}}(a,t+s+r+q+f)
if(p instanceof RegExp)return p
throw A.d(A.dy("Illegal RegExp pattern ("+String(p)+")",a))},
dX(a,b,c){var t
if(typeof b=="string")return a.indexOf(b,c)>=0
else if(b instanceof A.aw){t=B.b.H(a,c)
return b.b.test(t)}else return!J.e2(b,B.b.H(a,c)).gM(0)},
ir(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
bo:function bo(a,b){this.a=a
this.b=b},
aQ:function aQ(){},
a8:function a8(a,b,c){this.a=a
this.b=b
this.$ti=c},
bk:function bk(a,b){this.a=a
this.$ti=b},
ai:function ai(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aR:function aR(){},
aS:function aS(a,b,c){this.a=a
this.b=b
this.$ti=c},
bc:function bc(){},
cP:function cP(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
b8:function b8(){},
bQ:function bQ(a,b,c){this.a=a
this.b=b
this.c=c},
c6:function c6(a){this.a=a},
cx:function cx(a){this.a=a},
Z:function Z(){},
bA:function bA(){},
bB:function bB(){},
c4:function c4(){},
c2:function c2(){},
au:function au(a,b){this.a=a
this.b=b},
c1:function c1(a){this.a=a},
ab:function ab(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
cu:function cu(a,b){this.a=a
this.b=b
this.c=null},
cv:function cv(a,b){this.a=a
this.$ti=b},
ac:function ac(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
E:function E(a,b){this.a=a
this.$ti=b},
b1:function b1(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b_:function b_(a,b){this.a=a
this.$ti=b},
b0:function b0(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
d7:function d7(a){this.a=a},
d8:function d8(a){this.a=a},
d9:function d9(a){this.a=a},
ak:function ak(){},
aI:function aI(){},
aw:function aw(a,b){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null},
bl:function bl(a){this.b=a},
c7:function c7(a,b,c){this.a=a
this.b=b
this.c=c},
c8:function c8(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
c3:function c3(a,b){this.a=a
this.c=b},
cc:function cc(a,b,c){this.a=a
this.b=b
this.c=c},
cd:function cd(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
fK(a,b,c){var t=new Uint8Array(a,b,c)
return t},
ag:function ag(){},
b6:function b6(){},
d_:function d_(a){this.a=a},
b4:function b4(){},
aA:function aA(){},
b5:function b5(){},
bU:function bU(){},
bm:function bm(){},
bn:function bn(){},
dG(a,b){var t=b.c
return t==null?b.c=A.br(a,"ec",[b.x]):t},
el(a){var t=a.w
if(t===6||t===7)return A.el(a.x)
return t===11||t===12},
fX(a){return a.as},
a6(a){return A.cZ(v.typeUniverse,a,!1)},
ao(a0,a1,a2,a3){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=a1.w
switch(a){case 5:case 1:case 2:case 3:case 4:return a1
case 6:t=a1.x
s=A.ao(a0,t,a2,a3)
if(s===t)return a1
return A.ex(a0,s,!0)
case 7:t=a1.x
s=A.ao(a0,t,a2,a3)
if(s===t)return a1
return A.ew(a0,s,!0)
case 8:r=a1.y
q=A.aK(a0,r,a2,a3)
if(q===r)return a1
return A.br(a0,a1.x,q)
case 9:p=a1.x
o=A.ao(a0,p,a2,a3)
n=a1.y
m=A.aK(a0,n,a2,a3)
if(o===p&&m===n)return a1
return A.dJ(a0,o,m)
case 10:l=a1.x
k=a1.y
j=A.aK(a0,k,a2,a3)
if(j===k)return a1
return A.ey(a0,l,j)
case 11:i=a1.x
h=A.ao(a0,i,a2,a3)
g=a1.y
f=A.i_(a0,g,a2,a3)
if(h===i&&f===g)return a1
return A.ev(a0,h,f)
case 12:e=a1.y
a3+=e.length
d=A.aK(a0,e,a2,a3)
p=a1.x
o=A.ao(a0,p,a2,a3)
if(d===e&&o===p)return a1
return A.dK(a0,o,d,!0)
case 13:c=a1.x
if(c<a3)return a1
b=a2[c-a3]
if(b==null)return a1
return b
default:throw A.d(A.bz("Attempted to substitute unexpected RTI kind "+a))}},
aK(a,b,c,d){var t,s,r,q,p=b.length,o=A.d0(p)
for(t=!1,s=0;s<p;++s){r=b[s]
q=A.ao(a,r,c,d)
if(q!==r)t=!0
o[s]=q}return t?o:b},
i0(a,b,c,d){var t,s,r,q,p,o,n=b.length,m=A.d0(n)
for(t=!1,s=0;s<n;s+=3){r=b[s]
q=b[s+1]
p=b[s+2]
o=A.ao(a,p,c,d)
if(o!==p)t=!0
m.splice(s,3,r,q,o)}return t?m:b},
i_(a,b,c,d){var t,s=b.a,r=A.aK(a,s,c,d),q=b.b,p=A.aK(a,q,c,d),o=b.c,n=A.i0(a,o,c,d)
if(r===s&&p===q&&n===o)return b
t=new A.ca()
t.a=r
t.b=p
t.c=n
return t},
h(a,b){a[v.arrayRti]=b
return a},
eQ(a){var t=a.$S
if(t!=null){if(typeof t=="number")return A.ih(t)
return a.$S()}return null},
il(a,b){var t
if(A.el(b))if(a instanceof A.Z){t=A.eQ(a)
if(t!=null)return t}return A.bu(a)},
bu(a){if(a instanceof A.i)return A.w(a)
if(Array.isArray(a))return A.N(a)
return A.dN(J.aq(a))},
N(a){var t=a[v.arrayRti],s=u.w
if(t==null)return s
if(t.constructor!==s.constructor)return s
return t},
w(a){var t=a.$ti
return t!=null?t:A.dN(a)},
dN(a){var t=a.constructor,s=t.$ccache
if(s!=null)return s
return A.hF(a,t)},
hF(a,b){var t=a instanceof A.Z?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,s=A.hh(v.typeUniverse,t.name)
b.$ccache=s
return s},
ih(a){var t,s=v.types,r=s[a]
if(typeof r=="string"){t=A.cZ(v.typeUniverse,r,!1)
s[a]=t
return t}return r},
ig(a){return A.ap(A.w(a))},
dP(a){var t
if(a instanceof A.ak)return A.ia(a.$r,a.aa())
t=a instanceof A.Z?A.eQ(a):null
if(t!=null)return t
if(u.R.b(a))return J.fr(a).a
if(Array.isArray(a))return A.N(a)
return A.bu(a)},
ap(a){var t=a.r
return t==null?a.r=new A.cY(a):t},
ia(a,b){var t,s,r=b,q=r.length
if(q===0)return u.F
if(0>=q)return A.e(r,0)
t=A.bt(v.typeUniverse,A.dP(r[0]),"@<0>")
for(s=1;s<q;++s){if(!(s<r.length))return A.e(r,s)
t=A.eA(v.typeUniverse,t,A.dP(r[s]))}return A.bt(v.typeUniverse,t,a)},
dv(a){return A.ap(A.cZ(v.typeUniverse,a,!1))},
hE(a){var t=this
t.b=A.hY(t)
return t.b(a)},
hY(a){var t,s,r,q,p
if(a===u.K)return A.hN
if(A.ar(a))return A.hR
t=a.w
if(t===6)return A.hC
if(t===1)return A.eM
if(t===7)return A.hI
s=A.hX(a)
if(s!=null)return s
if(t===8){r=a.x
if(a.y.every(A.ar)){a.f="$i"+r
if(r==="J")return A.hL
if(a===u.m)return A.hK
return A.hQ}}else if(t===10){q=A.i8(a.x,a.y)
p=q==null?A.eM:q
return p==null?A.dL(p):p}return A.hA},
hX(a){if(a.w===8){if(a===u.S)return A.eK
if(a===u.i||a===u.H)return A.hM
if(a===u.N)return A.hP
if(a===u.y)return A.dO}return null},
hD(a){var t=this,s=A.hz
if(A.ar(t))s=A.hq
else if(t===u.K)s=A.dL
else if(A.aN(t)){s=A.hB
if(t===u.B)s=A.hn
else if(t===u.x)s=A.eF
else if(t===u.A)s=A.hl
else if(t===u.D)s=A.eE
else if(t===u.I)s=A.hm
else if(t===u.z)s=A.hp}else if(t===u.S)s=A.v
else if(t===u.N)s=A.q
else if(t===u.y)s=A.eD
else if(t===u.H)s=A.d1
else if(t===u.i)s=A.V
else if(t===u.m)s=A.ho
t.a=s
return t.a(a)},
hA(a){var t=this
if(a==null)return A.aN(t)
return A.im(v.typeUniverse,A.il(a,t),t)},
hC(a){if(a==null)return!0
return this.x.b(a)},
hQ(a){var t,s=this
if(a==null)return A.aN(s)
t=s.f
if(a instanceof A.i)return!!a[t]
return!!J.aq(a)[t]},
hL(a){var t,s=this
if(a==null)return A.aN(s)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
t=s.f
if(a instanceof A.i)return!!a[t]
return!!J.aq(a)[t]},
hK(a){var t=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.i)return!!a[t.f]
return!0}if(typeof a=="function")return!0
return!1},
eL(a){if(typeof a=="object"){if(a instanceof A.i)return u.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
hz(a){var t=this
if(a==null){if(A.aN(t))return a}else if(t.b(a))return a
throw A.y(A.eH(a,t),new Error())},
hB(a){var t=this
if(a==null||t.b(a))return a
throw A.y(A.eH(a,t),new Error())},
eH(a,b){return new A.bp("TypeError: "+A.eq(a,A.G(b,null)))},
eq(a,b){return A.bH(a)+": type '"+A.G(A.dP(a),null)+"' is not a subtype of type '"+b+"'"},
K(a,b){return new A.bp("TypeError: "+A.eq(a,b))},
hI(a){var t=this
return t.x.b(a)||A.dG(v.typeUniverse,t).b(a)},
hN(a){return a!=null},
dL(a){if(a!=null)return a
throw A.y(A.K(a,"Object"),new Error())},
hR(a){return!0},
hq(a){return a},
eM(a){return!1},
dO(a){return!0===a||!1===a},
eD(a){if(!0===a)return!0
if(!1===a)return!1
throw A.y(A.K(a,"bool"),new Error())},
hl(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.y(A.K(a,"bool?"),new Error())},
V(a){if(typeof a=="number")return a
throw A.y(A.K(a,"double"),new Error())},
hm(a){if(typeof a=="number")return a
if(a==null)return a
throw A.y(A.K(a,"double?"),new Error())},
eK(a){return typeof a=="number"&&Math.floor(a)===a},
v(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.y(A.K(a,"int"),new Error())},
hn(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.y(A.K(a,"int?"),new Error())},
hM(a){return typeof a=="number"},
d1(a){if(typeof a=="number")return a
throw A.y(A.K(a,"num"),new Error())},
eE(a){if(typeof a=="number")return a
if(a==null)return a
throw A.y(A.K(a,"num?"),new Error())},
hP(a){return typeof a=="string"},
q(a){if(typeof a=="string")return a
throw A.y(A.K(a,"String"),new Error())},
eF(a){if(typeof a=="string")return a
if(a==null)return a
throw A.y(A.K(a,"String?"),new Error())},
ho(a){if(A.eL(a))return a
throw A.y(A.K(a,"JSObject"),new Error())},
hp(a){if(a==null)return a
if(A.eL(a))return a
throw A.y(A.K(a,"JSObject?"),new Error())},
eN(a,b){var t,s,r
for(t="",s="",r=0;r<a.length;++r,s=", ")t+=s+A.G(a[r],b)
return t},
hW(a,b){var t,s,r,q,p,o,n=a.x,m=a.y
if(""===n)return"("+A.eN(m,b)+")"
t=m.length
s=n.split(",")
r=s.length-t
for(q="(",p="",o=0;o<t;++o,p=", "){q+=p
if(r===0)q+="{"
q+=A.G(m[o],b)
if(r>=0)q+=" "+s[r];++r}return q+"})"},
eI(a2,a3,a4){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=", ",a1=null
if(a4!=null){t=a4.length
if(a3==null)a3=A.h([],u.s)
else a1=a3.length
s=a3.length
for(r=t;r>0;--r)B.a.m(a3,"T"+(s+r))
for(q=u.X,p="<",o="",r=0;r<t;++r,o=a0){n=a3.length
m=n-1-r
if(!(m>=0))return A.e(a3,m)
p=p+o+a3[m]
l=a4[r]
k=l.w
if(!(k===2||k===3||k===4||k===5||l===q))p+=" extends "+A.G(l,a3)}p+=">"}else p=""
q=a2.x
j=a2.y
i=j.a
h=i.length
g=j.b
f=g.length
e=j.c
d=e.length
c=A.G(q,a3)
for(b="",a="",r=0;r<h;++r,a=a0)b+=a+A.G(i[r],a3)
if(f>0){b+=a+"["
for(a="",r=0;r<f;++r,a=a0)b+=a+A.G(g[r],a3)
b+="]"}if(d>0){b+=a+"{"
for(a="",r=0;r<d;r+=3,a=a0){b+=a
if(e[r+1])b+="required "
b+=A.G(e[r+2],a3)+" "+e[r]}b+="}"}if(a1!=null){a3.toString
a3.length=a1}return p+"("+b+") => "+c},
G(a,b){var t,s,r,q,p,o,n,m=a.w
if(m===5)return"erased"
if(m===2)return"dynamic"
if(m===3)return"void"
if(m===1)return"Never"
if(m===4)return"any"
if(m===6){t=a.x
s=A.G(t,b)
r=t.w
return(r===11||r===12?"("+s+")":s)+"?"}if(m===7)return"FutureOr<"+A.G(a.x,b)+">"
if(m===8){q=A.i3(a.x)
p=a.y
return p.length>0?q+("<"+A.eN(p,b)+">"):q}if(m===10)return A.hW(a,b)
if(m===11)return A.eI(a,b,null)
if(m===12)return A.eI(a.x,b,a.y)
if(m===13){o=a.x
n=b.length
o=n-1-o
if(!(o>=0&&o<n))return A.e(b,o)
return b[o]}return"?"},
i3(a){var t=A.eX(a)
if(t!=null)return t
return"minified:"+a},
hi(a,b){var t=a.tR[b]
while(typeof t=="string")t=a.tR[t]
return t},
hh(a,b){var t,s,r,q,p,o=a.eT,n=o[b]
if(n==null)return A.cZ(a,b,!1)
else if(typeof n=="number"){t=n
s=A.bs(a,5,"#")
r=A.d0(t)
for(q=0;q<t;++q)r[q]=s
p=A.br(a,b,r)
o[b]=p
return p}else return n},
hg(a,b){return A.eB(a.tR,b)},
hf(a,b){return A.eB(a.eT,b)},
cZ(a,b,c){var t,s=a.eC,r=s.get(b)
if(r!=null)return r
t=A.ez(a,null,b,!1)
s.set(b,t)
return t},
bt(a,b,c){var t,s,r=b.z
if(r==null)r=b.z=new Map()
t=r.get(c)
if(t!=null)return t
s=A.ez(a,b,c,!0)
r.set(c,s)
return s},
eA(a,b,c){var t,s,r,q=b.Q
if(q==null)q=b.Q=new Map()
t=c.as
s=q.get(t)
if(s!=null)return s
r=A.dJ(a,b,c.w===9?c.y:[c])
q.set(t,r)
return r},
ez(a,b,c,d){return A.h8(A.h2(a,b,c,d))},
a5(a,b){b.a=A.hD
b.b=A.hE
return b},
bs(a,b,c){var t,s,r=a.eC.get(c)
if(r!=null)return r
t=new A.M(null,null)
t.w=b
t.as=c
s=A.a5(a,t)
a.eC.set(c,s)
return s},
ex(a,b,c){var t,s=b.as+"?",r=a.eC.get(s)
if(r!=null)return r
t=A.hd(a,b,s,c)
a.eC.set(s,t)
return t},
hd(a,b,c,d){var t,s,r
if(d){t=b.w
s=!0
if(!A.ar(b))if(!(b===u.P||b===u.T))if(t!==6)s=t===7&&A.aN(b.x)
if(s)return b
else if(t===1)return u.P}r=new A.M(null,null)
r.w=6
r.x=b
r.as=c
return A.a5(a,r)},
ew(a,b,c){var t,s=b.as+"/",r=a.eC.get(s)
if(r!=null)return r
t=A.hb(a,b,s,c)
a.eC.set(s,t)
return t},
hb(a,b,c,d){var t,s
if(d){t=b.w
if(A.ar(b)||b===u.K)return b
else if(t===1)return A.br(a,"ec",[b])
else if(b===u.P||b===u.T)return u._}s=new A.M(null,null)
s.w=7
s.x=b
s.as=c
return A.a5(a,s)},
he(a,b){var t,s,r=""+b+"^",q=a.eC.get(r)
if(q!=null)return q
t=new A.M(null,null)
t.w=13
t.x=b
t.as=r
s=A.a5(a,t)
a.eC.set(r,s)
return s},
bq(a){var t,s,r,q=a.length
for(t="",s="",r=0;r<q;++r,s=",")t+=s+a[r].as
return t},
ha(a){var t,s,r,q,p,o=a.length
for(t="",s="",r=0;r<o;r+=3,s=","){q=a[r]
p=a[r+1]?"!":":"
t+=s+q+p+a[r+2].as}return t},
br(a,b,c){var t,s,r,q=b
if(c.length>0)q+="<"+A.bq(c)+">"
t=a.eC.get(q)
if(t!=null)return t
s=new A.M(null,null)
s.w=8
s.x=b
s.y=c
if(c.length>0)s.c=c[0]
s.as=q
r=A.a5(a,s)
a.eC.set(q,r)
return r},
dJ(a,b,c){var t,s,r,q,p,o
if(b.w===9){t=b.x
s=b.y.concat(c)}else{s=c
t=b}r=t.as+(";<"+A.bq(s)+">")
q=a.eC.get(r)
if(q!=null)return q
p=new A.M(null,null)
p.w=9
p.x=t
p.y=s
p.as=r
o=A.a5(a,p)
a.eC.set(r,o)
return o},
ey(a,b,c){var t,s,r="+"+(b+"("+A.bq(c)+")"),q=a.eC.get(r)
if(q!=null)return q
t=new A.M(null,null)
t.w=10
t.x=b
t.y=c
t.as=r
s=A.a5(a,t)
a.eC.set(r,s)
return s},
ev(a,b,c){var t,s,r,q,p,o=b.as,n=c.a,m=n.length,l=c.b,k=l.length,j=c.c,i=j.length,h="("+A.bq(n)
if(k>0){t=m>0?",":""
h+=t+"["+A.bq(l)+"]"}if(i>0){t=m>0?",":""
h+=t+"{"+A.ha(j)+"}"}s=o+(h+")")
r=a.eC.get(s)
if(r!=null)return r
q=new A.M(null,null)
q.w=11
q.x=b
q.y=c
q.as=s
p=A.a5(a,q)
a.eC.set(s,p)
return p},
dK(a,b,c,d){var t,s=b.as+("<"+A.bq(c)+">"),r=a.eC.get(s)
if(r!=null)return r
t=A.hc(a,b,c,s,d)
a.eC.set(s,t)
return t},
hc(a,b,c,d,e){var t,s,r,q,p,o,n,m
if(e){t=c.length
s=A.d0(t)
for(r=0,q=0;q<t;++q){p=c[q]
if(p.w===1){s[q]=p;++r}}if(r>0){o=A.ao(a,b,s,0)
n=A.aK(a,c,s,0)
return A.dK(a,o,n,c!==n)}}m=new A.M(null,null)
m.w=12
m.x=b
m.y=c
m.as=d
return A.a5(a,m)},
h2(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
h8(a){var t,s,r,q,p,o,n,m=a.r,l=a.s
for(t=m.length,s=0;s<t;){r=m.charCodeAt(s)
if(r>=48&&r<=57)s=A.h4(s+1,r,m,l)
else if((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124)s=A.es(a,s,m,l,!1)
else if(r===46)s=A.es(a,s,m,l,!0)
else{++s
switch(r){case 44:break
case 58:l.push(!1)
break
case 33:l.push(!0)
break
case 59:l.push(A.aj(a.u,a.e,l.pop()))
break
case 94:l.push(A.he(a.u,l.pop()))
break
case 35:l.push(A.bs(a.u,5,"#"))
break
case 64:l.push(A.bs(a.u,2,"@"))
break
case 126:l.push(A.bs(a.u,3,"~"))
break
case 60:l.push(a.p)
a.p=l.length
break
case 62:A.h6(a,l)
break
case 38:A.h5(a,l)
break
case 63:q=a.u
l.push(A.ex(q,A.aj(q,a.e,l.pop()),a.n))
break
case 47:q=a.u
l.push(A.ew(q,A.aj(q,a.e,l.pop()),a.n))
break
case 40:l.push(-3)
l.push(a.p)
a.p=l.length
break
case 41:A.h3(a,l)
break
case 91:l.push(a.p)
a.p=l.length
break
case 93:p=l.splice(a.p)
A.et(a.u,a.e,p)
a.p=l.pop()
l.push(p)
l.push(-1)
break
case 123:l.push(a.p)
a.p=l.length
break
case 125:p=l.splice(a.p)
A.h9(a.u,a.e,p)
a.p=l.pop()
l.push(p)
l.push(-2)
break
case 43:o=m.indexOf("(",s)
l.push(m.substring(s,o))
l.push(-4)
l.push(a.p)
a.p=l.length
s=o+1
break
default:throw"Bad character "+r}}}n=l.pop()
return A.aj(a.u,a.e,n)},
h4(a,b,c,d){var t,s,r=b-48
for(t=c.length;a<t;++a){s=c.charCodeAt(a)
if(!(s>=48&&s<=57))break
r=r*10+(s-48)}d.push(r)
return a},
es(a,b,c,d,e){var t,s,r,q,p,o,n=b+1
for(t=c.length;n<t;++n){s=c.charCodeAt(n)
if(s===46){if(e)break
e=!0}else{if(!((((s|32)>>>0)-97&65535)<26||s===95||s===36||s===124))r=s>=48&&s<=57
else r=!0
if(!r)break}}q=c.substring(b,n)
if(e){t=a.u
p=a.e
if(p.w===9)p=p.x
o=A.hi(t,p.x)[q]
if(o==null)A.at('No "'+q+'" in "'+A.fX(p)+'"')
d.push(A.bt(t,p,o))}else d.push(q)
return n},
h6(a,b){var t,s=a.u,r=A.er(a,b),q=b.pop()
if(typeof q=="string")b.push(A.br(s,q,r))
else{t=A.aj(s,a.e,q)
switch(t.w){case 11:b.push(A.dK(s,t,r,a.n))
break
default:b.push(A.dJ(s,t,r))
break}}},
h3(a,b){var t,s,r,q=a.u,p=b.pop(),o=null,n=null
if(typeof p=="number")switch(p){case-1:o=b.pop()
break
case-2:n=b.pop()
break
default:b.push(p)
break}else b.push(p)
t=A.er(a,b)
p=b.pop()
switch(p){case-3:p=b.pop()
if(o==null)o=q.sEA
if(n==null)n=q.sEA
s=A.aj(q,a.e,p)
r=new A.ca()
r.a=t
r.b=o
r.c=n
b.push(A.ev(q,s,r))
return
case-4:b.push(A.ey(q,b.pop(),t))
return
default:throw A.d(A.bz("Unexpected state under `()`: "+A.j(p)))}},
h5(a,b){var t=b.pop()
if(0===t){b.push(A.bs(a.u,1,"0&"))
return}if(1===t){b.push(A.bs(a.u,4,"1&"))
return}throw A.d(A.bz("Unexpected extended operation "+A.j(t)))},
er(a,b){var t=b.splice(a.p)
A.et(a.u,a.e,t)
a.p=b.pop()
return t},
aj(a,b,c){if(typeof c=="string")return A.br(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.h7(a,b,c)}else return c},
et(a,b,c){var t,s=c.length
for(t=0;t<s;++t)c[t]=A.aj(a,b,c[t])},
h9(a,b,c){var t,s=c.length
for(t=2;t<s;t+=3)c[t]=A.aj(a,b,c[t])},
h7(a,b,c){var t,s,r=b.w
if(r===9){if(c===0)return b.x
t=b.y
s=t.length
if(c<=s)return t[c-1]
c-=s
b=b.x
r=b.w}else if(c===0)return b
if(r!==8)throw A.d(A.bz("Indexed base must be an interface type"))
t=b.y
if(c<=t.length)return t[c-1]
throw A.d(A.bz("Bad index "+c+" for "+b.i(0)))},
im(a,b,c){var t,s=b.d
if(s==null)s=b.d=new Map()
t=s.get(c)
if(t==null){t=A.t(a,b,null,c,null)
s.set(c,t)}return t},
t(a,b,c,d,e){var t,s,r,q,p,o,n,m,l,k,j
if(b===d)return!0
if(A.ar(d))return!0
t=b.w
if(t===4)return!0
if(A.ar(b))return!1
if(b.w===1)return!0
s=t===13
if(s)if(A.t(a,c[b.x],c,d,e))return!0
r=d.w
q=u.P
if(b===q||b===u.T){if(r===7)return A.t(a,b,c,d.x,e)
return d===q||d===u.T||r===6}if(d===u.K){if(t===7)return A.t(a,b.x,c,d,e)
return t!==6}if(t===7){if(!A.t(a,b.x,c,d,e))return!1
return A.t(a,A.dG(a,b),c,d,e)}if(t===6)return A.t(a,q,c,d,e)&&A.t(a,b.x,c,d,e)
if(r===7){if(A.t(a,b,c,d.x,e))return!0
return A.t(a,b,c,A.dG(a,d),e)}if(r===6)return A.t(a,b,c,q,e)||A.t(a,b,c,d.x,e)
if(s)return!1
q=t!==11
if((!q||t===12)&&d===u.Z)return!0
p=t===10
if(p&&d===u.Y)return!0
if(r===12){if(b===u.L)return!0
if(t!==12)return!1
o=b.y
n=d.y
m=o.length
if(m!==n.length)return!1
c=c==null?o:o.concat(c)
e=e==null?n:n.concat(e)
for(l=0;l<m;++l){k=o[l]
j=n[l]
if(!A.t(a,k,c,j,e)||!A.t(a,j,e,k,c))return!1}return A.eJ(a,b.x,c,d.x,e)}if(r===11){if(b===u.L)return!0
if(q)return!1
return A.eJ(a,b,c,d,e)}if(t===8){if(r!==8)return!1
return A.hJ(a,b,c,d,e)}if(p&&r===10)return A.hO(a,b,c,d,e)
return!1},
eJ(a2,a3,a4,a5,a6){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
if(!A.t(a2,a3.x,a4,a5.x,a6))return!1
t=a3.y
s=a5.y
r=t.a
q=s.a
p=r.length
o=q.length
if(p>o)return!1
n=o-p
m=t.b
l=s.b
k=m.length
j=l.length
if(p+k<o+j)return!1
for(i=0;i<p;++i){h=r[i]
if(!A.t(a2,q[i],a6,h,a4))return!1}for(i=0;i<n;++i){h=m[i]
if(!A.t(a2,q[p+i],a6,h,a4))return!1}for(i=0;i<j;++i){h=m[n+i]
if(!A.t(a2,l[i],a6,h,a4))return!1}g=t.c
f=s.c
e=g.length
d=f.length
for(c=0,b=0;b<d;b+=3){a=f[b]
for(;;){if(c>=e)return!1
a0=g[c]
c+=3
if(a<a0)return!1
a1=g[c-2]
if(a0<a){if(a1)return!1
continue}h=f[b+1]
if(a1&&!h)return!1
h=g[c-1]
if(!A.t(a2,f[b+2],a6,h,a4))return!1
break}}while(c<e){if(g[c+1])return!1
c+=3}return!0},
hJ(a,b,c,d,e){var t,s,r,q,p,o=b.x,n=d.x
while(o!==n){t=a.tR[o]
if(t==null)return!1
if(typeof t=="string"){o=t
continue}s=t[n]
if(s==null)return!1
r=s.length
q=r>0?new Array(r):v.typeUniverse.sEA
for(p=0;p<r;++p)q[p]=A.bt(a,b,s[p])
return A.eC(a,q,null,c,d.y,e)}return A.eC(a,b.y,null,c,d.y,e)},
eC(a,b,c,d,e,f){var t,s=b.length
for(t=0;t<s;++t)if(!A.t(a,b[t],d,e[t],f))return!1
return!0},
hO(a,b,c,d,e){var t,s=b.y,r=d.y,q=s.length
if(q!==r.length)return!1
if(b.x!==d.x)return!1
for(t=0;t<q;++t)if(!A.t(a,s[t],c,r[t],e))return!1
return!0},
aN(a){var t=a.w,s=!0
if(!(a===u.P||a===u.T))if(!A.ar(a))if(t!==6)s=t===7&&A.aN(a.x)
return s},
ar(a){var t=a.w
return t===2||t===3||t===4||t===5||a===u.X},
eB(a,b){var t,s,r=Object.keys(b),q=r.length
for(t=0;t<q;++t){s=r[t]
a[s]=b[s]}},
d0(a){return a>0?new Array(a):v.typeUniverse.sEA},
M:function M(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
ca:function ca(){this.c=this.b=this.a=null},
cY:function cY(a){this.a=a},
c9:function c9(){},
bp:function bp(a){this.a=a},
eu(a,b,c){return 0},
al:function al(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
aJ:function aJ(a,b){this.a=a
this.$ti=b},
dD(a,b,c){return b.h("@<0>").J(c).h("eg<1,2>").a(A.ib(a,new A.ab(b.h("@<0>").J(c).h("ab<1,2>"))))},
bT(a,b){return new A.ab(a.h("@<0>").J(b).h("ab<1,2>"))},
dE(a){var t,s
if(A.dV(a))return"{...}"
t=new A.aH("")
try{s={}
B.a.m($.H,a)
t.a+="{"
s.a=!0
a.R(0,new A.cw(s,t))
t.a+="}"}finally{if(0>=$.H.length)return A.e($.H,-1)
$.H.pop()}s=t.a
return s.charCodeAt(0)==0?s:s},
ad:function ad(){},
b2:function b2(){},
cw:function cw(a,b){this.a=a
this.b=b},
aG:function aG(){},
ef(a,b,c){return new A.aZ(a,b)},
hw(a){return a.bi()},
h0(a,b){return new A.cU(a,[],A.i7())},
h1(a,b,c){var t,s=new A.aH(""),r=A.h0(s,b)
r.V(a)
t=s.a
return t.charCodeAt(0)==0?t:t},
bC:function bC(){},
bE:function bE(){},
aZ:function aZ(a,b){this.a=a
this.b=b},
bR:function bR(a,b){this.a=a
this.b=b},
cs:function cs(){},
ct:function ct(a){this.b=a},
cV:function cV(){},
cW:function cW(a,b){this.a=a
this.b=b},
cU:function cU(a,b,c){this.c=a
this.a=b
this.b=c},
aM(a){var t=A.fS(a,null)
if(t!=null)return t
throw A.d(A.dy(a,null))},
i9(a){var t=A.fR(a)
if(t!=null)return t
throw A.d(A.dy("Invalid double",a))},
eh(a,b,c,d){var t,s=J.fD(a,d)
if(a!==0&&b!=null)for(t=0;t<a;++t)s[t]=b
return s},
fI(a,b,c){var t,s,r=A.h([],c.h("o<0>"))
for(t=a.length,s=0;s<a.length;a.length===t||(0,A.W)(a),++s)B.a.m(r,c.a(a[s]))
r.$flags=1
return r},
a1(a,b){var t,s=A.h([],b.h("o<0>"))
for(t=a.gn(a);t.j();)B.a.m(s,t.gl())
return s},
a3(a,b,c){return new A.aw(a,A.ee(a,!1,b,c,!1,""))},
em(a,b,c){var t=J.bw(b)
if(!t.j())return a
if(c.length===0){do a+=A.j(t.gl())
while(t.j())}else{a+=A.j(t.gl())
while(t.j())a=a+c+A.j(t.gl())}return a},
bF(a,b,c,d){var t=A.fT(a,b,c,d,0,0,0,0,!1)
return new A.A(t==null?new A.cj(a,b,c,d,0,0,0,0).$0():t,0,!1)},
fA(){return new A.A(Date.now(),0,!1)},
fB(a){var t=Math.abs(a),s=a<0?"-":""
if(t>=1000)return""+a
if(t>=100)return s+"0"+t
if(t>=10)return s+"00"+t
return s+"000"+t},
ea(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bG(a){if(a>=10)return""+a
return"0"+a},
eb(a,b,c){return new A.O(a+1000*b+6e7*c)},
bH(a){if(typeof a=="number"||A.dO(a)||a==null)return J.bx(a)
if(typeof a=="string")return JSON.stringify(a)
return A.ek(a)},
bz(a){return new A.by(a)},
aO(a){return new A.Y(!1,null,null,a)},
fs(a,b,c){return new A.Y(!0,a,b,c)},
a2(a,b,c,d,e){return new A.aE(b,c,!0,a,d,"Invalid value")},
fV(a,b,c){if(0>a||a>c)throw A.d(A.a2(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.d(A.a2(b,a,c,"end",null))
return b}return c},
dF(a,b){if(a<0)throw A.d(A.a2(a,0,null,b,null))
return a},
dz(a,b,c,d){return new A.bJ(b,!0,a,d,"Index out of range")},
dI(a){return new A.bj(a)},
ep(a){return new A.c5(a)},
fY(a){return new A.bg(a)},
L(a){return new A.bD(a)},
dy(a,b){return new A.cl(a,b)},
fC(a,b,c){var t,s
if(A.dV(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}t=A.h([],u.s)
B.a.m($.H,a)
try{A.hS(a,t)}finally{if(0>=$.H.length)return A.e($.H,-1)
$.H.pop()}s=A.em(b,u.V.a(t),", ")+c
return s.charCodeAt(0)==0?s:s},
dA(a,b,c){var t,s
if(A.dV(a))return b+"..."+c
t=new A.aH(b)
B.a.m($.H,a)
try{s=t
s.a=A.em(s.a,a,", ")}finally{if(0>=$.H.length)return A.e($.H,-1)
$.H.pop()}t.a+=c
s=t.a
return s.charCodeAt(0)==0?s:s},
hS(a,b){var t,s,r,q,p,o,n,m=a.gn(a),l=0,k=0
for(;;){if(!(l<80||k<3))break
if(!m.j())return
t=A.j(m.gl())
B.a.m(b,t)
l+=t.length+2;++k}if(!m.j()){if(k<=5)return
if(0>=b.length)return A.e(b,-1)
s=b.pop()
if(0>=b.length)return A.e(b,-1)
r=b.pop()}else{q=m.gl();++k
if(!m.j()){if(k<=4){B.a.m(b,A.j(q))
return}s=A.j(q)
if(0>=b.length)return A.e(b,-1)
r=b.pop()
l+=s.length+2}else{p=m.gl();++k
for(;m.j();q=p,p=o){o=m.gl();++k
if(k>100){for(;;){if(!(l>75&&k>3))break
if(0>=b.length)return A.e(b,-1)
l-=b.pop().length+2;--k}B.a.m(b,"...")
return}}r=A.j(q)
s=A.j(p)
l+=s.length+r.length+4}}if(k>b.length+2){l+=5
n="..."}else n=null
for(;;){if(!(l>80&&b.length>3))break
if(0>=b.length)return A.e(b,-1)
l-=b.pop().length+2
if(n==null){l+=5
n="..."}}if(n!=null)B.a.m(b,n)
B.a.m(b,r)
B.a.m(b,s)},
ei(a,b,c,d){var t
if(B.f===c){t=B.c.gp(a)
b=J.X(b)
return A.dH(A.a4(A.a4($.dw(),t),b))}if(B.f===d){t=B.c.gp(a)
b=J.X(b)
c=J.X(c)
return A.dH(A.a4(A.a4(A.a4($.dw(),t),b),c))}t=B.c.gp(a)
b=J.X(b)
c=J.X(c)
d=J.X(d)
d=A.dH(A.a4(A.a4(A.a4(A.a4($.dw(),t),b),c),d))
return d},
cj:function cj(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
A:function A(a,b,c){this.a=a
this.b=b
this.c=c},
O:function O(a){this.a=a},
cR:function cR(){},
m:function m(){},
by:function by(a){this.a=a},
bi:function bi(){},
Y:function Y(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
aE:function aE(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
bJ:function bJ(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
bj:function bj(a){this.a=a},
c5:function c5(a){this.a=a},
bg:function bg(a){this.a=a},
bD:function bD(a){this.a=a},
bV:function bV(){},
bf:function bf(){},
cS:function cS(a){this.a=a},
cl:function cl(a,b){this.a=a
this.b=b},
c:function c(){},
n:function n(a,b,c){this.a=a
this.b=b
this.$ti=c},
b7:function b7(){},
i:function i(){},
aH:function aH(a){this.a=a},
cb:function cb(a){this.a=a},
aT:function aT(a,b){this.a=a
this.b=b},
ch:function ch(a,b){this.a=a
this.b=b},
ci:function ci(a){this.a=a
this.b=null},
cy:function cy(a){this.a=a},
cq:function cq(){},
a7:function a7(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bI:function bI(a,b,c){this.a=a
this.b=b
this.c=c},
cm:function cm(){},
cn:function cn(){},
co:function co(a){this.a=a},
cp:function cp(){},
aC:function aC(a,b){this.a=a
this.b=b},
k:function k(a,b,c){this.a=a
this.c=b
this.d=c},
fL(){var t,s=A.bT(u.N,u.h),r=0
for(;r<19;++r){t=$.fM[r]
s.q(0,t.a,t)}return new A.cA(s)},
cA:function cA(a){this.a=a},
am:function am(a,b){this.a=a
this.b=b},
cB:function cB(a,b){this.a=a
this.b=b},
cC:function cC(a,b){this.a=a
this.b=b},
cD:function cD(){},
cE:function cE(){},
bd:function bd(a,b){this.a=a
this.c=b},
cH:function cH(){},
be:function be(a,b){this.a=a
this.b=b},
cz:function cz(a){this.a=a},
bW:function bW(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.e=d
_.f=e},
iu(a){var t=a.e
if(t&&a.f==null)return B.X
if(!t&&a.f!=null)return B.Y
return null},
b9:function b9(a){this.a=a},
aF:function aF(a,b,c){this.a=a
this.b=b
this.c=c},
cF:function cF(a,b){this.a=a
this.b=b},
cG:function cG(a){this.a=a},
cJ:function cJ(){},
cN:function cN(){},
cO:function cO(){},
cK:function cK(){},
cL:function cL(){},
cM:function cM(){},
B:function B(a,b,c){this.a=a
this.b=b
this.c=c},
cg:function cg(){},
a9:function a9(a,b){this.a=a
this.b=b},
a_:function a_(a,b){this.a=a
this.b=b},
ck:function ck(){},
hU(a){var t=$.fi().b8(a),s=t.a
if(s==null)return"No expiry date recognized in this text."
return"Expiry date found: "+(B.b.N(B.c.i(A.bZ(s)),4,"0")+"-"+B.b.N(B.c.i(A.bY(s)),2,"0")+"-"+B.b.N(B.c.i(A.ba(s)),2,"0"))+" (pattern matched: "+t.b.b+")"},
hr(a){var t,s=B.B.aY(a)
switch(s.a.a){case 0:t="No risk detected"
break
case 1:t="Low risk"
break
case 2:t="High risk"
break
default:t=null}return t+". "+s.c},
i1(a){var t=$.fm().aB(a,3)
if(t.length===0)return"No sentences recognized in this text."
return B.a.T(t," ")},
eG(a){var t
switch(a.a){case 0:t="Today's status: all ok"
break
case 1:t="Today's status: needs attention"
break
case 2:t="No status set for today yet"
break
default:t=null}return t},
hV(){var t,s,r,q,p=$.e_().a,o=A.w(p).h("E<2>")
p=A.a1(new A.E(p,o),o.h("c.E"))
p.$flags=1
t=p
B.a.O(t,new A.d2())
p=A.h([],u.v)
for(o=t.length,s=u.N,r=0;r<t.length;t.length===o||(0,A.W)(t),++r){q=t[r]
p.push(A.dD(["id",q.a,"textEn",q.c,"category",q.d.b],s,s))}return B.e.K(p,null)},
i2(a){var t,s,r,q,p=$.e0().ba(a),o=A.h([],u.s)
for(t=p.length,s=0;s<p.length;p.length===t||(0,A.W)(p),++s){r=p[s]
q=$.e_().a.F(0,r)
q=q==null?null:q.c
o.push(q==null?r:q)}return B.e.K(o,null)},
hZ(a){var t,s,r=B.b.U(a)
if(r.length===0)return""
t=B.b.G(r,A.a3("\\s+",!0,!1))
s=A.N(t)
return new A.F(t,s.h("a(1)").a(new A.d3()),s.h("F<1,a>")).T(0," ")},
hj(a,b,c){var t,s,r,q,p,o=$.dZ().a,n=A.w(o).h("E<2>")
n=A.a1(new A.E(o,n),n.h("c.E"))
n.$flags=1
t="person-"+(n.length+1)+"-"+B.b.gp(a.toLowerCase())
try{n=t
r=new A.bW(n,a,b,c,c?new A.A(Date.now(),0,!1):null)
q=A.iu(r)
if(q!=null)A.at(q)
o.q(0,n,r)
o=c?"given":"not given"
return"Added "+a+" ("+b+"), consent "+o+"."}catch(p){o=A.eZ(p)
if(o instanceof A.b9){s=o
return"Rejected: "+s.a}else throw p}},
hT(){var t,s,r,q,p=A.h([],u.J),o=$.dZ().a,n=A.w(o).h("E<2>")
o=A.a1(new A.E(o,n),n.h("c.E"))
o.$flags=1
o=o
n=o.length
t=u.N
s=u.K
r=0
for(;r<o.length;o.length===n||(0,A.W)(o),++r){q=o[r]
p.push(A.dD(["name",q.b,"relationship",q.c,"consentGiven",q.e],t,s))}return B.e.K(p,null)},
hk(a,b,c){var t,s=$.e1().b,r=A.w(s).h("E<2>")
r=A.a1(new A.E(s,r),r.h("c.E"))
r.$flags=1
t="reminder-"+(r.length+1)
A:{break A}s.q(0,t,new A.aF(t,a,new A.A(Date.now(),0,!1).I(A.eb(0,0,b).a)))
return'Added reminder "'+a+'", due in '+b+" minute(s)."},
hy(){var t,s,r,q=A.h([],u.s)
for(t=$.e1().b1(),s=t.length,r=0;r<t.length;t.length===s||(0,A.W)(t),++r)q.push(t[r].b)
return B.e.K(q,null)},
eO(a){var t,s,r=A.bF(2026,1,1,8),q=A.h([new A.a7(0,0,9,r.I(-15e4))],u.u)
for(t=0;t<8;++t){s=r.I(1000*a[t])
B.a.m(q,new A.a7(0,0,9,s.I(-12e4)))
B.a.m(q,new A.a7(0,0,13,s))}return q},
ip(){var t,s,r=v.G
r.lumenParseExpiry=A.an(new A.db())
r.lumenNameColor=A.dM(new A.dc())
r.lumenAssessMessage=A.an(new A.dd())
r.lumenSummarize=A.an(new A.dk())
r.lumenGeneratePairingCode=A.ce(new A.dl())
r.lumenSetDailyStatus=A.an(new A.dm())
r.lumenGetDailyStatus=A.ce(new A.dn())
r.lumenPhraseBoardJson=A.ce(new A.dp())
r.lumenRecordPhraseUse=A.an(new A.dq())
r.lumenTopPhraseSuggestionsJson=A.an(new A.dr())
r.lumenSplitSyllables=A.an(new A.ds())
t=new A.de()
if(typeof t=="function")A.at(A.aO("Attempting to rewrap a JS function."))
s=function(a,b){return function(c,d,e,f){return a(b,c,d,e,f,arguments.length)}}(A.hv,t)
s[$.bv()]=t
r.lumenReviewFlashcard=s
r.lumenAddPerson=A.dM(new A.df())
r.lumenListPeopleJson=A.ce(new A.dg())
r.lumenAddReminder=A.dM(new A.dh())
r.lumenDueRemindersJson=A.ce(new A.di())
r.lumenAnalyzeGait=A.an(new A.dj())},
d2:function d2(){},
d3:function d3(){},
db:function db(){},
dc:function dc(){},
dd:function dd(){},
dk:function dk(){},
dl:function dl(){},
dm:function dm(){},
dn:function dn(){},
dp:function dp(){},
dq:function dq(){},
dr:function dr(){},
ds:function ds(){},
de:function de(){},
df:function df(){},
dg:function dg(){},
dh:function dh(){},
di:function di(){},
dj:function dj(){},
eX(a){return v.mangledGlobalNames[a]},
is(a){throw A.y(new A.bS("Field '"+a+"' has been assigned during initialization."),new Error())},
ce(a){var t
if(typeof a=="function")throw A.d(A.aO("Attempting to rewrap a JS function."))
t=function(b,c){return function(){return b(c)}}(A.hs,a)
t[$.bv()]=a
return t},
an(a){var t
if(typeof a=="function")throw A.d(A.aO("Attempting to rewrap a JS function."))
t=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.ht,a)
t[$.bv()]=a
return t},
dM(a){var t
if(typeof a=="function")throw A.d(A.aO("Attempting to rewrap a JS function."))
t=function(b,c){return function(d,e,f){return b(c,d,e,f,arguments.length)}}(A.hu,a)
t[$.bv()]=a
return t},
hs(a){return u.Z.a(a).$0()},
ht(a,b,c){u.Z.a(a)
if(A.v(c)>=1)return a.$1(b)
return a.$0()},
hu(a,b,c,d,e){u.Z.a(a)
A.v(e)
if(e>=3)return a.$3(b,c,d)
if(e===2)return a.$2(b,c)
if(e===1)return a.$1(b)
return a.$0()},
hv(a,b,c,d,e,f){u.Z.a(a)
A.v(f)
if(f>=4)return a.$4(b,c,d,e)
if(f===3)return a.$3(b,c,d)
if(f===2)return a.$2(b,c)
if(f===1)return a.$1(b)
return a.$0()}},B={}
var w=[A,J,B]
var $={}
A.dB.prototype={}
J.bK.prototype={
E(a,b){return a===b},
gp(a){return A.c_(a)},
i(a){return"Instance of '"+A.c0(a)+"'"},
gA(a){return A.ap(A.dN(this))}}
J.bN.prototype={
i(a){return String(a)},
gp(a){return a?519018:218159},
gA(a){return A.ap(u.y)},
$iC:1,
$iz:1}
J.aX.prototype={
E(a,b){return null==b},
i(a){return"null"},
gp(a){return 0},
$iC:1}
J.aY.prototype={$iI:1}
J.a0.prototype={
gp(a){return 0},
i(a){return String(a)}}
J.bX.prototype={}
J.ah.prototype={}
J.Q.prototype={
i(a){var t=a[$.f_()]
if(t==null)t=a[$.bv()]
if(t==null)return this.aD(a)
return"JavaScript function for "+J.bx(t)},
$iaa:1}
J.ax.prototype={
gp(a){return 0},
i(a){return String(a)}}
J.ay.prototype={
gp(a){return 0},
i(a){return String(a)}}
J.o.prototype={
m(a,b){A.N(a).c.a(b)
a.$flags&1&&A.du(a,29)
a.push(b)},
T(a,b){var t,s=A.eh(a.length,"",!1,u.N)
for(t=0;t<a.length;++t)this.q(s,t,A.j(a[t]))
return s.join(b)},
a6(a,b){var t,s,r
A.N(a).h("1(1,1)").a(b)
t=a.length
if(t===0)throw A.d(A.bL())
if(0>=t)return A.e(a,0)
s=a[0]
for(r=1;r<t;++r){s=b.$2(s,a[r])
if(t!==a.length)throw A.d(A.L(a))}return s},
t(a,b){if(!(b<a.length))return A.e(a,b)
return a[b]},
ga4(a){if(a.length>0)return a[0]
throw A.d(A.bL())},
gb5(a){var t=a.length
if(t>0)return a[t-1]
throw A.d(A.bL())},
ai(a,b){var t,s
A.N(a).h("z(1)").a(b)
t=a.length
for(s=0;s<t;++s){if(b.$1(a[s]))return!0
if(a.length!==t)throw A.d(A.L(a))}return!1},
O(a,b){var t,s,r,q,p,o=A.N(a)
o.h("b(1,1)?").a(b)
a.$flags&2&&A.du(a,"sort")
t=a.length
if(t<2)return
if(b==null)b=J.hG()
if(t===2){s=a[0]
r=a[1]
o=b.$2(s,r)
if(typeof o!=="number")return o.bg()
if(o>0){a[0]=r
a[1]=s}return}q=0
if(o.c.b(null))for(p=0;p<a.length;++p)if(a[p]===void 0){a[p]=null;++q}a.sort(A.i5(b,2))
if(q>0)this.aP(a,q)},
az(a){return this.O(a,null)},
aP(a,b){var t,s=a.length
for(;t=s-1,s>0;s=t)if(a[t]===null){a[t]=void 0;--b
if(b===0)break}},
D(a,b){var t
for(t=0;t<a.length;++t)if(J.cf(a[t],b))return!0
return!1},
gap(a){return a.length!==0},
i(a){return A.dA(a,"[","]")},
gn(a){return new J.aP(a,a.length,A.N(a).h("aP<1>"))},
gp(a){return A.c_(a)},
gk(a){return a.length},
q(a,b,c){A.N(a).c.a(c)
a.$flags&2&&A.du(a)
if(!(b>=0&&b<a.length))throw A.d(A.eR(a,b))
a[b]=c},
$il:1,
$ic:1,
$iJ:1}
J.bM.prototype={
bb(a){var t,s,r
if(!Array.isArray(a))return null
t=a.$flags|0
if((t&4)!==0)s="const, "
else if((t&2)!==0)s="unmodifiable, "
else s=(t&1)!==0?"fixed, ":""
r="Instance of '"+A.c0(a)+"'"
if(s==="")return r
return r+" ("+s+"length: "+a.length+")"}}
J.cr.prototype={}
J.aP.prototype={
gl(){var t=this.d
return t==null?this.$ti.c.a(t):t},
j(){var t,s=this,r=s.a,q=r.length
if(s.b!==q){r=A.W(r)
throw A.d(r)}t=s.c
if(t>=q){s.d=null
return!1}s.d=r[t]
s.c=t+1
return!0},
$ir:1}
J.av.prototype={
u(a,b){var t
A.d1(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){t=this.gS(b)
if(this.gS(a)===t)return 0
if(this.gS(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gS(a){return a===0?1/a<0:a<0},
b9(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.d(A.dI(""+a+".round()"))},
ar(a,b){var t
if(b>20)throw A.d(A.a2(b,0,20,"fractionDigits",null))
t=a.toFixed(b)
if(a===0&&this.gS(a))return"-"+t
return t},
i(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gp(a){var t,s,r,q,p=a|0
if(a===p)return p&536870911
t=Math.abs(a)
s=Math.log(t)/0.6931471805599453|0
r=Math.pow(2,s)
q=t<1?t/r:r/t
return((q*9007199254740992|0)+(q*3542243181176521|0))*599197+s*1259&536870911},
W(a,b){var t=a%b
if(t===0)return 0
if(t>0)return t
return t+b},
C(a,b){return(a|0)===a?a/b|0:this.aW(a,b)},
aW(a,b){var t=a/b
if(t>=-2147483648&&t<=2147483647)return t|0
if(t>0){if(t!==1/0)return Math.floor(t)}else if(t>-1/0)return Math.ceil(t)
throw A.d(A.dI("Result of truncating division is "+A.j(t)+": "+A.j(a)+" ~/ "+b))},
ae(a,b){var t
if(a>0)t=this.aT(a,b)
else{t=b>31?31:b
t=a>>t>>>0}return t},
aT(a,b){return b>31?0:a>>>b},
gA(a){return A.ap(u.H)},
$iD:1,
$ip:1,
$if:1}
J.aW.prototype={
gA(a){return A.ap(u.S)},
$iC:1,
$ib:1}
J.bO.prototype={
gA(a){return A.ap(u.i)},
$iC:1}
J.P.prototype={
ah(a,b){return new A.cc(b,a,0)},
G(a,b){var t
if(typeof b=="string")return A.h(a.split(b),u.s)
else{if(b instanceof A.aw){t=b.e
t=!(t==null?b.e=b.aG():t)}else t=!1
if(t)return A.h(a.split(b.b),u.s)
else return this.aI(a,b)}},
aI(a,b){var t,s,r,q,p,o,n=A.h([],u.s)
for(t=J.e2(b,a),t=t.gn(t),s=0,r=1;t.j();){q=t.gl()
p=q.ga7()
o=q.ga3()
r=o-p
if(r===0&&s===p)continue
B.a.m(n,this.B(a,s,p))
s=o}if(s<a.length||r>0)B.a.m(n,this.H(a,s))
return n},
aA(a,b){var t=b.length
if(t>a.length)return!1
return b===a.substring(0,t)},
B(a,b,c){return a.substring(b,A.fV(b,c,a.length))},
H(a,b){return this.B(a,b,null)},
U(a){var t,s,r,q=a.trim(),p=q.length
if(p===0)return q
if(0>=p)return A.e(q,0)
if(q.charCodeAt(0)===133){t=J.fG(q,1)
if(t===p)return""}else t=0
s=p-1
if(!(s>=0))return A.e(q,s)
r=q.charCodeAt(s)===133?J.fH(q,s):p
if(t===0&&r===p)return q
return q.substring(t,r)},
aw(a,b){var t,s
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.d(B.A)
for(t=a,s="";;){if((b&1)===1)s=t+s
b=b>>>1
if(b===0)break
t+=t}return s},
N(a,b,c){var t=b-a.length
if(t<=0)return a
return this.aw(c,t)+a},
ak(a,b,c){var t
u.E.a(b)
t=a.length
if(c>t)throw A.d(A.a2(c,0,t,null,null))
return A.dX(a,b,c)},
D(a,b){return this.ak(a,b,0)},
u(a,b){var t
A.q(b)
if(a===b)t=0
else t=a<b?-1:1
return t},
i(a){return a},
gp(a){var t,s,r
for(t=a.length,s=0,r=0;r<t;++r){s=s+a.charCodeAt(r)&536870911
s=s+((s&524287)<<10)&536870911
s^=s>>6}s=s+((s&67108863)<<3)&536870911
s^=s>>11
return s+((s&16383)<<15)&536870911},
gA(a){return A.ap(u.N)},
gk(a){return a.length},
$iC:1,
$iD:1,
$iaB:1,
$ia:1}
A.bS.prototype={
i(a){return"LateInitializationError: "+this.a}}
A.cI.prototype={}
A.l.prototype={}
A.u.prototype={
gn(a){var t=this
return new A.ae(t,t.gk(t),A.w(t).h("ae<u.E>"))},
T(a,b){var t,s,r,q=this,p=q.gk(q)
if(b.length!==0){if(p===0)return""
t=A.j(q.t(0,0))
if(p!==q.gk(q))throw A.d(A.L(q))
for(s=t,r=1;r<p;++r){s=s+b+A.j(q.t(0,r))
if(p!==q.gk(q))throw A.d(A.L(q))}return s.charCodeAt(0)==0?s:s}else{for(r=0,s="";r<p;++r){s+=A.j(q.t(0,r))
if(p!==q.gk(q))throw A.d(A.L(q))}return s.charCodeAt(0)==0?s:s}},
a6(a,b){var t,s,r,q=this
A.w(q).h("u.E(u.E,u.E)").a(b)
t=q.gk(q)
if(t===0)throw A.d(A.bL())
s=q.t(0,0)
for(r=1;r<t;++r){s=b.$2(s,q.t(0,r))
if(t!==q.gk(q))throw A.d(A.L(q))}return s}}
A.bh.prototype={
gaK(){var t=this.a.length,s=this.c
if(s>t)return t
return s},
gaV(){var t=this.a.length,s=this.b
if(s>t)return t
return s},
gk(a){var t,s=this.a.length,r=this.b
if(r>=s)return 0
t=this.c
if(t>=s)return s-r
return t-r},
t(a,b){var t=this,s=t.gaV()+b,r=t.gaK()
if(s>=r)throw A.d(A.dz(b,t.gk(0),t,"index"))
return J.e3(t.a,s)}}
A.ae.prototype={
gl(){var t=this.d
return t==null?this.$ti.c.a(t):t},
j(){var t,s=this,r=s.a,q=J.dT(r),p=q.gk(r)
if(s.b!==p)throw A.d(A.L(r))
t=s.c
if(t>=p){s.d=null
return!1}s.d=q.t(r,t);++s.c
return!0},
$ir:1}
A.af.prototype={
gn(a){var t=this.a
return new A.b3(t.gn(t),this.b,A.w(this).h("b3<1,2>"))},
gk(a){var t=this.a
return t.gk(t)}}
A.aU.prototype={$il:1}
A.b3.prototype={
j(){var t=this,s=t.b
if(s.j()){t.a=t.c.$1(s.gl())
return!0}t.a=null
return!1},
gl(){var t=this.a
return t==null?this.$ti.y[1].a(t):t},
$ir:1}
A.F.prototype={
gk(a){return J.dx(this.a)},
t(a,b){return this.b.$1(J.e3(this.a,b))}}
A.T.prototype={
gn(a){return new A.U(J.bw(this.a),this.b,this.$ti.h("U<1>"))}}
A.U.prototype={
j(){var t,s
for(t=this.a,s=this.b;t.j();)if(s.$1(t.gl()))return!0
return!1},
gl(){return this.a.gl()},
$ir:1}
A.aV.prototype={}
A.bo.prototype={$r:"+index,score(1,2)",$s:1}
A.aQ.prototype={
gM(a){return this.gk(this)===0},
i(a){return A.dE(this)},
gam(){return new A.aJ(this.b3(),A.w(this).h("aJ<n<1,2>>"))},
b3(){var t=this
return function(){var s=0,r=1,q=[],p,o,n,m,l
return function $async$gam(a,b,c){if(b===1){q.push(c)
s=r}for(;;)switch(s){case 0:p=t.gaq(),p=p.gn(p),o=A.w(t),n=o.y[1],o=o.h("n<1,2>")
case 2:if(!p.j()){s=3
break}m=p.gl()
l=t.F(0,m)
s=4
return a.b=new A.n(m,l==null?n.a(l):l,o),1
case 4:s=2
break
case 3:return 0
case 1:return a.c=q.at(-1),3}}}},
$iR:1}
A.a8.prototype={
gk(a){return this.b.length},
gac(){var t=this.$keys
if(t==null){t=Object.keys(this.a)
this.$keys=t}return t},
b0(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
F(a,b){if(!this.b0(b))return null
return this.b[this.a[b]]},
R(a,b){var t,s,r,q
this.$ti.h("~(1,2)").a(b)
t=this.gac()
s=this.b
for(r=t.length,q=0;q<r;++q)b.$2(t[q],s[q])},
gaq(){return new A.bk(this.gac(),this.$ti.h("bk<1>"))}}
A.bk.prototype={
gk(a){return this.a.length},
gn(a){var t=this.a
return new A.ai(t,t.length,this.$ti.h("ai<1>"))}}
A.ai.prototype={
gl(){var t=this.d
return t==null?this.$ti.c.a(t):t},
j(){var t=this,s=t.c
if(s>=t.b){t.d=null
return!1}t.d=t.a[s]
t.c=s+1
return!0},
$ir:1}
A.aR.prototype={}
A.aS.prototype={
gk(a){return this.b},
gn(a){var t,s=this,r=s.$keys
if(r==null){r=Object.keys(s.a)
s.$keys=r}t=r
return new A.ai(t,t.length,s.$ti.h("ai<1>"))},
D(a,b){if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)}}
A.bc.prototype={}
A.cP.prototype={
v(a){var t,s,r=this,q=new RegExp(r.a).exec(a)
if(q==null)return null
t=Object.create(null)
s=r.b
if(s!==-1)t.arguments=q[s+1]
s=r.c
if(s!==-1)t.argumentsExpr=q[s+1]
s=r.d
if(s!==-1)t.expr=q[s+1]
s=r.e
if(s!==-1)t.method=q[s+1]
s=r.f
if(s!==-1)t.receiver=q[s+1]
return t}}
A.b8.prototype={
i(a){return"Null check operator used on a null value"}}
A.bQ.prototype={
i(a){var t,s=this,r="NoSuchMethodError: method not found: '",q=s.b
if(q==null)return"NoSuchMethodError: "+s.a
t=s.c
if(t==null)return r+q+"' ("+s.a+")"
return r+q+"' on '"+t+"' ("+s.a+")"}}
A.c6.prototype={
i(a){var t=this.a
return t.length===0?"Error":"Error: "+t}}
A.cx.prototype={
i(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.Z.prototype={
i(a){var t=this.constructor,s=t==null?null:t.name
return"Closure '"+A.eY(s==null?"unknown":s)+"'"},
$iaa:1,
gbf(){return this},
$C:"$1",
$R:1,
$D:null}
A.bA.prototype={$C:"$0",$R:0}
A.bB.prototype={$C:"$2",$R:2}
A.c4.prototype={}
A.c2.prototype={
i(a){var t=this.$static_name
if(t==null)return"Closure of unknown static method"
return"Closure '"+A.eY(t)+"'"}}
A.au.prototype={
E(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.au))return!1
return this.$_target===b.$_target&&this.a===b.a},
gp(a){return(A.eU(this.a)^A.c_(this.$_target))>>>0},
i(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.c0(this.a)+"'")}}
A.c1.prototype={
i(a){return"RuntimeError: "+this.a}}
A.ab.prototype={
gk(a){return this.a},
gM(a){return this.a===0},
F(a,b){var t,s,r,q,p=null
if(typeof b=="string"){t=this.b
if(t==null)return p
s=t[b]
r=s==null?p:s.b
return r}else if(typeof b=="number"&&(b&0x3fffffff)===b){q=this.c
if(q==null)return p
s=q[b]
r=s==null?p:s.b
return r}else return this.b4(b)},
b4(a){var t,s,r=this.d
if(r==null)return null
t=this.aN(r,a)
s=this.ao(t,a)
if(s<0)return null
return t[s].b},
q(a,b,c){var t,s,r,q,p,o,n=this,m=A.w(n)
m.c.a(b)
m.y[1].a(c)
if(typeof b=="string"){t=n.b
n.a9(t==null?n.b=n.a0():t,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){s=n.c
n.a9(s==null?n.c=n.a0():s,b,c)}else{r=n.d
if(r==null)r=n.d=n.a0()
q=n.an(b)
p=r[q]
if(p==null)r[q]=[n.a1(b,c)]
else{o=n.ao(p,b)
if(o>=0)p[o].b=c
else p.push(n.a1(b,c))}}},
R(a,b){var t,s,r=this
A.w(r).h("~(1,2)").a(b)
t=r.e
s=r.r
while(t!=null){b.$2(t.a,t.b)
if(s!==r.r)throw A.d(A.L(r))
t=t.c}},
a9(a,b,c){var t,s=A.w(this)
s.c.a(b)
s.y[1].a(c)
t=a[b]
if(t==null)a[b]=this.a1(b,c)
else t.b=c},
a1(a,b){var t=this,s=A.w(t),r=new A.cu(s.c.a(a),s.y[1].a(b))
if(t.e==null)t.e=t.f=r
else t.f=t.f.c=r;++t.a
t.r=t.r+1&1073741823
return r},
an(a){return J.X(a)&1073741823},
aN(a,b){return a[this.an(b)]},
ao(a,b){var t,s
if(a==null)return-1
t=a.length
for(s=0;s<t;++s)if(J.cf(a[s].a,b))return s
return-1},
i(a){return A.dE(this)},
a0(){var t=Object.create(null)
t["<non-identifier-key>"]=t
delete t["<non-identifier-key>"]
return t},
$ieg:1}
A.cu.prototype={}
A.cv.prototype={
gk(a){return this.a.a},
gn(a){var t=this.a
return new A.ac(t,t.r,t.e,this.$ti.h("ac<1>"))}}
A.ac.prototype={
gl(){return this.d},
j(){var t,s=this,r=s.a
if(s.b!==r.r)throw A.d(A.L(r))
t=s.c
if(t==null){s.d=null
return!1}else{s.d=t.a
s.c=t.c
return!0}},
$ir:1}
A.E.prototype={
gk(a){return this.a.a},
gn(a){var t=this.a
return new A.b1(t,t.r,t.e,this.$ti.h("b1<1>"))}}
A.b1.prototype={
gl(){return this.d},
j(){var t,s=this,r=s.a
if(s.b!==r.r)throw A.d(A.L(r))
t=s.c
if(t==null){s.d=null
return!1}else{s.d=t.b
s.c=t.c
return!0}},
$ir:1}
A.b_.prototype={
gk(a){return this.a.a},
gn(a){var t=this.a
return new A.b0(t,t.r,t.e,this.$ti.h("b0<1,2>"))}}
A.b0.prototype={
gl(){var t=this.d
t.toString
return t},
j(){var t,s=this,r=s.a
if(s.b!==r.r)throw A.d(A.L(r))
t=s.c
if(t==null){s.d=null
return!1}else{s.d=new A.n(t.a,t.b,s.$ti.h("n<1,2>"))
s.c=t.c
return!0}},
$ir:1}
A.d7.prototype={
$1(a){return this.a(a)},
$S:2}
A.d8.prototype={
$2(a,b){return this.a(a,b)},
$S:6}
A.d9.prototype={
$1(a){return this.a(A.q(a))},
$S:7}
A.ak.prototype={
i(a){return this.af(!1)},
af(a){var t,s,r,q,p,o=this.aM(),n=this.aa(),m=(a?"Record ":"")+"("
for(t=o.length,s="",r=0;r<t;++r,s=", "){m+=s
q=o[r]
if(typeof q=="string")m=m+q+": "
if(!(r<n.length))return A.e(n,r)
p=n[r]
m=a?m+A.ek(p):m+A.j(p)}m+=")"
return m.charCodeAt(0)==0?m:m},
aM(){var t,s=this.$s
while($.cX.length<=s)B.a.m($.cX,null)
t=$.cX[s]
if(t==null){t=this.aF()
B.a.q($.cX,s,t)}return t},
aF(){var t,s,r,q=this.$r,p=q.indexOf("("),o=q.substring(1,p),n=q.substring(p),m=n==="()"?0:n.replace(/[^,]/g,"").length+1,l=A.h(new Array(m),u.f)
for(t=0;t<m;++t)l[t]=t
if(o!==""){s=o.split(",")
t=s.length
for(r=m;t>0;){--r;--t
B.a.q(l,r,s[t])}}l=A.fI(l,!1,u.K)
l.$flags=3
return l}}
A.aI.prototype={
aa(){return[this.a,this.b]},
E(a,b){if(b==null)return!1
return b instanceof A.aI&&this.$s===b.$s&&J.cf(this.a,b.a)&&J.cf(this.b,b.b)},
gp(a){return A.ei(this.$s,this.a,this.b,B.f)}}
A.aw.prototype={
i(a){return"RegExp/"+this.a+"/"+this.b.flags},
gaO(){var t=this,s=t.c
if(s!=null)return s
s=t.b
return t.c=A.ee(t.a,s.multiline,!s.ignoreCase,s.unicode,s.dotAll,"g")},
aG(){var t,s=this.a
if(!B.b.D(s,"("))return!1
t=this.b.unicode?"u":""
return new RegExp("(?:)|"+s,t).exec("").length>1},
L(a){var t=this.b.exec(a)
if(t==null)return null
return new A.bl(t)},
ah(a,b){return new A.c7(this,b,0)},
aL(a,b){var t,s=this.gaO()
if(s==null)s=A.dL(s)
s.lastIndex=b
t=s.exec(a)
if(t==null)return null
return new A.bl(t)},
$iaB:1,
$ifW:1}
A.bl.prototype={
ga7(){return this.b.index},
ga3(){var t=this.b
return t.index+t[0].length},
$iaz:1,
$ibb:1}
A.c7.prototype={
gn(a){return new A.c8(this.a,this.b,this.c)}}
A.c8.prototype={
gl(){var t=this.d
return t==null?u.l.a(t):t},
j(){var t,s,r,q,p,o,n=this,m=n.b
if(m==null)return!1
t=n.c
s=m.length
if(t<=s){r=n.a
q=r.aL(m,t)
if(q!=null){n.d=q
p=q.ga3()
if(q.b.index===p){t=!1
if(r.b.unicode){r=n.c
o=r+1
if(o<s){if(!(r>=0&&r<s))return A.e(m,r)
r=m.charCodeAt(r)
if(r>=55296&&r<=56319){if(!(o>=0))return A.e(m,o)
t=m.charCodeAt(o)
t=t>=56320&&t<=57343}}}p=(t?p+1:p)+1}n.c=p
return!0}}n.b=n.d=null
return!1},
$ir:1}
A.c3.prototype={
ga3(){return this.a+this.c.length},
$iaz:1,
ga7(){return this.a}}
A.cc.prototype={
gn(a){return new A.cd(this.a,this.b,this.c)}}
A.cd.prototype={
j(){var t,s,r=this,q=r.c,p=r.b,o=p.length,n=r.a,m=n.length
if(q+o>m){r.d=null
return!1}t=n.indexOf(p,q)
if(t<0){r.c=m+1
r.d=null
return!1}s=t+o
r.d=new A.c3(t,p)
r.c=s===r.c?s+1:s
return!0},
gl(){var t=this.d
t.toString
return t},
$ir:1}
A.ag.prototype={
gA(a){return B.az},
aj(a,b,c){var t=new Uint8Array(a,b,c)
return t},
$iC:1,
$iag:1}
A.b6.prototype={
gaZ(a){if(((a.$flags|0)&2)!==0)return new A.d_(a.buffer)
else return a.buffer}}
A.d_.prototype={
aj(a,b,c){var t=A.fK(this.a,b,c)
t.$flags=3
return t}}
A.b4.prototype={
gA(a){return B.aA},
$iC:1,
$ie8:1}
A.aA.prototype={
gk(a){return a.length},
$ibP:1}
A.b5.prototype={$il:1,$ic:1,$iJ:1}
A.bU.prototype={
gA(a){return B.aC},
gk(a){return a.length},
$iC:1}
A.bm.prototype={}
A.bn.prototype={}
A.M.prototype={
h(a){return A.bt(v.typeUniverse,this,a)},
J(a){return A.eA(v.typeUniverse,this,a)}}
A.ca.prototype={}
A.cY.prototype={
i(a){return A.G(this.a,null)}}
A.c9.prototype={
i(a){return this.a}}
A.bp.prototype={}
A.al.prototype={
gl(){var t=this.b
return t==null?this.$ti.c.a(t):t},
aQ(a,b){var t,s,r
a=A.v(a)
b=b
t=this.a
for(;;)try{s=t(this,a,b)
return s}catch(r){b=r
a=1}},
j(){var t,s,r,q,p=this,o=null,n=0
for(;;){t=p.d
if(t!=null)try{if(t.j()){p.b=t.gl()
return!0}else p.d=null}catch(s){o=s
n=1
p.d=null}r=p.aQ(n,o)
if(1===r)return!0
if(0===r){p.b=null
q=p.e
if(q==null||q.length===0){p.a=A.eu
return!1}if(0>=q.length)return A.e(q,-1)
p.a=q.pop()
n=0
o=null
continue}if(2===r){n=0
o=null
continue}if(3===r){o=p.c
p.c=null
q=p.e
if(q==null||q.length===0){p.b=null
p.a=A.eu
throw o
return!1}if(0>=q.length)return A.e(q,-1)
p.a=q.pop()
n=1
continue}throw A.d(A.fY("sync*"))}return!1},
bh(a){var t,s,r=this
if(a instanceof A.aJ){t=a.a()
s=r.e
if(s==null)s=r.e=[]
B.a.m(s,r.a)
r.a=t
return 2}else{r.d=J.bw(a)
return 2}},
$ir:1}
A.aJ.prototype={
gn(a){return new A.al(this.a(),this.$ti.h("al<1>"))}}
A.ad.prototype={
gn(a){return new A.ae(a,a.length,A.bu(a).h("ae<ad.E>"))},
t(a,b){if(!(b<a.length))return A.e(a,b)
return a[b]},
gap(a){return a.length!==0},
i(a){return A.dA(a,"[","]")}}
A.b2.prototype={
R(a,b){var t,s,r,q=this,p=A.w(q)
p.h("~(1,2)").a(b)
for(t=new A.ac(q,q.r,q.e,p.h("ac<1>")),p=p.y[1];t.j();){s=t.d
r=q.F(0,s)
b.$2(s,r==null?p.a(r):r)}},
gk(a){return this.a},
gM(a){return this.a===0},
i(a){return A.dE(this)},
$iR:1}
A.cw.prototype={
$2(a,b){var t,s=this.a
if(!s.a)this.b.a+=", "
s.a=!1
s=this.b
t=A.j(a)
s.a=(s.a+=t)+": "
t=A.j(b)
s.a+=t},
$S:3}
A.aG.prototype={
i(a){return A.dA(this,"{","}")},
$il:1,
$ic:1}
A.bC.prototype={}
A.bE.prototype={}
A.aZ.prototype={
i(a){var t=A.bH(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+t}}
A.bR.prototype={
i(a){return"Cyclic error in JSON stringify"}}
A.cs.prototype={
K(a,b){var t=A.h1(a,this.gb2().b,null)
return t},
gb2(){return B.O}}
A.ct.prototype={}
A.cV.prototype={
av(a){var t,s,r,q,p,o,n=a.length
for(t=this.c,s=0,r=0;r<n;++r){q=a.charCodeAt(r)
if(q>92){if(q>=55296){p=q&64512
if(p===55296){o=r+1
o=!(o<n&&(a.charCodeAt(o)&64512)===56320)}else o=!1
if(!o)if(p===56320){p=r-1
p=!(p>=0&&(a.charCodeAt(p)&64512)===55296)}else p=!1
else p=!0
if(p){if(r>s)t.a+=B.b.B(a,s,r)
s=r+1
p=A.x(92)
t.a+=p
p=A.x(117)
t.a+=p
p=A.x(100)
t.a+=p
p=q>>>8&15
p=A.x(p<10?48+p:87+p)
t.a+=p
p=q>>>4&15
p=A.x(p<10?48+p:87+p)
t.a+=p
p=q&15
p=A.x(p<10?48+p:87+p)
t.a+=p}}continue}if(q<32){if(r>s)t.a+=B.b.B(a,s,r)
s=r+1
p=A.x(92)
t.a+=p
switch(q){case 8:p=A.x(98)
t.a+=p
break
case 9:p=A.x(116)
t.a+=p
break
case 10:p=A.x(110)
t.a+=p
break
case 12:p=A.x(102)
t.a+=p
break
case 13:p=A.x(114)
t.a+=p
break
default:p=A.x(117)
t.a+=p
p=A.x(48)
t.a=(t.a+=p)+p
p=q>>>4&15
p=A.x(p<10?48+p:87+p)
t.a+=p
p=q&15
p=A.x(p<10?48+p:87+p)
t.a+=p
break}}else if(q===34||q===92){if(r>s)t.a+=B.b.B(a,s,r)
s=r+1
p=A.x(92)
t.a+=p
p=A.x(q)
t.a+=p}}if(s===0)t.a+=a
else if(s<n)t.a+=B.b.B(a,s,n)},
Y(a){var t,s,r,q
for(t=this.a,s=t.length,r=0;r<s;++r){q=t[r]
if(a==null?q==null:a===q)throw A.d(new A.bR(a,null))}B.a.m(t,a)},
V(a){var t,s,r,q,p=this
if(p.au(a))return
p.Y(a)
try{t=p.b.$1(a)
if(!p.au(t)){r=A.ef(a,null,p.gad())
throw A.d(r)}r=p.a
if(0>=r.length)return A.e(r,-1)
r.pop()}catch(q){s=A.eZ(q)
r=A.ef(a,s,p.gad())
throw A.d(r)}},
au(a){var t,s,r=this
if(typeof a=="number"){if(!isFinite(a))return!1
r.c.a+=B.h.i(a)
return!0}else if(a===!0){r.c.a+="true"
return!0}else if(a===!1){r.c.a+="false"
return!0}else if(a==null){r.c.a+="null"
return!0}else if(typeof a=="string"){t=r.c
t.a+='"'
r.av(a)
t.a+='"'
return!0}else if(u.j.b(a)){r.Y(a)
r.bd(a)
t=r.a
if(0>=t.length)return A.e(t,-1)
t.pop()
return!0}else if(u.G.b(a)){r.Y(a)
s=r.be(a)
t=r.a
if(0>=t.length)return A.e(t,-1)
t.pop()
return s}else return!1},
bd(a){var t,s=this.c
s.a+="["
if(J.fq(a)){if(0>=a.length)return A.e(a,0)
this.V(a[0])
for(t=1;t<a.length;++t){s.a+=","
this.V(a[t])}}s.a+="]"},
be(a){var t,s,r,q,p,o,n=this,m={}
if(a.gM(a)){n.c.a+="{}"
return!0}t=a.gk(a)*2
s=A.eh(t,null,!1,u.X)
r=m.a=0
m.b=!0
a.R(0,new A.cW(m,s))
if(!m.b)return!1
q=n.c
q.a+="{"
for(p='"';r<t;r+=2,p=',"'){q.a+=p
n.av(A.q(s[r]))
q.a+='":'
o=r+1
if(!(o<t))return A.e(s,o)
n.V(s[o])}q.a+="}"
return!0}}
A.cW.prototype={
$2(a,b){var t,s
if(typeof a!="string")this.a.b=!1
t=this.b
s=this.a
B.a.q(t,s.a++,a)
B.a.q(t,s.a++,b)},
$S:3}
A.cU.prototype={
gad(){var t=this.c.a
return t.charCodeAt(0)==0?t:t}}
A.cj.prototype={
$0(){var t=this
return A.at(A.aO("("+t.a+", "+t.b+", "+t.c+", "+t.d+", "+t.e+", "+t.f+", "+t.r+", "+t.w+")"))},
$S:8}
A.A.prototype={
I(a){var t=1000,s=B.c.W(a,t),r=B.c.C(a-s,t),q=this.b+s,p=B.c.W(q,t),o=this.a+B.c.C(q-p,t)+r
if(o<-864e13||o>864e13)A.at(A.a2(o,-864e13,864e13,"millisecondsSinceEpoch",null))
if(o===864e13&&p!==0)A.at(A.fs(p,"microsecond","Time including microseconds is outside valid range"))
A.dQ(!1,"isUtc",u.y)
return new A.A(o,p,!1)},
al(a){return A.eb(this.b-a.b,this.a-a.a,0)},
E(a,b){var t
if(b==null)return!1
t=!1
if(b instanceof A.A)if(this.a===b.a)t=this.b===b.b
return t},
gp(a){return A.ei(this.a,this.b,B.f,B.f)},
u(a,b){var t
u.k.a(b)
t=B.c.u(this.a,b.a)
if(t!==0)return t
return B.c.u(this.b,b.b)},
i(a){var t=this,s=A.fB(A.bZ(t)),r=A.bG(A.bY(t)),q=A.bG(A.ba(t)),p=A.bG(A.fN(t)),o=A.bG(A.fP(t)),n=A.bG(A.fQ(t)),m=A.ea(A.fO(t)),l=t.b,k=l===0?"":A.ea(l)
return s+"-"+r+"-"+q+" "+p+":"+o+":"+n+"."+m+k},
$iD:1}
A.O.prototype={
E(a,b){if(b==null)return!1
return b instanceof A.O&&this.a===b.a},
gp(a){return B.c.gp(this.a)},
u(a,b){return B.c.u(this.a,u.d.a(b).a)},
i(a){var t,s,r,q,p,o=this.a,n=B.c.C(o,36e8),m=o%36e8
if(o<0){n=0-n
o=0-m
t="-"}else{o=m
t=""}s=B.c.C(o,6e7)
o%=6e7
r=s<10?"0":""
q=B.c.C(o,1e6)
p=q<10?"0":""
return t+n+":"+r+s+":"+p+q+"."+B.b.N(B.c.i(o%1e6),6,"0")},
$iD:1}
A.cR.prototype={
i(a){return this.P()}}
A.m.prototype={}
A.by.prototype={
i(a){var t=this.a
if(t!=null)return"Assertion failed: "+A.bH(t)
return"Assertion failed"}}
A.bi.prototype={}
A.Y.prototype={
ga_(){return"Invalid argument"+(!this.a?"(s)":"")},
gZ(){return""},
i(a){var t=this,s=t.c,r=s==null?"":" ("+s+")",q=t.d,p=q==null?"":": "+q,o=t.ga_()+r+p
if(!t.a)return o
return o+t.gZ()+": "+A.bH(t.ga5())},
ga5(){return this.b}}
A.aE.prototype={
ga5(){return A.eE(this.b)},
ga_(){return"RangeError"},
gZ(){var t,s=this.e,r=this.f
if(s==null)t=r!=null?": Not less than or equal to "+A.j(r):""
else if(r==null)t=": Not greater than or equal to "+A.j(s)
else if(r>s)t=": Not in inclusive range "+A.j(s)+".."+A.j(r)
else t=r<s?": Valid value range is empty":": Only valid value is "+A.j(s)
return t}}
A.bJ.prototype={
ga5(){return A.v(this.b)},
ga_(){return"RangeError"},
gZ(){if(A.v(this.b)<0)return": index must not be negative"
var t=this.f
if(t===0)return": no indices are valid"
return": index should be less than "+t},
gk(a){return this.f}}
A.bj.prototype={
i(a){return"Unsupported operation: "+this.a}}
A.c5.prototype={
i(a){return"UnimplementedError: "+this.a}}
A.bg.prototype={
i(a){return"Bad state: "+this.a}}
A.bD.prototype={
i(a){var t=this.a
if(t==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.bH(t)+"."}}
A.bV.prototype={
i(a){return"Out of Memory"},
$im:1}
A.bf.prototype={
i(a){return"Stack Overflow"},
$im:1}
A.cS.prototype={
i(a){return"Exception: "+this.a}}
A.cl.prototype={
i(a){var t=this.a,s=""!==t?"FormatException: "+t:"FormatException",r=this.b
if(typeof r=="string"){if(r.length>78)r=B.b.B(r,0,75)+"..."
return s+"\n"+r}else return s}}
A.c.prototype={
bc(a,b){var t=A.w(this)
return new A.T(this,t.h("z(c.E)").a(b),t.h("T<c.E>"))},
gk(a){var t,s=this.gn(this)
for(t=0;s.j();)++t
return t},
gM(a){return!this.gn(this).j()},
ga4(a){var t=this.gn(this)
if(!t.j())throw A.d(A.bL())
return t.gl()},
t(a,b){var t,s
A.dF(b,"index")
t=this.gn(this)
for(s=b;t.j();){if(s===0)return t.gl();--s}throw A.d(A.dz(b,b-s,this,"index"))},
i(a){return A.fC(this,"(",")")}}
A.n.prototype={
i(a){return"MapEntry("+A.j(this.a)+": "+A.j(this.b)+")"}}
A.b7.prototype={
gp(a){return A.i.prototype.gp.call(this,0)},
i(a){return"null"}}
A.i.prototype={$ii:1,
E(a,b){return this===b},
gp(a){return A.c_(this)},
i(a){return"Instance of '"+A.c0(this)+"'"},
gA(a){return A.ig(this)},
toString(){return this.i(this)}}
A.aH.prototype={
gk(a){return this.a.length},
i(a){var t=this.a
return t.charCodeAt(0)==0?t:t},
$ifZ:1}
A.cb.prototype={
aE(){var t=self.crypto
if(t!=null)if(t.getRandomValues!=null)return
throw A.d(A.dI("No source of cryptographically secure random numbers available."))},
b7(a){var t,s,r,q,p,o,n,m,l=null
if(a<=0||a>4294967296)throw A.d(new A.aE(l,l,!1,l,l,"max must be in range 0 < max \u2264 2^32, was "+a))
if(a>255)if(a>65535)t=a>16777215?4:3
else t=2
else t=1
s=this.a
s.$flags&2&&A.du(s,11)
s.setUint32(0,0,!1)
r=4-t
q=A.v(Math.pow(256,t))
for(p=a-1,o=(a&p)===0;;){crypto.getRandomValues(J.fo(B.T.gaZ(s),r,t))
n=s.getUint32(0,!1)
if(o)return(n&p)>>>0
m=n%a
if(n-m+a<q)return m}},
$ifU:1}
A.aT.prototype={
P(){return"DailyStatusValue."+this.b}}
A.ch.prototype={}
A.ci.prototype={
a8(){var t=this.a.$0(),s=A.bF(A.bZ(t),A.bY(t),A.ba(t),0),r=this.b
if(r==null||!r.a.E(0,s))return B.E
return r.b}}
A.cy.prototype={}
A.cq.prototype={
G(a,b){var t,s,r,q,p,o,n,m,l,k,j,i,h,g="aeiouAEIOUaeiouAEIOU\xe0\xe8\xe9\xec\xf2\xf9\xc0\xc8\xc9\xcc\xd2\xd9",f=b.length
if(f===0)return A.h([b],u.s)
t=u.t
s=A.h([],t)
r=A.h([],t)
for(q=0;q<f;){if(!(q>=0))return A.e(b,q)
p=b[q]
if(A.dX(g,p,0)){o=q
for(;;){if(o<f){p=b[o]
p=A.dX(g,p,0)}else p=!1
if(!p)break;++o}B.a.m(s,q)
B.a.m(r,o)
q=o}else ++q}if(s.length===0)return A.h([b],u.s)
n=A.h([],t)
for(m=0;m<s.length-1;){if(!(m<r.length))return A.e(r,m)
l=r[m];++m
B.a.m(n,l+this.aH(B.b.B(b,l,s[m]).toLowerCase()))}k=A.h([],u.s)
for(f=n.length,j=0,i=0;i<n.length;n.length===f||(0,A.W)(n),++i,j=h){h=n[i]
B.a.m(k,B.b.B(b,j,h))}B.a.m(k,B.b.H(b,j))
return k},
aH(a){var t,s,r=a.length
if(r===1)return 0
if(B.b.aA(a,"s"))return 0
if(r===2){if(B.a.D(B.o,a))return 0
if(this.ab(a))return 0
return 1}t=r-2
s=B.b.H(a,t)
if(B.a.D(B.o,s)||this.ab(s))return t
return r-1},
ab(a){var t=a.length
if(0>=t)return A.e(a,0)
if(B.b.D("bcdfgptv",a[0])){if(1>=t)return A.e(a,1)
t=B.b.D("lr",a[1])}else t=!1
return t}}
A.a7.prototype={}
A.bI.prototype={}
A.cm.prototype={
aX(a){var t,s,r,q,p,o,n,m=this.aJ(u.n.a(a)),l=m.length
if(l<2)return new A.bI(l,0,!1)
t=A.h([],u.t)
for(s=1;s<m.length;++s){l=m[s]
r=m[s-1]
B.a.m(t,B.c.C(l.b-r.b+1000*(l.a-r.a),1000))}q=B.c.C(B.a.gb5(m).al(B.a.ga4(m)).a,1000)
p=q===0?0:m.length/(q/6e4)
o=B.a.a6(t,new A.cn())/t.length
l=new A.F(t,u.r.a(new A.co(o)),u.q).a6(0,new A.cp())
r=t.length
n=o===0?0:Math.sqrt(l/r)/o
return new A.bI(m.length,p,n>0.35)},
aJ(a){var t,s,r,q,p,o,n,m,l,k
u.n.a(a)
t=A.h([],u.M)
for(s=a.length,r=null,q=!0,p=0;p<a.length;a.length===s||(0,A.W)(a),++p){o=a[p]
n=o.a
m=o.b
l=o.c
k=Math.sqrt(n*n+m*m+l*l)>11.5
if(k&&q){if(r!=null){n=o.d
m=r.a
m=n.b-r.b+1000*(n.a-m)>=25e4
n=m}else n=!0
if(n){r=o.d
B.a.m(t,r)}}q=!k}return t}}
A.cn.prototype={
$2(a,b){return A.v(a)+A.v(b)},
$S:9}
A.co.prototype={
$1(a){return Math.pow(A.v(a)-this.a,2)},
$S:10}
A.cp.prototype={
$2(a,b){return A.d1(a)+A.d1(b)},
$S:11}
A.aC.prototype={
P(){return"PhraseCategory."+this.b}}
A.k.prototype={}
A.cA.prototype={}
A.am.prototype={}
A.cB.prototype={
ba(a){var t,s,r=this.b,q=A.w(r).h("b_<1,2>")
q=A.fJ(new A.b_(r,q),q.h("n<a,f>(c.E)").a(new A.cC(this.a.$0(),864e5)),q.h("c.E"),u.b)
t=A.a1(q,A.w(q).h("c.E"))
B.a.O(t,new A.cD())
r=A.en(t,0,A.dQ(a,"count",u.S),A.N(t).c)
q=r.$ti
s=q.h("F<u.E,a>")
r=A.a1(new A.F(r,q.h("a(u.E)").a(new A.cE()),s),s.h("u.E"))
r.$flags=1
return r}}
A.cC.prototype={
$1(a){var t
u.W.a(a)
t=a.b
return new A.n(a.a,t.a*Math.pow(0.5,B.c.C(this.a.al(t.b).a,1000)/this.b),u.b)},
$S:12}
A.cD.prototype={
$2(a,b){var t=u.b
t.a(a)
return B.h.u(t.a(b).b,a.b)},
$S:13}
A.cE.prototype={
$1(a){return u.b.a(a).a},
$S:14}
A.bd.prototype={}
A.cH.prototype={
aY(a){var t,s,r,q,p=B.b.gb_(a.toLowerCase()),o=B.a.ai(B.P,p),n=B.a.ai(B.Q,p)
p=$.f6()
t=p.b.test(a)
p=o?1:0
s=n?1:0
r=t?1:0
q=p+s+r
if(q>=2)return B.at
if(q===1)return B.au
return B.as}}
A.be.prototype={
P(){return"ScamRiskLevel."+this.b}}
A.cz.prototype={}
A.bW.prototype={}
A.b9.prototype={
i(a){return"PersonProfileConsentError: "+this.a}}
A.aF.prototype={}
A.cF.prototype={
b1(){var t=this.b,s=A.w(t).h("E<2>"),r=s.h("T<c.E>")
t=A.a1(new A.T(new A.E(t,s),s.h("z(c.E)").a(new A.cG(this.a.$0())),r),r.h("c.E"))
t.$flags=1
return t}}
A.cG.prototype={
$1(a){var t=u.C.a(a).c,s=this.a,r=t.a,q=s.a
if(r<=q)t=r===q&&t.b>s.b
else t=!0
t=!t
return t},
$S:15}
A.cJ.prototype={
aB(a,b){var t,s,r,q,p,o,n=this.aU(a),m=n.length
if(m===0)return B.R
if(m<=b)return n
t=this.aS(n)
m=A.h([],u.e)
for(s=0;s<n.length;++s)m.push(new A.bo(s,this.aR(n[s],t)))
B.a.O(m,new A.cN())
m=A.en(m,0,A.dQ(b,"count",u.S),u.g)
r=m.$ti
q=r.h("F<u.E,b>")
p=A.a1(new A.F(m,r.h("b(u.E)").a(new A.cO()),q),q.h("u.E"))
B.a.az(p)
m=A.h([],u.s)
for(r=p.length,o=0;o<p.length;p.length===r||(0,A.W)(p),++o){s=p[o]
if(!(s>=0&&s<n.length))return A.e(n,s)
m.push(n[s])}return m},
aU(a){var t=B.b.G(a,A.a3("(?<=[.!?])\\s+",!0,!1)),s=A.N(t),r=s.h("F<1,a>")
r=new A.F(t,s.h("a(1)").a(new A.cK()),r).aC(0,r.h("z(u.E)").a(new A.cL()))
t=A.a1(r,r.$ti.h("c.E"))
return t},
aS(a){var t,s,r,q,p,o,n
u.a.a(a)
t=A.bT(u.N,u.S)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.W)(a),++r)for(q=this.ag(a[r]),p=J.bw(q.a),q=new A.U(p,q.b,q.$ti.h("U<1>"));q.j();){o=p.gl()
n=t.F(0,o)
t.q(0,o,(n==null?0:n)+1)}return t},
aR(a,b){var t,s,r,q
u.c.a(b)
for(t=this.ag(a),s=J.bw(t.a),t=new A.U(s,t.b,t.$ti.h("U<1>")),r=0;t.j();){q=b.F(0,s.gl())
r+=q==null?0:q}return r},
ag(a){var t=B.b.G(a.toLowerCase(),A.a3("[^\\p{L}]+",!0,!0)),s=A.N(t)
return new A.T(t,s.h("z(1)").a(new A.cM()),s.h("T<1>"))}}
A.cN.prototype={
$2(a,b){var t=u.g
t.a(a)
return B.c.u(t.a(b).b,a.b)},
$S:16}
A.cO.prototype={
$1(a){return u.g.a(a).a},
$S:17}
A.cK.prototype={
$1(a){return B.b.U(A.q(a))},
$S:0}
A.cL.prototype={
$1(a){return A.q(a).length!==0},
$S:4}
A.cM.prototype={
$1(a){A.q(a)
return a.length!==0&&!B.ay.D(0,a)},
$S:4}
A.B.prototype={}
A.cg.prototype={
b6(a){var t,s,r,q,p,o,n,m,l,k,j,i,h=B.p.gaq().ga4(0)
for(t=B.p.gam(),s=t.$ti,t=new A.al(t.a(),s.h("al<1>")),r=a.a,q=a.b,p=a.c,s=s.c,o=1/0;t.j();){n=t.b
if(n==null)n=s.a(n)
m=n.b
l=r-m.a
k=q-m.b
j=p-m.c
i=l*l+k*k+j*j
if(i<o){h=n.a
o=i}}return h}}
A.a9.prototype={
P(){return"ExpiryDateFormat."+this.b}}
A.a_.prototype={}
A.ck.prototype={
b8(a){var t,s,r,q,p,o,n,m,l,k,j,i=this,h=B.b.U(a),g=$.f1().L(h)
if(g!=null){t=g.b
s=t.length
if(1>=s)return A.e(t,1)
r=t[1]
r.toString
if(2>=s)return A.e(t,2)
q=t[2]
q.toString
if(3>=s)return A.e(t,3)
t=t[3]
t.toString
p=i.X(r,q,t)
if(p!=null)return new A.a_(p,B.I)}o=$.f4().L(h)
if(o!=null){t=o.b
s=t.length
if(1>=s)return A.e(t,1)
r=t[1]
r.toString
if(2>=s)return A.e(t,2)
q=t[2]
q.toString
if(3>=s)return A.e(t,3)
t=t[3]
t.toString
p=i.X(r,q,t)
if(p!=null)return new A.a_(p,B.F)}n=$.f0().L(h)
if(n!=null){t=n.b
s=t.length
if(1>=s)return A.e(t,1)
r=t[1]
r.toString
if(2>=s)return A.e(t,2)
q=t[2]
q.toString
if(3>=s)return A.e(t,3)
t=t[3]
t.toString
p=i.X(r,q,t)
if(p!=null)return new A.a_(p,B.G)}m=$.f2().L(h)
if(m!=null){t=m.b
if(2>=t.length)return A.e(t,2)
l=B.S.F(0,t[2].toLowerCase())
if(l!=null){if(3>=t.length)return A.e(t,3)
s=t[3]
s.toString
s=A.aM(s)
if(1>=t.length)return A.e(t,1)
t=t[1]
t.toString
p=i.a2(s,l,A.aM(t))
if(p!=null)return new A.a_(p,B.J)}}k=$.f3().L(h)
if(k!=null){t=k.b
if(1>=t.length)return A.e(t,1)
s=t[1]
s.toString
l=A.aM(s)
if(2>=t.length)return A.e(t,2)
t=t[2]
t.toString
j=A.aM(t)
if(l>=1&&l<=12){p=i.a2(j,l,A.ba(A.bF(j,l+1,0,0)))
if(p!=null)return new A.a_(p,B.H)}}return B.K},
X(a,b,c){var t=A.aM(a),s=A.aM(b),r=A.aM(c)
return this.a2(r<100?r+2000:r,s,t)},
a2(a,b,c){var t
if(b<1||b>12)return null
t=A.bF(a,b,c,0)
if(A.bZ(t)!==a||A.bY(t)!==b||A.ba(t)!==c)return null
return t}}
A.d2.prototype={
$2(a,b){var t=u.h
return B.c.u(t.a(a).d.a,t.a(b).d.a)},
$S:18}
A.d3.prototype={
$1(a){return B.a.T(B.t.G(0,A.q(a)),"-")},
$S:0}
A.db.prototype={
$1(a){return A.hU(A.q(a))},
$S:0}
A.dc.prototype={
$3(a,b,c){A.V(a)
A.V(b)
A.V(c)
A.v(a)
A.v(b)
A.v(c)
return $.fh().b6(new A.B(a,b,c))},
$S:19}
A.dd.prototype={
$1(a){return A.hr(A.q(a))},
$S:0}
A.dk.prototype={
$1(a){return A.i1(A.q(a))},
$S:0}
A.dl.prototype={
$0(){var t=$.fj(),s=Date.now(),r=B.b.N(B.c.i(t.a.b7(1e6)),6,"0")
new A.A(s,0,!1).I(6e8)
return"Pairing code: "+r+" (valid for 10 minutes)"},
$S:1}
A.dm.prototype={
$1(a){var t=A.q(a)==="ok"?B.C:B.D,s=$.dY(),r=s.a.$0()
s.b=new A.ch(A.bF(A.bZ(r),A.bY(r),A.ba(r),0),t)
return A.eG(s.a8())},
$S:0}
A.dn.prototype={
$0(){return A.eG($.dY().a8())},
$S:1}
A.dp.prototype={
$0(){return A.hV()},
$S:1}
A.dq.prototype={
$1(a){var t,s,r,q
A.q(a)
t=$.e0()
s=t.b
r=s.F(0,a)
q=r==null?null:r.a
if(q==null)q=0
s.q(0,a,new A.am(q+1,t.a.$0()))
return null},
$S:20}
A.dr.prototype={
$1(a){return A.i2(A.v(A.V(a)))},
$S:21}
A.ds.prototype={
$1(a){return A.hZ(A.q(a))},
$S:0}
A.de.prototype={
$4(a,b,c,d){var t,s,r,q
A.V(a)
A.V(b)
A.V(c)
A.V(d)
A.v(a)
A.v(b)
A.v(c)
t=1
if(a<3)s=0
else{s=b+1
if(!(s===1))t=s===2?6:B.h.b9(c*d)}r=5-a
q=d+(0.1-r*(0.08+r*0.02))
return B.e.K(A.dD(["intervalDays",t,"easinessFactor",A.i9(B.h.ar(q<1.3?1.3:q,2)),"repetitionCount",s],u.N,u.H),null)},
$S:22}
A.df.prototype={
$3(a,b,c){return A.hj(A.q(a),A.q(b),A.eD(c))},
$S:23}
A.dg.prototype={
$0(){return A.hT()},
$S:1}
A.dh.prototype={
$3(a,b,c){A.q(a)
A.V(b)
A.q(c)
return A.hk(a,A.v(b),c)},
$S:24}
A.di.prototype={
$0(){return A.hy()},
$S:1}
A.dj.prototype={
$1(a){var t=B.r.aX(A.q(a)==="unsteady"?$.fn():$.fl()),s=B.h.ar(t.b,0)
return(t.c?"Irregular rhythm: possible stumble risk":"Steady rhythm")+". "+t.a+" steps detected, "+s+" steps per minute."},
$S:0};(function aliases(){var t=J.a0.prototype
t.aD=t.i
t=A.c.prototype
t.aC=t.bc})();(function installTearOffs(){var t=hunkHelpers._static_2,s=hunkHelpers.installInstanceTearOff,r=hunkHelpers._static_1,q=hunkHelpers._static_0
t(J,"hG","fF",25)
s(J.P.prototype,"gb_",1,1,null,["$2","$1"],["ak","D"],5,0,0)
r(A,"i7","hw",2)
q(A,"dS","fA",26)})();(function inheritance(){var t=hunkHelpers.mixin,s=hunkHelpers.inherit,r=hunkHelpers.inheritMany
s(A.i,null)
r(A.i,[A.dB,J.bK,A.bc,J.aP,A.m,A.cI,A.c,A.ae,A.b3,A.U,A.aV,A.ak,A.aQ,A.ai,A.aG,A.cP,A.cx,A.Z,A.b2,A.cu,A.ac,A.b1,A.b0,A.aw,A.bl,A.c8,A.c3,A.cd,A.d_,A.M,A.ca,A.cY,A.al,A.ad,A.bC,A.bE,A.cV,A.A,A.O,A.cR,A.bV,A.bf,A.cS,A.cl,A.n,A.b7,A.aH,A.cb,A.ch,A.ci,A.cy,A.cq,A.a7,A.bI,A.cm,A.k,A.cA,A.am,A.cB,A.bd,A.cH,A.cz,A.bW,A.b9,A.aF,A.cF,A.cJ,A.B,A.cg,A.a_,A.ck])
r(J.bK,[J.bN,J.aX,J.aY,J.ax,J.ay,J.av,J.P])
r(J.aY,[J.a0,J.o,A.ag,A.b6])
r(J.a0,[J.bX,J.ah,J.Q])
s(J.bM,A.bc)
s(J.cr,J.o)
r(J.av,[J.aW,J.bO])
r(A.m,[A.bS,A.bi,A.bQ,A.c6,A.c1,A.c9,A.aZ,A.by,A.Y,A.bj,A.c5,A.bg,A.bD])
r(A.c,[A.l,A.af,A.T,A.bk,A.c7,A.cc,A.aJ])
r(A.l,[A.u,A.cv,A.E,A.b_])
r(A.u,[A.bh,A.F])
s(A.aU,A.af)
s(A.aI,A.ak)
s(A.bo,A.aI)
s(A.a8,A.aQ)
s(A.aR,A.aG)
s(A.aS,A.aR)
s(A.b8,A.bi)
r(A.Z,[A.bA,A.bB,A.c4,A.d7,A.d9,A.co,A.cC,A.cE,A.cG,A.cO,A.cK,A.cL,A.cM,A.d3,A.db,A.dc,A.dd,A.dk,A.dm,A.dq,A.dr,A.ds,A.de,A.df,A.dh,A.dj])
r(A.c4,[A.c2,A.au])
s(A.ab,A.b2)
r(A.bB,[A.d8,A.cw,A.cW,A.cn,A.cp,A.cD,A.cN,A.d2])
r(A.b6,[A.b4,A.aA])
s(A.bm,A.aA)
s(A.bn,A.bm)
s(A.b5,A.bn)
s(A.bU,A.b5)
s(A.bp,A.c9)
s(A.bR,A.aZ)
s(A.cs,A.bC)
s(A.ct,A.bE)
s(A.cU,A.cV)
r(A.bA,[A.cj,A.dl,A.dn,A.dp,A.dg,A.di])
r(A.Y,[A.aE,A.bJ])
r(A.cR,[A.aT,A.aC,A.be,A.a9])
t(A.bm,A.ad)
t(A.bn,A.aV)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{b:"int",p:"double",f:"num",a:"String",z:"bool",b7:"Null",J:"List",i:"Object",R:"Map",I:"JSObject"},mangledNames:{},types:["a(a)","a()","@(@)","~(i?,i?)","z(a)","z(aB[b])","@(@,a)","@(a)","0&()","b(b,b)","f(b)","f(f,f)","n<a,f>(n<a,am>)","b(n<a,f>,n<a,f>)","a(n<a,f>)","z(aF)","b(+index,score(b,b),+index,score(b,b))","b(+index,score(b,b))","b(k,k)","a(p,p,p)","~(a)","a(p)","a(p,p,p,p)","a(a,a,z)","a(a,p,a)","b(@,@)","A()"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;index,score":(a,b)=>c=>c instanceof A.bo&&a.b(c.a)&&b.b(c.b)}}
A.hg(v.typeUniverse,JSON.parse('{"Q":"a0","bX":"a0","ah":"a0","iD":"ag","bN":{"z":[],"C":[]},"aX":{"C":[]},"aY":{"I":[]},"a0":{"I":[]},"o":{"J":["1"],"l":["1"],"I":[],"c":["1"]},"bM":{"bc":[]},"cr":{"o":["1"],"J":["1"],"l":["1"],"I":[],"c":["1"]},"aP":{"r":["1"]},"av":{"p":[],"f":[],"D":["f"]},"aW":{"p":[],"b":[],"f":[],"D":["f"],"C":[]},"bO":{"p":[],"f":[],"D":["f"],"C":[]},"P":{"a":[],"D":["a"],"aB":[],"C":[]},"bS":{"m":[]},"l":{"c":["1"]},"u":{"l":["1"],"c":["1"]},"bh":{"u":["1"],"l":["1"],"c":["1"],"u.E":"1","c.E":"1"},"ae":{"r":["1"]},"af":{"c":["2"],"c.E":"2"},"aU":{"af":["1","2"],"l":["2"],"c":["2"],"c.E":"2"},"b3":{"r":["2"]},"F":{"u":["2"],"l":["2"],"c":["2"],"u.E":"2","c.E":"2"},"T":{"c":["1"],"c.E":"1"},"U":{"r":["1"]},"bo":{"aI":[],"ak":[]},"aQ":{"R":["1","2"]},"a8":{"aQ":["1","2"],"R":["1","2"]},"bk":{"c":["1"],"c.E":"1"},"ai":{"r":["1"]},"aR":{"aG":["1"],"l":["1"],"c":["1"]},"aS":{"aR":["1"],"aG":["1"],"l":["1"],"c":["1"]},"b8":{"m":[]},"bQ":{"m":[]},"c6":{"m":[]},"Z":{"aa":[]},"bA":{"aa":[]},"bB":{"aa":[]},"c4":{"aa":[]},"c2":{"aa":[]},"au":{"aa":[]},"c1":{"m":[]},"ab":{"b2":["1","2"],"eg":["1","2"],"R":["1","2"]},"cv":{"l":["1"],"c":["1"],"c.E":"1"},"ac":{"r":["1"]},"E":{"l":["1"],"c":["1"],"c.E":"1"},"b1":{"r":["1"]},"b_":{"l":["n<1,2>"],"c":["n<1,2>"],"c.E":"n<1,2>"},"b0":{"r":["n<1,2>"]},"aI":{"ak":[]},"aw":{"fW":[],"aB":[]},"bl":{"bb":[],"az":[]},"c7":{"c":["bb"],"c.E":"bb"},"c8":{"r":["bb"]},"c3":{"az":[]},"cc":{"c":["az"],"c.E":"az"},"cd":{"r":["az"]},"ag":{"I":[],"C":[]},"b6":{"I":[]},"b4":{"e8":[],"I":[],"C":[]},"aA":{"bP":["1"],"I":[]},"b5":{"ad":["b"],"J":["b"],"bP":["b"],"l":["b"],"I":[],"c":["b"],"aV":["b"]},"bU":{"ad":["b"],"J":["b"],"bP":["b"],"l":["b"],"I":[],"c":["b"],"aV":["b"],"C":[],"ad.E":"b"},"c9":{"m":[]},"bp":{"m":[]},"al":{"r":["1"]},"aJ":{"c":["1"],"c.E":"1"},"b2":{"R":["1","2"]},"aG":{"l":["1"],"c":["1"]},"aZ":{"m":[]},"bR":{"m":[]},"A":{"D":["A"]},"p":{"f":[],"D":["f"]},"O":{"D":["O"]},"b":{"f":[],"D":["f"]},"J":{"l":["1"],"c":["1"]},"f":{"D":["f"]},"bb":{"az":[]},"a":{"D":["a"],"aB":[]},"by":{"m":[]},"bi":{"m":[]},"Y":{"m":[]},"aE":{"m":[]},"bJ":{"m":[]},"bj":{"m":[]},"c5":{"m":[]},"bg":{"m":[]},"bD":{"m":[]},"bV":{"m":[]},"bf":{"m":[]},"aH":{"fZ":[]},"cb":{"fU":[]},"h_":{"J":["b"],"l":["b"],"c":["b"]}}'))
A.hf(v.typeUniverse,JSON.parse('{"l":1,"aA":1,"bC":2,"bE":2}'))
var u=(function rtii(){var t=A.a6
return{U:t("D<@>"),k:t("A"),d:t("O"),O:t("l<@>"),Q:t("m"),Z:t("aa"),V:t("c<@>"),u:t("o<a7>"),M:t("o<A>"),J:t("o<R<a,i>>"),v:t("o<R<a,a>>"),f:t("o<i>"),e:t("o<+index,score(b,b)>"),s:t("o<a>"),w:t("o<@>"),t:t("o<b>"),T:t("aX"),m:t("I"),L:t("Q"),p:t("bP<@>"),n:t("J<a7>"),a:t("J<a>"),j:t("J<@>"),W:t("n<a,am>"),b:t("n<a,f>"),c:t("R<a,b>"),G:t("R<@,@>"),q:t("F<b,f>"),P:t("b7"),K:t("i"),E:t("aB"),h:t("k"),Y:t("iF"),F:t("+()"),g:t("+index,score(b,b)"),l:t("bb"),C:t("aF"),N:t("a"),R:t("C"),o:t("ah"),y:t("z"),i:t("p"),S:t("b"),_:t("ec<b7>?"),z:t("I?"),X:t("i?"),x:t("a?"),A:t("z?"),I:t("p?"),B:t("b?"),D:t("f?"),H:t("f"),r:t("f(b)")}})();(function constants(){var t=hunkHelpers.makeConstList
B.L=J.bK.prototype
B.a=J.o.prototype
B.c=J.aW.prototype
B.h=J.av.prototype
B.b=J.P.prototype
B.M=J.Q.prototype
B.N=J.aY.prototype
B.T=A.b4.prototype
B.q=J.bX.prototype
B.l=J.ah.prototype
B.aD=new A.O(25e4)
B.r=new A.cm()
B.t=new A.cq()
B.n=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.u=function() {
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
B.z=function(getTagFallback) {
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
B.v=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.y=function(hooks) {
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
B.x=function(hooks) {
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
B.w=function(hooks) {
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
B.m=function(hooks) { return hooks; }

B.e=new A.cs()
B.A=new A.bV()
B.B=new A.cH()
B.f=new A.cI()
B.C=new A.aT(0,"ok")
B.D=new A.aT(1,"needsAttention")
B.E=new A.aT(2,"unknown")
B.aE=new A.O(6e8)
B.aF=new A.O(864e8)
B.F=new A.a9(0,"dayMonthYearSlash")
B.G=new A.a9(1,"dayMonthYearDash")
B.H=new A.a9(2,"monthYearOnly")
B.I=new A.a9(3,"entroIlPhrase")
B.J=new A.a9(4,"italianMonthName")
B.K=new A.a_(null,null)
B.O=new A.ct(null)
B.o=t(["ch","gh","gn","gl","sc"],u.s)
B.P=t(["conto bloccato","clicca subito","vincita","ultimo avviso","sospensione immediata","azione richiesta"],u.s)
B.Q=t(["codice","otp","pin","password"],u.s)
B.R=t([],u.s)
B.V={gen:0,feb:1,mar:2,apr:3,mag:4,giu:5,lug:6,ago:7,set:8,ott:9,nov:10,dic:11}
B.S=new A.a8(B.V,[1,2,3,4,5,6,7,8,9,10,11,12],A.a6("a8<a,b>"))
B.U={rosso:0,verde:1,blu:2,giallo:3,bianco:4,nero:5,arancione:6,viola:7,rosa:8,marrone:9,grigio:10}
B.an=new A.B(220,20,20)
B.al=new A.B(20,140,20)
B.am=new A.B(20,20,200)
B.ao=new A.B(230,220,20)
B.ar=new A.B(255,255,255)
B.ah=new A.B(0,0,0)
B.ap=new A.B(240,130,20)
B.ak=new A.B(130,20,160)
B.aq=new A.B(240,150,190)
B.ai=new A.B(120,70,30)
B.aj=new A.B(130,130,130)
B.p=new A.a8(B.U,[B.an,B.al,B.am,B.ao,B.ar,B.ah,B.ap,B.ak,B.aq,B.ai,B.aj],A.a6("a8<a,B>"))
B.X=new A.b9("A profile with consentGiven set to true must have a consentTimestamp.")
B.Y=new A.b9("A profile with a consentTimestamp must have consentGiven set to true.")
B.j=new A.aC(2,"emotions")
B.Z=new A.k("emotions-sad","I'm sad",B.j)
B.d=new A.aC(1,"greetings")
B.a_=new A.k("greetings-hello","Hello",B.d)
B.k=new A.aC(3,"emergency")
B.a0=new A.k("emergency-call-family","Call my family",B.k)
B.a1=new A.k("greetings-yes","Yes",B.d)
B.a2=new A.k("emotions-happy","I'm happy",B.j)
B.i=new A.aC(0,"needs")
B.a3=new A.k("needs-water","Water",B.i)
B.a4=new A.k("emergency-help","Help",B.k)
B.a5=new A.k("emergency-not-well","I don't feel well",B.k)
B.a6=new A.k("greetings-please","Please",B.d)
B.a7=new A.k("greetings-goodbye","Goodbye",B.d)
B.a8=new A.k("needs-pain","I'm in pain",B.i)
B.a9=new A.k("emergency-call-doctor","Call a doctor",B.k)
B.aa=new A.k("emotions-scared","I'm scared",B.j)
B.ab=new A.k("greetings-thank-you","Thank you",B.d)
B.ac=new A.k("greetings-no","No",B.d)
B.ad=new A.k("emotions-angry","I'm angry",B.j)
B.ae=new A.k("needs-tired","I'm tired",B.i)
B.af=new A.k("needs-bathroom","Bathroom",B.i)
B.ag=new A.k("needs-hungry","I'm hungry",B.i)
B.av=new A.be(0,"none")
B.as=new A.bd(B.av,"No suspicious element recognized in this message.")
B.ax=new A.be(2,"high")
B.at=new A.bd(B.ax,"The message combines multiple signals typical of scams, such as a request for a code or password together with urgent language or a shortened link.")
B.aw=new A.be(1,"low")
B.au=new A.bd(B.aw,"The message contains something sometimes found in scam messages, such as urgency, a code request, or a shortened link. Treat it with caution before replying.")
B.W={il:0,lo:1,la:2,i:3,gli:4,le:5,un:6,uno:7,una:8,di:9,a:10,da:11,in:12,con:13,su:14,per:15,tra:16,fra:17,e:18,o:19,ma:20,che:21,chi:22,non:23,si:24,mi:25,ti:26,ci:27,vi:28,"\xe8":29,sono:30,ho:31,hai:32,ha:33,abbiamo:34}
B.ay=new A.aS(B.W,35,A.a6("aS<a>"))
B.az=A.dv("iv")
B.aA=A.dv("e8")
B.aB=A.dv("i")
B.aC=A.dv("h_")})();(function staticFields(){$.cT=null
$.H=A.h([],u.f)
$.ej=null
$.e6=null
$.e5=null
$.eT=null
$.eP=null
$.eW=null
$.d4=null
$.da=null
$.dU=null
$.cX=A.h([],A.a6("o<J<i>?>"))
$.fM=A.h([B.a3,B.af,B.ag,B.ae,B.a8,B.a_,B.a7,B.ab,B.a6,B.a1,B.ac,B.a2,B.Z,B.aa,B.ad,B.a4,B.a9,B.a0,B.a5],A.a6("o<k>"))})();(function lazyInitializers(){var t=hunkHelpers.lazyFinal
t($,"ix","f_",()=>A.d5("_$dart_dartClosure"))
t($,"iw","bv",()=>A.d5("_$dart_dartClosure_dartJSInterop"))
t($,"j_","fk",()=>A.h([new J.bM()],A.a6("o<bc>")))
t($,"iH","f7",()=>A.S(A.cQ({
toString:function(){return"$receiver$"}})))
t($,"iI","f8",()=>A.S(A.cQ({$method$:null,
toString:function(){return"$receiver$"}})))
t($,"iJ","f9",()=>A.S(A.cQ(null)))
t($,"iK","fa",()=>A.S(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(s){return s.message}}()))
t($,"iN","fd",()=>A.S(A.cQ(void 0)))
t($,"iO","fe",()=>A.S(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(s){return s.message}}()))
t($,"iM","fc",()=>A.S(A.eo(null)))
t($,"iL","fb",()=>A.S(function(){try{null.$method$}catch(s){return s.message}}()))
t($,"iQ","fg",()=>A.S(A.eo(void 0)))
t($,"iP","ff",()=>A.S(function(){try{(void 0).$method$}catch(s){return s.message}}()))
t($,"iU","dw",()=>A.eU(B.aB))
t($,"iE","f5",()=>{var s=new A.cb(new DataView(new ArrayBuffer(8)))
s.aE()
return s})
t($,"iG","f6",()=>A.a3("https?://(bit\\.ly|tinyurl\\.com|t\\.co|goo\\.gl)/\\S+",!1,!1))
t($,"iz","f1",()=>A.a3("entro\\s+(?:il\\s+)?(\\d{1,2})[/\\-](\\d{1,2})[/\\-](\\d{2,4})",!1,!1))
t($,"iC","f4",()=>A.a3("(\\d{1,2})/(\\d{1,2})/(\\d{2,4})",!0,!1))
t($,"iy","f0",()=>A.a3("(\\d{1,2})-(\\d{1,2})-(\\d{2,4})",!0,!1))
t($,"iA","f2",()=>A.a3("(\\d{1,2})\\s+(gen|feb|mar|apr|mag|giu|lug|ago|set|ott|nov|dic)\\w*\\s+(\\d{4})",!1,!1))
t($,"iB","f3",()=>A.a3("scad\\.?\\s*(\\d{1,2})[/\\-](\\d{4})",!1,!1))
t($,"iT","fi",()=>new A.ck())
t($,"iR","fh",()=>new A.cg())
t($,"j1","fm",()=>new A.cJ())
t($,"iV","fj",()=>{var s=$.f5()
return new A.cy(s)})
t($,"iS","dY",()=>new A.ci(A.dS()))
t($,"iX","e_",()=>A.fL())
t($,"iY","e0",()=>new A.cB(A.dS(),A.bT(u.N,A.a6("am"))))
t($,"iW","dZ",()=>new A.cz(A.bT(u.N,A.a6("bW"))))
t($,"iZ","e1",()=>new A.cF(A.dS(),A.bT(u.N,u.C)))
t($,"j0","fl",()=>A.eO(A.h([0,600,1200,1800,2400,3000,3600,4200],u.t)))
t($,"j2","fn",()=>A.eO(A.h([0,300,1200,1500,2700,3000,4500,4800],u.t)))})();(function nativeSupport(){!function(){var t=function(a){var n={}
n[a]=1
return Object.keys(hunkHelpers.convertToFastObject(n))[0]}
v.getIsolateTag=function(a){return t("___dart_"+a+v.isolateTag)}
var s="___dart_isolate_tags_"
var r=Object[s]||(Object[s]=Object.create(null))
var q="_ZxYxX"
for(var p=0;;p++){var o=t(q+"_"+p+"_")
if(!(o in r)){r[o]=1
v.isolateTag=o
break}}v.dispatchPropertyName=v.getIsolateTag("dispatch_record")}()
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.ag,SharedArrayBuffer:A.ag,ArrayBufferView:A.b6,DataView:A.b4,Uint8Array:A.bU})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Uint8Array:false})
A.aA.$nativeSuperclassTag="ArrayBufferView"
A.bm.$nativeSuperclassTag="ArrayBufferView"
A.bn.$nativeSuperclassTag="ArrayBufferView"
A.b5.$nativeSuperclassTag="ArrayBufferView"})()
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$0=function(){return this()}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var t=document.scripts
function onLoad(b){for(var r=0;r<t.length;++r){t[r].removeEventListener("load",onLoad,false)}a(b.target)}for(var s=0;s<t.length;++s){t[s].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var t=A.ip
if(typeof dartMainRunner==="function"){dartMainRunner(t,[])}else{t([])}})})()
//# sourceMappingURL=lumen-demo.js.map
