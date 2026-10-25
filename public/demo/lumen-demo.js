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
if(a[b]!==t){A.iI(b)}a[b]=s}var r=a[b]
a[c]=function(){return r}
return r}}function makeConstList(a,b){if(b!=null)A.f(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var t=0;t<a.length;++t){convertToFastObject(a[t])}}var y=0
function instanceTearOffGetter(a,b){var t=null
return a?function(c){if(t===null)t=A.e4(b)
return new t(c,this)}:function(){if(t===null)t=A.e4(b)
return new t(this,null)}}function staticTearOffGetter(a){var t=null
return function(){if(t===null)t=A.e4(a).prototype
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
e9(a,b,c,d){return{i:a,p:b,e:c,x:d}},
dj(a){var t,s,r,q,p,o="_$dart_js",n=a[v.dispatchPropertyName]
if(n==null)if($.e7==null){A.iA()
n=a[v.dispatchPropertyName]}if(n!=null){t=n.p
if(!1===t)return n.i
if(!0===t)return a
s=Object.getPrototypeOf(a)
if(t===s)return n.i
if(n.e===s)throw A.d(A.eD("Return interceptor for "+A.k(t(a,n))))}r=a.constructor
if(r==null)q=null
else{p=$.d3
if(p==null)p=$.d3=A.di(o)
q=r[p]}if(q!=null)return q
q=A.iE(a)
if(q!=null)return q
if(typeof a=="function")return B.S
t=Object.getPrototypeOf(a)
if(t==null)return B.t
if(t===Object.prototype)return B.t
if(typeof r=="function"){p=$.d3
if(p==null)p=$.d3=A.di(o)
Object.defineProperty(r,p,{value:B.l,enumerable:false,writable:true,configurable:true})
return B.l}return B.l},
fS(a,b){if(a<0||a>4294967295)throw A.d(A.a6(a,0,4294967295,"length",null))
return J.fT(new Array(a),b)},
eq(a,b){if(a<0)throw A.d(A.aw("Length must be a non-negative integer: "+a))
return A.f(new Array(a),b.h("l<0>"))},
fT(a,b){var t=A.f(a,b.h("l<0>"))
t.$flags=1
return t},
fU(a,b){var t=u.U
return J.fE(t.a(a),t.a(b))},
er(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
fV(a,b){var t,s
for(t=a.length;b<t;){s=a.charCodeAt(b)
if(s!==32&&s!==13&&!J.er(s))break;++b}return b},
fW(a,b){var t,s,r
for(t=a.length;b>0;b=s){s=b-1
if(!(s<t))return A.e(a,s)
r=a.charCodeAt(s)
if(r!==32&&r!==13&&!J.er(r))break}return b},
as(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.aZ.prototype
return J.bR.prototype}if(typeof a=="string")return J.U.prototype
if(a==null)return J.b_.prototype
if(typeof a=="boolean")return J.bQ.prototype
if(Array.isArray(a))return J.l.prototype
if(typeof a!="object"){if(typeof a=="function")return J.V.prototype
if(typeof a=="symbol")return J.aB.prototype
if(typeof a=="bigint")return J.aA.prototype
return a}if(a instanceof A.j)return a
return J.dj(a)},
e6(a){if(typeof a=="string")return J.U.prototype
if(a==null)return a
if(Array.isArray(a))return J.l.prototype
if(typeof a!="object"){if(typeof a=="function")return J.V.prototype
if(typeof a=="symbol")return J.aB.prototype
if(typeof a=="bigint")return J.aA.prototype
return a}if(a instanceof A.j)return a
return J.dj(a)},
f5(a){if(a==null)return a
if(Array.isArray(a))return J.l.prototype
if(typeof a!="object"){if(typeof a=="function")return J.V.prototype
if(typeof a=="symbol")return J.aB.prototype
if(typeof a=="bigint")return J.aA.prototype
return a}if(a instanceof A.j)return a
return J.dj(a)},
iu(a){if(typeof a=="number")return J.ay.prototype
if(typeof a=="string")return J.U.prototype
if(a==null)return a
if(!(a instanceof A.j))return J.ak.prototype
return a},
iv(a){if(typeof a=="string")return J.U.prototype
if(a==null)return a
if(!(a instanceof A.j))return J.ak.prototype
return a},
iw(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.V.prototype
if(typeof a=="symbol")return J.aB.prototype
if(typeof a=="bigint")return J.aA.prototype
return a}if(a instanceof A.j)return a
return J.dj(a)},
cj(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.as(a).F(a,b)},
ef(a,b){return J.iv(a).al(a,b)},
fD(a,b,c){return J.iw(a).am(a,b,c)},
fE(a,b){return J.iu(a).u(a,b)},
eg(a,b){return J.f5(a).t(a,b)},
a1(a){return J.as(a).gp(a)},
fF(a){return J.e6(a).gav(a)},
aR(a){return J.f5(a).gn(a)},
dN(a){return J.e6(a).gm(a)},
fG(a){return J.as(a).gA(a)},
bA(a){return J.as(a).i(a)},
bN:function bN(){},
bQ:function bQ(){},
b_:function b_(){},
b0:function b0(){},
a5:function a5(){},
c_:function c_(){},
ak:function ak(){},
V:function V(){},
aA:function aA(){},
aB:function aB(){},
l:function l(a){this.$ti=a},
bP:function bP(){},
cx:function cx(a){this.$ti=a},
aS:function aS(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
ay:function ay(){},
aZ:function aZ(){},
bR:function bR(){},
U:function U(){}},A={dR:function dR(){},
a8(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
dW(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
e3(a,b,c){return a},
e8(a){var t,s
for(t=$.I.length,s=0;s<t;++s)if(a===$.I[s])return!0
return!1},
eB(a,b,c,d){A.dU(b,"start")
A.dU(c,"end")
if(b>c)A.av(A.a6(b,0,c,"start",null))
return new A.bj(a,b,c,d.h("bj<0>"))},
fY(a,b,c,d){if(u.O.b(a))return new A.aX(a,b,c.h("@<0>").O(d).h("aX<1,2>"))
return new A.ai(a,b,c.h("@<0>").O(d).h("ai<1,2>"))},
bO(){return new A.bi("No element")},
bV:function bV(a){this.a=a},
cT:function cT(){},
m:function m(){},
v:function v(){},
bj:function bj(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
ah:function ah(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
ai:function ai(a,b,c){this.a=a
this.b=b
this.$ti=c},
aX:function aX(a,b,c){this.a=a
this.b=b
this.$ti=c},
b6:function b6(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
C:function C(a,b,c){this.a=a
this.b=b
this.$ti=c},
a_:function a_(a,b,c){this.a=a
this.b=b
this.$ti=c},
Q:function Q(a,b,c){this.a=a
this.b=b
this.$ti=c},
bm:function bm(a,b){this.a=a
this.$ti=b},
bn:function bn(a,b){this.a=a
this.$ti=b},
aY:function aY(){},
fb(a){var t=A.fa(a)
if(t!=null)return t
return"minified:"+a},
jl(a,b){var t
if(b!=null){t=b.x
if(t!=null)return t}return u.p.b(a)},
k(a){var t
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
t=J.bA(a)
return t},
c2(a){var t,s=$.ex
if(s==null)s=$.ex=Symbol("identityHashCode")
t=a[s]
if(t==null){t=Math.random()*0x3fffffff|0
a[s]=t}return t},
h6(a,b){var t,s=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(s==null)return null
if(3>=s.length)return A.e(s,3)
t=s[3]
if(t!=null)return parseInt(a,10)
if(s[2]!=null)return parseInt(a,16)
return null},
h5(a){var t,s
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return null
t=parseFloat(a)
if(isNaN(t)){s=B.b.X(a)
if(s==="NaN"||s==="+NaN"||s==="-NaN")return t
return null}return t},
c3(a){var t,s,r,q
if(a instanceof A.j)return A.H(A.by(a),null)
t=J.as(a)
if(t===B.R||t===B.T||u.o.b(a)){s=B.p(a)
if(s!=="Object"&&s!=="")return s
r=a.constructor
if(typeof r=="function"){q=r.name
if(typeof q=="string"&&q!=="Object"&&q!=="")return q}}return A.H(A.by(a),null)},
ey(a){var t,s,r
if(a==null||typeof a=="number"||A.e1(a))return J.bA(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.a3)return a.i(0)
if(a instanceof A.an)return a.aj(!0)
t=$.fz()
for(s=0;s<1;++s){r=t[s].bj(a)
if(r!=null)return r}return"Instance of '"+A.c3(a)+"'"},
x(a){var t
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){t=a-65536
return String.fromCharCode((B.c.ai(t,10)|55296)>>>0,t&1023|56320)}throw A.d(A.a6(a,0,1114111,null,null))},
h7(a,b,c,d,e,f,g,h,i){var t,s,r,q=b-1
if(0<=a&&a<100){a+=400
q-=4800}t=B.c.Z(h,1000)
s=new Date(a,q,c,d,e,f,g+B.c.D(h-t,1000)).valueOf()
r=!0
if(!isNaN(s))if(!(s<-864e13))if(!(s>864e13))r=s===864e13&&t!==0
if(r)return null
return s},
aG(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
c1(a){var t=A.aG(a).getFullYear()+0
return t},
c0(a){var t=A.aG(a).getMonth()+1
return t},
bd(a){var t=A.aG(a).getDate()+0
return t},
h1(a){var t=A.aG(a).getHours()+0
return t},
h3(a){var t=A.aG(a).getMinutes()+0
return t},
h4(a){var t=A.aG(a).getSeconds()+0
return t},
h2(a){var t=A.aG(a).getMilliseconds()+0
return t},
e(a,b){if(a==null)J.dN(a)
throw A.d(A.f4(a,b))},
f4(a,b){var t,s="index"
if(!A.eY(b))return new A.a2(!0,b,s,null)
t=J.dN(a)
if(b<0||b>=t)return A.dP(b,t,a,s)
return new A.aH(null,null,!0,b,s,"Value not in range")},
d(a){return A.z(a,new Error())},
z(a,b){var t
if(a==null)a=new A.bk()
b.dartException=a
t=A.iJ
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:t})
b.name=""}else b.toString=t
return b},
iJ(){return J.bA(this.dartException)},
av(a,b){throw A.z(a,b==null?new Error():b)},
dJ(a,b,c){var t
if(b==null)b=0
if(c==null)c=0
t=Error()
A.av(A.hN(a,b,c),t)},
hN(a,b,c){var t,s,r,q,p,o,n,m,l
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
return new A.bl("'"+t+"': Cannot "+p+" "+m+l+o)},
R(a){throw A.d(A.O(a))},
Z(a){var t,s,r,q,p,o
a=A.iH(a.replace(String({}),"$receiver$"))
t=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(t==null)t=A.f([],u.s)
s=t.indexOf("\\$arguments\\$")
r=t.indexOf("\\$argumentsExpr\\$")
q=t.indexOf("\\$expr\\$")
p=t.indexOf("\\$method\\$")
o=t.indexOf("\\$receiver\\$")
return new A.d_(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),s,r,q,p,o)},
d0(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(t){return t.message}}(a)},
eC(a){return function($expr$){try{$expr$.$method$}catch(t){return t.message}}(a)},
dS(a,b){var t=b==null,s=t?null:b.method
return new A.bT(a,s,t?null:b.receiver)},
fc(a){if(a==null)return new A.cE(a)
if(typeof a!=="object")return a
if("dartException" in a)return A.au(a,a.dartException)
return A.il(a)},
au(a,b){if(u.V.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
il(a){var t,s,r,q,p,o,n,m,l,k,j,i,h
if(!("message" in a))return a
t=a.message
if("number" in a&&typeof a.number=="number"){s=a.number
r=s&65535
if((B.c.ai(s,16)&8191)===10)switch(r){case 438:return A.au(a,A.dS(A.k(t)+" (Error "+r+")",null))
case 445:case 5007:A.k(t)
return A.au(a,new A.bb())}}if(a instanceof TypeError){q=$.fm()
p=$.fn()
o=$.fo()
n=$.fp()
m=$.fs()
l=$.ft()
k=$.fr()
$.fq()
j=$.fv()
i=$.fu()
h=q.v(t)
if(h!=null)return A.au(a,A.dS(A.p(t),h))
else{h=p.v(t)
if(h!=null){h.method="call"
return A.au(a,A.dS(A.p(t),h))}else if(o.v(t)!=null||n.v(t)!=null||m.v(t)!=null||l.v(t)!=null||k.v(t)!=null||n.v(t)!=null||j.v(t)!=null||i.v(t)!=null){A.p(t)
return A.au(a,new A.bb())}}return A.au(a,new A.c9(typeof t=="string"?t:""))}if(a instanceof RangeError){if(typeof t=="string"&&t.indexOf("call stack")!==-1)return new A.bh()
t=function(b){try{return String(b)}catch(g){}return null}(a)
return A.au(a,new A.a2(!1,null,null,typeof t=="string"?t.replace(/^RangeError:\s*/,""):t))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof t=="string"&&t==="too much recursion")return new A.bh()
return a},
f7(a){if(a==null)return J.a1(a)
if(typeof a=="object")return A.c2(a)
return J.a1(a)},
it(a,b){var t,s,r,q=a.length
for(t=0;t<q;t=r){s=t+1
r=s+1
b.q(0,a[t],a[s])}return b},
hX(a,b,c,d,e,f){u.Z.a(a)
switch(A.t(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.d(new A.d2("Unsupported number of arguments for wrapped closure"))},
im(a,b){var t=a.$identity
if(!!t)return t
t=A.io(a,b)
a.$identity=t
return t},
io(a,b){var t
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.hX)},
fO(a1){var t,s,r,q,p,o,n,m,l,k,j=a1.co,i=a1.iS,h=a1.iI,g=a1.nDA,f=a1.aI,e=a1.fs,d=a1.cs,c=e[0],b=d[0],a=j[c],a0=a1.fT
a0.toString
t=i?Object.create(new A.c5().constructor.prototype):Object.create(new A.ax(null,null).constructor.prototype)
t.$initialize=t.constructor
s=i?function static_tear_off(){this.$initialize()}:function tear_off(a2,a3){this.$initialize(a2,a3)}
t.constructor=s
s.prototype=t
t.$_name=c
t.$_target=a
r=!i
if(r)q=A.em(c,a,h,g)
else{t.$static_name=c
q=a}t.$S=A.fK(a0,i,h)
t[b]=q
for(p=q,o=1;o<e.length;++o){n=e[o]
if(typeof n=="string"){m=j[n]
l=n
n=m}else l=""
k=d[o]
if(k!=null){if(r)n=A.em(l,n,h,g)
t[k]=n}if(o===f)p=n}t.$C=p
t.$R=a1.rC
t.$D=a1.dV
return s},
fK(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.d("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.fI)}throw A.d("Error in functionType of tearoff")},
fL(a,b,c,d){var t=A.ek
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,t)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,t)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,t)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,t)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,t)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,t)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,t)}},
em(a,b,c,d){if(c)return A.fN(a,b,d)
return A.fL(b.length,d,a,b)},
fM(a,b,c,d){var t=A.ek,s=A.fJ
switch(b?-1:a){case 0:throw A.d(new A.c4("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,s,t)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,s,t)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,s,t)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,s,t)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,s,t)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,s,t)
default:return function(e,f,g){return function(){var r=[g(this)]
Array.prototype.push.apply(r,arguments)
return e.apply(f(this),r)}}(d,s,t)}},
fN(a,b,c){var t,s
if($.ei==null)$.ei=A.eh("interceptor")
if($.ej==null)$.ej=A.eh("receiver")
t=b.length
s=A.fM(t,c,a,b)
return s},
e4(a){return A.fO(a)},
fI(a,b){return A.bx(v.typeUniverse,A.by(a.a),b)},
ek(a){return a.a},
fJ(a){return a.b},
eh(a){var t,s,r,q=new A.ax("receiver","interceptor"),p=Object.getOwnPropertyNames(q)
p.$flags=1
t=p
for(p=t.length,s=0;s<p;++s){r=t[s]
if(q[r]===a)return r}throw A.d(A.aw("Field name "+a+" not found."))},
di(a){return v.getIsolateTag(a)},
jk(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
iE(a){var t,s,r,q,p,o=A.p($.f6.$1(a)),n=$.dh[o]
if(n!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}t=$.dn[o]
if(t!=null)return t
s=v.interceptorsByTag[o]
if(s==null){r=A.eT($.f2.$2(a,o))
if(r!=null){n=$.dh[r]
if(n!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}t=$.dn[r]
if(t!=null)return t
s=v.interceptorsByTag[r]
o=r}}if(s==null)return null
t=s.prototype
q=o[0]
if(q==="!"){n=A.dI(t)
$.dh[o]=n
Object.defineProperty(a,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
return n.i}if(q==="~"){$.dn[o]=t
return t}if(q==="-"){p=A.dI(t)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:p,enumerable:false,writable:true,configurable:true})
return p.i}if(q==="+")return A.f8(a,t)
if(q==="*")throw A.d(A.eD(o))
if(v.leafTags[o]===true){p=A.dI(t)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:p,enumerable:false,writable:true,configurable:true})
return p.i}else return A.f8(a,t)},
f8(a,b){var t=Object.getPrototypeOf(a)
Object.defineProperty(t,v.dispatchPropertyName,{value:J.e9(b,t,null,null),enumerable:false,writable:true,configurable:true})
return b},
dI(a){return J.e9(a,!1,null,!!a.$ibS)},
iG(a,b,c){var t=b.prototype
if(v.leafTags[a]===true)return A.dI(t)
else return J.e9(t,c,null,null)},
iA(){if(!0===$.e7)return
$.e7=!0
A.iB()},
iB(){var t,s,r,q,p,o,n,m
$.dh=Object.create(null)
$.dn=Object.create(null)
A.iz()
t=v.interceptorsByTag
s=Object.getOwnPropertyNames(t)
if(typeof window!="undefined"){window
r=function(){}
for(q=0;q<s.length;++q){p=s[q]
o=$.f9.$1(p)
if(o!=null){n=A.iG(p,t[p],o)
if(n!=null){Object.defineProperty(o,v.dispatchPropertyName,{value:n,enumerable:false,writable:true,configurable:true})
r.prototype=o}}}}for(q=0;q<s.length;++q){p=s[q]
if(/^[A-Za-z_]/.test(p)){m=t[p]
t["!"+p]=m
t["~"+p]=m
t["-"+p]=m
t["+"+p]=m
t["*"+p]=m}}},
iz(){var t,s,r,q,p,o,n=B.y()
n=A.aO(B.z,A.aO(B.A,A.aO(B.o,A.aO(B.o,A.aO(B.B,A.aO(B.C,A.aO(B.D(B.p),n)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){t=dartNativeDispatchHooksTransformer
if(typeof t=="function")t=[t]
if(Array.isArray(t))for(s=0;s<t.length;++s){r=t[s]
if(typeof r=="function")n=r(n)||n}}q=n.getTag
p=n.getUnknownTag
o=n.prototypeForTag
$.f6=new A.dk(q)
$.f2=new A.dl(p)
$.f9=new A.dm(o)},
aO(a,b){return a(b)||b},
iq(a,b){var t=b.length,s=v.rttc[""+t+";"+a]
if(s==null)return null
if(t===0)return s
if(t===s.length)return s.apply(null,b)
return s(b)},
es(a,b,c,d,e,f){var t=b?"m":"",s=c?"":"i",r=d?"u":"",q=e?"s":"",p=function(g,h){try{return new RegExp(g,h)}catch(o){return o}}(a,t+s+r+q+f)
if(p instanceof RegExp)return p
throw A.d(A.dO("Illegal RegExp pattern ("+String(p)+")",a))},
ea(a,b,c){var t
if(typeof b=="string")return a.indexOf(b,c)>=0
else if(b instanceof A.az){t=B.b.G(a,c)
return b.b.test(t)}else return!J.ef(b,B.b.G(a,c)).gP(0)},
iH(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
bs:function bs(a,b){this.a=a
this.b=b},
aT:function aT(){},
ac:function ac(a,b,c){this.a=a
this.b=b
this.$ti=c},
bo:function bo(a,b){this.a=a
this.$ti=b},
al:function al(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aU:function aU(){},
aV:function aV(a,b,c){this.a=a
this.b=b
this.$ti=c},
bf:function bf(){},
d_:function d_(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
bb:function bb(){},
bT:function bT(a,b,c){this.a=a
this.b=b
this.c=c},
c9:function c9(a){this.a=a},
cE:function cE(a){this.a=a},
a3:function a3(){},
bD:function bD(){},
bE:function bE(){},
c7:function c7(){},
c5:function c5(){},
ax:function ax(a,b){this.a=a
this.b=b},
c4:function c4(a){this.a=a},
ae:function ae(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
cA:function cA(a,b){this.a=a
this.b=b
this.c=null},
cB:function cB(a,b){this.a=a
this.$ti=b},
af:function af(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
F:function F(a,b){this.a=a
this.$ti=b},
b4:function b4(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b2:function b2(a,b){this.a=a
this.$ti=b},
b3:function b3(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
dk:function dk(a){this.a=a},
dl:function dl(a){this.a=a},
dm:function dm(a){this.a=a},
an:function an(){},
aL:function aL(){},
az:function az(a,b){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null},
bp:function bp(a){this.b=a},
cb:function cb(a,b,c){this.a=a
this.b=b
this.c=c},
cc:function cc(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
c6:function c6(a,b){this.a=a
this.c=b},
cg:function cg(a,b,c){this.a=a
this.b=b
this.c=c},
ch:function ch(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.d=null},
fZ(a,b,c){var t=new Uint8Array(a,b,c)
return t},
aj:function aj(){},
b9:function b9(){},
da:function da(a){this.a=a},
b7:function b7(){},
aD:function aD(){},
b8:function b8(){},
bX:function bX(){},
bq:function bq(){},
br:function br(){},
dV(a,b){var t=b.c
return t==null?b.c=A.bv(a,"ep",[b.x]):t},
ez(a){var t=a.w
if(t===6||t===7)return A.ez(a.x)
return t===11||t===12},
hb(a){return a.as},
a0(a){return A.d9(v.typeUniverse,a,!1)},
aq(a0,a1,a2,a3){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=a1.w
switch(a){case 5:case 1:case 2:case 3:case 4:return a1
case 6:t=a1.x
s=A.aq(a0,t,a2,a3)
if(s===t)return a1
return A.eL(a0,s,!0)
case 7:t=a1.x
s=A.aq(a0,t,a2,a3)
if(s===t)return a1
return A.eK(a0,s,!0)
case 8:r=a1.y
q=A.aN(a0,r,a2,a3)
if(q===r)return a1
return A.bv(a0,a1.x,q)
case 9:p=a1.x
o=A.aq(a0,p,a2,a3)
n=a1.y
m=A.aN(a0,n,a2,a3)
if(o===p&&m===n)return a1
return A.dY(a0,o,m)
case 10:l=a1.x
k=a1.y
j=A.aN(a0,k,a2,a3)
if(j===k)return a1
return A.eM(a0,l,j)
case 11:i=a1.x
h=A.aq(a0,i,a2,a3)
g=a1.y
f=A.ig(a0,g,a2,a3)
if(h===i&&f===g)return a1
return A.eJ(a0,h,f)
case 12:e=a1.y
a3+=e.length
d=A.aN(a0,e,a2,a3)
p=a1.x
o=A.aq(a0,p,a2,a3)
if(d===e&&o===p)return a1
return A.dZ(a0,o,d,!0)
case 13:c=a1.x
if(c<a3)return a1
b=a2[c-a3]
if(b==null)return a1
return b
default:throw A.d(A.bC("Attempted to substitute unexpected RTI kind "+a))}},
aN(a,b,c,d){var t,s,r,q,p=b.length,o=A.db(p)
for(t=!1,s=0;s<p;++s){r=b[s]
q=A.aq(a,r,c,d)
if(q!==r)t=!0
o[s]=q}return t?o:b},
ih(a,b,c,d){var t,s,r,q,p,o,n=b.length,m=A.db(n)
for(t=!1,s=0;s<n;s+=3){r=b[s]
q=b[s+1]
p=b[s+2]
o=A.aq(a,p,c,d)
if(o!==p)t=!0
m.splice(s,3,r,q,o)}return t?m:b},
ig(a,b,c,d){var t,s=b.a,r=A.aN(a,s,c,d),q=b.b,p=A.aN(a,q,c,d),o=b.c,n=A.ih(a,o,c,d)
if(r===s&&p===q&&n===o)return b
t=new A.ce()
t.a=r
t.b=p
t.c=n
return t},
f(a,b){a[v.arrayRti]=b
return a},
f3(a){var t=a.$S
if(t!=null){if(typeof t=="number")return A.iy(t)
return a.$S()}return null},
iC(a,b){var t
if(A.ez(b))if(a instanceof A.a3){t=A.f3(a)
if(t!=null)return t}return A.by(a)},
by(a){if(a instanceof A.j)return A.w(a)
if(Array.isArray(a))return A.M(a)
return A.e0(J.as(a))},
M(a){var t=a[v.arrayRti],s=u.x
if(t==null)return s
if(t.constructor!==s.constructor)return s
return t},
w(a){var t=a.$ti
return t!=null?t:A.e0(a)},
e0(a){var t=a.constructor,s=t.$ccache
if(s!=null)return s
return A.hV(a,t)},
hV(a,b){var t=a instanceof A.a3?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,s=A.hw(v.typeUniverse,t.name)
b.$ccache=s
return s},
iy(a){var t,s=v.types,r=s[a]
if(typeof r=="string"){t=A.d9(v.typeUniverse,r,!1)
s[a]=t
return t}return r},
ix(a){return A.ar(A.w(a))},
e2(a){var t
if(a instanceof A.an)return A.is(a.$r,a.ad())
t=a instanceof A.a3?A.f3(a):null
if(t!=null)return t
if(u.B.b(a))return J.fG(a).a
if(Array.isArray(a))return A.M(a)
return A.by(a)},
ar(a){var t=a.r
return t==null?a.r=new A.d8(a):t},
is(a,b){var t,s,r=b,q=r.length
if(q===0)return u.F
if(0>=q)return A.e(r,0)
t=A.bx(v.typeUniverse,A.e2(r[0]),"@<0>")
for(s=1;s<q;++s){if(!(s<r.length))return A.e(r,s)
t=A.eO(v.typeUniverse,t,A.e2(r[s]))}return A.bx(v.typeUniverse,t,a)},
dK(a){return A.ar(A.d9(v.typeUniverse,a,!1))},
hU(a){var t=this
t.b=A.id(t)
return t.b(a)},
id(a){var t,s,r,q,p
if(a===u.K)return A.i2
if(A.at(a))return A.i6
t=a.w
if(t===6)return A.hS
if(t===1)return A.f_
if(t===7)return A.hY
s=A.ic(a)
if(s!=null)return s
if(t===8){r=a.x
if(a.y.every(A.at)){a.f="$i"+r
if(r==="G")return A.i0
if(a===u.m)return A.i_
return A.i5}}else if(t===10){q=A.iq(a.x,a.y)
p=q==null?A.f_:q
return p==null?A.e_(p):p}return A.hQ},
ic(a){if(a.w===8){if(a===u.S)return A.eY
if(a===u.i||a===u.H)return A.i1
if(a===u.N)return A.i4
if(a===u.y)return A.e1}return null},
hT(a){var t=this,s=A.hP
if(A.at(t))s=A.hF
else if(t===u.K)s=A.e_
else if(A.aQ(t)){s=A.hR
if(t===u.a3)s=A.hC
else if(t===u.aD)s=A.eT
else if(t===u.cG)s=A.hA
else if(t===u.ae)s=A.eS
else if(t===u.I)s=A.hB
else if(t===u.aQ)s=A.hE}else if(t===u.S)s=A.t
else if(t===u.N)s=A.p
else if(t===u.y)s=A.eR
else if(t===u.H)s=A.dc
else if(t===u.i)s=A.N
else if(t===u.m)s=A.hD
t.a=s
return t.a(a)},
hQ(a){var t=this
if(a==null)return A.aQ(t)
return A.iD(v.typeUniverse,A.iC(a,t),t)},
hS(a){if(a==null)return!0
return this.x.b(a)},
i5(a){var t,s=this
if(a==null)return A.aQ(s)
t=s.f
if(a instanceof A.j)return!!a[t]
return!!J.as(a)[t]},
i0(a){var t,s=this
if(a==null)return A.aQ(s)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
t=s.f
if(a instanceof A.j)return!!a[t]
return!!J.as(a)[t]},
i_(a){var t=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.j)return!!a[t.f]
return!0}if(typeof a=="function")return!0
return!1},
eZ(a){if(typeof a=="object"){if(a instanceof A.j)return u.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
hP(a){var t=this
if(a==null){if(A.aQ(t))return a}else if(t.b(a))return a
throw A.z(A.eV(a,t),new Error())},
hR(a){var t=this
if(a==null||t.b(a))return a
throw A.z(A.eV(a,t),new Error())},
eV(a,b){return new A.bt("TypeError: "+A.eE(a,A.H(b,null)))},
eE(a,b){return A.bK(a)+": type '"+A.H(A.e2(a),null)+"' is not a subtype of type '"+b+"'"},
L(a,b){return new A.bt("TypeError: "+A.eE(a,b))},
hY(a){var t=this
return t.x.b(a)||A.dV(v.typeUniverse,t).b(a)},
i2(a){return a!=null},
e_(a){if(a!=null)return a
throw A.z(A.L(a,"Object"),new Error())},
i6(a){return!0},
hF(a){return a},
f_(a){return!1},
e1(a){return!0===a||!1===a},
eR(a){if(!0===a)return!0
if(!1===a)return!1
throw A.z(A.L(a,"bool"),new Error())},
hA(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.z(A.L(a,"bool?"),new Error())},
N(a){if(typeof a=="number")return a
throw A.z(A.L(a,"double"),new Error())},
hB(a){if(typeof a=="number")return a
if(a==null)return a
throw A.z(A.L(a,"double?"),new Error())},
eY(a){return typeof a=="number"&&Math.floor(a)===a},
t(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.z(A.L(a,"int"),new Error())},
hC(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.z(A.L(a,"int?"),new Error())},
i1(a){return typeof a=="number"},
dc(a){if(typeof a=="number")return a
throw A.z(A.L(a,"num"),new Error())},
eS(a){if(typeof a=="number")return a
if(a==null)return a
throw A.z(A.L(a,"num?"),new Error())},
i4(a){return typeof a=="string"},
p(a){if(typeof a=="string")return a
throw A.z(A.L(a,"String"),new Error())},
eT(a){if(typeof a=="string")return a
if(a==null)return a
throw A.z(A.L(a,"String?"),new Error())},
hD(a){if(A.eZ(a))return a
throw A.z(A.L(a,"JSObject"),new Error())},
hE(a){if(a==null)return a
if(A.eZ(a))return a
throw A.z(A.L(a,"JSObject?"),new Error())},
f0(a,b){var t,s,r
for(t="",s="",r=0;r<a.length;++r,s=", ")t+=s+A.H(a[r],b)
return t},
ib(a,b){var t,s,r,q,p,o,n=a.x,m=a.y
if(""===n)return"("+A.f0(m,b)+")"
t=m.length
s=n.split(",")
r=s.length-t
for(q="(",p="",o=0;o<t;++o,p=", "){q+=p
if(r===0)q+="{"
q+=A.H(m[o],b)
if(r>=0)q+=" "+s[r];++r}return q+"})"},
eW(a2,a3,a4){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=", ",a1=null
if(a4!=null){t=a4.length
if(a3==null)a3=A.f([],u.s)
else a1=a3.length
s=a3.length
for(r=t;r>0;--r)B.a.k(a3,"T"+(s+r))
for(q=u.X,p="<",o="",r=0;r<t;++r,o=a0){n=a3.length
m=n-1-r
if(!(m>=0))return A.e(a3,m)
p=p+o+a3[m]
l=a4[r]
k=l.w
if(!(k===2||k===3||k===4||k===5||l===q))p+=" extends "+A.H(l,a3)}p+=">"}else p=""
q=a2.x
j=a2.y
i=j.a
h=i.length
g=j.b
f=g.length
e=j.c
d=e.length
c=A.H(q,a3)
for(b="",a="",r=0;r<h;++r,a=a0)b+=a+A.H(i[r],a3)
if(f>0){b+=a+"["
for(a="",r=0;r<f;++r,a=a0)b+=a+A.H(g[r],a3)
b+="]"}if(d>0){b+=a+"{"
for(a="",r=0;r<d;r+=3,a=a0){b+=a
if(e[r+1])b+="required "
b+=A.H(e[r+2],a3)+" "+e[r]}b+="}"}if(a1!=null){a3.toString
a3.length=a1}return p+"("+b+") => "+c},
H(a,b){var t,s,r,q,p,o,n,m=a.w
if(m===5)return"erased"
if(m===2)return"dynamic"
if(m===3)return"void"
if(m===1)return"Never"
if(m===4)return"any"
if(m===6){t=a.x
s=A.H(t,b)
r=t.w
return(r===11||r===12?"("+s+")":s)+"?"}if(m===7)return"FutureOr<"+A.H(a.x,b)+">"
if(m===8){q=A.ik(a.x)
p=a.y
return p.length>0?q+("<"+A.f0(p,b)+">"):q}if(m===10)return A.ib(a,b)
if(m===11)return A.eW(a,b,null)
if(m===12)return A.eW(a.x,b,a.y)
if(m===13){o=a.x
n=b.length
o=n-1-o
if(!(o>=0&&o<n))return A.e(b,o)
return b[o]}return"?"},
ik(a){var t=A.fa(a)
if(t!=null)return t
return"minified:"+a},
hx(a,b){var t=a.tR[b]
while(typeof t=="string")t=a.tR[t]
return t},
hw(a,b){var t,s,r,q,p,o=a.eT,n=o[b]
if(n==null)return A.d9(a,b,!1)
else if(typeof n=="number"){t=n
s=A.bw(a,5,"#")
r=A.db(t)
for(q=0;q<t;++q)r[q]=s
p=A.bv(a,b,r)
o[b]=p
return p}else return n},
hv(a,b){return A.eP(a.tR,b)},
hu(a,b){return A.eP(a.eT,b)},
d9(a,b,c){var t,s=a.eC,r=s.get(b)
if(r!=null)return r
t=A.eN(a,null,b,!1)
s.set(b,t)
return t},
bx(a,b,c){var t,s,r=b.z
if(r==null)r=b.z=new Map()
t=r.get(c)
if(t!=null)return t
s=A.eN(a,b,c,!0)
r.set(c,s)
return s},
eO(a,b,c){var t,s,r,q=b.Q
if(q==null)q=b.Q=new Map()
t=c.as
s=q.get(t)
if(s!=null)return s
r=A.dY(a,b,c.w===9?c.y:[c])
q.set(t,r)
return r},
eN(a,b,c,d){return A.hn(A.hh(a,b,c,d))},
a9(a,b){b.a=A.hT
b.b=A.hU
return b},
bw(a,b,c){var t,s,r=a.eC.get(c)
if(r!=null)return r
t=new A.P(null,null)
t.w=b
t.as=c
s=A.a9(a,t)
a.eC.set(c,s)
return s},
eL(a,b,c){var t,s=b.as+"?",r=a.eC.get(s)
if(r!=null)return r
t=A.hs(a,b,s,c)
a.eC.set(s,t)
return t},
hs(a,b,c,d){var t,s,r
if(d){t=b.w
s=!0
if(!A.at(b))if(!(b===u.P||b===u.T))if(t!==6)s=t===7&&A.aQ(b.x)
if(s)return b
else if(t===1)return u.P}r=new A.P(null,null)
r.w=6
r.x=b
r.as=c
return A.a9(a,r)},
eK(a,b,c){var t,s=b.as+"/",r=a.eC.get(s)
if(r!=null)return r
t=A.hq(a,b,s,c)
a.eC.set(s,t)
return t},
hq(a,b,c,d){var t,s
if(d){t=b.w
if(A.at(b)||b===u.K)return b
else if(t===1)return A.bv(a,"ep",[b])
else if(b===u.P||b===u.T)return u.bc}s=new A.P(null,null)
s.w=7
s.x=b
s.as=c
return A.a9(a,s)},
ht(a,b){var t,s,r=""+b+"^",q=a.eC.get(r)
if(q!=null)return q
t=new A.P(null,null)
t.w=13
t.x=b
t.as=r
s=A.a9(a,t)
a.eC.set(r,s)
return s},
bu(a){var t,s,r,q=a.length
for(t="",s="",r=0;r<q;++r,s=",")t+=s+a[r].as
return t},
hp(a){var t,s,r,q,p,o=a.length
for(t="",s="",r=0;r<o;r+=3,s=","){q=a[r]
p=a[r+1]?"!":":"
t+=s+q+p+a[r+2].as}return t},
bv(a,b,c){var t,s,r,q=b
if(c.length>0)q+="<"+A.bu(c)+">"
t=a.eC.get(q)
if(t!=null)return t
s=new A.P(null,null)
s.w=8
s.x=b
s.y=c
if(c.length>0)s.c=c[0]
s.as=q
r=A.a9(a,s)
a.eC.set(q,r)
return r},
dY(a,b,c){var t,s,r,q,p,o
if(b.w===9){t=b.x
s=b.y.concat(c)}else{s=c
t=b}r=t.as+(";<"+A.bu(s)+">")
q=a.eC.get(r)
if(q!=null)return q
p=new A.P(null,null)
p.w=9
p.x=t
p.y=s
p.as=r
o=A.a9(a,p)
a.eC.set(r,o)
return o},
eM(a,b,c){var t,s,r="+"+(b+"("+A.bu(c)+")"),q=a.eC.get(r)
if(q!=null)return q
t=new A.P(null,null)
t.w=10
t.x=b
t.y=c
t.as=r
s=A.a9(a,t)
a.eC.set(r,s)
return s},
eJ(a,b,c){var t,s,r,q,p,o=b.as,n=c.a,m=n.length,l=c.b,k=l.length,j=c.c,i=j.length,h="("+A.bu(n)
if(k>0){t=m>0?",":""
h+=t+"["+A.bu(l)+"]"}if(i>0){t=m>0?",":""
h+=t+"{"+A.hp(j)+"}"}s=o+(h+")")
r=a.eC.get(s)
if(r!=null)return r
q=new A.P(null,null)
q.w=11
q.x=b
q.y=c
q.as=s
p=A.a9(a,q)
a.eC.set(s,p)
return p},
dZ(a,b,c,d){var t,s=b.as+("<"+A.bu(c)+">"),r=a.eC.get(s)
if(r!=null)return r
t=A.hr(a,b,c,s,d)
a.eC.set(s,t)
return t},
hr(a,b,c,d,e){var t,s,r,q,p,o,n,m
if(e){t=c.length
s=A.db(t)
for(r=0,q=0;q<t;++q){p=c[q]
if(p.w===1){s[q]=p;++r}}if(r>0){o=A.aq(a,b,s,0)
n=A.aN(a,c,s,0)
return A.dZ(a,o,n,c!==n)}}m=new A.P(null,null)
m.w=12
m.x=b
m.y=c
m.as=d
return A.a9(a,m)},
hh(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
hn(a){var t,s,r,q,p,o,n,m=a.r,l=a.s
for(t=m.length,s=0;s<t;){r=m.charCodeAt(s)
if(r>=48&&r<=57)s=A.hj(s+1,r,m,l)
else if((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124)s=A.eG(a,s,m,l,!1)
else if(r===46)s=A.eG(a,s,m,l,!0)
else{++s
switch(r){case 44:break
case 58:l.push(!1)
break
case 33:l.push(!0)
break
case 59:l.push(A.am(a.u,a.e,l.pop()))
break
case 94:l.push(A.ht(a.u,l.pop()))
break
case 35:l.push(A.bw(a.u,5,"#"))
break
case 64:l.push(A.bw(a.u,2,"@"))
break
case 126:l.push(A.bw(a.u,3,"~"))
break
case 60:l.push(a.p)
a.p=l.length
break
case 62:A.hl(a,l)
break
case 38:A.hk(a,l)
break
case 63:q=a.u
l.push(A.eL(q,A.am(q,a.e,l.pop()),a.n))
break
case 47:q=a.u
l.push(A.eK(q,A.am(q,a.e,l.pop()),a.n))
break
case 40:l.push(-3)
l.push(a.p)
a.p=l.length
break
case 41:A.hi(a,l)
break
case 91:l.push(a.p)
a.p=l.length
break
case 93:p=l.splice(a.p)
A.eH(a.u,a.e,p)
a.p=l.pop()
l.push(p)
l.push(-1)
break
case 123:l.push(a.p)
a.p=l.length
break
case 125:p=l.splice(a.p)
A.ho(a.u,a.e,p)
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
return A.am(a.u,a.e,n)},
hj(a,b,c,d){var t,s,r=b-48
for(t=c.length;a<t;++a){s=c.charCodeAt(a)
if(!(s>=48&&s<=57))break
r=r*10+(s-48)}d.push(r)
return a},
eG(a,b,c,d,e){var t,s,r,q,p,o,n=b+1
for(t=c.length;n<t;++n){s=c.charCodeAt(n)
if(s===46){if(e)break
e=!0}else{if(!((((s|32)>>>0)-97&65535)<26||s===95||s===36||s===124))r=s>=48&&s<=57
else r=!0
if(!r)break}}q=c.substring(b,n)
if(e){t=a.u
p=a.e
if(p.w===9)p=p.x
o=A.hx(t,p.x)[q]
if(o==null)A.av('No "'+q+'" in "'+A.hb(p)+'"')
d.push(A.bx(t,p,o))}else d.push(q)
return n},
hl(a,b){var t,s=a.u,r=A.eF(a,b),q=b.pop()
if(typeof q=="string")b.push(A.bv(s,q,r))
else{t=A.am(s,a.e,q)
switch(t.w){case 11:b.push(A.dZ(s,t,r,a.n))
break
default:b.push(A.dY(s,t,r))
break}}},
hi(a,b){var t,s,r,q=a.u,p=b.pop(),o=null,n=null
if(typeof p=="number")switch(p){case-1:o=b.pop()
break
case-2:n=b.pop()
break
default:b.push(p)
break}else b.push(p)
t=A.eF(a,b)
p=b.pop()
switch(p){case-3:p=b.pop()
if(o==null)o=q.sEA
if(n==null)n=q.sEA
s=A.am(q,a.e,p)
r=new A.ce()
r.a=t
r.b=o
r.c=n
b.push(A.eJ(q,s,r))
return
case-4:b.push(A.eM(q,b.pop(),t))
return
default:throw A.d(A.bC("Unexpected state under `()`: "+A.k(p)))}},
hk(a,b){var t=b.pop()
if(0===t){b.push(A.bw(a.u,1,"0&"))
return}if(1===t){b.push(A.bw(a.u,4,"1&"))
return}throw A.d(A.bC("Unexpected extended operation "+A.k(t)))},
eF(a,b){var t=b.splice(a.p)
A.eH(a.u,a.e,t)
a.p=b.pop()
return t},
am(a,b,c){if(typeof c=="string")return A.bv(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.hm(a,b,c)}else return c},
eH(a,b,c){var t,s=c.length
for(t=0;t<s;++t)c[t]=A.am(a,b,c[t])},
ho(a,b,c){var t,s=c.length
for(t=2;t<s;t+=3)c[t]=A.am(a,b,c[t])},
hm(a,b,c){var t,s,r=b.w
if(r===9){if(c===0)return b.x
t=b.y
s=t.length
if(c<=s)return t[c-1]
c-=s
b=b.x
r=b.w}else if(c===0)return b
if(r!==8)throw A.d(A.bC("Indexed base must be an interface type"))
t=b.y
if(c<=t.length)return t[c-1]
throw A.d(A.bC("Bad index "+c+" for "+b.i(0)))},
iD(a,b,c){var t,s=b.d
if(s==null)s=b.d=new Map()
t=s.get(c)
if(t==null){t=A.u(a,b,null,c,null)
s.set(c,t)}return t},
u(a,b,c,d,e){var t,s,r,q,p,o,n,m,l,k,j
if(b===d)return!0
if(A.at(d))return!0
t=b.w
if(t===4)return!0
if(A.at(b))return!1
if(b.w===1)return!0
s=t===13
if(s)if(A.u(a,c[b.x],c,d,e))return!0
r=d.w
q=u.P
if(b===q||b===u.T){if(r===7)return A.u(a,b,c,d.x,e)
return d===q||d===u.T||r===6}if(d===u.K){if(t===7)return A.u(a,b.x,c,d,e)
return t!==6}if(t===7){if(!A.u(a,b.x,c,d,e))return!1
return A.u(a,A.dV(a,b),c,d,e)}if(t===6)return A.u(a,q,c,d,e)&&A.u(a,b.x,c,d,e)
if(r===7){if(A.u(a,b,c,d.x,e))return!0
return A.u(a,b,c,A.dV(a,d),e)}if(r===6)return A.u(a,b,c,q,e)||A.u(a,b,c,d.x,e)
if(s)return!1
q=t!==11
if((!q||t===12)&&d===u.Z)return!0
p=t===10
if(p&&d===u.l)return!0
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
if(!A.u(a,k,c,j,e)||!A.u(a,j,e,k,c))return!1}return A.eX(a,b.x,c,d.x,e)}if(r===11){if(b===u.L)return!0
if(q)return!1
return A.eX(a,b,c,d,e)}if(t===8){if(r!==8)return!1
return A.hZ(a,b,c,d,e)}if(p&&r===10)return A.i3(a,b,c,d,e)
return!1},
eX(a2,a3,a4,a5,a6){var t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
if(!A.u(a2,a3.x,a4,a5.x,a6))return!1
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
if(!A.u(a2,q[i],a6,h,a4))return!1}for(i=0;i<n;++i){h=m[i]
if(!A.u(a2,q[p+i],a6,h,a4))return!1}for(i=0;i<j;++i){h=m[n+i]
if(!A.u(a2,l[i],a6,h,a4))return!1}g=t.c
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
if(!A.u(a2,f[b+2],a6,h,a4))return!1
break}}while(c<e){if(g[c+1])return!1
c+=3}return!0},
hZ(a,b,c,d,e){var t,s,r,q,p,o=b.x,n=d.x
while(o!==n){t=a.tR[o]
if(t==null)return!1
if(typeof t=="string"){o=t
continue}s=t[n]
if(s==null)return!1
r=s.length
q=r>0?new Array(r):v.typeUniverse.sEA
for(p=0;p<r;++p)q[p]=A.bx(a,b,s[p])
return A.eQ(a,q,null,c,d.y,e)}return A.eQ(a,b.y,null,c,d.y,e)},
eQ(a,b,c,d,e,f){var t,s=b.length
for(t=0;t<s;++t)if(!A.u(a,b[t],d,e[t],f))return!1
return!0},
i3(a,b,c,d,e){var t,s=b.y,r=d.y,q=s.length
if(q!==r.length)return!1
if(b.x!==d.x)return!1
for(t=0;t<q;++t)if(!A.u(a,s[t],c,r[t],e))return!1
return!0},
aQ(a){var t=a.w,s=!0
if(!(a===u.P||a===u.T))if(!A.at(a))if(t!==6)s=t===7&&A.aQ(a.x)
return s},
at(a){var t=a.w
return t===2||t===3||t===4||t===5||a===u.X},
eP(a,b){var t,s,r=Object.keys(b),q=r.length
for(t=0;t<q;++t){s=r[t]
a[s]=b[s]}},
db(a){return a>0?new Array(a):v.typeUniverse.sEA},
P:function P(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
ce:function ce(){this.c=this.b=this.a=null},
d8:function d8(a){this.a=a},
cd:function cd(){},
bt:function bt(a){this.a=a},
eI(a,b,c){return 0},
ao:function ao(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
aM:function aM(a,b){this.a=a
this.$ti=b},
cC(a,b,c){return b.h("@<0>").O(c).h("eu<1,2>").a(A.it(a,new A.ae(b.h("@<0>").O(c).h("ae<1,2>"))))},
bW(a,b){return new A.ae(a.h("@<0>").O(b).h("ae<1,2>"))},
dT(a){var t,s
if(A.e8(a))return"{...}"
t=new A.aK("")
try{s={}
B.a.k($.I,a)
t.a+="{"
s.a=!0
a.U(0,new A.cD(s,t))
t.a+="}"}finally{if(0>=$.I.length)return A.e($.I,-1)
$.I.pop()}s=t.a
return s.charCodeAt(0)==0?s:s},
ag:function ag(){},
b5:function b5(){},
cD:function cD(a,b){this.a=a
this.b=b},
aJ:function aJ(){},
et(a,b,c){return new A.b1(a,b)},
hM(a){return a.bq()},
hf(a,b){return new A.d4(a,[],A.ip())},
hg(a,b,c){var t,s=new A.aK(""),r=A.hf(s,b)
r.Y(a)
t=s.a
return t.charCodeAt(0)==0?t:t},
bF:function bF(){},
bH:function bH(){},
b1:function b1(a,b){this.a=a
this.b=b},
bU:function bU(a,b){this.a=a
this.b=b},
cy:function cy(){},
cz:function cz(a){this.b=a},
d5:function d5(){},
d6:function d6(a,b){this.a=a
this.b=b},
d4:function d4(a,b,c){this.c=a
this.a=b
this.b=c},
aP(a){var t=A.h6(a,null)
if(t!=null)return t
throw A.d(A.dO(a,null))},
ir(a){var t=A.h5(a)
if(t!=null)return t
throw A.d(A.dO("Invalid double",a))},
ev(a,b,c,d){var t,s=J.fS(a,d)
if(a!==0&&b!=null)for(t=0;t<a;++t)s[t]=b
return s},
fX(a,b,c){var t,s,r=A.f([],c.h("l<0>"))
for(t=a.length,s=0;s<a.length;a.length===t||(0,A.R)(a),++s)B.a.k(r,c.a(a[s]))
r.$flags=1
return r},
W(a,b){var t,s=A.f([],b.h("l<0>"))
for(t=a.gn(a);t.j();)B.a.k(s,t.gl())
return s},
Y(a,b,c){return new A.az(a,A.es(a,!1,b,c,!1,""))},
eA(a,b,c){var t=J.aR(b)
if(!t.j())return a
if(c.length===0){do a+=A.k(t.gl())
while(t.j())}else{a+=A.k(t.gl())
while(t.j())a=a+c+A.k(t.gl())}return a},
bI(a,b,c,d){var t=A.h7(a,b,c,d,0,0,0,0,!1)
return new A.B(t==null?new A.cp(a,b,c,d,0,0,0,0).$0():t,0,!1)},
fP(){return new A.B(Date.now(),0,!1)},
fQ(a){var t=Math.abs(a),s=a<0?"-":""
if(t>=1000)return""+a
if(t>=100)return s+"0"+t
if(t>=10)return s+"00"+t
return s+"000"+t},
en(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bJ(a){if(a>=10)return""+a
return"0"+a},
eo(a,b,c){return new A.S(a+1000*b+6e7*c)},
bK(a){if(typeof a=="number"||A.e1(a)||a==null)return J.bA(a)
if(typeof a=="string")return JSON.stringify(a)
return A.ey(a)},
bC(a){return new A.bB(a)},
aw(a){return new A.a2(!1,null,null,a)},
fH(a,b,c){return new A.a2(!0,a,b,c)},
a6(a,b,c,d,e){return new A.aH(b,c,!0,a,d,"Invalid value")},
h9(a,b,c){if(0>a||a>c)throw A.d(A.a6(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.d(A.a6(b,a,c,"end",null))
return b}return c},
dU(a,b){if(a<0)throw A.d(A.a6(a,0,null,b,null))
return a},
dP(a,b,c,d){return new A.bM(b,!0,a,d,"Index out of range")},
dX(a){return new A.bl(a)},
eD(a){return new A.c8(a)},
hc(a){return new A.bi(a)},
O(a){return new A.bG(a)},
dO(a,b){return new A.cr(a,b)},
fR(a,b,c){var t,s
if(A.e8(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}t=A.f([],u.s)
B.a.k($.I,a)
try{A.i7(a,t)}finally{if(0>=$.I.length)return A.e($.I,-1)
$.I.pop()}s=A.eA(b,u.Y.a(t),", ")+c
return s.charCodeAt(0)==0?s:s},
dQ(a,b,c){var t,s
if(A.e8(a))return b+"..."+c
t=new A.aK(b)
B.a.k($.I,a)
try{s=t
s.a=A.eA(s.a,a,", ")}finally{if(0>=$.I.length)return A.e($.I,-1)
$.I.pop()}t.a+=c
s=t.a
return s.charCodeAt(0)==0?s:s},
i7(a,b){var t,s,r,q,p,o,n,m=a.gn(a),l=0,k=0
for(;;){if(!(l<80||k<3))break
if(!m.j())return
t=A.k(m.gl())
B.a.k(b,t)
l+=t.length+2;++k}if(!m.j()){if(k<=5)return
if(0>=b.length)return A.e(b,-1)
s=b.pop()
if(0>=b.length)return A.e(b,-1)
r=b.pop()}else{q=m.gl();++k
if(!m.j()){if(k<=4){B.a.k(b,A.k(q))
return}s=A.k(q)
if(0>=b.length)return A.e(b,-1)
r=b.pop()
l+=s.length+2}else{p=m.gl();++k
for(;m.j();q=p,p=o){o=m.gl();++k
if(k>100){for(;;){if(!(l>75&&k>3))break
if(0>=b.length)return A.e(b,-1)
l-=b.pop().length+2;--k}B.a.k(b,"...")
return}}r=A.k(q)
s=A.k(p)
l+=s.length+r.length+4}}if(k>b.length+2){l+=5
n="..."}else n=null
for(;;){if(!(l>80&&b.length>3))break
if(0>=b.length)return A.e(b,-1)
l-=b.pop().length+2
if(n==null){l+=5
n="..."}}if(n!=null)B.a.k(b,n)
B.a.k(b,r)
B.a.k(b,s)},
ew(a,b,c,d){var t
if(B.h===c){t=B.c.gp(a)
b=J.a1(b)
return A.dW(A.a8(A.a8($.dL(),t),b))}if(B.h===d){t=B.c.gp(a)
b=J.a1(b)
c=J.a1(c)
return A.dW(A.a8(A.a8(A.a8($.dL(),t),b),c))}t=B.c.gp(a)
b=J.a1(b)
c=J.a1(c)
d=J.a1(d)
d=A.dW(A.a8(A.a8(A.a8(A.a8($.dL(),t),b),c),d))
return d},
cp:function cp(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
B:function B(a,b,c){this.a=a
this.b=b
this.c=c},
S:function S(a){this.a=a},
d1:function d1(){},
n:function n(){},
bB:function bB(a){this.a=a},
bk:function bk(){},
a2:function a2(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
aH:function aH(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
bM:function bM(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
bl:function bl(a){this.a=a},
c8:function c8(a){this.a=a},
bi:function bi(a){this.a=a},
bG:function bG(a){this.a=a},
bY:function bY(){},
bh:function bh(){},
d2:function d2(a){this.a=a},
cr:function cr(a,b){this.a=a
this.b=b},
c:function c(){},
o:function o(a,b,c){this.a=a
this.b=b
this.$ti=c},
ba:function ba(){},
j:function j(){},
aK:function aK(a){this.a=a},
cf:function cf(a){this.a=a},
aW:function aW(a,b){this.a=a
this.b=b},
cn:function cn(a,b){this.a=a
this.b=b},
co:function co(a){this.a=a
this.b=null},
cF:function cF(a){this.a=a},
cU:function cU(){},
cY:function cY(){},
cZ:function cZ(){},
cV:function cV(){},
cW:function cW(){},
cX:function cX(){},
cG:function cG(a){this.a=a},
bZ:function bZ(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.e=d
_.f=e},
iK(a){var t=a.e
if(t&&a.f==null)return B.a6
if(!t&&a.f!=null)return B.a7
return null},
bc:function bc(a){this.a=a},
aI:function aI(a,b,c){this.a=a
this.b=b
this.c=c},
cM:function cM(a,b){this.a=a
this.b=b},
cN:function cN(a){this.a=a},
ab:function ab(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bL:function bL(a,b,c){this.a=a
this.b=b
this.c=c},
cs:function cs(){},
ct:function ct(){},
cu:function cu(a){this.a=a},
cv:function cv(){},
cw:function cw(){},
a7:function a7(a,b){this.a=a
this.b=b},
K:function K(a){this.c=a},
cO:function cO(a,b){this.a=a
this.b=b},
cP:function cP(){},
cQ:function cQ(){},
bg:function bg(a,b){this.a=a
this.b=b},
aF:function aF(a,b){this.a=a
this.b=b},
i:function i(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
h_(){var t,s=A.bW(u.N,u.h),r=0
for(;r<19;++r){t=$.h0[r]
s.q(0,t.a,t)}return new A.cH(s)},
cH:function cH(a){this.a=a},
ap:function ap(a,b){this.a=a
this.b=b},
cI:function cI(a,b){this.a=a
this.b=b},
cJ:function cJ(a,b){this.a=a
this.b=b},
cK:function cK(){},
cL:function cL(){},
cR:function cR(){},
cS:function cS(a,b){this.a=a
this.b=b},
A:function A(a,b,c){this.a=a
this.b=b
this.c=c},
ck:function ck(){},
ca:function ca(a,b){this.a=a
this.b=b},
cm:function cm(a,b){this.a=a
this.b=b},
cl:function cl(){},
a4:function a4(a,b){this.a=a
this.b=b},
T:function T(a,b){this.a=a
this.b=b},
cq:function cq(){},
i9(a){var t=$.fx().bf(a),s=t.a
if(s==null)return"No expiry date recognized in this text."
return"Expiry date found: "+(B.b.R(B.c.i(A.c1(s)),4,"0")+"-"+B.b.R(B.c.i(A.c0(s)),2,"0")+"-"+B.b.R(B.c.i(A.bd(s)),2,"0"))+" (pattern matched: "+t.b.b+")"},
hG(a){var t,s=B.F.b1(a)
switch(s.a.a){case 0:t="No risk detected"
break
case 1:t="Low risk"
break
case 2:t="High risk"
break
default:t=null}return t+". "+s.gbg()},
ii(a){var t=$.fB().aF(a,3)
if(t.length===0)return"No sentences recognized in this text."
return B.a.L(t," ")},
eU(a){var t
switch(a.a){case 0:t="Today's status: all ok"
break
case 1:t="Today's status: needs attention"
break
case 2:t="No status set for today yet"
break
default:t=null}return t},
ia(){var t,s,r,q,p=$.dM().a,o=A.w(p).h("F<2>")
p=A.W(new A.F(p,o),o.h("c.E"))
p.$flags=1
t=p
B.a.S(t,new A.df())
p=A.f([],u.w)
for(o=t.length,s=u.N,r=0;r<t.length;t.length===o||(0,A.R)(t),++r){q=t[r]
p.push(A.cC(["id",q.a,"textEn",q.c,"category",q.d.b],s,s))}return B.e.J(p,null)},
ij(a){var t,s,r,q,p=$.ed().bi(a),o=A.f([],u.s)
for(t=p.length,s=0;s<p.length;p.length===t||(0,A.R)(p),++s){r=p[s]
q=$.dM().a.B(0,r)
q=q==null?null:q.c
o.push(q==null?r:q)}return B.e.J(o,null)},
hH(a){var t,s,r=A.f(a.split(","),u.s),q=u.Q.a(new A.dd()),p=A.f([],u.z)
for(r=B.a.gn(r),q=new A.Q(r,q,u.D);q.j();){t=r.gl()
p.push($.dM().a.B(0,t))}r=u.G
s=A.W(new A.bm(p,r),r.h("c.E"))
r=u.N
return B.e.J(A.cC(["sentence",B.G.b3(s)],r,r),null)},
ie(a){var t,s,r=B.b.X(a)
if(r.length===0)return""
t=B.b.M(r,A.Y("\\s+",!0,!1))
s=A.M(t)
return new A.C(t,s.h("a(1)").a(new A.dg()),s.h("C<1,a>")).L(0," ")},
hy(a,b,c){var t,s,r,q,p,o=$.ec().a,n=A.w(o).h("F<2>")
n=A.W(new A.F(o,n),n.h("c.E"))
n.$flags=1
t="person-"+(n.length+1)+"-"+B.b.gp(a.toLowerCase())
try{n=t
r=new A.bZ(n,a,b,c,c?new A.B(Date.now(),0,!1):null)
q=A.iK(r)
if(q!=null)A.av(q)
o.q(0,n,r)
o=c?"given":"not given"
return"Added "+a+" ("+b+"), consent "+o+"."}catch(p){o=A.fc(p)
if(o instanceof A.bc){s=o
return"Rejected: "+s.a}else throw p}},
i8(){var t,s,r,q,p=A.f([],u.J),o=$.ec().a,n=A.w(o).h("F<2>")
o=A.W(new A.F(o,n),n.h("c.E"))
o.$flags=1
o=o
n=o.length
t=u.N
s=u.K
r=0
for(;r<o.length;o.length===n||(0,A.R)(o),++r){q=o[r]
p.push(A.cC(["name",q.b,"relationship",q.c,"consentGiven",q.e],t,s))}return B.e.J(p,null)},
hz(a,b,c){var t,s=$.ee().b,r=A.w(s).h("F<2>")
r=A.W(new A.F(s,r),r.h("c.E"))
r.$flags=1
t="reminder-"+(r.length+1)
A:{break A}s.q(0,t,new A.aI(t,a,new A.B(Date.now(),0,!1).N(A.eo(0,0,b).a)))
return'Added reminder "'+a+'", due in '+b+" minute(s)."},
hO(){var t,s,r,q=A.f([],u.s)
for(t=$.ee().b6(),s=t.length,r=0;r<t.length;t.length===s||(0,A.R)(t),++r)q.push(t[r].b)
return B.e.J(q,null)},
f1(a){var t,s,r=A.bI(2026,1,1,8),q=A.f([new A.ab(0,0,9,r.N(-15e4))],u.u)
for(t=0;t<8;++t){s=r.N(1000*a[t])
B.a.k(q,new A.ab(0,0,9,s.N(-12e4)))
B.a.k(q,new A.ab(0,0,13,s))}return q},
iF(){var t,s,r=v.G
r.lumenParseExpiry=A.aa(new A.dp())
r.lumenNameColor=A.de(new A.dq())
r.lumenCheckContrast=A.de(new A.dr())
r.lumenAssessMessage=A.aa(new A.dA())
r.lumenSummarize=A.aa(new A.dB())
r.lumenGeneratePairingCode=A.ci(new A.dC())
r.lumenSetDailyStatus=A.aa(new A.dD())
r.lumenGetDailyStatus=A.ci(new A.dE())
r.lumenPhraseBoardJson=A.ci(new A.dF())
r.lumenRecordPhraseUse=A.aa(new A.dG())
r.lumenTopPhraseSuggestionsJson=A.aa(new A.dH())
r.lumenBuildSentenceJson=A.aa(new A.ds())
r.lumenSplitSyllables=A.aa(new A.dt())
t=new A.du()
if(typeof t=="function")A.av(A.aw("Attempting to rewrap a JS function."))
s=function(a,b){return function(c,d,e,f){return a(b,c,d,e,f,arguments.length)}}(A.hL,t)
s[$.bz()]=t
r.lumenReviewFlashcard=s
r.lumenAddPerson=A.de(new A.dv())
r.lumenListPeopleJson=A.ci(new A.dw())
r.lumenAddReminder=A.de(new A.dx())
r.lumenDueRemindersJson=A.ci(new A.dy())
r.lumenAnalyzeGait=A.aa(new A.dz())},
df:function df(){},
dd:function dd(){},
dg:function dg(){},
dp:function dp(){},
dq:function dq(){},
dr:function dr(){},
dA:function dA(){},
dB:function dB(){},
dC:function dC(){},
dD:function dD(){},
dE:function dE(){},
dF:function dF(){},
dG:function dG(){},
dH:function dH(){},
ds:function ds(){},
dt:function dt(){},
du:function du(){},
dv:function dv(){},
dw:function dw(){},
dx:function dx(){},
dy:function dy(){},
dz:function dz(){},
fa(a){return v.mangledGlobalNames[a]},
iI(a){throw A.z(new A.bV("Field '"+a+"' has been assigned during initialization."),new Error())},
ci(a){var t
if(typeof a=="function")throw A.d(A.aw("Attempting to rewrap a JS function."))
t=function(b,c){return function(){return b(c)}}(A.hI,a)
t[$.bz()]=a
return t},
aa(a){var t
if(typeof a=="function")throw A.d(A.aw("Attempting to rewrap a JS function."))
t=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.hJ,a)
t[$.bz()]=a
return t},
de(a){var t
if(typeof a=="function")throw A.d(A.aw("Attempting to rewrap a JS function."))
t=function(b,c){return function(d,e,f){return b(c,d,e,f,arguments.length)}}(A.hK,a)
t[$.bz()]=a
return t},
hI(a){return u.Z.a(a).$0()},
hJ(a,b,c){u.Z.a(a)
if(A.t(c)>=1)return a.$1(b)
return a.$0()},
hK(a,b,c,d,e){u.Z.a(a)
A.t(e)
if(e>=3)return a.$3(b,c,d)
if(e===2)return a.$2(b,c)
if(e===1)return a.$1(b)
return a.$0()},
hL(a,b,c,d,e,f){u.Z.a(a)
A.t(f)
if(f>=4)return a.$4(b,c,d,e)
if(f===3)return a.$3(b,c,d)
if(f===2)return a.$2(b,c)
if(f===1)return a.$1(b)
return a.$0()}},B={}
var w=[A,J,B]
var $={}
A.dR.prototype={}
J.bN.prototype={
F(a,b){return a===b},
gp(a){return A.c2(a)},
i(a){return"Instance of '"+A.c3(a)+"'"},
gA(a){return A.ar(A.e0(this))}}
J.bQ.prototype={
i(a){return String(a)},
gp(a){return a?519018:218159},
gA(a){return A.ar(u.y)},
$iD:1,
$iy:1}
J.b_.prototype={
F(a,b){return null==b},
i(a){return"null"},
gp(a){return 0},
$iD:1}
J.b0.prototype={$iJ:1}
J.a5.prototype={
gp(a){return 0},
i(a){return String(a)}}
J.c_.prototype={}
J.ak.prototype={}
J.V.prototype={
i(a){var t=a[$.fd()]
if(t==null)t=a[$.bz()]
if(t==null)return this.aH(a)
return"JavaScript function for "+J.bA(t)},
$iad:1}
J.aA.prototype={
gp(a){return 0},
i(a){return String(a)}}
J.aB.prototype={
gp(a){return 0},
i(a){return String(a)}}
J.l.prototype={
k(a,b){A.M(a).c.a(b)
a.$flags&1&&A.dJ(a,29)
a.push(b)},
L(a,b){var t,s=A.ev(a.length,"",!1,u.N)
for(t=0;t<a.length;++t)this.q(s,t,A.k(a[t]))
return s.join(b)},
a9(a,b){var t,s,r
A.M(a).h("1(1,1)").a(b)
t=a.length
if(t===0)throw A.d(A.bO())
if(0>=t)return A.e(a,0)
s=a[0]
for(r=1;r<t;++r){s=b.$2(s,a[r])
if(t!==a.length)throw A.d(A.O(a))}return s},
t(a,b){if(!(b<a.length))return A.e(a,b)
return a[b]},
ga7(a){if(a.length>0)return a[0]
throw A.d(A.bO())},
gbc(a){var t=a.length
if(t>0)return a[t-1]
throw A.d(A.bO())},
I(a,b){var t,s
A.M(a).h("y(1)").a(b)
t=a.length
for(s=0;s<t;++s){if(b.$1(a[s]))return!0
if(a.length!==t)throw A.d(A.O(a))}return!1},
S(a,b){var t,s,r,q,p,o=A.M(a)
o.h("b(1,1)?").a(b)
a.$flags&2&&A.dJ(a,"sort")
t=a.length
if(t<2)return
if(b==null)b=J.hW()
if(t===2){s=a[0]
r=a[1]
o=b.$2(s,r)
if(typeof o!=="number")return o.bo()
if(o>0){a[0]=r
a[1]=s}return}q=0
if(o.c.b(null))for(p=0;p<a.length;++p)if(a[p]===void 0){a[p]=null;++q}a.sort(A.im(b,2))
if(q>0)this.aT(a,q)},
aD(a){return this.S(a,null)},
aT(a,b){var t,s=a.length
for(;t=s-1,s>0;s=t)if(a[t]===null){a[t]=void 0;--b
if(b===0)break}},
E(a,b){var t
for(t=0;t<a.length;++t)if(J.cj(a[t],b))return!0
return!1},
gav(a){return a.length!==0},
i(a){return A.dQ(a,"[","]")},
gn(a){return new J.aS(a,a.length,A.M(a).h("aS<1>"))},
gp(a){return A.c2(a)},
gm(a){return a.length},
q(a,b,c){A.M(a).c.a(c)
a.$flags&2&&A.dJ(a)
if(!(b>=0&&b<a.length))throw A.d(A.f4(a,b))
a[b]=c},
$im:1,
$ic:1,
$iG:1}
J.bP.prototype={
bj(a){var t,s,r
if(!Array.isArray(a))return null
t=a.$flags|0
if((t&4)!==0)s="const, "
else if((t&2)!==0)s="unmodifiable, "
else s=(t&1)!==0?"fixed, ":""
r="Instance of '"+A.c3(a)+"'"
if(s==="")return r
return r+" ("+s+"length: "+a.length+")"}}
J.cx.prototype={}
J.aS.prototype={
gl(){var t=this.d
return t==null?this.$ti.c.a(t):t},
j(){var t,s=this,r=s.a,q=r.length
if(s.b!==q){r=A.R(r)
throw A.d(r)}t=s.c
if(t>=q){s.d=null
return!1}s.d=r[t]
s.c=t+1
return!0},
$ir:1}
J.ay.prototype={
u(a,b){var t
A.dc(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){t=this.gV(b)
if(this.gV(a)===t)return 0
if(this.gV(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gV(a){return a===0?1/a<0:a<0},
bh(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.d(A.dX(""+a+".round()"))},
W(a,b){var t
if(b>20)throw A.d(A.a6(b,0,20,"fractionDigits",null))
t=a.toFixed(b)
if(a===0&&this.gV(a))return"-"+t
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
Z(a,b){var t=a%b
if(t===0)return 0
if(t>0)return t
return t+b},
D(a,b){return(a|0)===a?a/b|0:this.b_(a,b)},
b_(a,b){var t=a/b
if(t>=-2147483648&&t<=2147483647)return t|0
if(t>0){if(t!==1/0)return Math.floor(t)}else if(t>-1/0)return Math.ceil(t)
throw A.d(A.dX("Result of truncating division is "+A.k(t)+": "+A.k(a)+" ~/ "+b))},
ai(a,b){var t
if(a>0)t=this.aX(a,b)
else{t=b>31?31:b
t=a>>t>>>0}return t},
aX(a,b){return b>31?0:a>>>b},
gA(a){return A.ar(u.H)},
$iE:1,
$iq:1,
$ih:1}
J.aZ.prototype={
gA(a){return A.ar(u.S)},
$iD:1,
$ib:1}
J.bR.prototype={
gA(a){return A.ar(u.i)},
$iD:1}
J.U.prototype={
al(a,b){return new A.cg(b,a,0)},
b9(a,b){var t,s
A.p(b)
t=b.length
s=a.length
if(t>s)return!1
return b===this.G(a,s-t)},
M(a,b){var t
if(typeof b=="string")return A.f(a.split(b),u.s)
else{if(b instanceof A.az){t=b.e
t=!(t==null?b.e=b.aK():t)}else t=!1
if(t)return A.f(a.split(b.b),u.s)
else return this.aM(a,b)}},
aM(a,b){var t,s,r,q,p,o,n=A.f([],u.s)
for(t=J.ef(b,a),t=t.gn(t),s=0,r=1;t.j();){q=t.gl()
p=q.gaa()
o=q.ga6()
r=o-p
if(r===0&&s===p)continue
B.a.k(n,this.C(a,s,p))
s=o}if(s<a.length||r>0)B.a.k(n,this.G(a,s))
return n},
aE(a,b){var t=b.length
if(t>a.length)return!1
return b===a.substring(0,t)},
C(a,b,c){return a.substring(b,A.h9(b,c,a.length))},
G(a,b){return this.C(a,b,null)},
X(a){var t,s,r,q=a.trim(),p=q.length
if(p===0)return q
if(0>=p)return A.e(q,0)
if(q.charCodeAt(0)===133){t=J.fV(q,1)
if(t===p)return""}else t=0
s=p-1
if(!(s>=0))return A.e(q,s)
r=q.charCodeAt(s)===133?J.fW(q,s):p
if(t===0&&r===p)return q
return q.substring(t,r)},
aC(a,b){var t,s
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.d(B.E)
for(t=a,s="";;){if((b&1)===1)s=t+s
b=b>>>1
if(b===0)break
t+=t}return s},
R(a,b,c){var t=b-a.length
if(t<=0)return a
return this.aC(c,t)+a},
ao(a,b,c){var t
u.E.a(b)
t=a.length
if(c>t)throw A.d(A.a6(c,0,t,null,null))
return A.ea(a,b,c)},
E(a,b){return this.ao(a,b,0)},
u(a,b){var t
A.p(b)
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
gA(a){return A.ar(u.N)},
gm(a){return a.length},
$iD:1,
$iE:1,
$iaE:1,
$ia:1}
A.bV.prototype={
i(a){return"LateInitializationError: "+this.a}}
A.cT.prototype={}
A.m.prototype={}
A.v.prototype={
gn(a){var t=this
return new A.ah(t,t.gm(t),A.w(t).h("ah<v.E>"))},
L(a,b){var t,s,r,q=this,p=q.gm(q)
if(b.length!==0){if(p===0)return""
t=A.k(q.t(0,0))
if(p!==q.gm(q))throw A.d(A.O(q))
for(s=t,r=1;r<p;++r){s=s+b+A.k(q.t(0,r))
if(p!==q.gm(q))throw A.d(A.O(q))}return s.charCodeAt(0)==0?s:s}else{for(r=0,s="";r<p;++r){s+=A.k(q.t(0,r))
if(p!==q.gm(q))throw A.d(A.O(q))}return s.charCodeAt(0)==0?s:s}},
a9(a,b){var t,s,r,q=this
A.w(q).h("v.E(v.E,v.E)").a(b)
t=q.gm(q)
if(t===0)throw A.d(A.bO())
s=q.t(0,0)
for(r=1;r<t;++r){s=b.$2(s,q.t(0,r))
if(t!==q.gm(q))throw A.d(A.O(q))}return s}}
A.bj.prototype={
gaO(){var t=this.a.length,s=this.c
if(s>t)return t
return s},
gaZ(){var t=this.a.length,s=this.b
if(s>t)return t
return s},
gm(a){var t,s=this.a.length,r=this.b
if(r>=s)return 0
t=this.c
if(t>=s)return s-r
return t-r},
t(a,b){var t=this,s=t.gaZ()+b,r=t.gaO()
if(s>=r)throw A.d(A.dP(b,t.gm(0),t,"index"))
return J.eg(t.a,s)}}
A.ah.prototype={
gl(){var t=this.d
return t==null?this.$ti.c.a(t):t},
j(){var t,s=this,r=s.a,q=J.e6(r),p=q.gm(r)
if(s.b!==p)throw A.d(A.O(r))
t=s.c
if(t>=p){s.d=null
return!1}s.d=q.t(r,t);++s.c
return!0},
$ir:1}
A.ai.prototype={
gn(a){var t=this.a
return new A.b6(t.gn(t),this.b,A.w(this).h("b6<1,2>"))},
gm(a){var t=this.a
return t.gm(t)}}
A.aX.prototype={$im:1}
A.b6.prototype={
j(){var t=this,s=t.b
if(s.j()){t.a=t.c.$1(s.gl())
return!0}t.a=null
return!1},
gl(){var t=this.a
return t==null?this.$ti.y[1].a(t):t},
$ir:1}
A.C.prototype={
gm(a){return J.dN(this.a)},
t(a,b){return this.b.$1(J.eg(this.a,b))}}
A.a_.prototype={
gn(a){return new A.Q(J.aR(this.a),this.b,this.$ti.h("Q<1>"))}}
A.Q.prototype={
j(){var t,s
for(t=this.a,s=this.b;t.j();)if(s.$1(t.gl()))return!0
return!1},
gl(){return this.a.gl()},
$ir:1}
A.bm.prototype={
gn(a){return new A.bn(J.aR(this.a),this.$ti.h("bn<1>"))}}
A.bn.prototype={
j(){var t,s
for(t=this.a,s=this.$ti.c;t.j();)if(s.b(t.gl()))return!0
return!1},
gl(){return this.$ti.c.a(this.a.gl())},
$ir:1}
A.aY.prototype={}
A.bs.prototype={$r:"+index,score(1,2)",$s:2}
A.aT.prototype={
gP(a){return this.gm(this)===0},
i(a){return A.dT(this)},
gaq(){return new A.aM(this.ba(),A.w(this).h("aM<o<1,2>>"))},
ba(){var t=this
return function(){var s=0,r=1,q=[],p,o,n,m,l
return function $async$gaq(a,b,c){if(b===1){q.push(c)
s=r}for(;;)switch(s){case 0:p=t.gaw(),p=p.gn(p),o=A.w(t),n=o.y[1],o=o.h("o<1,2>")
case 2:if(!p.j()){s=3
break}m=p.gl()
l=t.B(0,m)
s=4
return a.b=new A.o(m,l==null?n.a(l):l,o),1
case 4:s=2
break
case 3:return 0
case 1:return a.c=q.at(-1),3}}}},
$iX:1}
A.ac.prototype={
gm(a){return this.b.length},
gaf(){var t=this.$keys
if(t==null){t=Object.keys(this.a)
this.$keys=t}return t},
b5(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
B(a,b){if(!this.b5(b))return null
return this.b[this.a[b]]},
U(a,b){var t,s,r,q
this.$ti.h("~(1,2)").a(b)
t=this.gaf()
s=this.b
for(r=t.length,q=0;q<r;++q)b.$2(t[q],s[q])},
gaw(){return new A.bo(this.gaf(),this.$ti.h("bo<1>"))}}
A.bo.prototype={
gm(a){return this.a.length},
gn(a){var t=this.a
return new A.al(t,t.length,this.$ti.h("al<1>"))}}
A.al.prototype={
gl(){var t=this.d
return t==null?this.$ti.c.a(t):t},
j(){var t=this,s=t.c
if(s>=t.b){t.d=null
return!1}t.d=t.a[s]
t.c=s+1
return!0},
$ir:1}
A.aU.prototype={}
A.aV.prototype={
gm(a){return this.b},
gn(a){var t,s=this,r=s.$keys
if(r==null){r=Object.keys(s.a)
s.$keys=r}t=r
return new A.al(t,t.length,s.$ti.h("al<1>"))},
E(a,b){if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)}}
A.bf.prototype={}
A.d_.prototype={
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
A.bb.prototype={
i(a){return"Null check operator used on a null value"}}
A.bT.prototype={
i(a){var t,s=this,r="NoSuchMethodError: method not found: '",q=s.b
if(q==null)return"NoSuchMethodError: "+s.a
t=s.c
if(t==null)return r+q+"' ("+s.a+")"
return r+q+"' on '"+t+"' ("+s.a+")"}}
A.c9.prototype={
i(a){var t=this.a
return t.length===0?"Error":"Error: "+t}}
A.cE.prototype={
i(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.a3.prototype={
i(a){var t=this.constructor,s=t==null?null:t.name
return"Closure '"+A.fb(s==null?"unknown":s)+"'"},
$iad:1,
gbn(){return this},
$C:"$1",
$R:1,
$D:null}
A.bD.prototype={$C:"$0",$R:0}
A.bE.prototype={$C:"$2",$R:2}
A.c7.prototype={}
A.c5.prototype={
i(a){var t=this.$static_name
if(t==null)return"Closure of unknown static method"
return"Closure '"+A.fb(t)+"'"}}
A.ax.prototype={
F(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.ax))return!1
return this.$_target===b.$_target&&this.a===b.a},
gp(a){return(A.f7(this.a)^A.c2(this.$_target))>>>0},
i(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.c3(this.a)+"'")}}
A.c4.prototype={
i(a){return"RuntimeError: "+this.a}}
A.ae.prototype={
gm(a){return this.a},
gP(a){return this.a===0},
B(a,b){var t,s,r,q,p=null
if(typeof b=="string"){t=this.b
if(t==null)return p
s=t[b]
r=s==null?p:s.b
return r}else if(typeof b=="number"&&(b&0x3fffffff)===b){q=this.c
if(q==null)return p
s=q[b]
r=s==null?p:s.b
return r}else return this.bb(b)},
bb(a){var t,s,r=this.d
if(r==null)return null
t=this.aR(r,a)
s=this.au(t,a)
if(s<0)return null
return t[s].b},
q(a,b,c){var t,s,r,q,p,o,n=this,m=A.w(n)
m.c.a(b)
m.y[1].a(c)
if(typeof b=="string"){t=n.b
n.ac(t==null?n.b=n.a3():t,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){s=n.c
n.ac(s==null?n.c=n.a3():s,b,c)}else{r=n.d
if(r==null)r=n.d=n.a3()
q=n.ar(b)
p=r[q]
if(p==null)r[q]=[n.a4(b,c)]
else{o=n.au(p,b)
if(o>=0)p[o].b=c
else p.push(n.a4(b,c))}}},
U(a,b){var t,s,r=this
A.w(r).h("~(1,2)").a(b)
t=r.e
s=r.r
while(t!=null){b.$2(t.a,t.b)
if(s!==r.r)throw A.d(A.O(r))
t=t.c}},
ac(a,b,c){var t,s=A.w(this)
s.c.a(b)
s.y[1].a(c)
t=a[b]
if(t==null)a[b]=this.a4(b,c)
else t.b=c},
a4(a,b){var t=this,s=A.w(t),r=new A.cA(s.c.a(a),s.y[1].a(b))
if(t.e==null)t.e=t.f=r
else t.f=t.f.c=r;++t.a
t.r=t.r+1&1073741823
return r},
ar(a){return J.a1(a)&1073741823},
aR(a,b){return a[this.ar(b)]},
au(a,b){var t,s
if(a==null)return-1
t=a.length
for(s=0;s<t;++s)if(J.cj(a[s].a,b))return s
return-1},
i(a){return A.dT(this)},
a3(){var t=Object.create(null)
t["<non-identifier-key>"]=t
delete t["<non-identifier-key>"]
return t},
$ieu:1}
A.cA.prototype={}
A.cB.prototype={
gm(a){return this.a.a},
gn(a){var t=this.a
return new A.af(t,t.r,t.e,this.$ti.h("af<1>"))}}
A.af.prototype={
gl(){return this.d},
j(){var t,s=this,r=s.a
if(s.b!==r.r)throw A.d(A.O(r))
t=s.c
if(t==null){s.d=null
return!1}else{s.d=t.a
s.c=t.c
return!0}},
$ir:1}
A.F.prototype={
gm(a){return this.a.a},
gn(a){var t=this.a
return new A.b4(t,t.r,t.e,this.$ti.h("b4<1>"))}}
A.b4.prototype={
gl(){return this.d},
j(){var t,s=this,r=s.a
if(s.b!==r.r)throw A.d(A.O(r))
t=s.c
if(t==null){s.d=null
return!1}else{s.d=t.b
s.c=t.c
return!0}},
$ir:1}
A.b2.prototype={
gm(a){return this.a.a},
gn(a){var t=this.a
return new A.b3(t,t.r,t.e,this.$ti.h("b3<1,2>"))}}
A.b3.prototype={
gl(){var t=this.d
t.toString
return t},
j(){var t,s=this,r=s.a
if(s.b!==r.r)throw A.d(A.O(r))
t=s.c
if(t==null){s.d=null
return!1}else{s.d=new A.o(t.a,t.b,s.$ti.h("o<1,2>"))
s.c=t.c
return!0}},
$ir:1}
A.dk.prototype={
$1(a){return this.a(a)},
$S:3}
A.dl.prototype={
$2(a,b){return this.a(a,b)},
$S:7}
A.dm.prototype={
$1(a){return this.a(A.p(a))},
$S:8}
A.an.prototype={
i(a){return this.aj(!1)},
aj(a){var t,s,r,q,p,o=this.aQ(),n=this.ad(),m=(a?"Record ":"")+"("
for(t=o.length,s="",r=0;r<t;++r,s=", "){m+=s
q=o[r]
if(typeof q=="string")m=m+q+": "
if(!(r<n.length))return A.e(n,r)
p=n[r]
m=a?m+A.ey(p):m+A.k(p)}m+=")"
return m.charCodeAt(0)==0?m:m},
aQ(){var t,s=this.$s
while($.d7.length<=s)B.a.k($.d7,null)
t=$.d7[s]
if(t==null){t=this.aJ()
B.a.q($.d7,s,t)}return t},
aJ(){var t,s,r,q=this.$r,p=q.indexOf("("),o=q.substring(1,p),n=q.substring(p),m=n==="()"?0:n.replace(/[^,]/g,"").length+1,l=u.K,k=J.eq(m,l)
for(t=0;t<m;++t)k[t]=t
if(o!==""){s=o.split(",")
t=s.length
for(r=m;t>0;){--r;--t
B.a.q(k,r,s[t])}}k=A.fX(k,!1,l)
k.$flags=3
return k}}
A.aL.prototype={
ad(){return[this.a,this.b]},
F(a,b){if(b==null)return!1
return b instanceof A.aL&&this.$s===b.$s&&J.cj(this.a,b.a)&&J.cj(this.b,b.b)},
gp(a){return A.ew(this.$s,this.a,this.b,B.h)}}
A.az.prototype={
i(a){return"RegExp/"+this.a+"/"+this.b.flags},
gaS(){var t=this,s=t.c
if(s!=null)return s
s=t.b
return t.c=A.es(t.a,s.multiline,!s.ignoreCase,s.unicode,s.dotAll,"g")},
aK(){var t,s=this.a
if(!B.b.E(s,"("))return!1
t=this.b.unicode?"u":""
return new RegExp("(?:)|"+s,t).exec("").length>1},
K(a){var t=this.b.exec(a)
if(t==null)return null
return new A.bp(t)},
al(a,b){return new A.cb(this,b,0)},
aP(a,b){var t,s=this.gaS()
if(s==null)s=A.e_(s)
s.lastIndex=b
t=s.exec(a)
if(t==null)return null
return new A.bp(t)},
$iaE:1,
$iha:1}
A.bp.prototype={
gaa(){return this.b.index},
ga6(){var t=this.b
return t.index+t[0].length},
$iaC:1,
$ibe:1}
A.cb.prototype={
gn(a){return new A.cc(this.a,this.b,this.c)}}
A.cc.prototype={
gl(){var t=this.d
return t==null?u.A.a(t):t},
j(){var t,s,r,q,p,o,n=this,m=n.b
if(m==null)return!1
t=n.c
s=m.length
if(t<=s){r=n.a
q=r.aP(m,t)
if(q!=null){n.d=q
p=q.ga6()
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
A.c6.prototype={
ga6(){return this.a+this.c.length},
$iaC:1,
gaa(){return this.a}}
A.cg.prototype={
gn(a){return new A.ch(this.a,this.b,this.c)}}
A.ch.prototype={
j(){var t,s,r=this,q=r.c,p=r.b,o=p.length,n=r.a,m=n.length
if(q+o>m){r.d=null
return!1}t=n.indexOf(p,q)
if(t<0){r.c=m+1
r.d=null
return!1}s=t+o
r.d=new A.c6(t,p)
r.c=s===r.c?s+1:s
return!0},
gl(){var t=this.d
t.toString
return t},
$ir:1}
A.aj.prototype={
gA(a){return B.aK},
am(a,b,c){var t=new Uint8Array(a,b,c)
return t},
$iD:1,
$iaj:1}
A.b9.prototype={
gb2(a){if(((a.$flags|0)&2)!==0)return new A.da(a.buffer)
else return a.buffer}}
A.da.prototype={
am(a,b,c){var t=A.fZ(this.a,b,c)
t.$flags=3
return t}}
A.b7.prototype={
gA(a){return B.aL},
$iD:1,
$iel:1}
A.aD.prototype={
gm(a){return a.length},
$ibS:1}
A.b8.prototype={$im:1,$ic:1,$iG:1}
A.bX.prototype={
gA(a){return B.aN},
gm(a){return a.length},
$iD:1}
A.bq.prototype={}
A.br.prototype={}
A.P.prototype={
h(a){return A.bx(v.typeUniverse,this,a)},
O(a){return A.eO(v.typeUniverse,this,a)}}
A.ce.prototype={}
A.d8.prototype={
i(a){return A.H(this.a,null)}}
A.cd.prototype={
i(a){return this.a}}
A.bt.prototype={}
A.ao.prototype={
gl(){var t=this.b
return t==null?this.$ti.c.a(t):t},
aU(a,b){var t,s,r
a=A.t(a)
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
p.d=null}r=p.aU(n,o)
if(1===r)return!0
if(0===r){p.b=null
q=p.e
if(q==null||q.length===0){p.a=A.eI
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
p.a=A.eI
throw o
return!1}if(0>=q.length)return A.e(q,-1)
p.a=q.pop()
n=1
continue}throw A.d(A.hc("sync*"))}return!1},
bp(a){var t,s,r=this
if(a instanceof A.aM){t=a.a()
s=r.e
if(s==null)s=r.e=[]
B.a.k(s,r.a)
r.a=t
return 2}else{r.d=J.aR(a)
return 2}},
$ir:1}
A.aM.prototype={
gn(a){return new A.ao(this.a(),this.$ti.h("ao<1>"))}}
A.ag.prototype={
gn(a){return new A.ah(a,a.length,A.by(a).h("ah<ag.E>"))},
t(a,b){if(!(b<a.length))return A.e(a,b)
return a[b]},
gav(a){return a.length!==0},
i(a){return A.dQ(a,"[","]")}}
A.b5.prototype={
U(a,b){var t,s,r,q=this,p=A.w(q)
p.h("~(1,2)").a(b)
for(t=new A.af(q,q.r,q.e,p.h("af<1>")),p=p.y[1];t.j();){s=t.d
r=q.B(0,s)
b.$2(s,r==null?p.a(r):r)}},
gm(a){return this.a},
gP(a){return this.a===0},
i(a){return A.dT(this)},
$iX:1}
A.cD.prototype={
$2(a,b){var t,s=this.a
if(!s.a)this.b.a+=", "
s.a=!1
s=this.b
t=A.k(a)
s.a=(s.a+=t)+": "
t=A.k(b)
s.a+=t},
$S:4}
A.aJ.prototype={
i(a){return A.dQ(this,"{","}")},
$im:1,
$ic:1}
A.bF.prototype={}
A.bH.prototype={}
A.b1.prototype={
i(a){var t=A.bK(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+t}}
A.bU.prototype={
i(a){return"Cyclic error in JSON stringify"}}
A.cy.prototype={
J(a,b){var t=A.hg(a,this.gb7().b,null)
return t},
gb7(){return B.U}}
A.cz.prototype={}
A.d5.prototype={
aB(a){var t,s,r,q,p,o,n=a.length
for(t=this.c,s=0,r=0;r<n;++r){q=a.charCodeAt(r)
if(q>92){if(q>=55296){p=q&64512
if(p===55296){o=r+1
o=!(o<n&&(a.charCodeAt(o)&64512)===56320)}else o=!1
if(!o)if(p===56320){p=r-1
p=!(p>=0&&(a.charCodeAt(p)&64512)===55296)}else p=!1
else p=!0
if(p){if(r>s)t.a+=B.b.C(a,s,r)
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
t.a+=p}}continue}if(q<32){if(r>s)t.a+=B.b.C(a,s,r)
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
break}}else if(q===34||q===92){if(r>s)t.a+=B.b.C(a,s,r)
s=r+1
p=A.x(92)
t.a+=p
p=A.x(q)
t.a+=p}}if(s===0)t.a+=a
else if(s<n)t.a+=B.b.C(a,s,n)},
a_(a){var t,s,r,q
for(t=this.a,s=t.length,r=0;r<s;++r){q=t[r]
if(a==null?q==null:a===q)throw A.d(new A.bU(a,null))}B.a.k(t,a)},
Y(a){var t,s,r,q,p=this
if(p.aA(a))return
p.a_(a)
try{t=p.b.$1(a)
if(!p.aA(t)){r=A.et(a,null,p.gag())
throw A.d(r)}r=p.a
if(0>=r.length)return A.e(r,-1)
r.pop()}catch(q){s=A.fc(q)
r=A.et(a,s,p.gag())
throw A.d(r)}},
aA(a){var t,s,r=this
if(typeof a=="number"){if(!isFinite(a))return!1
r.c.a+=B.d.i(a)
return!0}else if(a===!0){r.c.a+="true"
return!0}else if(a===!1){r.c.a+="false"
return!0}else if(a==null){r.c.a+="null"
return!0}else if(typeof a=="string"){t=r.c
t.a+='"'
r.aB(a)
t.a+='"'
return!0}else if(u.j.b(a)){r.a_(a)
r.bl(a)
t=r.a
if(0>=t.length)return A.e(t,-1)
t.pop()
return!0}else if(u.f.b(a)){r.a_(a)
s=r.bm(a)
t=r.a
if(0>=t.length)return A.e(t,-1)
t.pop()
return s}else return!1},
bl(a){var t,s=this.c
s.a+="["
if(J.fF(a)){if(0>=a.length)return A.e(a,0)
this.Y(a[0])
for(t=1;t<a.length;++t){s.a+=","
this.Y(a[t])}}s.a+="]"},
bm(a){var t,s,r,q,p,o,n=this,m={}
if(a.gP(a)){n.c.a+="{}"
return!0}t=a.gm(a)*2
s=A.ev(t,null,!1,u.X)
r=m.a=0
m.b=!0
a.U(0,new A.d6(m,s))
if(!m.b)return!1
q=n.c
q.a+="{"
for(p='"';r<t;r+=2,p=',"'){q.a+=p
n.aB(A.p(s[r]))
q.a+='":'
o=r+1
if(!(o<t))return A.e(s,o)
n.Y(s[o])}q.a+="}"
return!0}}
A.d6.prototype={
$2(a,b){var t,s
if(typeof a!="string")this.a.b=!1
t=this.b
s=this.a
B.a.q(t,s.a++,a)
B.a.q(t,s.a++,b)},
$S:4}
A.d4.prototype={
gag(){var t=this.c.a
return t.charCodeAt(0)==0?t:t}}
A.cp.prototype={
$0(){var t=this
return A.av(A.aw("("+t.a+", "+t.b+", "+t.c+", "+t.d+", "+t.e+", "+t.f+", "+t.r+", "+t.w+")"))},
$S:9}
A.B.prototype={
N(a){var t=1000,s=B.c.Z(a,t),r=B.c.D(a-s,t),q=this.b+s,p=B.c.Z(q,t),o=this.a+B.c.D(q-p,t)+r
if(o<-864e13||o>864e13)A.av(A.a6(o,-864e13,864e13,"millisecondsSinceEpoch",null))
if(o===864e13&&p!==0)A.av(A.fH(p,"microsecond","Time including microseconds is outside valid range"))
A.e3(!1,"isUtc",u.y)
return new A.B(o,p,!1)},
ap(a){return A.eo(this.b-a.b,this.a-a.a,0)},
F(a,b){var t
if(b==null)return!1
t=!1
if(b instanceof A.B)if(this.a===b.a)t=this.b===b.b
return t},
gp(a){return A.ew(this.a,this.b,B.h,B.h)},
u(a,b){var t
u.k.a(b)
t=B.c.u(this.a,b.a)
if(t!==0)return t
return B.c.u(this.b,b.b)},
i(a){var t=this,s=A.fQ(A.c1(t)),r=A.bJ(A.c0(t)),q=A.bJ(A.bd(t)),p=A.bJ(A.h1(t)),o=A.bJ(A.h3(t)),n=A.bJ(A.h4(t)),m=A.en(A.h2(t)),l=t.b,k=l===0?"":A.en(l)
return s+"-"+r+"-"+q+" "+p+":"+o+":"+n+"."+m+k},
$iE:1}
A.S.prototype={
F(a,b){if(b==null)return!1
return b instanceof A.S&&this.a===b.a},
gp(a){return B.c.gp(this.a)},
u(a,b){return B.c.u(this.a,u.d.a(b).a)},
i(a){var t,s,r,q,p,o=this.a,n=B.c.D(o,36e8),m=o%36e8
if(o<0){n=0-n
o=0-m
t="-"}else{o=m
t=""}s=B.c.D(o,6e7)
o%=6e7
r=s<10?"0":""
q=B.c.D(o,1e6)
p=q<10?"0":""
return t+n+":"+r+s+":"+p+q+"."+B.b.R(B.c.i(o%1e6),6,"0")},
$iE:1}
A.d1.prototype={
i(a){return this.H()}}
A.n.prototype={}
A.bB.prototype={
i(a){var t=this.a
if(t!=null)return"Assertion failed: "+A.bK(t)
return"Assertion failed"}}
A.bk.prototype={}
A.a2.prototype={
ga1(){return"Invalid argument"+(!this.a?"(s)":"")},
ga0(){return""},
i(a){var t=this,s=t.c,r=s==null?"":" ("+s+")",q=t.d,p=q==null?"":": "+q,o=t.ga1()+r+p
if(!t.a)return o
return o+t.ga0()+": "+A.bK(t.ga8())},
ga8(){return this.b}}
A.aH.prototype={
ga8(){return A.eS(this.b)},
ga1(){return"RangeError"},
ga0(){var t,s=this.e,r=this.f
if(s==null)t=r!=null?": Not less than or equal to "+A.k(r):""
else if(r==null)t=": Not greater than or equal to "+A.k(s)
else if(r>s)t=": Not in inclusive range "+A.k(s)+".."+A.k(r)
else t=r<s?": Valid value range is empty":": Only valid value is "+A.k(s)
return t}}
A.bM.prototype={
ga8(){return A.t(this.b)},
ga1(){return"RangeError"},
ga0(){if(A.t(this.b)<0)return": index must not be negative"
var t=this.f
if(t===0)return": no indices are valid"
return": index should be less than "+t},
gm(a){return this.f}}
A.bl.prototype={
i(a){return"Unsupported operation: "+this.a}}
A.c8.prototype={
i(a){return"UnimplementedError: "+this.a}}
A.bi.prototype={
i(a){return"Bad state: "+this.a}}
A.bG.prototype={
i(a){var t=this.a
if(t==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.bK(t)+"."}}
A.bY.prototype={
i(a){return"Out of Memory"},
$in:1}
A.bh.prototype={
i(a){return"Stack Overflow"},
$in:1}
A.d2.prototype={
i(a){return"Exception: "+this.a}}
A.cr.prototype={
i(a){var t=this.a,s=""!==t?"FormatException: "+t:"FormatException",r=this.b
if(typeof r=="string"){if(r.length>78)r=B.b.C(r,0,75)+"..."
return s+"\n"+r}else return s}}
A.c.prototype={
bk(a,b){var t=A.w(this)
return new A.a_(this,t.h("y(c.E)").a(b),t.h("a_<c.E>"))},
gm(a){var t,s=this.gn(this)
for(t=0;s.j();)++t
return t},
gP(a){return!this.gn(this).j()},
ga7(a){var t=this.gn(this)
if(!t.j())throw A.d(A.bO())
return t.gl()},
t(a,b){var t,s
A.dU(b,"index")
t=this.gn(this)
for(s=b;t.j();){if(s===0)return t.gl();--s}throw A.d(A.dP(b,b-s,this,"index"))},
i(a){return A.fR(this,"(",")")}}
A.o.prototype={
i(a){return"MapEntry("+A.k(this.a)+": "+A.k(this.b)+")"}}
A.ba.prototype={
gp(a){return A.j.prototype.gp.call(this,0)},
i(a){return"null"}}
A.j.prototype={$ij:1,
F(a,b){return this===b},
gp(a){return A.c2(this)},
i(a){return"Instance of '"+A.c3(this)+"'"},
gA(a){return A.ix(this)},
toString(){return this.i(this)}}
A.aK.prototype={
gm(a){return this.a.length},
i(a){var t=this.a
return t.charCodeAt(0)==0?t:t},
$ihd:1}
A.cf.prototype={
aI(){var t=self.crypto
if(t!=null)if(t.getRandomValues!=null)return
throw A.d(A.dX("No source of cryptographically secure random numbers available."))},
be(a){var t,s,r,q,p,o,n,m,l=null
if(a<=0||a>4294967296)throw A.d(new A.aH(l,l,!1,l,l,"max must be in range 0 < max \u2264 2^32, was "+a))
if(a>255)if(a>65535)t=a>16777215?4:3
else t=2
else t=1
s=this.a
s.$flags&2&&A.dJ(s,11)
s.setUint32(0,0,!1)
r=4-t
q=A.t(Math.pow(256,t))
for(p=a-1,o=(a&p)===0;;){crypto.getRandomValues(J.fD(B.a2.gb2(s),r,t))
n=s.getUint32(0,!1)
if(o)return(n&p)>>>0
m=n%a
if(n-m+a<q)return m}},
$ih8:1}
A.aW.prototype={
H(){return"DailyStatusValue."+this.b}}
A.cn.prototype={}
A.co.prototype={
ab(){var t=this.a.$0(),s=A.bI(A.c1(t),A.c0(t),A.bd(t),0),r=this.b
if(r==null||!r.a.F(0,s))return B.J
return r.b}}
A.cF.prototype={}
A.cU.prototype={
aF(a,b){var t,s,r,q,p,o,n,m,l=this.aY(a),k=l.length
if(k===0)return B.Z
if(k<=b)return l
k=A.f([],u.t)
for(t=0;s=l.length,t<s;++t)if(l[t].length>=8)k.push(t)
if(k.length===0){r=J.eq(s,u.S)
for(t=0;t<s;++t)r[t]=t
q=r}else q=k
p=this.aW(l)
k=A.f([],u.e)
for(s=q.length,o=0;o<q.length;q.length===s||(0,A.R)(q),++o){t=q[o]
if(!(t<l.length))return A.e(l,t)
k.push(new A.bs(t,this.aV(l[t],p)))}B.a.S(k,new A.cY())
k=A.eB(k,0,A.e3(b,"count",u.S),u.g)
s=k.$ti
n=s.h("C<v.E,b>")
m=A.W(new A.C(k,s.h("b(v.E)").a(new A.cZ()),n),n.h("v.E"))
B.a.aD(m)
k=A.f([],u.s)
for(s=m.length,o=0;o<m.length;m.length===s||(0,A.R)(m),++o){t=m[o]
if(!(t>=0&&t<l.length))return A.e(l,t)
k.push(l[t])}return k},
aY(a){var t=B.b.M(a,A.Y("(?<=[.!?])\\s+",!0,!1)),s=A.M(t),r=s.h("C<1,a>")
r=new A.C(t,s.h("a(1)").a(new A.cV()),r).aG(0,r.h("y(v.E)").a(new A.cW()))
t=A.W(r,r.$ti.h("c.E"))
return t},
aW(a){var t,s,r,q,p,o,n
u.a.a(a)
t=A.bW(u.N,u.S)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.R)(a),++r)for(q=this.ak(a[r]),p=J.aR(q.a),q=new A.Q(p,q.b,q.$ti.h("Q<1>"));q.j();){o=p.gl()
n=t.B(0,o)
t.q(0,o,(n==null?0:n)+1)}return t},
aV(a,b){var t,s,r,q
u.c.a(b)
for(t=this.ak(a),s=J.aR(t.a),t=new A.Q(s,t.b,t.$ti.h("Q<1>")),r=0;t.j();){q=b.B(0,s.gl())
r+=q==null?0:q}return r},
ak(a){var t=B.b.M(a.toLowerCase(),A.Y("[^\\p{L}]+",!0,!0)),s=A.M(t)
return new A.a_(t,s.h("y(1)").a(new A.cX()),s.h("a_<1>"))}}
A.cY.prototype={
$2(a,b){var t=u.g
t.a(a)
return B.c.u(t.a(b).b,a.b)},
$S:10}
A.cZ.prototype={
$1(a){return u.g.a(a).a},
$S:11}
A.cV.prototype={
$1(a){return B.b.X(A.p(a))},
$S:0}
A.cW.prototype={
$1(a){return A.p(a).length!==0},
$S:2}
A.cX.prototype={
$1(a){A.p(a)
return a.length!==0&&!B.aJ.E(0,a)},
$S:2}
A.cG.prototype={}
A.bZ.prototype={}
A.bc.prototype={
i(a){return"PersonProfileConsentError: "+this.a}}
A.aI.prototype={}
A.cM.prototype={
b6(){var t=this.b,s=A.w(t).h("F<2>"),r=s.h("a_<c.E>")
t=A.W(new A.a_(new A.F(t,s),s.h("y(c.E)").a(new A.cN(this.a.$0())),r),r.h("c.E"))
t.$flags=1
return t}}
A.cN.prototype={
$1(a){var t=u.C.a(a).c,s=this.a,r=t.a,q=s.a
if(r<=q)t=r===q&&t.b>s.b
else t=!0
t=!t
return t},
$S:12}
A.ab.prototype={}
A.bL.prototype={}
A.cs.prototype={
b0(a){var t,s,r,q,p,o,n,m,l=this.aN(u.n.a(a)),k=l.length
if(k<2)return new A.bL(k,0,!1)
t=A.f([],u.t)
for(s=1;s<l.length;++s){r=l[s]
q=l[s-1]
B.a.k(t,B.c.D(r.b-q.b+1000*(r.a-q.a),1000))}p=B.c.D(B.a.gbc(l).ap(B.a.ga7(l)).a,1000)
o=p===0?0:l.length/(p/6e4)
n=B.a.a9(t,new A.ct())/t.length
r=new A.C(t,u.r.a(new A.cu(n)),u.q).a9(0,new A.cv())
q=t.length
m=n===0?0:Math.sqrt(r/q)/n
r=l.length
return new A.bL(r,o,k>=4&&m>0.35)},
aN(a){var t,s,r,q,p,o,n,m,l,k
u.n.a(a)
t=A.f([],u.M)
for(s=a.length,r=null,q=!0,p=0;p<a.length;a.length===s||(0,A.R)(a),++p){o=a[p]
n=o.a
m=o.b
l=o.c
k=Math.sqrt(n*n+m*m+l*l)>11.5
if(k&&q){if(r!=null){n=o.d
m=r.a
m=n.b-r.b+1000*(n.a-m)>=25e4
n=m}else n=!0
if(n){r=o.d
B.a.k(t,r)}}q=!k}return t}}
A.ct.prototype={
$2(a,b){return A.t(a)+A.t(b)},
$S:13}
A.cu.prototype={
$1(a){return Math.pow(A.t(a)-this.a,2)},
$S:14}
A.cv.prototype={
$2(a,b){return A.dc(a)+A.dc(b)},
$S:15}
A.cw.prototype={
M(a,b){var t,s,r,q,p,o,n,m,l,k,j,i,h,g="aeiouAEIOUaeiouAEIOU\xe0\xe8\xe9\xec\xf2\xf9\xc0\xc8\xc9\xcc\xd2\xd9",f=b.length
if(f===0)return A.f([b],u.s)
t=u.t
s=A.f([],t)
r=A.f([],t)
for(q=0;q<f;){if(!(q>=0))return A.e(b,q)
p=b[q]
if(A.ea(g,p,0)){o=q
for(;;){if(o<f){p=b[o]
p=A.ea(g,p,0)}else p=!1
if(!p)break;++o}B.a.k(s,q)
B.a.k(r,o)
q=o}else ++q}if(s.length===0)return A.f([b],u.s)
n=A.f([],t)
for(m=0;m<s.length-1;){if(!(m<r.length))return A.e(r,m)
l=r[m];++m
B.a.k(n,l+this.aL(B.b.C(b,l,s[m]).toLowerCase()))}k=A.f([],u.s)
for(f=n.length,j=0,i=0;i<n.length;n.length===f||(0,A.R)(n),++i,j=h){h=n[i]
B.a.k(k,B.b.C(b,j,h))}B.a.k(k,B.b.G(b,j))
return k},
aL(a){var t,s,r=a.length
if(r===1)return 0
if(B.b.aE(a,"s"))return 0
if(r===2){if(B.a.E(B.q,a))return 0
if(this.ae(a))return 0
return 1}t=r-2
s=B.b.G(a,t)
if(B.a.E(B.q,s)||this.ae(s))return t
return r-1},
ae(a){var t=a.length
if(0>=t)return A.e(a,0)
if(B.b.E("bcdfgptv",a[0])){if(1>=t)return A.e(a,1)
t=B.b.E("lr",a[1])}else t=!1
return t}}
A.a7.prototype={
H(){return"ScamIndicatorType."+this.b}}
A.K.prototype={}
A.cO.prototype={
gbg(){var t,s=this.b
if(s.length===0)s="No suspicious element recognized in this message."
else{t=A.M(s)
t=new A.C(s,t.h("a(1)").a(new A.cP()),t.h("C<1,a>")).L(0," ")
s=t}return s}}
A.cP.prototype={
$1(a){return u.v.a(a).c},
$S:16}
A.cQ.prototype={
b1(a){var t,s,r=A.f([],u.R),q=B.b.gb4(a.toLowerCase())
if(B.a.I(B.X,q))B.a.k(r,B.aC)
if(B.a.I(B.Y,q))B.a.k(r,B.aF)
t=$.fl()
if(t.b.test(a))B.a.k(r,B.aE)
if(B.a.I(B.V,q))B.a.k(r,B.aA)
if(B.a.I(B.a_,q))B.a.k(r,B.aD)
if(B.a.I(B.W,q))B.a.k(r,B.aB)
s=r.length
A:{if(0===s){q=B.aG
break A}if(1===s){q=B.aH
break A}q=B.aI
break A}return new A.cO(q,r)}}
A.bg.prototype={
H(){return"ScamRiskLevel."+this.b}}
A.aF.prototype={
H(){return"PhraseCategory."+this.b}}
A.i.prototype={}
A.cH.prototype={}
A.ap.prototype={}
A.cI.prototype={
bi(a){var t,s,r=this.b,q=A.w(r).h("b2<1,2>")
q=A.fY(new A.b2(r,q),q.h("o<a,h>(c.E)").a(new A.cJ(this.a.$0(),864e5)),q.h("c.E"),u.b)
t=A.W(q,A.w(q).h("c.E"))
B.a.S(t,new A.cK())
r=A.eB(t,0,A.e3(a,"count",u.S),A.M(t).c)
q=r.$ti
s=q.h("C<v.E,a>")
r=A.W(new A.C(r,q.h("a(v.E)").a(new A.cL()),s),s.h("v.E"))
r.$flags=1
return r}}
A.cJ.prototype={
$1(a){var t
u._.a(a)
t=a.b
return new A.o(a.a,t.a*Math.pow(0.5,B.c.D(this.a.ap(t.b).a,1000)/this.b),u.b)},
$S:17}
A.cK.prototype={
$2(a,b){var t=u.b
t.a(a)
return B.d.u(t.a(b).b,a.b)},
$S:18}
A.cL.prototype={
$1(a){return u.b.a(a).a},
$S:19}
A.cR.prototype={
b3(a){var t,s,r,q,p,o
u.W.a(a)
if(a.length===0)return""
t=A.f([],u.s)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.R)(a),++r){q=a[r]
t.push(q.c)}p=B.a.L(t," ")
if(0>=p.length)return A.e(p,0)
o=p[0].toUpperCase()+B.b.G(p,1)
return!B.a.I(B.a0,B.b.gb8(o))?o+".":o}}
A.cS.prototype={
H(){return"SentenceLocale."+this.b}}
A.A.prototype={}
A.ck.prototype={
bd(a){var t,s,r,q,p,o,n,m,l,k,j,i,h=B.r.gaw().ga7(0)
for(t=B.r.gaq(),s=t.$ti,t=new A.ao(t.a(),s.h("ao<1>")),r=a.a,q=a.b,p=a.c,s=s.c,o=1/0;t.j();){n=t.b
if(n==null)n=s.a(n)
m=n.b
l=r-m.a
k=q-m.b
j=p-m.c
i=l*l+k*k+j*j
if(i<o){h=n.a
o=i}}return h}}
A.ca.prototype={
H(){return"WcagLevel."+this.b}}
A.cm.prototype={
az(a){var t,s,r,q,p,o,n,m,l,k,j=null
A:{t=B.m===a
s=t
if(s){r=!1
q=!0
p=!1
o=!0}else{p=j
r=p
q=!1
o=!1}s=4.5
n=j
if(t){if(o)m=p
else{p=!1
o=!0
m=!1}n=!1===m
m=n
l=!0}else{l=!1
m=!1}if(m)break A
k=B.aO===a
m=k
if(m)if(q)m=r
else{if(o)m=p
else{p=!1
o=!0
m=!1}r=!0===m
m=r}else m=!1
if(m)break A
if(k)if(l)s=n
else{n=!1===(o&&p)
s=n}else s=!1
if(s){s=7
break A}s=j}return this.a>=s}}
A.cl.prototype={
an(a,b){var t=this.ah(a),s=this.ah(b)
return new A.cm((Math.max(t,s)+0.05)/(Math.min(t,s)+0.05),!1)},
ah(a){return 0.2126*this.a2(a.a/255)+0.7152*this.a2(a.b/255)+0.0722*this.a2(a.c/255)},
a2(a){return a<=0.03928?a/12.92:Math.pow((a+0.055)/1.055,2.4)}}
A.a4.prototype={
H(){return"ExpiryDateFormat."+this.b}}
A.T.prototype={}
A.cq.prototype={
bf(a){var t,s,r,q,p,o,n,m,l,k,j,i,h=this,g=B.b.X(a),f=$.fg().K(g)
if(f!=null){t=f.b
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
p=h.T(r,q,t)
if(p!=null)return new A.T(p,B.O)}o=$.fj().K(g)
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
p=h.T(r,q,t)
if(p!=null)return new A.T(p,B.K)}n=$.fe().K(g)
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
p=h.T(r,q,t)
if(p!=null)return new A.T(p,B.L)}m=$.ff().K(g)
if(m!=null){t=m.b
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
p=h.T(r,q,t)
if(p!=null)return new A.T(p,B.M)}l=$.fh().K(g)
if(l!=null){t=l.b
if(2>=t.length)return A.e(t,2)
k=B.a1.B(0,t[2].toLowerCase())
if(k!=null){if(3>=t.length)return A.e(t,3)
s=t[3]
s.toString
s=A.aP(s)
if(1>=t.length)return A.e(t,1)
t=t[1]
t.toString
p=h.a5(s,k,A.aP(t))
if(p!=null)return new A.T(p,B.P)}}j=$.fi().K(g)
if(j!=null){t=j.b
if(1>=t.length)return A.e(t,1)
s=t[1]
s.toString
k=A.aP(s)
if(2>=t.length)return A.e(t,2)
t=t[2]
t.toString
i=A.aP(t)
if(k>=1&&k<=12){p=h.a5(i,k,A.bd(A.bI(i,k+1,0,0)))
if(p!=null)return new A.T(p,B.N)}}return B.Q},
T(a,b,c){var t=A.aP(a),s=A.aP(b),r=A.aP(c)
return this.a5(r<100?r+2000:r,s,t)},
a5(a,b,c){var t
if(b<1||b>12)return null
t=A.bI(a,b,c,0)
if(A.c1(t)!==a||A.c0(t)!==b||A.bd(t)!==c)return null
return t}}
A.df.prototype={
$2(a,b){var t=u.h
return B.c.u(t.a(a).d.a,t.a(b).d.a)},
$S:20}
A.dd.prototype={
$1(a){return A.p(a).length!==0},
$S:2}
A.dg.prototype={
$1(a){return B.a.L(B.x.M(0,A.p(a)),"-")},
$S:0}
A.dp.prototype={
$1(a){return A.i9(A.p(a))},
$S:0}
A.dq.prototype={
$3(a,b,c){A.N(a)
A.N(b)
A.N(c)
A.t(a)
A.t(b)
A.t(c)
return $.fw().bd(new A.A(a,b,c))},
$S:5}
A.dr.prototype={
$3(a,b,c){var t,s,r,q,p
A.N(a)
A.N(b)
A.N(c)
t=new A.A(A.t(a),A.t(b),A.t(c))
s=B.n.an(t,B.v)
r=B.n.an(t,B.u)
q=s.az(B.m)?"passes":"fails"
p=r.az(B.m)?"passes":"fails"
return"On white: "+B.d.W(s.a,2)+":1 ("+q+" AA). On black: "+B.d.W(r.a,2)+":1 ("+p+" AA)."},
$S:5}
A.dA.prototype={
$1(a){return A.hG(A.p(a))},
$S:0}
A.dB.prototype={
$1(a){return A.ii(A.p(a))},
$S:0}
A.dC.prototype={
$0(){var t=$.fy(),s=Date.now(),r=B.b.R(B.c.i(t.a.be(1e6)),6,"0")
new A.B(s,0,!1).N(6e8)
return"Pairing code: "+r+" (valid for 10 minutes)"},
$S:1}
A.dD.prototype={
$1(a){var t=A.p(a)==="ok"?B.H:B.I,s=$.eb(),r=s.a.$0()
s.b=new A.cn(A.bI(A.c1(r),A.c0(r),A.bd(r),0),t)
return A.eU(s.ab())},
$S:0}
A.dE.prototype={
$0(){return A.eU($.eb().ab())},
$S:1}
A.dF.prototype={
$0(){return A.ia()},
$S:1}
A.dG.prototype={
$1(a){var t,s,r,q
A.p(a)
t=$.ed()
s=t.b
r=s.B(0,a)
q=r==null?null:r.a
if(q==null)q=0
s.q(0,a,new A.ap(q+1,t.a.$0()))
return null},
$S:21}
A.dH.prototype={
$1(a){return A.ij(A.t(A.N(a)))},
$S:22}
A.ds.prototype={
$1(a){return A.hH(A.p(a))},
$S:0}
A.dt.prototype={
$1(a){return A.ie(A.p(a))},
$S:0}
A.du.prototype={
$4(a,b,c,d){var t,s,r,q
A.N(a)
A.N(b)
A.N(c)
A.N(d)
A.t(a)
A.t(b)
A.t(c)
t=1
if(a<3)s=0
else{s=b+1
if(!(s===1))t=s===2?6:B.d.bh(c*d)}r=5-a
q=d+(0.1-r*(0.08+r*0.02))
return B.e.J(A.cC(["intervalDays",t,"easinessFactor",A.ir(B.d.W(q<1.3?1.3:q,2)),"repetitionCount",s],u.N,u.H),null)},
$S:23}
A.dv.prototype={
$3(a,b,c){return A.hy(A.p(a),A.p(b),A.eR(c))},
$S:24}
A.dw.prototype={
$0(){return A.i8()},
$S:1}
A.dx.prototype={
$3(a,b,c){A.p(a)
A.N(b)
A.p(c)
return A.hz(a,A.t(b),c)},
$S:25}
A.dy.prototype={
$0(){return A.hO()},
$S:1}
A.dz.prototype={
$1(a){var t=B.w.b0(A.p(a)==="unsteady"?$.fC():$.fA()),s=B.d.W(t.b,0)
return(t.c?"Irregular rhythm: possible stumble risk":"Steady rhythm")+". "+t.a+" steps detected, "+s+" steps per minute."},
$S:0};(function aliases(){var t=J.a5.prototype
t.aH=t.i
t=A.c.prototype
t.aG=t.bk})();(function installTearOffs(){var t=hunkHelpers._static_2,s=hunkHelpers._instance_1i,r=hunkHelpers.installInstanceTearOff,q=hunkHelpers._static_1,p=hunkHelpers._static_0
t(J,"hW","fU",26)
var o
s(o=J.U.prototype,"gb8","b9",2)
r(o,"gb4",1,1,null,["$2","$1"],["ao","E"],6,0,0)
q(A,"ip","hM",3)
p(A,"e5","fP",27)})();(function inheritance(){var t=hunkHelpers.mixin,s=hunkHelpers.inherit,r=hunkHelpers.inheritMany
s(A.j,null)
r(A.j,[A.dR,J.bN,A.bf,J.aS,A.n,A.cT,A.c,A.ah,A.b6,A.Q,A.bn,A.aY,A.an,A.aT,A.al,A.aJ,A.d_,A.cE,A.a3,A.b5,A.cA,A.af,A.b4,A.b3,A.az,A.bp,A.cc,A.c6,A.ch,A.da,A.P,A.ce,A.d8,A.ao,A.ag,A.bF,A.bH,A.d5,A.B,A.S,A.d1,A.bY,A.bh,A.d2,A.cr,A.o,A.ba,A.aK,A.cf,A.cn,A.co,A.cF,A.cU,A.cG,A.bZ,A.bc,A.aI,A.cM,A.ab,A.bL,A.cs,A.cw,A.K,A.cO,A.cQ,A.i,A.cH,A.ap,A.cI,A.cR,A.A,A.ck,A.cm,A.cl,A.T,A.cq])
r(J.bN,[J.bQ,J.b_,J.b0,J.aA,J.aB,J.ay,J.U])
r(J.b0,[J.a5,J.l,A.aj,A.b9])
r(J.a5,[J.c_,J.ak,J.V])
s(J.bP,A.bf)
s(J.cx,J.l)
r(J.ay,[J.aZ,J.bR])
r(A.n,[A.bV,A.bk,A.bT,A.c9,A.c4,A.cd,A.b1,A.bB,A.a2,A.bl,A.c8,A.bi,A.bG])
r(A.c,[A.m,A.ai,A.a_,A.bm,A.bo,A.cb,A.cg,A.aM])
r(A.m,[A.v,A.cB,A.F,A.b2])
r(A.v,[A.bj,A.C])
s(A.aX,A.ai)
s(A.aL,A.an)
s(A.bs,A.aL)
s(A.ac,A.aT)
s(A.aU,A.aJ)
s(A.aV,A.aU)
s(A.bb,A.bk)
r(A.a3,[A.bD,A.bE,A.c7,A.dk,A.dm,A.cZ,A.cV,A.cW,A.cX,A.cN,A.cu,A.cP,A.cJ,A.cL,A.dd,A.dg,A.dp,A.dq,A.dr,A.dA,A.dB,A.dD,A.dG,A.dH,A.ds,A.dt,A.du,A.dv,A.dx,A.dz])
r(A.c7,[A.c5,A.ax])
s(A.ae,A.b5)
r(A.bE,[A.dl,A.cD,A.d6,A.cY,A.ct,A.cv,A.cK,A.df])
r(A.b9,[A.b7,A.aD])
s(A.bq,A.aD)
s(A.br,A.bq)
s(A.b8,A.br)
s(A.bX,A.b8)
s(A.bt,A.cd)
s(A.bU,A.b1)
s(A.cy,A.bF)
s(A.cz,A.bH)
s(A.d4,A.d5)
r(A.bD,[A.cp,A.dC,A.dE,A.dF,A.dw,A.dy])
r(A.a2,[A.aH,A.bM])
r(A.d1,[A.aW,A.a7,A.bg,A.aF,A.cS,A.ca,A.a4])
t(A.bq,A.ag)
t(A.br,A.aY)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{b:"int",q:"double",h:"num",a:"String",y:"bool",ba:"Null",G:"List",j:"Object",X:"Map",J:"JSObject"},mangledNames:{},types:["a(a)","a()","y(a)","@(@)","~(j?,j?)","a(q,q,q)","y(aE[b])","@(@,a)","@(a)","0&()","b(+index,score(b,b),+index,score(b,b))","b(+index,score(b,b))","y(aI)","b(b,b)","h(b)","h(h,h)","a(K)","o<a,h>(o<a,ap>)","b(o<a,h>,o<a,h>)","a(o<a,h>)","b(i,i)","~(a)","a(q)","a(q,q,q,q)","a(a,a,y)","a(a,q,a)","b(@,@)","B()"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;index,score":(a,b)=>c=>c instanceof A.bs&&a.b(c.a)&&b.b(c.b)}}
A.hv(v.typeUniverse,JSON.parse('{"V":"a5","c_":"a5","ak":"a5","iU":"aj","bQ":{"y":[],"D":[]},"b_":{"D":[]},"b0":{"J":[]},"a5":{"J":[]},"l":{"G":["1"],"m":["1"],"J":[],"c":["1"]},"bP":{"bf":[]},"cx":{"l":["1"],"G":["1"],"m":["1"],"J":[],"c":["1"]},"aS":{"r":["1"]},"ay":{"q":[],"h":[],"E":["h"]},"aZ":{"q":[],"b":[],"h":[],"E":["h"],"D":[]},"bR":{"q":[],"h":[],"E":["h"],"D":[]},"U":{"a":[],"E":["a"],"aE":[],"D":[]},"bV":{"n":[]},"m":{"c":["1"]},"v":{"m":["1"],"c":["1"]},"bj":{"v":["1"],"m":["1"],"c":["1"],"v.E":"1","c.E":"1"},"ah":{"r":["1"]},"ai":{"c":["2"],"c.E":"2"},"aX":{"ai":["1","2"],"m":["2"],"c":["2"],"c.E":"2"},"b6":{"r":["2"]},"C":{"v":["2"],"m":["2"],"c":["2"],"v.E":"2","c.E":"2"},"a_":{"c":["1"],"c.E":"1"},"Q":{"r":["1"]},"bm":{"c":["1"],"c.E":"1"},"bn":{"r":["1"]},"bs":{"aL":[],"an":[]},"aT":{"X":["1","2"]},"ac":{"aT":["1","2"],"X":["1","2"]},"bo":{"c":["1"],"c.E":"1"},"al":{"r":["1"]},"aU":{"aJ":["1"],"m":["1"],"c":["1"]},"aV":{"aU":["1"],"aJ":["1"],"m":["1"],"c":["1"]},"bb":{"n":[]},"bT":{"n":[]},"c9":{"n":[]},"a3":{"ad":[]},"bD":{"ad":[]},"bE":{"ad":[]},"c7":{"ad":[]},"c5":{"ad":[]},"ax":{"ad":[]},"c4":{"n":[]},"ae":{"b5":["1","2"],"eu":["1","2"],"X":["1","2"]},"cB":{"m":["1"],"c":["1"],"c.E":"1"},"af":{"r":["1"]},"F":{"m":["1"],"c":["1"],"c.E":"1"},"b4":{"r":["1"]},"b2":{"m":["o<1,2>"],"c":["o<1,2>"],"c.E":"o<1,2>"},"b3":{"r":["o<1,2>"]},"aL":{"an":[]},"az":{"ha":[],"aE":[]},"bp":{"be":[],"aC":[]},"cb":{"c":["be"],"c.E":"be"},"cc":{"r":["be"]},"c6":{"aC":[]},"cg":{"c":["aC"],"c.E":"aC"},"ch":{"r":["aC"]},"aj":{"J":[],"D":[]},"b9":{"J":[]},"b7":{"el":[],"J":[],"D":[]},"aD":{"bS":["1"],"J":[]},"b8":{"ag":["b"],"G":["b"],"bS":["b"],"m":["b"],"J":[],"c":["b"],"aY":["b"]},"bX":{"ag":["b"],"G":["b"],"bS":["b"],"m":["b"],"J":[],"c":["b"],"aY":["b"],"D":[],"ag.E":"b"},"cd":{"n":[]},"bt":{"n":[]},"ao":{"r":["1"]},"aM":{"c":["1"],"c.E":"1"},"b5":{"X":["1","2"]},"aJ":{"m":["1"],"c":["1"]},"b1":{"n":[]},"bU":{"n":[]},"B":{"E":["B"]},"q":{"h":[],"E":["h"]},"S":{"E":["S"]},"b":{"h":[],"E":["h"]},"G":{"m":["1"],"c":["1"]},"h":{"E":["h"]},"be":{"aC":[]},"a":{"E":["a"],"aE":[]},"bB":{"n":[]},"bk":{"n":[]},"a2":{"n":[]},"aH":{"n":[]},"bM":{"n":[]},"bl":{"n":[]},"c8":{"n":[]},"bi":{"n":[]},"bG":{"n":[]},"bY":{"n":[]},"bh":{"n":[]},"aK":{"hd":[]},"cf":{"h8":[]},"he":{"G":["b"],"m":["b"],"c":["b"]}}'))
A.hu(v.typeUniverse,JSON.parse('{"m":1,"aD":1,"bF":2,"bH":2}'))
var u=(function rtii(){var t=A.a0
return{U:t("E<@>"),k:t("B"),d:t("S"),O:t("m<@>"),V:t("n"),Z:t("ad"),Y:t("c<@>"),u:t("l<ab>"),M:t("l<B>"),J:t("l<X<a,j>>"),w:t("l<X<a,a>>"),e:t("l<+index,score(b,b)>"),R:t("l<K>"),s:t("l<a>"),x:t("l<@>"),t:t("l<b>"),z:t("l<i?>"),T:t("b_"),m:t("J"),L:t("V"),p:t("bS<@>"),n:t("G<ab>"),W:t("G<i>"),a:t("G<a>"),j:t("G<@>"),_:t("o<a,ap>"),b:t("o<a,h>"),c:t("X<a,b>"),f:t("X<@,@>"),q:t("C<b,h>"),P:t("ba"),K:t("j"),E:t("aE"),h:t("i"),l:t("iW"),F:t("+()"),g:t("+index,score(b,b)"),A:t("be"),C:t("aI"),v:t("K"),N:t("a"),B:t("D"),o:t("ak"),D:t("Q<a>"),G:t("bm<i>"),y:t("y"),Q:t("y(a)"),i:t("q"),S:t("b"),bc:t("ep<ba>?"),aQ:t("J?"),X:t("j?"),aD:t("a?"),cG:t("y?"),I:t("q?"),a3:t("b?"),ae:t("h?"),H:t("h"),r:t("h(b)")}})();(function constants(){var t=hunkHelpers.makeConstList
B.R=J.bN.prototype
B.a=J.l.prototype
B.c=J.aZ.prototype
B.d=J.ay.prototype
B.b=J.U.prototype
B.S=J.V.prototype
B.T=J.b0.prototype
B.a2=A.b7.prototype
B.t=J.c_.prototype
B.l=J.ak.prototype
B.n=new A.cl()
B.aP=new A.S(25e4)
B.w=new A.cs()
B.x=new A.cw()
B.p=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.y=function() {
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
B.D=function(getTagFallback) {
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
B.z=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.C=function(hooks) {
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
B.B=function(hooks) {
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
B.A=function(hooks) {
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
B.o=function(hooks) { return hooks; }

B.e=new A.cy()
B.E=new A.bY()
B.F=new A.cQ()
B.G=new A.cR()
B.h=new A.cT()
B.H=new A.aW(0,"ok")
B.I=new A.aW(1,"needsAttention")
B.J=new A.aW(2,"unknown")
B.aQ=new A.S(6e8)
B.aR=new A.S(864e8)
B.K=new A.a4(0,"dayMonthYearSlash")
B.L=new A.a4(1,"dayMonthYearDash")
B.M=new A.a4(2,"dayMonthYearDot")
B.N=new A.a4(3,"monthYearOnly")
B.O=new A.a4(4,"entroIlPhrase")
B.P=new A.a4(5,"italianMonthName")
B.Q=new A.T(null,null)
B.U=new A.cz(null)
B.V=t(["la tua banca","servizio clienti banca","sicurezza bancaria","verifica del tuo conto"],u.s)
B.q=t(["ch","gh","gn","gl","sc"],u.s)
B.W=t(["hai vinto","congratulazioni ti sei aggiudicato","premio in palio","sei stato selezionato"],u.s)
B.X=t(["conto bloccato","clicca subito","vincita","ultimo avviso","sospensione immediata","azione richiesta"],u.s)
B.Y=t(["codice","otp","pin","password"],u.s)
B.Z=t([],u.s)
B.a_=t(["pacco in giacenza","tassa doganale","spese di consegna","corriere espresso"],u.s)
B.a0=t([".","!","?"],u.s)
B.a4={gen:0,feb:1,mar:2,apr:3,mag:4,giu:5,lug:6,ago:7,set:8,ott:9,nov:10,dic:11}
B.a1=new A.ac(B.a4,[1,2,3,4,5,6,7,8,9,10,11,12],A.a0("ac<a,b>"))
B.a3={rosso:0,verde:1,blu:2,giallo:3,bianco:4,nero:5,arancione:6,viola:7,rosa:8,marrone:9,grigio:10}
B.aw=new A.A(220,20,20)
B.au=new A.A(20,140,20)
B.av=new A.A(20,20,200)
B.ax=new A.A(230,220,20)
B.v=new A.A(255,255,255)
B.u=new A.A(0,0,0)
B.ay=new A.A(240,130,20)
B.at=new A.A(130,20,160)
B.az=new A.A(240,150,190)
B.ar=new A.A(120,70,30)
B.as=new A.A(130,130,130)
B.r=new A.ac(B.a3,[B.aw,B.au,B.av,B.ax,B.v,B.u,B.ay,B.at,B.az,B.ar,B.as],A.a0("ac<a,A>"))
B.a6=new A.bc("A profile with consentGiven set to true must have a consentTimestamp.")
B.a7=new A.bc("A profile with a consentTimestamp must have consentGiven set to true.")
B.j=new A.aF(2,"emotions")
B.a8=new A.i("emotions-scared","Ho paura","I'm scared",B.j)
B.i=new A.aF(0,"needs")
B.a9=new A.i("needs-hungry","Ho fame","I'm hungry",B.i)
B.aa=new A.i("emotions-happy","Sono felice","I'm happy",B.j)
B.f=new A.aF(1,"greetings")
B.ab=new A.i("greetings-no","No","No",B.f)
B.ac=new A.i("needs-tired","Sono stanco","I'm tired",B.i)
B.ad=new A.i("greetings-yes","Si","Yes",B.f)
B.ae=new A.i("greetings-please","Per favore","Please",B.f)
B.k=new A.aF(3,"emergency")
B.af=new A.i("emergency-call-family","Chiama la mia famiglia","Call my family",B.k)
B.ag=new A.i("emotions-angry","Sono arrabbiato","I'm angry",B.j)
B.ah=new A.i("emotions-sad","Sono triste","I'm sad",B.j)
B.ai=new A.i("needs-bathroom","Bagno","Bathroom",B.i)
B.aj=new A.i("greetings-goodbye","Arrivederci","Goodbye",B.f)
B.ak=new A.i("emergency-call-doctor","Chiama un medico","Call a doctor",B.k)
B.al=new A.i("emergency-not-well","Non mi sento bene","I don't feel well",B.k)
B.am=new A.i("needs-water","Acqua","Water",B.i)
B.an=new A.i("needs-pain","Ho dolore","I'm in pain",B.i)
B.ao=new A.i("emergency-help","Aiuto","Help",B.k)
B.ap=new A.i("greetings-thank-you","Grazie","Thank you",B.f)
B.aq=new A.i("greetings-hello","Ciao","Hello",B.f)
B.aV=new A.a7(3,"bankImpersonation")
B.aA=new A.K("It poses as a message from your bank.")
B.aX=new A.a7(5,"prizeNotification")
B.aB=new A.K("It announces an unexpected prize or winnings.")
B.aS=new A.a7(0,"urgency")
B.aC=new A.K("It uses urgent language to make you act without thinking.")
B.aW=new A.a7(4,"courierFee")
B.aD=new A.K("It asks for a small payment for a package or delivery, a common pretext for stealing card details.")
B.aU=new A.a7(2,"shortUrl")
B.aE=new A.K("It contains a shortened link hiding its real destination.")
B.aT=new A.a7(1,"codeRequest")
B.aF=new A.K("It asks for a code, PIN, or password: no real bank or service ever asks for these by message.")
B.aG=new A.bg(0,"none")
B.aH=new A.bg(1,"low")
B.aI=new A.bg(2,"high")
B.aY=new A.cS(1,"en")
B.a5={il:0,lo:1,la:2,i:3,gli:4,le:5,un:6,uno:7,una:8,di:9,a:10,da:11,in:12,con:13,su:14,per:15,tra:16,fra:17,e:18,o:19,ma:20,che:21,chi:22,non:23,si:24,mi:25,ti:26,ci:27,vi:28,"\xe8":29,sono:30,ho:31,hai:32,ha:33,abbiamo:34}
B.aJ=new A.aV(B.a5,35,A.a0("aV<a>"))
B.aK=A.dK("iL")
B.aL=A.dK("el")
B.aM=A.dK("j")
B.aN=A.dK("he")
B.m=new A.ca(0,"aa")
B.aO=new A.ca(1,"aaa")})();(function staticFields(){$.d3=null
$.I=A.f([],A.a0("l<j>"))
$.ex=null
$.ej=null
$.ei=null
$.f6=null
$.f2=null
$.f9=null
$.dh=null
$.dn=null
$.e7=null
$.d7=A.f([],A.a0("l<G<j>?>"))
$.h0=A.f([B.am,B.ai,B.a9,B.ac,B.an,B.aq,B.aj,B.ap,B.ae,B.ad,B.ab,B.aa,B.ah,B.a8,B.ag,B.ao,B.ak,B.af,B.al],A.a0("l<i>"))})();(function lazyInitializers(){var t=hunkHelpers.lazyFinal
t($,"iN","fd",()=>A.di("_$dart_dartClosure"))
t($,"iM","bz",()=>A.di("_$dart_dartClosure_dartJSInterop"))
t($,"jg","fz",()=>A.f([new J.bP()],A.a0("l<bf>")))
t($,"iY","fm",()=>A.Z(A.d0({
toString:function(){return"$receiver$"}})))
t($,"iZ","fn",()=>A.Z(A.d0({$method$:null,
toString:function(){return"$receiver$"}})))
t($,"j_","fo",()=>A.Z(A.d0(null)))
t($,"j0","fp",()=>A.Z(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(s){return s.message}}()))
t($,"j3","fs",()=>A.Z(A.d0(void 0)))
t($,"j4","ft",()=>A.Z(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(s){return s.message}}()))
t($,"j2","fr",()=>A.Z(A.eC(null)))
t($,"j1","fq",()=>A.Z(function(){try{null.$method$}catch(s){return s.message}}()))
t($,"j6","fv",()=>A.Z(A.eC(void 0)))
t($,"j5","fu",()=>A.Z(function(){try{(void 0).$method$}catch(s){return s.message}}()))
t($,"ja","dL",()=>A.f7(B.aM))
t($,"iV","fk",()=>{var s=new A.cf(new DataView(new ArrayBuffer(8)))
s.aI()
return s})
t($,"iX","fl",()=>A.Y("https?://(bit\\.ly|tinyurl\\.com|t\\.co|goo\\.gl)/\\S+",!1,!1))
t($,"iQ","fg",()=>A.Y("entro\\s+(?:il\\s+)?(\\d{1,2})[/\\-](\\d{1,2})[/\\-](\\d{2,4})",!1,!1))
t($,"iT","fj",()=>A.Y("(\\d{1,2})/(\\d{1,2})/(\\d{2,4})",!0,!1))
t($,"iO","fe",()=>A.Y("(\\d{1,2})-(\\d{1,2})-(\\d{2,4})",!0,!1))
t($,"iP","ff",()=>A.Y("(\\d{1,2})\\.(\\d{1,2})\\.(\\d{2,4})",!0,!1))
t($,"iR","fh",()=>A.Y("(\\d{1,2})\\s+(gen|feb|mar|apr|mag|giu|lug|ago|set|ott|nov|dic)\\w*\\s+(\\d{4})",!1,!1))
t($,"iS","fi",()=>A.Y("scad\\.?\\s*(\\d{1,2})[/\\-](\\d{4})",!1,!1))
t($,"j9","fx",()=>new A.cq())
t($,"j7","fw",()=>new A.ck())
t($,"ji","fB",()=>new A.cU())
t($,"jb","fy",()=>{var s=$.fk()
return new A.cF(s)})
t($,"j8","eb",()=>new A.co(A.e5()))
t($,"jd","dM",()=>A.h_())
t($,"je","ed",()=>new A.cI(A.e5(),A.bW(u.N,A.a0("ap"))))
t($,"jc","ec",()=>new A.cG(A.bW(u.N,A.a0("bZ"))))
t($,"jf","ee",()=>new A.cM(A.e5(),A.bW(u.N,u.C)))
t($,"jh","fA",()=>A.f1(A.f([0,600,1200,1800,2400,3000,3600,4200],u.t)))
t($,"jj","fC",()=>A.f1(A.f([0,300,1200,1500,2700,3000,4500,4800],u.t)))})();(function nativeSupport(){!function(){var t=function(a){var n={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.aj,SharedArrayBuffer:A.aj,ArrayBufferView:A.b9,DataView:A.b7,Uint8Array:A.bX})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Uint8Array:false})
A.aD.$nativeSuperclassTag="ArrayBufferView"
A.bq.$nativeSuperclassTag="ArrayBufferView"
A.br.$nativeSuperclassTag="ArrayBufferView"
A.b8.$nativeSuperclassTag="ArrayBufferView"})()
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
var t=A.iF
if(typeof dartMainRunner==="function"){dartMainRunner(t,[])}else{t([])}})})()
//# sourceMappingURL=lumen-demo.js.map
