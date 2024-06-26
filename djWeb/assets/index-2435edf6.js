import { r as e, i as t, d as n, _ as l, a as s, b as r, c as a, U as u, g as i, e as o, f as c, h as p } from "./plugin-vue_export-helper-78288618.js";
import { d, r as m, c as x, a as y, b as v, w as g, F as f, e as h, u as C, i as k, t as b, f as _, g as w, h as z, n as B, _ as A, o as O, p as T, j as U } from "./index-5026f0d8.js";
const I = e => (T("data-v-10d5ad81"), e = e(), U(), e),
    D = {
        key: 0,
        class: "flex pt-60px pl-20px mb-40px"
    },
    j = D,
    M = {
        class: "p-20px pb-10px"
    },
    H = M,
    E = {
        class: "px-20px"
    },
    F = E,
    P = {
        class: "px-20px text-size-18px"
    },
    R = P,
    K = {
        class: "px-10px mt-15px"
    },
    N = K,
    Y = {
        class: "px-20px text-size-18px"
    },
    G = Y,
    J = {
        class: "px-10px mt-15px"
    },
    S = J,
    V = {
        class: "px-20px text-size-18px"
    },
    W = I((() => h("h2", V, " 记账分类 ", -1))),
    q = {
        class: "px-20px pt-15px pb-20px"
    },
    L = q,
    Q = {
        class: "px-20px text-size-18px"
    },
    X = Q,
    Z = {
        class: "px-10px mt-15px"
    },
    $ = Z,
    ee = {
        class: "px-20px text-size-18px"
    },
    te = ee,
    ne = {
        class: "px-10px mt-15px"
    },
    le = ne,
    se = {
        class: "px-20px text-size-18px"
    },
    re = se,
    ae = {
        class: "px-10px mt-15px"
    },
    ue = ae,
    ie = {
        class: "px-20px pt-15px pb-20px"
    },
    oe = ie,
    ce = {
        class: "text-size-16px font-semibold"
    },
    pe = I((() => h("div", ce, " 总计 ", -1))),
    de = {
        class: "my-4px text-size-16px flex items-center"
    },
    me = de,
    xe = {
        key: 0,
        class: "inline-flex items-center ml-5px"
    },
    ye = xe,
    ve = {
        key: 1,
        class: "ml-5px"
    },
    ge = ve,
    fe = {
        class: "my-4px text-size-16px"
    },
    he = fe,
    Ce = {
        key: 0,
        class: "inline-flex items-center ml-5px"
    },
    ke = Ce,
    be = {
        key: 1,
        class: "ml-5px"
    },
    _e = be,
    we = {
        class: "my-4px text-size-16px"
    },
    ze = we,
    Be = {
        key: 0,
        class: "inline-flex items-center ml-5px"
    },
    Ae = Be,
    Oe = {
        key: 1,
        class: "ml-5px"
    },
    Te = Oe,
    Ue = {
        class: "flex items-center m-0px text-size-16px"
    },
    Ie = Ue,
    De = {
        key: 0,
        class: "inline-flex items-center ml-5px"
    },
    je = De,
    Me = {
        key: 1,
        class: "ml-5px"
    },
    He = Me,
    Ee = p(d({
        __name: "index",
        setup(p) {
            const d = !t(),
                T = e => {
                    switch (e) {
                    case "cny":
                        return "元";
                    case "php":
                        return "PHP";
                    case "usd":
                    case "usdt":
                        const e = {
                            class: "mr-4px",
                            height: 10,
                            width: 10
                        };
                        return v(u, e, null);
                    case "kgs":
                        return "KGS";
                    case "mmk":
                        return "MMK";
                    case "vnd":
                        return "VND";
                    case "twd":
                        return "TWD";
                    case "thb":
                        return "THD";
                    case "hkd":
                        return "HKD";
                    case "myr":
                        return "MYR";
                    case "mop":
                        return "MOP";
                    case "aed":
                        return "AED";
                    case "inr":
                        return "INR";
                    case "eur":
                        return "EUR";
                    case "jpy":
                        return "JPY";
                    default:
                        return ""
                    }
                },
                U = {
                    tooltip: !0
                },
                I = {
                    tooltip: !0
                },
                D = m([{
                    key: "time",
                    title: "时间",
                    align: "center",
                    width: d ? void 0 : "40px",
                   // width: "120px",
                    render: e => n(e.time).format("MM/DD HH:mm")
                }, {
                    key: "baseAmount",
                    title: "金额",
                    align: "center",
                    width: d ? void 0 : "110px",
                    render: e => ((e, t, n) => {
                        if (0 === e || 1 === t.rate)
                            return t.baseAmount;
                        const l = {
                            class: "inline-flex items-center"
                        };
                        return v("div", null, [v("b", null, ["" + t.baseAmount + " * " +t.rate]),v("div", null, [t.currenyAmount.toFixed(2)])])
                    })(Ce.value.rate, e, Ce.value.currenyType)
                },
                // {
                //     key: "fei",
                //     title: "费汇率",
                //     align: "center",
                //     width: "170px",
                //     render: e => {
                //     return v("span", null, [e.fei + "%",_(" ⇌ "),e.rate,_(""), null])
                //     }
                // }, 
                {
                    key: "baseAm",
                    title: "结算",
                    align: "center",
                    width: d ? void 150 : "95px",
                    render: e => ((e, t, n) => {
                        return v("div", null, [v("div", l, [T(n),(t.currenyAmount/Ce.value.hui).toFixed(2)])])
                    })(Ce.value.currenyAmount, e, Ce.value.currenyType)
                    
                    // return v("div", null, [T(n), _(" "),v("div", l, [t.currenyAmount.toFixed(2)])])
                    // })(Ce.value.currenyAmount, e, Ce.value.currenyType)
                }, {
                    key: "type",
                    title: "客户",
                    align: "center",
                    render: e => {
                    return v("span", null, [e.remark, null])
                    }
                }, {
                    key: "user",
                    title: "操作人",
                    align: "center",
                    width: d ? void 0 : "80px",
                    ellipsis: I,
                    render: e => {
                        var t;
                        return v("span", null, [e.user.first_name, null != (t = e.user.last_name) ? t : ""])
                    }
                }]),
                M = {
                    tooltip: !0
                },
                E = {
                    tooltip: !0
                },
                P = m([{
                    key: "time",
                    title: "时间",
                    align: "center",
                    //width: "120px",
                    width: d ? void 0 : "40px",
                    render: e => n(e.time).format("MM/DD HH:mm")
                }, {
                    key: "baseAmount",
                    title: "金额",
                    align: "center",
                    render: e => De.value ? ((e, t) => {
                        if (t) {
                            return v("div", {
                                class: "inline-flex items-center"
                            }, [T("usdt"), e.currenyAmount])
                        }
                        return v("span", null, [e.baseAmount.toFixed(2)])
                    })(e, !!Me.value) : ((e, t, n) => {
                        if (0 === e || 1 === e)
                            return "" + t.baseAmount;
                        const l = {
                            class: "inline-flex items-center"
                        };
                        return v("div", null, [v("div", null, [T(n),t.baseAmount.toFixed(2)])])
                    })(Ce.value.rate, e, e.currenyType)
                }, {
                    key: "type",
                    title: "客户",
                    align: "center",
                    render: e => {
                    return v("span", null, [e.remark, null])
                    }
                }, {
                    key: "user",
                    title: "操作人",
                    align: "center",
                    width: d ? void 0 : "70px",
                    ellipsis: E,
                    render: e => {
                        var t,
                            n;
                      return v("span", null, [null != (t = e.user.first_name) ? t : "", null != (n = e.user.last_name) ? n : ""])
                    }
                }]),
                K = x((() => {
                    const e = i(Ce.value.bills, "remark");
                    let t = 0;
                    const n = Object.keys(e).map((n => {
                            var l,
                                s,
                                r,
                                a;
                            t++;
                            const u = e[n],
                                i = u.filter((e => "in" === e.type)),
                                c = i.reduce(((e, t) => t.baseAmount + e), 0),
                                p = i.reduce(((e, t) => e + t.currenyAmount), 0),
                                d = u.filter((e => "out" === e.type)),
                                m = d.reduce(((e, t) => e + t.baseAmount), 0),
                                x = d.reduce(((e, t) => e + t.currenyAmount), 0),
                                y = o.round(c - m, 2),
                                v = o.round(p - x, 2),
                                g = {};
                            return g.insBaseCount = c, g.insCurrenyCount = p, g.outBaseCount = m, g.outCurrencyCount = x, g.leftBaseCount = y, g.leftCurrencyCount = v, g.user = u[0].remark, g
                        })),
                        l = {};
                    return l.group_content = n, l.group_len = t, l
                })),
                Y = x((() => {
                    const e = i(Ce.value.bills.filter((e => "in" === e.type)), "rate");
                    let t = 0;
                    const n = Object.keys(e).map((n => {
                            t++;
                            const l = e[n],
                                s = l.reduce(((e, t) => e + t.baseAmount), 0),
                                r = l.reduce(((e, t) => e + t.currenyAmount), 0);
                            return {
                                insCount: s,
                                rate: n,
                                usdCount: r.toFixed(2)
                            }
                        })),
                        l = {};
                    return l.group_content = n, l.group_len = t, l
                })),
                J = x((() => {
                    const e = i(Ce.value.bills.filter((e => "in" === e.type)), "remark"),
                        t = [];
                    return Object.keys(e).forEach((n => {
                        const l = e[n],
                            s = i(l, "rate");
                        Object.keys(s).forEach((e => {
                            var n,
                                r,
                                a,
                                u;
                            const i = s[e],
                                o = i.reduce(((e, t) => e + t.baseAmount), 0),
                                c = i.reduce(((e, t) => e + t.currenyAmount), 0);
                            t.push({
                                insCount: c.toFixed(2),
                                rate: o+" * "+e,
                                usdCount: (c/Ce.value.hui).toFixed(2),
                                username: l[0].remark,
                                user: "" + l[0].remark
                            })
                        }))
                    })), t
                })),
                V = (e, t, n) => {
                    if (0 === e || 1 === e)
                        return "" + t;
                    const l = {
                        class: "inline-flex items-center"
                    };
                    return v("div", null, [v("div", null, ["" + t])])
                },
                q = m([{
                    title: "应下发",
                    key: "insCount",
                    align: "center",
                    render: e => v("div", null, [V(e.insBaseCount, (e.insCurrenyCount/Ce.value.hui).toFixed(2))])
                }, {
                    title: "已下发",
                    key: "outCount",
                    align: "center",
                    render: e => v("div", null, [V(e.outBaseCount, e.outCurrencyCount.toFixed(2))])
                }, {
                    title: "待下发",
                    key: "leftCount",
                    align: "center",
                    render: e => v("div", null, [V(e.leftBaseCount, ((e.insCurrenyCount/Ce.value.hui).toFixed(2)-e.outCurrencyCount.toFixed(2)))])
                }, {
                    title: "客户",
                    key: "user",
                    align: "center",
                    render: e => {
                        const t = {};
                        return t.href = "https://t.me/" + e.username, t.target = "_blank", v("a", t, [e.user])
                    }
                }]),
                Q = {
                    title: "单价",
                    key: "rate",
                    align: "center"
                },
                Z = {
                    title: "总量",
                    key: "insCount",
                    align: "center"
                },
                ee = {
                    title: "总价",
                    key: "usdCount",
                    align: "center"
                },
                ne = m([Q, Z, ee]),
                se = {
                    title: "总数/单价",
                    key: "rate",
                    align: "center"
                },
                ae = {
                    title: "总价",
                    key: "insCount",
                    align: "center"
                },
                ie = {
                    title: "应结算 USDT",
                    key: "usdCount",
                    align: "center"
                },
                ce = m([{
                    title: "客户",
                    key: "user",
                    align: "center",
                    render: e => {
                        const t = {};
                        return t.href = "https://t.me/" + e.username, v("a", t, [e.user])
                    }
                }, se, ae, ie]),
                de = m(!1),
                xe = m(),
                ve = (e => {
                    const t = {},
                        n = document.createElement("a");
                    n.href = e;
                    const l = n.search.substring(1).split("&");
                    for (let s = 0; s < l.length; s++) {
                        const e = l[s].split("=");
                        t[e[0]] = decodeURIComponent(e[1])
                    }
                    return t
                })(window.location.href),
                fe = {
                    totalInBase: 0,
                    totalOutBase: 0,
                    totalInCurrency: 0,
                    totalOutCurrency: 0,
                    outBase: 0,
                    outCurrency: 0,
                    notOutBase: 0,
                    notOutCurrency: 0,
                    bills: [],
                    rate: 0,
                    currenyType: "",
                    baseType: "",
                    date: ""
                },
                Ce = m(fe),
                be = m([]),
                we = x((() => Ce.value.bills.filter((e => "in" === e.type)))),
                Be = x((() => Ce.value.bills.filter((e => "out" === e.type)))),
                Oe = x((() => "usd" === Ce.value.currenyType || "usdt" === Ce.value.currenyType)),
                Ue = x((() => 1 !== Ce.value.rate && 0 !== Ce.value.rate)),
                De = x((() => "v2" === Ce.value.version)),
                Me = x((() => De.value && Ce.value.use_usd));
            (async () => {
                if (ve.id) {
                    const t = {};
                    t.id = ve.id;
                    const n = {};
                    n.params = t;
                    const l = (await e.get("https://bot.letsvpn.bet/jzWeb/options/", n)).map((e => {
                        const t = {};
                        return t.label = e.startTime + (e.settlementTime ? "到 " + e.settlementTime : ""), t.value = e._id, t
                    }));
                    be.value = l,
                    xe.value = l[0].value
                }
            })().then((() => {
                Ee()
            }));
            const Ee = async () => {
                if (!xe.value)
                    return;
                de.value = !0;
                const t = {};
                t.id = xe.value,
                t.groupId = ve.id;
                const n = {};
                n.params = t;
                const l = await e.get("https://bot.letsvpn.bet/jzWeb/bill/", n);
                if (l.bills)
                    l.bills.reverse(),
                    Ce.value = l;
                else {
                    const e = {
                        totalInBase: 0,
                        totalOutBase: 0,
                        totalInCurrency: 0,
                        totalOutCurrency: 0,
                        outBase: 0,
                        rate: 0,
                        outCurrency: 0,
                        notOutBase: 0,
                        notOutCurrency: 0,
                        bills: [],
                        currenyType: "",
                        baseType: "",
                        date: ""
                    };
                    Ce.value = e
                }
                de.value = !1
            };
            return (e, t) => {
                const n = l,
                    i = A,
                    o = s,
                    p = r,
                    m = r,
                    x = c,
                    T = a,
                    U = {
                        size: "large",
                        block: ""
                    };
                U.onClick = Ee;
                const I = {
                        key: 1
                    },
                    M = {
                        size: "large",
                        block: ""
                    };
                M.onClick = Ee;
                const E = {
                        title: "用户结算分类",
                        name: "1"
                    },
                    V = {
                        title: "按入款单价分类",
                        name: "2"
                    },
                    Q = {
                        title: "按客户分类",
                        name: "3"
                    },
                    Z = {
                        key: 0,
                        class: "ml-5px",
                        height: "16",
                        width: "16"
                    },
                    ee = {
                        key: 0,
                        class: "ml-5px",
                        height: "16",
                        width: "16"
                    },
                    se = {
                        key: 0,
                        class: "ml-5px",
                        height: "16",
                        width: "16"
                    },
                    ae = {
                        key: 0,
                        class: "ml-5px",
                        height: "16",
                        width: "16"
                    };
                return O(), y("section", {
                    class: B(d ? "w-1200px mx-auto" : "")
                }, [d ? (O(), y("div", j, [v(o, null, {
                    default: g((() => [v(n, {
                        value: C(xe),
                        "onUpdate:value": t[0] || (t[0] = e => k(xe) ? xe.value = e : null),
                        size: "large",
                        class: "w-240px",
                        options: C(be)
                    }, null, 8, ["value", "options"]), v(i, U, {
                        default: g((() => [_(" 查看账单 ")])),
                        _: 1
                    })])),
                    _: 1
                })])) : (O(), y(f, I, [h("div", H, [v(n, {
                    value: C(xe),
                    "onUpdate:value": t[1] || (t[1] = e => k(xe) ? xe.value = e : null),
                    size: "large",
                    class: "select",
                    options: C(be)
                }, null, 8, ["value", "options"])]), h("div", F, [v(i, M, {
                    default: g((() => [_(" 查看账单 ")])),
                    _: 1
                })])], 8)), h("h2", R, " 入款(" + b(C(we).length) + "笔) ", 1), h("div", N, [v(p, {
                    loading: C(de),
                    size: "small",
                    bordered: "",
                    "single-line": !1,
                    data: C(we),
                    columns: C(D)
                }, null, 8, ["loading", "data", "columns"])]), h("h2", G, " 出款(" + b(C(Be).length) + "笔) ", 1), h("div", S, [v(m, {
                    loading: C(de),
                    size: "small",
                    bordered: "",
                    "single-line": !1,
                    data: C(Be),
                    columns: C(P)
                }, null, 8, ["loading", "data", "columns"])]), W, h("div", L, [v(T, null, {
                    default: g((() => [v(x, E, {
                        default: g((() => [h("h2", X, " 共" + b(C(K).group_len) + "组 ", 1), h("div", $, [v(m, {
                            loading: C(de),
                            size: "small",
                            bordered: "",
                            "single-line": !1,
                            data: C(K).group_content,
                            columns: C(q)
                        }, null, 8, ["loading", "data", "columns"])])])),
                        _: 1
                    }), v(x, V, {
                        default: g((() => [h("h2", te, " 共" + b(C(Y).group_len) + "组 ", 1), h("div", le, [v(m, {
                            loading: C(de),
                            size: "small",
                            bordered: "",
                            "single-line": !1,
                            data: C(Y).group_content,
                            columns: C(ne)
                        }, null, 8, ["loading", "data", "columns"])])])),
                        _: 1
                    }), v(x, Q, {
                        default: g((() => [h("h2", re, " 共" + b(C(J).length) + "组 ", 1), h("div", ue, [v(m, {
                            loading: C(de),
                            size: "small",
                            bordered: "",
                            "single-line": !1,
                            data: C(J),
                            columns: C(ce)
                        }, null, 8, ["loading", "data", "columns"])])])),
                        _: 1
                    })])),
                    _: 1
                })]),
                
                h("div", oe, 
                
                [pe,
                
                h("div", me, [_(" 总量：" + b(C(Ce).totalInBase) + " ", 1)]), 
                h("div", me, [_(" 总价：" + b(C(Ce).totalOutCurrency.toFixed(2)) + " ", 1)]), 
                h("div", me, [_(" 单价：" + Ce.value.hui + " ", 1)]), 
                h("div", he, [_(" 应下发：" + ((b(C(Ce).totalOutCurrency.toFixed(2))/Ce.value.hui).toFixed(2)) + " ", 1), C(Ue) ? (O(), y("span", je, [_("", 1), C(Oe) ? (O(), w(C(u), ae)) : (O(), y("span", He, b(C(Ce).currenyType.toUpperCase()), 1))])) : z("", !0)]),
                
                h("div", ze, [_(" 已下发：" + b(C(Ce).outCurrency.toFixed(2)) + " ", 1), C(Ue) ? (O(), y("span", je, [_("", 1), C(Oe) ? (O(), w(C(u), ae)) : (O(), y("span", He, b(C(Ce).currenyType.toUpperCase()), 1))])) : z("", !0)]), 
                
                h("div", Ie, [_(" 待下发：" + (((b(C(Ce).totalOutCurrency.toFixed(2))/Ce.value.hui)-b(C(Ce).outCurrency.toFixed(2))).toFixed(2))  + " ", 1), C(Ue) ? (O(), y("span", je, [_("", 1), C(Oe) ? (O(), w(C(u), ae)) : (O(), y("span", He, b(C(Ce).currenyType.toUpperCase()), 1))])) : z("", !0)])])], 2)
            }
        }
    }), [["__scopeId", "data-v-10d5ad81"]]);
export { Ee as default };

