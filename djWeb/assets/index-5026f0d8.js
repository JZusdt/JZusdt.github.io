function e() {
	import.meta.url, import("_")
		.catch((() => 1))
}

function t(e, t) {
	const n = Object.create(null),
		o = e.split(",");
	for (let r = 0; r < o.length; r++) n[o[r]] = !0;
	return t ? e => !!n[e.toLowerCase()] : e => !!n[e]
}

function n(e) {
	if (S(e)) {
		const t = {};
		for (let o = 0; o < e.length; o++) {
			const r = e[o],
				i = O(r) ? s(r) : n(r);
			if (i)
				for (const e in i) t[e] = i[e]
		}
		return t
	}
	return O(e) || E(e) ? e : void 0
}! function() {
	const e = document.createElement("link")
		.relList;
	if (e && e.supports && e.supports("modulepreload")) return;
	for (const o of document.querySelectorAll('link[rel="modulepreload"]')) n(o);
	const t = {};

	function n(e) {
		if (e.ep) return;
		e.ep = !0;
		const t = function(e) {
			const t = {};
			return e.integrity && (t.integrity = e.integrity), e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy), "use-credentials" === e.crossOrigin ? t.credentials = "include" : "anonymous" === e.crossOrigin ? t.credentials = "omit" : t.credentials = "same-origin", t
		}(e);
		fetch(e.href, t)
	}
	t.childList = !0, t.subtree = !0, new MutationObserver((e => {
			for (const t of e)
				if ("childList" === t.type)
					for (const e of t.addedNodes) "LINK" === e.tagName && "modulepreload" === e.rel && n(e)
		}))
		.observe(document, t)
}();
const o = /;(?![^(]*\))/g,
	r = /:([^]+)/,
	i = new RegExp("\\/\\*.*?\\*\\/", "gs");

function s(e) {
	const t = {};
	return e.replace(i, "")
		.split(o)
		.forEach((e => {
			if (e) {
				const n = e.split(r);
				n.length > 1 && (t[n[0].trim()] = n[1].trim())
			}
		})), t
}

function l(e) {
	let t = "";
	if (O(e)) t = e;
	else if (S(e))
		for (let n = 0; n < e.length; n++) {
			const o = l(e[n]);
			o && (t += o + " ")
		} else if (E(e))
			for (const n in e) e[n] && (t += n + " ");
	return t.trim()
}
const a = t("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");

function c(e) {
	return !!e || "" === e
}
const u = e => O(e) ? e : null == e ? "" : S(e) || E(e) && (e.toString === R || !P(e.toString)) ? JSON.stringify(e, d, 2) : String(e),
	d = (e, t) => t && t.__v_isRef ? d(e, t.value) : k(t) ? {
		["Map(" + t.size + ")"]: [...t.entries()].reduce(((e, [t, n]) => (e[t + " =>"] = n, e)), {})
	} : _(t) ? {
		["Set(" + t.size + ")"]: [...t.values()]
	} : !E(t) || S(t) || A(t) ? t : String(t),
	f = {},
	p = [],
	h = () => {},
	v = () => !1,
	g = /^on[^a-z]/,
	m = e => g.test(e),
	b = e => e.startsWith("onUpdate:"),
	y = Object.assign,
	x = (e, t) => {
		const n = e.indexOf(t);
		n > -1 && e.splice(n, 1)
	},
	C = Object.prototype.hasOwnProperty,
	w = (e, t) => C.call(e, t),
	S = Array.isArray,
	k = e => "[object Map]" === j(e),
	_ = e => "[object Set]" === j(e),
	P = e => "function" == typeof e,
	O = e => "string" == typeof e,
	z = e => "symbol" == typeof e,
	E = e => null !== e && "object" == typeof e,
	T = e => E(e) && P(e.then) && P(e.catch),
	R = Object.prototype.toString,
	j = e => R.call(e),
	M = e => j(e)
	.slice(8, -1),
	A = e => "[object Object]" === j(e),
	F = e => O(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
	B = t(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
	L = e => {
		const t = Object.create(null);
		return n => t[n] || (t[n] = e(n))
	},
	I = /-(\w)/g,
	H = L((e => e.replace(I, ((e, t) => t ? t.toUpperCase() : "")))),
	D = /\B([A-Z])/g,
	N = L((e => e.replace(D, "-$1")
		.toLowerCase())),
	W = L((e => e.charAt(0)
		.toUpperCase() + e.slice(1))),
	$ = L((e => e ? "on" + W(e) : "")),
	V = (e, t) => !Object.is(e, t),
	q = (e, t) => {
		for (let n = 0; n < e.length; n++) e[n](t)
	},
	U = (e, t, n) => {
		const o = {
			configurable: !0,
			enumerable: !1
		};
		o.value = n, Object.defineProperty(e, t, o)
	},
	G = e => {
		const t = parseFloat(e);
		return isNaN(t) ? e : t
	},
	X = e => {
		const t = O(e) ? Number(e) : NaN;
		return isNaN(t) ? e : t
	};
let Z;
const K = () => Z || (Z = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {});
let Y;
class Q {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Y, !e && Y && (this.index = (Y.scopes || (Y.scopes = []))
			.push(this) - 1)
	}
	get active() {
		return this._active
	}
	run(e) {
		if (this._active) {
			const t = Y;
			try {
				return Y = this, e()
			} finally {
				Y = t
			}
		}
	}
	on() {
		Y = this
	}
	off() {
		Y = this.parent
	}
	stop(e) {
		if (this._active) {
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.scopes)
				for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
			if (!this.detached && this.parent && !e) {
				const e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index)
			}
			this.parent = void 0, this._active = !1
		}
	}
}
const J = e => {
		const t = new Set(e);
		return t.w = 0, t.n = 0, t
	},
	ee = e => (e.w & re) > 0,
	te = e => (e.n & re) > 0,
	ne = new WeakMap;
let oe = 0,
	re = 1;
const ie = 30;
let se;
const le = Symbol(""),
	ae = Symbol("");
class ce {
	constructor(e, t = null, n) {
		this.fn = e, this.scheduler = t, this.active = !0, this.deps = [], this.parent = void 0,
			function(e, t = Y) {
				t && t.active && t.effects.push(e)
			}(this, n)
	}
	run() {
		if (!this.active) return this.fn();
		let e = se,
			t = de;
		for (; e;) {
			if (e === this) return;
			e = e.parent
		}
		try {
			return this.parent = se, se = this, de = !0, re = 1 << ++oe, oe <= ie ? (({
				deps: e
			}) => {
				if (e.length)
					for (let t = 0; t < e.length; t++) e[t].w |= re
			})(this) : ue(this), this.fn()
		} finally {
			oe <= ie && (e => {
				const {
					deps: t
				} = e;
				if (t.length) {
					let n = 0;
					for (let o = 0; o < t.length; o++) {
						const r = t[o];
						ee(r) && !te(r) ? r.delete(e) : t[n++] = r, r.w &= ~re, r.n &= ~re
					}
					t.length = n
				}
			})(this), re = 1 << --oe, se = this.parent, de = t, this.parent = void 0, this.deferStop && this.stop()
		}
	}
	stop() {
		se === this ? this.deferStop = !0 : this.active && (ue(this), this.onStop && this.onStop(), this.active = !1)
	}
}

function ue(e) {
	const {
		deps: t
	} = e;
	if (t.length) {
		for (let n = 0; n < t.length; n++) t[n].delete(e);
		t.length = 0
	}
}
let de = !0;
const fe = [];

function pe() {
	fe.push(de), de = !1
}

function he() {
	const e = fe.pop();
	de = void 0 === e || e
}

function ve(e, t, n) {
	if (de && se) {
		let t = ne.get(e);
		!t && ne.set(e, t = new Map);
		let o = t.get(n);
		!o && t.set(n, o = J()), ge(o)
	}
}

function ge(e, t) {
	let n = !1;
	oe <= ie ? !te(e) && (e.n |= re, n = !ee(e)) : n = !e.has(se), n && (e.add(se), se.deps.push(e))
}

function me(e, t, n, o, r, i) {
	const s = ne.get(e);
	if (!s) return;
	let l = [];
	if ("clear" === t) l = [...s.values()];
	else if ("length" === n && S(e)) {
		const e = Number(o);
		s.forEach(((t, n) => {
			("length" === n || n >= e) && l.push(t)
		}))
	} else switch (void 0 !== n && l.push(s.get(n)), t) {
		case "add":
			S(e) ? F(n) && l.push(s.get("length")) : (l.push(s.get(le)), k(e) && l.push(s.get(ae)));
			break;
		case "delete":
			!S(e) && (l.push(s.get(le)), k(e) && l.push(s.get(ae)));
			break;
		case "set":
			k(e) && l.push(s.get(le))
	}
	if (1 === l.length) l[0] && be(l[0]);
	else {
		const e = [];
		for (const t of l) t && e.push(...t);
		be(J(e))
	}
}

function be(e, t) {
	const n = S(e) ? e : [...e];
	for (const o of n) o.computed && ye(o);
	for (const o of n) !o.computed && ye(o)
}

function ye(e, t) {
	(e !== se || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
const xe = t("__proto__,__v_isRef,__isVue"),
	Ce = new Set(Object.getOwnPropertyNames(Symbol)
		.filter((e => "arguments" !== e && "caller" !== e))
		.map((e => Symbol[e]))
		.filter(z)),
	we = Oe(),
	Se = Oe(!1, !0),
	ke = Oe(!0),
	_e = function() {
		const e = {};
		return ["includes", "indexOf", "lastIndexOf"].forEach((t => {
			e[t] = function(...e) {
				const n = ht(this);
				for (let t = 0, r = this.length; t < r; t++) ve(n, 0, t + "");
				const o = n[t](...e);
				return -1 === o || !1 === o ? n[t](...e.map(ht)) : o
			}
		})), ["push", "pop", "shift", "unshift", "splice"].forEach((t => {
			e[t] = function(...e) {
				pe();
				const n = ht(this)[t].apply(this, e);
				return he(), n
			}
		})), e
	}();

function Pe(e) {
	const t = ht(this);
	return ve(t, 0, e), t.hasOwnProperty(e)
}

function Oe(e = !1, t = !1) {
	return function(n, o, r) {
		if ("__v_isReactive" === o) return !e;
		if ("__v_isReadonly" === o) return e;
		if ("__v_isShallow" === o) return t;
		if ("__v_raw" === o && r === (e ? t ? st : it : t ? rt : ot)
			.get(n)) return n;
		const i = S(n);
		if (!e) {
			if (i && w(_e, o)) return Reflect.get(_e, o, r);
			if ("hasOwnProperty" === o) return Pe
		}
		const s = Reflect.get(n, o, r);
		return (z(o) ? Ce.has(o) : xe(o)) ? s : (!e && ve(n, 0, o), t ? s : xt(s) ? i && F(o) ? s : s.value : E(s) ? e ? at(s) : lt(s) : s)
	}
}
const ze = Te(),
	Ee = Te(!0);

function Te(e = !1) {
	return function(t, n, o, r) {
		let i = t[n];
		if (dt(i) && xt(i) && !xt(o)) return !1;
		if (!e && (!ft(o) && !dt(o) && (i = ht(i), o = ht(o)), !S(t) && xt(i) && !xt(o))) return i.value = o, !0;
		const s = S(t) && F(n) ? Number(n) < t.length : w(t, n),
			l = Reflect.set(t, n, o, r);
		return t === ht(r) && (s ? V(o, i) && me(t, "set", n, o) : me(t, "add", n, o)), l
	}
}
const Re = {};
Re.get = we, Re.set = ze, Re.deleteProperty = function(e, t) {
	const n = w(e, t);
	e[t];
	const o = Reflect.deleteProperty(e, t);
	return o && n && me(e, "delete", t, void 0), o
}, Re.has = function(e, t) {
	const n = Reflect.has(e, t);
	return (!z(t) || !Ce.has(t)) && ve(e, 0, t), n
}, Re.ownKeys = function(e) {
	return ve(e, 0, S(e) ? "length" : le), Reflect.ownKeys(e)
};
const je = Re,
	Me = {};
Me.get = ke, Me.set = function(e, t) {
	return !0
}, Me.deleteProperty = function(e, t) {
	return !0
};
const Ae = Me,
	Fe = {};
Fe.get = Se, Fe.set = Ee;
const Be = y({}, je, Fe),
	Le = e => e,
	Ie = e => Reflect.getPrototypeOf(e);

function He(e, t, n = !1, o = !1) {
	const r = ht(e = e.__v_raw),
		i = ht(t);
	!n && (t !== i && ve(r, 0, t), ve(r, 0, i));
	const {
		has: s
	} = Ie(r), l = o ? Le : n ? mt : gt;
	return s.call(r, t) ? l(e.get(t)) : s.call(r, i) ? l(e.get(i)) : void(e !== r && e.get(t))
}

function De(e, t = !1) {
	const n = this.__v_raw,
		o = ht(n),
		r = ht(e);
	return !t && (e !== r && ve(o, 0, e), ve(o, 0, r)), e === r ? n.has(e) : n.has(e) || n.has(r)
}

function Ne(e, t = !1) {
	return e = e.__v_raw, !t && ve(ht(e), 0, le), Reflect.get(e, "size", e)
}

function We(e) {
	e = ht(e);
	const t = ht(this);
	return !Ie(t)
		.has.call(t, e) && (t.add(e), me(t, "add", e, e)), this
}

function $e(e, t) {
	t = ht(t);
	const n = ht(this),
		{
			has: o,
			get: r
		} = Ie(n);
	let i = o.call(n, e);
	!i && (e = ht(e), i = o.call(n, e));
	const s = r.call(n, e);
	return n.set(e, t), i ? V(t, s) && me(n, "set", e, t) : me(n, "add", e, t), this
}

function Ve(e) {
	const t = ht(this),
		{
			has: n,
			get: o
		} = Ie(t);
	let r = n.call(t, e);
	!r && (e = ht(e), r = n.call(t, e)), o && o.call(t, e);
	const i = t.delete(e);
	return r && me(t, "delete", e, void 0), i
}

function qe() {
	const e = ht(this),
		t = 0 !== e.size,
		n = e.clear();
	return t && me(e, "clear", void 0, void 0), n
}

function Ue(e, t) {
	return function(n, o) {
		const r = this,
			i = r.__v_raw,
			s = ht(i),
			l = t ? Le : e ? mt : gt;
		return !e && ve(s, 0, le), i.forEach(((e, t) => n.call(o, l(e), l(t), r)))
	}
}

function Ge(e, t, n) {
	return function(...o) {
		const r = this.__v_raw,
			i = ht(r),
			s = k(i),
			l = "entries" === e || e === Symbol.iterator && s,
			a = "keys" === e && s,
			c = r[e](...o),
			u = n ? Le : t ? mt : gt;
		return !t && ve(i, 0, a ? ae : le), {
			next() {
				const {
					value: e,
					done: t
				} = c.next();
				return t ? {
					value: e,
					done: t
				} : {
					value: l ? [u(e[0]), u(e[1])] : u(e),
					done: t
				}
			},
			[Symbol.iterator]() {
				return this
			}
		}
	}
}

function Xe(e) {
	return function(...t) {
		return "delete" !== e && this
	}
}
const [Ze, Ke, Ye, Qe] = function() {
	const e = {
			get(e) {
				return He(this, e)
			},
			get size() {
				return Ne(this)
			},
			has: De,
			add: We,
			set: $e,
			delete: Ve,
			clear: qe,
			forEach: Ue(!1, !1)
		},
		t = {
			get(e) {
				return He(this, e, !1, !0)
			},
			get size() {
				return Ne(this)
			},
			has: De,
			add: We,
			set: $e,
			delete: Ve,
			clear: qe,
			forEach: Ue(!1, !0)
		},
		n = {
			get(e) {
				return He(this, e, !0)
			},
			get size() {
				return Ne(this, !0)
			},
			has(e) {
				return De.call(this, e, !0)
			},
			add: Xe("add"),
			set: Xe("set"),
			delete: Xe("delete"),
			clear: Xe("clear"),
			forEach: Ue(!0, !1)
		},
		o = {
			get(e) {
				return He(this, e, !0, !0)
			},
			get size() {
				return Ne(this, !0)
			},
			has(e) {
				return De.call(this, e, !0)
			},
			add: Xe("add"),
			set: Xe("set"),
			delete: Xe("delete"),
			clear: Xe("clear"),
			forEach: Ue(!0, !0)
		};
	return ["keys", "values", "entries", Symbol.iterator].forEach((r => {
		e[r] = Ge(r, !1, !1), n[r] = Ge(r, !0, !1), t[r] = Ge(r, !1, !0), o[r] = Ge(r, !0, !0)
	})), [e, n, t, o]
}();

function Je(e, t) {
	const n = t ? e ? Qe : Ye : e ? Ke : Ze;
	return (t, o, r) => "__v_isReactive" === o ? !e : "__v_isReadonly" === o ? e : "__v_raw" === o ? t : Reflect.get(w(n, o) && o in t ? n : t, o, r)
}
const et = {
		get: Je(!1, !1)
	},
	tt = {
		get: Je(!1, !0)
	},
	nt = {
		get: Je(!0, !1)
	},
	ot = new WeakMap,
	rt = new WeakMap,
	it = new WeakMap,
	st = new WeakMap;

function lt(e) {
	return dt(e) ? e : ct(e, !1, je, et, ot)
}

function at(e) {
	return ct(e, !0, Ae, nt, it)
}

function ct(e, t, n, o, r) {
	if (!E(e)) return e;
	if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
	const i = r.get(e);
	if (i) return i;
	const s = (l = e)
		.__v_skip || !Object.isExtensible(l) ? 0 : function(e) {
			switch (e) {
				case "Object":
				case "Array":
					return 1;
				case "Map":
				case "Set":
				case "WeakMap":
				case "WeakSet":
					return 2;
				default:
					return 0
			}
		}(M(l));
	var l;
	if (0 === s) return e;
	const a = new Proxy(e, 2 === s ? o : n);
	return r.set(e, a), a
}

function ut(e) {
	return dt(e) ? ut(e.__v_raw) : !(!e || !e.__v_isReactive)
}

function dt(e) {
	return !(!e || !e.__v_isReadonly)
}

function ft(e) {
	return !(!e || !e.__v_isShallow)
}

function pt(e) {
	return ut(e) || dt(e)
}

function ht(e) {
	const t = e && e.__v_raw;
	return t ? ht(t) : e
}

function vt(e) {
	return U(e, "__v_skip", !0), e
}
const gt = e => E(e) ? lt(e) : e,
	mt = e => E(e) ? at(e) : e;

function bt(e) {
	de && se && ge((e = ht(e))
		.dep || (e.dep = J()))
}

function yt(e, t) {
	const n = (e = ht(e))
		.dep;
	n && be(n)
}

function xt(e) {
	return !(!e || !0 !== e.__v_isRef)
}

function Ct(e) {
	return wt(e, !1)
}

function wt(e, t) {
	return xt(e) ? e : new St(e, t)
}
class St {
	constructor(e, t) {
		this.__v_isShallow = t, this.dep = void 0, this.__v_isRef = !0, this._rawValue = t ? e : ht(e), this._value = t ? e : gt(e)
	}
	get value() {
		return bt(this), this._value
	}
	set value(e) {
		const t = this.__v_isShallow || ft(e) || dt(e);
		e = t ? e : ht(e), V(e, this._rawValue) && (this._rawValue = e, this._value = t ? e : gt(e), yt(this))
	}
}

function kt(e) {
	return xt(e) ? e.value : e
}
const _t = {
	get: (e, t, n) => kt(Reflect.get(e, t, n)),
	set: (e, t, n, o) => {
		const r = e[t];
		return xt(r) && !xt(n) ? (r.value = n, !0) : Reflect.set(e, t, n, o)
	}
};

function Pt(e) {
	return ut(e) ? e : new Proxy(e, _t)
}
class Ot {
	constructor(e, t, n) {
		this._object = e, this._key = t, this._defaultValue = n, this.__v_isRef = !0
	}
	get value() {
		const e = this._object[this._key];
		return void 0 === e ? this._defaultValue : e
	}
	set value(e) {
		this._object[this._key] = e
	}
	get dep() {
		return e = ht(this._object), t = this._key, null === (n = ne.get(e)) || void 0 === n ? void 0 : n.get(t);
		var e, t, n
	}
}

function zt(e, t, n) {
	const o = e[t];
	return xt(o) ? o : new Ot(e, t, n)
}
var Et;
class Tt {
	constructor(e, t, n, o) {
		this._setter = t, this.dep = void 0, this.__v_isRef = !0, this[Et] = !1, this._dirty = !0, this.effect = new ce(e, (() => {
			!this._dirty && (this._dirty = !0, yt(this))
		})), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = n
	}
	get value() {
		const e = ht(this);
		return bt(e), (e._dirty || !e._cacheable) && (e._dirty = !1, e._value = e.effect.run()), e._value
	}
	set value(e) {
		this._setter(e)
	}
}

function Rt(e, t, n, o) {
	let r;
	try {
		r = o ? e(...o) : e()
	} catch (i) {
		Mt(i, t, n)
	}
	return r
}

function jt(e, t, n, o) {
	if (P(e)) {
		const r = Rt(e, t, n, o);
		return r && T(r) && r.catch((e => {
			Mt(e, t, n)
		})), r
	}
	const r = [];
	for (let i = 0; i < e.length; i++) r.push(jt(e[i], t, n, o));
	return r
}

function Mt(e, t, n, o = !0) {
	t && t.vnode;
	if (t) {
		let o = t.parent;
		const r = t.proxy,
			i = n;
		for (; o;) {
			const t = o.ec;
			if (t)
				for (let n = 0; n < t.length; n++)
					if (!1 === t[n](e, r, i)) return;
			o = o.parent
		}
		const s = t.appContext.config.errorHandler;
		if (s) return void Rt(s, null, 10, [e, r, i])
	}
	var r;
	r = e, console.error(r)
}
Et = "__v_isReadonly";
let At = !1,
	Ft = !1;
const Bt = [];
let Lt = 0;
const It = [];
let Ht = null,
	Dt = 0;
const Nt = Promise.resolve();
let Wt = null;

function $t(e) {
	const t = Wt || Nt;
	return e ? t.then(this ? e.bind(this) : e) : t
}

function Vt(e) {
	(!Bt.length || !Bt.includes(e, At && e.allowRecurse ? Lt + 1 : Lt)) && (null == e.id ? Bt.push(e) : Bt.splice(function(e) {
		let t = Lt + 1,
			n = Bt.length;
		for (; t < n;) {
			const o = t + n >>> 1;
			Xt(Bt[o]) < e ? t = o + 1 : n = o
		}
		return t
	}(e.id), 0, e), qt())
}

function qt() {
	!At && !Ft && (Ft = !0, Wt = Nt.then(Kt))
}

function Ut(e, t = (At ? Lt + 1 : 0)) {
	for (; t < Bt.length; t++) {
		const e = Bt[t];
		e && e.pre && (Bt.splice(t, 1), t--, e())
	}
}

function Gt(e) {
	if (It.length) {
		const e = [...new Set(It)];
		if (It.length = 0, Ht) return void Ht.push(...e);
		for (Ht = e, Ht.sort(((e, t) => Xt(e) - Xt(t))), Dt = 0; Dt < Ht.length; Dt++) Ht[Dt]();
		Ht = null, Dt = 0
	}
}
const Xt = e => null == e.id ? 1 / 0 : e.id,
	Zt = (e, t) => {
		const n = Xt(e) - Xt(t);
		if (0 === n) {
			if (e.pre && !t.pre) return -1;
			if (t.pre && !e.pre) return 1
		}
		return n
	};

function Kt(e) {
	Ft = !1, At = !0, Bt.sort(Zt);
	try {
		for (Lt = 0; Lt < Bt.length; Lt++) {
			const e = Bt[Lt];
			e && !1 !== e.active && Rt(e, null, 14)
		}
	} finally {
		Lt = 0, Bt.length = 0, Gt(), At = !1, Wt = null, (Bt.length || It.length) && Kt()
	}
}

function Yt(e, t, ...n) {
	if (e.isUnmounted) return;
	const o = e.vnode.props || f;
	let r = n;
	const i = t.startsWith("update:"),
		s = i && t.slice(7);
	if (s && s in o) {
		const e = ("modelValue" === s ? "model" : s) + "Modifiers",
			{
				number: t,
				trim: i
			} = o[e] || f;
		i && (r = n.map((e => O(e) ? e.trim() : e))), t && (r = n.map(G))
	}
	let l, a = o[l = $(t)] || o[l = $(H(t))];
	!a && i && (a = o[l = $(N(t))]), a && jt(a, e, 6, r);
	const c = o[l + "Once"];
	if (c) {
		if (e.emitted) {
			if (e.emitted[l]) return
		} else e.emitted = {};
		e.emitted[l] = !0, jt(c, e, 6, r)
	}
}

function Qt(e, t, n = !1) {
	const o = t.emitsCache,
		r = o.get(e);
	if (void 0 !== r) return r;
	const i = e.emits;
	let s = {},
		l = !1;
	if (!P(e)) {
		const o = e => {
			const n = Qt(e, t, !0);
			n && (l = !0, y(s, n))
		};
		!n && t.mixins.length && t.mixins.forEach(o), e.extends && o(e.extends), e.mixins && e.mixins.forEach(o)
	}
	return i || l ? (S(i) ? i.forEach((e => s[e] = null)) : y(s, i), E(e) && o.set(e, s), s) : (E(e) && o.set(e, null), null)
}

function Jt(e, t) {
	return !(!e || !m(t)) && (t = t.slice(2)
		.replace(/Once$/, ""), w(e, t[0].toLowerCase() + t.slice(1)) || w(e, N(t)) || w(e, t))
}
let en = null,
	tn = null;

function nn(e) {
	const t = en;
	return en = e, tn = e && e.type.__scopeId || null, t
}

function on(e) {
	tn = e
}

function rn() {
	tn = null
}

function sn(e, t = en, n) {
	if (!t) return e;
	if (e._n) return e;
	const o = (...n) => {
		o._d && ur(-1);
		const r = nn(t);
		let i;
		try {
			i = e(...n)
		} finally {
			nn(r), o._d && ur(1)
		}
		return i
	};
	return o._n = !0, o._c = !0, o._d = !0, o
}

function ln(e) {
	const {
		type: t,
		vnode: n,
		proxy: o,
		withProxy: r,
		props: i,
		propsOptions: [s],
		slots: l,
		attrs: a,
		emit: c,
		render: u,
		renderCache: d,
		data: f,
		setupState: p,
		ctx: h,
		inheritAttrs: v
	} = e;
	let g, m;
	const y = nn(e);
	try {
		if (4 & n.shapeFlag) {
			const e = r || o;
			g = kr(u.call(e, e, d, i, p, f, h)), m = a
		} else {
			const e = t;
			0, g = kr(e.length > 1 ? e(i, {
				attrs: a,
				slots: l,
				emit: c
			}) : e(i, null)), m = t.props ? a : an(a)
		}
	} catch (C) {
		sr.length = 0, Mt(C, e, 1), g = xr(rr)
	}
	let x = g;
	if (m && !1 !== v) {
		const e = Object.keys(m),
			{
				shapeFlag: t
			} = x;
		e.length && 7 & t && (s && e.some(b) && (m = cn(m, s)), x = Cr(x, m))
	}
	return n.dirs && (x = Cr(x), x.dirs = x.dirs ? x.dirs.concat(n.dirs) : n.dirs), n.transition && (x.transition = n.transition), g = x, nn(y), g
}
const an = e => {
		let t;
		for (const n in e)("class" === n || "style" === n || m(n)) && ((t || (t = {}))[n] = e[n]);
		return t
	},
	cn = (e, t) => {
		const n = {};
		for (const o in e)(!b(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
		return n
	};

function un(e, t, n) {
	const o = Object.keys(t);
	if (o.length !== Object.keys(e)
		.length) return !0;
	for (let r = 0; r < o.length; r++) {
		const i = o[r];
		if (t[i] !== e[i] && !Jt(n, i)) return !0
	}
	return !1
}
const dn = e => e.__isSuspense;

function fn(e, t) {
	if (Rr) {
		let n = Rr.provides;
		const o = Rr.parent && Rr.parent.provides;
		o === n && (n = Rr.provides = Object.create(o)), n[e] = t
	} else;
}

function pn(e, t, n = !1) {
	const o = Rr || en;
	if (o) {
		const r = null == o.parent ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides;
		if (r && e in r) return r[e];
		if (arguments.length > 1) return n && P(t) ? t.call(o.proxy) : t
	}
}

function hn(e, t) {
	return mn(e, null, t)
}
const vn = {};

function gn(e, t, n) {
	return mn(e, t, n)
}

function mn(e, t, {
	immediate: n,
	deep: o,
	flush: r,
	onTrack: i,
	onTrigger: s
} = f) {
	const l = Y === (null == Rr ? void 0 : Rr.scope) ? Rr : null;
	let a, c = !1,
		u = !1;
	if (xt(e) ? (a = () => e.value, c = ft(e)) : ut(e) ? (a = () => e, o = !0) : S(e) ? (u = !0, c = e.some((e => ut(e) || ft(e))), a = () => e.map((e => xt(e) ? e.value : ut(e) ? xn(e) : P(e) ? Rt(e, l, 2) : void 0))) : a = P(e) ? t ? () => Rt(e, l, 2) : () => {
		if (!l || !l.isUnmounted) return d && d(), jt(e, l, 3, [v])
	} : h, t && o) {
		const e = a;
		a = () => xn(e())
	}
	let d, p, v = e => {
		d = y.onStop = () => {
			Rt(e, l, 4)
		}
	};
	if (Lr) {
		if (v = h, t ? n && jt(t, l, 3, [a(), u ? [] : void 0, v]) : a(), "sync" !== r) return h; {
			const e = qr();
			p = e.__watcherHandles || (e.__watcherHandles = [])
		}
	}
	let g = u ? new Array(e.length)
		.fill(vn) : vn;
	const m = () => {
		if (y.active)
			if (t) {
				const e = y.run();
				(o || c || (u ? e.some(((e, t) => V(e, g[t]))) : V(e, g))) && (d && d(), jt(t, l, 3, [e, g === vn ? void 0 : u && g[0] === vn ? [] : g, v]), g = e)
			} else y.run()
	};
	let b;
	m.allowRecurse = !!t, "sync" === r ? b = m : "post" === r ? b = () => Uo(m, l && l.suspense) : (m.pre = !0, l && (m.id = l.uid), b = () => Vt(m));
	const y = new ce(a, b);
	t ? n ? m() : g = y.run() : "post" === r ? Uo(y.run.bind(y), l && l.suspense) : y.run();
	const C = () => {
		y.stop(), l && l.scope && x(l.scope.effects, y)
	};
	return p && p.push(C), C
}

function bn(e, t, n) {
	const o = this.proxy,
		r = O(e) ? e.includes(".") ? yn(o, e) : () => o[e] : e.bind(o, o);
	let i;
	P(t) ? i = t : (i = t.handler, n = t);
	const s = Rr;
	Mr(this);
	const l = mn(r, i.bind(o), n);
	return s ? Mr(s) : Ar(), l
}

function yn(e, t) {
	const n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t
	}
}

function xn(e, t) {
	if (!E(e) || e.__v_skip) return e;
	if ((t = t || new Set)
		.has(e)) return e;
	if (t.add(e), xt(e)) xn(e.value, t);
	else if (S(e))
		for (let n = 0; n < e.length; n++) xn(e[n], t);
	else if (_(e) || k(e)) e.forEach((e => {
		xn(e, t)
	}));
	else if (A(e))
		for (const n in e) xn(e[n], t);
	return e
}

function Cn() {
	const e = {
		isMounted: !1,
		isLeaving: !1,
		isUnmounting: !1,
		leavingVNodes: new Map
	};
	return Un((() => {
		e.isMounted = !0
	})), Zn((() => {
		e.isUnmounting = !0
	})), e
}
const wn = [Function, Array],
	Sn = {};
Sn.mode = String, Sn.appear = Boolean, Sn.persisted = Boolean, Sn.onBeforeEnter = wn, Sn.onEnter = wn, Sn.onAfterEnter = wn, Sn.onEnterCancelled = wn, Sn.onBeforeLeave = wn, Sn.onLeave = wn, Sn.onAfterLeave = wn, Sn.onLeaveCancelled = wn, Sn.onBeforeAppear = wn, Sn.onAppear = wn, Sn.onAfterAppear = wn, Sn.onAppearCancelled = wn;
const kn = {
	name: "BaseTransition",
	props: Sn,
	setup(e, {
		slots: t
	}) {
		const n = jr(),
			o = Cn();
		let r;
		return () => {
			const i = t.default && Tn(t.default(), !0);
			if (!i || !i.length) return;
			let s = i[0];
			if (i.length > 1)
				for (const e of i)
					if (e.type !== rr) {
						s = e;
						break
					} const l = ht(e),
				{
					mode: a
				} = l;
			if (o.isLeaving) return On(s);
			const c = zn(s);
			if (!c) return On(s);
			const u = Pn(c, l, o, n);
			En(c, u);
			const d = n.subTree,
				f = d && zn(d);
			let p = !1;
			const {
				getTransitionKey: h
			} = c.type;
			if (h) {
				const e = h();
				void 0 === r ? r = e : e !== r && (r = e, p = !0)
			}
			if (f && f.type !== rr && (!vr(c, f) || p)) {
				const e = Pn(f, l, o, n);
				if (En(f, e), "out-in" === a) return o.isLeaving = !0, e.afterLeave = () => {
					o.isLeaving = !1, !1 !== n.update.active && n.update()
				}, On(s);
				"in-out" === a && c.type !== rr && (e.delayLeave = (e, t, n) => {
					_n(o, f)[String(f.key)] = f, e._leaveCb = () => {
						t(), e._leaveCb = void 0, delete u.delayedLeave
					}, u.delayedLeave = n
				})
			}
			return s
		}
	}
};

function _n(e, t) {
	const {
		leavingVNodes: n
	} = e;
	let o = n.get(t.type);
	return !o && (o = Object.create(null), n.set(t.type, o)), o
}

function Pn(e, t, n, o) {
	const {
		appear: r,
		mode: i,
		persisted: s = !1,
		onBeforeEnter: l,
		onEnter: a,
		onAfterEnter: c,
		onEnterCancelled: u,
		onBeforeLeave: d,
		onLeave: f,
		onAfterLeave: p,
		onLeaveCancelled: h,
		onBeforeAppear: v,
		onAppear: g,
		onAfterAppear: m,
		onAppearCancelled: b
	} = t, y = String(e.key), x = _n(n, e), C = (e, t) => {
		e && jt(e, o, 9, t)
	}, w = (e, t) => {
		const n = t[1];
		C(e, t), S(e) ? e.every((e => e.length <= 1)) && n() : e.length <= 1 && n()
	}, k = {
		mode: i,
		persisted: s,
		beforeEnter(t) {
			let o = l;
			if (!n.isMounted) {
				if (!r) return;
				o = v || l
			}
			t._leaveCb && t._leaveCb(!0);
			const i = x[y];
			i && vr(e, i) && i.el._leaveCb && i.el._leaveCb(), C(o, [t])
		},
		enter(e) {
			let t = a,
				o = c,
				i = u;
			if (!n.isMounted) {
				if (!r) return;
				t = g || a, o = m || c, i = b || u
			}
			let s = !1;
			const l = e._enterCb = t => {
				s || (s = !0, C(t ? i : o, [e]), k.delayedLeave && k.delayedLeave(), e._enterCb = void 0)
			};
			t ? w(t, [e, l]) : l()
		},
		leave(t, o) {
			const r = String(e.key);
			if (t._enterCb && t._enterCb(!0), n.isUnmounting) return o();
			C(d, [t]);
			let i = !1;
			const s = t._leaveCb = n => {
				i || (i = !0, o(), C(n ? h : p, [t]), t._leaveCb = void 0, x[r] === e && delete x[r])
			};
			x[r] = e, f ? w(f, [t, s]) : s()
		},
		clone: e => Pn(e, t, n, o)
	};
	return k
}

function On(e) {
	if (Mn(e)) return (e = Cr(e))
		.children = null, e
}

function zn(e) {
	return Mn(e) ? e.children ? e.children[0] : void 0 : e
}

function En(e, t) {
	6 & e.shapeFlag && e.component ? En(e.component.subTree, t) : 128 & e.shapeFlag ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
}

function Tn(e, t = !1, n) {
	let o = [],
		r = 0;
	for (let i = 0; i < e.length; i++) {
		let s = e[i];
		const l = null == n ? s.key : String(n) + String(null != s.key ? s.key : i);
		s.type === nr ? (128 & s.patchFlag && r++, o = o.concat(Tn(s.children, t, l))) : (t || s.type !== rr) && o.push(null != l ? Cr(s, {
			key: l
		}) : s)
	}
	if (r > 1)
		for (let i = 0; i < o.length; i++) o[i].patchFlag = -2;
	return o
}

function Rn(e) {
	return P(e) ? {
		setup: e,
		name: e.name
	} : e
}
const jn = e => !!e.type.__asyncLoader,
	Mn = e => e.type.__isKeepAlive,
	An = {};
An.include = [String, RegExp, Array], An.exclude = [String, RegExp, Array], An.max = [String, Number];
const Fn = {
	name: "KeepAlive",
	__isKeepAlive: !0,
	props: An,
	setup(e, {
		slots: t
	}) {
		const n = jr(),
			o = n.ctx;
		if (!o.renderer) return () => {
			const e = t.default && t.default();
			return e && 1 === e.length ? e[0] : e
		};
		const r = new Map,
			i = new Set;
		let s = null;
		const l = n.suspense,
			{
				renderer: {
					p: a,
					m: c,
					um: u,
					o: {
						createElement: d
					}
				}
			} = o,
			f = d("div");

		function p(e) {
			Nn(e), u(e, n, l, !0)
		}

		function h(e) {
			r.forEach(((t, n) => {
				const o = Nr(t.type);
				o && (!e || !e(o)) && v(n)
			}))
		}

		function v(e) {
			const t = r.get(e);
			s && vr(t, s) ? s && Nn(s) : p(t), r.delete(e), i.delete(e)
		}
		o.activate = (e, t, n, o, r) => {
			const i = e.component;
			c(e, t, n, 0, l), a(i.vnode, e, t, n, i, l, o, e.slotScopeIds, r), Uo((() => {
				i.isDeactivated = !1, i.a && q(i.a);
				const t = e.props && e.props.onVnodeMounted;
				t && zr(t, i.parent, e)
			}), l)
		}, o.deactivate = e => {
			const t = e.component;
			c(e, f, null, 1, l), Uo((() => {
				t.da && q(t.da);
				const n = e.props && e.props.onVnodeUnmounted;
				n && zr(n, t.parent, e), t.isDeactivated = !0
			}), l)
		};
		const g = {
			flush: "post",
			deep: !0
		};
		gn((() => [e.include, e.exclude]), (([e, t]) => {
			e && h((t => Bn(e, t))), t && h((e => !Bn(t, e)))
		}), g);
		let m = null;
		const b = () => {
			null != m && r.set(m, Wn(n.subTree))
		};
		return Un(b), Xn(b), Zn((() => {
			r.forEach((e => {
				const {
					subTree: t,
					suspense: o
				} = n, r = Wn(t);
				if (e.type !== r.type || e.key !== r.key) p(e);
				else {
					Nn(r);
					const e = r.component.da;
					e && Uo(e, o)
				}
			}))
		})), () => {
			if (m = null, !t.default) return null;
			const n = t.default(),
				o = n[0];
			if (n.length > 1) return s = null, n;
			if (!(hr(o) && (4 & o.shapeFlag || 128 & o.shapeFlag))) return s = null, o;
			let l = Wn(o);
			const a = l.type,
				c = Nr(jn(l) ? l.type.__asyncResolved || {} : a),
				{
					include: u,
					exclude: d,
					max: f
				} = e;
			if (u && (!c || !Bn(u, c)) || d && c && Bn(d, c)) return s = l, o;
			const p = null == l.key ? a : l.key,
				h = r.get(p);
			return l.el && (l = Cr(l), 128 & o.shapeFlag && (o.ssContent = l)), m = p, h ? (l.el = h.el, l.component = h.component, l.transition && En(l, l.transition), l.shapeFlag |= 512, i.delete(p), i.add(p)) : (i.add(p), f && i.size > parseInt(f, 10) && v(i.values()
				.next()
				.value)), l.shapeFlag |= 256, s = l, dn(o.type) ? o : l
		}
	}
};

function Bn(e, t) {
	return S(e) ? e.some((e => Bn(e, t))) : O(e) ? e.split(",")
		.includes(t) : "[object RegExp]" === j(e) && e.test(t)
}

function Ln(e, t) {
	Hn(e, "a", t)
}

function In(e, t) {
	Hn(e, "da", t)
}

function Hn(e, t, n = Rr) {
	const o = e.__wdc || (e.__wdc = () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent
		}
		return e()
	});
	if ($n(t, o, n), n) {
		let e = n.parent;
		for (; e && e.parent;) Mn(e.parent.vnode) && Dn(o, t, n, e), e = e.parent
	}
}

function Dn(e, t, n, o) {
	const r = $n(t, e, o, !0);
	Kn((() => {
		x(o[t], r)
	}), n)
}

function Nn(e) {
	e.shapeFlag &= -257, e.shapeFlag &= -513
}

function Wn(e) {
	return 128 & e.shapeFlag ? e.ssContent : e
}

function $n(e, t, n = Rr, o = !1) {
	if (n) {
		const r = n[e] || (n[e] = []),
			i = t.__weh || (t.__weh = (...o) => {
				if (n.isUnmounted) return;
				pe(), Mr(n);
				const r = jt(t, n, e, o);
				return Ar(), he(), r
			});
		return o ? r.unshift(i) : r.push(i), i
	}
}
const Vn = e => (t, n = Rr) => (!Lr || "sp" === e) && $n(e, ((...e) => t(...e)), n),
	qn = Vn("bm"),
	Un = Vn("m"),
	Gn = Vn("bu"),
	Xn = Vn("u"),
	Zn = Vn("bum"),
	Kn = Vn("um"),
	Yn = Vn("sp"),
	Qn = Vn("rtg"),
	Jn = Vn("rtc");

function eo(e, t = Rr) {
	$n("ec", e, t)
}

function to(e, t) {
	const n = en;
	if (null === n) return e;
	const o = Dr(n) || n.proxy,
		r = e.dirs || (e.dirs = []);
	for (let i = 0; i < t.length; i++) {
		let [e, n, s, l = f] = t[i];
		if (e) {
			P(e) && (e = {
				mounted: e,
				updated: e
			}), e.deep && xn(n);
			const t = {};
			t.dir = e, t.instance = o, t.value = n, t.oldValue = void 0, t.arg = s, t.modifiers = l, r.push(t)
		}
	}
	return e
}

function no(e, t, n, o) {
	const r = e.dirs,
		i = t && t.dirs;
	for (let s = 0; s < r.length; s++) {
		const l = r[s];
		i && (l.oldValue = i[s].value);
		let a = l.dir[o];
		a && (pe(), jt(a, n, 8, [e.el, l, e, t]), he())
	}
}
const oo = "components";
const ro = Symbol();

function io(e) {
	return O(e) ? so(oo, e, !1) || e : e || ro
}

function so(e, t, n = !0, o = !1) {
	const r = en || Rr;
	if (r) {
		const n = r.type;
		if (e === oo) {
			const e = Nr(n, !1);
			if (e && (e === t || e === H(t) || e === W(H(t)))) return n
		}
		const i = lo(r[e] || n[e], t) || lo(r.appContext[e], t);
		return !i && o ? n : i
	}
}

function lo(e, t) {
	return e && (e[t] || e[H(t)] || e[W(H(t))])
}

function ao(e, t, n = {}, o, r) {
	if (en.isCE || en.parent && jn(en.parent) && en.parent.isCE) return "default" !== t && (n.name = t), xr("slot", n, o && o());
	let i = e[t];
	i && i._c && (i._d = !1), ar();
	const s = i && co(i(n)),
		l = {};
	l.key = n.key || s && s.key || "_" + t;
	const a = pr(nr, l, s || (o ? o() : []), s && 1 === e._ ? 64 : -2);
	return !r && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), i && i._c && (i._d = !0), a
}

function co(e) {
	return e.some((e => !hr(e) || e.type !== rr && !(e.type === nr && !co(e.children)))) ? e : null
}
const uo = e => e ? Fr(e) ? Dr(e) || e.proxy : uo(e.parent) : null,
	fo = y(Object.create(null), {
		$: e => e,
		$el: e => e.vnode.el,
		$data: e => e.data,
		$props: e => e.props,
		$attrs: e => e.attrs,
		$slots: e => e.slots,
		$refs: e => e.refs,
		$parent: e => uo(e.parent),
		$root: e => uo(e.root),
		$emit: e => e.emit,
		$options: e => yo(e),
		$forceUpdate: e => e.f || (e.f = () => Vt(e.update)),
		$nextTick: e => e.n || (e.n = $t.bind(e.proxy)),
		$watch: e => bn.bind(e)
	}),
	po = (e, t) => e !== f && !e.__isScriptSetup && w(e, t),
	ho = {
		get({
			_: e
		}, t) {
			const {
				ctx: n,
				setupState: o,
				data: r,
				props: i,
				accessCache: s,
				type: l,
				appContext: a
			} = e;
			let c;
			if ("$" !== t[0]) {
				const l = s[t];
				if (void 0 !== l) switch (l) {
					case 1:
						return o[t];
					case 2:
						return r[t];
					case 4:
						return n[t];
					case 3:
						return i[t]
				} else {
					if (po(o, t)) return s[t] = 1, o[t];
					if (r !== f && w(r, t)) return s[t] = 2, r[t];
					if ((c = e.propsOptions[0]) && w(c, t)) return s[t] = 3, i[t];
					if (n !== f && w(n, t)) return s[t] = 4, n[t];
					vo && (s[t] = 0)
				}
			}
			const u = fo[t];
			let d, p;
			return u ? ("$attrs" === t && ve(e, 0, t), u(e)) : (d = l.__cssModules) && (d = d[t]) ? d : n !== f && w(n, t) ? (s[t] = 4, n[t]) : (p = a.config.globalProperties, w(p, t) ? p[t] : void 0)
		},
		set({
			_: e
		}, t, n) {
			const {
				data: o,
				setupState: r,
				ctx: i
			} = e;
			return po(r, t) ? (r[t] = n, !0) : o !== f && w(o, t) ? (o[t] = n, !0) : !w(e.props, t) && (("$" !== t[0] || !(t.slice(1) in e)) && (i[t] = n, !0))
		},
		has({
			_: {
				data: e,
				setupState: t,
				accessCache: n,
				ctx: o,
				appContext: r,
				propsOptions: i
			}
		}, s) {
			let l;
			return !!n[s] || e !== f && w(e, s) || po(t, s) || (l = i[0]) && w(l, s) || w(o, s) || w(fo, s) || w(r.config.globalProperties, s)
		},
		defineProperty(e, t, n) {
			return null != n.get ? e._.accessCache[t] = 0 : w(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
		}
	};
let vo = !0;

function go(e) {
	const t = yo(e),
		n = e.proxy,
		o = e.ctx;
	vo = !1, t.beforeCreate && mo(t.beforeCreate, e, "bc");
	const {
		data: r,
		computed: i,
		methods: s,
		watch: l,
		provide: a,
		inject: c,
		created: u,
		beforeMount: d,
		mounted: f,
		beforeUpdate: p,
		updated: v,
		activated: g,
		deactivated: m,
		beforeDestroy: b,
		beforeUnmount: y,
		destroyed: x,
		unmounted: C,
		render: w,
		renderTracked: k,
		renderTriggered: _,
		errorCaptured: O,
		serverPrefetch: z,
		expose: T,
		inheritAttrs: R,
		components: j,
		directives: M,
		filters: A
	} = t;
	if (c && function(e, t, n = h, o = !1) {
		S(e) && (e = ko(e));
		for (const r in e) {
			const n = e[r];
			let i;
			if (i = E(n) ? "default" in n ? pn(n.from || r, n.default, !0) : pn(n.from || r) : pn(n), xt(i))
				if (o) {
					const e = {
						enumerable: !0,
						configurable: !0,
						get: () => i.value,
						set: e => i.value = e
					};
					Object.defineProperty(t, r, e)
				} else t[r] = i;
			else t[r] = i
		}
	}(c, o, null, e.appContext.config.unwrapInjectedRef), s)
		for (const h in s) {
			const e = s[h];
			P(e) && (o[h] = e.bind(n))
		}
	if (r) {
		const t = r.call(n, n);
		E(t) && (e.data = lt(t))
	}
	if (vo = !0, i)
		for (const S in i) {
			const e = i[S],
				t = P(e) ? e.bind(n, n) : P(e.get) ? e.get.bind(n, n) : h,
				r = !P(e) && P(e.set) ? e.set.bind(n) : h,
				s = {};
			s.get = t, s.set = r;
			const l = Wr(s),
				a = {
					enumerable: !0,
					configurable: !0,
					get: () => l.value,
					set: e => l.value = e
				};
			Object.defineProperty(o, S, a)
		}
	if (l)
		for (const h in l) bo(l[h], o, n, h);
	if (a) {
		const e = P(a) ? a.call(n) : a;
		Reflect.ownKeys(e)
			.forEach((t => {
				fn(t, e[t])
			}))
	}

	function F(e, t) {
		S(t) ? t.forEach((t => e(t.bind(n)))) : t && e(t.bind(n))
	}
	if (u && mo(u, e, "c"), F(qn, d), F(Un, f), F(Gn, p), F(Xn, v), F(Ln, g), F(In, m), F(eo, O), F(Jn, k), F(Qn, _), F(Zn, y), F(Kn, C), F(Yn, z), S(T))
		if (T.length) {
			const t = e.exposed || (e.exposed = {});
			T.forEach((e => {
				Object.defineProperty(t, e, {
					get: () => n[e],
					set: t => n[e] = t
				})
			}))
		} else !e.exposed && (e.exposed = {});
	w && e.render === h && (e.render = w), null != R && (e.inheritAttrs = R), j && (e.components = j), M && (e.directives = M)
}

function mo(e, t, n) {
	jt(S(e) ? e.map((e => e.bind(t.proxy))) : e.bind(t.proxy), t, n)
}

function bo(e, t, n, o) {
	const r = o.includes(".") ? yn(n, o) : () => n[o];
	if (O(e)) {
		const n = t[e];
		P(n) && gn(r, n)
	} else if (P(e)) gn(r, e.bind(n));
	else if (E(e))
		if (S(e)) e.forEach((e => bo(e, t, n, o)));
		else {
			const o = P(e.handler) ? e.handler.bind(n) : t[e.handler];
			P(o) && gn(r, o, e)
		}
}

function yo(e) {
	const t = e.type,
		{
			mixins: n,
			extends: o
		} = t,
		{
			mixins: r,
			optionsCache: i,
			config: {
				optionMergeStrategies: s
			}
		} = e.appContext,
		l = i.get(t);
	let a;
	return l ? a = l : r.length || n || o ? (a = {}, r.length && r.forEach((e => xo(a, e, s, !0))), xo(a, t, s)) : a = t, E(t) && i.set(t, a), a
}

function xo(e, t, n, o = !1) {
	const {
		mixins: r,
		extends: i
	} = t;
	i && xo(e, i, n, !0), r && r.forEach((t => xo(e, t, n, !0)));
	for (const s in t)
		if (o && "expose" === s);
		else {
			const o = wo[s] || n && n[s];
			e[s] = o ? o(e[s], t[s]) : t[s]
		} return e
}
const Co = {};
Co.data = So, Co.props = Po, Co.emits = Po, Co.methods = Po, Co.computed = Po, Co.beforeCreate = _o, Co.created = _o, Co.beforeMount = _o, Co.mounted = _o, Co.beforeUpdate = _o, Co.updated = _o, Co.beforeDestroy = _o, Co.beforeUnmount = _o, Co.destroyed = _o, Co.unmounted = _o, Co.activated = _o, Co.deactivated = _o, Co.errorCaptured = _o, Co.serverPrefetch = _o, Co.components = Po, Co.directives = Po, Co.watch = function(e, t) {
	if (!e) return t;
	if (!t) return e;
	const n = y(Object.create(null), e);
	for (const o in t) n[o] = _o(e[o], t[o]);
	return n
}, Co.provide = So, Co.inject = function(e, t) {
	return Po(ko(e), ko(t))
};
const wo = Co;

function So(e, t) {
	return t ? e ? function() {
		return y(P(e) ? e.call(this, this) : e, P(t) ? t.call(this, this) : t)
	} : t : e
}

function ko(e) {
	if (S(e)) {
		const t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t
	}
	return e
}

function _o(e, t) {
	return e ? [...new Set([].concat(e, t))] : t
}

function Po(e, t) {
	return e ? y(y(Object.create(null), e), t) : t
}

function Oo(e, t, n, o = !1) {
	const r = {},
		i = {};
	U(i, gr, 1), e.propsDefaults = Object.create(null), zo(e, t, r, i);
	for (const s in e.propsOptions[0]) !(s in r) && (r[s] = void 0);
	n ? e.props = o ? r : ct(r, !1, Be, tt, rt) : e.type.props ? e.props = r : e.props = i, e.attrs = i
}

function zo(e, t, n, o) {
	const [r, i] = e.propsOptions;
	let s, l = !1;
	if (t)
		for (let a in t) {
			if (B(a)) continue;
			const c = t[a];
			let u;
			r && w(r, u = H(a)) ? i && i.includes(u) ? (s || (s = {}))[u] = c : n[u] = c : !Jt(e.emitsOptions, a) && (!(a in o) || c !== o[a]) && (o[a] = c, l = !0)
		}
	if (i) {
		const t = ht(n),
			o = s || f;
		for (let s = 0; s < i.length; s++) {
			const l = i[s];
			n[l] = Eo(r, t, l, o[l], e, !w(o, l))
		}
	}
	return l
}

function Eo(e, t, n, o, r, i) {
	const s = e[n];
	if (null != s) {
		const e = w(s, "default");
		if (e && void 0 === o) {
			const e = s.default;
			if (s.type !== Function && P(e)) {
				const {
					propsDefaults: i
				} = r;
				n in i ? o = i[n] : (Mr(r), o = i[n] = e.call(null, t), Ar())
			} else o = e
		}
		s[0] && (i && !e ? o = !1 : s[1] && ("" === o || o === N(n)) && (o = !0))
	}
	return o
}

function To(e, t, n = !1) {
	const o = t.propsCache,
		r = o.get(e);
	if (r) return r;
	const i = e.props,
		s = {},
		l = [];
	let a = !1;
	if (!P(e)) {
		const o = e => {
			a = !0;
			const [n, o] = To(e, t, !0);
			y(s, n), o && l.push(...o)
		};
		!n && t.mixins.length && t.mixins.forEach(o), e.extends && o(e.extends), e.mixins && e.mixins.forEach(o)
	}
	if (!i && !a) return E(e) && o.set(e, p), p;
	if (S(i))
		for (let u = 0; u < i.length; u++) {
			const e = H(i[u]);
			Ro(e) && (s[e] = f)
		} else if (i)
			for (const u in i) {
				const e = H(u);
				if (Ro(e)) {
					const t = i[u],
						n = s[e] = S(t) || P(t) ? {
							type: t
						} : Object.assign({}, t);
					if (n) {
						const t = Ao(Boolean, n.type),
							o = Ao(String, n.type);
						n[0] = t > -1, n[1] = o < 0 || t < o, (t > -1 || w(n, "default")) && l.push(e)
					}
				}
			}
	const c = [s, l];
	return E(e) && o.set(e, c), c
}

function Ro(e) {
	return "$" !== e[0]
}

function jo(e) {
	const t = e && e.toString()
		.match(/^\s*(function|class) (\w+)/);
	return t ? t[2] : null === e ? "null" : ""
}

function Mo(e, t) {
	return jo(e) === jo(t)
}

function Ao(e, t) {
	return S(t) ? t.findIndex((t => Mo(t, e))) : P(t) && Mo(t, e) ? 0 : -1
}
const Fo = e => "_" === e[0] || "$stable" === e,
	Bo = e => S(e) ? e.map(kr) : [kr(e)],
	Lo = (e, t, n) => {
		if (t._n) return t;
		const o = sn(((...e) => Bo(t(...e))), n);
		return o._c = !1, o
	},
	Io = (e, t, n) => {
		const o = e._ctx;
		for (const r in e) {
			if (Fo(r)) continue;
			const n = e[r];
			if (P(n)) t[r] = Lo(0, n, o);
			else if (null != n) {
				const e = Bo(n);
				t[r] = () => e
			}
		}
	},
	Ho = (e, t) => {
		const n = Bo(t);
		e.slots.default = () => n
	},
	Do = (e, t) => {
		if (32 & e.vnode.shapeFlag) {
			const n = t._;
			n ? (e.slots = ht(t), U(t, "_", n)) : Io(t, e.slots = {})
		} else e.slots = {}, t && Ho(e, t);
		U(e.slots, gr, 1)
	},
	No = (e, t, n) => {
		const {
			vnode: o,
			slots: r
		} = e;
		let i = !0,
			s = f;
		if (32 & o.shapeFlag) {
			const e = t._;
			e ? n && 1 === e ? i = !1 : (y(r, t), !n && 1 === e && delete r._) : (i = !t.$stable, Io(t, r)), s = t
		} else if (t) {
			Ho(e, t);
			const n = {
				default: 1
			};
			s = n
		}
		if (i)
			for (const l in r) !Fo(l) && !(l in s) && delete r[l]
	};

function Wo() {
	const e = {};
	return e.isNativeTag = v, e.performance = !1, e.globalProperties = {}, e.optionMergeStrategies = {}, e.errorHandler = void 0, e.warnHandler = void 0, e.compilerOptions = {}, {
		app: null,
		config: e,
		mixins: [],
		components: {},
		directives: {},
		provides: Object.create(null),
		optionsCache: new WeakMap,
		propsCache: new WeakMap,
		emitsCache: new WeakMap
	}
}
let $o = 0;

function Vo(e, t) {
	return function(n, o = null) {
		!P(n) && (n = Object.assign({}, n)), null != o && !E(o) && (o = null);
		const r = Wo(),
			i = new Set;
		let s = !1;
		const l = r.app = {
			_uid: $o++,
			_component: n,
			_props: o,
			_container: null,
			_context: r,
			_instance: null,
			version: Ur,
			get config() {
				return r.config
			},
			set config(e) {},
			use: (e, ...t) => (i.has(e) || (e && P(e.install) ? (i.add(e), e.install(l, ...t)) : P(e) && (i.add(e), e(l, ...t))), l),
			mixin: e => (!r.mixins.includes(e) && r.mixins.push(e), l),
			component: (e, t) => t ? (r.components[e] = t, l) : r.components[e],
			directive: (e, t) => t ? (r.directives[e] = t, l) : r.directives[e],
			mount(i, a, c) {
				if (!s) {
					const u = xr(n, o);
					return u.appContext = r, a && t ? t(u, i) : e(u, i, c), s = !0, l._container = i, i.__vue_app__ = l, Dr(u.component) || u.component.proxy
				}
			},
			unmount() {
				s && (e(null, l._container), delete l._container.__vue_app__)
			},
			provide: (e, t) => (r.provides[e] = t, l)
		};
		return l
	}
}

function qo(e, t, n, o, r = !1) {
	if (S(e)) return void e.forEach(((e, i) => qo(e, t && (S(t) ? t[i] : t), n, o, r)));
	if (jn(o) && !r) return;
	const i = 4 & o.shapeFlag ? Dr(o.component) || o.component.proxy : o.el,
		s = r ? null : i,
		{
			i: l,
			r: a
		} = e,
		c = t && t.r,
		u = l.refs === f ? l.refs = {} : l.refs,
		d = l.setupState;
	if (null != c && c !== a && (O(c) ? (u[c] = null, w(d, c) && (d[c] = null)) : xt(c) && (c.value = null)), P(a)) Rt(a, l, 12, [s, u]);
	else {
		const t = O(a),
			o = xt(a);
		if (t || o) {
			const l = () => {
				if (e.f) {
					const n = t ? w(d, a) ? d[a] : u[a] : a.value;
					r ? S(n) && x(n, i) : S(n) ? !n.includes(i) && n.push(i) : t ? (u[a] = [i], w(d, a) && (d[a] = u[a])) : (a.value = [i], e.k && (u[e.k] = a.value))
				} else t ? (u[a] = s, w(d, a) && (d[a] = s)) : o && (a.value = s, e.k && (u[e.k] = s))
			};
			s ? (l.id = -1, Uo(l, n)) : l()
		}
	}
}
const Uo = function(e, t) {
	var n;
	t && t.pendingBranch ? S(e) ? t.effects.push(...e) : t.effects.push(e) : (S(n = e) ? It.push(...n) : (!Ht || !Ht.includes(n, n.allowRecurse ? Dt + 1 : Dt)) && It.push(n), qt())
};

function Go(e) {
	return function(e, t) {
		K()
			.__VUE__ = !0;
		const {
			insert: n,
			remove: o,
			patchProp: r,
			createElement: i,
			createText: s,
			createComment: l,
			setText: a,
			setElementText: c,
			parentNode: u,
			nextSibling: d,
			setScopeId: v = h,
			insertStaticContent: g
		} = e, m = (e, t, n, o = null, r = null, i = null, s = !1, l = null, a = !!t.dynamicChildren) => {
			if (e === t) return;
			e && !vr(e, t) && (o = J(e), U(e, r, i, !0), e = null), -2 === t.patchFlag && (a = !1, t.dynamicChildren = null);
			const {
				type: c,
				ref: u,
				shapeFlag: d
			} = t;
			switch (c) {
				case or:
					b(e, t, n, o);
					break;
				case rr:
					y(e, t, n, o);
					break;
				case ir:
					null == e && x(t, n, o, s);
					break;
				case nr:
					j(e, t, n, o, r, i, s, l, a);
					break;
				default:
					1 & d ? k(e, t, n, o, r, i, s, l, a) : 6 & d ? M(e, t, n, o, r, i, s, l, a) : (64 & d || 128 & d) && c.process(e, t, n, o, r, i, s, l, a, ne)
			}
			null != u && r && qo(u, e && e.ref, i, t || e, !t)
		}, b = (e, t, o, r) => {
			if (null == e) n(t.el = s(t.children), o, r);
			else {
				const n = t.el = e.el;
				t.children !== e.children && a(n, t.children)
			}
		}, y = (e, t, o, r) => {
			null == e ? n(t.el = l(t.children || ""), o, r) : t.el = e.el
		}, x = (e, t, n, o) => {
			[e.el, e.anchor] = g(e.children, t, n, o, e.el, e.anchor)
		}, C = ({
			el: e,
			anchor: t
		}, o, r) => {
			let i;
			for (; e && e !== t;) i = d(e), n(e, o, r), e = i;
			n(t, o, r)
		}, S = ({
			el: e,
			anchor: t
		}) => {
			let n;
			for (; e && e !== t;) n = d(e), o(e), e = n;
			o(t)
		}, k = (e, t, n, o, r, i, s, l, a) => {
			s = s || "svg" === t.type, null == e ? _(t, n, o, r, i, s, l, a) : z(e, t, r, i, s, l, a)
		}, _ = (e, t, o, s, l, a, u, d) => {
			let f, p;
			const {
				type: h,
				props: v,
				shapeFlag: g,
				transition: m,
				dirs: b
			} = e;
			if (f = e.el = i(e.type, a, v && v.is, v), 8 & g ? c(f, e.children) : 16 & g && O(e.children, f, null, s, l, a && "foreignObject" !== h, u, d), b && no(e, null, s, "created"), P(f, e, e.scopeId, u, s), v) {
				for (const t in v) "value" !== t && !B(t) && r(f, t, null, v[t], a, e.children, s, l, Y);
				"value" in v && r(f, "value", null, v.value), (p = v.onVnodeBeforeMount) && zr(p, s, e)
			}
			b && no(e, null, s, "beforeMount");
			const y = (!l || l && !l.pendingBranch) && m && !m.persisted;
			y && m.beforeEnter(f), n(f, t, o), ((p = v && v.onVnodeMounted) || y || b) && Uo((() => {
				p && zr(p, s, e), y && m.enter(f), b && no(e, null, s, "mounted")
			}), l)
		}, P = (e, t, n, o, r) => {
			if (n && v(e, n), o)
				for (let i = 0; i < o.length; i++) v(e, o[i]);
			if (r) {
				if (t === r.subTree) {
					const t = r.vnode;
					P(e, t, t.scopeId, t.slotScopeIds, r.parent)
				}
			}
		}, O = (e, t, n, o, r, i, s, l, a = 0) => {
			for (let c = a; c < e.length; c++) {
				const a = e[c] = l ? _r(e[c]) : kr(e[c]);
				m(null, a, t, n, o, r, i, s, l)
			}
		}, z = (e, t, n, o, i, s, l) => {
			const a = t.el = e.el;
			let {
				patchFlag: u,
				dynamicChildren: d,
				dirs: p
			} = t;
			u |= 16 & e.patchFlag;
			const h = e.props || f,
				v = t.props || f;
			let g;
			n && Xo(n, !1), (g = v.onVnodeBeforeUpdate) && zr(g, n, t, e), p && no(t, e, n, "beforeUpdate"), n && Xo(n, !0);
			const m = i && "foreignObject" !== t.type;
			if (d ? E(e.dynamicChildren, d, a, n, o, m, s) : !l && D(e, t, a, null, n, o, m, s, !1), u > 0) {
				if (16 & u) R(a, t, h, v, n, o, i);
				else if (2 & u && h.class !== v.class && r(a, "class", null, v.class, i), 4 & u && r(a, "style", h.style, v.style, i), 8 & u) {
					const s = t.dynamicProps;
					for (let t = 0; t < s.length; t++) {
						const l = s[t],
							c = h[l],
							u = v[l];
						(u !== c || "value" === l) && r(a, l, c, u, i, e.children, n, o, Y)
					}
				}
				1 & u && e.children !== t.children && c(a, t.children)
			} else !l && null == d && R(a, t, h, v, n, o, i);
			((g = v.onVnodeUpdated) || p) && Uo((() => {
				g && zr(g, n, t, e), p && no(t, e, n, "updated")
			}), o)
		}, E = (e, t, n, o, r, i, s) => {
			for (let l = 0; l < t.length; l++) {
				const a = e[l],
					c = t[l],
					d = a.el && (a.type === nr || !vr(a, c) || 70 & a.shapeFlag) ? u(a.el) : n;
				m(a, c, d, null, o, r, i, s, !0)
			}
		}, R = (e, t, n, o, i, s, l) => {
			if (n !== o) {
				if (n !== f)
					for (const a in n) !B(a) && !(a in o) && r(e, a, n[a], null, l, t.children, i, s, Y);
				for (const a in o) {
					if (B(a)) continue;
					const c = o[a],
						u = n[a];
					c !== u && "value" !== a && r(e, a, u, c, l, t.children, i, s, Y)
				}
				"value" in o && r(e, "value", n.value, o.value)
			}
		}, j = (e, t, o, r, i, l, a, c, u) => {
			const d = t.el = e ? e.el : s(""),
				f = t.anchor = e ? e.anchor : s("");
			let {
				patchFlag: p,
				dynamicChildren: h,
				slotScopeIds: v
			} = t;
			v && (c = c ? c.concat(v) : v), null == e ? (n(d, o, r), n(f, o, r), O(t.children, o, f, i, l, a, c, u)) : p > 0 && 64 & p && h && e.dynamicChildren ? (E(e.dynamicChildren, h, o, i, l, a, c), (null != t.key || i && t === i.subTree) && Zo(e, t, !0)) : D(e, t, o, f, i, l, a, c, u)
		}, M = (e, t, n, o, r, i, s, l, a) => {
			t.slotScopeIds = l, null == e ? 512 & t.shapeFlag ? r.ctx.activate(t, n, o, s, a) : A(t, n, o, r, i, s, a) : F(e, t, a)
		}, A = (e, t, n, o, r, i, s) => {
			const l = e.component = function(e, t, n) {
				const o = e.type,
					r = (t ? t.appContext : e.appContext) || Er,
					i = {
						uid: Tr++,
						vnode: e,
						type: o,
						parent: t,
						appContext: r,
						root: null,
						next: null,
						subTree: null,
						effect: null,
						update: null,
						scope: new Q(!0),
						render: null,
						proxy: null,
						exposed: null,
						exposeProxy: null,
						withProxy: null,
						provides: t ? t.provides : Object.create(r.provides),
						accessCache: null,
						renderCache: [],
						components: null,
						directives: null,
						propsOptions: To(o, r),
						emitsOptions: Qt(o, r),
						emit: null,
						emitted: null,
						propsDefaults: f,
						inheritAttrs: o.inheritAttrs,
						ctx: f,
						data: f,
						props: f,
						attrs: f,
						slots: f,
						refs: f,
						setupState: f,
						setupContext: null,
						suspense: n,
						suspenseId: n ? n.pendingId : 0,
						asyncDep: null,
						asyncResolved: !1,
						isMounted: !1,
						isUnmounted: !1,
						isDeactivated: !1,
						bc: null,
						c: null,
						bm: null,
						m: null,
						bu: null,
						u: null,
						um: null,
						bum: null,
						da: null,
						a: null,
						rtg: null,
						rtc: null,
						ec: null,
						sp: null
					};
				return i.ctx = {
					_: i
				}, i.root = t ? t.root : i, i.emit = Yt.bind(null, i), e.ce && e.ce(i), i
			}(e, o, r);
			if (Mn(e) && (l.ctx.renderer = ne), function(e, t = !1) {
				Lr = t;
				const {
					props: n,
					children: o
				} = e.vnode, r = Fr(e);
				Oo(e, n, r, t), Do(e, o);
				const i = r ? function(e, t) {
					const n = e.type;
					e.accessCache = Object.create(null), e.proxy = vt(new Proxy(e.ctx, ho));
					const {
						setup: o
					} = n;
					if (o) {
						const n = e.setupContext = o.length > 1 ? function(e) {
							const t = t => {
								e.exposed = t || {}
							};
							let n;
							return {
								get attrs() {
									return n || (t = e, n = new Proxy(t.attrs, {
										get: (e, n) => (ve(t, 0, "$attrs"), e[n])
									}));
									var t
								},
								slots: e.slots,
								emit: e.emit,
								expose: t
							}
						}(e) : null;
						Mr(e), pe();
						const r = Rt(o, e, 0, [e.props, n]);
						if (he(), Ar(), T(r)) {
							if (r.then(Ar, Ar), t) return r.then((n => {
									Ir(e, n, t)
								}))
								.catch((t => {
									Mt(t, e, 0)
								}));
							e.asyncDep = r
						} else Ir(e, r, t)
					} else Hr(e, t)
				}(e, t) : void 0;
				Lr = !1
			}(l), l.asyncDep) {
				if (r && r.registerDep(l, L), !e.el) {
					const e = l.subTree = xr(rr);
					y(null, e, t, n)
				}
			} else L(l, e, t, n, r, i, s)
		}, F = (e, t, n) => {
			const o = t.component = e.component;
			if (function(e, t, n) {
				const {
					props: o,
					children: r,
					component: i
				} = e, {
					props: s,
					children: l,
					patchFlag: a
				} = t, c = i.emitsOptions;
				if (t.dirs || t.transition) return !0;
				if (!(n && a >= 0)) return !(!r && !l || l && l.$stable) || o !== s && (o ? !s || un(o, s, c) : !!s);
				if (1024 & a) return !0;
				if (16 & a) return o ? un(o, s, c) : !!s;
				if (8 & a) {
					const e = t.dynamicProps;
					for (let t = 0; t < e.length; t++) {
						const n = e[t];
						if (s[n] !== o[n] && !Jt(c, n)) return !0
					}
				}
				return !1
			}(e, t, n)) {
				if (o.asyncDep && !o.asyncResolved) return void I(o, t, n);
				o.next = t,
					function(e) {
						const t = Bt.indexOf(e);
						t > Lt && Bt.splice(t, 1)
					}(o.update), o.update()
			} else t.el = e.el, o.vnode = t
		}, L = (e, t, n, o, r, i, s) => {
			const l = () => {
					if (e.isMounted) {
						let t, {
								next: n,
								bu: o,
								u: l,
								parent: a,
								vnode: c
							} = e,
							d = n;
						Xo(e, !1), n ? (n.el = c.el, I(e, n, s)) : n = c, o && q(o), (t = n.props && n.props.onVnodeBeforeUpdate) && zr(t, a, n, c), Xo(e, !0);
						const f = ln(e),
							p = e.subTree;
						e.subTree = f, m(p, f, u(p.el), J(p), e, r, i), n.el = f.el, null === d && function({
							vnode: e,
							parent: t
						}, n) {
							for (; t && t.subTree === e;)(e = t.vnode)
								.el = n, t = t.parent
						}(e, f.el), l && Uo(l, r), (t = n.props && n.props.onVnodeUpdated) && Uo((() => zr(t, a, n, c)), r)
					} else {
						let s;
						const {
							el: l,
							props: a
						} = t, {
							bm: c,
							m: u,
							parent: d
						} = e, f = jn(t);
						if (Xo(e, !1), c && q(c), !f && (s = a && a.onVnodeBeforeMount) && zr(s, d, t), Xo(e, !0), l && re) {
							const n = () => {
								e.subTree = ln(e), re(l, e.subTree, e, r, null)
							};
							f ? t.type.__asyncLoader()
								.then((() => !e.isUnmounted && n())) : n()
						} else {
							const s = e.subTree = ln(e);
							m(null, s, n, o, e, r, i), t.el = s.el
						}
						if (u && Uo(u, r), !f && (s = a && a.onVnodeMounted)) {
							const e = t;
							Uo((() => zr(s, d, e)), r)
						}(256 & t.shapeFlag || d && jn(d.vnode) && 256 & d.vnode.shapeFlag) && e.a && Uo(e.a, r), e.isMounted = !0, t = n = o = null
					}
				},
				a = e.effect = new ce(l, (() => Vt(c)), e.scope),
				c = e.update = () => a.run();
			c.id = e.uid, Xo(e, !0), c()
		}, I = (e, t, n) => {
			t.component = e;
			const o = e.vnode.props;
			e.vnode = t, e.next = null,
				function(e, t, n, o) {
					const {
						props: r,
						attrs: i,
						vnode: {
							patchFlag: s
						}
					} = e, l = ht(r), [a] = e.propsOptions;
					let c = !1;
					if (!(o || s > 0) || 16 & s) {
						let o;
						zo(e, t, r, i) && (c = !0);
						for (const i in l)(!t || !w(t, i) && ((o = N(i)) === i || !w(t, o))) && (a ? n && (void 0 !== n[i] || void 0 !== n[o]) && (r[i] = Eo(a, l, i, void 0, e, !0)) : delete r[i]);
						if (i !== l)
							for (const e in i)(!t || !w(t, e)) && (delete i[e], c = !0)
					} else if (8 & s) {
						const n = e.vnode.dynamicProps;
						for (let o = 0; o < n.length; o++) {
							let s = n[o];
							if (Jt(e.emitsOptions, s)) continue;
							const u = t[s];
							if (a)
								if (w(i, s)) u !== i[s] && (i[s] = u, c = !0);
								else {
									const t = H(s);
									r[t] = Eo(a, l, t, u, e, !1)
								}
							else u !== i[s] && (i[s] = u, c = !0)
						}
					}
					c && me(e, "set", "$attrs")
				}(e, t.props, o, n), No(e, t.children, n), pe(), Ut(), he()
		}, D = (e, t, n, o, r, i, s, l, a = !1) => {
			const u = e && e.children,
				d = e ? e.shapeFlag : 0,
				f = t.children,
				{
					patchFlag: p,
					shapeFlag: h
				} = t;
			if (p > 0) {
				if (128 & p) return void $(u, f, n, o, r, i, s, l, a);
				if (256 & p) return void W(u, f, n, o, r, i, s, l, a)
			}
			8 & h ? (16 & d && Y(u, r, i), f !== u && c(n, f)) : 16 & d ? 16 & h ? $(u, f, n, o, r, i, s, l, a) : Y(u, r, i, !0) : (8 & d && c(n, ""), 16 & h && O(f, n, o, r, i, s, l, a))
		}, W = (e, t, n, o, r, i, s, l, a) => {
			t = t || p;
			const c = (e = e || p)
				.length,
				u = t.length,
				d = Math.min(c, u);
			let f;
			for (f = 0; f < d; f++) {
				const o = t[f] = a ? _r(t[f]) : kr(t[f]);
				m(e[f], o, n, null, r, i, s, l, a)
			}
			c > u ? Y(e, r, i, !0, !1, d) : O(t, n, o, r, i, s, l, a, d)
		}, $ = (e, t, n, o, r, i, s, l, a) => {
			let c = 0;
			const u = t.length;
			let d = e.length - 1,
				f = u - 1;
			for (; c <= d && c <= f;) {
				const o = e[c],
					u = t[c] = a ? _r(t[c]) : kr(t[c]);
				if (!vr(o, u)) break;
				m(o, u, n, null, r, i, s, l, a), c++
			}
			for (; c <= d && c <= f;) {
				const o = e[d],
					c = t[f] = a ? _r(t[f]) : kr(t[f]);
				if (!vr(o, c)) break;
				m(o, c, n, null, r, i, s, l, a), d--, f--
			}
			if (c > d) {
				if (c <= f) {
					const e = f + 1,
						d = e < u ? t[e].el : o;
					for (; c <= f;) m(null, t[c] = a ? _r(t[c]) : kr(t[c]), n, d, r, i, s, l, a), c++
				}
			} else if (c > f)
				for (; c <= d;) U(e[c], r, i, !0), c++;
			else {
				const h = c,
					v = c,
					g = new Map;
				for (c = v; c <= f; c++) {
					const e = t[c] = a ? _r(t[c]) : kr(t[c]);
					null != e.key && g.set(e.key, c)
				}
				let b, y = 0;
				const x = f - v + 1;
				let C = !1,
					w = 0;
				const S = new Array(x);
				for (c = 0; c < x; c++) S[c] = 0;
				for (c = h; c <= d; c++) {
					const o = e[c];
					if (y >= x) {
						U(o, r, i, !0);
						continue
					}
					let u;
					if (null != o.key) u = g.get(o.key);
					else
						for (b = v; b <= f; b++)
							if (0 === S[b - v] && vr(o, t[b])) {
								u = b;
								break
							} void 0 === u ? U(o, r, i, !0) : (S[u - v] = c + 1, u >= w ? w = u : C = !0, m(o, t[u], n, null, r, i, s, l, a), y++)
				}
				const k = C ? function(e) {
					const t = e.slice(),
						n = [0];
					let o, r, i, s, l;
					const a = e.length;
					for (o = 0; o < a; o++) {
						const a = e[o];
						if (0 !== a) {
							if (r = n[n.length - 1], e[r] < a) {
								t[o] = r, n.push(o);
								continue
							}
							for (i = 0, s = n.length - 1; i < s;) l = i + s >> 1, e[n[l]] < a ? i = l + 1 : s = l;
							a < e[n[i]] && (i > 0 && (t[o] = n[i - 1]), n[i] = o)
						}
					}
					i = n.length, s = n[i - 1];
					for (; i-- > 0;) n[i] = s, s = t[s];
					return n
				}(S) : p;
				for (b = k.length - 1, c = x - 1; c >= 0; c--) {
					const e = v + c,
						d = t[e],
						f = e + 1 < u ? t[e + 1].el : o;
					0 === S[c] ? m(null, d, n, f, r, i, s, l, a) : C && (b < 0 || c !== k[b] ? V(d, n, f, 2) : b--)
				}
			}
		}, V = (e, t, o, r, i = null) => {
			const {
				el: s,
				type: l,
				transition: a,
				children: c,
				shapeFlag: u
			} = e;
			if (6 & u) return void V(e.component.subTree, t, o, r);
			if (128 & u) return void e.suspense.move(t, o, r);
			if (64 & u) return void l.move(e, t, o, ne);
			if (l === nr) {
				n(s, t, o);
				for (let e = 0; e < c.length; e++) V(c[e], t, o, r);
				return void n(e.anchor, t, o)
			}
			if (l === ir) return void C(e, t, o);
			if (2 !== r && 1 & u && a)
				if (0 === r) a.beforeEnter(s), n(s, t, o), Uo((() => a.enter(s)), i);
				else {
					const {
						leave: e,
						delayLeave: r,
						afterLeave: i
					} = a, l = () => n(s, t, o), c = () => {
						e(s, (() => {
							l(), i && i()
						}))
					};
					r ? r(s, l, c) : c()
				}
			else n(s, t, o)
		}, U = (e, t, n, o = !1, r = !1) => {
			const {
				type: i,
				props: s,
				ref: l,
				children: a,
				dynamicChildren: c,
				shapeFlag: u,
				patchFlag: d,
				dirs: f
			} = e;
			if (null != l && qo(l, null, n, e, !0), 256 & u) return void t.ctx.deactivate(e);
			const p = 1 & u && f,
				h = !jn(e);
			let v;
			if (h && (v = s && s.onVnodeBeforeUnmount) && zr(v, t, e), 6 & u) Z(e.component, n, o);
			else {
				if (128 & u) return void e.suspense.unmount(n, o);
				p && no(e, null, t, "beforeUnmount"), 64 & u ? e.type.remove(e, t, n, r, ne, o) : c && (i !== nr || d > 0 && 64 & d) ? Y(c, t, n, !1, !0) : (i === nr && 384 & d || !r && 16 & u) && Y(a, t, n), o && G(e)
			}(h && (v = s && s.onVnodeUnmounted) || p) && Uo((() => {
				v && zr(v, t, e), p && no(e, null, t, "unmounted")
			}), n)
		}, G = e => {
			const {
				type: t,
				el: n,
				anchor: r,
				transition: i
			} = e;
			if (t === nr) return void X(n, r);
			if (t === ir) return void S(e);
			const s = () => {
				o(n), i && !i.persisted && i.afterLeave && i.afterLeave()
			};
			if (1 & e.shapeFlag && i && !i.persisted) {
				const {
					leave: t,
					delayLeave: o
				} = i, r = () => t(n, s);
				o ? o(e.el, s, r) : r()
			} else s()
		}, X = (e, t) => {
			let n;
			for (; e !== t;) n = d(e), o(e), e = n;
			o(t)
		}, Z = (e, t, n) => {
			const {
				bum: o,
				scope: r,
				update: i,
				subTree: s,
				um: l
			} = e;
			o && q(o), r.stop(), i && (i.active = !1, U(s, e, t, n)), l && Uo(l, t), Uo((() => {
				e.isUnmounted = !0
			}), t), t && t.pendingBranch && !t.isUnmounted && e.asyncDep && !e.asyncResolved && e.suspenseId === t.pendingId && (t.deps--, 0 === t.deps && t.resolve())
		}, Y = (e, t, n, o = !1, r = !1, i = 0) => {
			for (let s = i; s < e.length; s++) U(e[s], t, n, o, r)
		}, J = e => 6 & e.shapeFlag ? J(e.component.subTree) : 128 & e.shapeFlag ? e.suspense.next() : d(e.anchor || e.el), ee = (e, t, n) => {
			null == e ? t._vnode && U(t._vnode, null, null, !0) : m(t._vnode || null, e, t, null, null, null, n), Ut(), Gt(), t._vnode = e
		}, te = {};
		te.p = m, te.um = U, te.m = V, te.r = G, te.mt = A, te.mc = O, te.pc = D, te.pbc = E, te.n = J, te.o = e;
		const ne = te;
		let oe, re;
		return t && ([oe, re] = t(ne)), {
			render: ee,
			hydrate: oe,
			createApp: Vo(ee, oe)
		}
	}(e)
}

function Xo({
	effect: e,
	update: t
}, n) {
	e.allowRecurse = t.allowRecurse = n
}

function Zo(e, t, n = !1) {
	const o = e.children,
		r = t.children;
	if (S(o) && S(r))
		for (let i = 0; i < o.length; i++) {
			const e = o[i];
			let t = r[i];
			1 & t.shapeFlag && !t.dynamicChildren && ((t.patchFlag <= 0 || 32 === t.patchFlag) && (t = r[i] = _r(r[i]), t.el = e.el), n || Zo(e, t)), t.type === or && (t.el = e.el)
		}
}
const Ko = e => e && (e.disabled || "" === e.disabled),
	Yo = e => "undefined" != typeof SVGElement && e instanceof SVGElement,
	Qo = (e, t) => {
		const n = e && e.to;
		if (O(n)) {
			if (t) {
				return t(n)
			}
			return null
		}
		return n
	};

function Jo(e, t, n, {
	o: {
		insert: o
	},
	m: r
}, i = 2) {
	0 === i && o(e.targetAnchor, t, n);
	const {
		el: s,
		anchor: l,
		shapeFlag: a,
		children: c,
		props: u
	} = e, d = 2 === i;
	if (d && o(s, t, n), (!d || Ko(u)) && 16 & a)
		for (let f = 0; f < c.length; f++) r(c[f], t, n, 2);
	d && o(l, t, n)
}
const er = {
	__isTeleport: !0,
	process(e, t, n, o, r, i, s, l, a, c) {
		const {
			mc: u,
			pc: d,
			pbc: f,
			o: {
				insert: p,
				querySelector: h,
				createText: v,
				createComment: g
			}
		} = c, m = Ko(t.props);
		let {
			shapeFlag: b,
			children: y,
			dynamicChildren: x
		} = t;
		if (null == e) {
			const e = t.el = v(""),
				c = t.anchor = v("");
			p(e, n, o), p(c, n, o);
			const d = t.target = Qo(t.props, h),
				f = t.targetAnchor = v("");
			d && (p(f, d), s = s || Yo(d));
			const g = (e, t) => {
				16 & b && u(y, e, t, r, i, s, l, a)
			};
			m ? g(n, c) : d && g(d, f)
		} else {
			t.el = e.el;
			const o = t.anchor = e.anchor,
				u = t.target = e.target,
				p = t.targetAnchor = e.targetAnchor,
				v = Ko(e.props),
				g = v ? n : u,
				b = v ? o : p;
			if (s = s || Yo(u), x ? (f(e.dynamicChildren, x, g, r, i, s, l), Zo(e, t, !0)) : !a && d(e, t, g, b, r, i, s, l, !1), m) !v && Jo(t, n, o, c, 1);
			else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
				const e = t.target = Qo(t.props, h);
				e && Jo(t, e, null, c, 0)
			} else v && Jo(t, u, p, c, 1)
		}
		tr(t)
	},
	remove(e, t, n, o, {
		um: r,
		o: {
			remove: i
		}
	}, s) {
		const {
			shapeFlag: l,
			children: a,
			anchor: c,
			targetAnchor: u,
			target: d,
			props: f
		} = e;
		if (d && i(u), (s || !Ko(f)) && (i(c), 16 & l))
			for (let p = 0; p < a.length; p++) {
				const e = a[p];
				r(e, t, n, !0, !!e.dynamicChildren)
			}
	},
	move: Jo,
	hydrate: function(e, t, n, o, r, i, {
		o: {
			nextSibling: s,
			parentNode: l,
			querySelector: a
		}
	}, c) {
		const u = t.target = Qo(t.props, a);
		if (u) {
			const a = u._lpa || u.firstChild;
			if (16 & t.shapeFlag)
				if (Ko(t.props)) t.anchor = c(s(e), t, l(e), n, o, r, i), t.targetAnchor = a;
				else {
					t.anchor = s(e);
					let l = a;
					for (; l;)
						if (l = s(l), l && 8 === l.nodeType && "teleport anchor" === l.data) {
							t.targetAnchor = l, u._lpa = t.targetAnchor && s(t.targetAnchor);
							break
						} c(a, t, u, n, o, r, i)
				} tr(t)
		}
		return t.anchor && s(t.anchor)
	}
};

function tr(e) {
	const t = e.ctx;
	if (t && t.ut) {
		let n = e.children[0].el;
		for (; n !== e.targetAnchor;) 1 === n.nodeType && n.setAttribute("data-v-owner", t.uid), n = n.nextSibling;
		t.ut()
	}
}
const nr = Symbol(void 0),
	or = Symbol(void 0),
	rr = Symbol(void 0),
	ir = Symbol(void 0),
	sr = [];
let lr = null;

function ar(e = !1) {
	sr.push(lr = e ? null : [])
}
let cr = 1;

function ur(e) {
	cr += e
}

function dr(e) {
	return e.dynamicChildren = cr > 0 ? lr || p : null, sr.pop(), lr = sr[sr.length - 1] || null, cr > 0 && lr && lr.push(e), e
}

function fr(e, t, n, o, r, i) {
	return dr(yr(e, t, n, o, r, i, !0))
}

function pr(e, t, n, o, r) {
	return dr(xr(e, t, n, o, r, !0))
}

function hr(e) {
	return !!e && !0 === e.__v_isVNode
}

function vr(e, t) {
	return e.type === t.type && e.key === t.key
}
const gr = "__vInternal",
	mr = ({
		key: e
	}) => null != e ? e : null,
	br = ({
		ref: e,
		ref_key: t,
		ref_for: n
	}) => null != e ? O(e) || xt(e) || P(e) ? {
		i: en,
		r: e,
		k: t,
		f: !!n
	} : e : null;

function yr(e, t = null, n = null, o = 0, r = null, i = (e === nr ? 0 : 1), s = !1, l = !1) {
	const a = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && mr(t),
		ref: t && br(t),
		scopeId: tn,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: i,
		patchFlag: o,
		dynamicProps: r,
		dynamicChildren: null,
		appContext: null,
		ctx: en
	};
	return l ? (Pr(a, n), 128 & i && e.normalize(a)) : n && (a.shapeFlag |= O(n) ? 8 : 16), cr > 0 && !s && lr && (a.patchFlag > 0 || 6 & i) && 32 !== a.patchFlag && lr.push(a), a
}
const xr = function(e, t = null, o = null, r = 0, i = null, s = !1) {
	if ((!e || e === ro) && (e = rr), hr(e)) {
		const n = Cr(e, t, !0);
		return o && Pr(n, o), cr > 0 && !s && lr && (6 & n.shapeFlag ? lr[lr.indexOf(e)] = n : lr.push(n)), n.patchFlag |= -2, n
	}
	if (function(e) {
		return P(e) && "__vccOpts" in e
	}(e) && (e = e.__vccOpts), t) {
		t = (a = t) ? pt(a) || gr in a ? y({}, a) : a : null;
		let {
			class: e,
			style: o
		} = t;
		e && !O(e) && (t.class = l(e)), E(o) && (pt(o) && !S(o) && (o = y({}, o)), t.style = n(o))
	}
	var a;
	const c = O(e) ? 1 : dn(e) ? 128 : (u = e, u.__isTeleport ? 64 : E(e) ? 4 : P(e) ? 2 : 0);
	var u;
	return yr(e, t, o, r, i, c, s, !0)
};

function Cr(e, t, n = !1) {
	const {
		props: o,
		ref: r,
		patchFlag: i,
		children: s
	} = e, l = t ? Or(o || {}, t) : o;
	return {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && mr(l),
		ref: t && t.ref ? n && r ? S(r) ? r.concat(br(t)) : [r, br(t)] : br(t) : r,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== nr ? -1 === i ? 16 : 16 | i : i,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: e.transition,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && Cr(e.ssContent),
		ssFallback: e.ssFallback && Cr(e.ssFallback),
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	}
}

function wr(e = " ", t = 0) {
	return xr(or, null, e, t)
}

function Sr(e = "", t = !1) {
	return t ? (ar(), pr(rr, null, e)) : xr(rr, null, e)
}

function kr(e) {
	return null == e || "boolean" == typeof e ? xr(rr) : S(e) ? xr(nr, null, e.slice()) : "object" == typeof e ? _r(e) : xr(or, null, String(e))
}

function _r(e) {
	return null === e.el && -1 !== e.patchFlag || e.memo ? e : Cr(e)
}

function Pr(e, t) {
	let n = 0;
	const {
		shapeFlag: o
	} = e;
	if (null == t) t = null;
	else if (S(t)) n = 16;
	else if ("object" == typeof t) {
		if (65 & o) {
			const n = t.default;
			return void(n && (n._c && (n._d = !1), Pr(e, n()), n._c && (n._d = !0)))
		} {
			n = 32;
			const o = t._;
			o || gr in t ? 3 === o && en && (1 === en.slots._ ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024)) : t._ctx = en
		}
	} else P(t) ? (t = {
		default: t,
		_ctx: en
	}, n = 32) : (t = String(t), 64 & o ? (n = 16, t = [wr(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n
}

function Or(...e) {
	const t = {};
	for (let o = 0; o < e.length; o++) {
		const r = e[o];
		for (const e in r)
			if ("class" === e) t.class !== r.class && (t.class = l([t.class, r.class]));
			else if ("style" === e) t.style = n([t.style, r.style]);
		else if (m(e)) {
			const n = t[e],
				o = r[e];
			o && n !== o && (!S(n) || !n.includes(o)) && (t[e] = n ? [].concat(n, o) : o)
		} else "" !== e && (t[e] = r[e])
	}
	return t
}

function zr(e, t, n, o = null) {
	jt(e, t, 7, [n, o])
}
const Er = Wo();
let Tr = 0;
let Rr = null;
const jr = () => Rr || en,
	Mr = e => {
		Rr = e, e.scope.on()
	},
	Ar = () => {
		Rr && Rr.scope.off(), Rr = null
	};

function Fr(e) {
	return 4 & e.vnode.shapeFlag
}
let Br, Lr = !1;

function Ir(e, t, n) {
	P(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : E(t) && (e.setupState = Pt(t)), Hr(e, n)
}

function Hr(e, t, n) {
	const o = e.type;
	if (!e.render) {
		if (!t && Br && !o.render) {
			const t = o.template || yo(e)
				.template;
			if (t) {
				const {
					isCustomElement: n,
					compilerOptions: r
				} = e.appContext.config, {
					delimiters: i,
					compilerOptions: s
				} = o, l = {};
				l.isCustomElement = n, l.delimiters = i;
				const a = y(y(l, r), s);
				o.render = Br(t, a)
			}
		}
		e.render = o.render || h
	}
	Mr(e), pe(), go(e), he(), Ar()
}

function Dr(e) {
	if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(Pt(vt(e.exposed)), {
		get: (t, n) => n in t ? t[n] : n in fo ? fo[n](e) : void 0,
		has: (e, t) => t in e || t in fo
	}))
}

function Nr(e, t = !0) {
	return P(e) ? e.displayName || e.name : e.name || t && e.__name
}
const Wr = (e, t) => function(e, t, n = !1) {
	let o, r;
	const i = P(e);
	return i ? (o = e, r = h) : (o = e.get, r = e.set), new Tt(o, r, i || !r, n)
}(e, 0, Lr);

function $r(e, t, n) {
	const o = arguments.length;
	return 2 === o ? E(t) && !S(t) ? hr(t) ? xr(e, null, [t]) : xr(e, t) : xr(e, null, t) : (o > 3 ? n = Array.prototype.slice.call(arguments, 2) : 3 === o && hr(n) && (n = [n]), xr(e, t, n))
}
const Vr = Symbol(""),
	qr = () => pn(Vr),
	Ur = "3.2.47",
	Gr = "undefined" != typeof document ? document : null,
	Xr = Gr && Gr.createElement("template"),
	Zr = {
		insert: (e, t, n) => {
			t.insertBefore(e, n || null)
		},
		remove: e => {
			const t = e.parentNode;
			t && t.removeChild(e)
		},
		createElement: (e, t, n, o) => {
			const r = t ? Gr.createElementNS("http://www.w3.org/2000/svg", e) : Gr.createElement(e, n ? {
				is: n
			} : void 0);
			return "select" === e && o && null != o.multiple && r.setAttribute("multiple", o.multiple), r
		},
		createText: e => Gr.createTextNode(e),
		createComment: e => Gr.createComment(e),
		setText: (e, t) => {
			e.nodeValue = t
		},
		setElementText: (e, t) => {
			e.textContent = t
		},
		parentNode: e => e.parentNode,
		nextSibling: e => e.nextSibling,
		querySelector: e => Gr.querySelector(e),
		setScopeId(e, t) {
			e.setAttribute(t, "")
		},
		insertStaticContent(e, t, n, o, r, i) {
			const s = n ? n.previousSibling : t.lastChild;
			if (r && (r === i || r.nextSibling))
				for (; t.insertBefore(r.cloneNode(!0), n), r !== i && (r = r.nextSibling););
			else {
				Xr.innerHTML = o ? "<svg>" + e + "</svg>" : e;
				const r = Xr.content;
				if (o) {
					const e = r.firstChild;
					for (; e.firstChild;) r.appendChild(e.firstChild);
					r.removeChild(e)
				}
				t.insertBefore(r, n)
			}
			return [s ? s.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
		}
	};
const Kr = /\s*!important$/;

function Yr(e, t, n) {
	if (S(n)) n.forEach((n => Yr(e, t, n)));
	else if (null == n && (n = ""), t.startsWith("--")) e.setProperty(t, n);
	else {
		const o = function(e, t) {
			const n = Jr[t];
			if (n) return n;
			let o = H(t);
			if ("filter" !== o && o in e) return Jr[t] = o;
			o = W(o);
			for (let r = 0; r < Qr.length; r++) {
				const n = Qr[r] + o;
				if (n in e) return Jr[t] = n
			}
			return t
		}(e, t);
		Kr.test(n) ? e.setProperty(N(o), n.replace(Kr, ""), "important") : e[o] = n
	}
}
const Qr = ["Webkit", "Moz", "ms"],
	Jr = {};
const ei = "http://www.w3.org/1999/xlink";

function ti(e, t, n, o, r = null) {
	const i = e._vei || (e._vei = {}),
		s = i[t];
	if (o && s) s.value = o;
	else {
		const [n, p] = function(e) {
			let t;
			if (ni.test(e)) {
				let n;
				for (t = {}; n = e.match(ni);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0
			}
			return [":" === e[2] ? e.slice(3) : N(e.slice(2)), t]
		}(t);
		if (o) {
			const s = i[t] = function(e, t) {
				const n = e => {
					if (e._vts) {
						if (e._vts <= n.attached) return
					} else e._vts = Date.now();
					jt(function(e, t) {
						if (S(t)) {
							const n = e.stopImmediatePropagation;
							return e.stopImmediatePropagation = () => {
								n.call(e), e._stopped = !0
							}, t.map((e => t => !t._stopped && e && e(t)))
						}
						return t
					}(e, n.value), t, 5, [e])
				};
				return n.value = e, n.attached = ii(), n
			}(o, r);
			u = n, d = s, f = p, e.addEventListener(u, d, f)
		} else s && (l = n, a = s, c = p, e.removeEventListener(l, a, c), i[t] = void 0)
	}
	var l, a, c, u, d, f
}
const ni = /(?:Once|Passive|Capture)$/;
let oi = 0;
const ri = Promise.resolve(),
	ii = () => oi || (ri.then((() => oi = 0)), oi = Date.now());
const si = /^on[a-z]/;
const li = "transition",
	ai = "animation",
	ci = (e, {
		slots: t
	}) => $r(kn, gi(e), t);
ci.displayName = "Transition";
const ui = {};
ui.type = Boolean, ui.default = !0;
const di = {};
di.name = String, di.type = String, di.css = ui, di.duration = [String, Number, Object], di.enterFromClass = String, di.enterActiveClass = String, di.enterToClass = String, di.appearFromClass = String, di.appearActiveClass = String, di.appearToClass = String, di.leaveFromClass = String, di.leaveActiveClass = String, di.leaveToClass = String;
const fi = di,
	pi = ci.props = y({}, kn.props, fi),
	hi = (e, t = []) => {
		S(e) ? e.forEach((e => e(...t))) : e && e(...t)
	},
	vi = e => !!e && (S(e) ? e.some((e => e.length > 1)) : e.length > 1);

function gi(e) {
	const t = {};
	for (const y in e) !(y in fi) && (t[y] = e[y]);
	if (!1 === e.css) return t;
	const {
		name: n = "v",
		type: o,
		duration: r,
		enterFromClass: i = n + "-enter-from",
		enterActiveClass: s = n + "-enter-active",
		enterToClass: l = n + "-enter-to",
		appearFromClass: a = i,
		appearActiveClass: c = s,
		appearToClass: u = l,
		leaveFromClass: d = n + "-leave-from",
		leaveActiveClass: f = n + "-leave-active",
		leaveToClass: p = n + "-leave-to"
	} = e, h = function(e) {
		if (null == e) return null;
		if (E(e)) return [mi(e.enter), mi(e.leave)]; {
			const t = mi(e);
			return [t, t]
		}
	}(r), v = h && h[0], g = h && h[1], {
		onBeforeEnter: m,
		onEnter: b,
		onEnterCancelled: x,
		onLeave: C,
		onLeaveCancelled: w,
		onBeforeAppear: S = m,
		onAppear: k = b,
		onAppearCancelled: _ = x
	} = t, P = (e, t, n) => {
		yi(e, t ? u : l), yi(e, t ? c : s), n && n()
	}, O = (e, t) => {
		e._isLeaving = !1, yi(e, d), yi(e, p), yi(e, f), t && t()
	}, z = e => (t, n) => {
		const r = e ? k : b,
			s = () => P(t, e, n);
		hi(r, [t, s]), xi((() => {
			yi(t, e ? a : i), bi(t, e ? u : l), !vi(r) && wi(t, o, v, s)
		}))
	};
	return y(t, {
		onBeforeEnter(e) {
			hi(m, [e]), bi(e, i), bi(e, s)
		},
		onBeforeAppear(e) {
			hi(S, [e]), bi(e, a), bi(e, c)
		},
		onEnter: z(!1),
		onAppear: z(!0),
		onLeave(e, t) {
			e._isLeaving = !0;
			const n = () => O(e, t);
			bi(e, d), Pi(), bi(e, f), xi((() => {
				e._isLeaving && (yi(e, d), bi(e, p), !vi(C) && wi(e, o, g, n))
			})), hi(C, [e, n])
		},
		onEnterCancelled(e) {
			P(e, !1), hi(x, [e])
		},
		onAppearCancelled(e) {
			P(e, !0), hi(_, [e])
		},
		onLeaveCancelled(e) {
			O(e), hi(w, [e])
		}
	})
}

function mi(e) {
	return X(e)
}

function bi(e, t) {
	t.split(/\s+/)
		.forEach((t => t && e.classList.add(t))), (e._vtc || (e._vtc = new Set))
		.add(t)
}

function yi(e, t) {
	t.split(/\s+/)
		.forEach((t => t && e.classList.remove(t)));
	const {
		_vtc: n
	} = e;
	n && (n.delete(t), !n.size && (e._vtc = void 0))
}

function xi(e) {
	requestAnimationFrame((() => {
		requestAnimationFrame(e)
	}))
}
let Ci = 0;

function wi(e, t, n, o) {
	const r = e._endId = ++Ci,
		i = () => {
			r === e._endId && o()
		};
	if (n) return setTimeout(i, n);
	const {
		type: s,
		timeout: l,
		propCount: a
	} = Si(e, t);
	if (!s) return o();
	const c = s + "end";
	let u = 0;
	const d = () => {
			e.removeEventListener(c, f), i()
		},
		f = t => {
			t.target === e && ++u >= a && d()
		};
	setTimeout((() => {
		u < a && d()
	}), l + 1), e.addEventListener(c, f)
}

function Si(e, t) {
	const n = window.getComputedStyle(e),
		o = e => (n[e] || "")
		.split(", "),
		r = o(li + "Delay"),
		i = o(li + "Duration"),
		s = ki(r, i),
		l = o(ai + "Delay"),
		a = o(ai + "Duration"),
		c = ki(l, a);
	let u = null,
		d = 0,
		f = 0;
	t === li ? s > 0 && (u = li, d = s, f = i.length) : t === ai ? c > 0 && (u = ai, d = c, f = a.length) : (d = Math.max(s, c), u = d > 0 ? s > c ? li : ai : null, f = u ? u === li ? i.length : a.length : 0);
	const p = u === li && /\b(transform|all)(,|$)/.test(o(li + "Property")
			.toString()),
		h = {};
	return h.type = u, h.timeout = d, h.propCount = f, h.hasTransform = p, h
}

function ki(e, t) {
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max(...t.map(((t, n) => _i(t) + _i(e[n]))))
}

function _i(e) {
	return 1e3 * Number(e.slice(0, -1)
		.replace(",", "."))
}

function Pi() {
	return document.body.offsetHeight
}
const Oi = new WeakMap,
	zi = new WeakMap,
	Ei = {};
Ei.tag = String, Ei.moveClass = String;
const Ti = {
	name: "TransitionGroup",
	props: y({}, pi, Ei),
	setup(e, {
		slots: t
	}) {
		const n = jr(),
			o = Cn();
		let r, i;
		return Xn((() => {
			if (!r.length) return;
			const t = e.moveClass || (e.name || "v") + "-move";
			if (! function(e, t, n) {
				const o = e.cloneNode();
				e._vtc && e._vtc.forEach((e => {
						e.split(/\s+/)
							.forEach((e => e && o.classList.remove(e)))
					})), n.split(/\s+/)
					.forEach((e => e && o.classList.add(e))), o.style.display = "none";
				const r = 1 === t.nodeType ? t : t.parentNode;
				r.appendChild(o);
				const {
					hasTransform: i
				} = Si(o);
				return r.removeChild(o), i
			}(r[0].el, n.vnode.el, t)) return;
			r.forEach(ji), r.forEach(Mi);
			const o = r.filter(Ai);
			Pi(), o.forEach((e => {
				const n = e.el,
					o = n.style;
				bi(n, t), o.transform = o.webkitTransform = o.transitionDuration = "";
				const r = n._moveCb = e => {
					e && e.target !== n || (!e || /transform$/.test(e.propertyName)) && (n.removeEventListener("transitionend", r), n._moveCb = null, yi(n, t))
				};
				n.addEventListener("transitionend", r)
			}))
		})), () => {
			const s = ht(e),
				l = gi(s);
			let a = s.tag || nr;
			r = i, i = t.default ? Tn(t.default()) : [];
			for (let e = 0; e < i.length; e++) {
				const t = i[e];
				null != t.key && En(t, Pn(t, l, o, n))
			}
			if (r)
				for (let e = 0; e < r.length; e++) {
					const t = r[e];
					En(t, Pn(t, l, o, n)), Oi.set(t, t.el.getBoundingClientRect())
				}
			return xr(a, null, i)
		}
	}
};
delete Ti.props.mode;
const Ri = Ti;

function ji(e) {
	const t = e.el;
	t._moveCb && t._moveCb(), t._enterCb && t._enterCb()
}

function Mi(e) {
	zi.set(e, e.el.getBoundingClientRect())
}

function Ai(e) {
	const t = Oi.get(e),
		n = zi.get(e),
		o = t.left - n.left,
		r = t.top - n.top;
	if (o || r) {
		const t = e.el.style;
		return t.transform = t.webkitTransform = "translate(" + o + "px," + r + "px)", t.transitionDuration = "0s", e
	}
}
const Fi = {
	beforeMount(e, {
		value: t
	}, {
		transition: n
	}) {
		e._vod = "none" === e.style.display ? "" : e.style.display, n && t ? n.beforeEnter(e) : Bi(e, t)
	},
	mounted(e, {
		value: t
	}, {
		transition: n
	}) {
		n && t && n.enter(e)
	},
	updated(e, {
		value: t,
		oldValue: n
	}, {
		transition: o
	}) {
		!t != !n && (o ? t ? (o.beforeEnter(e), Bi(e, !0), o.enter(e)) : o.leave(e, (() => {
			Bi(e, !1)
		})) : Bi(e, t))
	},
	beforeUnmount(e, {
		value: t
	}) {
		Bi(e, t)
	}
};

function Bi(e, t) {
	e.style.display = t ? e._vod : "none"
}
const Li = {};
Li.patchProp = (e, t, n, o, r = !1, i, s, l, u) => {
	"class" === t ? function(e, t, n) {
		const o = e._vtc;
		o && (t = (t ? [t, ...o] : [...o])
			.join(" ")), null == t ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
	}(e, o, r) : "style" === t ? function(e, t, n) {
		const o = e.style,
			r = O(n);
		if (n && !r) {
			if (t && !O(t))
				for (const e in t) null == n[e] && Yr(o, e, "");
			for (const e in n) Yr(o, e, n[e])
		} else {
			const i = o.display;
			r ? t !== n && (o.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (o.display = i)
		}
	}(e, n, o) : m(t) ? !b(t) && ti(e, t, 0, o, s) : ("." === t[0] ? (t = t.slice(1), 1) : "^" === t[0] ? (t = t.slice(1), 0) : function(e, t, n, o) {
		if (o) return "innerHTML" === t || "textContent" === t || !!(t in e && si.test(t) && P(n));
		return "spellcheck" !== t && "draggable" !== t && "translate" !== t && ("form" !== t && (("list" !== t || "INPUT" !== e.tagName) && (("type" !== t || "TEXTAREA" !== e.tagName) && ((!si.test(t) || !O(n)) && t in e))))
	}(e, t, o, r)) ? function(e, t, n, o, r, i, s) {
		if ("innerHTML" === t || "textContent" === t) return o && s(o, r, i), void(e[t] = null == n ? "" : n);
		if ("value" === t && "PROGRESS" !== e.tagName && !e.tagName.includes("-")) {
			e._value = n;
			const o = null == n ? "" : n;
			return (e.value !== o || "OPTION" === e.tagName) && (e.value = o), void(null == n && e.removeAttribute(t))
		}
		let l = !1;
		if ("" === n || null == n) {
			const o = typeof e[t];
			"boolean" === o ? n = c(n) : null == n && "string" === o ? (n = "", l = !0) : "number" === o && (n = 0, l = !0)
		}
		try {
			e[t] = n
		} catch (a) {}
		l && e.removeAttribute(t)
	}(e, t, o, i, s, l, u) : ("true-value" === t ? e._trueValue = o : "false-value" === t && (e._falseValue = o), function(e, t, n, o, r) {
		if (o && t.startsWith("xlink:")) null == n ? e.removeAttributeNS(ei, t.slice(6, t.length)) : e.setAttributeNS(ei, t, n);
		else {
			const o = a(t);
			null == n || o && !c(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n)
		}
	}(e, t, o, r))
};
const Ii = y(Li, Zr);
let Hi;
const Di = (...e) => {
	const t = (Hi || (Hi = Go(Ii)))
		.createApp(...e),
		{
			mount: n
		} = t;
	return t.mount = e => {
		const o = function(e) {
			if (O(e)) {
				return document.querySelector(e)
			}
			return e
		}(e);
		if (!o) return;
		const r = t._component;
		!P(r) && !r.render && !r.template && (r.template = o.innerHTML), o.innerHTML = "";
		const i = n(o, !1, o instanceof SVGElement);
		return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i
	}, t
};

function Ni(e) {
	return e.composedPath()[0] || null
}

function Wi(e) {
	return "string" == typeof e ? e.endsWith("px") ? Number(e.slice(0, e.length - 2)) : Number(e) : e
}

function $i(e) {
	if (null != e) return "number" == typeof e ? e + "px" : e.endsWith("px") ? e : e + "px"
}

function Vi(e, t) {
	const n = e.trim()
		.split(/\s+/g),
		o = {};
	o.top = n[0];
	const r = o;
	switch (n.length) {
		case 1:
			r.right = n[0], r.bottom = n[0], r.left = n[0];
			break;
		case 2:
			r.right = n[1], r.left = n[1], r.bottom = n[0];
			break;
		case 3:
			r.right = n[1], r.bottom = n[2], r.left = n[1];
			break;
		case 4:
			r.right = n[1], r.bottom = n[2], r.left = n[3];
			break;
		default:
			throw new Error("[seemly/getMargin]:" + e + " is not a valid value.")
	}
	return void 0 === t ? r : r[t]
}

function qi(e, t) {
	const [n, o] = e.split(" "), r = {};
	return r.row = n, r.col = o || n, t ? "row" === t ? n : o : r
}
const Ui = {
		black: "#000",
		silver: "#C0C0C0",
		gray: "#808080",
		white: "#FFF",
		maroon: "#800000",
		red: "#F00",
		purple: "#800080",
		fuchsia: "#F0F",
		green: "#008000",
		lime: "#0F0",
		olive: "#808000",
		yellow: "#FF0",
		navy: "#000080",
		blue: "#00F",
		teal: "#008080",
		aqua: "#0FF",
		transparent: "#0000"
	},
	Gi = Ui,
	Xi = "^\\s*",
	Zi = "\\s*$",
	Ki = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*",
	Yi = "([0-9A-Fa-f])",
	Qi = "([0-9A-Fa-f]{2})",
	Ji = new RegExp(Xi + "rgb\\s*\\(" + Ki + "," + Ki + "," + Ki + "\\)" + Zi),
	es = new RegExp(Xi + "rgba\\s*\\(" + Ki + "," + Ki + "," + Ki + "," + Ki + "\\)" + Zi),
	ts = new RegExp(Xi + "#" + Yi + Yi + Yi + Zi),
	ns = new RegExp(Xi + "#" + Qi + Qi + Qi + Zi),
	os = new RegExp(Xi + "#" + Yi + Yi + Yi + Yi + Zi),
	rs = new RegExp(Xi + "#" + Qi + Qi + Qi + Qi + Zi);

function is(e) {
	return parseInt(e, 16)
}

function ss(e) {
	try {
		let t;
		if (t = ns.exec(e)) return [is(t[1]), is(t[2]), is(t[3]), 1];
		if (t = Ji.exec(e)) return [ps(t[1]), ps(t[5]), ps(t[9]), 1];
		if (t = es.exec(e)) return [ps(t[1]), ps(t[5]), ps(t[9]), fs(t[13])];
		if (t = ts.exec(e)) return [is(t[1] + t[1]), is(t[2] + t[2]), is(t[3] + t[3]), 1];
		if (t = rs.exec(e)) return [is(t[1]), is(t[2]), is(t[3]), fs(is(t[4]) / 255)];
		if (t = os.exec(e)) return [is(t[1] + t[1]), is(t[2] + t[2]), is(t[3] + t[3]), fs(is(t[4] + t[4]) / 255)];
		if (e in Gi) return ss(Gi[e]);
		throw new Error("[seemly/rgba]: Invalid color value " + e + ".")
	} catch (t) {
		throw t
	}
}

function ls(e, t, n, o) {
	return "rgba(" + ps(e) + ", " + ps(t) + ", " + ps(n) + ", " + (((r = o) > 1 ? 1 : r < 0 ? 0 : r) + ")");
	var r
}

function as(e, t, n, o, r) {
	return ps((e * t * (1 - o) + n * o) / r)
}

function cs(e, t) {
	Array.isArray(e) || (e = ss(e)), Array.isArray(t) || (t = ss(t));
	const n = e[3],
		o = t[3],
		r = fs(n + o - n * o);
	return ls(as(e[0], n, t[0], o, r), as(e[1], n, t[1], o, r), as(e[2], n, t[2], o, r), r)
}

function us(e, t) {
	const [n, o, r, i = 1] = Array.isArray(e) ? e : ss(e);
	return t.alpha ? ls(n, o, r, t.alpha) : ls(n, o, r, i)
}

function ds(e, t) {
	const [n, o, r, i = 1] = Array.isArray(e) ? e : ss(e), {
		lightness: s = 1,
		alpha: l = 1
	} = t;
	return function(e) {
		const [t, n, o] = e;
		return 3 in e ? "rgba(" + ps(t) + ", " + ps(n) + ", " + ps(o) + ", " + fs(e[3]) + ")" : "rgba(" + ps(t) + ", " + ps(n) + ", " + ps(o) + ", 1)"
	}([n * s, o * s, r * s, i * l])
}

function fs(e) {
	const t = Math.round(100 * Number(e)) / 100;
	return t > 1 ? 1 : t < 0 ? 0 : t
}

function ps(e) {
	const t = Math.round(Number(e));
	return t > 255 ? 255 : t < 0 ? 0 : t
}

function hs(e = 8) {
	return Math.random()
		.toString(16)
		.slice(2, 2 + e)
}

function vs(e, t) {
	const n = [];
	for (let o = 0; o < e; ++o) n.push(t);
	return n
}

function gs(e, t = [], n) {
	const o = {};
	return t.forEach((t => {
		o[t] = e[t]
	})), Object.assign(o, n)
}

function ms(e, t = [], n) {
	const o = {};
	return Object.getOwnPropertyNames(e)
		.forEach((n => {
			!t.includes(n) && (o[n] = e[n])
		})), Object.assign(o, n)
}

function bs(e, t = !0, n = []) {
	return e.forEach((e => {
		if (null !== e)
			if ("object" == typeof e)
				if (Array.isArray(e)) bs(e, t, n);
				else if (e.type === nr) {
			if (null === e.children) return;
			Array.isArray(e.children) && bs(e.children, t, n)
		} else e.type !== rr && n.push(e);
		else("string" == typeof e || "number" == typeof e) && n.push(wr(String(e)))
	})), n
}

function ys(e, ...t) {
	if (!Array.isArray(e)) return e(...t);
	e.forEach((e => ys(e, ...t)))
}

function xs(e) {
	return Object.keys(e)
}
const Cs = (e, ...t) => "function" == typeof e ? e(...t) : "string" == typeof e ? wr(e) : "number" == typeof e ? wr(String(e)) : null;

function ws(e, t) {
	console.error("[naive/" + e + "]: " + t)
}

function Ss(e, t) {
	throw new Error("[naive/" + e + "]: " + t)
}

function ks(e, t = "default", n = void 0) {
	const o = e[t];
	if (!o) return ws("getFirstSlotVNode", "slot[" + t + "] is empty"), null;
	const r = bs(o(n));
	return 1 === r.length ? r[0] : (ws("getFirstSlotVNode", "slot[" + t + "] should have exactly one child"), null)
}

function _s(e) {
	return e
}

function Ps(e) {
	return e.some((e => !hr(e) || e.type !== rr && !(e.type === nr && !Ps(e.children)))) ? e : null
}

function Os(e, t) {
	return e && Ps(e()) || t()
}

function zs(e, t, n) {
	return e && Ps(e(t)) || n(t)
}

function Es(e, t) {
	return t(e && Ps(e()) || null)
}

function Ts(e, t, n) {
	return n(e && Ps(e(t)) || null)
}

function Rs(e) {
	return !(e && Ps(e()))
}
const js = Rn({
	render() {
		var e, t;
		return null === (t = (e = this.$slots)
			.default) || void 0 === t ? void 0 : t.call(e)
	}
});

function Ms(e) {
	return e.replace(/#|\(|\)|,|\s/g, "_")
}
const As = /\s*,(?![^(]*\))\s*/g,
	Fs = /\s+/g;

function Bs(e) {
	let t = [""];
	return e.forEach((e => {
			(e = e && e.trim()) && (t = e.includes("&") ? function(e, t) {
				const n = [];
				return t.split(As)
					.forEach((t => {
						let o = function(e) {
							let t = 0;
							for (let n = 0; n < e.length; ++n) "&" === e[n] && ++t;
							return t
						}(t);
						if (!o) return void e.forEach((e => {
							n.push((e && e + " ") + t)
						}));
						if (1 === o) return void e.forEach((e => {
							n.push(t.replace("&", e))
						}));
						let r = [t];
						for (; o--;) {
							const t = [];
							r.forEach((n => {
								e.forEach((e => {
									t.push(n.replace("&", e))
								}))
							})), r = t
						}
						r.forEach((e => n.push(e)))
					})), n
			}(t, e) : function(e, t) {
				const n = [];
				return t.split(As)
					.forEach((t => {
						e.forEach((e => {
							n.push((e && e + " ") + t)
						}))
					})), n
			}(t, e))
		})), t.join(", ")
		.replace(Fs, " ")
}

function Ls(e) {
	if (!e) return;
	const t = e.parentElement;
	t && t.removeChild(e)
}

function Is(e) {
	return document.querySelector('style[cssr-id="' + e + '"]')
}

function Hs(e) {
	return !!e && /^\s*@(s|m)/.test(e)
}
const Ds = /[A-Z]/g;

function Ns(e) {
	return e.replace(Ds, (e => "-" + e.toLowerCase()))
}

function Ws(e, t, n, o) {
	if (!t) return "";
	const r = function(e, t, n) {
		if ("function" == typeof e) {
			const o = {};
			return o.context = t.context, o.props = n, e(o)
		}
		return e
	}(t, n, o);
	if (!r) return "";
	if ("string" == typeof r) return e + " {\n" + r + "\n}";
	const i = Object.keys(r);
	if (0 === i.length) return n.config.keepEmptyBlock ? e + " {\n}" : "";
	const s = e ? [e + " {"] : [];
	return i.forEach((e => {
		const t = r[e];
		"raw" !== e ? (e = Ns(e), null != t && s.push("  " + e + function(e, t = "  ") {
			return "object" == typeof e && null !== e ? " {\n" + Object.entries(e)
				.map((e => t + "  " + Ns(e[0]) + ": " + e[1] + ";"))
				.join("\n") + "\n" + t + "}" : ": " + e + ";"
		}(t))) : s.push("\n" + t + "\n")
	})), e && s.push("}"), s.join("\n")
}

function $s(e, t, n) {
	e && e.forEach((e => {
		if (Array.isArray(e)) $s(e, t, n);
		else if ("function" == typeof e) {
			const o = e(t);
			Array.isArray(o) ? $s(o, t, n) : o && n(o)
		} else e && n(e)
	}))
}

function Vs(e, t, n, o, r, i) {
	const s = e.$;
	let l = "";
	if (s && "string" != typeof s)
		if ("function" == typeof s) {
			const e = {};
			e.context = o.context, e.props = r;
			const n = s(e);
			Hs(n) ? l = n : t.push(n)
		} else if (s.before && s.before(o.context), s.$ && "string" != typeof s.$) {
		if (s.$) {
			const e = {};
			e.context = o.context, e.props = r;
			const n = s.$(e);
			Hs(n) ? l = n : t.push(n)
		}
	} else Hs(s.$) ? l = s.$ : t.push(s.$);
	else Hs(s) ? l = s : t.push(s);
	const a = Bs(t),
		c = Ws(a, e.props, o, r);
	if (l ? (n.push(l + " {"), i && c && i.insertRule(l + " {\n" + c + "\n}\n")) : (i && c && i.insertRule(c), !i && c.length && n.push(c)), e.children) {
		const s = {};
		s.context = o.context, s.props = r, $s(e.children, s, (e => {
			if ("string" == typeof e) {
				const t = {};
				t.raw = e;
				const s = Ws(a, t, o, r);
				i ? i.insertRule(s) : n.push(s)
			} else Vs(e, t, n, o, r, i)
		}))
	}
	t.pop(), l && n.push("}"), s && s.after && s.after(o.context)
}

function qs(e, t, n, o = !1) {
	const r = [];
	return Vs(e, [], r, t, n, o ? e.instance.__styleSheet : void 0), o ? "" : r.join("\n\n")
}

function Us(e) {
	for (var t, n = 0, o = 0, r = e.length; r >= 4; ++o, r -= 4) t = 1540483477 * (65535 & (t = 255 & e.charCodeAt(o) | (255 & e.charCodeAt(++o)) << 8 | (255 & e.charCodeAt(++o)) << 16 | (255 & e.charCodeAt(++o)) << 24)) + (59797 * (t >>> 16) << 16), n = 1540483477 * (65535 & (t ^= t >>> 24)) + (59797 * (t >>> 16) << 16) ^ 1540483477 * (65535 & n) + (59797 * (n >>> 16) << 16);
	switch (r) {
		case 3:
			n ^= (255 & e.charCodeAt(o + 2)) << 16;
		case 2:
			n ^= (255 & e.charCodeAt(o + 1)) << 8;
		case 1:
			n = 1540483477 * (65535 & (n ^= 255 & e.charCodeAt(o))) + (59797 * (n >>> 16) << 16)
	}
	return (((n = 1540483477 * (65535 & (n ^= n >>> 13)) + (59797 * (n >>> 16) << 16)) ^ n >>> 15) >>> 0)
		.toString(36)
}

function Gs(e, t) {
	e.push(t)
}

function Xs(e, t, n, o, r, i, s, l, a) {
	if (i && !a) {
		if (void 0 === n) return void console.error("[css-render/mount]: `id` is required in `silent` mode.");
		const r = window.__cssrContext;
		return void(!r[n] && (r[n] = !0, qs(t, e, o, i)))
	}
	let c;
	if (void 0 === n && (c = t.render(o), n = Us(c)), a) return void a.adapter(n, null != c ? c : t.render(o));
	const u = Is(n);
	if (null !== u && !s) return u;
	const d = null != u ? u : function(e) {
		const t = document.createElement("style");
		return t.setAttribute("cssr-id", e), t
	}(n);
	if (void 0 === c && (c = t.render(o)), d.textContent = c, null !== u) return u;
	if (l) {
		const e = document.head.querySelector('meta[name="' + l + '"]');
		if (e) return document.head.insertBefore(d, e), Gs(t.els, d), d
	}
	return r ? document.head.insertBefore(d, document.head.querySelector("style, link")) : document.head.appendChild(d), Gs(t.els, d), d
}

function Zs(e) {
	return qs(this, this.instance, e)
}

function Ks(e = {}) {
	const {
		id: t,
		ssr: n,
		props: o,
		head: r = !1,
		silent: i = !1,
		force: s = !1,
		anchorMetaName: l
	} = e;
	return Xs(this.instance, this, t, o, r, i, s, l, n)
}

function Ys(e = {}) {
	const {
		id: t
	} = e;
	! function(e, t, n) {
		const {
			els: o
		} = t;
		if (void 0 === n) o.forEach(Ls), t.els = [];
		else {
			const e = Is(n);
			e && o.includes(e) && (Ls(e), t.els = o.filter((t => t !== e)))
		}
	}(this.instance, this, t)
}
"undefined" != typeof window && (window.__cssrContext = {});
const Qs = function(e, t, n, o) {
	const r = {};
	return r.instance = e, r.$ = t, r.props = n, r.children = o, r.els = [], r.render = Zs, r.mount = Ks, r.unmount = Ys, r
};

function Js(e = {}) {
	let t = null;
	const n = {
		c: (...e) => function(e, t, n, o) {
			if (Array.isArray(t)) {
				return Qs(e, {
					$: null
				}, null, t)
			}
			return Array.isArray(n) ? Qs(e, t, null, n) : Array.isArray(o) ? Qs(e, t, n, o) : Qs(e, t, n, null)
		}(n, ...e),
		use: (e, ...t) => e.install(n, ...t),
		find: Is,
		context: {},
		config: e,
		get __styleSheet() {
			if (!t) {
				const e = document.createElement("style");
				return document.head.appendChild(e), t = document.styleSheets[document.styleSheets.length - 1], t
			}
			return t
		}
	};
	return n
}

function el(e, t) {
	return e + ("default" === t ? "" : t.replace(/^[a-z]/, (e => e.toUpperCase())))
}
el("abc", "def");
const tl = ".n-",
	nl = Js(),
	ol = {};
ol.blockPrefix = tl, ol.elementPrefix = "__", ol.modifierPrefix = "--";
const rl = function(e) {
	let t, n = ".",
		o = "__",
		r = "--";
	if (e) {
		let t = e.blockPrefix;
		t && (n = t), t = e.elementPrefix, t && (o = t), t = e.modifierPrefix, t && (r = t)
	}
	const i = {
			install: function(e) {
				t = e.c;
				const n = e.context;
				n.bem = {}, n.bem.b = null, n.bem.els = null
			}
		},
		s = i,
		l = {};
	return l.cB = (...e) => t(function(e) {
		let t, o;
		return {
			before(e) {
				t = e.bem.b, o = e.bem.els, e.bem.els = null
			},
			after(e) {
				e.bem.b = t, e.bem.els = o
			},
			$({
				context: t,
				props: o
			}) {
				const r = {};
				return r.context = t, r.props = o, e = "string" == typeof e ? e : e(r), t.bem.b = e, "" + ((null == o ? void 0 : o.bPrefix) || n) + t.bem.b
			}
		}
	}(e[0]), e[1], e[2]), l.cE = (...e) => t(function(e) {
		let t;
		return {
			before(e) {
				t = e.bem.els
			},
			after(e) {
				e.bem.els = t
			},
			$({
				context: t,
				props: r
			}) {
				const i = {};
				return i.context = t, i.props = r, e = "string" == typeof e ? e : e(i), t.bem.els = e.split(",")
					.map((e => e.trim())), t.bem.els.map((e => "" + ((null == r ? void 0 : r.bPrefix) || n) + t.bem.b + o + e))
					.join(", ")
			}
		}
	}(e[0]), e[1], e[2]), l.cM = (...e) => {
		return t((i = e[0], {
			$({
				context: e,
				props: t
			}) {
				const s = {};
				s.context = e, s.props = t;
				const l = (i = "string" == typeof i ? i : i(s))
					.split(",")
					.map((e => e.trim()));

				function a(i) {
					return l.map((s => "&" + ((null == t ? void 0 : t.bPrefix) || n) + e.bem.b + (void 0 !== i ? "" + o + i : "") + r + s))
						.join(", ")
				}
				const c = e.bem.els;
				return null !== c ? a(c[0]) : a()
			}
		}), e[1], e[2]);
		var i
	}, l.cNotM = (...e) => {
		return t((i = e[0], {
			$({
				context: e,
				props: t
			}) {
				const s = {};
				s.context = e, s.props = t, i = "string" == typeof i ? i : i(s);
				const l = e.bem.els;
				return "&:not(" + ((null == t ? void 0 : t.bPrefix) || n) + e.bem.b + (null !== l && l.length > 0 ? "" + o + l[0] : "") + r + i + ")"
			}
		}), e[1], e[2]);
		var i
	}, Object.assign(s, l), s
}(ol);
nl.use(rl);
const {
	c: il,
	find: sl
} = nl, {
	cB: ll,
	cE: al,
	cM: cl,
	cNotM: ul
} = rl;

function dl(e) {
	return il((({
		props: {
			bPrefix: e
		}
	}) => (e || tl) + "modal, " + (e || tl) + "drawer"), [e])
}

function fl(e) {
	return il((({
		props: {
			bPrefix: e
		}
	}) => (e || tl) + "popover"), [e])
}

function pl(e) {
	return il((({
		props: {
			bPrefix: e
		}
	}) => "&" + (e || tl) + "modal"), e)
}
const hl = (...e) => il(">", [ll(...e)]),
	vl = "undefined" != typeof document && "undefined" != typeof window,
	gl = new WeakSet;

function ml(e) {
	gl.add(e)
}

function bl(e) {
	const t = Ct(!!e.value);
	if (t.value) return at(t);
	const n = gn(e, (e => {
		e && (t.value = !0, n())
	}));
	return at(t)
}

function yl(e) {
	const t = Wr(e),
		n = Ct(t.value);
	return gn(t, (e => {
		n.value = e
	})), "function" == typeof e ? n : {
		__v_isRef: !0,
		get value() {
			return n.value
		},
		set value(t) {
			e.set(t)
		}
	}
}

function xl() {
	return null !== jr()
}
const Cl = "undefined" != typeof window;

function wl(e) {
	return e.composedPath()[0]
}
const Sl = {
	mousemoveoutside: new WeakMap,
	clickoutside: new WeakMap
};

function kl(e, t, n) {
	const o = Sl[e];
	let r = o.get(t);
	void 0 === r && o.set(t, r = new WeakMap);
	let i = r.get(n);
	return void 0 === i && r.set(n, i = function(e, t, n) {
		if ("mousemoveoutside" === e) {
			const e = e => {
					t.contains(wl(e)) || n(e)
				},
				o = {};
			return o.mousemove = e, o.touchstart = e, o
		}
		if ("clickoutside" === e) {
			let e = !1;
			const o = n => {
					e = !t.contains(wl(n))
				},
				r = o => {
					e && (t.contains(wl(o)) || n(o))
				},
				i = {};
			return i.mousedown = o, i.mouseup = r, i.touchstart = o, i.touchend = r, i
		}
		return console.error("[evtd/create-trap-handler]: name `" + e + "` is invalid. This could be a bug of evtd."), {}
	}(e, t, n)), i
}
const {
	on: _l,
	off: Pl
} = function() {
	if ("undefined" == typeof window) {
		const e = {
			on: () => {},
			off: () => {}
		};
		return e
	}
	const e = new WeakMap,
		t = new WeakMap;

	function n() {
		e.set(this, !0)
	}

	function o() {
		e.set(this, !0), t.set(this, !0)
	}

	function r(e, t, n) {
		const o = e[t];
		return e[t] = function() {
			return n.apply(e, arguments), o.apply(e, arguments)
		}, e
	}

	function i(e, t) {
		e[t] = Event.prototype[t]
	}
	const s = new WeakMap,
		l = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");

	function a() {
		var e;
		return null !== (e = s.get(this)) && void 0 !== e ? e : null
	}

	function c(e, t) {
		if (void 0 === l) return;
		const n = {
			configurable: !0,
			enumerable: !0
		};
		n.get = null != t ? t : l.get, Object.defineProperty(e, "currentTarget", n)
	}
	const u = {
			bubble: {},
			capture: {}
		},
		d = u,
		f = {},
		p = function() {
			const l = function(l) {
				const {
					type: u,
					eventPhase: f,
					bubbles: p
				} = l, h = wl(l);
				if (2 === f) return;
				const v = 1 === f ? "capture" : "bubble";
				let g = h;
				const m = [];
				for (; null === g && (g = window), m.push(g), g !== window;) g = g.parentNode || null;
				const b = d.capture[u],
					y = d.bubble[u];
				if (r(l, "stopPropagation", n), r(l, "stopImmediatePropagation", o), c(l, a), "capture" === v) {
					if (void 0 === b) return;
					for (let n = m.length - 1; n >= 0 && !e.has(l); --n) {
						const e = m[n],
							o = b.get(e);
						if (void 0 !== o) {
							s.set(l, e);
							for (const e of o) {
								if (t.has(l)) break;
								e(l)
							}
						}
						if (0 === n && !p && void 0 !== y) {
							const n = y.get(e);
							if (void 0 !== n)
								for (const e of n) {
									if (t.has(l)) break;
									e(l)
								}
						}
					}
				} else if ("bubble" === v) {
					if (void 0 === y) return;
					for (let n = 0; n < m.length && !e.has(l); ++n) {
						const e = m[n],
							o = y.get(e);
						if (void 0 !== o) {
							s.set(l, e);
							for (const e of o) {
								if (t.has(l)) break;
								e(l)
							}
						}
					}
				}
				i(l, "stopPropagation"), i(l, "stopImmediatePropagation"), c(l)
			};
			return l.displayName = "evtdUnifiedHandler", l
		}(),
		h = function() {
			const e = function(e) {
				const {
					type: t,
					eventPhase: n
				} = e;
				if (2 !== n) return;
				const o = f[t];
				void 0 !== o && o.forEach((t => t(e)))
			};
			return e.displayName = "evtdUnifiedWindowEventHandler", e
		}();

	function v(e, t) {
		const n = d[e];
		return void 0 === n[t] && (n[t] = new Map, window.addEventListener(t, p, "capture" === e)), n[t]
	}

	function g(e, t) {
		let n = e.get(t);
		return void 0 === n && e.set(t, n = new Set), n
	}

	function m(e, t, n, o) {
		if (function(e, t, n, o) {
			if ("mousemoveoutside" === e || "clickoutside" === e) {
				const r = kl(e, t, n);
				return Object.keys(r)
					.forEach((e => {
						Pl(e, document, r[e], o)
					})), !0
			}
			return !1
		}(e, t, n, o)) return;
		const r = !0 === o || "object" == typeof o && !0 === o.capture,
			i = r ? "capture" : "bubble",
			s = v(i, e),
			l = g(s, t);
		if (t === window) {
			if (! function(e, t, n, o) {
				const r = d[t][n];
				if (void 0 !== r) {
					const t = r.get(e);
					if (void 0 !== t && t.has(o)) return !0
				}
				return !1
			}(t, r ? "bubble" : "capture", e, n) && function(e, t) {
				const n = f[e];
				return !(void 0 === n || !n.has(t))
			}(e, n)) {
				const t = f[e];
				t.delete(n), 0 === t.size && (window.removeEventListener(e, h), f[e] = void 0)
			}
		}
		l.has(n) && l.delete(n), 0 === l.size && s.delete(t), 0 === s.size && (window.removeEventListener(e, p, "capture" === i), d[i][e] = void 0)
	}
	const b = {
		on: function(e, t, n, o) {
			let r;
			if (r = "object" == typeof o && !0 === o.once ? i => {
				m(e, t, r, o), n(i)
			} : n, function(e, t, n, o) {
				if ("mousemoveoutside" === e || "clickoutside" === e) {
					const r = kl(e, t, n);
					return Object.keys(r)
						.forEach((e => {
							_l(e, document, r[e], o)
						})), !0
				}
				return !1
			}(e, t, r, o)) return;
			const i = g(v(!0 === o || "object" == typeof o && !0 === o.capture ? "capture" : "bubble", e), t);
			if (i.has(r) || i.add(r), t === window) {
				const t = (void 0 === f[s = e] && (f[s] = new Set, window.addEventListener(s, h)), f[s]);
				!t.has(r) && t.add(r)
			}
			var s
		}
	};
	return b.off = m, b
}(), Ol = Ct(null);

function zl(e) {
	if (e.clientX > 0 || e.clientY > 0) {
		const t = {};
		t.x = e.clientX, t.y = e.clientY, Ol.value = t
	} else {
		const {
			target: t
		} = e;
		if (t instanceof Element) {
			const {
				left: e,
				top: n,
				width: o,
				height: r
			} = t.getBoundingClientRect();
			if (e > 0 || n > 0) {
				const t = {};
				t.x = e + o / 2, t.y = n + r / 2, Ol.value = t
			} else {
				const e = {
					x: 0,
					y: 0
				};
				Ol.value = e
			}
		} else Ol.value = null
	}
}
let El = 0,
	Tl = !0;

function Rl() {
	if (!Cl) return at(Ct(null));
	0 === El && _l("click", document, zl, !0);
	const e = () => {
		El += 1
	};
	return Tl && (Tl = xl()) ? (qn(e), Zn((() => {
		El -= 1, 0 === El && Pl("click", document, zl, !0)
	}))) : e(), at(Ol)
}
const jl = Ct(void 0);
let Ml = 0;

function Al() {
	jl.value = Date.now()
}
let Fl = !0;

function Bl(e) {
	if (!Cl) return at(Ct(!1));
	const t = Ct(!1);
	let n = null;

	function o() {
		null !== n && window.clearTimeout(n)
	}

	function r() {
		o(), t.value = !0, n = window.setTimeout((() => {
			t.value = !1
		}), e)
	}
	0 === Ml && _l("click", window, Al, !0);
	const i = () => {
		Ml += 1, _l("click", window, r, !0)
	};
	return Fl && (Fl = xl()) ? (qn(i), Zn((() => {
		Ml -= 1, 0 === Ml && Pl("click", window, Al, !0), Pl("click", window, r, !0), o()
	}))) : i(), at(t)
}

function Ll() {
	const e = Ct(!1);
	return Un((() => {
		e.value = !0
	})), at(e)
}
const Il = "undefined" != typeof window && (/iPad|iPhone|iPod/.test(navigator.platform) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1) && !window.MSStream;
const Hl = "n-modal-body",
	Dl = "n-modal",
	Nl = "n-drawer-body",
	Wl = "n-popover-body";

function $l(e, t, n = "default") {
	const o = t[n];
	if (void 0 === o) throw new Error("[vueuc/" + e + "]: slot[" + n + "] is empty.");
	return o()
}

function Vl(e, t = !0, n = []) {
	return e.forEach((e => {
		if (null !== e)
			if ("object" == typeof e)
				if (Array.isArray(e)) Vl(e, t, n);
				else if (e.type === nr) {
			if (null === e.children) return;
			Array.isArray(e.children) && Vl(e.children, t, n)
		} else e.type !== rr && n.push(e);
		else("string" == typeof e || "number" == typeof e) && n.push(wr(String(e)))
	})), n
}

function ql(e, t, n = "default") {
	const o = t[n];
	if (void 0 === o) throw new Error("[vueuc/" + e + "]: slot[" + n + "] is empty.");
	const r = Vl(o());
	if (1 === r.length) return r[0];
	throw new Error("[vueuc/" + e + "]: slot[" + n + "] should have exactly one child.")
}
const Ul = "@@coContext",
	Gl = {
		mounted(e, {
			value: t,
			modifiers: n
		}) {
			const o = {
				handler: void 0
			};
			if (e[Ul] = o, "function" == typeof t) {
				e[Ul].handler = t;
				const o = {};
				o.capture = n.capture, _l("clickoutside", e, t, o)
			}
		},
		updated(e, {
			value: t,
			modifiers: n
		}) {
			const o = e[Ul];
			if ("function" == typeof t)
				if (o.handler) {
					if (o.handler !== t) {
						const r = {};
						r.capture = n.capture, Pl("clickoutside", e, o.handler, r), o.handler = t;
						const i = {};
						i.capture = n.capture, _l("clickoutside", e, t, i)
					}
				} else {
					e[Ul].handler = t;
					const o = {};
					o.capture = n.capture, _l("clickoutside", e, t, o)
				}
			else if (o.handler) {
				const t = {};
				t.capture = n.capture, Pl("clickoutside", e, o.handler, t), o.handler = void 0
			}
		},
		unmounted(e, {
			modifiers: t
		}) {
			const {
				handler: n
			} = e[Ul];
			if (n) {
				const o = {};
				o.capture = t.capture, Pl("clickoutside", e, n, o)
			}
			e[Ul].handler = void 0
		}
	};
const Xl = new class {
		constructor() {
			this.elementZIndex = new Map, this.nextZIndex = 2e3
		}
		get elementCount() {
			return this.elementZIndex.size
		}
		ensureZIndex(e, t) {
			const {
				elementZIndex: n
			} = this;
			if (void 0 !== t) return e.style.zIndex = "" + t, void n.delete(e);
			const {
				nextZIndex: o
			} = this;
			if (n.has(e)) {
				if (n.get(e) + 1 === this.nextZIndex) return
			}
			e.style.zIndex = "" + o, n.set(e, o), this.nextZIndex = o + 1, this.squashState()
		}
		unregister(e, t) {
			const {
				elementZIndex: n
			} = this;
			var o, r;
			n.has(e) ? n.delete(e) : void 0 === t && (o = "z-index-manager/unregister-element", r = "Element not found when unregistering.", console.error("[vdirs/" + o + "]: " + r)), this.squashState()
		}
		squashState() {
			const {
				elementCount: e
			} = this;
			!e && (this.nextZIndex = 2e3), this.nextZIndex - e > 2500 && this.rearrange()
		}
		rearrange() {
			const e = Array.from(this.elementZIndex.entries());
			e.sort(((e, t) => e[1] - t[1])), this.nextZIndex = 2e3, e.forEach((e => {
				const t = e[0],
					n = this.nextZIndex++;
				"" + n !== t.style.zIndex && (t.style.zIndex = "" + n)
			}))
		}
	},
	Zl = "@@ziContext",
	Kl = {
		mounted(e, t) {
			const {
				value: n = {}
			} = t, {
				zIndex: o,
				enabled: r
			} = n, i = {};
			i.enabled = !!r, i.initialized = !1, e[Zl] = i, r && (Xl.ensureZIndex(e, o), e[Zl].initialized = !0)
		},
		updated(e, t) {
			const {
				value: n = {}
			} = t, {
				zIndex: o,
				enabled: r
			} = n, i = e[Zl].enabled;
			r && !i && (Xl.ensureZIndex(e, o), e[Zl].initialized = !0), e[Zl].enabled = !!r
		},
		unmounted(e, t) {
			if (!e[Zl].initialized) return;
			const {
				value: n = {}
			} = t, {
				zIndex: o
			} = n;
			Xl.unregister(e, o)
		}
	},
	Yl = Symbol("@css-render/vue3-ssr");

function Ql(e, t) {
	const n = pn(Yl, null);
	if (null === n) return void console.error("[css-render/vue3-ssr]: no ssr context found.");
	const {
		styles: o,
		ids: r
	} = n;
	r.has(e) || null !== o && (r.add(e), o.push('<style cssr-id="' + e + '">\n' + t + "\n</style>"))
}
const Jl = "undefined" != typeof document;

function ea() {
	if (Jl) return;
	const e = pn(Yl, null);
	if (null === e) return;
	const t = {};
	return t.adapter = Ql, t.context = e, t
}

function ta(e, t) {
	console.error("[vueuc/" + e + "]: " + t)
}

function na(e) {
	return "string" == typeof e ? document.querySelector(e) : e()
}
const oa = {};
oa.type = [String, Object], oa.default = void 0;
const ra = {};
ra.to = oa, ra.disabled = Boolean, ra.show = {}, ra.show.type = Boolean, ra.show.required = !0;
const ia = Rn({
	name: "LazyTeleport",
	props: ra,
	setup: e => ({
		showTeleport: bl(zt(e, "show")),
		mergedTo: Wr((() => {
			const {
				to: t
			} = e;
			return null != t ? t : "body"
		}))
	}),
	render() {
		return this.showTeleport ? this.disabled ? $l("lazy-teleport", this.$slots) : $r(er, {
			disabled: this.disabled,
			to: this.mergedTo
		}, $l("lazy-teleport", this.$slots)) : null
	}
});
var sa, la, aa = [],
	ca = "ResizeObserver loop completed with undelivered notifications.";
(la = sa || (sa = {}))
.BORDER_BOX = "border-box", la.CONTENT_BOX = "content-box", la.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
var ua, da = function(e) {
		return Object.freeze(e)
	},
	fa = function(e, t) {
		this.inlineSize = e, this.blockSize = t, da(this)
	},
	pa = function() {
		function e(e, t, n, o) {
			return this.x = e, this.y = t, this.width = n, this.height = o, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, da(this)
		}
		return e.prototype.toJSON = function() {
			var e = this,
				t = e.x,
				n = e.y,
				o = e.top,
				r = e.right,
				i = e.bottom,
				s = e.left,
				l = e.width,
				a = e.height;
			const c = {};
			return c.x = t, c.y = n, c.top = o, c.right = r, c.bottom = i, c.left = s, c.width = l, c.height = a, c
		}, e.fromRect = function(t) {
			return new e(t.x, t.y, t.width, t.height)
		}, e
	}(),
	ha = function(e) {
		return e instanceof SVGElement && "getBBox" in e
	},
	va = function(e) {
		if (ha(e)) {
			var t = e.getBBox(),
				n = t.width,
				o = t.height;
			return !n && !o
		}
		var r = e,
			i = r.offsetWidth,
			s = r.offsetHeight;
		return !(i || s || e.getClientRects()
			.length)
	},
	ga = function(e) {
		var t;
		if (e instanceof Element) return !0;
		var n = null === (t = null == e ? void 0 : e.ownerDocument) || void 0 === t ? void 0 : t.defaultView;
		return !!(n && e instanceof n.Element)
	},
	ma = "undefined" != typeof window ? window : {},
	ba = new WeakMap,
	ya = /auto|scroll/,
	xa = /^tb|vertical/,
	Ca = /msie|trident/i.test(ma.navigator && ma.navigator.userAgent),
	wa = function(e) {
		return parseFloat(e || "0")
	},
	Sa = function(e, t, n) {
		return void 0 === e && (e = 0), void 0 === t && (t = 0), void 0 === n && (n = !1), new fa((n ? t : e) || 0, (n ? e : t) || 0)
	},
	ka = da({
		devicePixelContentBoxSize: Sa(),
		borderBoxSize: Sa(),
		contentBoxSize: Sa(),
		contentRect: new pa(0, 0, 0, 0)
	}),
	_a = function(e, t) {
		if (void 0 === t && (t = !1), ba.has(e) && !t) return ba.get(e);
		if (va(e)) return ba.set(e, ka), ka;
		var n = getComputedStyle(e),
			o = ha(e) && e.ownerSVGElement && e.getBBox(),
			r = !Ca && "border-box" === n.boxSizing,
			i = xa.test(n.writingMode || ""),
			s = !o && ya.test(n.overflowY || ""),
			l = !o && ya.test(n.overflowX || ""),
			a = o ? 0 : wa(n.paddingTop),
			c = o ? 0 : wa(n.paddingRight),
			u = o ? 0 : wa(n.paddingBottom),
			d = o ? 0 : wa(n.paddingLeft),
			f = o ? 0 : wa(n.borderTopWidth),
			p = o ? 0 : wa(n.borderRightWidth),
			h = o ? 0 : wa(n.borderBottomWidth),
			v = d + c,
			g = a + u,
			m = (o ? 0 : wa(n.borderLeftWidth)) + p,
			b = f + h,
			y = l ? e.offsetHeight - b - e.clientHeight : 0,
			x = s ? e.offsetWidth - m - e.clientWidth : 0,
			C = r ? v + m : 0,
			w = r ? g + b : 0,
			S = o ? o.width : wa(n.width) - C - x,
			k = o ? o.height : wa(n.height) - w - y,
			_ = S + v + x + m,
			P = k + g + y + b,
			O = da({
				devicePixelContentBoxSize: Sa(Math.round(S * devicePixelRatio), Math.round(k * devicePixelRatio), i),
				borderBoxSize: Sa(_, P, i),
				contentBoxSize: Sa(S, k, i),
				contentRect: new pa(d, a, S, k)
			});
		return ba.set(e, O), O
	},
	Pa = function(e, t, n) {
		var o = _a(e, n),
			r = o.borderBoxSize,
			i = o.contentBoxSize,
			s = o.devicePixelContentBoxSize;
		switch (t) {
			case sa.DEVICE_PIXEL_CONTENT_BOX:
				return s;
			case sa.BORDER_BOX:
				return r;
			default:
				return i
		}
	},
	Oa = function(e) {
		var t = _a(e);
		this.target = e, this.contentRect = t.contentRect, this.borderBoxSize = da([t.borderBoxSize]), this.contentBoxSize = da([t.contentBoxSize]), this.devicePixelContentBoxSize = da([t.devicePixelContentBoxSize])
	},
	za = function(e) {
		if (va(e)) return 1 / 0;
		for (var t = 0, n = e.parentNode; n;) t += 1, n = n.parentNode;
		return t
	},
	Ea = function() {
		var e = 1 / 0,
			t = [];
		aa.forEach((function(n) {
			if (0 !== n.activeTargets.length) {
				var o = [];
				n.activeTargets.forEach((function(t) {
					var n = new Oa(t.target),
						r = za(t.target);
					o.push(n), t.lastReportedSize = Pa(t.target, t.observedBox), r < e && (e = r)
				})), t.push((function() {
					n.callback.call(n.observer, o, n.observer)
				})), n.activeTargets.splice(0, n.activeTargets.length)
			}
		}));
		for (var n = 0, o = t; n < o.length; n++) {
			(0, o[n])()
		}
		return e
	},
	Ta = function(e) {
		aa.forEach((function(t) {
			t.activeTargets.splice(0, t.activeTargets.length), t.skippedTargets.splice(0, t.skippedTargets.length), t.observationTargets.forEach((function(n) {
				n.isActive() && (za(n.target) > e ? t.activeTargets.push(n) : t.skippedTargets.push(n))
			}))
		}))
	},
	Ra = function() {
		var e = 0;
		for (Ta(e); aa.some((function(e) {
			return e.activeTargets.length > 0
		}));) e = Ea(), Ta(e);
		return aa.some((function(e) {
			return e.skippedTargets.length > 0
		})) && function() {
			var e;
			if ("function" == typeof ErrorEvent) {
				const t = {};
				t.message = ca, e = new ErrorEvent("error", t)
			} else(e = document.createEvent("Event"))
				.initEvent("error", !1, !1), e.message = ca;
			window.dispatchEvent(e)
		}(), e > 0
	},
	ja = [],
	Ma = function(e) {
		if (!ua) {
			var t = 0,
				n = document.createTextNode("");
			const e = {
				characterData: !0
			};
			var o = e;
			new MutationObserver((function() {
					return ja.splice(0)
						.forEach((function(e) {
							return e()
						}))
				}))
				.observe(n, o), ua = function() {
					n.textContent = "".concat(t ? t-- : t++)
				}
		}
		ja.push(e), ua()
	},
	Aa = 0;
const Fa = {
	attributes: !0,
	characterData: !0,
	childList: !0,
	subtree: !0
};
var Ba = Fa,
	La = ["resize", "load", "transitionend", "animationend", "animationstart", "animationiteration", "keyup", "keydown", "mouseup", "mousedown", "mouseover", "mouseout", "blur", "focus"],
	Ia = function(e) {
		return void 0 === e && (e = 0), Date.now() + e
	},
	Ha = !1,
	Da = new(function() {
		function e() {
			var e = this;
			this.stopped = !0, this.listener = function() {
				return e.schedule()
			}
		}
		return e.prototype.run = function(e) {
			var t = this;
			if (void 0 === e && (e = 250), !Ha) {
				Ha = !0;
				var n, o = Ia(e);
				n = function() {
					var n = !1;
					try {
						n = Ra()
					} finally {
						if (Ha = !1, e = o - Ia(), !Aa) return;
						n ? t.run(1e3) : e > 0 ? t.run(e) : t.start()
					}
				}, Ma((function() {
					requestAnimationFrame(n)
				}))
			}
		}, e.prototype.schedule = function() {
			this.stop(), this.run()
		}, e.prototype.observe = function() {
			var e = this,
				t = function() {
					return e.observer && e.observer.observe(document.body, Ba)
				};
			document.body ? t() : ma.addEventListener("DOMContentLoaded", t)
		}, e.prototype.start = function() {
			var e = this;
			this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), La.forEach((function(t) {
				return ma.addEventListener(t, e.listener, !0)
			})))
		}, e.prototype.stop = function() {
			var e = this;
			!this.stopped && (this.observer && this.observer.disconnect(), La.forEach((function(t) {
				return ma.removeEventListener(t, e.listener, !0)
			})), this.stopped = !0)
		}, e
	}()),
	Na = function(e) {
		!Aa && e > 0 && Da.start(), !(Aa += e) && Da.stop()
	},
	Wa = function() {
		function e(e, t) {
			this.target = e, this.observedBox = t || sa.CONTENT_BOX;
			const n = {
				inlineSize: 0,
				blockSize: 0
			};
			this.lastReportedSize = n
		}
		return e.prototype.isActive = function() {
			var e, t = Pa(this.target, this.observedBox, !0);
			return e = this.target, !ha(e) && ! function(e) {
					switch (e.tagName) {
						case "INPUT":
							if ("image" !== e.type) break;
						case "VIDEO":
						case "AUDIO":
						case "EMBED":
						case "OBJECT":
						case "CANVAS":
						case "IFRAME":
						case "IMG":
							return !0
					}
					return !1
				}(e) && "inline" === getComputedStyle(e)
				.display && (this.lastReportedSize = t), this.lastReportedSize.inlineSize !== t.inlineSize || this.lastReportedSize.blockSize !== t.blockSize
		}, e
	}(),
	$a = function(e, t) {
		this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = e, this.callback = t
	},
	Va = new WeakMap,
	qa = function(e, t) {
		for (var n = 0; n < e.length; n += 1)
			if (e[n].target === t) return n;
		return -1
	},
	Ua = function() {
		function e() {}
		return e.connect = function(e, t) {
			var n = new $a(e, t);
			Va.set(e, n)
		}, e.observe = function(e, t, n) {
			var o = Va.get(e),
				r = 0 === o.observationTargets.length;
			qa(o.observationTargets, t) < 0 && (r && aa.push(o), o.observationTargets.push(new Wa(t, n && n.box)), Na(1), Da.schedule())
		}, e.unobserve = function(e, t) {
			var n = Va.get(e),
				o = qa(n.observationTargets, t),
				r = 1 === n.observationTargets.length;
			o >= 0 && (r && aa.splice(aa.indexOf(n), 1), n.observationTargets.splice(o, 1), Na(-1))
		}, e.disconnect = function(e) {
			var t = this,
				n = Va.get(e);
			n.observationTargets.slice()
				.forEach((function(n) {
					return t.unobserve(e, n.target)
				})), n.activeTargets.splice(0, n.activeTargets.length)
		}, e
	}(),
	Ga = function() {
		function e(e) {
			if (0 === arguments.length) throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
			if ("function" != typeof e) throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
			Ua.connect(this, e)
		}
		return e.prototype.observe = function(e, t) {
			if (0 === arguments.length) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
			if (!ga(e)) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
			Ua.observe(this, e, t)
		}, e.prototype.unobserve = function(e) {
			if (0 === arguments.length) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
			if (!ga(e)) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
			Ua.unobserve(this, e)
		}, e.prototype.disconnect = function() {
			Ua.disconnect(this)
		}, e.toString = function() {
			return "function ResizeObserver () { [polyfill code] }"
		}, e
	}();
const Xa = new class {
		constructor() {
			this.handleResize = this.handleResize.bind(this), this.observer = new("undefined" != typeof window && window.ResizeObserver || Ga)(this.handleResize), this.elHandlersMap = new Map
		}
		handleResize(e) {
			for (const t of e) {
				const e = this.elHandlersMap.get(t.target);
				void 0 !== e && e(t)
			}
		}
		registerHandler(e, t) {
			this.elHandlersMap.set(e, t), this.observer.observe(e)
		}
		unregisterHandler(e) {
			this.elHandlersMap.has(e) && (this.elHandlersMap.delete(e), this.observer.unobserve(e))
		}
	},
	Za = {};
Za.onResize = Function;
const Ka = Rn({
	name: "ResizeObserver",
	props: Za,
	setup(e) {
		let t = !1;
		const n = jr()
			.proxy;

		function o(t) {
			const {
				onResize: n
			} = e;
			void 0 !== n && n(t)
		}
		Un((() => {
			const e = n.$el;
			void 0 !== e ? e.nextElementSibling === e.nextSibling || 3 !== e.nodeType || "" === e.nodeValue ? null !== e.nextElementSibling && (Xa.registerHandler(e.nextElementSibling, o), t = !0) : ta("resize-observer", "$el can not be observed (it may be a text node).") : ta("resize-observer", "$el does not exist.")
		})), Zn((() => {
			t && Xa.unregisterHandler(n.$el.nextElementSibling)
		}))
	},
	render() {
		return ao(this.$slots, "default")
	}
});

function Ya(e) {
	return e instanceof HTMLElement
}

function Qa(e) {
	for (let t = 0; t < e.childNodes.length; t++) {
		const n = e.childNodes[t];
		if (Ya(n) && (ec(n) || Qa(n))) return !0
	}
	return !1
}

function Ja(e) {
	for (let t = e.childNodes.length - 1; t >= 0; t--) {
		const n = e.childNodes[t];
		if (Ya(n) && (ec(n) || Ja(n))) return !0
	}
	return !1
}

function ec(e) {
	if (! function(e) {
		if (e.tabIndex > 0 || 0 === e.tabIndex && null !== e.getAttribute("tabIndex")) return !0;
		if (e.getAttribute("disabled")) return !1;
		switch (e.nodeName) {
			case "A":
				return !!e.href && "ignore" !== e.rel;
			case "INPUT":
				return "hidden" !== e.type && "file" !== e.type;
			case "BUTTON":
			case "SELECT":
			case "TEXTAREA":
				return !0;
			default:
				return !1
		}
	}(e)) return !1;
	try {
		const t = {
			preventScroll: !0
		};
		e.focus(t)
	} catch (t) {}
	return document.activeElement === e
}
let tc = [];
const nc = {};
nc.disabled = Boolean, nc.active = Boolean, nc.autoFocus = {}, nc.onEsc = Function, nc.initialFocusTo = String, nc.finalFocusTo = String, nc.returnFocusOnDeactivated = {}, nc.autoFocus.type = Boolean, nc.autoFocus.default = !0, nc.returnFocusOnDeactivated.type = Boolean, nc.returnFocusOnDeactivated.default = !0;
const oc = Rn({
	name: "FocusTrap",
	props: nc,
	setup(e) {
		const t = hs(),
			n = Ct(null),
			o = Ct(null);
		let r = !1,
			i = !1;
		const s = "undefined" == typeof document ? null : document.activeElement;

		function l() {
			return tc[tc.length - 1] === t
		}

		function a(t) {
			var n;
			"Escape" === t.code && l() && (null === (n = e.onEsc) || void 0 === n || n.call(e, t))
		}

		function c(e) {
			if (!i && l()) {
				const t = u();
				if (null === t) return;
				if (t.contains(Ni(e))) return;
				f("first")
			}
		}

		function u() {
			const e = n.value;
			if (null === e) return null;
			let t = e;
			for (; !(t = t.nextSibling, null === t || t instanceof Element && "DIV" === t.tagName););
			return t
		}

		function d() {
			var n;
			if (e.disabled) return;
			if (document.removeEventListener("focus", c, !0), tc = tc.filter((e => e !== t)), l()) return;
			const {
				finalFocusTo: o
			} = e;
			if (void 0 !== o) {
				const e = {
					preventScroll: !0
				};
				null === (n = na(o)) || void 0 === n || n.focus(e)
			} else if (e.returnFocusOnDeactivated && s instanceof HTMLElement) {
				i = !0;
				const e = {
					preventScroll: !0
				};
				s.focus(e), i = !1
			}
		}

		function f(t) {
			if (l() && e.active) {
				const e = n.value,
					r = o.value;
				if (null !== e && null !== r) {
					const n = u();
					if (null == n || n === r) {
						i = !0;
						const t = {
							preventScroll: !0
						};
						return e.focus(t), void(i = !1)
					}
					i = !0;
					const o = "first" === t ? Qa(n) : Ja(n);
					if (i = !1, !o) {
						i = !0;
						const t = {
							preventScroll: !0
						};
						e.focus(t), i = !1
					}
				}
			}
		}
		Un((() => {
			const n = {
				immediate: !0
			};
			gn((() => e.active), (n => {
				n ? (function() {
					var n;
					if (e.disabled) return;
					if (tc.push(t), e.autoFocus) {
						const {
							initialFocusTo: t
						} = e;
						if (void 0 === t) f("first");
						else {
							const e = {
								preventScroll: !0
							};
							null === (n = na(t)) || void 0 === n || n.focus(e)
						}
					}
					r = !0, document.addEventListener("focus", c, !0)
				}(), _l("keydown", document, a)) : (Pl("keydown", document, a), r && d())
			}), n)
		})), Zn((() => {
			Pl("keydown", document, a), r && d()
		}));
		const p = {};
		return p.focusableStartRef = n, p.focusableEndRef = o, p.focusableStyle = "position: absolute; height: 0; width: 0;", p.handleStartFocus = function(e) {
			if (i) return;
			const t = u();
			null !== t && (null !== e.relatedTarget && t.contains(e.relatedTarget) ? f("last") : f("first"))
		}, p.handleEndFocus = function(e) {
			i || (null !== e.relatedTarget && e.relatedTarget === n.value ? f("last") : f("first"))
		}, p
	},
	render() {
		const {
			default: e
		} = this.$slots;
		if (void 0 === e) return null;
		if (this.disabled) return e();
		const {
			active: t,
			focusableStyle: n
		} = this, o = {
			"aria-hidden": "true"
		};
		o.tabindex = t ? "0" : "-1", o.ref = "focusableStartRef", o.style = n, o.onFocus = this.handleStartFocus;
		const r = {
			"aria-hidden": "true"
		};
		return r.style = n, r.ref = "focusableEndRef", r.tabindex = t ? "0" : "-1", r.onFocus = this.handleEndFocus, $r(nr, null, [$r("div", o), e(), $r("div", r)])
	}
});
let rc = 0,
	ic = "",
	sc = "",
	lc = "",
	ac = "";
const cc = Ct("0px");
const uc = Ct(!1),
	dc = () => {
		uc.value = !0
	},
	fc = () => {
		uc.value = !1
	};
let pc = 0;
const hc = "n-form-item";

function vc(e, {
	defaultSize: t = "medium",
	mergedSize: n,
	mergedDisabled: o
} = {}) {
	const r = pn(hc, null);
	fn(hc, null);
	const i = Wr(n ? () => n(r) : () => {
			const {
				size: n
			} = e;
			if (n) return n;
			if (r) {
				const {
					mergedSize: e
				} = r;
				if (void 0 !== e.value) return e.value
			}
			return t
		}),
		s = Wr(o ? () => o(r) : () => {
			const {
				disabled: t
			} = e;
			return void 0 !== t ? t : !!r && r.disabled.value
		}),
		l = Wr((() => {
			const {
				status: t
			} = e;
			return t || (null == r ? void 0 : r.mergedValidationStatus.value)
		}));
	return Zn((() => {
		r && r.restoreValidation()
	})), {
		mergedSizeRef: i,
		mergedDisabledRef: s,
		mergedStatusRef: l,
		nTriggerFormBlur() {
			r && r.handleContentBlur()
		},
		nTriggerFormChange() {
			r && r.handleContentChange()
		},
		nTriggerFormFocus() {
			r && r.handleContentFocus()
		},
		nTriggerFormInput() {
			r && r.handleContentInput()
		}
	}
}
const gc = "object" == typeof global && global && global.Object === Object && global;
var mc = "object" == typeof self && self && self.Object === Object && self;
const bc = gc || mc || Function("return this")();
const yc = bc.Symbol;
var xc = Object.prototype,
	Cc = xc.hasOwnProperty,
	wc = xc.toString,
	Sc = yc ? yc.toStringTag : void 0;
var kc = Object.prototype.toString;
var _c = "[object Null]",
	Pc = "[object Undefined]",
	Oc = yc ? yc.toStringTag : void 0;

function zc(e) {
	return null == e ? void 0 === e ? Pc : _c : Oc && Oc in Object(e) ? function(e) {
		var t = Cc.call(e, Sc),
			n = e[Sc];
		try {
			e[Sc] = void 0;
			var o = !0
		} catch (i) {}
		var r = wc.call(e);
		return o && (t ? e[Sc] = n : delete e[Sc]), r
	}(e) : (t = e, kc.call(t));
	var t
}

function Ec(e) {
	return null != e && "object" == typeof e
}
var Tc = "[object Symbol]";

function Rc(e) {
	return "symbol" == typeof e || Ec(e) && zc(e) == Tc
}

function jc(e, t) {
	for (var n = -1, o = null == e ? 0 : e.length, r = Array(o); ++n < o;) r[n] = t(e[n], n, e);
	return r
}
const Mc = Array.isArray;
var Ac = 1 / 0,
	Fc = yc ? yc.prototype : void 0,
	Bc = Fc ? Fc.toString : void 0;

function Lc(e) {
	if ("string" == typeof e) return e;
	if (Mc(e)) return jc(e, Lc) + "";
	if (Rc(e)) return Bc ? Bc.call(e) : "";
	var t = e + "";
	return "0" == t && 1 / e == -Ac ? "-0" : t
}

function Ic(e) {
	var t = typeof e;
	return null != e && ("object" == t || "function" == t)
}

function Hc(e) {
	return e
}
var Dc = "[object AsyncFunction]",
	Nc = "[object Function]",
	Wc = "[object GeneratorFunction]",
	$c = "[object Proxy]";

function Vc(e) {
	if (!Ic(e)) return !1;
	var t = zc(e);
	return t == Nc || t == Wc || t == Dc || t == $c
}
const qc = bc["__core-js_shared__"];
var Uc, Gc = (Uc = /[^.]+$/.exec(qc && qc.keys && qc.keys.IE_PROTO || "")) ? "Symbol(src)_1." + Uc : "";
var Xc = Function.prototype.toString;

function Zc(e) {
	if (null != e) {
		try {
			return Xc.call(e)
		} catch (t) {}
		try {
			return e + ""
		} catch (n) {}
	}
	return ""
}
var Kc = /^\[object .+?Constructor\]$/,
	Yc = Function.prototype,
	Qc = Object.prototype,
	Jc = Yc.toString,
	eu = Qc.hasOwnProperty,
	tu = RegExp("^" + Jc.call(eu)
		.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
		.replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

function nu(e) {
	return !(!Ic(e) || (t = e, Gc && Gc in t)) && (Vc(e) ? tu : Kc)
		.test(Zc(e));
	var t
}

function ou(e, t) {
	var n, o, r = (o = t, null == (n = e) ? void 0 : n[o]);
	return nu(r) ? r : void 0
}
var ru = Object.create;
const iu = function() {
	function e() {}
	return function(t) {
		if (!Ic(t)) return {};
		if (ru) return ru(t);
		e.prototype = t;
		var n = new e;
		return e.prototype = void 0, n
	}
}();
var su = Date.now;
const lu = function() {
	try {
		var e = ou(Object, "defineProperty");
		return e({}, "", {}), e
	} catch (t) {}
}();
var au, cu, uu;
const du = (au = lu ? function(e, t) {
	return lu(e, "toString", {
		configurable: !0,
		enumerable: !1,
		value: (n = t, function() {
			return n
		}),
		writable: !0
	});
	var n
} : Hc, cu = 0, uu = 0, function() {
	var e = su(),
		t = 16 - (e - uu);
	if (uu = e, t > 0) {
		if (++cu >= 800) return arguments[0]
	} else cu = 0;
	return au.apply(void 0, arguments)
});
var fu = 9007199254740991,
	pu = /^(?:0|[1-9]\d*)$/;

function hu(e, t) {
	var n = typeof e;
	return !!(t = null == t ? fu : t) && ("number" == n || "symbol" != n && pu.test(e)) && e > -1 && e % 1 == 0 && e < t
}

function vu(e, t, n) {
	if ("__proto__" == t && lu) {
		const o = {
			configurable: !0,
			enumerable: !0
		};
		o.value = n, o.writable = !0, lu(e, t, o)
	} else e[t] = n
}

function gu(e, t) {
	return e === t || e != e && t != t
}
var mu = Object.prototype.hasOwnProperty;
var bu = Math.max;

function yu(e, t) {
	return du((n = e, r = Hc, o = bu(void 0 === (o = t) ? n.length - 1 : o, 0), function() {
		for (var e = arguments, t = -1, i = bu(e.length - o, 0), s = Array(i); ++t < i;) s[t] = e[o + t];
		t = -1;
		for (var l = Array(o + 1); ++t < o;) l[t] = e[t];
		return l[o] = r(s),
			function(e, t, n) {
				switch (n.length) {
					case 0:
						return e.call(t);
					case 1:
						return e.call(t, n[0]);
					case 2:
						return e.call(t, n[0], n[1]);
					case 3:
						return e.call(t, n[0], n[1], n[2])
				}
				return e.apply(t, n)
			}(n, this, l)
	}), e + "");
	var n, o, r
}
var xu = 9007199254740991;

function Cu(e) {
	return "number" == typeof e && e > -1 && e % 1 == 0 && e <= xu
}

function wu(e) {
	return null != e && Cu(e.length) && !Vc(e)
}
var Su = Object.prototype;

function ku(e) {
	var t = e && e.constructor;
	return e === ("function" == typeof t && t.prototype || Su)
}

function _u(e) {
	return Ec(e) && "[object Arguments]" == zc(e)
}
var Pu = Object.prototype,
	Ou = Pu.hasOwnProperty,
	zu = Pu.propertyIsEnumerable;
const Eu = _u(function() {
	return arguments
}()) ? _u : function(e) {
	return Ec(e) && Ou.call(e, "callee") && !zu.call(e, "callee")
};
var Tu = "object" == typeof exports && exports && !exports.nodeType && exports,
	Ru = Tu && "object" == typeof module && module && !module.nodeType && module,
	ju = Ru && Ru.exports === Tu ? bc.Buffer : void 0;
const Mu = (ju ? ju.isBuffer : void 0) || function() {
	return !1
};
var Au = {};
Au["[object Float32Array]"] = Au["[object Float64Array]"] = Au["[object Int8Array]"] = Au["[object Int16Array]"] = Au["[object Int32Array]"] = Au["[object Uint8Array]"] = Au["[object Uint8ClampedArray]"] = Au["[object Uint16Array]"] = Au["[object Uint32Array]"] = !0, Au["[object Arguments]"] = Au["[object Array]"] = Au["[object ArrayBuffer]"] = Au["[object Boolean]"] = Au["[object DataView]"] = Au["[object Date]"] = Au["[object Error]"] = Au["[object Function]"] = Au["[object Map]"] = Au["[object Number]"] = Au["[object Object]"] = Au["[object RegExp]"] = Au["[object Set]"] = Au["[object String]"] = Au["[object WeakMap]"] = !1;
var Fu = "object" == typeof exports && exports && !exports.nodeType && exports,
	Bu = Fu && "object" == typeof module && module && !module.nodeType && module,
	Lu = Bu && Bu.exports === Fu && gc.process,
	Iu = function() {
		try {
			var e = Bu && Bu.require && Bu.require("util")
				.types;
			return e || Lu && Lu.binding && Lu.binding("util")
		} catch (t) {}
	}();
var Hu, Du = Iu && Iu.isTypedArray;
const Nu = Du ? (Hu = Du, function(e) {
	return Hu(e)
}) : function(e) {
	return Ec(e) && Cu(e.length) && !!Au[zc(e)]
};
var Wu = Object.prototype.hasOwnProperty;

function $u(e, t) {
	var n = Mc(e),
		o = !n && Eu(e),
		r = !n && !o && Mu(e),
		i = !n && !o && !r && Nu(e),
		s = n || o || r || i,
		l = s ? function(e, t) {
			for (var n = -1, o = Array(e); ++n < e;) o[n] = t(n);
			return o
		}(e.length, String) : [],
		a = l.length;
	for (var c in e)(t || Wu.call(e, c)) && (!s || !("length" == c || r && ("offset" == c || "parent" == c) || i && ("buffer" == c || "byteLength" == c || "byteOffset" == c) || hu(c, a))) && l.push(c);
	return l
}

function Vu(e, t) {
	return function(n) {
		return e(t(n))
	}
}
var qu = Object.prototype.hasOwnProperty;

function Uu(e) {
	if (!Ic(e)) return function(e) {
		var t = [];
		if (null != e)
			for (var n in Object(e)) t.push(n);
		return t
	}(e);
	var t = ku(e),
		n = [];
	for (var o in e)("constructor" != o || !t && qu.call(e, o)) && n.push(o);
	return n
}

function Gu(e) {
	return wu(e) ? $u(e, !0) : Uu(e)
}
const Xu = ou(Object, "create");
var Zu = Object.prototype.hasOwnProperty;
var Ku = Object.prototype.hasOwnProperty;

function Yu(e) {
	var t = -1,
		n = null == e ? 0 : e.length;
	for (this.clear(); ++t < n;) {
		var o = e[t];
		this.set(o[0], o[1])
	}
}

function Qu(e, t) {
	for (var n = e.length; n--;)
		if (gu(e[n][0], t)) return n;
	return -1
}
Yu.prototype.clear = function() {
	this.__data__ = Xu ? Xu(null) : {}, this.size = 0
}, Yu.prototype.delete = function(e) {
	var t = this.has(e) && delete this.__data__[e];
	return this.size -= t ? 1 : 0, t
}, Yu.prototype.get = function(e) {
	var t = this.__data__;
	if (Xu) {
		var n = t[e];
		return "__lodash_hash_undefined__" === n ? void 0 : n
	}
	return Zu.call(t, e) ? t[e] : void 0
}, Yu.prototype.has = function(e) {
	var t = this.__data__;
	return Xu ? void 0 !== t[e] : Ku.call(t, e)
}, Yu.prototype.set = function(e, t) {
	var n = this.__data__;
	return this.size += this.has(e) ? 0 : 1, n[e] = Xu && void 0 === t ? "__lodash_hash_undefined__" : t, this
};
var Ju = Array.prototype.splice;

function ed(e) {
	var t = -1,
		n = null == e ? 0 : e.length;
	for (this.clear(); ++t < n;) {
		var o = e[t];
		this.set(o[0], o[1])
	}
}
ed.prototype.clear = function() {
	this.__data__ = [], this.size = 0
}, ed.prototype.delete = function(e) {
	var t = this.__data__,
		n = Qu(t, e);
	return !(n < 0) && (n == t.length - 1 ? t.pop() : Ju.call(t, n, 1), --this.size, !0)
}, ed.prototype.get = function(e) {
	var t = this.__data__,
		n = Qu(t, e);
	return n < 0 ? void 0 : t[n][1]
}, ed.prototype.has = function(e) {
	return Qu(this.__data__, e) > -1
}, ed.prototype.set = function(e, t) {
	var n = this.__data__,
		o = Qu(n, e);
	return o < 0 ? (++this.size, n.push([e, t])) : n[o][1] = t, this
};
const td = ou(bc, "Map");

function nd(e, t) {
	var n, o, r = e.__data__;
	return ("string" == (o = typeof(n = t)) || "number" == o || "symbol" == o || "boolean" == o ? "__proto__" !== n : null === n) ? r["string" == typeof t ? "string" : "hash"] : r.map
}

function od(e) {
	var t = -1,
		n = null == e ? 0 : e.length;
	for (this.clear(); ++t < n;) {
		var o = e[t];
		this.set(o[0], o[1])
	}
}

function rd(e) {
	return null == e ? "" : Lc(e)
}
od.prototype.clear = function() {
	this.size = 0, this.__data__ = {
		hash: new Yu,
		map: new(td || ed),
		string: new Yu
	}
}, od.prototype.delete = function(e) {
	var t = nd(this, e)
		.delete(e);
	return this.size -= t ? 1 : 0, t
}, od.prototype.get = function(e) {
	return nd(this, e)
		.get(e)
}, od.prototype.has = function(e) {
	return nd(this, e)
		.has(e)
}, od.prototype.set = function(e, t) {
	var n = nd(this, e),
		o = n.size;
	return n.set(e, t), this.size += n.size == o ? 0 : 1, this
};
const id = Vu(Object.getPrototypeOf, Object);
var sd = "[object Object]",
	ld = Function.prototype,
	ad = Object.prototype,
	cd = ld.toString,
	ud = ad.hasOwnProperty,
	dd = cd.call(Object);

function fd(e, t, n) {
	var o = e.length;
	return n = void 0 === n ? o : n, !t && n >= o ? e : function(e, t, n) {
		var o = -1,
			r = e.length;
		t < 0 && (t = -t > r ? 0 : r + t), (n = n > r ? r : n) < 0 && (n += r), r = t > n ? 0 : n - t >>> 0, t >>>= 0;
		for (var i = Array(r); ++o < r;) i[o] = e[o + t];
		return i
	}(e, t, n)
}
var pd = RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");

function hd(e) {
	return pd.test(e)
}
var vd, gd = "\\ud800-\\udfff",
	md = "[" + gd + "]",
	bd = "[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",
	yd = "\\ud83c[\\udffb-\\udfff]",
	xd = "[^" + gd + "]",
	Cd = "(?:\\ud83c[\\udde6-\\uddff]){2}",
	wd = "[\\ud800-\\udbff][\\udc00-\\udfff]",
	Sd = "(?:" + bd + "|" + yd + ")" + "?",
	kd = "[\\ufe0e\\ufe0f]?",
	_d = kd + Sd + ("(?:\\u200d(?:" + [xd, Cd, wd].join("|") + ")" + kd + Sd + ")*"),
	Pd = "(?:" + [xd + bd + "?", bd, Cd, wd, md].join("|") + ")",
	Od = RegExp(yd + "(?=" + yd + ")|" + Pd + _d, "g");

function zd(e) {
	return hd(e) ? e.match(Od) || [] : e.split("")
}
const Ed = (vd = "toUpperCase", function(e) {
	var t = hd(e = rd(e)) ? zd(e) : void 0,
		n = t ? t[0] : e.charAt(0),
		o = t ? fd(t, 1)
		.join("") : e.slice(1);
	return n[vd]() + o
});

function Td(e) {
	var t = this.__data__ = new ed(e);
	this.size = t.size
}
Td.prototype.clear = function() {
	this.__data__ = new ed, this.size = 0
}, Td.prototype.delete = function(e) {
	var t = this.__data__,
		n = t.delete(e);
	return this.size = t.size, n
}, Td.prototype.get = function(e) {
	return this.__data__.get(e)
}, Td.prototype.has = function(e) {
	return this.__data__.has(e)
}, Td.prototype.set = function(e, t) {
	var n = this.__data__;
	if (n instanceof ed) {
		var o = n.__data__;
		if (!td || o.length < 199) return o.push([e, t]), this.size = ++n.size, this;
		n = this.__data__ = new od(o)
	}
	return n.set(e, t), this.size = n.size, this
};
var Rd = "object" == typeof exports && exports && !exports.nodeType && exports,
	jd = Rd && "object" == typeof module && module && !module.nodeType && module,
	Md = jd && jd.exports === Rd ? bc.Buffer : void 0,
	Ad = Md ? Md.allocUnsafe : void 0;
const Fd = bc.Uint8Array;

function Bd(e, t) {
	var n, o, r = t ? (n = e.buffer, o = new n.constructor(n.byteLength), new Fd(o)
		.set(new Fd(n)), o) : e.buffer;
	return new e.constructor(r, e.byteOffset, e.length)
}
var Ld;
const Id = function(e, t, n) {
	for (var o = -1, r = Object(e), i = n(e), s = i.length; s--;) {
		var l = i[Ld ? s : ++o];
		if (!1 === t(r[l], l, r)) break
	}
	return e
};

function Hd(e, t, n) {
	(void 0 !== n && !gu(e[t], n) || void 0 === n && !(t in e)) && vu(e, t, n)
}

function Dd(e, t) {
	if (("constructor" !== t || "function" != typeof e[t]) && "__proto__" != t) return e[t]
}

function Nd(e) {
	return function(e, t, n, o) {
		var r = !n;
		n || (n = {});
		for (var i, s, l, a, c = -1, u = t.length; ++c < u;) {
			var d = t[c],
				f = o ? o(n[d], e[d], d, n, e) : void 0;
			void 0 === f && (f = e[d]), r ? vu(n, d, f) : (l = f, a = void 0, a = (i = n)[s = d], (!mu.call(i, s) || !gu(a, l) || void 0 === l && !(s in i)) && vu(i, s, l))
		}
		return n
	}(e, Gu(e))
}

function Wd(e, t, n, o, r, i, s) {
	var l = Dd(e, n),
		a = Dd(t, n),
		c = s.get(a);
	if (c) Hd(e, n, c);
	else {
		var u, d, f = i ? i(l, a, n + "", e, t, s) : void 0,
			p = void 0 === f;
		if (p) {
			var h = Mc(a),
				v = !h && Mu(a),
				g = !h && !v && Nu(a);
			f = a, h || v || g ? Mc(l) ? f = l : Ec(d = l) && wu(d) ? f = function(e, t) {
				var n = -1,
					o = e.length;
				for (t || (t = Array(o)); ++n < o;) t[n] = e[n];
				return t
			}(l) : v ? (p = !1, f = function(e, t) {
				if (t) return e.slice();
				var n = e.length,
					o = Ad ? Ad(n) : new e.constructor(n);
				return e.copy(o), o
			}(a, !0)) : g ? (p = !1, f = Bd(a, !0)) : f = [] : function(e) {
				if (!Ec(e) || zc(e) != sd) return !1;
				var t = id(e);
				if (null === t) return !0;
				var n = ud.call(t, "constructor") && t.constructor;
				return "function" == typeof n && n instanceof n && cd.call(n) == dd
			}(a) || Eu(a) ? (f = l, Eu(l) ? f = Nd(l) : (!Ic(l) || Vc(l)) && (f = "function" != typeof(u = a)
				.constructor || ku(u) ? {} : iu(id(u)))) : p = !1
		}
		p && (s.set(a, f), r(f, a, o, i, s), s.delete(a)), Hd(e, n, f)
	}
}

function $d(e, t, n, o, r) {
	e !== t && Id(t, (function(i, s) {
		if (r || (r = new Td), Ic(i)) Wd(e, t, s, n, $d, o, r);
		else {
			var l = o ? o(Dd(e, s), i, s + "", e, t, r) : void 0;
			void 0 === l && (l = i), Hd(e, s, l)
		}
	}), Gu)
}
var Vd;
const qd = (Vd = function(e, t, n) {
		$d(e, t, n)
	}, yu((function(e, t) {
		var n = -1,
			o = t.length,
			r = o > 1 ? t[o - 1] : void 0,
			i = o > 2 ? t[2] : void 0;
		for (r = Vd.length > 3 && "function" == typeof r ? (o--, r) : void 0, i && function(e, t, n) {
			if (!Ic(n)) return !1;
			var o = typeof t;
			return !!("number" == o ? wu(n) && hu(t, n.length) : "string" == o && t in n) && gu(n[t], e)
		}(t[0], t[1], i) && (r = o < 3 ? void 0 : r, o = 1), e = Object(e); ++n < o;) {
			var s = t[n];
			s && Vd(e, s, n, r)
		}
		return e
	}))),
	Ud = {
		fontFamily: 'v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
		fontFamilyMono: "v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace",
		fontWeight: "400",
		fontWeightStrong: "500",
		cubicBezierEaseInOut: "cubic-bezier(.4, 0, .2, 1)",
		cubicBezierEaseOut: "cubic-bezier(0, 0, .2, 1)",
		cubicBezierEaseIn: "cubic-bezier(.4, 0, 1, 1)",
		borderRadius: "3px",
		borderRadiusSmall: "2px",
		fontSize: "14px",
		fontSizeMini: "12px",
		fontSizeTiny: "12px",
		fontSizeSmall: "14px",
		fontSizeMedium: "14px",
		fontSizeLarge: "15px",
		fontSizeHuge: "16px",
		lineHeight: "1.6",
		heightMini: "16px",
		heightTiny: "22px",
		heightSmall: "28px",
		heightMedium: "34px",
		heightLarge: "40px",
		heightHuge: "46px"
	},
	Gd = Ud,
	{
		fontSize: Xd,
		fontFamily: Zd,
		lineHeight: Kd
	} = Gd,
	Yd = il("body", "\n margin: 0;\n font-size: " + Xd + ";\n font-family: " + Zd + ";\n line-height: " + Kd + ";\n -webkit-text-size-adjust: 100%;\n -webkit-tap-highlight-color: transparent;\n", [il("input", "\n font-family: inherit;\n font-size: inherit;\n ")]),
	Qd = "n-config-provider",
	Jd = "naive-ui-style";

function ef(e) {
	return e
}

function tf(e, t, n, o, r, i) {
	const s = ea(),
		l = pn(Qd, null);
	if (n) {
		const e = () => {
			const e = null == i ? void 0 : i.value,
				o = {};
			if (o.id = void 0 === e ? t : e + t, o.head = !0, o.props = {}, o.anchorMetaName = Jd, o.ssr = s, o.props.bPrefix = e ? "." + e + "-" : void 0, n.mount(o), !(null == l ? void 0 : l.preflightStyleDisabled)) {
				const e = {
					id: "n-global",
					head: !0
				};
				e.anchorMetaName = Jd, e.ssr = s, Yd.mount(e)
			}
		};
		s ? e() : qn(e)
	}
	return Wr((() => {
		var t;
		const {
			theme: {
				common: n,
				self: i,
				peers: s = {}
			} = {},
			themeOverrides: a = {},
			builtinThemeOverrides: c = {}
		} = r, {
			common: u,
			peers: d
		} = a, {
			common: f,
			[e]: {
				common: p,
				self: h,
				peers: v = {}
			} = {}
		} = (null == l ? void 0 : l.mergedThemeRef.value) || {}, {
			common: g,
			[e]: m = {}
		} = (null == l ? void 0 : l.mergedThemeOverridesRef.value) || {}, {
			common: b,
			peers: y = {}
		} = m, x = qd({}, n || p || f || o.common, g, b, u);
		return {
			common: x,
			self: qd(null === (t = i || h || o.self) || void 0 === t ? void 0 : t(x), c, m, a),
			peers: qd({}, o.peers, v, s),
			peerOverrides: qd({}, c.peers, y, d)
		}
	}))
}
const nf = {};
nf.theme = Object, nf.themeOverrides = Object, nf.builtinThemeOverrides = Object, tf.props = nf;
const of = "n", rf = {};

function sf(e = {}, t = rf) {
	const n = pn(Qd, null);
	return {
		inlineThemeDisabled: null == n ? void 0 : n.inlineThemeDisabled,
		mergedRtlRef: null == n ? void 0 : n.mergedRtlRef,
		mergedComponentPropsRef: null == n ? void 0 : n.mergedComponentPropsRef,
		mergedBreakpointsRef: null == n ? void 0 : n.mergedBreakpointsRef,
		mergedBorderedRef: Wr((() => {
			var o, r;
			const {
				bordered: i
			} = e;
			return void 0 !== i ? i : null === (r = null !== (o = null == n ? void 0 : n.mergedBorderedRef.value) && void 0 !== o ? o : t.defaultBordered) || void 0 === r || r
		})),
		mergedClsPrefixRef: Wr((() => (null == n ? void 0 : n.mergedClsPrefixRef.value) || of )),
		namespaceRef: Wr((() => null == n ? void 0 : n.mergedNamespaceRef.value))
	}
}
rf.defaultBordered = !0;
const lf = {
		undo: "撤销",
		redo: "重做",
		confirm: "确认",
		clear: "清除"
	},
	af = {
		positiveText: "确认",
		negativeText: "取消"
	},
	cf = {
		placeholder: "请选择",
		loading: "加载中",
		loadingRequiredMessage: e => "加载全部 " + e + " 的子节点后才可选中"
	},
	uf = {
		dateFormat: "yyyy-MM-dd",
		dateTimeFormat: "yyyy-MM-dd HH:mm:ss"
	},
	df = {
		yearFormat: "yyyy年",
		monthFormat: "MMM",
		dayFormat: "eeeeee",
		yearTypeFormat: "yyyy",
		monthTypeFormat: "yyyy-MM",
		dateFormat: "yyyy-MM-dd",
		dateTimeFormat: "yyyy-MM-dd HH:mm:ss",
		quarterFormat: "yyyy-qqq",
		clear: "清除",
		now: "此刻",
		confirm: "确认",
		selectTime: "选择时间",
		selectDate: "选择日期",
		datePlaceholder: "选择日期",
		datetimePlaceholder: "选择日期时间",
		monthPlaceholder: "选择月份",
		yearPlaceholder: "选择年份",
		quarterPlaceholder: "选择季度",
		startDatePlaceholder: "开始日期",
		endDatePlaceholder: "结束日期",
		startDatetimePlaceholder: "开始日期时间",
		endDatetimePlaceholder: "结束日期时间",
		startMonthPlaceholder: "开始月份",
		endMonthPlaceholder: "结束月份",
		monthBeforeYear: !1,
		firstDayOfWeek: 0,
		today: "今天"
	},
	ff = {
		checkTableAll: "选择全部表格数据",
		uncheckTableAll: "取消选择全部表格数据",
		confirm: "确认",
		clear: "重置"
	},
	pf = {
		sourceTitle: "源项",
		targetTitle: "目标项"
	},
	hf = {
		selectAll: "全选",
		clearAll: "清除",
		unselectAll: "取消全选",
		total: e => "共 " + e + " 项",
		selected: e => "已选 " + e + " 项"
	},
	vf = {
		description: "无数据"
	},
	gf = {
		placeholder: "请选择"
	},
	mf = {
		placeholder: "请选择时间",
		positiveText: "确认",
		negativeText: "取消",
		now: "此刻"
	},
	bf = {
		goto: "跳至",
		selectionSuffix: "页"
	},
	yf = {
		add: "添加"
	},
	xf = {
		loading: "加载中"
	},
	Cf = {
		placeholder: "请输入"
	},
	wf = {
		placeholder: "请输入"
	},
	Sf = {
		create: "添加"
	},
	kf = {
		title: "主题编辑器",
		clearAllVars: "清除全部变量",
		clearSearch: "清除搜索",
		filterCompName: "过滤组件名",
		filterVarName: "过滤变量名",
		import: "导入",
		export: "导出",
		restore: "恢复默认"
	},
	_f = {
		tipPrevious: "上一张（←）",
		tipNext: "下一张（→）",
		tipCounterclockwise: "向左旋转",
		tipClockwise: "向右旋转",
		tipZoomOut: "缩小",
		tipZoomIn: "放大",
		tipClose: "关闭（Esc）",
		tipOriginalSize: "缩放到原始尺寸"
	},
	Pf = {
		name: "zh-CN"
	};
Pf.global = lf, Pf.Popconfirm = af, Pf.Cascader = cf, Pf.Time = uf, Pf.DatePicker = df, Pf.DataTable = ff, Pf.LegacyTransfer = pf, Pf.Transfer = hf, Pf.Empty = vf, Pf.Select = gf, Pf.TimePicker = mf, Pf.Pagination = bf, Pf.DynamicTags = yf, Pf.Log = xf, Pf.Input = Cf, Pf.InputNumber = wf, Pf.DynamicInput = Sf, Pf.ThemeEditor = kf, Pf.Image = _f;
const Of = Pf,
	zf = {
		one: "不到 1 秒",
		other: "不到 {{count}} 秒"
	},
	Ef = {
		one: "1 秒",
		other: "{{count}} 秒"
	},
	Tf = {
		one: "不到 1 分钟",
		other: "不到 {{count}} 分钟"
	},
	Rf = {
		one: "1 分钟",
		other: "{{count}} 分钟"
	},
	jf = {
		one: "1 小时",
		other: "{{count}} 小时"
	},
	Mf = {
		one: "大约 1 小时",
		other: "大约 {{count}} 小时"
	},
	Af = {
		one: "1 天",
		other: "{{count}} 天"
	},
	Ff = {
		one: "大约 1 个星期",
		other: "大约 {{count}} 个星期"
	},
	Bf = {
		one: "1 个星期",
		other: "{{count}} 个星期"
	},
	Lf = {
		one: "大约 1 个月",
		other: "大约 {{count}} 个月"
	},
	If = {
		one: "1 个月",
		other: "{{count}} 个月"
	},
	Hf = {
		one: "大约 1 年",
		other: "大约 {{count}} 年"
	},
	Df = {
		one: "1 年",
		other: "{{count}} 年"
	},
	Nf = {
		one: "超过 1 年",
		other: "超过 {{count}} 年"
	},
	Wf = {
		one: "将近 1 年",
		other: "将近 {{count}} 年"
	},
	$f = {};
$f.lessThanXSeconds = zf, $f.xSeconds = Ef, $f.halfAMinute = "半分钟", $f.lessThanXMinutes = Tf, $f.xMinutes = Rf, $f.xHours = jf, $f.aboutXHours = Mf, $f.xDays = Af, $f.aboutXWeeks = Ff, $f.xWeeks = Bf, $f.aboutXMonths = Lf, $f.xMonths = If, $f.aboutXYears = Hf, $f.xYears = Df, $f.overXYears = Nf, $f.almostXYears = Wf;
var Vf = $f;
const qf = function(e, t, n) {
	var o, r = Vf[e];
	return o = "string" == typeof r ? r : 1 === t ? r.one : r.other.replace("{{count}}", String(t)), null != n && n.addSuffix ? n.comparison && n.comparison > 0 ? o + "内" : o + "前" : o
};

function Uf(e) {
	return function() {
		var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
			n = t.width ? String(t.width) : e.defaultWidth;
		return e.formats[n] || e.formats[e.defaultWidth]
	}
}
const Gf = {
	full: "y'年'M'月'd'日' EEEE",
	long: "y'年'M'月'd'日'",
	medium: "yyyy-MM-dd",
	short: "yy-MM-dd"
};
var Xf = Gf;
const Zf = {
	full: "zzzz a h:mm:ss",
	long: "z a h:mm:ss",
	medium: "a h:mm:ss",
	short: "a h:mm"
};
var Kf = Zf;
const Yf = {
	full: "{{date}} {{time}}",
	long: "{{date}} {{time}}",
	medium: "{{date}} {{time}}",
	short: "{{date}} {{time}}"
};
var Qf = Yf;
const Jf = {};
Jf.formats = Xf, Jf.defaultWidth = "full";
const ep = {};
ep.formats = Kf, ep.defaultWidth = "full";
const tp = {};
tp.formats = Qf, tp.defaultWidth = "full";
const np = {
	date: Uf(Jf),
	time: Uf(ep),
	dateTime: Uf(tp)
};

function op(e, t) {
	if (t.length < e) throw new TypeError(e + " argument" + (e > 1 ? "s" : "") + " required, but only " + t.length + " present")
}

function rp(e) {
	return (rp = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
	})(e)
}
var ip = {};

function sp(e, t) {
	var n, o, r, i, s, l, a, c;
	op(1, arguments);
	var u = ip,
		d = function(e) {
			if (null === e || !0 === e || !1 === e) return NaN;
			var t = Number(e);
			return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t)
		}(null !== (n = null !== (o = null !== (r = null !== (i = null == t ? void 0 : t.weekStartsOn) && void 0 !== i ? i : null == t || null === (s = t.locale) || void 0 === s || null === (l = s.options) || void 0 === l ? void 0 : l.weekStartsOn) && void 0 !== r ? r : u.weekStartsOn) && void 0 !== o ? o : null === (a = u.locale) || void 0 === a || null === (c = a.options) || void 0 === c ? void 0 : c.weekStartsOn) && void 0 !== n ? n : 0);
	if (!(d >= 0 && d <= 6)) throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
	var f = function(e) {
			op(1, arguments);
			var t = Object.prototype.toString.call(e);
			return e instanceof Date || "object" === rp(e) && "[object Date]" === t ? new Date(e.getTime()) : "number" == typeof e || "[object Number]" === t ? new Date(e) : (("string" == typeof e || "[object String]" === t) && "undefined" != typeof console && (console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"), console.warn((new Error)
				.stack)), new Date(NaN))
		}(e),
		p = f.getUTCDay(),
		h = (p < d ? 7 : 0) + p - d;
	return f.setUTCDate(f.getUTCDate() - h), f.setUTCHours(0, 0, 0, 0), f
}

function lp(e, t, n) {
	var o = "eeee p";
	return function(e, t, n) {
		op(2, arguments);
		var o = sp(e, n),
			r = sp(t, n);
		return o.getTime() === r.getTime()
	}(e, t, n) ? o : e.getTime() > t.getTime() ? "'下个'" + o : "'上个'" + o
}
const ap = {};
ap.lastWeek = lp, ap.yesterday = "'昨天' p", ap.today = "'今天' p", ap.tomorrow = "'明天' p", ap.nextWeek = lp, ap.other = "PP p";
var cp = ap;
const up = function(e, t, n, o) {
	var r = cp[e];
	return "function" == typeof r ? r(t, n, o) : r
};

function dp(e) {
	return function(t, n) {
		var o;
		if ("formatting" === (null != n && n.context ? String(n.context) : "standalone") && e.formattingValues) {
			var r = e.defaultFormattingWidth || e.defaultWidth,
				i = null != n && n.width ? String(n.width) : r;
			o = e.formattingValues[i] || e.formattingValues[r]
		} else {
			var s = e.defaultWidth,
				l = null != n && n.width ? String(n.width) : e.defaultWidth;
			o = e.values[l] || e.values[s]
		}
		return o[e.argumentCallback ? e.argumentCallback(t) : t]
	}
}
const fp = {
	narrow: ["前", "公元"],
	abbreviated: ["前", "公元"],
	wide: ["公元前", "公元"]
};
var pp = fp;
const hp = {
	narrow: ["1", "2", "3", "4"],
	abbreviated: ["第一季", "第二季", "第三季", "第四季"],
	wide: ["第一季度", "第二季度", "第三季度", "第四季度"]
};
var vp = hp;
const gp = {
	narrow: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
	abbreviated: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
	wide: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
};
var mp = gp;
const bp = {
	narrow: ["日", "一", "二", "三", "四", "五", "六"],
	short: ["日", "一", "二", "三", "四", "五", "六"],
	abbreviated: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
	wide: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
};
var yp = bp;
const xp = {
		am: "上",
		pm: "下",
		midnight: "凌晨",
		noon: "午",
		morning: "早",
		afternoon: "下午",
		evening: "晚",
		night: "夜"
	},
	Cp = {
		am: "上午",
		pm: "下午",
		midnight: "凌晨",
		noon: "中午",
		morning: "早晨",
		afternoon: "中午",
		evening: "晚上",
		night: "夜间"
	},
	wp = {
		am: "上午",
		pm: "下午",
		midnight: "凌晨",
		noon: "中午",
		morning: "早晨",
		afternoon: "中午",
		evening: "晚上",
		night: "夜间"
	},
	Sp = {};
Sp.narrow = xp, Sp.abbreviated = Cp, Sp.wide = wp;
var kp = Sp;
const _p = {
		am: "上",
		pm: "下",
		midnight: "凌晨",
		noon: "午",
		morning: "早",
		afternoon: "下午",
		evening: "晚",
		night: "夜"
	},
	Pp = {
		am: "上午",
		pm: "下午",
		midnight: "凌晨",
		noon: "中午",
		morning: "早晨",
		afternoon: "中午",
		evening: "晚上",
		night: "夜间"
	},
	Op = {
		am: "上午",
		pm: "下午",
		midnight: "凌晨",
		noon: "中午",
		morning: "早晨",
		afternoon: "中午",
		evening: "晚上",
		night: "夜间"
	},
	zp = {};
zp.narrow = _p, zp.abbreviated = Pp, zp.wide = Op;
var Ep = zp;
const Tp = {};
Tp.values = pp, Tp.defaultWidth = "wide";
const Rp = {};
Rp.values = vp, Rp.defaultWidth = "wide", Rp.argumentCallback = function(e) {
	return e - 1
};
const jp = {};
jp.values = mp, jp.defaultWidth = "wide";
const Mp = {};
Mp.values = yp, Mp.defaultWidth = "wide";
const Ap = {};
Ap.values = kp, Ap.defaultWidth = "wide", Ap.formattingValues = Ep, Ap.defaultFormattingWidth = "wide";
const Fp = {
	ordinalNumber: function(e, t) {
		var n = Number(e);
		switch (null == t ? void 0 : t.unit) {
			case "date":
				return n.toString() + "日";
			case "hour":
				return n.toString() + "时";
			case "minute":
				return n.toString() + "分";
			case "second":
				return n.toString() + "秒";
			default:
				return "第 " + n.toString()
		}
	},
	era: dp(Tp),
	quarter: dp(Rp),
	month: dp(jp),
	day: dp(Mp),
	dayPeriod: dp(Ap)
};

function Bp(e) {
	return function(t) {
		var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
			o = n.width,
			r = o && e.matchPatterns[o] || e.matchPatterns[e.defaultMatchWidth],
			i = t.match(r);
		if (!i) return null;
		var s, l = i[0],
			a = o && e.parsePatterns[o] || e.parsePatterns[e.defaultParseWidth],
			c = Array.isArray(a) ? function(e, t) {
				for (var n = 0; n < e.length; n++)
					if (t(e[n])) return n;
				return
			}(a, (function(e) {
				return e.test(l)
			})) : function(e, t) {
				for (var n in e)
					if (e.hasOwnProperty(n) && t(e[n])) return n;
				return
			}(a, (function(e) {
				return e.test(l)
			}));
		s = e.valueCallback ? e.valueCallback(c) : c, s = n.valueCallback ? n.valueCallback(s) : s;
		var u = t.slice(l.length);
		const d = {};
		return d.value = s, d.rest = u, d
	}
}

function Lp(e) {
	return function(t) {
		var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
			o = t.match(e.matchPattern);
		if (!o) return null;
		var r = o[0],
			i = t.match(e.parsePattern);
		if (!i) return null;
		var s = e.valueCallback ? e.valueCallback(i[0]) : i[0];
		s = n.valueCallback ? n.valueCallback(s) : s;
		var l = t.slice(r.length);
		const a = {};
		return a.value = s, a.rest = l, a
	}
}
const Ip = {
	narrow: /^(前)/i,
	abbreviated: /^(前)/i,
	wide: /^(公元前|公元)/i
};
var Hp = Ip;
const Dp = {
	any: [/^(前)/i, /^(公元)/i]
};
var Np = Dp;
const Wp = {
	narrow: /^[1234]/i,
	abbreviated: /^第[一二三四]刻/i,
	wide: /^第[一二三四]刻钟/i
};
var $p = Wp;
const Vp = {
	any: [/(1|一)/i, /(2|二)/i, /(3|三)/i, /(4|四)/i]
};
var qp = Vp;
const Up = {
	narrow: /^(一|二|三|四|五|六|七|八|九|十[二一])/i,
	abbreviated: /^(一|二|三|四|五|六|七|八|九|十[二一]|\d|1[12])月/i,
	wide: /^(一|二|三|四|五|六|七|八|九|十[二一])月/i
};
var Gp = Up;
const Xp = {
	narrow: [/^一/i, /^二/i, /^三/i, /^四/i, /^五/i, /^六/i, /^七/i, /^八/i, /^九/i, /^十(?!(一|二))/i, /^十一/i, /^十二/i],
	any: [/^一|1/i, /^二|2/i, /^三|3/i, /^四|4/i, /^五|5/i, /^六|6/i, /^七|7/i, /^八|8/i, /^九|9/i, /^十(?!(一|二))|10/i, /^十一|11/i, /^十二|12/i]
};
var Zp = Xp;
const Kp = {
	narrow: /^[一二三四五六日]/i,
	short: /^[一二三四五六日]/i,
	abbreviated: /^周[一二三四五六日]/i,
	wide: /^星期[一二三四五六日]/i
};
var Yp = Kp;
const Qp = {
	any: [/日/i, /一/i, /二/i, /三/i, /四/i, /五/i, /六/i]
};
var Jp = Qp;
const eh = {
	any: /^(上午?|下午?|午夜|[中正]午|早上?|下午|晚上?|凌晨|)/i
};
var th = eh;
const nh = {
		am: /^上午?/i,
		pm: /^下午?/i,
		midnight: /^午夜/i,
		noon: /^[中正]午/i,
		morning: /^早上/i,
		afternoon: /^下午/i,
		evening: /^晚上?/i,
		night: /^凌晨/i
	},
	oh = {};
oh.any = nh;
var rh = oh;
const ih = {};
ih.matchPatterns = Hp, ih.defaultMatchWidth = "wide", ih.parsePatterns = Np, ih.defaultParseWidth = "any";
const sh = {};
sh.matchPatterns = Gp, sh.defaultMatchWidth = "wide", sh.parsePatterns = Zp, sh.defaultParseWidth = "any";
const lh = {};
lh.matchPatterns = Yp, lh.defaultMatchWidth = "wide", lh.parsePatterns = Jp, lh.defaultParseWidth = "any";
const ah = {};
ah.matchPatterns = th, ah.defaultMatchWidth = "any", ah.parsePatterns = rh, ah.defaultParseWidth = "any";
const ch = {
		ordinalNumber: Lp({
			matchPattern: /^(第\s*)?\d+(日|时|分|秒)?/i,
			parsePattern: /\d+/i,
			valueCallback: function(e) {
				return parseInt(e, 10)
			}
		}),
		era: Bp(ih),
		quarter: Bp({
			matchPatterns: $p,
			defaultMatchWidth: "wide",
			parsePatterns: qp,
			defaultParseWidth: "any",
			valueCallback: function(e) {
				return e + 1
			}
		}),
		month: Bp(sh),
		day: Bp(lh),
		dayPeriod: Bp(ah)
	},
	uh = {
		weekStartsOn: 1,
		firstWeekContainsDate: 4
	},
	dh = {
		code: "zh-CN"
	};
dh.formatDistance = qf, dh.formatLong = np, dh.formatRelative = up, dh.localize = Fp, dh.match = ch, dh.options = uh;
const fh = dh,
	ph = {
		name: "zh-CN"
	};
ph.locale = fh;
const hh = ph;

function vh(e, t, n) {
	if (!t) return;
	const o = ea(),
		r = pn(Qd, null),
		i = () => {
			const i = null == n ? void 0 : n.value,
				s = {};
			if (s.id = void 0 === i ? e : i + e, s.head = !0, s.anchorMetaName = Jd, s.props = {}, s.ssr = o, s.props.bPrefix = i ? "." + i + "-" : void 0, t.mount(s), !(null == r ? void 0 : r.preflightStyleDisabled)) {
				const e = {
					id: "n-global",
					head: !0
				};
				e.anchorMetaName = Jd, e.ssr = o, Yd.mount(e)
			}
		};
	o ? i() : qn(i)
}

function gh(e, t, n, o) {
	var r;
	n || Ss("useThemeClass", "cssVarsRef is not passed");
	const i = null === (r = pn(Qd, null)) || void 0 === r ? void 0 : r.mergedThemeHashRef,
		s = Ct(""),
		l = ea();
	let a;
	const c = "__" + e;
	return hn((() => {
		(() => {
			let e = c;
			const r = t ? t.value : void 0,
				u = null == i ? void 0 : i.value;
			u && (e += "-" + u), r && (e += "-" + r);
			const {
				themeOverrides: d,
				builtinThemeOverrides: f
			} = o;
			d && (e += "-" + Us(JSON.stringify(d))), f && (e += "-" + Us(JSON.stringify(f))), s.value = e, a = () => {
				const t = n.value;
				let o = "";
				for (const e in t) o += e + ": " + t[e] + ";";
				il("." + e, o)
					.mount({
						id: e,
						ssr: l
					}), a = void 0
			}
		})()
	})), {
		themeClass: s,
		onRender: () => {
			null == a || a()
		}
	}
}

function mh(e, t, n) {
	if (!t) return;
	const o = ea(),
		r = Wr((() => {
			const {
				value: n
			} = t;
			if (!n) return;
			const o = n[e];
			return o || void 0
		})),
		i = () => {
			hn((() => {
				const {
					value: t
				} = n, i = "" + t + e + "Rtl";
				if (function(e, t) {
					if (void 0 === e) return !1;
					if (t) {
						const {
							context: {
								ids: n
							}
						} = t;
						return n.has(e)
					}
					return null !== Is(e)
				}(i, o)) return;
				const {
					value: s
				} = r;
				if (!s) return;
				const l = {};
				l.bPrefix = t ? "." + t + "-" : void 0;
				const a = {};
				a.id = i, a.head = !0, a.anchorMetaName = Jd, a.props = l, a.ssr = o, s.style.mount(a)
			}))
		};
	return o ? i() : qn(i), r
}

function bh(e, t) {
	return Rn({
		name: Ed(e),
		setup() {
			var n;
			const o = null === (n = pn(Qd, null)) || void 0 === n ? void 0 : n.mergedIconsRef;
			return () => {
				var n;
				const r = null === (n = null == o ? void 0 : o.value) || void 0 === n ? void 0 : n[e];
				return r ? r() : t
			}
		}
	})
}
const yh = {
		viewBox: "0 0 12 12",
		version: "1.1",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": !0
	},
	xh = {
		stroke: "none",
		"stroke-width": "1",
		fill: "none",
		"fill-rule": "evenodd"
	},
	Ch = {
		fill: "currentColor",
		"fill-rule": "nonzero"
	},
	wh = {
		d: "M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"
	},
	Sh = bh("close", $r("svg", yh, $r("g", xh, $r("g", Ch, $r("path", wh))))),
	kh = {
		viewBox: "0 0 48 48",
		version: "1.1",
		xmlns: "http://www.w3.org/2000/svg"
	},
	_h = {
		stroke: "none",
		"stroke-width": "1",
		"fill-rule": "evenodd"
	},
	Ph = {
		"fill-rule": "nonzero"
	},
	Oh = {
		d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M17.8838835,16.1161165 L17.7823881,16.0249942 C17.3266086,15.6583353 16.6733914,15.6583353 16.2176119,16.0249942 L16.1161165,16.1161165 L16.0249942,16.2176119 C15.6583353,16.6733914 15.6583353,17.3266086 16.0249942,17.7823881 L16.1161165,17.8838835 L22.233,24 L16.1161165,30.1161165 L16.0249942,30.2176119 C15.6583353,30.6733914 15.6583353,31.3266086 16.0249942,31.7823881 L16.1161165,31.8838835 L16.2176119,31.9750058 C16.6733914,32.3416647 17.3266086,32.3416647 17.7823881,31.9750058 L17.8838835,31.8838835 L24,25.767 L30.1161165,31.8838835 L30.2176119,31.9750058 C30.6733914,32.3416647 31.3266086,32.3416647 31.7823881,31.9750058 L31.8838835,31.8838835 L31.9750058,31.7823881 C32.3416647,31.3266086 32.3416647,30.6733914 31.9750058,30.2176119 L31.8838835,30.1161165 L25.767,24 L31.8838835,17.8838835 L31.9750058,17.7823881 C32.3416647,17.3266086 32.3416647,16.6733914 31.9750058,16.2176119 L31.8838835,16.1161165 L31.7823881,16.0249942 C31.3266086,15.6583353 30.6733914,15.6583353 30.2176119,16.0249942 L30.1161165,16.1161165 L24,22.233 L17.8838835,16.1161165 L17.7823881,16.0249942 L17.8838835,16.1161165 Z"
	},
	zh = bh("error", $r("svg", kh, $r("g", _h, $r("g", Ph, $r("path", Oh))))),
	Eh = {
		viewBox: "0 0 28 28",
		version: "1.1",
		xmlns: "http://www.w3.org/2000/svg"
	},
	Th = {
		stroke: "none",
		"stroke-width": "1",
		"fill-rule": "evenodd"
	},
	Rh = {
		"fill-rule": "nonzero"
	},
	jh = {
		d: "M14,2 C20.6274,2 26,7.37258 26,14 C26,20.6274 20.6274,26 14,26 C7.37258,26 2,20.6274 2,14 C2,7.37258 7.37258,2 14,2 Z M14,11 C13.4477,11 13,11.4477 13,12 L13,12 L13,20 C13,20.5523 13.4477,21 14,21 C14.5523,21 15,20.5523 15,20 L15,20 L15,12 C15,11.4477 14.5523,11 14,11 Z M14,6.75 C13.3096,6.75 12.75,7.30964 12.75,8 C12.75,8.69036 13.3096,9.25 14,9.25 C14.6904,9.25 15.25,8.69036 15.25,8 C15.25,7.30964 14.6904,6.75 14,6.75 Z"
	},
	Mh = bh("info", $r("svg", Eh, $r("g", Th, $r("g", Rh, $r("path", jh))))),
	Ah = {
		viewBox: "0 0 48 48",
		version: "1.1",
		xmlns: "http://www.w3.org/2000/svg"
	},
	Fh = {
		stroke: "none",
		"stroke-width": "1",
		"fill-rule": "evenodd"
	},
	Bh = {
		"fill-rule": "nonzero"
	},
	Lh = {
		d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M32.6338835,17.6161165 C32.1782718,17.1605048 31.4584514,17.1301307 30.9676119,17.5249942 L30.8661165,17.6161165 L20.75,27.732233 L17.1338835,24.1161165 C16.6457281,23.6279612 15.8542719,23.6279612 15.3661165,24.1161165 C14.9105048,24.5717282 14.8801307,25.2915486 15.2749942,25.7823881 L15.3661165,25.8838835 L19.8661165,30.3838835 C20.3217282,30.8394952 21.0415486,30.8698693 21.5323881,30.4750058 L21.6338835,30.3838835 L32.6338835,19.3838835 C33.1220388,18.8957281 33.1220388,18.1042719 32.6338835,17.6161165 Z"
	},
	Ih = bh("success", $r("svg", Ah, $r("g", Fh, $r("g", Bh, $r("path", Lh))))),
	Hh = {
		viewBox: "0 0 24 24",
		version: "1.1",
		xmlns: "http://www.w3.org/2000/svg"
	},
	Dh = {
		stroke: "none",
		"stroke-width": "1",
		"fill-rule": "evenodd"
	},
	Nh = {
		"fill-rule": "nonzero"
	},
	Wh = {
		d: "M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 Z M12.0018002,15.0037242 C11.450254,15.0037242 11.0031376,15.4508407 11.0031376,16.0023869 C11.0031376,16.553933 11.450254,17.0010495 12.0018002,17.0010495 C12.5533463,17.0010495 13.0004628,16.553933 13.0004628,16.0023869 C13.0004628,15.4508407 12.5533463,15.0037242 12.0018002,15.0037242 Z M11.99964,7 C11.4868042,7.00018474 11.0642719,7.38637706 11.0066858,7.8837365 L11,8.00036004 L11.0018003,13.0012393 L11.00857,13.117858 C11.0665141,13.6151758 11.4893244,14.0010638 12.0021602,14.0008793 C12.514996,14.0006946 12.9375283,13.6145023 12.9951144,13.1171428 L13.0018002,13.0005193 L13,7.99964009 L12.9932303,7.8830214 C12.9352861,7.38570354 12.5124758,6.99981552 11.99964,7 Z"
	},
	$h = bh("warning", $r("svg", Hh, $r("g", Dh, $r("g", Nh, $r("path", Wh))))),
	Vh = Rn({
		name: "BaseIconSwitchTransition",
		setup(e, {
			slots: t
		}) {
			const n = Ll(),
				o = {
					name: "icon-switch-transition"
				};
			return o.appear = n.value, () => $r(ci, o, t)
		}
	}),
	qh = {};
qh.appear = Boolean, qh.group = Boolean, qh.mode = String, qh.onLeave = Function, qh.onAfterLeave = Function, qh.onAfterEnter = Function, qh.width = Boolean, qh.reverse = Boolean;
const Uh = Rn({
		name: "FadeInExpandTransition",
		props: qh,
		setup(e, {
			slots: t
		}) {
			function n(t) {
				e.width ? t.style.maxWidth = t.offsetWidth + "px" : t.style.maxHeight = t.offsetHeight + "px", t.offsetWidth
			}

			function o(t) {
				e.width ? t.style.maxWidth = "0" : t.style.maxHeight = "0", t.offsetWidth;
				const {
					onLeave: n
				} = e;
				n && n()
			}

			function r(t) {
				e.width ? t.style.maxWidth = "" : t.style.maxHeight = "";
				const {
					onAfterLeave: n
				} = e;
				n && n()
			}

			function i(t) {
				if (t.style.transition = "none", e.width) {
					const e = t.offsetWidth;
					t.style.maxWidth = "0", t.offsetWidth, t.style.transition = "", t.style.maxWidth = e + "px"
				} else if (e.reverse) t.style.maxHeight = t.offsetHeight + "px", t.offsetHeight, t.style.transition = "", t.style.maxHeight = "0";
				else {
					const e = t.offsetHeight;
					t.style.maxHeight = "0", t.offsetWidth, t.style.transition = "", t.style.maxHeight = e + "px"
				}
				t.offsetWidth
			}

			function s(t) {
				var n;
				e.width ? t.style.maxWidth = "" : !e.reverse && (t.style.maxHeight = ""), null === (n = e.onAfterEnter) || void 0 === n || n.call(e)
			}
			return () => {
				const l = e.group ? Ri : ci,
					a = {};
				return a.name = e.width ? "fade-in-width-expand-transition" : "fade-in-height-expand-transition", a.mode = e.mode, a.appear = e.appear, a.onEnter = i, a.onAfterEnter = s, a.onBeforeLeave = n, a.onLeave = o, a.onAfterLeave = r, $r(l, a, t)
			}
		}
	}),
	Gh = ll("base-icon", "\n height: 1em;\n width: 1em;\n line-height: 1em;\n text-align: center;\n display: inline-block;\n position: relative;\n fill: currentColor;\n transform: translateZ(0);\n", [il("svg", "\n height: 1em;\n width: 1em;\n ")]),
	Xh = {};
Xh.type = Boolean, Xh.default = void 0;
const Zh = {};
Zh.type = Boolean, Zh.default = void 0;
const Kh = {};
Kh.role = String, Kh.ariaLabel = String, Kh.ariaDisabled = Xh, Kh.ariaHidden = Zh, Kh.clsPrefix = {}, Kh.onClick = Function, Kh.onMousedown = Function, Kh.onMouseup = Function, Kh.clsPrefix.type = String, Kh.clsPrefix.required = !0;
const Yh = Rn({
		name: "BaseIcon",
		props: Kh,
		setup(e) {
			vh("-base-icon", Gh, zt(e, "clsPrefix"))
		},
		render() {
			const e = {};
			return e.class = this.clsPrefix + "-base-icon", e.onClick = this.onClick, e.onMousedown = this.onMousedown, e.onMouseup = this.onMouseup, e.role = this.role, e["aria-label"] = this.ariaLabel, e["aria-hidden"] = this.ariaHidden, e["aria-disabled"] = this.ariaDisabled, $r("i", e, this.$slots)
		}
	}),
	Qh = ll("base-close", "\n display: flex;\n align-items: center;\n justify-content: center;\n cursor: pointer;\n background-color: transparent;\n color: var(--n-close-icon-color);\n border-radius: var(--n-close-border-radius);\n height: var(--n-close-size);\n width: var(--n-close-size);\n font-size: var(--n-close-icon-size);\n outline: none;\n border: none;\n position: relative;\n padding: 0;\n", [cl("absolute", "\n height: var(--n-close-icon-size);\n width: var(--n-close-icon-size);\n "), il("&::before", '\n content: "";\n position: absolute;\n width: var(--n-close-size);\n height: var(--n-close-size);\n left: 50%;\n top: 50%;\n transform: translateY(-50%) translateX(-50%);\n transition: inherit;\n border-radius: inherit;\n '), ul("disabled", [il("&:hover", "\n color: var(--n-close-icon-color-hover);\n "), il("&:hover::before", "\n background-color: var(--n-close-color-hover);\n "), il("&:focus::before", "\n background-color: var(--n-close-color-hover);\n "), il("&:active", "\n color: var(--n-close-icon-color-pressed);\n "), il("&:active::before", "\n background-color: var(--n-close-color-pressed);\n ")]), cl("disabled", "\n cursor: not-allowed;\n color: var(--n-close-icon-color-disabled);\n background-color: transparent;\n "), cl("round", [il("&::before", "\n border-radius: 50%;\n ")])]),
	Jh = {};
Jh.type = Boolean, Jh.default = !0;
const ev = {};
ev.type = String, ev.required = !0;
const tv = {};
tv.type = Boolean, tv.default = void 0;
const nv = {};
nv.type = Boolean, nv.default = !0;
const ov = {};
ov.isButtonTag = Jh, ov.clsPrefix = ev, ov.disabled = tv, ov.focusable = nv, ov.round = Boolean, ov.onClick = Function, ov.absolute = Boolean;
const rv = Rn({
		name: "BaseClose",
		props: ov,
		setup: e => (vh("-base-close", Qh, zt(e, "clsPrefix")), () => {
			const {
				clsPrefix: t,
				disabled: n,
				absolute: o,
				round: r,
				isButtonTag: i
			} = e;
			return $r(i ? "button" : "div", {
				type: i ? "button" : void 0,
				tabindex: n || !e.focusable ? -1 : 0,
				"aria-disabled": n,
				"aria-label": "close",
				role: i ? void 0 : "button",
				disabled: n,
				class: [t + "-base-close", o && t + "-base-close--absolute", n && t + "-base-close--disabled", r && t + "-base-close--round"],
				onMousedown: t => {
					!e.focusable && t.preventDefault()
				},
				onClick: e.onClick
			}, $r(Yh, {
				clsPrefix: t
			}, {
				default: () => $r(Sh, null)
			}))
		})
	}),
	{
		cubicBezierEaseInOut: iv
	} = Gd;

function sv({
	originalTransform: e = "",
	left: t = 0,
	top: n = 0,
	transition: o = "all .3s " + iv + " !important"
} = {}) {
	const r = {};
	r.transform = e + " scale(0.75)", r.left = t, r.top = n, r.opacity = 0;
	const i = {};
	i.transform = "scale(1) " + e, i.left = t, i.top = n, i.opacity = 1;
	const s = {
		transformOrigin: "center",
		position: "absolute"
	};
	return s.left = t, s.top = n, s.transition = o, [il("&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to", r), il("&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from", i), il("&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active", s)]
}
const lv = {
		left: "50%",
		top: "50%",
		originalTransform: "translateX(-50%) translateY(-50%)"
	},
	av = il([il("@keyframes loading-container-rotate", "\n to {\n -webkit-transform: rotate(360deg);\n transform: rotate(360deg);\n }\n "), il("@keyframes loading-layer-rotate", "\n 12.5% {\n -webkit-transform: rotate(135deg);\n transform: rotate(135deg);\n }\n 25% {\n -webkit-transform: rotate(270deg);\n transform: rotate(270deg);\n }\n 37.5% {\n -webkit-transform: rotate(405deg);\n transform: rotate(405deg);\n }\n 50% {\n -webkit-transform: rotate(540deg);\n transform: rotate(540deg);\n }\n 62.5% {\n -webkit-transform: rotate(675deg);\n transform: rotate(675deg);\n }\n 75% {\n -webkit-transform: rotate(810deg);\n transform: rotate(810deg);\n }\n 87.5% {\n -webkit-transform: rotate(945deg);\n transform: rotate(945deg);\n }\n 100% {\n -webkit-transform: rotate(1080deg);\n transform: rotate(1080deg);\n } \n "), il("@keyframes loading-left-spin", "\n from {\n -webkit-transform: rotate(265deg);\n transform: rotate(265deg);\n }\n 50% {\n -webkit-transform: rotate(130deg);\n transform: rotate(130deg);\n }\n to {\n -webkit-transform: rotate(265deg);\n transform: rotate(265deg);\n }\n "), il("@keyframes loading-right-spin", "\n from {\n -webkit-transform: rotate(-265deg);\n transform: rotate(-265deg);\n }\n 50% {\n -webkit-transform: rotate(-130deg);\n transform: rotate(-130deg);\n }\n to {\n -webkit-transform: rotate(-265deg);\n transform: rotate(-265deg);\n }\n "), ll("base-loading", "\n position: relative;\n line-height: 0;\n width: 1em;\n height: 1em;\n ", [al("transition-wrapper", "\n position: absolute;\n width: 100%;\n height: 100%;\n ", [sv()]), al("container", "\n display: inline-flex;\n position: relative;\n direction: ltr;\n line-height: 0;\n animation: loading-container-rotate 1568.2352941176ms linear infinite;\n font-size: 0;\n letter-spacing: 0;\n white-space: nowrap;\n opacity: 1;\n width: 100%;\n height: 100%;\n ", [al("svg", "\n stroke: var(--n-text-color);\n fill: transparent;\n position: absolute;\n height: 100%;\n overflow: hidden;\n "), al("container-layer", "\n position: absolute;\n width: 100%;\n height: 100%;\n animation: loading-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n ", [al("container-layer-left", "\n display: inline-flex;\n position: relative;\n width: 50%;\n height: 100%;\n overflow: hidden;\n ", [al("svg", "\n animation: loading-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n width: 200%;\n ")]), al("container-layer-patch", "\n position: absolute;\n top: 0;\n left: 47.5%;\n box-sizing: border-box;\n width: 5%;\n height: 100%;\n overflow: hidden;\n ", [al("svg", "\n left: -900%;\n width: 2000%;\n transform: rotate(180deg);\n ")]), al("container-layer-right", "\n display: inline-flex;\n position: relative;\n width: 50%;\n height: 100%;\n overflow: hidden;\n ", [al("svg", "\n animation: loading-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n left: -100%;\n width: 200%;\n ")])])]), al("placeholder", "\n position: absolute;\n left: 50%;\n top: 50%;\n transform: translateX(-50%) translateY(-50%);\n ", [sv(lv)])])]),
	cv = {};
cv.type = Number, cv.default = 28;
const uv = {};
uv.type = String, uv.default = void 0;
const dv = {};
dv.strokeWidth = cv, dv.stroke = uv;
const fv = dv,
	pv = {};
pv.type = String, pv.required = !0;
const hv = {};
hv.type = Boolean, hv.default = !0;
const vv = {};
vv.type = Number, vv.default = 1;
const gv = {};
gv.type = Number, gv.default = 100;
const mv = {};
mv.clsPrefix = pv, mv.show = hv, mv.scale = vv, mv.radius = gv;
const bv = Rn({
		name: "BaseLoading",
		props: Object.assign(mv, fv),
		setup(e) {
			vh("-base-loading", av, zt(e, "clsPrefix"))
		},
		render() {
			const {
				clsPrefix: e,
				radius: t,
				strokeWidth: n,
				stroke: o,
				scale: r
			} = this, i = t / r, s = {};
			s.class = e + "-base-loading", s.role = "img", s["aria-label"] = "loading";
			const l = {
				key: "icon"
			};
			l.class = e + "-base-loading__transition-wrapper";
			const a = {};
			a.class = e + "-base-loading__container";
			const c = {};
			c.class = e + "-base-loading__container-layer";
			const u = {};
			u.class = e + "-base-loading__container-layer-left";
			const d = {};
			d.color = o;
			const f = {};
			f.class = e + "-base-loading__svg", f.viewBox = "0 0 " + 2 * i + " " + 2 * i, f.xmlns = "http://www.w3.org/2000/svg", f.style = d;
			const p = {
				fill: "none",
				stroke: "currentColor"
			};
			p["stroke-width"] = n, p["stroke-linecap"] = "round", p.cx = i, p.cy = i, p.r = t - n / 2, p["stroke-dasharray"] = 4.91 * t, p["stroke-dashoffset"] = 2.46 * t;
			const h = {};
			h.class = e + "-base-loading__container-layer-patch";
			const v = {};
			v.color = o;
			const g = {};
			g.class = e + "-base-loading__svg", g.viewBox = "0 0 " + 2 * i + " " + 2 * i, g.xmlns = "http://www.w3.org/2000/svg", g.style = v;
			const m = {
				fill: "none",
				stroke: "currentColor"
			};
			m["stroke-width"] = n, m["stroke-linecap"] = "round", m.cx = i, m.cy = i, m.r = t - n / 2, m["stroke-dasharray"] = 4.91 * t, m["stroke-dashoffset"] = 2.46 * t;
			const b = {};
			b.class = e + "-base-loading__container-layer-right";
			const y = {};
			y.color = o;
			const x = {};
			x.class = e + "-base-loading__svg", x.viewBox = "0 0 " + 2 * i + " " + 2 * i, x.xmlns = "http://www.w3.org/2000/svg", x.style = y;
			const C = {
				fill: "none",
				stroke: "currentColor"
			};
			C["stroke-width"] = n, C["stroke-linecap"] = "round", C.cx = i, C.cy = i, C.r = t - n / 2, C["stroke-dasharray"] = 4.91 * t, C["stroke-dashoffset"] = 2.46 * t;
			const w = {
				key: "placeholder"
			};
			return w.class = e + "-base-loading__placeholder", $r("div", s, $r(Vh, null, {
				default: () => this.show ? $r("div", l, $r("div", a, $r("div", c, $r("div", u, $r("svg", f, $r("circle", p))), $r("div", h, $r("svg", g, $r("circle", m))), $r("div", b, $r("svg", x, $r("circle", C)))))) : $r("div", w, this.$slots)
			}))
		}
	}),
	yv = {
		neutralBase: "#FFF",
		neutralInvertBase: "#000",
		neutralTextBase: "#000",
		neutralPopover: "#fff",
		neutralCard: "#fff",
		neutralModal: "#fff",
		neutralBody: "#fff",
		alpha1: "0.82",
		alpha2: "0.72",
		alpha3: "0.38",
		alpha4: "0.24",
		alpha5: "0.18",
		alphaClose: "0.6",
		alphaDisabled: "0.5",
		alphaDisabledInput: "0.02",
		alphaPending: "0.05",
		alphaTablePending: "0.02",
		alphaPressed: "0.07",
		alphaAvatar: "0.2",
		alphaRail: "0.14",
		alphaProgressRail: ".08",
		alphaBorder: "0.12",
		alphaDivider: "0.06",
		alphaInput: "0",
		alphaAction: "0.02",
		alphaTab: "0.04",
		alphaScrollbar: "0.25",
		alphaScrollbarHover: "0.4",
		alphaCode: "0.05",
		alphaTag: "0.02",
		primaryHover: "#36ad6a",
		primaryDefault: "#18a058",
		primaryActive: "#0c7a43",
		primarySuppl: "#36ad6a",
		infoHover: "#4098fc",
		infoDefault: "#2080f0",
		infoActive: "#1060c9",
		infoSuppl: "#4098fc",
		errorHover: "#de576d",
		errorDefault: "#d03050",
		errorActive: "#ab1f3f",
		errorSuppl: "#de576d",
		warningHover: "#fcb040",
		warningDefault: "#f0a020",
		warningActive: "#c97c10",
		warningSuppl: "#fcb040",
		successHover: "#36ad6a",
		successDefault: "#18a058",
		successActive: "#0c7a43",
		successSuppl: "#36ad6a"
	},
	xv = yv,
	Cv = ss(xv.neutralBase),
	wv = ss(xv.neutralInvertBase),
	Sv = "rgba(" + wv.slice(0, 3)
	.join(", ") + ", ";

function kv(e) {
	return Sv + String(e) + ")"
}

function _v(e) {
	const t = Array.from(wv);
	return t[3] = Number(e), cs(Cv, t)
}
const Pv = {
		name: "common"
	},
	Ov = {
		lightness: .75
	},
	zv = {
		lightness: .9
	},
	Ev = {
		lightness: .75
	},
	Tv = {
		lightness: .9
	},
	Rv = Object.assign(Object.assign(Pv, Gd), {
		baseColor: xv.neutralBase,
		primaryColor: xv.primaryDefault,
		primaryColorHover: xv.primaryHover,
		primaryColorPressed: xv.primaryActive,
		primaryColorSuppl: xv.primarySuppl,
		infoColor: xv.infoDefault,
		infoColorHover: xv.infoHover,
		infoColorPressed: xv.infoActive,
		infoColorSuppl: xv.infoSuppl,
		successColor: xv.successDefault,
		successColorHover: xv.successHover,
		successColorPressed: xv.successActive,
		successColorSuppl: xv.successSuppl,
		warningColor: xv.warningDefault,
		warningColorHover: xv.warningHover,
		warningColorPressed: xv.warningActive,
		warningColorSuppl: xv.warningSuppl,
		errorColor: xv.errorDefault,
		errorColorHover: xv.errorHover,
		errorColorPressed: xv.errorActive,
		errorColorSuppl: xv.errorSuppl,
		textColorBase: xv.neutralTextBase,
		textColor1: "rgb(31, 34, 37)",
		textColor2: "rgb(51, 54, 57)",
		textColor3: "rgb(118, 124, 130)",
		textColorDisabled: _v(xv.alpha4),
		placeholderColor: _v(xv.alpha4),
		placeholderColorDisabled: _v(xv.alpha5),
		iconColor: _v(xv.alpha4),
		iconColorHover: ds(_v(xv.alpha4), Ov),
		iconColorPressed: ds(_v(xv.alpha4), zv),
		iconColorDisabled: _v(xv.alpha5),
		opacity1: xv.alpha1,
		opacity2: xv.alpha2,
		opacity3: xv.alpha3,
		opacity4: xv.alpha4,
		opacity5: xv.alpha5,
		dividerColor: "rgb(239, 239, 245)",
		borderColor: "rgb(224, 224, 230)",
		closeIconColor: _v(Number(xv.alphaClose)),
		closeIconColorHover: _v(Number(xv.alphaClose)),
		closeIconColorPressed: _v(Number(xv.alphaClose)),
		closeColorHover: "rgba(0, 0, 0, .09)",
		closeColorPressed: "rgba(0, 0, 0, .13)",
		clearColor: _v(xv.alpha4),
		clearColorHover: ds(_v(xv.alpha4), Ev),
		clearColorPressed: ds(_v(xv.alpha4), Tv),
		scrollbarColor: kv(xv.alphaScrollbar),
		scrollbarColorHover: kv(xv.alphaScrollbarHover),
		scrollbarWidth: "5px",
		scrollbarHeight: "5px",
		scrollbarBorderRadius: "5px",
		progressRailColor: _v(xv.alphaProgressRail),
		railColor: "rgb(219, 219, 223)",
		popoverColor: xv.neutralPopover,
		tableColor: xv.neutralCard,
		cardColor: xv.neutralCard,
		modalColor: xv.neutralModal,
		bodyColor: xv.neutralBody,
		tagColor: "#eee",
		avatarColor: _v(xv.alphaAvatar),
		invertedColor: "rgb(0, 20, 40)",
		inputColor: _v(xv.alphaInput),
		codeColor: "rgb(244, 244, 248)",
		tabColor: "rgb(247, 247, 250)",
		actionColor: "rgb(250, 250, 252)",
		tableHeaderColor: "rgb(250, 250, 252)",
		hoverColor: "rgb(243, 243, 245)",
		tableColorHover: "rgba(0, 0, 100, 0.03)",
		tableColorStriped: "rgba(0, 0, 100, 0.02)",
		pressedColor: "rgb(237, 237, 239)",
		opacityDisabled: xv.alphaDisabled,
		inputColorDisabled: "rgb(250, 250, 252)",
		buttonColor2: "rgba(46, 51, 56, .05)",
		buttonColor2Hover: "rgba(46, 51, 56, .09)",
		buttonColor2Pressed: "rgba(46, 51, 56, .13)",
		boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)",
		boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)",
		boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
	}),
	jv = {
		name: "Scrollbar"
	};
jv.common = Rv, jv.self = e => {
	const {
		scrollbarColor: t,
		scrollbarColorHover: n
	} = e, o = {};
	return o.color = t, o.colorHover = n, o
};
const Mv = jv,
	{
		cubicBezierEaseInOut: Av
	} = Gd;

function Fv({
	name: e = "fade-in",
	enterDuration: t = "0.2s",
	leaveDuration: n = "0.2s",
	enterCubicBezier: o = Av,
	leaveCubicBezier: r = Av
} = {}) {
	const i = {};
	i.transition = "all " + t + " " + o + "!important";
	const s = {};
	s.transition = "all " + n + " " + r + "!important";
	const l = {
			opacity: 0
		},
		a = {
			opacity: 1
		};
	return [il("&." + e + "-transition-enter-active", i), il("&." + e + "-transition-leave-active", s), il("&." + e + "-transition-enter-from, &." + e + "-transition-leave-to", l), il("&." + e + "-transition-leave-from, &." + e + "-transition-enter-to", a)]
}
const Bv = {
		pointerEvents: "none"
	},
	Lv = {
		backgroundColor: "var(--n-scrollbar-color-hover)"
	},
	Iv = ll("scrollbar", "\n overflow: hidden;\n position: relative;\n z-index: auto;\n height: 100%;\n width: 100%;\n", [il(">", [ll("scrollbar-container", "\n width: 100%;\n overflow: scroll;\n height: 100%;\n max-height: inherit;\n scrollbar-width: none;\n ", [il("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", "\n width: 0;\n height: 0;\n display: none;\n "), il(">", [ll("scrollbar-content", "\n box-sizing: border-box;\n min-width: 100%;\n ")])])]), il(">, +", [ll("scrollbar-rail", "\n position: absolute;\n pointer-events: none;\n user-select: none;\n -webkit-user-select: none;\n ", [cl("horizontal", "\n left: 2px;\n right: 2px;\n bottom: 4px;\n height: var(--n-scrollbar-height);\n ", [il(">", [al("scrollbar", "\n height: var(--n-scrollbar-height);\n border-radius: var(--n-scrollbar-border-radius);\n right: 0;\n ")])]), cl("vertical", "\n right: 4px;\n top: 2px;\n bottom: 2px;\n width: var(--n-scrollbar-width);\n ", [il(">", [al("scrollbar", "\n width: var(--n-scrollbar-width);\n border-radius: var(--n-scrollbar-border-radius);\n bottom: 0;\n ")])]), cl("disabled", [il(">", [al("scrollbar", Bv)])]), il(">", [al("scrollbar", "\n position: absolute;\n cursor: pointer;\n pointer-events: all;\n background-color: var(--n-scrollbar-color);\n transition: background-color .2s var(--n-scrollbar-bezier);\n ", [Fv(), il("&:hover", Lv)])])])])]),
	Hv = {};
Hv.type = Number, Hv.default = 5;
const Dv = {};
Dv.type = Number, Dv.default = 0;
const Nv = {};
Nv.type = Boolean, Nv.default = !0;
const Wv = {};
Wv.type = String, Wv.default = "hover";
const $v = Rn({
		name: "Scrollbar",
		props: Object.assign(Object.assign({}, tf.props), {
			size: Hv,
			duration: Dv,
			scrollable: Nv,
			xScrollable: Boolean,
			trigger: Wv,
			useUnifiedContainer: Boolean,
			triggerDisplayManually: Boolean,
			container: Function,
			content: Function,
			containerClass: String,
			containerStyle: [String, Object],
			contentClass: String,
			contentStyle: [String, Object],
			horizontalRailStyle: [String, Object],
			verticalRailStyle: [String, Object],
			onScroll: Function,
			onWheel: Function,
			onResize: Function,
			internalOnUpdateScrollLeft: Function,
			internalHoistYRail: Boolean
		}),
		inheritAttrs: !1,
		setup(e) {
			const {
				mergedClsPrefixRef: t,
				inlineThemeDisabled: n,
				mergedRtlRef: o
			} = sf(e), r = mh("Scrollbar", o, t), i = Ct(null), s = Ct(null), l = Ct(null), a = Ct(null), c = Ct(null), u = Ct(null), d = Ct(null), f = Ct(null), p = Ct(null), h = Ct(null), v = Ct(null), g = Ct(0), m = Ct(0), b = Ct(!1), y = Ct(!1);
			let x, C, w = !1,
				S = !1,
				k = 0,
				_ = 0,
				P = 0,
				O = 0;
			const z = Il,
				E = Wr((() => {
					const {
						value: t
					} = f, {
						value: n
					} = u, {
						value: o
					} = h;
					return null === t || null === n || null === o ? 0 : Math.min(t, o * t / n + 1.5 * e.size)
				})),
				T = Wr((() => E.value + "px")),
				R = Wr((() => {
					const {
						value: t
					} = p, {
						value: n
					} = d, {
						value: o
					} = v;
					return null === t || null === n || null === o ? 0 : o * t / n + 1.5 * e.size
				})),
				j = Wr((() => R.value + "px")),
				M = Wr((() => {
					const {
						value: e
					} = f, {
						value: t
					} = g, {
						value: n
					} = u, {
						value: o
					} = h;
					if (null === e || null === n || null === o) return 0; {
						const r = n - e;
						return r ? t / r * (o - E.value) : 0
					}
				})),
				A = Wr((() => M.value + "px")),
				F = Wr((() => {
					const {
						value: e
					} = p, {
						value: t
					} = m, {
						value: n
					} = d, {
						value: o
					} = v;
					if (null === e || null === n || null === o) return 0; {
						const r = n - e;
						return r ? t / r * (o - R.value) : 0
					}
				})),
				B = Wr((() => F.value + "px")),
				L = Wr((() => {
					const {
						value: e
					} = f, {
						value: t
					} = u;
					return null !== e && null !== t && t > e
				})),
				I = Wr((() => {
					const {
						value: e
					} = p, {
						value: t
					} = d;
					return null !== e && null !== t && t > e
				})),
				H = Wr((() => {
					const {
						trigger: t
					} = e;
					return "none" === t || b.value
				})),
				D = Wr((() => {
					const {
						trigger: t
					} = e;
					return "none" === t || y.value
				})),
				N = Wr((() => {
					const {
						container: t
					} = e;
					return t ? t() : s.value
				})),
				W = Wr((() => {
					const {
						content: t
					} = e;
					return t ? t() : l.value
				})),
				$ = function(e) {
					const t = {
						isDeactivated: !1
					};
					let n = !1;
					return Ln((() => {
						t.isDeactivated = !1, n ? e() : n = !0
					})), In((() => {
						t.isDeactivated = !0, !n && (n = !0)
					})), t
				}((() => {
					if (!e.container) {
						const e = {};
						e.top = g.value, e.left = m.value, V(e)
					}
				})),
				V = (t, n) => {
					if (!e.scrollable) return;
					if ("number" == typeof t) return void q(null != n ? n : 0, t, 0, !1, "auto");
					const {
						left: o,
						top: r,
						index: i,
						elSize: s,
						position: l,
						behavior: a,
						el: c,
						debounce: u = !0
					} = t;
					(void 0 !== o || void 0 !== r) && q(null != o ? o : 0, null != r ? r : 0, 0, !1, a), void 0 !== c ? q(0, c.offsetTop, c.offsetHeight, u, a) : void 0 !== i && void 0 !== s ? q(0, i * s, s, u, a) : "bottom" === l ? q(0, Number.MAX_SAFE_INTEGER, 0, !1, a) : "top" === l && q(0, 0, 0, !1, a)
				};

			function q(e, t, n, o, r) {
				const {
					value: i
				} = N;
				if (!i) return;
				if (o) {
					const {
						scrollTop: o,
						offsetHeight: s
					} = i;
					if (t > o) {
						if (t + n <= o + s);
						else {
							const o = {};
							o.left = e, o.top = t + n - s, o.behavior = r, i.scrollTo(o)
						}
						return
					}
				}
				const s = {};
				s.left = e, s.top = t, s.behavior = r, i.scrollTo(s)
			}

			function U() {
				void 0 !== C && window.clearTimeout(C), C = window.setTimeout((() => {
					y.value = !1
				}), e.duration), void 0 !== x && window.clearTimeout(x), x = window.setTimeout((() => {
					b.value = !1
				}), e.duration)
			}

			function G() {
				const {
					value: e
				} = N;
				e && (g.value = e.scrollTop, m.value = e.scrollLeft * ((null == r ? void 0 : r.value) ? -1 : 1))
			}

			function X() {
				const {
					value: e
				} = N;
				e && (g.value = e.scrollTop, m.value = e.scrollLeft * ((null == r ? void 0 : r.value) ? -1 : 1), f.value = e.offsetHeight, p.value = e.offsetWidth, u.value = e.scrollHeight, d.value = e.scrollWidth);
				const {
					value: t
				} = c, {
					value: n
				} = a;
				t && (v.value = t.offsetWidth), n && (h.value = n.offsetHeight)
			}

			function Z() {
				e.scrollable && (e.useUnifiedContainer ? X() : (function() {
					const {
						value: e
					} = W;
					e && (u.value = e.offsetHeight, d.value = e.offsetWidth);
					const {
						value: t
					} = N;
					t && (f.value = t.offsetHeight, p.value = t.offsetWidth);
					const {
						value: n
					} = c, {
						value: o
					} = a;
					n && (v.value = n.offsetWidth), o && (h.value = o.offsetHeight)
				}(), G()))
			}

			function K(e) {
				var t;
				return !(null === (t = i.value) || void 0 === t ? void 0 : t.contains(Ni(e)))
			}

			function Y(t) {
				if (!S) return;
				void 0 !== x && window.clearTimeout(x), void 0 !== C && window.clearTimeout(C);
				const {
					value: n
				} = p, {
					value: o
				} = d, {
					value: i
				} = R;
				if (null === n || null === o) return;
				const s = (null == r ? void 0 : r.value) ? window.innerWidth - t.clientX - P : t.clientX - P,
					l = o - n;
				let a = _ + s * (o - n) / (n - i);
				a = Math.min(l, a), a = Math.max(a, 0);
				const {
					value: c
				} = N;
				if (c) {
					c.scrollLeft = a * ((null == r ? void 0 : r.value) ? -1 : 1);
					const {
						internalOnUpdateScrollLeft: t
					} = e;
					t && t(a)
				}
			}

			function Q(e) {
				e.preventDefault(), e.stopPropagation(), Pl("mousemove", window, Y, !0), Pl("mouseup", window, Q, !0), S = !1, Z(), K(e) && U()
			}

			function J(e) {
				if (!w) return;
				void 0 !== x && window.clearTimeout(x), void 0 !== C && window.clearTimeout(C);
				const {
					value: t
				} = f, {
					value: n
				} = u, {
					value: o
				} = E;
				if (null === t || null === n) return;
				const r = e.clientY - O,
					i = n - t;
				let s = k + r * (n - t) / (t - o);
				s = Math.min(i, s), s = Math.max(s, 0);
				const {
					value: l
				} = N;
				l && (l.scrollTop = s)
			}

			function ee(e) {
				e.preventDefault(), e.stopPropagation(), Pl("mousemove", window, J, !0), Pl("mouseup", window, ee, !0), w = !1, Z(), K(e) && U()
			}
			hn((() => {
				const {
					value: e
				} = I, {
					value: n
				} = L, {
					value: o
				} = t, {
					value: r
				} = c, {
					value: i
				} = a;
				r && (e ? r.classList.remove(o + "-scrollbar-rail--disabled") : r.classList.add(o + "-scrollbar-rail--disabled")), i && (n ? i.classList.remove(o + "-scrollbar-rail--disabled") : i.classList.add(o + "-scrollbar-rail--disabled"))
			})), Un((() => {
				e.container || Z()
			})), Zn((() => {
				void 0 !== x && window.clearTimeout(x), void 0 !== C && window.clearTimeout(C), Pl("mousemove", window, J, !0), Pl("mouseup", window, ee, !0)
			}));
			const te = tf("Scrollbar", "-scrollbar", Iv, Mv, e, t),
				ne = Wr((() => {
					const {
						common: {
							cubicBezierEaseInOut: e,
							scrollbarBorderRadius: t,
							scrollbarHeight: n,
							scrollbarWidth: o
						},
						self: {
							color: r,
							colorHover: i
						}
					} = te.value, s = {};
					return s["--n-scrollbar-bezier"] = e, s["--n-scrollbar-color"] = r, s["--n-scrollbar-color-hover"] = i, s["--n-scrollbar-border-radius"] = t, s["--n-scrollbar-width"] = o, s["--n-scrollbar-height"] = n, s
				})),
				oe = n ? gh("scrollbar", void 0, ne, e) : void 0,
				re = {};
			re.scrollTo = V, re.scrollBy = (t, n) => {
				if (!e.scrollable) return;
				const {
					value: o
				} = N;
				o && ("object" == typeof t ? o.scrollBy(t) : o.scrollBy(t, n || 0))
			}, re.sync = Z, re.syncUnifiedContainer = X, re.handleMouseEnterWrapper = function() {
				void 0 !== x && window.clearTimeout(x), b.value = !0, void 0 !== C && window.clearTimeout(C), y.value = !0, Z()
			}, re.handleMouseLeaveWrapper = function() {
				U()
			};
			const ie = re,
				se = {};
			return se.mergedClsPrefix = t, se.rtlEnabled = r, se.containerScrollTop = g, se.wrapperRef = i, se.containerRef = s, se.contentRef = l, se.yRailRef = a, se.xRailRef = c, se.needYBar = L, se.needXBar = I, se.yBarSizePx = T, se.xBarSizePx = j, se.yBarTopPx = A, se.xBarLeftPx = B, se.isShowXBar = H, se.isShowYBar = D, se.isIos = z, se.handleScroll = function(t) {
				const {
					onScroll: n
				} = e;
				n && n(t), G()
			}, se.handleContentResize = () => {
				$.isDeactivated || Z()
			}, se.handleContainerResize = t => {
				if ($.isDeactivated) return;
				const {
					onResize: n
				} = e;
				n && n(t), Z()
			}, se.handleYScrollMouseDown = function(e) {
				e.preventDefault(), e.stopPropagation(), w = !0, _l("mousemove", window, J, !0), _l("mouseup", window, ee, !0), k = g.value, O = e.clientY
			}, se.handleXScrollMouseDown = function(e) {
				e.preventDefault(), e.stopPropagation(), S = !0, _l("mousemove", window, Y, !0), _l("mouseup", window, Q, !0), _ = m.value, P = (null == r ? void 0 : r.value) ? window.innerWidth - e.clientX : e.clientX
			}, se.cssVars = n ? void 0 : ne, se.themeClass = null == oe ? void 0 : oe.themeClass, se.onRender = null == oe ? void 0 : oe.onRender, Object.assign(Object.assign({}, ie), se)
		},
		render() {
			var e;
			const {
				$slots: t,
				mergedClsPrefix: n,
				triggerDisplayManually: o,
				rtlEnabled: r,
				internalHoistYRail: i
			} = this;
			if (!this.scrollable) return null === (e = t.default) || void 0 === e ? void 0 : e.call(t);
			const s = "none" === this.trigger,
				l = () => {
					const e = {
						ref: "yRailRef"
					};
					e.class = [n + "-scrollbar-rail", n + "-scrollbar-rail--vertical"], e["data-scrollbar-rail"] = !0, e.style = this.verticalRailStyle, e["aria-hidden"] = !0;
					const t = {
						name: "fade-in-transition"
					};
					return $r("div", e, $r(s ? js : ci, s ? null : t, {
						default: () => this.needYBar && this.isShowYBar && !this.isIos ? $r("div", {
							class: n + "-scrollbar-rail__scrollbar",
							style: {
								height: this.yBarSizePx,
								top: this.yBarTopPx
							},
							onMousedown: this.handleYScrollMouseDown
						}) : null
					}))
				},
				a = () => {
					var e, a;
					null === (e = this.onRender) || void 0 === e || e.call(this);
					const c = {
						name: "fade-in-transition"
					};
					return $r("div", Or(this.$attrs, {
						role: "none",
						ref: "wrapperRef",
						class: [n + "-scrollbar", this.themeClass, r && n + "-scrollbar--rtl"],
						style: this.cssVars,
						onMouseenter: o ? void 0 : this.handleMouseEnterWrapper,
						onMouseleave: o ? void 0 : this.handleMouseLeaveWrapper
					}), [this.container ? null === (a = t.default) || void 0 === a ? void 0 : a.call(t) : $r("div", {
						role: "none",
						ref: "containerRef",
						class: [n + "-scrollbar-container", this.containerClass],
						style: this.containerStyle,
						onScroll: this.handleScroll,
						onWheel: this.onWheel
					}, $r(Ka, {
						onResize: this.handleContentResize
					}, {
						default: () => $r("div", {
							ref: "contentRef",
							role: "none",
							style: [{
								width: this.xScrollable ? "fit-content" : null
							}, this.contentStyle],
							class: [n + "-scrollbar-content", this.contentClass]
						}, t)
					})), i ? null : l(), this.xScrollable && $r("div", {
						ref: "xRailRef",
						class: [n + "-scrollbar-rail", n + "-scrollbar-rail--horizontal"],
						style: this.horizontalRailStyle,
						"data-scrollbar-rail": !0,
						"aria-hidden": !0
					}, $r(s ? js : ci, s ? null : c, {
						default: () => this.needXBar && this.isShowXBar && !this.isIos ? $r("div", {
							class: n + "-scrollbar-rail__scrollbar",
							style: {
								width: this.xBarSizePx,
								right: r ? this.xBarLeftPx : void 0,
								left: r ? void 0 : this.xBarLeftPx
							},
							onMousedown: this.handleXScrollMouseDown
						}) : null
					}))])
				},
				c = this.container ? a() : $r(Ka, {
					onResize: this.handleContainerResize
				}, {
					default: a
				});
			return i ? $r(nr, null, c, l()) : c
		}
	}),
	Vv = $v,
	qv = $v,
	{
		cubicBezierEaseIn: Uv,
		cubicBezierEaseOut: Gv
	} = Gd;

function Xv({
	transformOrigin: e = "inherit",
	duration: t = ".2s",
	enterScale: n = ".9",
	originalTransform: o = "",
	originalTransition: r = ""
} = {}) {
	const i = {};
	i.transformOrigin = e, i.transition = "opacity " + t + " " + Uv + ", transform " + t + " " + Uv + " " + (r && "," + r);
	const s = {};
	s.transformOrigin = e, s.transition = "opacity " + t + " " + Gv + ", transform " + t + " " + Gv + " " + (r && "," + r);
	const l = {
		opacity: 0
	};
	l.transform = o + " scale(" + n + ")";
	const a = {
		opacity: 1
	};
	return a.transform = o + " scale(1)", [il("&.fade-in-scale-up-transition-leave-active", i), il("&.fade-in-scale-up-transition-enter-active", s), il("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", l), il("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", a)]
}
const Zv = ll("base-wave", "\n position: absolute;\n left: 0;\n right: 0;\n top: 0;\n bottom: 0;\n border-radius: inherit;\n"),
	Kv = {};
Kv.type = String, Kv.required = !0;
const Yv = {};
Yv.clsPrefix = Kv;
const Qv = Rn({
		name: "BaseWave",
		props: Yv,
		setup(e) {
			vh("-base-wave", Zv, zt(e, "clsPrefix"));
			const t = Ct(null),
				n = Ct(!1);
			let o = null;
			return Zn((() => {
				null !== o && window.clearTimeout(o)
			})), {
				active: n,
				selfRef: t,
				play() {
					null !== o && (window.clearTimeout(o), n.value = !1, o = null), $t((() => {
						var e;
						null === (e = t.value) || void 0 === e || e.offsetHeight, n.value = !0, o = window.setTimeout((() => {
							n.value = !1, o = null
						}), 1e3)
					}))
				}
			}
		},
		render() {
			const {
				clsPrefix: e
			} = this, t = {
				ref: "selfRef",
				"aria-hidden": !0
			};
			return t.class = [e + "-base-wave", this.active && e + "-base-wave--active"], $r("div", t)
		}
	}),
	{
		cubicBezierEaseInOut: Jv
	} = Gd;
const {
	cubicBezierEaseInOut: eg,
	cubicBezierEaseOut: tg,
	cubicBezierEaseIn: ng
} = Gd;

function og({
	overflow: e = "hidden",
	duration: t = ".3s",
	originalTransition: n = "",
	leavingDelay: o = "0s",
	foldPadding: r = !1,
	enterToProps: i,
	leaveToProps: s,
	reverse: l = !1
} = {}) {
	const a = l ? "leave" : "enter",
		c = l ? "enter" : "leave",
		u = {
			opacity: 1
		},
		d = {
			opacity: 0,
			marginTop: "0 !important",
			marginBottom: "0 !important"
		};
	return d.paddingTop = r ? "0 !important" : void 0, d.paddingBottom = r ? "0 !important" : void 0, [il("&.fade-in-height-expand-transition-" + c + "-from,\n &.fade-in-height-expand-transition-" + a + "-to", Object.assign(Object.assign({}, i), u)), il("&.fade-in-height-expand-transition-" + c + "-to,\n &.fade-in-height-expand-transition-" + a + "-from", Object.assign(Object.assign({}, s), d)), il("&.fade-in-height-expand-transition-" + c + "-active", "\n overflow: " + e + ";\n transition:\n max-height " + t + " " + eg + " " + o + ",\n opacity " + t + " " + tg + " " + o + ",\n margin-top " + t + " " + eg + " " + o + ",\n margin-bottom " + t + " " + eg + " " + o + ",\n padding-top " + t + " " + eg + " " + o + ",\n padding-bottom " + t + " " + eg + " " + o + "\n " + (n ? "," + n : "") + "\n "), il("&.fade-in-height-expand-transition-" + a + "-active", "\n overflow: " + e + ";\n transition:\n max-height " + t + " " + eg + ",\n opacity " + t + " " + ng + ",\n margin-top " + t + " " + eg + ",\n margin-bottom " + t + " " + eg + ",\n padding-top " + t + " " + eg + ",\n padding-bottom " + t + " " + eg + "\n " + (n ? "," + n : "") + "\n ")]
}
const rg = vl && "chrome" in window;
vl && navigator.userAgent.includes("Firefox");
const ig = vl && navigator.userAgent.includes("Safari") && !rg;

function sg(e) {
	return cs(e, [255, 255, 255, .16])
}

function lg(e) {
	return cs(e, [0, 0, 0, .12])
}
const ag = {
		paddingTiny: "0 6px",
		paddingSmall: "0 10px",
		paddingMedium: "0 14px",
		paddingLarge: "0 18px",
		paddingRoundTiny: "0 10px",
		paddingRoundSmall: "0 14px",
		paddingRoundMedium: "0 18px",
		paddingRoundLarge: "0 22px",
		iconMarginTiny: "6px",
		iconMarginSmall: "6px",
		iconMarginMedium: "6px",
		iconMarginLarge: "6px",
		iconSizeTiny: "14px",
		iconSizeSmall: "18px",
		iconSizeMedium: "18px",
		iconSizeLarge: "20px",
		rippleDuration: ".6s"
	},
	cg = ag,
	ug = {
		name: "Button"
	};
ug.common = Rv, ug.self = e => {
	const {
		heightTiny: t,
		heightSmall: n,
		heightMedium: o,
		heightLarge: r,
		borderRadius: i,
		fontSizeTiny: s,
		fontSizeSmall: l,
		fontSizeMedium: a,
		fontSizeLarge: c,
		opacityDisabled: u,
		textColor2: d,
		textColor3: f,
		primaryColorHover: p,
		primaryColorPressed: h,
		borderColor: v,
		primaryColor: g,
		baseColor: m,
		infoColor: b,
		infoColorHover: y,
		infoColorPressed: x,
		successColor: C,
		successColorHover: w,
		successColorPressed: S,
		warningColor: k,
		warningColorHover: _,
		warningColorPressed: P,
		errorColor: O,
		errorColorHover: z,
		errorColorPressed: E,
		fontWeight: T,
		buttonColor2: R,
		buttonColor2Hover: j,
		buttonColor2Pressed: M,
		fontWeightStrong: A
	} = e, F = {};
	return F.heightTiny = t, F.heightSmall = n, F.heightMedium = o, F.heightLarge = r, F.borderRadiusTiny = i, F.borderRadiusSmall = i, F.borderRadiusMedium = i, F.borderRadiusLarge = i, F.fontSizeTiny = s, F.fontSizeSmall = l, F.fontSizeMedium = a, F.fontSizeLarge = c, F.opacityDisabled = u, F.colorOpacitySecondary = "0.16", F.colorOpacitySecondaryHover = "0.22", F.colorOpacitySecondaryPressed = "0.28", F.colorSecondary = R, F.colorSecondaryHover = j, F.colorSecondaryPressed = M, F.colorTertiary = R, F.colorTertiaryHover = j, F.colorTertiaryPressed = M, F.colorQuaternary = "#0000", F.colorQuaternaryHover = j, F.colorQuaternaryPressed = M, F.color = "#0000", F.colorHover = "#0000", F.colorPressed = "#0000", F.colorFocus = "#0000", F.colorDisabled = "#0000", F.textColor = d, F.textColorTertiary = f, F.textColorHover = p, F.textColorPressed = h, F.textColorFocus = p, F.textColorDisabled = d, F.textColorText = d, F.textColorTextHover = p, F.textColorTextPressed = h, F.textColorTextFocus = p, F.textColorTextDisabled = d, F.textColorGhost = d, F.textColorGhostHover = p, F.textColorGhostPressed = h, F.textColorGhostFocus = p, F.textColorGhostDisabled = d, F.border = "1px solid " + v, F.borderHover = "1px solid " + p, F.borderPressed = "1px solid " + h, F.borderFocus = "1px solid " + p, F.borderDisabled = "1px solid " + v, F.rippleColor = g, F.colorPrimary = g, F.colorHoverPrimary = p, F.colorPressedPrimary = h, F.colorFocusPrimary = p, F.colorDisabledPrimary = g, F.textColorPrimary = m, F.textColorHoverPrimary = m, F.textColorPressedPrimary = m, F.textColorFocusPrimary = m, F.textColorDisabledPrimary = m, F.textColorTextPrimary = g, F.textColorTextHoverPrimary = p, F.textColorTextPressedPrimary = h, F.textColorTextFocusPrimary = p, F.textColorTextDisabledPrimary = d, F.textColorGhostPrimary = g, F.textColorGhostHoverPrimary = p, F.textColorGhostPressedPrimary = h, F.textColorGhostFocusPrimary = p, F.textColorGhostDisabledPrimary = g, F.borderPrimary = "1px solid " + g, F.borderHoverPrimary = "1px solid " + p, F.borderPressedPrimary = "1px solid " + h, F.borderFocusPrimary = "1px solid " + p, F.borderDisabledPrimary = "1px solid " + g, F.rippleColorPrimary = g, F.colorInfo = b, F.colorHoverInfo = y, F.colorPressedInfo = x, F.colorFocusInfo = y, F.colorDisabledInfo = b, F.textColorInfo = m, F.textColorHoverInfo = m, F.textColorPressedInfo = m, F.textColorFocusInfo = m, F.textColorDisabledInfo = m, F.textColorTextInfo = b, F.textColorTextHoverInfo = y, F.textColorTextPressedInfo = x, F.textColorTextFocusInfo = y, F.textColorTextDisabledInfo = d, F.textColorGhostInfo = b, F.textColorGhostHoverInfo = y, F.textColorGhostPressedInfo = x, F.textColorGhostFocusInfo = y, F.textColorGhostDisabledInfo = b, F.borderInfo = "1px solid " + b, F.borderHoverInfo = "1px solid " + y, F.borderPressedInfo = "1px solid " + x, F.borderFocusInfo = "1px solid " + y, F.borderDisabledInfo = "1px solid " + b, F.rippleColorInfo = b, F.colorSuccess = C, F.colorHoverSuccess = w, F.colorPressedSuccess = S, F.colorFocusSuccess = w, F.colorDisabledSuccess = C, F.textColorSuccess = m, F.textColorHoverSuccess = m, F.textColorPressedSuccess = m, F.textColorFocusSuccess = m, F.textColorDisabledSuccess = m, F.textColorTextSuccess = C, F.textColorTextHoverSuccess = w, F.textColorTextPressedSuccess = S, F.textColorTextFocusSuccess = w, F.textColorTextDisabledSuccess = d, F.textColorGhostSuccess = C, F.textColorGhostHoverSuccess = w, F.textColorGhostPressedSuccess = S, F.textColorGhostFocusSuccess = w, F.textColorGhostDisabledSuccess = C, F.borderSuccess = "1px solid " + C, F.borderHoverSuccess = "1px solid " + w, F.borderPressedSuccess = "1px solid " + S, F.borderFocusSuccess = "1px solid " + w, F.borderDisabledSuccess = "1px solid " + C, F.rippleColorSuccess = C, F.colorWarning = k, F.colorHoverWarning = _, F.colorPressedWarning = P, F.colorFocusWarning = _, F.colorDisabledWarning = k, F.textColorWarning = m, F.textColorHoverWarning = m, F.textColorPressedWarning = m, F.textColorFocusWarning = m, F.textColorDisabledWarning = m, F.textColorTextWarning = k, F.textColorTextHoverWarning = _, F.textColorTextPressedWarning = P, F.textColorTextFocusWarning = _, F.textColorTextDisabledWarning = d, F.textColorGhostWarning = k, F.textColorGhostHoverWarning = _, F.textColorGhostPressedWarning = P, F.textColorGhostFocusWarning = _, F.textColorGhostDisabledWarning = k, F.borderWarning = "1px solid " + k, F.borderHoverWarning = "1px solid " + _, F.borderPressedWarning = "1px solid " + P, F.borderFocusWarning = "1px solid " + _, F.borderDisabledWarning = "1px solid " + k, F.rippleColorWarning = k, F.colorError = O, F.colorHoverError = z, F.colorPressedError = E, F.colorFocusError = z, F.colorDisabledError = O, F.textColorError = m, F.textColorHoverError = m, F.textColorPressedError = m, F.textColorFocusError = m, F.textColorDisabledError = m, F.textColorTextError = O, F.textColorTextHoverError = z, F.textColorTextPressedError = E, F.textColorTextFocusError = z, F.textColorTextDisabledError = d, F.textColorGhostError = O, F.textColorGhostHoverError = z, F.textColorGhostPressedError = E, F.textColorGhostFocusError = z, F.textColorGhostDisabledError = O, F.borderError = "1px solid " + O, F.borderHoverError = "1px solid " + z, F.borderPressedError = "1px solid " + E, F.borderFocusError = "1px solid " + z, F.borderDisabledError = "1px solid " + O, F.rippleColorError = O, F.waveOpacity = "0.6", F.fontWeight = T, F.fontWeightStrong = A, Object.assign(Object.assign({}, cg), F)
};
const dg = ug,
	fg = {
		borderColor: "var(--n-border-color)"
	},
	pg = {
		borderColor: "var(--n-border-color-disabled)"
	},
	hg = {
		borderColor: "var(--n-border-color-focus)"
	},
	vg = {
		borderColor: "var(--n-border-color-hover)"
	},
	gg = {
		borderColor: "var(--n-border-color-pressed)"
	},
	mg = {
		borderColor: "var(--n-border-color-pressed)"
	},
	bg = {
		backgroundColor: "var(--n-color-disabled)",
		color: "var(--n-text-color-disabled)"
	},
	yg = {
		border: "var(--n-border-disabled)"
	},
	xg = {
		backgroundColor: "var(--n-color-focus)",
		color: "var(--n-text-color-focus)"
	},
	Cg = {
		border: "var(--n-border-focus)"
	},
	wg = {
		backgroundColor: "var(--n-color-hover)",
		color: "var(--n-text-color-hover)"
	},
	Sg = {
		border: "var(--n-border-hover)"
	},
	kg = {
		backgroundColor: "var(--n-color-pressed)",
		color: "var(--n-text-color-pressed)"
	},
	_g = {
		border: "var(--n-border-pressed)"
	},
	Pg = {
		backgroundColor: "var(--n-color-pressed)",
		color: "var(--n-text-color-pressed)"
	},
	Og = {
		border: "var(--n-border-pressed)"
	},
	zg = {
		zIndex: 1,
		animationName: "button-wave-spread, button-wave-opacity"
	},
	Eg = {
		border: 0
	},
	Tg = {
		border: "var(--n-border)"
	},
	Rg = {
		border: "var(--n-border)",
		borderColor: "#0000",
		zIndex: 1
	},
	jg = {
		top: "50%",
		originalTransform: "translateY(-50%)"
	},
	Mg = {
		margin: "var(--n-icon-margin)",
		marginRight: 0
	},
	Ag = {
		borderStyle: "dashed !important"
	},
	Fg = {
		cursor: "not-allowed",
		opacity: "var(--n-opacity-disabled)"
	},
	Bg = {
		boxShadow: "0 0 0.5px 0 var(--n-ripple-color)"
	},
	Lg = {
		boxShadow: "0 0 0.5px 4.5px var(--n-ripple-color)"
	},
	Ig = {};
Ig.from = Bg, Ig.to = Lg;
const Hg = {
		opacity: "var(--n-wave-opacity)"
	},
	Dg = {
		opacity: 0
	},
	Ng = {};
Ng.from = Hg, Ng.to = Dg;
const Wg = il([ll("button", "\n margin: 0;\n font-weight: var(--n-font-weight);\n line-height: 1;\n font-family: inherit;\n padding: var(--n-padding);\n height: var(--n-height);\n font-size: var(--n-font-size);\n border-radius: var(--n-border-radius);\n color: var(--n-text-color);\n background-color: var(--n-color);\n width: var(--n-width);\n white-space: nowrap;\n outline: none;\n position: relative;\n z-index: auto;\n border: none;\n display: inline-flex;\n flex-wrap: nowrap;\n flex-shrink: 0;\n align-items: center;\n justify-content: center;\n user-select: none;\n -webkit-user-select: none;\n text-align: center;\n cursor: pointer;\n text-decoration: none;\n transition:\n color .3s var(--n-bezier),\n background-color .3s var(--n-bezier),\n opacity .3s var(--n-bezier),\n border-color .3s var(--n-bezier);\n ", [cl("color", [al("border", fg), cl("disabled", [al("border", pg)]), ul("disabled", [il("&:focus", [al("state-border", hg)]), il("&:hover", [al("state-border", vg)]), il("&:active", [al("state-border", gg)]), cl("pressed", [al("state-border", mg)])])]), cl("disabled", bg, [al("border", yg)]), ul("disabled", [il("&:focus", xg, [al("state-border", Cg)]), il("&:hover", wg, [al("state-border", Sg)]), il("&:active", kg, [al("state-border", _g)]), cl("pressed", Pg, [al("state-border", Og)])]), cl("loading", "cursor: wait;"), ll("base-wave", "\n pointer-events: none;\n top: 0;\n right: 0;\n bottom: 0;\n left: 0;\n animation-iteration-count: 1;\n animation-duration: var(--n-ripple-duration);\n animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);\n ", [cl("active", zg)]), vl && "MozBoxSizing" in document.createElement("div")
		.style ? il("&::moz-focus-inner", Eg) : null, al("border, state-border", "\n position: absolute;\n left: 0;\n top: 0;\n right: 0;\n bottom: 0;\n border-radius: inherit;\n transition: border-color .3s var(--n-bezier);\n pointer-events: none;\n "), al("border", Tg), al("state-border", Rg), al("icon", "\n margin: var(--n-icon-margin);\n margin-left: 0;\n height: var(--n-icon-size);\n width: var(--n-icon-size);\n max-width: var(--n-icon-size);\n font-size: var(--n-icon-size);\n position: relative;\n flex-shrink: 0;\n ", [ll("icon-slot", "\n height: var(--n-icon-size);\n width: var(--n-icon-size);\n position: absolute;\n left: 0;\n top: 50%;\n transform: translateY(-50%);\n display: flex;\n align-items: center;\n justify-content: center;\n ", [sv(jg)]), function({
			duration: e = ".2s",
			delay: t = ".1s"
		} = {}) {
			const n = {
				opacity: 1
			};
			return [il("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to", n), il("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from", "\n opacity: 0!important;\n margin-left: 0!important;\n margin-right: 0!important;\n "), il("&.fade-in-width-expand-transition-leave-active", "\n overflow: hidden;\n transition:\n opacity " + e + " " + Jv + ",\n max-width " + e + " " + Jv + " " + t + ",\n margin-left " + e + " " + Jv + " " + t + ",\n margin-right " + e + " " + Jv + " " + t + ";\n "), il("&.fade-in-width-expand-transition-enter-active", "\n overflow: hidden;\n transition:\n opacity " + e + " " + Jv + " " + t + ",\n max-width " + e + " " + Jv + ",\n margin-left " + e + " " + Jv + ",\n margin-right " + e + " " + Jv + ";\n ")]
		}()]), al("content", "\n display: flex;\n align-items: center;\n flex-wrap: nowrap;\n min-width: 0;\n ", [il("~", [al("icon", Mg)])]), cl("block", "\n display: flex;\n width: 100%;\n "), cl("dashed", [al("border, state-border", Ag)]), cl("disabled", Fg)
	]), il("@keyframes button-wave-spread", Ig), il("@keyframes button-wave-opacity", Ng)]),
	$g = {};
$g.color = String, $g.textColor = String, $g.text = Boolean, $g.block = Boolean, $g.loading = Boolean, $g.disabled = Boolean, $g.circle = Boolean, $g.size = String, $g.ghost = Boolean, $g.round = Boolean, $g.secondary = Boolean, $g.tertiary = Boolean, $g.quaternary = Boolean, $g.strong = Boolean, $g.focusable = {}, $g.keyboard = {}, $g.tag = {}, $g.type = {}, $g.dashed = Boolean, $g.renderIcon = Function, $g.iconPlacement = {}, $g.attrType = {}, $g.bordered = {}, $g.onClick = [Function, Array], $g.nativeFocusBehavior = {}, $g.focusable.type = Boolean, $g.focusable.default = !0, $g.keyboard.type = Boolean, $g.keyboard.default = !0, $g.tag.type = String, $g.tag.default = "button", $g.type.type = String, $g.type.default = "default", $g.iconPlacement.type = String, $g.iconPlacement.default = "left", $g.attrType.type = String, $g.attrType.default = "button", $g.bordered.type = Boolean, $g.bordered.default = !0, $g.nativeFocusBehavior.type = Boolean, $g.nativeFocusBehavior.default = !ig;
const Vg = Rn({
		name: "Button",
		props: Object.assign(Object.assign({}, tf.props), $g),
		setup(e) {
			const t = Ct(null),
				n = Ct(null),
				o = Ct(!1),
				r = yl((() => !e.quaternary && !e.tertiary && !e.secondary && !e.text && (!e.color || e.ghost || e.dashed) && e.bordered)),
				i = pn("n-button-group", {}),
				s = {
					defaultSize: "medium",
					mergedSize: t => {
						const {
							size: n
						} = e;
						if (n) return n;
						const {
							size: o
						} = i;
						if (o) return o;
						const {
							mergedSize: r
						} = t || {};
						return r ? r.value : "medium"
					}
				},
				{
					mergedSizeRef: l
				} = vc({}, s),
				a = Wr((() => e.focusable && !e.disabled)),
				{
					inlineThemeDisabled: c,
					mergedClsPrefixRef: u,
					mergedRtlRef: d
				} = sf(e),
				f = tf("Button", "-button", Wg, dg, e, u),
				p = mh("Button", d, u),
				h = Wr((() => {
					const t = f.value,
						{
							common: {
								cubicBezierEaseInOut: n,
								cubicBezierEaseOut: o
							},
							self: r
						} = t,
						{
							rippleDuration: i,
							opacityDisabled: s,
							fontWeight: a,
							fontWeightStrong: c
						} = r,
						u = l.value,
						{
							dashed: d,
							type: p,
							ghost: h,
							text: v,
							color: g,
							round: m,
							circle: b,
							textColor: y,
							secondary: x,
							tertiary: C,
							quaternary: w,
							strong: S
						} = e,
						k = {};
					k["font-weight"] = S ? c : a;
					const _ = k,
						P = {
							"--n-color": "initial",
							"--n-color-hover": "initial",
							"--n-color-pressed": "initial",
							"--n-color-focus": "initial",
							"--n-color-disabled": "initial",
							"--n-ripple-color": "initial",
							"--n-text-color": "initial",
							"--n-text-color-hover": "initial",
							"--n-text-color-pressed": "initial",
							"--n-text-color-focus": "initial",
							"--n-text-color-disabled": "initial"
						};
					let O = P;
					const z = "tertiary" === p,
						E = "default" === p,
						T = z ? "default" : p;
					if (v) {
						const e = y || g;
						O = {
							"--n-color": "#0000",
							"--n-color-hover": "#0000",
							"--n-color-pressed": "#0000",
							"--n-color-focus": "#0000",
							"--n-color-disabled": "#0000",
							"--n-ripple-color": "#0000",
							"--n-text-color": e || r[el("textColorText", T)],
							"--n-text-color-hover": e ? sg(e) : r[el("textColorTextHover", T)],
							"--n-text-color-pressed": e ? lg(e) : r[el("textColorTextPressed", T)],
							"--n-text-color-focus": e ? sg(e) : r[el("textColorTextHover", T)],
							"--n-text-color-disabled": e || r[el("textColorTextDisabled", T)]
						}
					} else if (h || d) {
						const e = y || g;
						O = {
							"--n-color": "#0000",
							"--n-color-hover": "#0000",
							"--n-color-pressed": "#0000",
							"--n-color-focus": "#0000",
							"--n-color-disabled": "#0000",
							"--n-ripple-color": g || r[el("rippleColor", T)],
							"--n-text-color": e || r[el("textColorGhost", T)],
							"--n-text-color-hover": e ? sg(e) : r[el("textColorGhostHover", T)],
							"--n-text-color-pressed": e ? lg(e) : r[el("textColorGhostPressed", T)],
							"--n-text-color-focus": e ? sg(e) : r[el("textColorGhostHover", T)],
							"--n-text-color-disabled": e || r[el("textColorGhostDisabled", T)]
						}
					} else if (x) {
						const e = E ? r.textColor : z ? r.textColorTertiary : r[el("color", T)],
							t = g || e,
							n = "default" !== p && "tertiary" !== p;
						O = {
							"--n-color": n ? us(t, {
								alpha: Number(r.colorOpacitySecondary)
							}) : r.colorSecondary,
							"--n-color-hover": n ? us(t, {
								alpha: Number(r.colorOpacitySecondaryHover)
							}) : r.colorSecondaryHover,
							"--n-color-pressed": n ? us(t, {
								alpha: Number(r.colorOpacitySecondaryPressed)
							}) : r.colorSecondaryPressed,
							"--n-color-focus": n ? us(t, {
								alpha: Number(r.colorOpacitySecondaryHover)
							}) : r.colorSecondaryHover,
							"--n-color-disabled": r.colorSecondary,
							"--n-ripple-color": "#0000",
							"--n-text-color": t,
							"--n-text-color-hover": t,
							"--n-text-color-pressed": t,
							"--n-text-color-focus": t,
							"--n-text-color-disabled": t
						}
					} else if (C || w) {
						const e = E ? r.textColor : z ? r.textColorTertiary : r[el("color", T)],
							t = g || e;
						C ? (O["--n-color"] = r.colorTertiary, O["--n-color-hover"] = r.colorTertiaryHover, O["--n-color-pressed"] = r.colorTertiaryPressed, O["--n-color-focus"] = r.colorSecondaryHover, O["--n-color-disabled"] = r.colorTertiary) : (O["--n-color"] = r.colorQuaternary, O["--n-color-hover"] = r.colorQuaternaryHover, O["--n-color-pressed"] = r.colorQuaternaryPressed, O["--n-color-focus"] = r.colorQuaternaryHover, O["--n-color-disabled"] = r.colorQuaternary), O["--n-ripple-color"] = "#0000", O["--n-text-color"] = t, O["--n-text-color-hover"] = t, O["--n-text-color-pressed"] = t, O["--n-text-color-focus"] = t, O["--n-text-color-disabled"] = t
					} else O = {
						"--n-color": g || r[el("color", T)],
						"--n-color-hover": g ? sg(g) : r[el("colorHover", T)],
						"--n-color-pressed": g ? lg(g) : r[el("colorPressed", T)],
						"--n-color-focus": g ? sg(g) : r[el("colorFocus", T)],
						"--n-color-disabled": g || r[el("colorDisabled", T)],
						"--n-ripple-color": g || r[el("rippleColor", T)],
						"--n-text-color": y || (g ? r.textColorPrimary : z ? r.textColorTertiary : r[el("textColor", T)]),
						"--n-text-color-hover": y || (g ? r.textColorHoverPrimary : r[el("textColorHover", T)]),
						"--n-text-color-pressed": y || (g ? r.textColorPressedPrimary : r[el("textColorPressed", T)]),
						"--n-text-color-focus": y || (g ? r.textColorFocusPrimary : r[el("textColorFocus", T)]),
						"--n-text-color-disabled": y || (g ? r.textColorDisabledPrimary : r[el("textColorDisabled", T)])
					};
					const R = {
						"--n-border": "initial",
						"--n-border-hover": "initial",
						"--n-border-pressed": "initial",
						"--n-border-focus": "initial",
						"--n-border-disabled": "initial"
					};
					let j = R;
					if (v) {
						const e = {
							"--n-border": "none",
							"--n-border-hover": "none",
							"--n-border-pressed": "none",
							"--n-border-focus": "none",
							"--n-border-disabled": "none"
						};
						j = e
					} else j = {
						"--n-border": r[el("border", T)],
						"--n-border-hover": r[el("borderHover", T)],
						"--n-border-pressed": r[el("borderPressed", T)],
						"--n-border-focus": r[el("borderFocus", T)],
						"--n-border-disabled": r[el("borderDisabled", T)]
					};
					const {
						[el("height", u)]: M, [el("fontSize", u)]: A, [el("padding", u)]: F, [el("paddingRound", u)]: B, [el("iconSize", u)]: L, [el("borderRadius", u)]: I, [el("iconMargin", u)]: H, waveOpacity: D
					} = r, N = {};
					N["--n-width"] = b && !v ? M : "initial", N["--n-height"] = v ? "initial" : M, N["--n-font-size"] = A, N["--n-padding"] = b || v ? "initial" : m ? B : F, N["--n-icon-size"] = L, N["--n-icon-margin"] = H, N["--n-border-radius"] = v ? "initial" : b || m ? M : I;
					const W = N,
						$ = {};
					return $["--n-bezier"] = n, $["--n-bezier-ease-out"] = o, $["--n-ripple-duration"] = i, $["--n-opacity-disabled"] = s, $["--n-wave-opacity"] = D, Object.assign(Object.assign(Object.assign(Object.assign($, _), O), j), W)
				})),
				v = c ? gh("button", Wr((() => {
					let t = "";
					const {
						dashed: n,
						type: o,
						ghost: r,
						text: i,
						color: s,
						round: a,
						circle: c,
						textColor: u,
						secondary: d,
						tertiary: f,
						quaternary: p,
						strong: h
					} = e;
					n && (t += "a"), r && (t += "b"), i && (t += "c"), a && (t += "d"), c && (t += "e"), d && (t += "f"), f && (t += "g"), p && (t += "h"), h && (t += "i"), s && (t += "j" + Ms(s)), u && (t += "k" + Ms(u));
					const {
						value: v
					} = l;
					return t += "l" + v[0], t += "m" + o[0], t
				})), h, e) : void 0;
			return {
				selfElRef: t,
				waveElRef: n,
				mergedClsPrefix: u,
				mergedFocusable: a,
				mergedSize: l,
				showBorder: r,
				enterPressed: o,
				rtlEnabled: p,
				handleMousedown: n => {
					var o;
					if (!a.value && n.preventDefault(), !e.nativeFocusBehavior && (n.preventDefault(), !e.disabled && a.value)) {
						const e = {
							preventScroll: !0
						};
						null === (o = t.value) || void 0 === o || o.focus(e)
					}
				},
				handleKeydown: t => {
					if ("Enter" === t.key) {
						if (!e.keyboard || e.loading) return void t.preventDefault();
						o.value = !0
					}
				},
				handleBlur: () => {
					o.value = !1
				},
				handleKeyup: t => {
					if ("Enter" === t.key) {
						if (!e.keyboard) return;
						o.value = !1
					}
				},
				handleClick: t => {
					var o;
					if (!e.disabled && !e.loading) {
						const {
							onClick: r
						} = e;
						r && ys(r, t), !e.text && (null === (o = n.value) || void 0 === o || o.play())
					}
				},
				customColorCssVars: Wr((() => {
					const {
						color: t
					} = e;
					if (!t) return null;
					const n = sg(t);
					return {
						"--n-border-color": t,
						"--n-border-color-hover": n,
						"--n-border-color-pressed": lg(t),
						"--n-border-color-focus": n,
						"--n-border-color-disabled": t
					}
				})),
				cssVars: c ? void 0 : h,
				themeClass: null == v ? void 0 : v.themeClass,
				onRender: null == v ? void 0 : v.onRender
			}
		},
		render() {
			const {
				mergedClsPrefix: e,
				tag: t,
				onRender: n
			} = this;
			null == n || n();
			const o = {};
			o.class = e + "-button__content";
			const r = Es(this.$slots.default, (e => e && $r("span", o, e))),
				i = {
					ref: "selfElRef"
				};
			i.class = [this.themeClass, e + "-button", e + "-button--" + this.type + "-type", e + "-button--" + this.mergedSize + "-type", this.rtlEnabled && e + "-button--rtl", this.disabled && e + "-button--disabled", this.block && e + "-button--block", this.enterPressed && e + "-button--pressed", !this.text && this.dashed && e + "-button--dashed", this.color && e + "-button--color", this.secondary && e + "-button--secondary", this.loading && e + "-button--loading", this.ghost && e + "-button--ghost"], i.tabindex = this.mergedFocusable ? 0 : -1, i.type = this.attrType, i.style = this.cssVars, i.disabled = this.disabled, i.onClick = this.handleClick, i.onBlur = this.handleBlur, i.onMousedown = this.handleMousedown, i.onKeyup = this.handleKeyup, i.onKeydown = this.handleKeydown;
			const s = {
				width: !0
			};
			return $r(t, i, "right" === this.iconPlacement && r, $r(Uh, s, {
				default: () => Es(this.$slots.icon, (t => (this.loading || this.renderIcon || t) && $r("span", {
					class: e + "-button__icon",
					style: {
						margin: Rs(this.$slots.default) ? "0" : ""
					}
				}, $r(Vh, null, {
					default: () => this.loading ? $r(bv, {
						clsPrefix: e,
						key: "loading",
						class: e + "-icon-slot",
						strokeWidth: 20
					}) : $r("div", {
						key: "icon",
						class: e + "-icon-slot",
						role: "none"
					}, this.renderIcon ? this.renderIcon() : t)
				}))))
			}), "left" === this.iconPlacement && r, this.text ? null : $r(Qv, {
				ref: "waveElRef",
				clsPrefix: e
			}), this.showBorder ? $r("div", {
				"aria-hidden": !0,
				class: e + "-button__border",
				style: this.customColorCssVars
			}) : null, this.showBorder ? $r("div", {
				"aria-hidden": !0,
				class: e + "-button__state-border",
				style: this.customColorCssVars
			}) : null)
		}
	}),
	qg = {
		paddingSmall: "12px 16px 12px",
		paddingMedium: "19px 24px 20px",
		paddingLarge: "23px 32px 24px",
		paddingHuge: "27px 40px 28px",
		titleFontSizeSmall: "16px",
		titleFontSizeMedium: "18px",
		titleFontSizeLarge: "18px",
		titleFontSizeHuge: "18px",
		closeIconSize: "18px",
		closeSize: "22px"
	},
	Ug = qg,
	Gg = {
		name: "Card"
	};
Gg.common = Rv, Gg.self = e => {
	const {
		primaryColor: t,
		borderRadius: n,
		lineHeight: o,
		fontSize: r,
		cardColor: i,
		textColor2: s,
		textColor1: l,
		dividerColor: a,
		fontWeightStrong: c,
		closeIconColor: u,
		closeIconColorHover: d,
		closeIconColorPressed: f,
		closeColorHover: p,
		closeColorPressed: h,
		modalColor: v,
		boxShadow1: g,
		popoverColor: m,
		actionColor: b
	} = e, y = {};
	return y.lineHeight = o, y.color = i, y.colorModal = v, y.colorPopover = m, y.colorTarget = t, y.colorEmbedded = b, y.colorEmbeddedModal = b, y.colorEmbeddedPopover = b, y.textColor = s, y.titleTextColor = l, y.borderColor = a, y.actionColor = b, y.titleFontWeight = c, y.closeColorHover = p, y.closeColorPressed = h, y.closeBorderRadius = n, y.closeIconColor = u, y.closeIconColorHover = d, y.closeIconColorPressed = f, y.fontSizeSmall = r, y.fontSizeMedium = r, y.fontSizeLarge = r, y.fontSizeHuge = r, y.boxShadow = g, y.borderRadius = n, Object.assign(Object.assign({}, Ug), y)
};
const Xg = Gg,
	Zg = {
		background: "var(--n-color-modal)"
	},
	Kg = {
		paddingTop: "var(--n-padding-bottom)"
	},
	Yg = {
		paddingTop: "var(--n-padding-bottom)"
	},
	Qg = {
		paddingTop: "var(--n-padding-bottom)"
	},
	Jg = {
		borderTop: "1px solid var(--n-border-color)"
	},
	em = {
		transition: "border-color 0.3s var(--n-bezier)"
	},
	tm = {
		borderTop: "1px solid var(--n-border-color)"
	},
	nm = {
		transition: "border-color 0.3s var(--n-bezier)"
	},
	om = {
		borderTop: "1px solid var(--n-border-color)"
	},
	rm = il([ll("card", "\n font-size: var(--n-font-size);\n line-height: var(--n-line-height);\n display: flex;\n flex-direction: column;\n width: 100%;\n box-sizing: border-box;\n position: relative;\n border-radius: var(--n-border-radius);\n background-color: var(--n-color);\n color: var(--n-text-color);\n word-break: break-word;\n transition: \n color .3s var(--n-bezier),\n background-color .3s var(--n-bezier),\n box-shadow .3s var(--n-bezier),\n border-color .3s var(--n-bezier);\n ", [pl(Zg), cl("hoverable", [il("&:hover", "box-shadow: var(--n-box-shadow);")]), cl("content-segmented", [il(">", [al("content", Kg)])]), cl("content-soft-segmented", [il(">", [al("content", "\n margin: 0 var(--n-padding-left);\n padding: var(--n-padding-bottom) 0;\n ")])]), cl("footer-segmented", [il(">", [al("footer", Yg)])]), cl("footer-soft-segmented", [il(">", [al("footer", "\n padding: var(--n-padding-bottom) 0;\n margin: 0 var(--n-padding-left);\n ")])]), il(">", [ll("card-header", "\n box-sizing: border-box;\n display: flex;\n align-items: center;\n font-size: var(--n-title-font-size);\n padding:\n var(--n-padding-top)\n var(--n-padding-left)\n var(--n-padding-bottom)\n var(--n-padding-left);\n ", [al("main", "\n font-weight: var(--n-title-font-weight);\n transition: color .3s var(--n-bezier);\n flex: 1;\n min-width: 0;\n color: var(--n-title-text-color);\n "), al("extra", "\n display: flex;\n align-items: center;\n font-size: var(--n-font-size);\n font-weight: 400;\n transition: color .3s var(--n-bezier);\n color: var(--n-text-color);\n "), al("close", "\n margin: 0 0 0 8px;\n transition:\n background-color .3s var(--n-bezier),\n color .3s var(--n-bezier);\n ")]), al("action", "\n box-sizing: border-box;\n transition:\n background-color .3s var(--n-bezier),\n border-color .3s var(--n-bezier);\n background-clip: padding-box;\n background-color: var(--n-action-color);\n "), al("content", "flex: 1; min-width: 0;"), al("content, footer", "\n box-sizing: border-box;\n padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);\n font-size: var(--n-font-size);\n ", [il("&:first-child", Qg)]), al("action", "\n background-color: var(--n-action-color);\n padding: var(--n-padding-bottom) var(--n-padding-left);\n border-bottom-left-radius: var(--n-border-radius);\n border-bottom-right-radius: var(--n-border-radius);\n ")]), ll("card-cover", "\n overflow: hidden;\n width: 100%;\n border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;\n ", [il("img", "\n display: block;\n width: 100%;\n ")]), cl("bordered", "\n border: 1px solid var(--n-border-color);\n ", [il("&:target", "border-color: var(--n-color-target);")]), cl("action-segmented", [il(">", [al("action", [il("&:not(:first-child)", Jg)])])]), cl("content-segmented, content-soft-segmented", [il(">", [al("content", em, [il("&:not(:first-child)", tm)])])]), cl("footer-segmented, footer-soft-segmented", [il(">", [al("footer", nm, [il("&:not(:first-child)", om)])])]), cl("embedded", "\n background-color: var(--n-color-embedded);\n ")]), dl(ll("card", "\n background: var(--n-color-modal);\n ", [cl("embedded", "\n background-color: var(--n-color-embedded-modal);\n ")])), fl(ll("card", "\n background: var(--n-color-popover);\n ", [cl("embedded", "\n background-color: var(--n-color-embedded-popover);\n ")]))]),
	im = {};
im.title = String, im.contentStyle = [Object, String], im.headerStyle = [Object, String], im.headerExtraStyle = [Object, String], im.footerStyle = [Object, String], im.embedded = Boolean, im.segmented = {}, im.size = {}, im.bordered = {}, im.closable = Boolean, im.hoverable = Boolean, im.role = String, im.onClose = [Function, Array], im.tag = {}, im.segmented.type = [Boolean, Object], im.segmented.default = !1, im.size.type = String, im.size.default = "medium", im.bordered.type = Boolean, im.bordered.default = !0, im.tag.type = String, im.tag.default = "div";
const sm = im,
	lm = xs(sm),
	am = Rn({
		name: "Card",
		props: Object.assign(Object.assign({}, tf.props), sm),
		setup(e) {
			const {
				inlineThemeDisabled: t,
				mergedClsPrefixRef: n,
				mergedRtlRef: o
			} = sf(e), r = tf("Card", "-card", rm, Xg, e, n), i = mh("Card", o, n), s = Wr((() => {
				const {
					size: t
				} = e, {
					self: {
						color: n,
						colorModal: o,
						colorTarget: i,
						textColor: s,
						titleTextColor: l,
						titleFontWeight: a,
						borderColor: c,
						actionColor: u,
						borderRadius: d,
						lineHeight: f,
						closeIconColor: p,
						closeIconColorHover: h,
						closeIconColorPressed: v,
						closeColorHover: g,
						closeColorPressed: m,
						closeBorderRadius: b,
						closeIconSize: y,
						closeSize: x,
						boxShadow: C,
						colorPopover: w,
						colorEmbedded: S,
						colorEmbeddedModal: k,
						colorEmbeddedPopover: _,
						[el("padding", t)]: P,
						[el("fontSize", t)]: O,
						[el("titleFontSize", t)]: z
					},
					common: {
						cubicBezierEaseInOut: E
					}
				} = r.value, {
					top: T,
					left: R,
					bottom: j
				} = Vi(P), M = {};
				return M["--n-bezier"] = E, M["--n-border-radius"] = d, M["--n-color"] = n, M["--n-color-modal"] = o, M["--n-color-popover"] = w, M["--n-color-embedded"] = S, M["--n-color-embedded-modal"] = k, M["--n-color-embedded-popover"] = _, M["--n-color-target"] = i, M["--n-text-color"] = s, M["--n-line-height"] = f, M["--n-action-color"] = u, M["--n-title-text-color"] = l, M["--n-title-font-weight"] = a, M["--n-close-icon-color"] = p, M["--n-close-icon-color-hover"] = h, M["--n-close-icon-color-pressed"] = v, M["--n-close-color-hover"] = g, M["--n-close-color-pressed"] = m, M["--n-border-color"] = c, M["--n-box-shadow"] = C, M["--n-padding-top"] = T, M["--n-padding-bottom"] = j, M["--n-padding-left"] = R, M["--n-font-size"] = O, M["--n-title-font-size"] = z, M["--n-close-size"] = x, M["--n-close-icon-size"] = y, M["--n-close-border-radius"] = b, M
			})), l = t ? gh("card", Wr((() => e.size[0])), s, e) : void 0, a = {};
			return a.rtlEnabled = i, a.mergedClsPrefix = n, a.mergedTheme = r, a.handleCloseClick = () => {
				const {
					onClose: t
				} = e;
				t && ys(t)
			}, a.cssVars = t ? void 0 : s, a.themeClass = null == l ? void 0 : l.themeClass, a.onRender = null == l ? void 0 : l.onRender, a
		},
		render() {
			const {
				segmented: e,
				bordered: t,
				hoverable: n,
				mergedClsPrefix: o,
				rtlEnabled: r,
				onRender: i,
				embedded: s,
				tag: l,
				$slots: a
			} = this;
			null == i || i();
			const c = {};
			c.class = [o + "-card", this.themeClass, s && o + "-card--embedded", {
				[o + "-card--rtl"]: r,
				[o + "-card--content" + ("boolean" != typeof e && "soft" === e.content ? "-soft" : "") + "-segmented"]: !0 === e || !1 !== e && e.content,
				[o + "-card--footer" + ("boolean" != typeof e && "soft" === e.footer ? "-soft" : "") + "-segmented"]: !0 === e || !1 !== e && e.footer,
				[o + "-card--action-segmented"]: !0 === e || !1 !== e && e.action,
				[o + "-card--bordered"]: t,
				[o + "-card--hoverable"]: n
			}], c.style = this.cssVars, c.role = this.role;
			const u = {};
			return u.class = o + "-card-cover", u.role = "none", $r(l, c, Es(a.cover, (e => e && $r("div", u, e))), Es(a.header, (e => e || this.title || this.closable ? $r("div", {
				class: o + "-card-header",
				style: this.headerStyle
			}, $r("div", {
				class: o + "-card-header__main",
				role: "heading"
			}, e || this.title), Es(a["header-extra"], (e => e && $r("div", {
				class: o + "-card-header__extra",
				style: this.headerExtraStyle
			}, e))), this.closable ? $r(rv, {
				clsPrefix: o,
				class: o + "-card-header__close",
				onClick: this.handleCloseClick,
				absolute: !0
			}) : null) : null)), Es(a.default, (e => e && $r("div", {
				class: o + "-card__content",
				style: this.contentStyle,
				role: "none"
			}, e))), Es(a.footer, (e => e && [$r("div", {
				class: o + "-card__footer",
				style: this.footerStyle,
				role: "none"
			}, e)])), Es(a.action, (e => e && $r("div", {
				class: o + "-card__action",
				role: "none"
			}, e))))
		}
	}),
	cm = Rn({
		name: "ConfigProvider",
		alias: ["App"],
		props: {
			abstract: Boolean,
			bordered: {
				type: Boolean,
				default: void 0
			},
			clsPrefix: String,
			locale: Object,
			dateLocale: Object,
			namespace: String,
			rtl: Array,
			tag: {
				type: String,
				default: "div"
			},
			hljs: Object,
			katex: Object,
			theme: Object,
			themeOverrides: Object,
			componentOptions: Object,
			icons: Object,
			breakpoints: Object,
			preflightStyleDisabled: Boolean,
			inlineThemeDisabled: {
				type: Boolean,
				default: void 0
			},
			as: {
				type: String,
				validator: () => (ws("config-provider", "`as` is deprecated, please use `tag` instead."), !0),
				default: void 0
			}
		},
		setup(e) {
			const t = pn(Qd, null),
				n = Wr((() => {
					const {
						theme: n
					} = e;
					if (null === n) return;
					const o = null == t ? void 0 : t.mergedThemeRef.value;
					return void 0 === n ? o : void 0 === o ? n : Object.assign({}, o, n)
				})),
				o = Wr((() => {
					const {
						themeOverrides: n
					} = e;
					if (null !== n) {
						if (void 0 === n) return null == t ? void 0 : t.mergedThemeOverridesRef.value; {
							const e = null == t ? void 0 : t.mergedThemeOverridesRef.value;
							return void 0 === e ? n : qd({}, e, n)
						}
					}
				})),
				r = yl((() => {
					const {
						namespace: n
					} = e;
					return void 0 === n ? null == t ? void 0 : t.mergedNamespaceRef.value : n
				})),
				i = yl((() => {
					const {
						bordered: n
					} = e;
					return void 0 === n ? null == t ? void 0 : t.mergedBorderedRef.value : n
				})),
				s = Wr((() => {
					const {
						icons: n
					} = e;
					return void 0 === n ? null == t ? void 0 : t.mergedIconsRef.value : n
				})),
				l = Wr((() => {
					const {
						componentOptions: n
					} = e;
					return void 0 !== n ? n : null == t ? void 0 : t.mergedComponentPropsRef.value
				})),
				a = Wr((() => {
					const {
						clsPrefix: n
					} = e;
					return void 0 !== n ? n : null == t ? void 0 : t.mergedClsPrefixRef.value
				})),
				c = Wr((() => {
					var n;
					const {
						rtl: o
					} = e;
					if (void 0 === o) return null == t ? void 0 : t.mergedRtlRef.value;
					const r = {};
					for (const e of o) r[e.name] = vt(e), null === (n = e.peers) || void 0 === n || n.forEach((e => {
						!(e.name in r) && (r[e.name] = vt(e))
					}));
					return r
				})),
				u = Wr((() => e.breakpoints || (null == t ? void 0 : t.mergedBreakpointsRef.value))),
				d = e.inlineThemeDisabled || (null == t ? void 0 : t.inlineThemeDisabled),
				f = e.preflightStyleDisabled || (null == t ? void 0 : t.preflightStyleDisabled),
				p = Wr((() => {
					const {
						value: e
					} = n, {
						value: t
					} = o, r = t && 0 !== Object.keys(t)
						.length, i = null == e ? void 0 : e.name;
					return i ? r ? i + "-" + Us(JSON.stringify(o.value)) : i : r ? Us(JSON.stringify(o.value)) : ""
				}));
			fn(Qd, {
				mergedThemeHashRef: p,
				mergedBreakpointsRef: u,
				mergedRtlRef: c,
				mergedIconsRef: s,
				mergedComponentPropsRef: l,
				mergedBorderedRef: i,
				mergedNamespaceRef: r,
				mergedClsPrefixRef: a,
				mergedLocaleRef: Wr((() => {
					const {
						locale: n
					} = e;
					if (null !== n) return void 0 === n ? null == t ? void 0 : t.mergedLocaleRef.value : n
				})),
				mergedDateLocaleRef: Wr((() => {
					const {
						dateLocale: n
					} = e;
					if (null !== n) return void 0 === n ? null == t ? void 0 : t.mergedDateLocaleRef.value : n
				})),
				mergedHljsRef: Wr((() => {
					const {
						hljs: n
					} = e;
					return void 0 === n ? null == t ? void 0 : t.mergedHljsRef.value : n
				})),
				mergedKatexRef: Wr((() => {
					const {
						katex: n
					} = e;
					return void 0 === n ? null == t ? void 0 : t.mergedKatexRef.value : n
				})),
				mergedThemeRef: n,
				mergedThemeOverridesRef: o,
				inlineThemeDisabled: d || !1,
				preflightStyleDisabled: f || !1
			});
			const h = {};
			return h.mergedClsPrefix = a, h.mergedBordered = i, h.mergedNamespace = r, h.mergedTheme = n, h.mergedThemeOverrides = o, h
		},
		render() {
			var e, t, n, o;
			return this.abstract ? null === (o = (n = this.$slots)
				.default) || void 0 === o ? void 0 : o.call(n) : $r(this.as || this.tag, {
				class: (this.mergedClsPrefix || of ) + "-config-provider"
			}, null === (t = (e = this.$slots)
				.default) || void 0 === t ? void 0 : t.call(e))
		}
	});
var um = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

function dm(e) {
	return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
const fm = {
		titleFontSize: "18px",
		padding: "16px 28px 20px 28px",
		iconSize: "28px",
		actionSpace: "12px",
		contentMargin: "8px 0 16px 0",
		iconMargin: "0 4px 0 0",
		iconMarginIconTop: "4px 0 8px 0",
		closeSize: "22px",
		closeIconSize: "18px",
		closeMargin: "20px 26px 0 0",
		closeMarginIconTop: "10px 16px 0 0"
	},
	pm = fm,
	hm = {};
hm.Button = dg;
const vm = {
	name: "Dialog"
};
vm.common = Rv, vm.peers = hm, vm.self = e => {
	const {
		textColor1: t,
		textColor2: n,
		modalColor: o,
		closeIconColor: r,
		closeIconColorHover: i,
		closeIconColorPressed: s,
		closeColorHover: l,
		closeColorPressed: a,
		infoColor: c,
		successColor: u,
		warningColor: d,
		errorColor: f,
		primaryColor: p,
		dividerColor: h,
		borderRadius: v,
		fontWeightStrong: g,
		lineHeight: m,
		fontSize: b
	} = e, y = {};
	return y.fontSize = b, y.lineHeight = m, y.border = "1px solid " + h, y.titleTextColor = t, y.textColor = n, y.color = o, y.closeColorHover = l, y.closeColorPressed = a, y.closeIconColor = r, y.closeIconColorHover = i, y.closeIconColorPressed = s, y.closeBorderRadius = v, y.iconColor = p, y.iconColorInfo = c, y.iconColorSuccess = u, y.iconColorWarning = d, y.iconColorError = f, y.borderRadius = v, y.titleFontWeight = g, Object.assign(Object.assign({}, pm), y)
};
const gm = vm,
	mm = {};
mm.type = String, mm.default = "default";
const bm = {};
bm.type = Boolean, bm.default = !0;
const ym = {};
ym.type = Boolean, ym.default = !0;
const xm = {};
xm.icon = Function, xm.type = mm, xm.title = [String, Function], xm.closable = bm, xm.negativeText = String, xm.positiveText = String, xm.positiveButtonProps = Object, xm.negativeButtonProps = Object, xm.content = [String, Function], xm.action = Function, xm.showIcon = ym, xm.loading = Boolean, xm.bordered = Boolean, xm.iconPlacement = String, xm.onPositiveClick = Function, xm.onNegativeClick = Function, xm.onClose = Function;
const Cm = xm,
	wm = xs(Cm),
	Sm = {
		color: "var(--n-icon-color)"
	},
	km = {
		border: "var(--n-border)"
	},
	_m = {
		margin: "var(--n-close-margin)"
	},
	Pm = {
		margin: "var(--n-icon-margin)"
	},
	Om = {
		textAlign: "center"
	},
	zm = {
		justifyContent: "center"
	},
	Em = {
		justifyContent: "center"
	},
	Tm = {
		margin: "var(--n-icon-margin)"
	},
	Rm = {
		marginRight: "var(--n-action-space)"
	},
	jm = {
		fontSize: "var(--n-icon-size)",
		transition: "color .3s var(--n-bezier)"
	},
	Mm = {
		display: "flex",
		justifyContent: "center"
	},
	Am = il([ll("dialog", "\n word-break: break-word;\n line-height: var(--n-line-height);\n position: relative;\n background: var(--n-color);\n color: var(--n-text-color);\n box-sizing: border-box;\n margin: auto;\n border-radius: var(--n-border-radius);\n padding: var(--n-padding);\n transition: \n border-color .3s var(--n-bezier),\n background-color .3s var(--n-bezier),\n color .3s var(--n-bezier);\n ", [al("icon", Sm), cl("bordered", km), cl("icon-top", [al("close", _m), al("icon", Pm), al("content", Om), al("title", zm), al("action", Em)]), cl("icon-left", [al("icon", Tm), cl("closable", [al("title", "\n padding-right: calc(var(--n-close-size) + 6px);\n ")])]), al("close", "\n position: absolute;\n right: 0;\n top: 0;\n margin: var(--n-close-margin);\n transition:\n background-color .3s var(--n-bezier),\n color .3s var(--n-bezier);\n z-index: 1;\n "), al("content", "\n font-size: var(--n-font-size);\n margin: var(--n-content-margin);\n position: relative;\n word-break: break-word;\n ", [cl("last", "margin-bottom: 0;")]), al("action", "\n display: flex;\n justify-content: flex-end;\n ", [il("> *:not(:last-child)", Rm)]), al("icon", jm), al("title", "\n transition: color .3s var(--n-bezier);\n display: flex;\n align-items: center;\n font-size: var(--n-title-font-size);\n font-weight: var(--n-title-font-weight);\n color: var(--n-title-text-color);\n "), ll("dialog-icon-container", Mm)]), dl(ll("dialog", "\n width: 446px;\n max-width: calc(100vw - 32px);\n ")), ll("dialog", [pl("\n width: 446px;\n max-width: calc(100vw - 32px);\n ")])]),
	Fm = {
		default: () => $r(Mh, null),
		info: () => $r(Mh, null),
		success: () => $r(Ih, null),
		warning: () => $r($h, null),
		error: () => $r(zh, null)
	},
	Bm = Rn({
		name: "Dialog",
		alias: ["NimbusConfirmCard", "Confirm"],
		props: Object.assign(Object.assign({}, tf.props), Cm),
		setup(e) {
			const {
				mergedComponentPropsRef: t,
				mergedClsPrefixRef: n,
				inlineThemeDisabled: o
			} = sf(e), r = Wr((() => {
				var n, o;
				const {
					iconPlacement: r
				} = e;
				return r || (null === (o = null === (n = null == t ? void 0 : t.value) || void 0 === n ? void 0 : n.Dialog) || void 0 === o ? void 0 : o.iconPlacement) || "left"
			}));
			const i = tf("Dialog", "-dialog", Am, gm, e, n),
				s = Wr((() => {
					const {
						type: t
					} = e, n = r.value, {
						common: {
							cubicBezierEaseInOut: o
						},
						self: {
							fontSize: s,
							lineHeight: l,
							border: a,
							titleTextColor: c,
							textColor: u,
							color: d,
							closeBorderRadius: f,
							closeColorHover: p,
							closeColorPressed: h,
							closeIconColor: v,
							closeIconColorHover: g,
							closeIconColorPressed: m,
							closeIconSize: b,
							borderRadius: y,
							titleFontWeight: x,
							titleFontSize: C,
							padding: w,
							iconSize: S,
							actionSpace: k,
							contentMargin: _,
							closeSize: P,
							["top" === n ? "iconMarginIconTop" : "iconMargin"]: O,
							["top" === n ? "closeMarginIconTop" : "closeMargin"]: z,
							[el("iconColor", t)]: E
						}
					} = i.value, T = {};
					return T["--n-font-size"] = s, T["--n-icon-color"] = E, T["--n-bezier"] = o, T["--n-close-margin"] = z, T["--n-icon-margin"] = O, T["--n-icon-size"] = S, T["--n-close-size"] = P, T["--n-close-icon-size"] = b, T["--n-close-border-radius"] = f, T["--n-close-color-hover"] = p, T["--n-close-color-pressed"] = h, T["--n-close-icon-color"] = v, T["--n-close-icon-color-hover"] = g, T["--n-close-icon-color-pressed"] = m, T["--n-color"] = d, T["--n-text-color"] = u, T["--n-border-radius"] = y, T["--n-padding"] = w, T["--n-line-height"] = l, T["--n-border"] = a, T["--n-content-margin"] = _, T["--n-title-font-size"] = C, T["--n-title-font-weight"] = x, T["--n-title-text-color"] = c, T["--n-action-space"] = k, T
				})),
				l = o ? gh("dialog", Wr((() => "" + e.type[0] + r.value[0])), s, e) : void 0,
				a = {};
			return a.mergedClsPrefix = n, a.mergedIconPlacement = r, a.mergedTheme = i, a.handlePositiveClick = function(t) {
				const {
					onPositiveClick: n
				} = e;
				n && n(t)
			}, a.handleNegativeClick = function(t) {
				const {
					onNegativeClick: n
				} = e;
				n && n(t)
			}, a.handleCloseClick = function() {
				const {
					onClose: t
				} = e;
				t && t()
			}, a.cssVars = o ? void 0 : s, a.themeClass = null == l ? void 0 : l.themeClass, a.onRender = null == l ? void 0 : l.onRender, a
		},
		render() {
			var e;
			const {
				bordered: t,
				mergedIconPlacement: n,
				cssVars: o,
				closable: r,
				showIcon: i,
				title: s,
				content: l,
				action: a,
				negativeText: c,
				positiveText: u,
				positiveButtonProps: d,
				negativeButtonProps: f,
				handlePositiveClick: p,
				handleNegativeClick: h,
				mergedTheme: v,
				loading: g,
				type: m,
				mergedClsPrefix: b
			} = this;
			null === (e = this.onRender) || void 0 === e || e.call(this);
			const y = {};
			y.clsPrefix = b, y.class = b + "-dialog__icon";
			const x = i ? $r(Yh, y, {
					default: () => Es(this.$slots.icon, (e => e || (this.icon ? Cs(this.icon) : Fm[this.type]())))
				}) : null,
				C = {};
			C.class = b + "-dialog__action";
			const w = {};
			w.theme = v.peers.Button, w.themeOverrides = v.peerOverrides.Button, w.ghost = !0, w.size = "small", w.onClick = h;
			const S = {};
			S.theme = v.peers.Button, S.themeOverrides = v.peerOverrides.Button, S.size = "small", S.type = "default" === m ? "primary" : m, S.disabled = g, S.loading = g, S.onClick = p;
			const k = Es(this.$slots.action, (e => e || u || c || a ? $r("div", C, e || (a ? [Cs(a)] : [this.negativeText && $r(Vg, Object.assign(w, f), {
					default: () => Cs(this.negativeText)
				}), this.positiveText && $r(Vg, Object.assign(S, d), {
					default: () => Cs(this.positiveText)
				})])) : null)),
				_ = {};
			_.class = [b + "-dialog", this.themeClass, this.closable && b + "-dialog--closable", b + "-dialog--icon-" + n, t && b + "-dialog--bordered"], _.style = o, _.role = "dialog";
			const P = {};
			P.clsPrefix = b, P.class = b + "-dialog__close", P.onClick = this.handleCloseClick;
			const O = {};
			O.class = b + "-dialog-icon-container";
			const z = {};
			z.class = b + "-dialog__title";
			const E = {};
			return E.class = [b + "-dialog__content", k ? "" : b + "-dialog__content--last"], $r("div", _, r ? $r(rv, P) : null, i && "top" === n ? $r("div", O, x) : null, $r("div", z, i && "left" === n ? x : null, Os(this.$slots.header, (() => [Cs(s)]))), $r("div", E, Os(this.$slots.default, (() => [Cs(l)]))), k)
		}
	}),
	Lm = "n-dialog-provider",
	Im = "n-dialog-api",
	Hm = {};
Hm.Scrollbar = Mv, Hm.Dialog = gm, Hm.Card = Xg;
const Dm = {
	name: "Modal"
};
Dm.common = Rv, Dm.peers = Hm, Dm.self = e => {
	const {
		modalColor: t,
		textColor2: n,
		boxShadow3: o
	} = e, r = {};
	return r.color = t, r.textColor = n, r.boxShadow = o, r
};
const Nm = Dm,
	Wm = Object.assign(Object.assign({}, sm), Cm),
	$m = xs(Wm),
	Vm = {};
Vm.type = Boolean, Vm.required = !0;
const qm = {};
qm.type = Boolean, qm.default = !0;
const Um = {};
Um.type = Boolean, Um.default = !0;
const Gm = {};
Gm.show = Vm, Gm.preset = String, Gm.displayDirective = {}, Gm.trapFocus = qm, Gm.autoFocus = Um, Gm.blockScroll = Boolean, Gm.displayDirective.type = String, Gm.displayDirective.required = !0;
const Xm = {};
Xm.renderMask = Function, Xm.onClickoutside = Function, Xm.onBeforeLeave = {}, Xm.onAfterLeave = {}, Xm.onPositiveClick = {}, Xm.onNegativeClick = {}, Xm.onClose = {}, Xm.onAfterEnter = Function, Xm.onEsc = Function, Xm.onBeforeLeave.type = Function, Xm.onBeforeLeave.required = !0, Xm.onAfterLeave.type = Function, Xm.onAfterLeave.required = !0, Xm.onPositiveClick.type = Function, Xm.onPositiveClick.required = !0, Xm.onNegativeClick.type = Function, Xm.onNegativeClick.required = !0, Xm.onClose.type = Function, Xm.onClose.required = !0;
const Zm = Rn({
		name: "ModalBody",
		inheritAttrs: !1,
		props: Object.assign(Object.assign(Gm, Wm), Xm),
		setup(e) {
			const t = Ct(null),
				n = Ct(null),
				o = Ct(e.show),
				r = Ct(null),
				i = Ct(null);
			gn(zt(e, "show"), (e => {
					e && (o.value = !0)
				})),
				function(e) {
					if ("undefined" == typeof document) return;
					const t = document.documentElement;
					let n, o = !1;
					const r = () => {
						t.style.marginRight = ic, t.style.overflow = sc, t.style.overflowX = lc, t.style.overflowY = ac, cc.value = "0px"
					};
					Un((() => {
						n = gn(e, (e => {
							if (e) {
								if (!rc) {
									const e = window.innerWidth - t.offsetWidth;
									e > 0 && (ic = t.style.marginRight, t.style.marginRight = e + "px", cc.value = e + "px"), sc = t.style.overflow, lc = t.style.overflowX, ac = t.style.overflowY, t.style.overflow = "hidden", t.style.overflowX = "hidden", t.style.overflowY = "hidden"
								}
								o = !0, rc++
							} else rc--, !rc && r(), o = !1
						}), {
							immediate: !0
						})
					})), Zn((() => {
						null == n || n(), o && (rc--, !rc && r(), o = !1)
					}))
				}(Wr((() => e.blockScroll && o.value)));
			const s = pn(Dl);

			function l() {
				if ("center" === s.transformOriginRef.value) return "";
				const {
					value: e
				} = r, {
					value: t
				} = i;
				if (null === e || null === t) return "";
				if (n.value) {
					return e + "px " + (t + n.value.containerScrollTop) + "px"
				}
				return ""
			}
			const a = Ct(null);
			gn(a, (e => {
				e && $t((() => {
					const n = e.el;
					n && t.value !== n && (t.value = n)
				}))
			})), fn(Hl, t), fn(Nl, null), fn(Wl, null);
			const c = {};
			return c.mergedTheme = s.mergedThemeRef, c.appear = s.appearRef, c.isMounted = s.isMountedRef, c.mergedClsPrefix = s.mergedClsPrefixRef, c.bodyRef = t, c.scrollbarRef = n, c.displayed = o, c.childNodeRef = a, c.handlePositiveClick = function() {
				e.onPositiveClick()
			}, c.handleNegativeClick = function() {
				e.onNegativeClick()
			}, c.handleCloseClick = function() {
				const {
					onClose: t
				} = e;
				t && t()
			}, c.handleAfterLeave = function() {
				o.value = !1, r.value = null, i.value = null, e.onAfterLeave()
			}, c.handleBeforeLeave = function(t) {
				t.style.transformOrigin = l(), e.onBeforeLeave()
			}, c.handleEnter = function(e) {
				$t((() => {
					! function(e) {
						if ("center" === s.transformOriginRef.value) return;
						const t = s.getMousePosition();
						if (!t) return;
						if (!n.value) return;
						const o = n.value.containerScrollTop,
							{
								offsetLeft: a,
								offsetTop: c
							} = e;
						if (t) {
							const e = t.y,
								n = t.x;
							r.value = -(a - n), i.value = -(c - e - o)
						}
						e.style.transformOrigin = l()
					}(e)
				}))
			}, c
		},
		render() {
			const {
				$slots: e,
				$attrs: t,
				handleEnter: n,
				handleAfterLeave: o,
				handleBeforeLeave: r,
				preset: i,
				mergedClsPrefix: s
			} = this;
			let l = null;
			if (!i) {
				if (l = ks(e), !l) return void ws("modal", "default slot is empty");
				l = Cr(l);
				const n = {};
				n.class = s + "-modal", l.props = Or(n, t, l.props || {})
			}
			const a = {
				role: "none"
			};
			return a.class = s + "-modal-body-wrapper", "show" === this.displayDirective || this.displayed || this.show ? to($r("div", a, $r(Vv, {
				ref: "scrollbarRef",
				theme: this.mergedTheme.peers.Scrollbar,
				themeOverrides: this.mergedTheme.peerOverrides.Scrollbar,
				contentClass: s + "-modal-scroll-content"
			}, {
				default: () => {
					var t;
					return [null === (t = this.renderMask) || void 0 === t ? void 0 : t.call(this), $r(oc, {
						disabled: !this.trapFocus,
						active: this.show,
						onEsc: this.onEsc,
						autoFocus: this.autoFocus
					}, {
						default: () => {
							var t;
							const i = {
								name: "fade-in-scale-up-transition"
							};
							return i.appear = null !== (t = this.appear) && void 0 !== t ? t : this.isMounted, i.onEnter = n, i.onAfterEnter = this.onAfterEnter, i.onAfterLeave = o, i.onBeforeLeave = r, $r(ci, i, {
								default: () => {
									const t = [
											[Fi, this.show]
										],
										{
											onClickoutside: n
										} = this;
									if (n) {
										const e = {
											capture: !0
										};
										t.push([Gl, this.onClickoutside, void 0, e])
									}
									const o = {
											"aria-modal": "true"
										},
										r = {
											"aria-modal": "true",
											role: "dialog"
										};
									return to("confirm" === this.preset || "dialog" === this.preset ? $r(Bm, Object.assign({}, this.$attrs, {
										class: [s + "-modal", this.$attrs.class],
										ref: "bodyRef",
										theme: this.mergedTheme.peers.Dialog,
										themeOverrides: this.mergedTheme.peerOverrides.Dialog
									}, gs(this.$props, wm), o), e) : "card" === this.preset ? $r(am, Object.assign({}, this.$attrs, {
										ref: "bodyRef",
										class: [s + "-modal", this.$attrs.class],
										theme: this.mergedTheme.peers.Card,
										themeOverrides: this.mergedTheme.peerOverrides.Card
									}, gs(this.$props, lm), r), e) : this.childNodeRef = l, t)
								}
							})
						}
					})]
				}
			})), [
				[Fi, "if" === this.displayDirective || this.displayed || this.show]
			]) : null
		}
	}),
	Km = {
		enterDuration: ".25s",
		leaveDuration: ".25s",
		enterCubicBezier: "var(--n-bezier-ease-out)",
		leaveCubicBezier: "var(--n-bezier-ease-out)"
	},
	Ym = {
		duration: ".25s",
		enterScale: ".5"
	},
	Qm = il([ll("modal-container", "\n position: fixed;\n left: 0;\n top: 0;\n height: 0;\n width: 0;\n display: flex;\n "), ll("modal-mask", "\n position: fixed;\n left: 0;\n right: 0;\n top: 0;\n bottom: 0;\n background-color: rgba(0, 0, 0, .4);\n ", [Fv(Km)]), ll("modal-body-wrapper", "\n position: fixed;\n left: 0;\n right: 0;\n top: 0;\n bottom: 0;\n overflow: visible;\n ", [ll("modal-scroll-content", "\n min-height: 100%;\n display: flex;\n position: relative;\n ")]), ll("modal", "\n position: relative;\n align-self: center;\n color: var(--n-text-color);\n margin: auto;\n box-shadow: var(--n-box-shadow);\n ", [Xv(Ym)])]),
	Jm = Rn({
		name: "Modal",
		inheritAttrs: !1,
		props: Object.assign(Object.assign(Object.assign(Object.assign({}, tf.props), {
			show: Boolean,
			unstableShowMask: {
				type: Boolean,
				default: !0
			},
			maskClosable: {
				type: Boolean,
				default: !0
			},
			preset: String,
			to: [String, Object],
			displayDirective: {
				type: String,
				default: "if"
			},
			transformOrigin: {
				type: String,
				default: "mouse"
			},
			zIndex: Number,
			autoFocus: {
				type: Boolean,
				default: !0
			},
			trapFocus: {
				type: Boolean,
				default: !0
			},
			closeOnEsc: {
				type: Boolean,
				default: !0
			},
			blockScroll: {
				type: Boolean,
				default: !0
			}
		}), Wm), {
			onEsc: Function,
			"onUpdate:show": [Function, Array],
			onUpdateShow: [Function, Array],
			onAfterEnter: Function,
			onBeforeLeave: Function,
			onAfterLeave: Function,
			onClose: Function,
			onPositiveClick: Function,
			onNegativeClick: Function,
			onMaskClick: Function,
			internalDialog: Boolean,
			internalAppear: {
				type: Boolean,
				default: void 0
			},
			overlayStyle: [String, Object],
			onBeforeHide: Function,
			onAfterHide: Function,
			onHide: Function
		}),
		setup(e) {
			const t = Ct(null),
				{
					mergedClsPrefixRef: n,
					namespaceRef: o,
					inlineThemeDisabled: r
				} = sf(e),
				i = tf("Modal", "-modal", Qm, Nm, e, n),
				s = Bl(64),
				l = Rl(),
				a = Ll(),
				c = e.internalDialog ? pn(Lm, null) : null,
				u = (vl && (qn((() => {
					!pc && (window.addEventListener("compositionstart", dc), window.addEventListener("compositionend", fc)), pc++
				})), Zn((() => {
					pc <= 1 ? (window.removeEventListener("compositionstart", dc), window.removeEventListener("compositionend", fc), pc = 0) : pc--
				}))), uc);

			function d(t) {
				const {
					onUpdateShow: n,
					"onUpdate:show": o,
					onHide: r
				} = e;
				n && ys(n, t), o && ys(o, t), r && !t && r(t)
			}
			fn(Dl, {
				getMousePosition: () => {
					if (c) {
						const {
							clickedRef: e,
							clickPositionRef: t
						} = c;
						if (e.value && t.value) return t.value
					}
					return s.value ? l.value : null
				},
				mergedClsPrefixRef: n,
				mergedThemeRef: i,
				isMountedRef: a,
				appearRef: zt(e, "internalAppear"),
				transformOriginRef: zt(e, "transformOrigin")
			});
			const f = Wr((() => {
					const {
						common: {
							cubicBezierEaseOut: e
						},
						self: {
							boxShadow: t,
							color: n,
							textColor: o
						}
					} = i.value, r = {};
					return r["--n-bezier-ease-out"] = e, r["--n-box-shadow"] = t, r["--n-color"] = n, r["--n-text-color"] = o, r
				})),
				p = r ? gh("theme-class", void 0, f, e) : void 0;
			return {
				mergedClsPrefix: n,
				namespace: o,
				isMounted: a,
				containerRef: t,
				presetProps: Wr((() => gs(e, $m))),
				handleEsc: function(t) {
					var n, o;
					null === (n = e.onEsc) || void 0 === n || n.call(e), e.show && e.closeOnEsc && (o = t, !gl.has(o)) && !u.value && d(!1)
				},
				handleAfterLeave: function() {
					const {
						onAfterLeave: t,
						onAfterHide: n
					} = e;
					t && ys(t), n && n()
				},
				handleClickoutside: function(n) {
					var o;
					const {
						onMaskClick: r
					} = e;
					r && r(n), e.maskClosable && (null === (o = t.value) || void 0 === o ? void 0 : o.contains(Ni(n))) && d(!1)
				},
				handleBeforeLeave: function() {
					const {
						onBeforeLeave: t,
						onBeforeHide: n
					} = e;
					t && ys(t), n && n()
				},
				doUpdateShow: d,
				handleNegativeClick: function() {
					const {
						onNegativeClick: t
					} = e;
					t ? Promise.resolve(t())
						.then((e => {
							!1 !== e && d(!1)
						})) : d(!1)
				},
				handlePositiveClick: function() {
					const {
						onPositiveClick: t
					} = e;
					t ? Promise.resolve(t())
						.then((e => {
							!1 !== e && d(!1)
						})) : d(!1)
				},
				handleCloseClick: function() {
					const {
						onClose: t
					} = e;
					t ? Promise.resolve(t())
						.then((e => {
							!1 !== e && d(!1)
						})) : d(!1)
				},
				cssVars: r ? void 0 : f,
				themeClass: null == p ? void 0 : p.themeClass,
				onRender: null == p ? void 0 : p.onRender
			}
		},
		render() {
			const {
				mergedClsPrefix: e
			} = this, t = {};
			return t.to = this.to, t.show = this.show, $r(ia, t, {
				default: () => {
					var t;
					null === (t = this.onRender) || void 0 === t || t.call(this);
					const {
						unstableShowMask: n
					} = this, o = {
						role: "none",
						ref: "containerRef"
					};
					o.class = [e + "-modal-container", this.themeClass, this.namespace], o.style = this.cssVars;
					const r = {};
					return r.style = this.overlayStyle, to($r("div", o, $r(Zm, Object.assign(r, this.$attrs, {
						ref: "bodyWrapper",
						displayDirective: this.displayDirective,
						show: this.show,
						preset: this.preset,
						autoFocus: this.autoFocus,
						trapFocus: this.trapFocus,
						blockScroll: this.blockScroll
					}, this.presetProps, {
						onEsc: this.handleEsc,
						onClose: this.handleCloseClick,
						onNegativeClick: this.handleNegativeClick,
						onPositiveClick: this.handlePositiveClick,
						onBeforeLeave: this.handleBeforeLeave,
						onAfterEnter: this.onAfterEnter,
						onAfterLeave: this.handleAfterLeave,
						onClickoutside: n ? void 0 : this.handleClickoutside,
						renderMask: n ? () => {
							var t;
							const n = {
								name: "fade-in-transition",
								key: "mask"
							};
							return n.appear = null !== (t = this.internalAppear) && void 0 !== t ? t : this.isMounted, $r(ci, n, {
								default: () => this.show ? $r("div", {
									"aria-hidden": !0,
									ref: "containerRef",
									class: e + "-modal-mask",
									onClick: this.handleClickoutside
								}) : null
							})
						} : void 0
					}), this.$slots)), [
						[Kl, {
							zIndex: this.zIndex,
							enabled: this.show
						}]
					])
				}
			})
		}
	}),
	eb = {};
eb.type = Boolean, eb.default = !0;
const tb = {};
tb.type = Boolean, tb.default = !0;
const nb = {};
nb.type = Boolean, nb.default = !0;
const ob = {};
ob.type = Boolean, ob.default = !0;
const rb = Object.assign(Object.assign({}, Cm), {
		onAfterEnter: Function,
		onAfterLeave: Function,
		transformOrigin: String,
		blockScroll: eb,
		closeOnEsc: tb,
		onEsc: Function,
		autoFocus: nb,
		internalStyle: [String, Object],
		maskClosable: ob,
		onPositiveClick: Function,
		onNegativeClick: Function,
		onClose: Function,
		onMaskClick: Function
	}),
	ib = {};
ib.type = String, ib.required = !0;
const sb = {};
sb.type = Function, sb.required = !0;
const lb = Rn({
		name: "DialogEnvironment",
		props: Object.assign(Object.assign({}, rb), {
			internalKey: ib,
			to: [String, Object],
			onInternalAfterLeave: sb
		}),
		setup(e) {
			const t = Ct(!0);

			function n() {
				t.value = !1
			}
			const o = {};
			return o.show = t, o.hide = n, o.handleUpdateShow = function(e) {
				t.value = e
			}, o.handleAfterLeave = function() {
				const {
					onInternalAfterLeave: t,
					internalKey: n,
					onAfterLeave: o
				} = e;
				t && t(n), o && o()
			}, o.handleCloseClick = function() {
				const {
					onClose: t
				} = e;
				t ? Promise.resolve(t())
					.then((e => {
						!1 !== e && n()
					})) : n()
			}, o.handleNegativeClick = function(t) {
				const {
					onNegativeClick: o
				} = e;
				o ? Promise.resolve(o(t))
					.then((e => {
						!1 !== e && n()
					})) : n()
			}, o.handlePositiveClick = function(t) {
				const {
					onPositiveClick: o
				} = e;
				o ? Promise.resolve(o(t))
					.then((e => {
						!1 !== e && n()
					})) : n()
			}, o.handleMaskClick = function(t) {
				const {
					onMaskClick: o,
					maskClosable: r
				} = e;
				o && (o(t), r && n())
			}, o.handleEsc = function() {
				const {
					onEsc: t
				} = e;
				t && t()
			}, o
		},
		render() {
			const {
				handlePositiveClick: e,
				handleUpdateShow: t,
				handleNegativeClick: n,
				handleCloseClick: o,
				handleAfterLeave: r,
				handleMaskClick: i,
				handleEsc: s,
				to: l,
				maskClosable: a,
				show: c
			} = this, u = {};
			return u.show = c, u.onUpdateShow = t, u.onMaskClick = i, u.onEsc = s, u.to = l, u.maskClosable = a, u.onAfterEnter = this.onAfterEnter, u.onAfterLeave = r, u.closeOnEsc = this.closeOnEsc, u.blockScroll = this.blockScroll, u.autoFocus = this.autoFocus, u.transformOrigin = this.transformOrigin, u.internalAppear = !0, u.internalDialog = !0, $r(Jm, u, {
				default: () => $r(Bm, Object.assign({}, gs(this.$props, wm), {
					style: this.internalStyle,
					onClose: o,
					onNegativeClick: n,
					onPositiveClick: e
				}))
			})
		}
	}),
	ab = {};
ab.injectionKey = String, ab.to = [String, Object];
const cb = Rn({
	name: "DialogProvider",
	props: ab,
	setup() {
		const e = Ct([]),
			t = {};

		function n(n = {}) {
			const o = hs(),
				r = lt(Object.assign(Object.assign({}, n), {
					key: o,
					destroy: () => {
						t["n-dialog-" + o].hide()
					}
				}));
			return e.value.push(r), r
		}
		const o = ["info", "success", "warning", "error"].map((e => t => {
			const o = {};
			return o.type = e, n(Object.assign(Object.assign({}, t), o))
		}));
		const r = {};
		r.create = n, r.destroyAll = function() {
			Object.values(t)
				.forEach((e => e.hide()))
		}, r.info = o[0], r.success = o[1], r.warning = o[2], r.error = o[3];
		const i = r;
		fn(Im, i), fn(Lm, {
			clickedRef: Bl(64),
			clickPositionRef: Rl()
		}), fn("n-dialog-reactive-list", e);
		const s = {};
		return s.dialogList = e, s.dialogInstRefs = t, s.handleAfterLeave = function(t) {
			const {
				value: n
			} = e;
			n.splice(n.findIndex((e => e.key === t)), 1)
		}, Object.assign(Object.assign({}, i), s)
	},
	render() {
		var e, t;
		return $r(nr, null, [this.dialogList.map((e => $r(lb, ms(e, ["destroy", "style"], {
			internalStyle: e.style,
			to: this.to,
			ref: t => {
				null === t ? delete this.dialogInstRefs["n-dialog-" + e.key] : this.dialogInstRefs["n-dialog-" + e.key] = t
			},
			internalKey: e.key,
			onInternalAfterLeave: this.handleAfterLeave
		})))), null === (t = (e = this.$slots)
			.default) || void 0 === t ? void 0 : t.call(e)])
	}
});
const ub = {
		closeMargin: "16px 12px",
		closeSize: "20px",
		closeIconSize: "16px",
		width: "365px",
		padding: "16px",
		titleFontSize: "16px",
		metaFontSize: "12px",
		descriptionFontSize: "12px"
	},
	db = ub,
	fb = {};
fb.Scrollbar = Mv;
const pb = {
	name: "Notification"
};
pb.common = Rv, pb.peers = fb, pb.self = e => {
	const {
		textColor2: t,
		successColor: n,
		infoColor: o,
		warningColor: r,
		errorColor: i,
		popoverColor: s,
		closeIconColor: l,
		closeIconColorHover: a,
		closeIconColorPressed: c,
		closeColorHover: u,
		closeColorPressed: d,
		textColor1: f,
		textColor3: p,
		borderRadius: h,
		fontWeightStrong: v,
		boxShadow2: g,
		lineHeight: m,
		fontSize: b
	} = e, y = {};
	return y.borderRadius = h, y.lineHeight = m, y.fontSize = b, y.headerFontWeight = v, y.iconColor = t, y.iconColorSuccess = n, y.iconColorInfo = o, y.iconColorWarning = r, y.iconColorError = i, y.color = s, y.textColor = t, y.closeIconColor = l, y.closeIconColorHover = a, y.closeIconColorPressed = c, y.closeBorderRadius = h, y.closeColorHover = u, y.closeColorPressed = d, y.headerTextColor = f, y.descriptionTextColor = p, y.actionTextColor = t, y.boxShadow = g, Object.assign(Object.assign({}, db), y)
};
const hb = pb,
	vb = {
		margin: "0 0 8px 0",
		padding: "10px 20px",
		maxWidth: "720px",
		minWidth: "420px",
		iconMargin: "0 10px 0 0",
		closeMargin: "0 0 0 10px",
		closeSize: "20px",
		closeIconSize: "16px",
		iconSize: "20px",
		fontSize: "14px"
	},
	gb = vb,
	mb = {
		name: "Message"
	};
mb.common = Rv, mb.self = e => {
	const {
		textColor2: t,
		closeIconColor: n,
		closeIconColorHover: o,
		closeIconColorPressed: r,
		infoColor: i,
		successColor: s,
		errorColor: l,
		warningColor: a,
		popoverColor: c,
		boxShadow2: u,
		primaryColor: d,
		lineHeight: f,
		borderRadius: p,
		closeColorHover: h,
		closeColorPressed: v
	} = e, g = {};
	return g.closeBorderRadius = p, g.textColor = t, g.textColorInfo = t, g.textColorSuccess = t, g.textColorError = t, g.textColorWarning = t, g.textColorLoading = t, g.color = c, g.colorInfo = c, g.colorSuccess = c, g.colorError = c, g.colorWarning = c, g.colorLoading = c, g.boxShadow = u, g.boxShadowInfo = u, g.boxShadowSuccess = u, g.boxShadowError = u, g.boxShadowWarning = u, g.boxShadowLoading = u, g.iconColor = t, g.iconColorInfo = i, g.iconColorSuccess = s, g.iconColorWarning = a, g.iconColorError = l, g.iconColorLoading = d, g.closeColorHover = h, g.closeColorPressed = v, g.closeIconColor = n, g.closeIconColorHover = o, g.closeIconColorPressed = r, g.closeColorHoverInfo = h, g.closeColorPressedInfo = v, g.closeIconColorInfo = n, g.closeIconColorHoverInfo = o, g.closeIconColorPressedInfo = r, g.closeColorHoverSuccess = h, g.closeColorPressedSuccess = v, g.closeIconColorSuccess = n, g.closeIconColorHoverSuccess = o, g.closeIconColorPressedSuccess = r, g.closeColorHoverError = h, g.closeColorPressedError = v, g.closeIconColorError = n, g.closeIconColorHoverError = o, g.closeIconColorPressedError = r, g.closeColorHoverWarning = h, g.closeColorPressedWarning = v, g.closeIconColorWarning = n, g.closeIconColorHoverWarning = o, g.closeIconColorPressedWarning = r, g.closeColorHoverLoading = h, g.closeColorPressedLoading = v, g.closeIconColorLoading = n, g.closeIconColorHoverLoading = o, g.closeIconColorPressedLoading = r, g.loadingColor = d, g.lineHeight = f, g.borderRadius = p, Object.assign(Object.assign({}, gb), g)
};
const bb = mb,
	yb = {
		name: "LoadingBar"
	};
yb.common = Rv, yb.self = e => {
	const {
		primaryColor: t,
		errorColor: n
	} = e, o = {};
	return o.colorError = n, o.colorLoading = t, o.height = "2px", o
};
const xb = yb,
	Cb = "n-loading-bar",
	wb = "n-loading-bar-api",
	Sb = {
		enterDuration: "0.3s",
		leaveDuration: "0.8s"
	},
	kb = ll("loading-bar-container", "\n z-index: 5999;\n position: fixed;\n top: 0;\n left: 0;\n right: 0;\n height: 2px;\n", [Fv(Sb), ll("loading-bar", "\n width: 100%;\n transition:\n max-width 4s linear,\n background .2s linear;\n height: var(--n-height);\n ", [cl("starting", "\n background: var(--n-color-loading);\n "), cl("finishing", "\n background: var(--n-color-loading);\n transition:\n max-width .2s linear,\n background .2s linear;\n "), cl("error", "\n background: var(--n-color-error);\n transition:\n max-width .2s linear,\n background .2s linear;\n ")])]);
var _b = globalThis && globalThis.__awaiter || function(e, t, n, o) {
	return new(n || (n = Promise))((function(r, i) {
		function s(e) {
			try {
				a(o.next(e))
			} catch (t) {
				i(t)
			}
		}

		function l(e) {
			try {
				a(o.throw(e))
			} catch (t) {
				i(t)
			}
		}

		function a(e) {
			var t;
			e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
					e(t)
				})))
				.then(s, l)
		}
		a((o = o.apply(e, t || []))
			.next())
	}))
};

function Pb(e, t) {
	return t + "-loading-bar " + t + "-loading-bar--" + e
}
const Ob = {};
Ob.containerStyle = [String, Object];
const zb = Rn({
		name: "LoadingBar",
		props: Ob,
		setup() {
			const {
				inlineThemeDisabled: e
			} = sf(), {
				props: t,
				mergedClsPrefixRef: n
			} = pn(Cb), o = Ct(null), r = Ct(!1), i = Ct(!1), s = Ct(!1), l = Ct(!1);
			let a = !1;
			const c = Ct(!1),
				u = Wr((() => {
					const {
						loadingBarStyle: e
					} = t;
					return e ? e[c.value ? "error" : "loading"] : ""
				}));

			function d() {
				return _b(this, void 0, void 0, (function*() {
					r.value = !1, s.value = !1, a = !1, c.value = !1, l.value = !0, yield $t(), l.value = !1
				}))
			}

			function f(e = 0, t = 80, r = "starting") {
				return _b(this, void 0, void 0, (function*() {
					yield d(), s.value = !0, i.value = !0, yield $t();
					const l = o.value;
					l && (l.style.maxWidth = e + "%", l.style.transition = "none", l.offsetWidth, l.className = Pb(r, n.value), l.style.transition = "", l.style.maxWidth = t + "%")
				}))
			}
			const p = tf("LoadingBar", "-loading-bar", kb, xb, t, n),
				h = Wr((() => {
					const {
						self: {
							height: e,
							colorError: t,
							colorLoading: n
						}
					} = p.value, o = {};
					return o["--n-height"] = e, o["--n-color-loading"] = n, o["--n-color-error"] = t, o
				})),
				v = e ? gh("loading-bar", void 0, h, t) : void 0,
				g = {};
			return g.mergedClsPrefix = n, g.loadingBarRef = o, g.started = i, g.loading = s, g.entering = r, g.transitionDisabled = l, g.start = f, g.error = function() {
				if (!a && !c.value)
					if (s.value) {
						c.value = !0;
						const e = o.value;
						if (!e) return;
						e.className = Pb("error", n.value), e.style.maxWidth = "100%", e.offsetWidth, s.value = !1
					} else f(100, 100, "error")
						.then((() => {
							c.value = !0;
							const e = o.value;
							e && (e.className = Pb("error", n.value), e.offsetWidth, s.value = !1)
						}))
			}, g.finish = function() {
				if (a || c.value || !s.value) return;
				a = !0;
				const e = o.value;
				e && (e.className = Pb("finishing", n.value), e.style.maxWidth = "100%", e.offsetWidth, s.value = !1)
			}, g.handleEnter = function() {
				r.value = !0
			}, g.handleAfterEnter = function() {
				r.value = !1
			}, g.handleAfterLeave = function() {
				return _b(this, void 0, void 0, (function*() {
					yield d()
				}))
			}, g.mergedLoadingBarStyle = u, g.cssVars = e ? void 0 : h, g.themeClass = null == v ? void 0 : v.themeClass, g.onRender = null == v ? void 0 : v.onRender, g
		},
		render() {
			if (!this.started) return null;
			const {
				mergedClsPrefix: e
			} = this, t = {
				name: "fade-in-transition",
				appear: !0
			};
			return t.onEnter = this.handleEnter, t.onAfterEnter = this.handleAfterEnter, t.onAfterLeave = this.handleAfterLeave, t.css = !this.transitionDisabled, $r(ci, t, {
				default: () => {
					var t;
					null === (t = this.onRender) || void 0 === t || t.call(this);
					const n = {};
					n.class = [e + "-loading-bar-container", this.themeClass], n.style = this.containerStyle;
					const o = {
						ref: "loadingBarRef"
					};
					return o.class = [e + "-loading-bar"], o.style = [this.cssVars, this.mergedLoadingBarStyle], to($r("div", n, $r("div", o)), [
						[Fi, this.loading || !this.loading && this.entering]
					])
				}
			})
		}
	}),
	Eb = Rn({
		name: "LoadingBarProvider",
		props: Object.assign(Object.assign({}, tf.props), {
			to: {
				type: [String, Object, Boolean],
				default: void 0
			},
			containerStyle: [String, Object],
			loadingBarStyle: {
				type: Object
			}
		}),
		setup(e) {
			const t = Ll(),
				n = Ct(null),
				o = {
					start() {
						var e;
						t.value ? null === (e = n.value) || void 0 === e || e.start() : $t((() => {
							var e;
							null === (e = n.value) || void 0 === e || e.start()
						}))
					},
					error() {
						var e;
						t.value ? null === (e = n.value) || void 0 === e || e.error() : $t((() => {
							var e;
							null === (e = n.value) || void 0 === e || e.error()
						}))
					},
					finish() {
						var e;
						t.value ? null === (e = n.value) || void 0 === e || e.finish() : $t((() => {
							var e;
							null === (e = n.value) || void 0 === e || e.finish()
						}))
					}
				},
				{
					mergedClsPrefixRef: r
				} = sf(e);
			fn(wb, o);
			const i = {};
			i.props = e, i.mergedClsPrefixRef = r, fn(Cb, i);
			const s = {};
			return s.loadingBarRef = n, Object.assign(o, s)
		},
		render() {
			var e, t;
			const n = {};
			n.disabled = !1 === this.to, n.to = this.to || "body";
			const o = {
				ref: "loadingBarRef"
			};
			return o.containerStyle = this.containerStyle, $r(nr, null, $r(er, n, $r(zb, o)), null === (t = (e = this.$slots)
				.default) || void 0 === t ? void 0 : t.call(e))
		}
	});
const Tb = {};
Tb.type = String, Tb.default = "info";
const Rb = {};
Rb.type = Boolean, Rb.default = !0;
const jb = {};
jb.icon = Function, jb.type = Tb, jb.content = [String, Number, Function], jb.showIcon = Rb, jb.closable = Boolean, jb.keepAliveOnHover = Boolean, jb.onClose = Function, jb.onMouseenter = Function, jb.onMouseleave = Function;
const Mb = jb,
	Ab = "n-message-api",
	Fb = "n-message-provider",
	Bb = {
		transform: "scale(1)"
	},
	Lb = {
		transform: "scale(0.85)"
	},
	Ib = {
		overflow: "visible",
		originalTransition: "transform .3s var(--n-bezier)"
	};
Ib.enterToProps = Bb, Ib.leaveToProps = Lb;
const Hb = il([ll("message-wrapper", "\n margin: var(--n-margin);\n z-index: 0;\n transform-origin: top center;\n display: flex;\n ", [og(Ib)]), ll("message", "\n box-sizing: border-box;\n display: flex;\n align-items: center;\n transition:\n color .3s var(--n-bezier),\n box-shadow .3s var(--n-bezier),\n background-color .3s var(--n-bezier),\n opacity .3s var(--n-bezier),\n transform .3s var(--n-bezier),\n margin-bottom .3s var(--n-bezier);\n padding: var(--n-padding);\n border-radius: var(--n-border-radius);\n flex-wrap: nowrap;\n overflow: hidden;\n max-width: var(--n-max-width);\n color: var(--n-text-color);\n background-color: var(--n-color);\n box-shadow: var(--n-box-shadow);\n ", [al("content", "\n display: inline-block;\n line-height: var(--n-line-height);\n font-size: var(--n-font-size);\n "), al("icon", "\n position: relative;\n margin: var(--n-icon-margin);\n height: var(--n-icon-size);\n width: var(--n-icon-size);\n font-size: var(--n-icon-size);\n flex-shrink: 0;\n ", [
		["default", "info", "success", "warning", "error", "loading"].map((e => cl(e + "-type", [il("> *", "\n color: var(--n-icon-color-" + e + ");\n transition: color .3s var(--n-bezier);\n ")]))), il("> *", "\n position: absolute;\n left: 0;\n top: 0;\n right: 0;\n bottom: 0;\n ", [sv()])
	]), al("close", "\n margin: var(--n-close-margin);\n transition:\n background-color .3s var(--n-bezier),\n color .3s var(--n-bezier);\n flex-shrink: 0;\n ", [il("&:hover", "\n color: var(--n-close-icon-color-hover);\n "), il("&:active", "\n color: var(--n-close-icon-color-pressed);\n ")])]), ll("message-container", "\n z-index: 6000;\n position: fixed;\n height: 0;\n overflow: visible;\n display: flex;\n flex-direction: column;\n align-items: center;\n ", [cl("top", "\n top: 12px;\n left: 0;\n right: 0;\n "), cl("top-left", "\n top: 12px;\n left: 12px;\n right: 0;\n align-items: flex-start;\n "), cl("top-right", "\n top: 12px;\n left: 0;\n right: 12px;\n align-items: flex-end;\n "), cl("bottom", "\n bottom: 4px;\n left: 0;\n right: 0;\n justify-content: flex-end;\n "), cl("bottom-left", "\n bottom: 4px;\n left: 12px;\n right: 0;\n justify-content: flex-end;\n align-items: flex-start;\n "), cl("bottom-right", "\n bottom: 4px;\n left: 0;\n right: 12px;\n justify-content: flex-end;\n align-items: flex-end;\n ")])]),
	Db = {
		info: () => $r(Mh, null),
		success: () => $r(Ih, null),
		warning: () => $r($h, null),
		error: () => $r(zh, null),
		default: () => null
	},
	Nb = {};
Nb.render = Function;
const Wb = Rn({
	name: "Message",
	props: Object.assign(Object.assign({}, Mb), Nb),
	setup(e) {
		const {
			inlineThemeDisabled: t,
			mergedRtlRef: n
		} = sf(e), {
			props: o,
			mergedClsPrefixRef: r
		} = pn(Fb), i = mh("Message", n, r), s = tf("Message", "-message", Hb, bb, o, r), l = Wr((() => {
			const {
				type: t
			} = e, {
				common: {
					cubicBezierEaseInOut: n
				},
				self: {
					padding: o,
					margin: r,
					maxWidth: i,
					iconMargin: l,
					closeMargin: a,
					closeSize: c,
					iconSize: u,
					fontSize: d,
					lineHeight: f,
					borderRadius: p,
					iconColorInfo: h,
					iconColorSuccess: v,
					iconColorWarning: g,
					iconColorError: m,
					iconColorLoading: b,
					closeIconSize: y,
					closeBorderRadius: x,
					[el("textColor", t)]: C,
					[el("boxShadow", t)]: w,
					[el("color", t)]: S,
					[el("closeColorHover", t)]: k,
					[el("closeColorPressed", t)]: _,
					[el("closeIconColor", t)]: P,
					[el("closeIconColorPressed", t)]: O,
					[el("closeIconColorHover", t)]: z
				}
			} = s.value, E = {};
			return E["--n-bezier"] = n, E["--n-margin"] = r, E["--n-padding"] = o, E["--n-max-width"] = i, E["--n-font-size"] = d, E["--n-icon-margin"] = l, E["--n-icon-size"] = u, E["--n-close-icon-size"] = y, E["--n-close-border-radius"] = x, E["--n-close-size"] = c, E["--n-close-margin"] = a, E["--n-text-color"] = C, E["--n-color"] = S, E["--n-box-shadow"] = w, E["--n-icon-color-info"] = h, E["--n-icon-color-success"] = v, E["--n-icon-color-warning"] = g, E["--n-icon-color-error"] = m, E["--n-icon-color-loading"] = b, E["--n-close-color-hover"] = k, E["--n-close-color-pressed"] = _, E["--n-close-icon-color"] = P, E["--n-close-icon-color-pressed"] = O, E["--n-close-icon-color-hover"] = z, E["--n-line-height"] = f, E["--n-border-radius"] = p, E
		})), a = t ? gh("message", Wr((() => e.type[0])), l, {}) : void 0;
		return {
			mergedClsPrefix: r,
			rtlEnabled: i,
			messageProviderProps: o,
			handleClose() {
				var t;
				null === (t = e.onClose) || void 0 === t || t.call(e)
			},
			cssVars: t ? void 0 : l,
			themeClass: null == a ? void 0 : a.themeClass,
			onRender: null == a ? void 0 : a.onRender,
			placement: o.placement
		}
	},
	render() {
		const {
			render: e,
			type: t,
			closable: n,
			content: o,
			mergedClsPrefix: r,
			cssVars: i,
			themeClass: s,
			onRender: l,
			icon: a,
			handleClose: c,
			showIcon: u
		} = this;
		let d;
		return null == l || l(), $r("div", {
			class: [r + "-message-wrapper", s],
			onMouseenter: this.onMouseenter,
			onMouseleave: this.onMouseleave,
			style: [{
				alignItems: this.placement.startsWith("top") ? "flex-start" : "flex-end"
			}, i]
		}, e ? e(this.$props) : $r("div", {
			class: [r + "-message " + r + "-message--" + t + "-type", this.rtlEnabled && r + "-message--rtl"]
		}, (d = function(e, t, n) {
			if ("function" == typeof e) return e(); {
				const e = {};
				e.clsPrefix = n, e.strokeWidth = 24, e.scale = .85;
				const o = "loading" === t ? $r(bv, e) : Db[t]();
				if (!o) return null;
				const r = {};
				r.clsPrefix = n, r.key = t;
				const i = {
					default: () => o
				};
				return $r(Yh, r, i)
			}
		}(a, t, r)) && u ? $r("div", {
			class: r + "-message__icon " + r + "-message__icon--" + t + "-type"
		}, $r(Vh, null, {
			default: () => d
		})) : null, $r("div", {
			class: r + "-message__content"
		}, Cs(o)), n ? $r(rv, {
			clsPrefix: r,
			class: r + "-message__close",
			onClick: c,
			absolute: !0
		}) : null))
	}
});
const $b = {};
$b.type = Number, $b.default = 3e3;
const Vb = {};
Vb.type = String, Vb.required = !0;
const qb = {};
qb.duration = $b, qb.onAfterLeave = Function, qb.onLeave = Function, qb.internalKey = Vb, qb.onInternalAfterLeave = Function, qb.onHide = Function, qb.onAfterHide = Function;
const Ub = Rn({
		name: "MessageEnvironment",
		props: Object.assign(Object.assign({}, Mb), qb),
		setup(e) {
			let t = null;
			const n = Ct(!0);

			function o() {
				const {
					duration: n
				} = e;
				n && (t = window.setTimeout(r, n))
			}

			function r() {
				const {
					onHide: o
				} = e;
				n.value = !1, t && (window.clearTimeout(t), t = null), o && o()
			}
			Un((() => {
				o()
			}));
			const i = {};
			return i.show = n, i.hide = r, i.handleClose = function() {
				const {
					onClose: t
				} = e;
				t && t(), r()
			}, i.handleAfterLeave = function() {
				const {
					onAfterLeave: t,
					onInternalAfterLeave: n,
					onAfterHide: o,
					internalKey: r
				} = e;
				t && t(), n && n(r), o && o()
			}, i.handleMouseleave = function(e) {
				e.currentTarget === e.target && o()
			}, i.handleMouseenter = function(e) {
				e.currentTarget === e.target && null !== t && (window.clearTimeout(t), t = null)
			}, i.deactivate = function() {
				r()
			}, i
		},
		render() {
			const e = {
				appear: !0
			};
			return e.onAfterLeave = this.handleAfterLeave, e.onLeave = this.onLeave, $r(Uh, e, {
				default: () => [this.show ? $r(Wb, {
					content: this.content,
					type: this.type,
					icon: this.icon,
					showIcon: this.showIcon,
					closable: this.closable,
					onClose: this.handleClose,
					onMouseenter: this.keepAliveOnHover ? this.handleMouseenter : void 0,
					onMouseleave: this.keepAliveOnHover ? this.handleMouseleave : void 0
				}) : null]
			})
		}
	}),
	Gb = {};
Gb.type = Number, Gb.default = 3e3;
const Xb = Rn({
	name: "MessageProvider",
	props: Object.assign(Object.assign({}, tf.props), {
		to: [String, Object],
		duration: Gb,
		keepAliveOnHover: Boolean,
		max: Number,
		placement: {
			type: String,
			default: "top"
		},
		closable: Boolean,
		containerStyle: [String, Object]
	}),
	setup(e) {
		const {
			mergedClsPrefixRef: t
		} = sf(e), n = Ct([]), o = Ct({}), r = {
			create(e, t) {
				const n = {
					type: "default"
				};
				return s(e, Object.assign(n, t))
			},
			info(e, t) {
				const n = {
					type: "info"
				};
				return s(e, Object.assign(Object.assign({}, t), n))
			},
			success(e, t) {
				const n = {
					type: "success"
				};
				return s(e, Object.assign(Object.assign({}, t), n))
			},
			warning(e, t) {
				const n = {
					type: "warning"
				};
				return s(e, Object.assign(Object.assign({}, t), n))
			},
			error(e, t) {
				const n = {
					type: "error"
				};
				return s(e, Object.assign(Object.assign({}, t), n))
			},
			loading(e, t) {
				const n = {
					type: "loading"
				};
				return s(e, Object.assign(Object.assign({}, t), n))
			},
			destroyAll: function() {
				Object.values(o.value)
					.forEach((e => {
						e.hide()
					}))
			}
		}, i = {};

		function s(t, r) {
			const i = hs(),
				s = lt(Object.assign(Object.assign({}, r), {
					content: t,
					key: i,
					destroy: () => {
						var e;
						null === (e = o.value[i]) || void 0 === e || e.hide()
					}
				})),
				{
					max: l
				} = e;
			return l && n.value.length >= l && n.value.shift(), n.value.push(s), s
		}
		i.props = e, i.mergedClsPrefixRef = t, fn(Fb, i), fn(Ab, r);
		const l = {};
		return l.mergedClsPrefix = t, l.messageRefs = o, l.messageList = n, l.handleAfterLeave = function(e) {
			n.value.splice(n.value.findIndex((t => t.key === e)), 1), delete o.value[e]
		}, Object.assign(l, r)
	},
	render() {
		var e, t, n;
		return $r(nr, null, null === (t = (e = this.$slots)
			.default) || void 0 === t ? void 0 : t.call(e), this.messageList.length ? $r(er, {
			to: null !== (n = this.to) && void 0 !== n ? n : "body"
		}, $r("div", {
			class: [this.mergedClsPrefix + "-message-container", this.mergedClsPrefix + "-message-container--" + this.placement],
			key: "message-container",
			style: this.containerStyle
		}, this.messageList.map((e => {
			const t = {};
			return t.ref = t => {
				t && (this.messageRefs[e.key] = t)
			}, t.internalKey = e.key, t.onInternalAfterLeave = this.handleAfterLeave, $r(Ub, Object.assign(t, ms(e, ["destroy"], void 0), {
				duration: void 0 === e.duration ? this.duration : e.duration,
				keepAliveOnHover: void 0 === e.keepAliveOnHover ? this.keepAliveOnHover : e.keepAliveOnHover,
				closable: void 0 === e.closable ? this.closable : e.closable
			}))
		})))) : null)
	}
});
const Zb = "n-notification-provider",
	Kb = {};
Kb.type = Boolean, Kb.required = !0;
const Yb = {};
Yb.type = String, Yb.required = !0;
const Qb = {};
Qb.scrollable = Kb, Qb.placement = Yb;
const Jb = Rn({
		name: "NotificationContainer",
		props: Qb,
		setup() {
			const {
				mergedThemeRef: e,
				mergedClsPrefixRef: t,
				wipTransitionCountRef: n
			} = pn(Zb), o = Ct(null);
			hn((() => {
				var e, t;
				n.value > 0 ? null === (e = null == o ? void 0 : o.value) || void 0 === e || e.classList.add("transitioning") : null === (t = null == o ? void 0 : o.value) || void 0 === t || t.classList.remove("transitioning")
			}));
			const r = {};
			return r.selfRef = o, r.mergedTheme = e, r.mergedClsPrefix = t, r.transitioning = n, r
		},
		render() {
			const {
				$slots: e,
				scrollable: t,
				mergedClsPrefix: n,
				mergedTheme: o,
				placement: r
			} = this, i = {
				ref: "selfRef"
			};
			i.class = [n + "-notification-container", t && n + "-notification-container--scrollable", n + "-notification-container--" + r];
			const s = {
					overflow: "hidden"
				},
				l = {};
			return l.theme = o.peers.Scrollbar, l.themeOverrides = o.peerOverrides.Scrollbar, l.contentStyle = s, $r("div", i, t ? $r(Vv, l, e) : e)
		}
	}),
	ey = {
		info: () => $r(Mh, null),
		success: () => $r(Ih, null),
		warning: () => $r($h, null),
		error: () => $r(zh, null),
		default: () => null
	},
	ty = {};
ty.type = Boolean, ty.default = !0;
const ny = {};
ny.type = String, ny.default = "default";
const oy = {};
oy.closable = ty, oy.type = ny, oy.avatar = Function, oy.title = [String, Function], oy.description = [String, Function], oy.content = [String, Function], oy.meta = [String, Function], oy.action = [String, Function], oy.onClose = {}, oy.keepAliveOnHover = Boolean, oy.onMouseenter = Function, oy.onMouseleave = Function, oy.onClose.type = Function, oy.onClose.required = !0;
const ry = oy,
	iy = xs(ry),
	sy = Rn({
		name: "Notification",
		props: ry,
		setup(e) {
			const {
				mergedClsPrefixRef: t,
				mergedThemeRef: n,
				props: o
			} = pn(Zb), {
				inlineThemeDisabled: r,
				mergedRtlRef: i
			} = sf(), s = mh("Notification", i, t), l = Wr((() => {
				const {
					type: t
				} = e, {
					self: {
						color: o,
						textColor: r,
						closeIconColor: i,
						closeIconColorHover: s,
						closeIconColorPressed: l,
						headerTextColor: a,
						descriptionTextColor: c,
						actionTextColor: u,
						borderRadius: d,
						headerFontWeight: f,
						boxShadow: p,
						lineHeight: h,
						fontSize: v,
						closeMargin: g,
						closeSize: m,
						width: b,
						padding: y,
						closeIconSize: x,
						closeBorderRadius: C,
						closeColorHover: w,
						closeColorPressed: S,
						titleFontSize: k,
						metaFontSize: _,
						descriptionFontSize: P,
						[el("iconColor", t)]: O
					},
					common: {
						cubicBezierEaseOut: z,
						cubicBezierEaseIn: E,
						cubicBezierEaseInOut: T
					}
				} = n.value, {
					left: R,
					right: j,
					top: M,
					bottom: A
				} = Vi(y), F = {};
				return F["--n-color"] = o, F["--n-font-size"] = v, F["--n-text-color"] = r, F["--n-description-text-color"] = c, F["--n-action-text-color"] = u, F["--n-title-text-color"] = a, F["--n-title-font-weight"] = f, F["--n-bezier"] = T, F["--n-bezier-ease-out"] = z, F["--n-bezier-ease-in"] = E, F["--n-border-radius"] = d, F["--n-box-shadow"] = p, F["--n-close-border-radius"] = C, F["--n-close-color-hover"] = w, F["--n-close-color-pressed"] = S, F["--n-close-icon-color"] = i, F["--n-close-icon-color-hover"] = s, F["--n-close-icon-color-pressed"] = l, F["--n-line-height"] = h, F["--n-icon-color"] = O, F["--n-close-margin"] = g, F["--n-close-size"] = m, F["--n-close-icon-size"] = x, F["--n-width"] = b, F["--n-padding-left"] = R, F["--n-padding-right"] = j, F["--n-padding-top"] = M, F["--n-padding-bottom"] = A, F["--n-title-font-size"] = k, F["--n-meta-font-size"] = _, F["--n-description-font-size"] = P, F
			})), a = r ? gh("notification", Wr((() => e.type[0])), l, o) : void 0;
			return {
				mergedClsPrefix: t,
				showAvatar: Wr((() => e.avatar || "default" !== e.type)),
				handleCloseClick() {
					e.onClose()
				},
				rtlEnabled: s,
				cssVars: r ? void 0 : l,
				themeClass: null == a ? void 0 : a.themeClass,
				onRender: null == a ? void 0 : a.onRender
			}
		},
		render() {
			var e;
			const {
				mergedClsPrefix: t
			} = this;
			null === (e = this.onRender) || void 0 === e || e.call(this);
			const n = {};
			n.class = [t + "-notification-wrapper", this.themeClass], n.onMouseenter = this.onMouseenter, n.onMouseleave = this.onMouseleave, n.style = this.cssVars;
			const o = {};
			o.class = [t + "-notification", this.rtlEnabled && t + "-notification--rtl", this.themeClass, {
				[t + "-notification--closable"]: this.closable,
				[t + "-notification--show-avatar"]: this.showAvatar
			}], o.style = this.cssVars;
			const r = {};
			r.class = t + "-notification__avatar";
			const i = {};
			return i.clsPrefix = t, $r("div", n, $r("div", o, this.showAvatar ? $r("div", r, this.avatar ? Cs(this.avatar) : "default" !== this.type ? $r(Yh, i, {
				default: () => ey[this.type]()
			}) : null) : null, this.closable ? $r(rv, {
				clsPrefix: t,
				class: t + "-notification__close",
				onClick: this.handleCloseClick
			}) : null, $r("div", {
				ref: "bodyRef",
				class: t + "-notification-main"
			}, this.title ? $r("div", {
				class: t + "-notification-main__header"
			}, Cs(this.title)) : null, this.description ? $r("div", {
				class: t + "-notification-main__description"
			}, Cs(this.description)) : null, this.content ? $r("pre", {
				class: t + "-notification-main__content"
			}, Cs(this.content)) : null, this.meta || this.action ? $r("div", {
				class: t + "-notification-main-footer"
			}, this.meta ? $r("div", {
				class: t + "-notification-main-footer__meta"
			}, Cs(this.meta)) : null, this.action ? $r("div", {
				class: t + "-notification-main-footer__action"
			}, Cs(this.action)) : null) : null)))
		}
	}),
	ly = {};
ly.duration = Number, ly.onClose = Function, ly.onLeave = Function, ly.onAfterEnter = Function, ly.onAfterLeave = Function, ly.onHide = Function, ly.onAfterShow = Function, ly.onAfterHide = Function;
const ay = Object.assign(Object.assign({}, ry), ly),
	cy = {};
cy.type = String, cy.required = !0;
const uy = {};
uy.type = Function, uy.required = !0;
const dy = {};
dy.internalKey = cy, dy.onInternalAfterLeave = uy;
const fy = Rn({
		name: "NotificationEnvironment",
		props: Object.assign(Object.assign({}, ay), dy),
		setup(e) {
			const {
				wipTransitionCountRef: t
			} = pn(Zb), n = Ct(!0);
			let o = null;

			function r() {
				n.value = !1, o && window.clearTimeout(o)
			}
			Un((() => {
				e.duration && (o = window.setTimeout(r, e.duration))
			}));
			const i = {};
			return i.show = n, i.hide = r, i.handleClose = function() {
				const {
					onClose: t
				} = e;
				t ? Promise.resolve(t())
					.then((e => {
						!1 !== e && r()
					})) : r()
			}, i.handleAfterLeave = function() {
				t.value--;
				const {
					onAfterLeave: n,
					onInternalAfterLeave: o,
					onAfterHide: r,
					internalKey: i
				} = e;
				n && n(), o(i), r && r()
			}, i.handleLeave = function(t) {
				const {
					onHide: n
				} = e;
				n && n(), t.style.maxHeight = "0", t.offsetHeight
			}, i.handleBeforeLeave = function(e) {
				t.value++, e.style.maxHeight = e.offsetHeight + "px", e.style.height = e.offsetHeight + "px", e.offsetHeight
			}, i.handleAfterEnter = function(n) {
				t.value--, n.style.height = "", n.style.maxHeight = "";
				const {
					onAfterEnter: o,
					onAfterShow: r
				} = e;
				o && o(), r && r()
			}, i.handleBeforeEnter = function(e) {
				t.value++, $t((() => {
					e.style.height = e.offsetHeight + "px", e.style.maxHeight = "0", e.style.transition = "none", e.offsetHeight, e.style.transition = "", e.style.maxHeight = e.style.height
				}))
			}, i.handleMouseenter = function(e) {
				e.currentTarget === e.target && null !== o && (window.clearTimeout(o), o = null)
			}, i.handleMouseleave = function(t) {
				t.currentTarget === t.target && function() {
					const {
						duration: t
					} = e;
					t && (o = window.setTimeout(r, t))
				}()
			}, i
		},
		render() {
			const e = {
				name: "notification-transition",
				appear: !0
			};
			return e.onBeforeEnter = this.handleBeforeEnter, e.onAfterEnter = this.handleAfterEnter, e.onBeforeLeave = this.handleBeforeLeave, e.onLeave = this.handleLeave, e.onAfterLeave = this.handleAfterLeave, $r(ci, e, {
				default: () => this.show ? $r(sy, Object.assign({}, gs(this.$props, iy), {
					onClose: this.handleClose,
					onMouseenter: this.duration && this.keepAliveOnHover ? this.handleMouseenter : void 0,
					onMouseleave: this.duration && this.keepAliveOnHover ? this.handleMouseleave : void 0
				})) : null
			})
		}
	}),
	py = {
		color: "var(--n-icon-color)"
	},
	hy = {
		color: "var(--n-icon-color)"
	},
	vy = {
		paddingRight: "20px"
	},
	gy = {
		margin: 0
	},
	my = il([ll("notification-container", "\n z-index: 4000;\n position: fixed;\n overflow: visible;\n display: flex;\n flex-direction: column;\n align-items: flex-end;\n ", [il(">", [ll("scrollbar", "\n width: initial;\n overflow: visible;\n height: -moz-fit-content !important;\n height: fit-content !important;\n max-height: 100vh !important;\n ", [il(">", [ll("scrollbar-container", "\n height: -moz-fit-content !important;\n height: fit-content !important;\n max-height: 100vh !important;\n ", [ll("scrollbar-content", "\n padding-top: 12px;\n padding-bottom: 33px;\n ")])])])]), cl("top, top-right, top-left", "\n top: 12px;\n ", [il("&.transitioning >", [ll("scrollbar", [il(">", [ll("scrollbar-container", "\n min-height: 100vh !important;\n ")])])])]), cl("bottom, bottom-right, bottom-left", "\n bottom: 12px;\n ", [il(">", [ll("scrollbar", [il(">", [ll("scrollbar-container", [ll("scrollbar-content", "\n padding-bottom: 12px;\n ")])])])]), ll("notification-wrapper", "\n display: flex;\n align-items: flex-end;\n margin-bottom: 0;\n margin-top: 12px;\n ")]), cl("top, bottom", "\n left: 50%;\n transform: translateX(-50%);\n ", [ll("notification-wrapper", [il("&.notification-transition-enter-from, &.notification-transition-leave-to", "\n transform: scale(0.85);\n "), il("&.notification-transition-leave-from, &.notification-transition-enter-to", "\n transform: scale(1);\n ")])]), cl("top", [ll("notification-wrapper", "\n transform-origin: top center;\n ")]), cl("bottom", [ll("notification-wrapper", "\n transform-origin: bottom center;\n ")]), cl("top-right, bottom-right", [ll("notification", "\n margin-left: 28px;\n margin-right: 16px;\n ")]), cl("top-left, bottom-left", [ll("notification", "\n margin-left: 16px;\n margin-right: 28px;\n ")]), cl("top-right", "\n right: 0;\n ", [by("top-right")]), cl("top-left", "\n left: 0;\n ", [by("top-left")]), cl("bottom-right", "\n right: 0;\n ", [by("bottom-right")]), cl("bottom-left", "\n left: 0;\n ", [by("bottom-left")]), cl("scrollable", [cl("top-right", "\n top: 0;\n "), cl("top-left", "\n top: 0;\n "), cl("bottom-right", "\n bottom: 0;\n "), cl("bottom-left", "\n bottom: 0;\n ")]), ll("notification-wrapper", "\n margin-bottom: 12px;\n ", [il("&.notification-transition-enter-from, &.notification-transition-leave-to", "\n opacity: 0;\n margin-top: 0 !important;\n margin-bottom: 0 !important;\n "), il("&.notification-transition-leave-from, &.notification-transition-enter-to", "\n opacity: 1;\n "), il("&.notification-transition-leave-active", "\n transition:\n background-color .3s var(--n-bezier),\n color .3s var(--n-bezier),\n opacity .3s var(--n-bezier),\n transform .3s var(--n-bezier-ease-in),\n max-height .3s var(--n-bezier),\n margin-top .3s linear,\n margin-bottom .3s linear,\n box-shadow .3s var(--n-bezier);\n "), il("&.notification-transition-enter-active", "\n transition:\n background-color .3s var(--n-bezier),\n color .3s var(--n-bezier),\n opacity .3s var(--n-bezier),\n transform .3s var(--n-bezier-ease-out),\n max-height .3s var(--n-bezier),\n margin-top .3s linear,\n margin-bottom .3s linear,\n box-shadow .3s var(--n-bezier);\n ")]), ll("notification", "\n background-color: var(--n-color);\n color: var(--n-text-color);\n transition:\n background-color .3s var(--n-bezier),\n color .3s var(--n-bezier),\n opacity .3s var(--n-bezier),\n box-shadow .3s var(--n-bezier);\n font-family: inherit;\n font-size: var(--n-font-size);\n font-weight: 400;\n position: relative;\n display: flex;\n overflow: hidden;\n flex-shrink: 0;\n padding-left: var(--n-padding-left);\n padding-right: var(--n-padding-right);\n width: var(--n-width);\n border-radius: var(--n-border-radius);\n box-shadow: var(--n-box-shadow);\n box-sizing: border-box;\n opacity: 1;\n ", [al("avatar", [ll("icon", py), ll("base-icon", hy)]), cl("show-avatar", [ll("notification-main", "\n margin-left: 40px;\n width: calc(100% - 40px); \n ")]), cl("closable", [ll("notification-main", [il("> *:first-child", vy)]), al("close", "\n position: absolute;\n top: 0;\n right: 0;\n margin: var(--n-close-margin);\n transition:\n background-color .3s var(--n-bezier),\n color .3s var(--n-bezier);\n ")]), al("avatar", "\n position: absolute;\n top: var(--n-padding-top);\n left: var(--n-padding-left);\n width: 28px;\n height: 28px;\n font-size: 28px;\n display: flex;\n align-items: center;\n justify-content: center;\n ", [ll("icon", "transition: color .3s var(--n-bezier);")]), ll("notification-main", "\n padding-top: var(--n-padding-top);\n padding-bottom: var(--n-padding-bottom);\n box-sizing: border-box;\n display: flex;\n flex-direction: column;\n margin-left: 8px;\n width: calc(100% - 8px);\n ", [ll("notification-main-footer", "\n display: flex;\n align-items: center;\n justify-content: space-between;\n margin-top: 12px;\n ", [al("meta", "\n font-size: var(--n-meta-font-size);\n transition: color .3s var(--n-bezier-ease-out);\n color: var(--n-description-text-color);\n "), al("action", "\n cursor: pointer;\n transition: color .3s var(--n-bezier-ease-out);\n color: var(--n-action-text-color);\n ")]), al("header", "\n font-weight: var(--n-title-font-weight);\n font-size: var(--n-title-font-size);\n transition: color .3s var(--n-bezier-ease-out);\n color: var(--n-title-text-color);\n "), al("description", "\n margin-top: 8px;\n font-size: var(--n-description-font-size);\n transition: color .3s var(--n-bezier-ease-out);\n color: var(--n-description-text-color);\n "), al("content", "\n line-height: var(--n-line-height);\n margin: 12px 0 0 0;\n font-family: inherit;\n white-space: pre-wrap;\n word-wrap: break-word;\n transition: color .3s var(--n-bezier-ease-out);\n color: var(--n-text-color);\n ", [il("&:first-child", gy)])])])])]);

function by(e) {
	const t = e.split("-")[1];
	return ll("notification-wrapper", [il("&.notification-transition-enter-from, &.notification-transition-leave-to", "\n transform: translate(" + ("left" === t ? "calc(-100%)" : "calc(100%)") + ", 0);\n "), il("&.notification-transition-leave-from, &.notification-transition-enter-to", "\n transform: translate(0, 0);\n ")])
}
const yy = "n-notification-api",
	xy = {};
xy.type = Boolean, xy.default = !0;
const Cy = Rn({
	name: "NotificationProvider",
	props: Object.assign(Object.assign({}, tf.props), {
		containerStyle: [String, Object],
		to: [String, Object],
		scrollable: xy,
		max: Number,
		placement: {
			type: String,
			default: "top-right"
		},
		keepAliveOnHover: Boolean
	}),
	setup(e) {
		const {
			mergedClsPrefixRef: t
		} = sf(e), n = Ct([]), o = {}, r = new Set;

		function i(t) {
			const i = hs(),
				s = () => {
					r.add(i), o[i] && o[i].hide()
				},
				l = {};
			l.key = i, l.destroy = s, l.hide = s, l.deactivate = s;
			const a = lt(Object.assign(Object.assign({}, t), l)),
				{
					max: c
				} = e;
			if (c && n.value.length - r.size >= c) {
				let e = !1,
					t = 0;
				for (const i of n.value) {
					if (!r.has(i.key)) {
						o[i.key] && (i.destroy(), e = !0);
						break
					}
					t++
				}!e && n.value.splice(t, 1)
			}
			return n.value.push(a), a
		}
		const s = ["info", "success", "warning", "error"].map((e => {
			const t = {};
			return t.type = e, e => i(Object.assign(Object.assign({}, e), t))
		}));
		const l = tf("Notification", "-notification", my, hb, e, t),
			a = {};
		a.create = i, a.info = s[0], a.success = s[1], a.warning = s[2], a.error = s[3], a.open = function(e) {
			return i(e)
		}, a.destroyAll = function() {
			Object.values(n.value)
				.forEach((e => {
					e.hide()
				}))
		};
		const c = a,
			u = Ct(0);
		fn(yy, c);
		const d = {};
		d.props = e, d.mergedClsPrefixRef = t, d.mergedThemeRef = l, d.wipTransitionCountRef = u, fn(Zb, d);
		const f = {};
		return f.mergedClsPrefix = t, f.notificationList = n, f.notificationRefs = o, f.handleAfterLeave = function(e) {
			r.delete(e), n.value.splice(n.value.findIndex((t => t.key === e)), 1)
		}, Object.assign(f, c)
	},
	render() {
		var e, t, n;
		const {
			placement: o
		} = this;
		return $r(nr, null, null === (t = (e = this.$slots)
			.default) || void 0 === t ? void 0 : t.call(e), this.notificationList.length ? $r(er, {
			to: null !== (n = this.to) && void 0 !== n ? n : "body"
		}, $r(Jb, {
			style: this.containerStyle,
			scrollable: this.scrollable && "top" !== o && "bottom" !== o,
			placement: o
		}, {
			default: () => this.notificationList.map((e => {
				const t = {};
				return t.ref = t => {
					const n = e.key;
					null === t ? delete this.notificationRefs[n] : this.notificationRefs[n] = t
				}, $r(fy, Object.assign(t, ms(e, ["destroy", "hide", "deactivate"]), {
					internalKey: e.key,
					onInternalAfterLeave: this.handleAfterLeave,
					keepAliveOnHover: void 0 === e.keepAliveOnHover ? this.keepAliveOnHover : e.keepAliveOnHover
				}))
			}))
		})) : null)
	}
});
const wy = {};
wy.onSetup = Function;
const Sy = Rn({
		name: "InjectionExtractor",
		props: wy,
		setup(e, {
			slots: t
		}) {
			var n;
			return null === (n = e.onSetup) || void 0 === n || n.call(e), () => {
				var e;
				return null === (e = t.default) || void 0 === e ? void 0 : e.call(t)
			}
		}
	}),
	ky = {
		message: function() {
			const e = pn(Ab, null);
			return null === e && Ss("use-message", "No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A."), e
		},
		notification: function() {
			const e = pn(yy, null);
			return null === e && Ss("use-notification", "No outer `n-notification-provider` found."), e
		},
		loadingBar: function() {
			const e = pn(wb, null);
			return null === e && Ss("use-loading-bar", "No outer <n-loading-bar-provider /> founded."), e
		},
		dialog: function() {
			const e = pn(Im, null);
			return null === e && Ss("use-dialog", "No outer <n-dialog-provider /> founded."), e
		}
	},
	_y = ky;
const Py = {
	exports: {}
};
var Oy = Py;
const zy = {
	aliceblue: [240, 248, 255],
	antiquewhite: [250, 235, 215],
	aqua: [0, 255, 255],
	aquamarine: [127, 255, 212],
	azure: [240, 255, 255],
	beige: [245, 245, 220],
	bisque: [255, 228, 196],
	black: [0, 0, 0],
	blanchedalmond: [255, 235, 205],
	blue: [0, 0, 255],
	blueviolet: [138, 43, 226],
	brown: [165, 42, 42],
	burlywood: [222, 184, 135],
	cadetblue: [95, 158, 160],
	chartreuse: [127, 255, 0],
	chocolate: [210, 105, 30],
	coral: [255, 127, 80],
	cornflowerblue: [100, 149, 237],
	cornsilk: [255, 248, 220],
	crimson: [220, 20, 60],
	cyan: [0, 255, 255],
	darkblue: [0, 0, 139],
	darkcyan: [0, 139, 139],
	darkgoldenrod: [184, 134, 11],
	darkgray: [169, 169, 169],
	darkgreen: [0, 100, 0],
	darkgrey: [169, 169, 169],
	darkkhaki: [189, 183, 107],
	darkmagenta: [139, 0, 139],
	darkolivegreen: [85, 107, 47],
	darkorange: [255, 140, 0],
	darkorchid: [153, 50, 204],
	darkred: [139, 0, 0],
	darksalmon: [233, 150, 122],
	darkseagreen: [143, 188, 143],
	darkslateblue: [72, 61, 139],
	darkslategray: [47, 79, 79],
	darkslategrey: [47, 79, 79],
	darkturquoise: [0, 206, 209],
	darkviolet: [148, 0, 211],
	deeppink: [255, 20, 147],
	deepskyblue: [0, 191, 255],
	dimgray: [105, 105, 105],
	dimgrey: [105, 105, 105],
	dodgerblue: [30, 144, 255],
	firebrick: [178, 34, 34],
	floralwhite: [255, 250, 240],
	forestgreen: [34, 139, 34],
	fuchsia: [255, 0, 255],
	gainsboro: [220, 220, 220],
	ghostwhite: [248, 248, 255],
	gold: [255, 215, 0],
	goldenrod: [218, 165, 32],
	gray: [128, 128, 128],
	green: [0, 128, 0],
	greenyellow: [173, 255, 47],
	grey: [128, 128, 128],
	honeydew: [240, 255, 240],
	hotpink: [255, 105, 180],
	indianred: [205, 92, 92],
	indigo: [75, 0, 130],
	ivory: [255, 255, 240],
	khaki: [240, 230, 140],
	lavender: [230, 230, 250],
	lavenderblush: [255, 240, 245],
	lawngreen: [124, 252, 0],
	lemonchiffon: [255, 250, 205],
	lightblue: [173, 216, 230],
	lightcoral: [240, 128, 128],
	lightcyan: [224, 255, 255],
	lightgoldenrodyellow: [250, 250, 210],
	lightgray: [211, 211, 211],
	lightgreen: [144, 238, 144],
	lightgrey: [211, 211, 211],
	lightpink: [255, 182, 193],
	lightsalmon: [255, 160, 122],
	lightseagreen: [32, 178, 170],
	lightskyblue: [135, 206, 250],
	lightslategray: [119, 136, 153],
	lightslategrey: [119, 136, 153],
	lightsteelblue: [176, 196, 222],
	lightyellow: [255, 255, 224],
	lime: [0, 255, 0],
	limegreen: [50, 205, 50],
	linen: [250, 240, 230],
	magenta: [255, 0, 255],
	maroon: [128, 0, 0],
	mediumaquamarine: [102, 205, 170],
	mediumblue: [0, 0, 205],
	mediumorchid: [186, 85, 211],
	mediumpurple: [147, 112, 219],
	mediumseagreen: [60, 179, 113],
	mediumslateblue: [123, 104, 238],
	mediumspringgreen: [0, 250, 154],
	mediumturquoise: [72, 209, 204],
	mediumvioletred: [199, 21, 133],
	midnightblue: [25, 25, 112],
	mintcream: [245, 255, 250],
	mistyrose: [255, 228, 225],
	moccasin: [255, 228, 181],
	navajowhite: [255, 222, 173],
	navy: [0, 0, 128],
	oldlace: [253, 245, 230],
	olive: [128, 128, 0],
	olivedrab: [107, 142, 35],
	orange: [255, 165, 0],
	orangered: [255, 69, 0],
	orchid: [218, 112, 214],
	palegoldenrod: [238, 232, 170],
	palegreen: [152, 251, 152],
	paleturquoise: [175, 238, 238],
	palevioletred: [219, 112, 147],
	papayawhip: [255, 239, 213],
	peachpuff: [255, 218, 185],
	peru: [205, 133, 63],
	pink: [255, 192, 203],
	plum: [221, 160, 221],
	powderblue: [176, 224, 230],
	purple: [128, 0, 128],
	rebeccapurple: [102, 51, 153],
	red: [255, 0, 0],
	rosybrown: [188, 143, 143],
	royalblue: [65, 105, 225],
	saddlebrown: [139, 69, 19],
	salmon: [250, 128, 114],
	sandybrown: [244, 164, 96],
	seagreen: [46, 139, 87],
	seashell: [255, 245, 238],
	sienna: [160, 82, 45],
	silver: [192, 192, 192],
	skyblue: [135, 206, 235],
	slateblue: [106, 90, 205],
	slategray: [112, 128, 144],
	slategrey: [112, 128, 144],
	snow: [255, 250, 250],
	springgreen: [0, 255, 127],
	steelblue: [70, 130, 180],
	tan: [210, 180, 140],
	teal: [0, 128, 128],
	thistle: [216, 191, 216],
	tomato: [255, 99, 71],
	turquoise: [64, 224, 208],
	violet: [238, 130, 238],
	wheat: [245, 222, 179],
	white: [255, 255, 255],
	whitesmoke: [245, 245, 245],
	yellow: [255, 255, 0],
	yellowgreen: [154, 205, 50]
};
var Ey = zy;
const Ty = {
	exports: {}
};
var Ry = Ty,
	jy = function(e) {
		return !(!e || "string" == typeof e) && (e instanceof Array || Array.isArray(e) || e.length >= 0 && (e.splice instanceof Function || Object.getOwnPropertyDescriptor(e, e.length - 1) && "String" !== e.constructor.name))
	},
	My = Array.prototype.concat,
	Ay = Array.prototype.slice,
	Fy = Ry.exports = function(e) {
		for (var t = [], n = 0, o = e.length; n < o; n++) {
			var r = e[n];
			jy(r) ? t = My.call(t, Ay.call(r)) : t.push(r)
		}
		return t
	};
Fy.wrap = function(e) {
	return function() {
		return e(Fy(arguments))
	}
};
var By = Ry.exports,
	Ly = Ey,
	Iy = By,
	Hy = Object.hasOwnProperty,
	Dy = Object.create(null);
for (var Ny in Ly) Hy.call(Ly, Ny) && (Dy[Ly[Ny]] = Ny);
const Wy = {
	to: {},
	get: {}
};
var $y = Oy.exports = Wy;

function Vy(e, t, n) {
	return Math.min(Math.max(t, e), n)
}

function qy(e) {
	var t = Math.round(e)
		.toString(16)
		.toUpperCase();
	return t.length < 2 ? "0" + t : t
}
$y.get = function(e) {
	var t, n;
	switch (e.substring(0, 3)
		.toLowerCase()) {
		case "hsl":
			t = $y.get.hsl(e), n = "hsl";
			break;
		case "hwb":
			t = $y.get.hwb(e), n = "hwb";
			break;
		default:
			t = $y.get.rgb(e), n = "rgb"
	}
	if (!t) return null;
	const o = {};
	return o.model = n, o.value = t, o
}, $y.get.rgb = function(e) {
	if (!e) return null;
	var t, n, o, r = [0, 0, 0, 1];
	if (t = e.match(/^#([a-f0-9]{6})([a-f0-9]{2})?$/i)) {
		for (o = t[2], t = t[1], n = 0; n < 3; n++) {
			var i = 2 * n;
			r[n] = parseInt(t.slice(i, i + 2), 16)
		}
		o && (r[3] = parseInt(o, 16) / 255)
	} else if (t = e.match(/^#([a-f0-9]{3,4})$/i)) {
		for (o = (t = t[1])[3], n = 0; n < 3; n++) r[n] = parseInt(t[n] + t[n], 16);
		o && (r[3] = parseInt(o + o, 16) / 255)
	} else if (t = e.match(/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/)) {
		for (n = 0; n < 3; n++) r[n] = parseInt(t[n + 1], 0);
		t[4] && (t[5] ? r[3] = .01 * parseFloat(t[4]) : r[3] = parseFloat(t[4]))
	} else {
		if (!(t = e.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/))) return (t = e.match(/^(\w+)$/)) ? "transparent" === t[1] ? [0, 0, 0, 0] : Hy.call(Ly, t[1]) ? ((r = Ly[t[1]])[3] = 1, r) : null : null;
		for (n = 0; n < 3; n++) r[n] = Math.round(2.55 * parseFloat(t[n + 1]));
		t[4] && (t[5] ? r[3] = .01 * parseFloat(t[4]) : r[3] = parseFloat(t[4]))
	}
	for (n = 0; n < 3; n++) r[n] = Vy(r[n], 0, 255);
	return r[3] = Vy(r[3], 0, 1), r
}, $y.get.hsl = function(e) {
	if (!e) return null;
	var t = e.match(/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);
	if (t) {
		var n = parseFloat(t[4]);
		return [(parseFloat(t[1]) % 360 + 360) % 360, Vy(parseFloat(t[2]), 0, 100), Vy(parseFloat(t[3]), 0, 100), Vy(isNaN(n) ? 1 : n, 0, 1)]
	}
	return null
}, $y.get.hwb = function(e) {
	if (!e) return null;
	var t = e.match(/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);
	if (t) {
		var n = parseFloat(t[4]);
		return [(parseFloat(t[1]) % 360 + 360) % 360, Vy(parseFloat(t[2]), 0, 100), Vy(parseFloat(t[3]), 0, 100), Vy(isNaN(n) ? 1 : n, 0, 1)]
	}
	return null
}, $y.to.hex = function() {
	var e = Iy(arguments);
	return "#" + qy(e[0]) + qy(e[1]) + qy(e[2]) + (e[3] < 1 ? qy(Math.round(255 * e[3])) : "")
}, $y.to.rgb = function() {
	var e = Iy(arguments);
	return e.length < 4 || 1 === e[3] ? "rgb(" + Math.round(e[0]) + ", " + Math.round(e[1]) + ", " + Math.round(e[2]) + ")" : "rgba(" + Math.round(e[0]) + ", " + Math.round(e[1]) + ", " + Math.round(e[2]) + ", " + e[3] + ")"
}, $y.to.rgb.percent = function() {
	var e = Iy(arguments),
		t = Math.round(e[0] / 255 * 100),
		n = Math.round(e[1] / 255 * 100),
		o = Math.round(e[2] / 255 * 100);
	return e.length < 4 || 1 === e[3] ? "rgb(" + t + "%, " + n + "%, " + o + "%)" : "rgba(" + t + "%, " + n + "%, " + o + "%, " + e[3] + ")"
}, $y.to.hsl = function() {
	var e = Iy(arguments);
	return e.length < 4 || 1 === e[3] ? "hsl(" + e[0] + ", " + e[1] + "%, " + e[2] + "%)" : "hsla(" + e[0] + ", " + e[1] + "%, " + e[2] + "%, " + e[3] + ")"
}, $y.to.hwb = function() {
	var e = Iy(arguments),
		t = "";
	return e.length >= 4 && 1 !== e[3] && (t = ", " + e[3]), "hwb(" + e[0] + ", " + e[1] + "%, " + e[2] + "%" + t + ")"
}, $y.to.keyword = function(e) {
	return Dy[e.slice(0, 3)]
};
var Uy = Oy.exports;
const Gy = Ey,
	Xy = {};
for (const Dw of Object.keys(Gy)) Xy[Gy[Dw]] = Dw;
const Zy = {
		channels: 3,
		labels: "rgb"
	},
	Ky = {
		channels: 3,
		labels: "hsl"
	},
	Yy = {
		channels: 3,
		labels: "hsv"
	},
	Qy = {
		channels: 3,
		labels: "hwb"
	},
	Jy = {
		channels: 4,
		labels: "cmyk"
	},
	ex = {
		channels: 3,
		labels: "xyz"
	},
	tx = {
		channels: 3,
		labels: "lab"
	},
	nx = {
		channels: 3,
		labels: "lch"
	},
	ox = {
		channels: 1,
		labels: ["hex"]
	},
	rx = {
		channels: 1,
		labels: ["keyword"]
	},
	ix = {
		channels: 1,
		labels: ["ansi16"]
	},
	sx = {
		channels: 1,
		labels: ["ansi256"]
	},
	lx = {
		channels: 3,
		labels: ["h", "c", "g"]
	},
	ax = {
		channels: 3,
		labels: ["r16", "g16", "b16"]
	},
	cx = {
		channels: 1,
		labels: ["gray"]
	},
	ux = {};
ux.rgb = Zy, ux.hsl = Ky, ux.hsv = Yy, ux.hwb = Qy, ux.cmyk = Jy, ux.xyz = ex, ux.lab = tx, ux.lch = nx, ux.hex = ox, ux.keyword = rx, ux.ansi16 = ix, ux.ansi256 = sx, ux.hcg = lx, ux.apple = ax, ux.gray = cx;
const dx = ux;
var fx = dx;
for (const Dw of Object.keys(dx)) {
	if (!("channels" in dx[Dw])) throw new Error("missing channels property: " + Dw);
	if (!("labels" in dx[Dw])) throw new Error("missing channel labels property: " + Dw);
	if (dx[Dw].labels.length !== dx[Dw].channels) throw new Error("channel and label counts mismatch: " + Dw);
	const {
		channels: e,
		labels: t
	} = dx[Dw];
	delete dx[Dw].channels, delete dx[Dw].labels;
	const n = {};
	n.value = e, Object.defineProperty(dx[Dw], "channels", n);
	const o = {};
	o.value = t, Object.defineProperty(dx[Dw], "labels", o)
}
dx.rgb.hsl = function(e) {
	const t = e[0] / 255,
		n = e[1] / 255,
		o = e[2] / 255,
		r = Math.min(t, n, o),
		i = Math.max(t, n, o),
		s = i - r;
	let l, a;
	i === r ? l = 0 : t === i ? l = (n - o) / s : n === i ? l = 2 + (o - t) / s : o === i && (l = 4 + (t - n) / s), l = Math.min(60 * l, 360), l < 0 && (l += 360);
	const c = (r + i) / 2;
	return a = i === r ? 0 : c <= .5 ? s / (i + r) : s / (2 - i - r), [l, 100 * a, 100 * c]
}, dx.rgb.hsv = function(e) {
	let t, n, o, r, i;
	const s = e[0] / 255,
		l = e[1] / 255,
		a = e[2] / 255,
		c = Math.max(s, l, a),
		u = c - Math.min(s, l, a),
		d = function(e) {
			return (c - e) / 6 / u + .5
		};
	return 0 === u ? (r = 0, i = 0) : (i = u / c, t = d(s), n = d(l), o = d(a), s === c ? r = o - n : l === c ? r = 1 / 3 + t - o : a === c && (r = 2 / 3 + n - t), r < 0 ? r += 1 : r > 1 && (r -= 1)), [360 * r, 100 * i, 100 * c]
}, dx.rgb.hwb = function(e) {
	const t = e[0],
		n = e[1];
	let o = e[2];
	const r = dx.rgb.hsl(e)[0],
		i = 1 / 255 * Math.min(t, Math.min(n, o));
	return o = 1 - 1 / 255 * Math.max(t, Math.max(n, o)), [r, 100 * i, 100 * o]
}, dx.rgb.cmyk = function(e) {
	const t = e[0] / 255,
		n = e[1] / 255,
		o = e[2] / 255,
		r = Math.min(1 - t, 1 - n, 1 - o);
	return [100 * ((1 - t - r) / (1 - r) || 0), 100 * ((1 - n - r) / (1 - r) || 0), 100 * ((1 - o - r) / (1 - r) || 0), 100 * r]
}, dx.rgb.keyword = function(e) {
	const t = Xy[e];
	if (t) return t;
	let n, o = 1 / 0;
	for (const s of Object.keys(Gy)) {
		const t = Gy[s],
			l = (i = t, ((r = e)[0] - i[0]) ** 2 + (r[1] - i[1]) ** 2 + (r[2] - i[2]) ** 2);
		l < o && (o = l, n = s)
	}
	var r, i;
	return n
}, dx.keyword.rgb = function(e) {
	return Gy[e]
}, dx.rgb.xyz = function(e) {
	let t = e[0] / 255,
		n = e[1] / 255,
		o = e[2] / 255;
	t = t > .04045 ? ((t + .055) / 1.055) ** 2.4 : t / 12.92, n = n > .04045 ? ((n + .055) / 1.055) ** 2.4 : n / 12.92, o = o > .04045 ? ((o + .055) / 1.055) ** 2.4 : o / 12.92;
	return [100 * (.4124 * t + .3576 * n + .1805 * o), 100 * (.2126 * t + .7152 * n + .0722 * o), 100 * (.0193 * t + .1192 * n + .9505 * o)]
}, dx.rgb.lab = function(e) {
	const t = dx.rgb.xyz(e);
	let n = t[0],
		o = t[1],
		r = t[2];
	n /= 95.047, o /= 100, r /= 108.883, n = n > .008856 ? n ** (1 / 3) : 7.787 * n + 16 / 116, o = o > .008856 ? o ** (1 / 3) : 7.787 * o + 16 / 116, r = r > .008856 ? r ** (1 / 3) : 7.787 * r + 16 / 116;
	return [116 * o - 16, 500 * (n - o), 200 * (o - r)]
}, dx.hsl.rgb = function(e) {
	const t = e[0] / 360,
		n = e[1] / 100,
		o = e[2] / 100;
	let r, i, s;
	if (0 === n) return s = 255 * o, [s, s, s];
	r = o < .5 ? o * (1 + n) : o + n - o * n;
	const l = 2 * o - r,
		a = [0, 0, 0];
	for (let c = 0; c < 3; c++) i = t + 1 / 3 * -(c - 1), i < 0 && i++, i > 1 && i--, s = 6 * i < 1 ? l + 6 * (r - l) * i : 2 * i < 1 ? r : 3 * i < 2 ? l + (r - l) * (2 / 3 - i) * 6 : l, a[c] = 255 * s;
	return a
}, dx.hsl.hsv = function(e) {
	const t = e[0];
	let n = e[1] / 100,
		o = e[2] / 100,
		r = n;
	const i = Math.max(o, .01);
	o *= 2, n *= o <= 1 ? o : 2 - o, r *= i <= 1 ? i : 2 - i;
	return [t, 100 * (0 === o ? 2 * r / (i + r) : 2 * n / (o + n)), 100 * ((o + n) / 2)]
}, dx.hsv.rgb = function(e) {
	const t = e[0] / 60,
		n = e[1] / 100;
	let o = e[2] / 100;
	const r = Math.floor(t) % 6,
		i = t - Math.floor(t),
		s = 255 * o * (1 - n),
		l = 255 * o * (1 - n * i),
		a = 255 * o * (1 - n * (1 - i));
	switch (o *= 255, r) {
		case 0:
			return [o, a, s];
		case 1:
			return [l, o, s];
		case 2:
			return [s, o, a];
		case 3:
			return [s, l, o];
		case 4:
			return [a, s, o];
		case 5:
			return [o, s, l]
	}
}, dx.hsv.hsl = function(e) {
	const t = e[0],
		n = e[1] / 100,
		o = e[2] / 100,
		r = Math.max(o, .01);
	let i, s;
	s = (2 - n) * o;
	const l = (2 - n) * r;
	return i = n * r, i /= l <= 1 ? l : 2 - l, i = i || 0, s /= 2, [t, 100 * i, 100 * s]
}, dx.hwb.rgb = function(e) {
	const t = e[0] / 360;
	let n = e[1] / 100,
		o = e[2] / 100;
	const r = n + o;
	let i;
	r > 1 && (n /= r, o /= r);
	const s = Math.floor(6 * t),
		l = 1 - o;
	i = 6 * t - s, 0 != (1 & s) && (i = 1 - i);
	const a = n + i * (l - n);
	let c, u, d;
	switch (s) {
		default:
		case 6:
		case 0:
			c = l, u = a, d = n;
			break;
		case 1:
			c = a, u = l, d = n;
			break;
		case 2:
			c = n, u = l, d = a;
			break;
		case 3:
			c = n, u = a, d = l;
			break;
		case 4:
			c = a, u = n, d = l;
			break;
		case 5:
			c = l, u = n, d = a
	}
	return [255 * c, 255 * u, 255 * d]
}, dx.cmyk.rgb = function(e) {
	const t = e[0] / 100,
		n = e[1] / 100,
		o = e[2] / 100,
		r = e[3] / 100;
	return [255 * (1 - Math.min(1, t * (1 - r) + r)), 255 * (1 - Math.min(1, n * (1 - r) + r)), 255 * (1 - Math.min(1, o * (1 - r) + r))]
}, dx.xyz.rgb = function(e) {
	const t = e[0] / 100,
		n = e[1] / 100,
		o = e[2] / 100;
	let r, i, s;
	return r = 3.2406 * t + -1.5372 * n + -.4986 * o, i = -.9689 * t + 1.8758 * n + .0415 * o, s = .0557 * t + -.204 * n + 1.057 * o, r = r > .0031308 ? 1.055 * r ** (1 / 2.4) - .055 : 12.92 * r, i = i > .0031308 ? 1.055 * i ** (1 / 2.4) - .055 : 12.92 * i, s = s > .0031308 ? 1.055 * s ** (1 / 2.4) - .055 : 12.92 * s, r = Math.min(Math.max(0, r), 1), i = Math.min(Math.max(0, i), 1), s = Math.min(Math.max(0, s), 1), [255 * r, 255 * i, 255 * s]
}, dx.xyz.lab = function(e) {
	let t = e[0],
		n = e[1],
		o = e[2];
	t /= 95.047, n /= 100, o /= 108.883, t = t > .008856 ? t ** (1 / 3) : 7.787 * t + 16 / 116, n = n > .008856 ? n ** (1 / 3) : 7.787 * n + 16 / 116, o = o > .008856 ? o ** (1 / 3) : 7.787 * o + 16 / 116;
	return [116 * n - 16, 500 * (t - n), 200 * (n - o)]
}, dx.lab.xyz = function(e) {
	let t, n, o;
	n = (e[0] + 16) / 116, t = e[1] / 500 + n, o = n - e[2] / 200;
	const r = n ** 3,
		i = t ** 3,
		s = o ** 3;
	return n = r > .008856 ? r : (n - 16 / 116) / 7.787, t = i > .008856 ? i : (t - 16 / 116) / 7.787, o = s > .008856 ? s : (o - 16 / 116) / 7.787, t *= 95.047, n *= 100, o *= 108.883, [t, n, o]
}, dx.lab.lch = function(e) {
	const t = e[0],
		n = e[1],
		o = e[2];
	let r;
	r = 360 * Math.atan2(o, n) / 2 / Math.PI, r < 0 && (r += 360);
	return [t, Math.sqrt(n * n + o * o), r]
}, dx.lch.lab = function(e) {
	const t = e[0],
		n = e[1],
		o = e[2] / 360 * 2 * Math.PI;
	return [t, n * Math.cos(o), n * Math.sin(o)]
}, dx.rgb.ansi16 = function(e, t = null) {
	const [n, o, r] = e;
	let i = null === t ? dx.rgb.hsv(e)[2] : t;
	if (i = Math.round(i / 50), 0 === i) return 30;
	let s = 30 + (Math.round(r / 255) << 2 | Math.round(o / 255) << 1 | Math.round(n / 255));
	return 2 === i && (s += 60), s
}, dx.hsv.ansi16 = function(e) {
	return dx.rgb.ansi16(dx.hsv.rgb(e), e[2])
}, dx.rgb.ansi256 = function(e) {
	const t = e[0],
		n = e[1],
		o = e[2];
	if (t === n && n === o) return t < 8 ? 16 : t > 248 ? 231 : Math.round((t - 8) / 247 * 24) + 232;
	return 16 + 36 * Math.round(t / 255 * 5) + 6 * Math.round(n / 255 * 5) + Math.round(o / 255 * 5)
}, dx.ansi16.rgb = function(e) {
	let t = e % 10;
	if (0 === t || 7 === t) return e > 50 && (t += 3.5), t = t / 10.5 * 255, [t, t, t];
	const n = .5 * (1 + ~~(e > 50));
	return [(1 & t) * n * 255, (t >> 1 & 1) * n * 255, (t >> 2 & 1) * n * 255]
}, dx.ansi256.rgb = function(e) {
	if (e >= 232) {
		const t = 10 * (e - 232) + 8;
		return [t, t, t]
	}
	let t;
	e -= 16;
	return [Math.floor(e / 36) / 5 * 255, Math.floor((t = e % 36) / 6) / 5 * 255, t % 6 / 5 * 255]
}, dx.rgb.hex = function(e) {
	const t = (((255 & Math.round(e[0])) << 16) + ((255 & Math.round(e[1])) << 8) + (255 & Math.round(e[2])))
		.toString(16)
		.toUpperCase();
	return "000000".substring(t.length) + t
}, dx.hex.rgb = function(e) {
	const t = e.toString(16)
		.match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!t) return [0, 0, 0];
	let n = t[0];
	3 === t[0].length && (n = n.split("")
		.map((e => e + e))
		.join(""));
	const o = parseInt(n, 16);
	return [o >> 16 & 255, o >> 8 & 255, 255 & o]
}, dx.rgb.hcg = function(e) {
	const t = e[0] / 255,
		n = e[1] / 255,
		o = e[2] / 255,
		r = Math.max(Math.max(t, n), o),
		i = Math.min(Math.min(t, n), o),
		s = r - i;
	let l, a;
	return l = s < 1 ? i / (1 - s) : 0, a = s <= 0 ? 0 : r === t ? (n - o) / s % 6 : r === n ? 2 + (o - t) / s : 4 + (t - n) / s, a /= 6, a %= 1, [360 * a, 100 * s, 100 * l]
}, dx.hsl.hcg = function(e) {
	const t = e[1] / 100,
		n = e[2] / 100,
		o = n < .5 ? 2 * t * n : 2 * t * (1 - n);
	let r = 0;
	return o < 1 && (r = (n - .5 * o) / (1 - o)), [e[0], 100 * o, 100 * r]
}, dx.hsv.hcg = function(e) {
	const t = e[1] / 100,
		n = e[2] / 100,
		o = t * n;
	let r = 0;
	return o < 1 && (r = (n - o) / (1 - o)), [e[0], 100 * o, 100 * r]
}, dx.hcg.rgb = function(e) {
	const t = e[0] / 360,
		n = e[1] / 100,
		o = e[2] / 100;
	if (0 === n) return [255 * o, 255 * o, 255 * o];
	const r = [0, 0, 0],
		i = t % 1 * 6,
		s = i % 1,
		l = 1 - s;
	let a = 0;
	switch (Math.floor(i)) {
		case 0:
			r[0] = 1, r[1] = s, r[2] = 0;
			break;
		case 1:
			r[0] = l, r[1] = 1, r[2] = 0;
			break;
		case 2:
			r[0] = 0, r[1] = 1, r[2] = s;
			break;
		case 3:
			r[0] = 0, r[1] = l, r[2] = 1;
			break;
		case 4:
			r[0] = s, r[1] = 0, r[2] = 1;
			break;
		default:
			r[0] = 1, r[1] = 0, r[2] = l
	}
	return a = (1 - n) * o, [255 * (n * r[0] + a), 255 * (n * r[1] + a), 255 * (n * r[2] + a)]
}, dx.hcg.hsv = function(e) {
	const t = e[1] / 100,
		n = t + e[2] / 100 * (1 - t);
	let o = 0;
	return n > 0 && (o = t / n), [e[0], 100 * o, 100 * n]
}, dx.hcg.hsl = function(e) {
	const t = e[1] / 100,
		n = e[2] / 100 * (1 - t) + .5 * t;
	let o = 0;
	return n > 0 && n < .5 ? o = t / (2 * n) : n >= .5 && n < 1 && (o = t / (2 * (1 - n))), [e[0], 100 * o, 100 * n]
}, dx.hcg.hwb = function(e) {
	const t = e[1] / 100,
		n = t + e[2] / 100 * (1 - t);
	return [e[0], 100 * (n - t), 100 * (1 - n)]
}, dx.hwb.hcg = function(e) {
	const t = e[1] / 100,
		n = 1 - e[2] / 100,
		o = n - t;
	let r = 0;
	return o < 1 && (r = (n - o) / (1 - o)), [e[0], 100 * o, 100 * r]
}, dx.apple.rgb = function(e) {
	return [e[0] / 65535 * 255, e[1] / 65535 * 255, e[2] / 65535 * 255]
}, dx.rgb.apple = function(e) {
	return [e[0] / 255 * 65535, e[1] / 255 * 65535, e[2] / 255 * 65535]
}, dx.gray.rgb = function(e) {
	return [e[0] / 100 * 255, e[0] / 100 * 255, e[0] / 100 * 255]
}, dx.gray.hsl = function(e) {
	return [0, 0, e[0]]
}, dx.gray.hsv = dx.gray.hsl, dx.gray.hwb = function(e) {
	return [0, 100, e[0]]
}, dx.gray.cmyk = function(e) {
	return [0, 0, 0, e[0]]
}, dx.gray.lab = function(e) {
	return [e[0], 0, 0]
}, dx.gray.hex = function(e) {
	const t = 255 & Math.round(e[0] / 100 * 255),
		n = ((t << 16) + (t << 8) + t)
		.toString(16)
		.toUpperCase();
	return "000000".substring(n.length) + n
}, dx.rgb.gray = function(e) {
	return [(e[0] + e[1] + e[2]) / 3 / 255 * 100]
};
const px = fx;

function hx(e) {
	const t = function() {
			const e = {},
				t = Object.keys(px);
			for (let n = t.length, o = 0; o < n; o++) {
				const n = {
					distance: -1,
					parent: null
				};
				e[t[o]] = n
			}
			return e
		}(),
		n = [e];
	for (t[e].distance = 0; n.length;) {
		const e = n.pop(),
			o = Object.keys(px[e]);
		for (let r = o.length, i = 0; i < r; i++) {
			const r = o[i],
				s = t[r]; - 1 === s.distance && (s.distance = t[e].distance + 1, s.parent = e, n.unshift(r))
		}
	}
	return t
}

function vx(e, t) {
	return function(n) {
		return t(e(n))
	}
}

function gx(e, t) {
	const n = [t[e].parent, e];
	let o = px[t[e].parent][e],
		r = t[e].parent;
	for (; t[r].parent;) n.unshift(t[r].parent), o = vx(px[t[r].parent][r], o), r = t[r].parent;
	return o.conversion = n, o
}
const mx = fx,
	bx = function(e) {
		const t = hx(e),
			n = {},
			o = Object.keys(t);
		for (let r = o.length, i = 0; i < r; i++) {
			const e = o[i];
			null !== t[e].parent && (n[e] = gx(e, t))
		}
		return n
	},
	yx = {};
Object.keys(mx)
	.forEach((e => {
		yx[e] = {}, Object.defineProperty(yx[e], "channels", {
			value: mx[e].channels
		}), Object.defineProperty(yx[e], "labels", {
			value: mx[e].labels
		});
		const t = bx(e);
		Object.keys(t)
			.forEach((n => {
				const o = t[n];
				yx[e][n] = function(e) {
					const t = function(...t) {
						const n = t[0];
						if (null == n) return n;
						n.length > 1 && (t = n);
						const o = e(t);
						if ("object" == typeof o)
							for (let e = o.length, r = 0; r < e; r++) o[r] = Math.round(o[r]);
						return o
					};
					return "conversion" in e && (t.conversion = e.conversion), t
				}(o), yx[e][n].raw = function(e) {
					const t = function(...t) {
						const n = t[0];
						return null == n ? n : (n.length > 1 && (t = n), e(t))
					};
					return "conversion" in e && (t.conversion = e.conversion), t
				}(o)
			}))
	}));
const xx = Uy,
	Cx = yx,
	wx = ["keyword", "gray", "hex"],
	Sx = {};
for (const Dw of Object.keys(Cx)) Sx[[...Cx[Dw].labels].sort()
	.join("")] = Dw;
const kx = {};

function _x(e, t) {
	if (!(this instanceof _x)) return new _x(e, t);
	if (t && t in wx && (t = null), t && !(t in Cx)) throw new Error("Unknown model: " + t);
	let n, o;
	if (null == e) this.model = "rgb", this.color = [0, 0, 0], this.valpha = 1;
	else if (e instanceof _x) this.model = e.model, this.color = [...e.color], this.valpha = e.valpha;
	else if ("string" == typeof e) {
		const t = xx.get(e);
		if (null === t) throw new Error("Unable to parse color from string: " + e);
		this.model = t.model, o = Cx[this.model].channels, this.color = t.value.slice(0, o), this.valpha = "number" == typeof t.value[o] ? t.value[o] : 1
	} else if (e.length > 0) {
		this.model = t || "rgb", o = Cx[this.model].channels;
		const n = Array.prototype.slice.call(e, 0, o);
		this.color = zx(n, o), this.valpha = "number" == typeof e[o] ? e[o] : 1
	} else if ("number" == typeof e) this.model = "rgb", this.color = [e >> 16 & 255, e >> 8 & 255, 255 & e], this.valpha = 1;
	else {
		this.valpha = 1;
		const t = Object.keys(e);
		"alpha" in e && (t.splice(t.indexOf("alpha"), 1), this.valpha = "number" == typeof e.alpha ? e.alpha : 0);
		const o = t.sort()
			.join("");
		if (!(o in Sx)) throw new Error("Unable to parse color from object: " + JSON.stringify(e));
		this.model = Sx[o];
		const {
			labels: r
		} = Cx[this.model], i = [];
		for (n = 0; n < r.length; n++) i.push(e[r[n]]);
		this.color = zx(i)
	}
	if (kx[this.model])
		for (o = Cx[this.model].channels, n = 0; n < o; n++) {
			const e = kx[this.model][n];
			e && (this.color[n] = e(this.color[n]))
		}
	this.valpha = Math.max(0, Math.min(1, this.valpha)), Object.freeze && Object.freeze(this)
}
_x.prototype = {
	toString() {
		return this.string()
	},
	toJSON() {
		return this[this.model]()
	},
	string(e) {
		let t = this.model in xx.to ? this : this.rgb();
		t = t.round("number" == typeof e ? e : 1);
		const n = 1 === t.valpha ? t.color : [...t.color, this.valpha];
		return xx.to[t.model](n)
	},
	percentString(e) {
		const t = this.rgb()
			.round("number" == typeof e ? e : 1),
			n = 1 === t.valpha ? t.color : [...t.color, this.valpha];
		return xx.to.rgb.percent(n)
	},
	array() {
		return 1 === this.valpha ? [...this.color] : [...this.color, this.valpha]
	},
	object() {
		const e = {},
			{
				channels: t
			} = Cx[this.model],
			{
				labels: n
			} = Cx[this.model];
		for (let o = 0; o < t; o++) e[n[o]] = this.color[o];
		return 1 !== this.valpha && (e.alpha = this.valpha), e
	},
	unitArray() {
		const e = this.rgb()
			.color;
		return e[0] /= 255, e[1] /= 255, e[2] /= 255, 1 !== this.valpha && e.push(this.valpha), e
	},
	unitObject() {
		const e = this.rgb()
			.object();
		return e.r /= 255, e.g /= 255, e.b /= 255, 1 !== this.valpha && (e.alpha = this.valpha), e
	},
	round(e) {
		return e = Math.max(e || 0, 0), new _x([...this.color.map((t = e, function(e) {
			return n = t, Number(e.toFixed(n));
			var n
		})), this.valpha], this.model);
		var t
	},
	alpha(e) {
		return void 0 !== e ? new _x([...this.color, Math.max(0, Math.min(1, e))], this.model) : this.valpha
	},
	red: Px("rgb", 0, Ox(255)),
	green: Px("rgb", 1, Ox(255)),
	blue: Px("rgb", 2, Ox(255)),
	hue: Px(["hsl", "hsv", "hsl", "hwb", "hcg"], 0, (e => (e % 360 + 360) % 360)),
	saturationl: Px("hsl", 1, Ox(100)),
	lightness: Px("hsl", 2, Ox(100)),
	saturationv: Px("hsv", 1, Ox(100)),
	value: Px("hsv", 2, Ox(100)),
	chroma: Px("hcg", 1, Ox(100)),
	gray: Px("hcg", 2, Ox(100)),
	white: Px("hwb", 1, Ox(100)),
	wblack: Px("hwb", 2, Ox(100)),
	cyan: Px("cmyk", 0, Ox(100)),
	magenta: Px("cmyk", 1, Ox(100)),
	yellow: Px("cmyk", 2, Ox(100)),
	black: Px("cmyk", 3, Ox(100)),
	x: Px("xyz", 0, Ox(95.047)),
	y: Px("xyz", 1, Ox(100)),
	z: Px("xyz", 2, Ox(108.833)),
	l: Px("lab", 0, Ox(100)),
	a: Px("lab", 1),
	b: Px("lab", 2),
	keyword(e) {
		return void 0 !== e ? new _x(e) : Cx[this.model].keyword(this.color)
	},
	hex(e) {
		return void 0 !== e ? new _x(e) : xx.to.hex(this.rgb()
			.round()
			.color)
	},
	hexa(e) {
		if (void 0 !== e) return new _x(e);
		const t = this.rgb()
			.round()
			.color;
		let n = Math.round(255 * this.valpha)
			.toString(16)
			.toUpperCase();
		return 1 === n.length && (n = "0" + n), xx.to.hex(t) + n
	},
	rgbNumber() {
		const e = this.rgb()
			.color;
		return (255 & e[0]) << 16 | (255 & e[1]) << 8 | 255 & e[2]
	},
	luminosity() {
		const e = this.rgb()
			.color,
			t = [];
		for (const [n, o] of e.entries()) {
			const e = o / 255;
			t[n] = e <= .04045 ? e / 12.92 : ((e + .055) / 1.055) ** 2.4
		}
		return .2126 * t[0] + .7152 * t[1] + .0722 * t[2]
	},
	contrast(e) {
		const t = this.luminosity(),
			n = e.luminosity();
		return t > n ? (t + .05) / (n + .05) : (n + .05) / (t + .05)
	},
	level(e) {
		const t = this.contrast(e);
		return t >= 7 ? "AAA" : t >= 4.5 ? "AA" : ""
	},
	isDark() {
		const e = this.rgb()
			.color;
		return (2126 * e[0] + 7152 * e[1] + 722 * e[2]) / 1e4 < 128
	},
	isLight() {
		return !this.isDark()
	},
	negate() {
		const e = this.rgb();
		for (let t = 0; t < 3; t++) e.color[t] = 255 - e.color[t];
		return e
	},
	lighten(e) {
		const t = this.hsl();
		return t.color[2] += t.color[2] * e, t
	},
	darken(e) {
		const t = this.hsl();
		return t.color[2] -= t.color[2] * e, t
	},
	saturate(e) {
		const t = this.hsl();
		return t.color[1] += t.color[1] * e, t
	},
	desaturate(e) {
		const t = this.hsl();
		return t.color[1] -= t.color[1] * e, t
	},
	whiten(e) {
		const t = this.hwb();
		return t.color[1] += t.color[1] * e, t
	},
	blacken(e) {
		const t = this.hwb();
		return t.color[2] += t.color[2] * e, t
	},
	grayscale() {
		const e = this.rgb()
			.color,
			t = .3 * e[0] + .59 * e[1] + .11 * e[2];
		return _x.rgb(t, t, t)
	},
	fade(e) {
		return this.alpha(this.valpha - this.valpha * e)
	},
	opaquer(e) {
		return this.alpha(this.valpha + this.valpha * e)
	},
	rotate(e) {
		const t = this.hsl();
		let n = t.color[0];
		return n = (n + e) % 360, n = n < 0 ? 360 + n : n, t.color[0] = n, t
	},
	mix(e, t) {
		if (!e || !e.rgb) throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof e);
		const n = e.rgb(),
			o = this.rgb(),
			r = void 0 === t ? .5 : t,
			i = 2 * r - 1,
			s = n.alpha() - o.alpha(),
			l = ((i * s == -1 ? i : (i + s) / (1 + i * s)) + 1) / 2,
			a = 1 - l;
		return _x.rgb(l * n.red() + a * o.red(), l * n.green() + a * o.green(), l * n.blue() + a * o.blue(), n.alpha() * r + o.alpha() * (1 - r))
	}
};
for (const Dw of Object.keys(Cx)) {
	if (wx.includes(Dw)) continue;
	const {
		channels: e
	} = Cx[Dw];
	_x.prototype[Dw] = function(...e) {
		return this.model === Dw ? new _x(this) : e.length > 0 ? new _x(e, Dw) : new _x([...(t = Cx[this.model][Dw].raw(this.color), Array.isArray(t) ? t : [t]), this.valpha], Dw);
		var t
	}, _x[Dw] = function(...t) {
		let n = t[0];
		return "number" == typeof n && (n = zx(t, e)), new _x(n, Dw)
	}
}

function Px(e, t, n) {
	e = Array.isArray(e) ? e : [e];
	for (const o of e)(kx[o] || (kx[o] = []))[t] = n;
	return e = e[0],
		function(o) {
			let r;
			return void 0 !== o ? (n && (o = n(o)), r = this[e](), r.color[t] = o, r) : (r = this[e]()
				.color[t], n && (r = n(r)), r)
		}
}

function Ox(e) {
	return function(t) {
		return Math.max(0, Math.min(e, t))
	}
}

function zx(e, t) {
	for (let n = 0; n < t; n++) "number" != typeof e[n] && (e[n] = 0);
	return e
}
const Ex = dm(_x),
	{
		text_color: Tx = "#000000",
		button_color: Rx = "#40a7e3",
		hint_color: jx = "#999999",
		bg_color: Mx = "#ffffff",
		button_text_color: Ax = "#ffffff",
		secondary_bg_color: Fx = "#f1f1f1"
	} = {},
	{
		colorScheme: Bx = "light"
	} = {},
	Lx = Ex.hsl(Mx)
	.darken(.4)
	.toString(),
	Ix = (() => {
		if (window.screen.width > 1e3) {
			const e = {};
			e.textColor1 = Tx, e.baseColor = Mx, e.primaryColor = Rx, e.primaryColorHover = jx, e.primaryColorPressed = jx, e.primaryColorSuppl = jx, e.popoverColor = Mx, e.modalColor = Mx, e.tableColor = Mx, e.cardColor = Mx, e.bodyColor = Mx, e.tagColor = Mx;
			const t = {};
			t.color = Rx, t.textColor = Ax, t.textColorPrimary = Ax, t.textColorText = Ax, t.textColorTextPrimary = Ax, t.border = "1px soild " + Rx, t.borderPressed = "1px soild " + Rx, t.textColorPressed = Ax, t.colorPressed = Rx, t.textColorFocus = Ax, t.colorFocus = Rx, t.colorHover = Rx, t.textColorHover = Ax, t.borderHover = "1px soild " + Rx;
			const n = {};
			n.boxShadow = "inset 0 0 0 1px " + Tx;
			const o = {
				border: "none"
			};
			o.color = Lx;
			const r = {};
			r.color = Fx, r.textColor = Tx, r.placeholderColor = jx, r.colorActive = Mx, r.borderHover = "1px soild " + Rx, r.border = "1px soild " + ("light" === Bx ? "#e6e6e6" : "#3a3939"), r.borderActive = "1px soild " + Rx, r.borderFocus = "1px soild " + Rx, r.peers = {}, r.peers.Popover = {}, r.peers.Popover.color = Mx;
			const i = {};
			i.color = Mx, i.optionTextColor = Tx, i.optionColorActive = Fx, i.optionTextColorActive = Tx, i.optionCheckColor = Rx, i.optionColorPending = Fx, i.optionColorActivePending = Fx;
			const s = {};
			s.InternalSelection = r, s.InternalSelectMenu = i;
			const l = {};
			l.peers = s;
			const a = {};
			a.textColor = Tx, a.textColorSuccess = Tx;
			const c = {};
			c.tdColor = Fx, c.tdTextColor = Ax;
			const u = {};
			u.tdColor = Mx, u.tdTextColor = Tx, u.thTextColor = Tx, u.thColor = Mx, u.borderColor = "light" === Bx ? "#e6e6e6" : "#3a3939";
			const d = {};
			return d.common = e, d.Button = t, d.Radio = n, d.Input = o, d.Select = l, d.Message = a, d.Table = c, d.DataTable = u, d
		} {
			const e = {};
			e.textColor1 = Tx, e.baseColor = Mx, e.primaryColor = Rx, e.primaryColorHover = jx, e.primaryColorPressed = jx, e.primaryColorSuppl = jx, e.popoverColor = Mx, e.modalColor = Mx, e.tableColor = Mx, e.cardColor = Mx, e.bodyColor = Mx, e.tagColor = Mx;
			const t = {};
			t.color = Rx, t.textColor = Ax, t.textColorPrimary = Ax, t.textColorText = Ax, t.textColorTextPrimary = Ax, t.border = "1px soild " + Rx, t.borderPressed = "1px soild " + Rx, t.textColorPressed = Ax, t.colorPressed = Rx, t.textColorFocus = Ax, t.colorFocus = Rx, t.colorHover = Rx, t.textColorHover = Ax, t.borderHover = "1px soild " + Rx;
			const n = {};
			n.boxShadow = "inset 0 0 0 1px " + Tx;
			const o = {
				border: "none"
			};
			o.color = Lx;
			const r = {};
			r.color = Fx, r.textColor = Tx, r.placeholderColor = jx, r.colorActive = Mx, r.borderHover = "1px soild " + Rx, r.border = "1px soild " + ("light" === Bx ? "#e6e6e6" : "#3a3939"), r.borderActive = "1px soild " + Rx, r.borderFocus = "1px soild " + Rx, r.peers = {}, r.peers.Popover = {}, r.peers.Popover.color = Mx;
			const i = {};
			i.color = Mx, i.optionTextColor = Tx, i.optionColorActive = Fx, i.optionTextColorActive = Tx, i.optionCheckColor = Rx, i.optionColorPending = Fx, i.optionColorActivePending = Fx;
			const s = {};
			s.InternalSelection = r, s.InternalSelectMenu = i;
			const l = {};
			l.peers = s;
			const a = {};
			a.textColor = Tx, a.textColorSuccess = Tx;
			const c = {};
			c.tdColor = Fx, c.tdTextColor = Ax, c.fontSizeSmall = "10px";
			const u = {
				fontSizeSmall: "10px",
				tdPaddingSmall: "4px",
				thPaddingSmall: "4px"
			};
			u.tdColor = Mx, u.tdTextColor = Tx, u.thTextColor = Tx, u.thColor = Mx, u.borderColor = "light" === Bx ? "#e6e6e6" : "#3a3939";
			const d = {};
			return d.common = e, d.Button = t, d.Radio = n, d.Input = o, d.Select = l, d.Message = a, d.Table = c, d.DataTable = u, d
		}
	})(),
	Hx = Rn({
		__name: "App",
		setup: e => (e, t) => {
			const n = so(oo, a = "router-view", !0, c) || a,
				o = Xb,
				r = cb,
				i = Cy,
				s = cm,
				l = {};
			var a, c;
			l.key = 0;
			const u = {
				key: 0
			};
			return ar(), pr(s, {
				locale: kt(Of),
				"date-locale": kt(hh),
				"inline-theme-disabled": !0,
				"theme-overrides": kt(Ix)
			}, {
				default: sn((() => [xr(i, null, {
					default: sn((() => [xr(r, null, {
						default: sn((() => [xr(o, null, {
							default: sn((() => [xr(n, null, {
								default: sn((({
									Component: e,
									route: t
								}) => [(ar(), pr(Fn, null, [t.meta.keepAlive ? (ar(), pr(io(e), l)) : Sr("", !0)], 1024)), t.meta && t.meta.keepAlive ? Sr("", !0) : (ar(), pr(io(e), u))])),
								_: 1
							})])),
							_: 1
						})])),
						_: 1
					})])),
					_: 1
				})])),
				_: 1
			}, 8, ["locale", "date-locale", "theme-overrides"])
		}
	});
/*!
 * pinia v2.0.35
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
const Dx = Symbol();
var Nx, Wx;
(Wx = Nx || (Nx = {}))
.direct = "direct", Wx.patchObject = "patch object", Wx.patchFunction = "patch function";
const $x = "undefined" != typeof window;
const Vx = Object.assign;

function qx(e, t) {
	const n = {};
	for (const o in t) {
		const r = t[o];
		n[o] = Gx(r) ? r.map(e) : e(r)
	}
	return n
}
const Ux = () => {},
	Gx = Array.isArray,
	Xx = /\/$/,
	Zx = e => e.replace(Xx, "");

function Kx(e, t, n = "/") {
	let o, r = {},
		i = "",
		s = "";
	const l = t.indexOf("#");
	let a = t.indexOf("?");
	l < a && l >= 0 && (a = -1), a > -1 && (o = t.slice(0, a), i = t.slice(a + 1, l > -1 ? l : t.length), r = e(i)), l > -1 && (o = o || t.slice(0, l), s = t.slice(l, t.length)), o = function(e, t) {
		if (e.startsWith("/")) return e;
		if (!e) return t;
		const n = t.split("/"),
			o = e.split("/");
		let r, i, s = n.length - 1;
		for (r = 0; r < o.length; r++)
			if (i = o[r], "." !== i) {
				if (".." !== i) break;
				s > 1 && s--
			} return n.slice(0, s)
			.join("/") + "/" + o.slice(r - (r === o.length ? 1 : 0))
			.join("/")
	}(null != o ? o : t, n);
	const c = {};
	return c.fullPath = o + (i && "?") + i + s, c.path = o, c.query = r, c.hash = s, c
}

function Yx(e, t) {
	return t && e.toLowerCase()
		.startsWith(t.toLowerCase()) ? e.slice(t.length) || "/" : e
}

function Qx(e, t) {
	return (e.aliasOf || e) === (t.aliasOf || t)
}

function Jx(e, t) {
	if (Object.keys(e)
		.length !== Object.keys(t)
		.length) return !1;
	for (const r in e)
		if (n = e[r], o = t[r], !(Gx(n) ? eC(n, o) : Gx(o) ? eC(o, n) : n === o)) return !1;
	var n, o;
	return !0
}

function eC(e, t) {
	return Gx(t) ? e.length === t.length && e.every(((e, n) => e === t[n])) : 1 === e.length && e[0] === t
}
var tC, nC, oC, rC;
(nC = tC || (tC = {}))
.pop = "pop", nC.push = "push", (rC = oC || (oC = {}))
	.back = "back", rC.forward = "forward", rC.unknown = "";
const iC = /^[^#]+#/;

function sC(e, t) {
	return e.replace(iC, "#") + t
}
const lC = () => ({
	left: window.pageXOffset,
	top: window.pageYOffset
});

function aC(e) {
	let t;
	if ("el" in e) {
		const n = e.el,
			o = "string" == typeof n && n.startsWith("#"),
			r = "string" == typeof n ? o ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
		if (!r) return;
		t = function(e, t) {
			const n = document.documentElement.getBoundingClientRect(),
				o = e.getBoundingClientRect(),
				r = {};
			return r.behavior = t.behavior, r.left = o.left - n.left - (t.left || 0), r.top = o.top - n.top - (t.top || 0), r
		}(r, e)
	} else t = e;
	"scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(null != t.left ? t.left : window.pageXOffset, null != t.top ? t.top : window.pageYOffset)
}

function cC(e, t) {
	return (history.state ? history.state.position - t : -1) + e
}
const uC = new Map;
let dC = () => location.protocol + "//" + location.host;

function fC(e, t) {
	const {
		pathname: n,
		search: o,
		hash: r
	} = t, i = e.indexOf("#");
	if (i > -1) {
		let t = r.includes(e.slice(i)) ? e.slice(i)
			.length : 1,
			n = r.slice(t);
		return "/" !== n[0] && (n = "/" + n), Yx(n, "")
	}
	return Yx(n, e) + o + r
}

function pC(e, t, n, o = !1, r = !1) {
	return {
		back: e,
		current: t,
		forward: n,
		replaced: o,
		position: window.history.length,
		scroll: r ? lC() : null
	}
}

function hC(e) {
	return "string" == typeof e || "symbol" == typeof e
}
const vC = {
		path: "/",
		name: void 0,
		params: {},
		query: {},
		hash: "",
		fullPath: "/",
		matched: [],
		meta: {},
		redirectedFrom: void 0
	},
	gC = vC,
	mC = Symbol("");
var bC, yC;

function xC(e, t) {
	{
		const n = {};
		return n.type = e, n[mC] = !0, Vx(new Error, n, t)
	}
}

function CC(e, t) {
	return e instanceof Error && mC in e && (null == t || !!(e.type & t))
}(yC = bC || (bC = {}))[yC.aborted = 4] = "aborted", yC[yC.cancelled = 8] = "cancelled", yC[yC.duplicated = 16] = "duplicated";
const wC = "[^/]+?",
	SC = {
		sensitive: !1,
		strict: !1,
		start: !0,
		end: !0
	},
	kC = SC,
	_C = /[.+*?^${}()[\]/\\]/g;

function PC(e, t) {
	let n = 0;
	for (; n < e.length && n < t.length;) {
		const o = t[n] - e[n];
		if (o) return o;
		n++
	}
	return e.length < t.length ? 1 === e.length && 80 === e[0] ? -1 : 1 : e.length > t.length ? 1 === t.length && 80 === t[0] ? 1 : -1 : 0
}

function OC(e, t) {
	let n = 0;
	const o = e.score,
		r = t.score;
	for (; n < o.length && n < r.length;) {
		const e = PC(o[n], r[n]);
		if (e) return e;
		n++
	}
	if (1 === Math.abs(r.length - o.length)) {
		if (zC(o)) return 1;
		if (zC(r)) return -1
	}
	return r.length - o.length
}

function zC(e) {
	const t = e[e.length - 1];
	return e.length > 0 && t[t.length - 1] < 0
}
const EC = {
		type: 0,
		value: ""
	},
	TC = EC,
	RC = /[a-zA-Z0-9_]/;

function jC(e, t, n) {
	const o = function(e, t) {
			const n = Vx({}, kC, t),
				o = [];
			let r = n.start ? "^" : "";
			const i = [];
			for (const c of e) {
				const e = c.length ? [] : [90];
				n.strict && !c.length && (r += "/");
				for (let t = 0; t < c.length; t++) {
					const o = c[t];
					let s = 40 + (n.sensitive ? .25 : 0);
					if (0 === o.type) t || (r += "/"), r += o.value.replace(_C, "\\$&"), s += 40;
					else if (1 === o.type) {
						const {
							value: e,
							repeatable: n,
							optional: l,
							regexp: u
						} = o, d = {};
						d.name = e, d.repeatable = n, d.optional = l, i.push(d);
						const f = u || wC;
						if (f !== wC) {
							s += 10;
							try {
								new RegExp("(" + f + ")")
							} catch (a) {
								throw new Error('Invalid custom RegExp for param "' + e + '" (' + f + "): " + a.message)
							}
						}
						let p = n ? "((?:" + f + ")(?:/(?:" + f + "))*)" : "(" + f + ")";
						t || (p = l && c.length < 2 ? "(?:/" + p + ")" : "/" + p), l && (p += "?"), r += p, s += 20, l && (s += -8), n && (s += -20), ".*" === f && (s += -50)
					}
					e.push(s)
				}
				o.push(e)
			}
			if (n.strict && n.end) {
				const e = o.length - 1;
				o[e][o[e].length - 1] += .7000000000000001
			}
			n.strict || (r += "/?"), n.end ? r += "$" : n.strict && (r += "(?:/|$)");
			const s = new RegExp(r, n.sensitive ? "" : "i"),
				l = {};
			return l.re = s, l.score = o, l.keys = i, l.parse = function(e) {
				const t = e.match(s),
					n = {};
				if (!t) return null;
				for (let o = 1; o < t.length; o++) {
					const e = t[o] || "",
						r = i[o - 1];
					n[r.name] = e && r.repeatable ? e.split("/") : e
				}
				return n
			}, l.stringify = function(t) {
				let n = "",
					o = !1;
				for (const r of e) {
					o && n.endsWith("/") || (n += "/"), o = !1;
					for (const e of r)
						if (0 === e.type) n += e.value;
						else if (1 === e.type) {
						const {
							value: i,
							repeatable: s,
							optional: l
						} = e, a = i in t ? t[i] : "";
						if (Gx(a) && !s) throw new Error('Provided param "' + i + '" is an array but it is not repeatable (* or + modifiers)');
						const c = Gx(a) ? a.join("/") : a;
						if (!c) {
							if (!l) throw new Error('Missing required param "' + i + '"');
							r.length < 2 && (n.endsWith("/") ? n = n.slice(0, -1) : o = !0)
						}
						n += c
					}
				}
				return n || "/"
			}, l
		}(function(e) {
			if (!e) return [
				[]
			];
			if ("/" === e) return [
				[TC]
			];
			if (!e.startsWith("/")) throw new Error('Invalid path "' + e + '"');

			function t(e) {
				throw new Error("ERR (" + n + ')/"' + c + '": ' + e)
			}
			let n = 0,
				o = n;
			const r = [];
			let i;

			function s() {
				i && r.push(i), i = []
			}
			let l, a = 0,
				c = "",
				u = "";

			function d() {
				if (c) {
					if (0 === n) {
						const e = {
							type: 0
						};
						e.value = c, i.push(e)
					} else if (1 === n || 2 === n || 3 === n) {
						i.length > 1 && ("*" === l || "+" === l) && t("A repeatable param (" + c + ") must be alone in its segment. eg: '/:ids+.");
						const e = {
							type: 1
						};
						e.value = c, e.regexp = u, e.repeatable = "*" === l || "+" === l, e.optional = "*" === l || "?" === l, i.push(e)
					} else t("Invalid state to consume buffer");
					c = ""
				}
			}

			function f() {
				c += l
			}
			for (; a < e.length;)
				if (l = e[a++], "\\" !== l || 2 === n) switch (n) {
					case 0:
						"/" === l ? (c && d(), s()) : ":" === l ? (d(), n = 1) : f();
						break;
					case 4:
						f(), n = o;
						break;
					case 1:
						"(" === l ? n = 2 : RC.test(l) ? f() : (d(), n = 0, "*" !== l && "?" !== l && "+" !== l && a--);
						break;
					case 2:
						")" === l ? "\\" == u[u.length - 1] ? u = u.slice(0, -1) + l : n = 3 : u += l;
						break;
					case 3:
						d(), n = 0, "*" !== l && "?" !== l && "+" !== l && a--, u = "";
						break;
					default:
						t("Unknown state")
				} else o = n, n = 4;
			return 2 === n && t('Unfinished custom RegExp for param "' + c + '"'), d(), s(), r
		}(e.path), n),
		r = {};
	r.record = e, r.parent = t, r.children = [], r.alias = [];
	const i = Vx(o, r);
	return t && !i.record.aliasOf == !t.record.aliasOf && t.children.push(i), i
}

function MC(e, t) {
	const n = [],
		o = new Map,
		r = {};

	function i(e, n, o) {
		const r = !o,
			a = {
				path: (c = e)
					.path,
				redirect: c.redirect,
				name: c.name,
				meta: c.meta || {},
				aliasOf: void 0,
				beforeEnter: c.beforeEnter,
				props: FC(c),
				children: c.children || [],
				instances: {},
				leaveGuards: new Set,
				updateGuards: new Set,
				enterCallbacks: {},
				components: "components" in c ? c.components || null : c.component && {
					default: c.component
				}
			};
		var c;
		a.aliasOf = o && o.record;
		const u = LC(t, e),
			d = [a];
		if ("alias" in e) {
			const t = "string" == typeof e.alias ? [e.alias] : e.alias;
			for (const e of t) d.push(Vx({}, a, {
				components: o ? o.record.components : a.components,
				path: e,
				aliasOf: o ? o.record : a
			}))
		}
		let f, p;
		for (const t of d) {
			const {
				path: c
			} = t;
			if (n && "/" !== c[0]) {
				const e = n.record.path,
					o = "/" === e[e.length - 1] ? "" : "/";
				t.path = n.record.path + (c && o + c)
			}
			if (f = jC(t, n, u), o ? o.alias.push(f) : (p = p || f, p !== f && p.alias.push(f), r && e.name && !BC(f) && s(e.name)), a.children) {
				const e = a.children;
				for (let t = 0; t < e.length; t++) i(e[t], f, o && o.children[t])
			}
			o = o || f, (f.record.components && Object.keys(f.record.components)
				.length || f.record.name || f.record.redirect) && l(f)
		}
		return p ? () => {
			s(p)
		} : Ux
	}

	function s(e) {
		if (hC(e)) {
			const t = o.get(e);
			t && (o.delete(e), n.splice(n.indexOf(t), 1), t.children.forEach(s), t.alias.forEach(s))
		} else {
			const t = n.indexOf(e);
			t > -1 && (n.splice(t, 1), e.record.name && o.delete(e.record.name), e.children.forEach(s), e.alias.forEach(s))
		}
	}

	function l(e) {
		let t = 0;
		for (; t < n.length && OC(e, n[t]) >= 0 && (e.record.path !== n[t].record.path || !IC(e, n[t]));) t++;
		n.splice(t, 0, e), e.record.name && !BC(e) && o.set(e.record.name, e)
	}
	r.strict = !1, r.end = !0, r.sensitive = !1, t = LC(r, t), e.forEach((e => i(e)));
	const a = {};
	return a.addRoute = i, a.resolve = function(e, t) {
		let r, i, s, l = {};
		if ("name" in e && e.name) {
			r = o.get(e.name);
			const n = {};
			if (n.location = e, !r) throw xC(1, n);
			s = r.record.name, l = Vx(AC(t.params, r.keys.filter((e => !e.optional))
				.map((e => e.name))), e.params && AC(e.params, r.keys.map((e => e.name)))), i = r.stringify(l)
		} else if ("path" in e) i = e.path, r = n.find((e => e.re.test(i))), r && (l = r.parse(i), s = r.record.name);
		else {
			r = t.name ? o.get(t.name) : n.find((e => e.re.test(t.path)));
			const a = {};
			if (a.location = e, a.currentLocation = t, !r) throw xC(1, a);
			s = r.record.name, l = Vx({}, t.params, e.params), i = r.stringify(l)
		}
		const a = [];
		let c = r;
		for (; c;) a.unshift(c.record), c = c.parent;
		return {
			name: s,
			path: i,
			params: l,
			matched: a,
			meta: (u = a, u.reduce(((e, t) => Vx(e, t.meta)), {}))
		};
		var u
	}, a.removeRoute = s, a.getRoutes = function() {
		return n
	}, a.getRecordMatcher = function(e) {
		return o.get(e)
	}, a
}

function AC(e, t) {
	const n = {};
	for (const o of t) o in e && (n[o] = e[o]);
	return n
}

function FC(e) {
	const t = {},
		n = e.props || !1;
	if ("component" in e) t.default = n;
	else
		for (const o in e.components) t[o] = "boolean" == typeof n ? n : n[o];
	return t
}

function BC(e) {
	for (; e;) {
		if (e.record.aliasOf) return !0;
		e = e.parent
	}
	return !1
}

function LC(e, t) {
	const n = {};
	for (const o in e) n[o] = o in t ? t[o] : e[o];
	return n
}

function IC(e, t) {
	return t.children.some((t => t === e || IC(e, t)))
}
const HC = /#/g,
	DC = /&/g,
	NC = /\//g,
	WC = /=/g,
	$C = /\?/g,
	VC = /\+/g,
	qC = /%5B/g,
	UC = /%5D/g,
	GC = /%5E/g,
	XC = /%60/g,
	ZC = /%7B/g,
	KC = /%7C/g,
	YC = /%7D/g,
	QC = /%20/g;

function JC(e) {
	return encodeURI("" + e)
		.replace(KC, "|")
		.replace(qC, "[")
		.replace(UC, "]")
}

function ew(e) {
	return JC(e)
		.replace(VC, "%2B")
		.replace(QC, "+")
		.replace(HC, "%23")
		.replace(DC, "%26")
		.replace(XC, "`")
		.replace(ZC, "{")
		.replace(YC, "}")
		.replace(GC, "^")
}

function tw(e) {
	return null == e ? "" : (t = e, JC(t)
			.replace(HC, "%23")
			.replace($C, "%3F"))
		.replace(NC, "%2F");
	var t
}

function nw(e) {
	try {
		return decodeURIComponent("" + e)
	} catch (t) {}
	return "" + e
}

function ow(e) {
	const t = {};
	if ("" === e || "?" === e) return t;
	const n = ("?" === e[0] ? e.slice(1) : e)
		.split("&");
	for (let o = 0; o < n.length; ++o) {
		const e = n[o].replace(VC, " "),
			r = e.indexOf("="),
			i = nw(r < 0 ? e : e.slice(0, r)),
			s = r < 0 ? null : nw(e.slice(r + 1));
		if (i in t) {
			let e = t[i];
			!Gx(e) && (e = t[i] = [e]), e.push(s)
		} else t[i] = s
	}
	return t
}

function rw(e) {
	let t = "";
	for (let n in e) {
		const o = e[n];
		if (n = ew(n)
			.replace(WC, "%3D"), null == o) {
			void 0 !== o && (t += (t.length ? "&" : "") + n);
			continue
		}(Gx(o) ? o.map((e => e && ew(e))) : [o && ew(o)])
		.forEach((e => {
			void 0 !== e && (t += (t.length ? "&" : "") + n, null != e && (t += "=" + e))
		}))
	}
	return t
}

function iw(e) {
	const t = {};
	for (const n in e) {
		const o = e[n];
		void 0 !== o && (t[n] = Gx(o) ? o.map((e => null == e ? null : "" + e)) : null == o ? o : "" + o)
	}
	return t
}
const sw = Symbol(""),
	lw = Symbol(""),
	aw = Symbol(""),
	cw = Symbol(""),
	uw = Symbol("");

function dw() {
	let e = [];
	const t = {
		add: function(t) {
			return e.push(t), () => {
				const n = e.indexOf(t);
				n > -1 && e.splice(n, 1)
			}
		},
		list: () => e,
		reset: function() {
			e = []
		}
	};
	return t
}

function fw(e, t, n, o, r) {
	const i = o && (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
	return () => new Promise(((s, l) => {
		const a = e => {
				if (!1 === e) {
					const e = {};
					e.from = n, e.to = t, l(xC(4, e))
				} else if (e instanceof Error) l(e);
				else if ("string" == typeof(a = e) || a && "object" == typeof a) {
					const n = {};
					n.from = t, n.to = e, l(xC(2, n))
				} else i && o.enterCallbacks[r] === i && "function" == typeof e && i.push(e), s();
				var a
			},
			c = e.call(o && o.instances[r], t, n, a);
		let u = Promise.resolve(c);
		e.length < 3 && (u = u.then(a)), u.catch((e => l(e)))
	}))
}

function pw(e, t, n, o) {
	const r = [];
	for (const s of e)
		for (const e in s.components) {
			let l = s.components[e];
			if ("beforeRouteEnter" === t || s.instances[e])
				if ("object" == typeof(i = l) || "displayName" in i || "props" in i || "__vccOpts" in i) {
					const i = (l.__vccOpts || l)[t];
					i && r.push(fw(i, n, o, s, e))
				} else {
					let i = l();
					r.push((() => i.then((r => {
						if (!r) return Promise.reject(new Error("Couldn't resolve component \"" + e + '" at "' + s.path + '"'));
						const i = (l = r)
							.__esModule || "Module" === l[Symbol.toStringTag] ? r.default : r;
						var l;
						s.components[e] = i;
						const a = (i.__vccOpts || i)[t];
						return a && fw(a, n, o, s, e)()
					}))))
				}
		}
	var i;
	return r
}

function hw(e) {
	const t = pn(aw),
		n = pn(cw),
		o = Wr((() => t.resolve(kt(e.to)))),
		r = Wr((() => {
			const {
				matched: e
			} = o.value, {
				length: t
			} = e, r = e[t - 1], i = n.matched;
			if (!r || !i.length) return -1;
			const s = i.findIndex(Qx.bind(null, r));
			if (s > -1) return s;
			const l = yw(e[t - 2]);
			return t > 1 && yw(r) === l && i[i.length - 1].path !== l ? i.findIndex(Qx.bind(null, e[t - 2])) : s
		})),
		i = Wr((() => r.value > -1 && function(e, t) {
			for (const n in t) {
				const o = t[n],
					r = e[n];
				if ("string" == typeof o) {
					if (o !== r) return !1
				} else if (!Gx(r) || r.length !== o.length || o.some(((e, t) => e !== r[t]))) return !1
			}
			return !0
		}(n.params, o.value.params))),
		s = Wr((() => r.value > -1 && r.value === n.matched.length - 1 && Jx(n.params, o.value.params)));
	return {
		route: o,
		href: Wr((() => o.value.href)),
		isActive: i,
		isExactActive: s,
		navigate: function(n = {}) {
			return function(e) {
					if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
					if (e.defaultPrevented) return;
					if (void 0 !== e.button && 0 !== e.button) return;
					if (e.currentTarget && e.currentTarget.getAttribute) {
						const t = e.currentTarget.getAttribute("target");
						if (/\b_blank\b/i.test(t)) return
					}
					e.preventDefault && e.preventDefault();
					return !0
				}(n) ? t[kt(e.replace) ? "replace" : "push"](kt(e.to))
				.catch(Ux) : Promise.resolve()
		}
	}
}
const vw = {
		MODE: 3
	},
	gw = {};
gw.type = [String, Object], gw.required = !0;
const mw = {};
mw.to = gw, mw.replace = Boolean, mw.activeClass = String, mw.exactActiveClass = String, mw.custom = Boolean, mw.ariaCurrentValue = {}, mw.ariaCurrentValue.type = String, mw.ariaCurrentValue.default = "page";
const bw = Rn({
	name: "RouterLink",
	compatConfig: vw,
	props: mw,
	useLink: hw,
	setup(e, {
		slots: t
	}) {
		const n = lt(hw(e)),
			{
				options: o
			} = pn(aw),
			r = Wr((() => ({
				[xw(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
				[xw(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
			})));
		return () => {
			const o = t.default && t.default(n);
			return e.custom ? o : $r("a", {
				"aria-current": n.isExactActive ? e.ariaCurrentValue : null,
				href: n.href,
				onClick: n.navigate,
				class: r.value
			}, o)
		}
	}
});

function yw(e) {
	return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}
const xw = (e, t, n) => null != e ? e : null != t ? t : n,
	Cw = {};
Cw.type = String, Cw.default = "default";
const ww = {};
ww.name = Cw, ww.route = Object;
const Sw = {
	MODE: 3
};

function kw(e, t) {
	if (!e) return null;
	const n = e(t);
	return 1 === n.length ? n[0] : n
}
const _w = Rn({
	name: "RouterView",
	inheritAttrs: !1,
	props: ww,
	compatConfig: Sw,
	setup(e, {
		attrs: t,
		slots: n
	}) {
		const o = pn(uw),
			r = Wr((() => e.route || o.value)),
			i = pn(lw, 0),
			s = Wr((() => {
				let e = kt(i);
				const {
					matched: t
				} = r.value;
				let n;
				for (;
					(n = t[e]) && !n.components;) e++;
				return e
			})),
			l = Wr((() => r.value.matched[s.value]));
		fn(lw, Wr((() => s.value + 1))), fn(sw, l), fn(uw, r);
		const a = Ct(),
			c = {
				flush: "post"
			};
		return gn((() => [a.value, l.value, e.name]), (([e, t, n], [o, r, i]) => {
			t && (t.instances[n] = e, r && r !== t && e && e === o && (!t.leaveGuards.size && (t.leaveGuards = r.leaveGuards), !t.updateGuards.size && (t.updateGuards = r.updateGuards))), e && t && (!r || !Qx(t, r) || !o) && (t.enterCallbacks[n] || [])
				.forEach((t => t(e)))
		}), c), () => {
			const o = r.value,
				i = e.name,
				s = l.value,
				c = s && s.components[i];
			if (!c) {
				const e = {};
				return e.Component = c, e.route = o, kw(n.default, e)
			}
			const u = s.props[i],
				d = u ? !0 === u ? o.params : "function" == typeof u ? u(o) : u : null,
				f = {
					onVnodeUnmounted: e => {
						e.component.isUnmounted && (s.instances[i] = null)
					}
				};
			f.ref = a;
			const p = $r(c, Vx({}, d, t, f)),
				h = {};
			return h.Component = p, h.route = o, kw(n.default, h) || p
		}
	}
});

function Pw(e) {
	return e.reduce(((e, t) => e.then((() => t()))), Promise.resolve())
}
const Ow = {},
	zw = function(e, t, n) {
		if (!t || 0 === t.length) return e();
		const o = document.getElementsByTagName("link");
		return Promise.all(t.map((e => {
				if ((e = "/djWeb/" + e) in Ow) return;
				Ow[e] = !0;
				const t = e.endsWith(".css"),
					r = t ? '[rel="stylesheet"]' : "";
				if (!!n)
					for (let n = o.length - 1; n >= 0; n--) {
						const r = o[n];
						if (r.href === e && (!t || "stylesheet" === r.rel)) return
					} else if (document.querySelector('link[href="' + e + '"]' + r)) return;
				const i = document.createElement("link");
				return i.rel = t ? "stylesheet" : "modulepreload", !t && (i.as = "script", i.crossOrigin = ""), i.href = e, document.head.appendChild(i), t ? new Promise(((t, n) => {
					i.addEventListener("load", t), i.addEventListener("error", (() => n(new Error("Unable to preload CSS for " + e))))
				})) : void 0
			})))
			.then((() => e()))
	},
	Ew = [{
		name: "home",
		path: "/",
		component: () => zw((() => import("./index-2435edf6.js?id=111111")), ["assets/index-2435edf6.js?id=111111", "assets/plugin-vue_export-helper-78288618.js", "assets/index-4b29b500.css"])
	}, {
		name: "v3",
		path: "/v3",
		component: () => zw((() => import("./index-a24dc107.js")), ["assets/index-a24dc107.js", "assets/plugin-vue_export-helper-78288618.js", "assets/index-bad79576.css"])
	}],
	Tw = function(e) {
		const t = MC(e.routes, e),
			n = e.parseQuery || ow,
			o = e.stringifyQuery || rw,
			r = e.history,
			i = dw(),
			s = dw(),
			l = dw(),
			a = wt(gC, !0);
		let c = gC;
		$x && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
		const u = qx.bind(null, (e => "" + e)),
			d = qx.bind(null, tw),
			f = qx.bind(null, nw);

		function p(e, i) {
			if (i = Vx({}, i || a.value), "string" == typeof e) {
				const o = Kx(n, e, i.path),
					s = {};
				s.path = o.path;
				const l = t.resolve(s, i),
					a = r.createHref(o.fullPath);
				return Vx(o, l, {
					params: f(l.params),
					hash: nw(o.hash),
					redirectedFrom: void 0,
					href: a
				})
			}
			let s;
			if ("path" in e) s = Vx({}, e, {
				path: Kx(n, e.path, i.path)
					.path
			});
			else {
				const t = Vx({}, e.params);
				for (const e in t) null == t[e] && delete t[e];
				s = Vx({}, e, {
					params: d(e.params)
				}), i.params = d(i.params)
			}
			const l = t.resolve(s, i),
				c = e.hash || "";
			l.params = u(f(l.params));
			const p = function(e, t) {
					const n = t.query ? e(t.query) : "";
					return t.path + (n && "?") + n + (t.hash || "")
				}(o, Vx({}, e, {
					hash: (g = c, JC(g)
						.replace(ZC, "{")
						.replace(YC, "}")
						.replace(GC, "^")),
					path: l.path
				})),
				h = r.createHref(p),
				v = {};
			var g;
			return v.redirectedFrom = void 0, v.href = h, Vx({
				fullPath: p,
				hash: c,
				query: o === rw ? iw(e.query) : e.query || {}
			}, l, v)
		}

		function h(e) {
			return "string" == typeof e ? Kx(n, e, a.value.path) : Vx({}, e)
		}

		function v(e, t) {
			if (c !== e) {
				const n = {};
				return n.from = t, n.to = e, xC(8, n)
			}
		}

		function g(e) {
			return b(e)
		}

		function m(e) {
			const t = e.matched[e.matched.length - 1];
			if (t && t.redirect) {
				const {
					redirect: n
				} = t;
				let o = "function" == typeof n ? n(e) : n;
				"string" == typeof o && (o = o.includes("?") || o.includes("#") ? o = h(o) : {
					path: o
				}, o.params = {});
				const r = {};
				return r.query = e.query, r.hash = e.hash, r.params = "path" in o ? {} : e.params, Vx(r, o)
			}
		}

		function b(e, t) {
			const n = c = p(e),
				r = a.value,
				i = e.state,
				s = e.force,
				l = !0 === e.replace,
				u = m(n);
			if (u) return b(Vx(h(u), {
				state: "object" == typeof u ? Vx({}, i, u.state) : i,
				force: s,
				replace: l
			}), t || n);
			const d = n;
			let f;
			if (d.redirectedFrom = t, !s && function(e, t, n) {
				const o = t.matched.length - 1,
					r = n.matched.length - 1;
				return o > -1 && o === r && Qx(t.matched[o], n.matched[r]) && Jx(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash
			}(o, r, n)) {
				const e = {};
				e.to = d, e.from = r, f = xC(16, e), T(r, r, !0, !1)
			}
			return (f ? Promise.resolve(f) : x(d, r))
				.catch((e => CC(e) ? CC(e, 2) ? e : E(e) : z(e, d, r)))
				.then((e => {
					if (e) {
						if (CC(e, 2)) {
							const n = {};
							return n.replace = l, b(Vx(n, h(e.to), {
								state: "object" == typeof e.to ? Vx({}, i, e.to.state) : i,
								force: s
							}), t || d)
						}
					} else e = w(d, r, !0, l, i);
					return C(d, r, e), e
				}))
		}

		function y(e, t) {
			const n = v(e, t);
			return n ? Promise.reject(n) : Promise.resolve()
		}

		function x(e, t) {
			let n;
			const [o, r, l] = function(e, t) {
				const n = [],
					o = [],
					r = [],
					i = Math.max(t.matched.length, e.matched.length);
				for (let s = 0; s < i; s++) {
					const i = t.matched[s];
					i && (e.matched.find((e => Qx(e, i))) ? o.push(i) : n.push(i));
					const l = e.matched[s];
					l && !t.matched.find((e => Qx(e, l))) && r.push(l)
				}
				return [n, o, r]
			}(e, t);
			n = pw(o.reverse(), "beforeRouteLeave", e, t);
			for (const i of o) i.leaveGuards.forEach((o => {
				n.push(fw(o, e, t))
			}));
			const a = y.bind(null, e, t);
			return n.push(a), Pw(n)
				.then((() => {
					n = [];
					for (const o of i.list()) n.push(fw(o, e, t));
					return n.push(a), Pw(n)
				}))
				.then((() => {
					n = pw(r, "beforeRouteUpdate", e, t);
					for (const o of r) o.updateGuards.forEach((o => {
						n.push(fw(o, e, t))
					}));
					return n.push(a), Pw(n)
				}))
				.then((() => {
					n = [];
					for (const o of e.matched)
						if (o.beforeEnter && !t.matched.includes(o))
							if (Gx(o.beforeEnter))
								for (const r of o.beforeEnter) n.push(fw(r, e, t));
							else n.push(fw(o.beforeEnter, e, t));
					return n.push(a), Pw(n)
				}))
				.then((() => (e.matched.forEach((e => e.enterCallbacks = {})), n = pw(l, "beforeRouteEnter", e, t), n.push(a), Pw(n))))
				.then((() => {
					n = [];
					for (const o of s.list()) n.push(fw(o, e, t));
					return n.push(a), Pw(n)
				}))
				.catch((e => CC(e, 8) ? e : Promise.reject(e)))
		}

		function C(e, t, n) {
			for (const o of l.list()) o(e, t, n)
		}

		function w(e, t, n, o, i) {
			const s = v(e, t);
			if (s) return s;
			const l = t === gC,
				c = $x ? history.state : {};
			n && (o || l ? r.replace(e.fullPath, Vx({
				scroll: l && c && c.scroll
			}, i)) : r.push(e.fullPath, i)), a.value = e, T(e, t, n, l), E()
		}
		let S;

		function k() {
			S || (S = r.listen(((e, t, n) => {
				if (!A.listening) return;
				const o = p(e),
					i = m(o);
				if (i) {
					const e = {
						replace: !0
					};
					return void b(Vx(i, e), o)
						.catch(Ux)
				}
				c = o;
				const s = a.value;
				var l, u;
				$x && (l = cC(s.fullPath, n.delta), u = lC(), uC.set(l, u)), x(o, s)
					.catch((e => CC(e, 12) ? e : CC(e, 2) ? (b(e.to, o)
						.then((e => {
							CC(e, 20) && !n.delta && n.type === tC.pop && r.go(-1, !1)
						}))
						.catch(Ux), Promise.reject()) : (n.delta && r.go(-n.delta, !1), z(e, o, s))))
					.then((e => {
						(e = e || w(o, s, !1)) && (n.delta && !CC(e, 8) ? r.go(-n.delta, !1) : n.type === tC.pop && CC(e, 20) && r.go(-1, !1)), C(o, s, e)
					}))
					.catch(Ux)
			})))
		}
		let _, P = dw(),
			O = dw();

		function z(e, t, n) {
			E(e);
			const o = O.list();
			return o.length ? o.forEach((o => o(e, t, n))) : console.error(e), Promise.reject(e)
		}

		function E(e) {
			return !_ && (_ = !e, k(), P.list()
				.forEach((([t, n]) => e ? n(e) : t())), P.reset()), e
		}

		function T(t, n, o, r) {
			const {
				scrollBehavior: i
			} = e;
			if (!$x || !i) return Promise.resolve();
			const s = !o && function(e) {
				const t = uC.get(e);
				return uC.delete(e), t
			}(cC(t.fullPath, 0)) || (r || !o) && history.state && history.state.scroll || null;
			return $t()
				.then((() => i(t, n, s)))
				.then((e => e && aC(e)))
				.catch((e => z(e, t, n)))
		}
		const R = e => r.go(e);
		let j;
		const M = new Set,
			A = {
				currentRoute: a,
				listening: !0,
				addRoute: function(e, n) {
					let o, r;
					return hC(e) ? (o = t.getRecordMatcher(e), r = n) : r = e, t.addRoute(r, o)
				},
				removeRoute: function(e) {
					const n = t.getRecordMatcher(e);
					n && t.removeRoute(n)
				},
				hasRoute: function(e) {
					return !!t.getRecordMatcher(e)
				},
				getRoutes: function() {
					return t.getRoutes()
						.map((e => e.record))
				},
				resolve: p,
				options: e,
				push: g,
				replace: function(e) {
					const t = {
						replace: !0
					};
					return g(Vx(h(e), t))
				},
				go: R,
				back: () => R(-1),
				forward: () => R(1),
				beforeEach: i.add,
				beforeResolve: s.add,
				afterEach: l.add,
				onError: O.add,
				isReady: function() {
					return _ && a.value !== gC ? Promise.resolve() : new Promise(((e, t) => {
						P.add([e, t])
					}))
				},
				install(e) {
					e.component("RouterLink", bw), e.component("RouterView", _w), e.config.globalProperties.$router = this, Object.defineProperty(e.config.globalProperties, "$route", {
						enumerable: !0,
						get: () => kt(a)
					}), $x && !j && a.value === gC && (j = !0, g(r.location)
						.catch((e => {})));
					const t = {};
					for (const o in gC) t[o] = Wr((() => a.value[o]));
					e.provide(aw, this), e.provide(cw, lt(t)), e.provide(uw, a);
					const n = e.unmount;
					M.add(e), e.unmount = function() {
						M.delete(e), M.size < 1 && (c = gC, S && S(), S = null, a.value = gC, j = !1, _ = !1), n()
					}
				}
			};
		return A
	}({
		history: function(e) {
			const t = function(e) {
					const {
						history: t,
						location: n
					} = window, o = {
						value: fC(e, n)
					}, r = {};
					r.value = t.state;
					const i = r;

					function s(o, r, s) {
						const l = e.indexOf("#"),
							a = l > -1 ? (n.host && document.querySelector("base") ? e : e.slice(l)) + o : dC() + e + o;
						try {
							t[s ? "replaceState" : "pushState"](r, "", a), i.value = r
						} catch (c) {
							console.error(c), n[s ? "replace" : "assign"](a)
						}
					}!i.value && s(o.value, {
						back: null,
						current: o.value,
						forward: null,
						position: t.length - 1,
						replaced: !0,
						scroll: null
					}, !0);
					const l = {};
					return l.location = o, l.state = i, l.push = function(e, n) {
						const r = Vx({}, i.value, t.state, {
							forward: e,
							scroll: lC()
						});
						s(r.current, r, !0);
						const l = {};
						l.position = r.position + 1, s(e, Vx({}, pC(o.value, e, null), l, n), !1), o.value = e
					}, l.replace = function(e, n) {
						s(e, Vx({}, t.state, pC(i.value.back, e, i.value.forward, !0), n, {
							position: i.value.position
						}), !0), o.value = e
					}, l
				}(e = function(e) {
					if (!e)
						if ($x) {
							const t = document.querySelector("base");
							e = (e = t && t.getAttribute("href") || "/")
								.replace(/^\w+:\/\/[^\/]+/, "")
						} else e = "/";
					return "/" !== e[0] && "#" !== e[0] && (e = "/" + e), Zx(e)
				}(e)),
				n = function(e, t, n, o) {
					let r = [],
						i = [],
						s = null;
					const l = ({
						state: i
					}) => {
						const l = fC(e, location),
							a = n.value,
							c = t.value;
						let u = 0;
						if (i) {
							if (n.value = l, t.value = i, s && s === a) return void(s = null);
							u = c ? i.position - c.position : 0
						} else o(l);
						r.forEach((e => {
							const t = {};
							t.delta = u, t.type = tC.pop, t.direction = u ? u > 0 ? oC.forward : oC.back : oC.unknown, e(n.value, a, t)
						}))
					};

					function a() {
						const {
							history: e
						} = window;
						e.state && e.replaceState(Vx({}, e.state, {
							scroll: lC()
						}), "")
					}
					window.addEventListener("popstate", l), window.addEventListener("beforeunload", a);
					return {
						pauseListeners: function() {
							s = n.value
						},
						listen: function(e) {
							r.push(e);
							const t = () => {
								const t = r.indexOf(e);
								t > -1 && r.splice(t, 1)
							};
							return i.push(t), t
						},
						destroy: function() {
							for (const e of i) e();
							i = [], window.removeEventListener("popstate", l), window.removeEventListener("beforeunload", a)
						}
					}
				}(e, t.state, t.location, t.replace),
				o = Vx({
					location: "",
					base: e,
					go: function(e, t = !0) {
						t || n.pauseListeners(), history.go(e)
					},
					createHref: sC.bind(null, e)
				}, t, n),
				r = {
					enumerable: !0,
					get: () => t.location.value
				};
			Object.defineProperty(o, "location", r);
			const i = {
				enumerable: !0,
				get: () => t.state.value
			};
			return Object.defineProperty(o, "state", i), o
		}("/djWeb"),
		scrollBehavior: (e, t, n) => {
			if (n) return n; {
				const e = {
					top: 0
				};
				return e
			}
		},
		routes: Ew
	}),
	Rw = {
		backgroundColor: "#40a7e3"
	},
	jw = {};
jw.loading = Rw;
const Mw = {};
Mw.loadingBarStyle = jw;
const Aw = {};
Aw.loadingBarProviderProps = Mw;
const {
	loadingBar: Fw
} = function(e, {
	configProviderProps: t,
	messageProviderProps: n,
	dialogProviderProps: o,
	notificationProviderProps: r,
	loadingBarProviderProps: i
} = {}) {
	const s = [];
	e.forEach((e => {
		switch (e) {
			case "message":
				const t = {};
				t.type = e, t.Provider = Xb, t.props = n, s.push(t);
				break;
			case "notification":
				const l = {};
				l.type = e, l.Provider = Cy, l.props = r, s.push(l);
				break;
			case "dialog":
				const a = {};
				a.type = e, a.Provider = cb, a.props = o, s.push(a);
				break;
			case "loadingBar":
				const c = {};
				c.type = e, c.Provider = Eb, c.props = i, s.push(c)
		}
	}));
	const l = {};
	return l.providersAndProps = s, l.configProviderProps = t,
		function({
			providersAndProps: e,
			configProviderProps: t
		}) {
			let n = Di((() => $r(cm, kt(t), {
				default: () => e.map((({
					type: e,
					Provider: t,
					props: n
				}) => $r(t, kt(n), {
					default: () => $r(Sy, {
						onSetup: () => r[e] = _y[e]()
					})
				})))
			})));
			const o = {};
			o.app = n;
			const r = o;
			let i;
			vl && (i = document.createElement("div"), document.body.appendChild(i), n.mount(i));
			const s = {
				unmount: () => {
					var e;
					null !== n && null !== i ? (n.unmount(), null === (e = i.parentNode) || void 0 === e || e.removeChild(i), i = null, n = null) : ws("discrete", "unmount call no need because discrete app has been unmounted")
				}
			};
			return Object.assign(s, r)
		}(l)
}(["loadingBar"], Aw);
Tw.beforeEach((() => (Fw.start(), !0))), Tw.afterEach((() => {
	Fw.finish()
}));
const Bw = function() {
	const e = new Q(!0),
		t = e.run((() => Ct({})));
	let n = [],
		o = [];
	const r = vt({
		install(e) {
			r._a = e, e.provide(Dx, r), e.config.globalProperties.$pinia = r, o.forEach((e => n.push(e))), o = []
		},
		use(e) {
			return this._a ? n.push(e) : o.push(e), this
		},
		_p: n,
		_a: null,
		_e: e,
		_s: new Map,
		state: t
	});
	return r
}();
Bw.use((({
		store: e
	}) => {
		e.router = vt(Tw)
	})), Di(Hx)
	.use(Tw)
	.use(Bw)
	.mount("#app"), document.body.style.setProperty("--tg-theme-bg-color", "#ffffff"), document.body.style.setProperty("--tg-theme-button-color", "#40a7e3"), document.body.style.setProperty("--tg-theme-button-text-color", "#ffffff"), document.body.style.setProperty("--tg-theme-hint-color", "#999999"), document.body.style.setProperty("--tg-theme-link-color", "#168acd"), document.body.style.setProperty("--tg-theme-secondary-bg-color", "#f1f1f1"), document.body.style.setProperty("--tg-theme-text-color", "#000000");
const Lw = Ex.hsl("#40a7e3");
document.body.style.setProperty("--second-button-color", Lw.fade(.9)
	.rgb()
	.toString());
const Iw = Ex.hsl("#ffffff");
document.body.style.setProperty("--border-color", Iw.lighten(.2)
	.toString());
const Hw = Ex.hsl("#f1f1f1");
document.body.style.setProperty("--second-bg-color-rgb", Hw.red() + "," + Hw.green() + "," + Hw.blue());
export {
	$i as $, _l as A, _s as B, pn as C, Hl as D, Nl as E, nr as F, Wl as G, yl as H, fn as I, jr as J, $l as K, to as L, ql as M, Js as N, ea as O, zt as P, Ll as Q, $r as R, Kl as S, ia as T, $t as U, Ln as V, In as W, Wi as X, Or as Y, Ka as Z, Vg as _, e as __vite_legacy_guard, fr as a, oc as a$, ao as a0, Xa as a1, ou as a2, bc as a3, Vu as a4, ku as a5, wu as a6, $u as a7, Mc as a8, Rc as a9, Rv as aA, ll as aB, al as aC, il as aD, sf as aE, tf as aF, el as aG, gh as aH, Yh as aI, ef as aJ, Mv as aK, Cs as aL, ci as aM, cl as aN, ul as aO, Xv as aP, Es as aQ, bv as aR, Vv as aS, Os as aT, Vi as aU, hl as aV, hn as aW, Gl as aX, Fi as aY, Ni as aZ, Rs as a_, od as aa, rd as ab, Zc as ac, zc as ad, td as ae, yc as af, gu as ag, Fd as ah, Mu as ai, Td as aj, Nu as ak, Ec as al, Ic as am, Cu as an, hu as ao, Eu as ap, Hc as aq, Id as ar, jc as as, vu as at, Uf as au, dp as av, Lp as aw, Bp as ax, Qd as ay, bh as az, xr as b, qv as b0, ks as b1, Cr as b2, gs as b3, ys as b4, us as b5, mh as b6, rv as b7, Ms as b8, sv as b9, um as bA, dm as bB, vh as ba, Vh as bb, js as bc, zs as bd, ig as be, vc as bf, dl as bg, fl as bh, hs as bi, og as bj, bl as bk, Uh as bl, Ss as bm, Ts as bn, xs as bo, ms as bp, ml as bq, cs as br, dg as bs, bs as bt, ws as bu, Kn as bv, vs as bw, Jd as bx, vl as by, qi as bz, Wr as c, Rn as d, yr as e, wr as f, pr as g, Sr as h, xt as i, rn as j, gn as k, Un as l, Zn as m, l as n, ar as o, on as p, Cl as q, Ct as r, lt as s, u as t, kt as u, xl as v, sn as w, qn as x, Pl as y, at as z
};