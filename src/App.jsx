import { useState, useEffect, useRef } from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const LOGO = "/edwinhaynes_logo_highres.png";
const HERO = "/edwinhaynesphoto.png";

/* ── BRAND PALETTE from logo: crimson red + black + white ── */
const C = {
  crimson: "#9B1B1B",
  crimsonLight: "#B82E2E",
  crimsonDark: "#7A1515",
  crimsonGlow: "rgba(155,27,27,0.12)",
  crimsonBorder: "rgba(155,27,27,0.35)",
  black: "#0A0A0A",
  charcoal: "#141414",
  darkGray: "#1C1C1C",
  gray: "#2A2A2A",
  white: "#FFFFFF",
  offWhite: "#F0EDED",
  silver: "#B5AEAE",
  warmGray: "#8A8080",
};

/* ── SHARED STYLES ── */
const S = {
  page: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    background: C.black,
    color: C.offWhite,
    minHeight: "100vh",
    overflowX: "hidden",
  },
  line: {
    width: 50, height: 2,
    background: `linear-gradient(90deg, transparent, ${C.crimson}, transparent)`,
    margin: "14px auto",
  },
  title: {
    fontSize: "clamp(26px, 4vw, 42px)",
    fontWeight: 400,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color: C.white,
    marginBottom: 8,
  },
  sub: {
    fontSize: "clamp(10px, 1.1vw, 12px)",
    fontWeight: 500,
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    color: C.crimsonLight,
    fontFamily: "'Outfit', sans-serif",
  },
  body: {
    fontSize: "clamp(14px, 1.4vw, 16px)",
    lineHeight: 1.85,
    color: C.silver,
    fontWeight: 300,
    maxWidth: 660,
    fontFamily: "'Outfit', sans-serif",
  },
  btn: {
    display: "inline-block", padding: "13px 38px",
    border: `1px solid ${C.crimson}`, color: C.crimson,
    background: "transparent",
    fontFamily: "'Outfit', sans-serif", fontSize: 11,
    letterSpacing: "0.18em", textTransform: "uppercase",
    cursor: "pointer", transition: "all 0.35s ease",
    textDecoration: "none", borderRadius: 2,
  },
  btnF: {
    display: "inline-block", padding: "13px 38px",
    border: `1px solid ${C.crimson}`, color: C.white,
    background: C.crimson,
    fontFamily: "'Outfit', sans-serif", fontSize: 11,
    letterSpacing: "0.18em", textTransform: "uppercase",
    cursor: "pointer", transition: "all 0.35s ease",
    textDecoration: "none", fontWeight: 600, borderRadius: 2,
  },
};

/* ── INTERSECTION OBSERVER FADE ── */
function useFade(t = 0.12) {
  const r = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = r.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); obs.unobserve(el); }
    }, { threshold: t });
    obs.observe(el);
    return () => obs.disconnect();
  }, [t]);
  return [r, v];
}

function Fade({ children, delay = 0, style = {} }) {
  const [r, v] = useFade();
  return (
    <div ref={r} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

/* ══════════════════════════════════════════════════════════
   NAVIGATION
   ══════════════════════════════════════════════════════════ */
function Nav({ cur, setP }) {
  const [sc, setSc] = useState(false);
  const [mo, setMo] = useState(false);
  useEffect(() => {
    const h = () => setSc(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { l: "Home", a: () => { setP("main"); window.scrollTo({ top: 0, behavior: "smooth" }); } },
    { l: "About", a: () => { setP("main"); setTimeout(() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), 120); } },
    { l: "Portfolio", a: () => { setP("main"); setTimeout(() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" }), 120); } },
    { l: "Gallery", a: () => { setP("main"); setTimeout(() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" }), 120); } },
    { l: "Shop", a: () => { setP("shop"); window.scrollTo({ top: 0, behavior: "smooth" }); } },
    { l: "Contact", a: () => { setP("main"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 120); } },
  ];

  const socials = [
    { t: <Facebook size={14} />, u: "https://www.facebook.com/edwin.haynes.12" },
    { t: <Twitter size={14} />, u: "https://twitter.com/EdwinHaynes" },
    { t: <Linkedin size={14} />, u: "https://www.linkedin.com/in/edwinhaynes/" },
    { t: <Instagram size={14} />, u: "https://www.instagram.com/edwinfhaynes/" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: sc ? "10px 36px" : "18px 36px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: sc ? "rgba(10,10,10,0.97)" : "transparent",
        backdropFilter: sc ? "blur(16px)" : "none",
        borderBottom: sc ? `1px solid ${C.crimsonBorder}` : "1px solid transparent",
        transition: "all 0.45s ease",
      }}>
        {/* Logo */}
        <div
          onClick={() => { setP("main"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ cursor: "pointer" }}
        >
          <img src={LOGO} alt="Edwin Haynes" style={{
            height: sc ? 34 : 42,
            transition: "height 0.4s ease",
            filter: "brightness(1.1)",
          }} />
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="dn">
          {links.map(x => (
            <button key={x.l} onClick={x.a} style={{
              background: "none", border: "none",
              color: ((cur === "shop" && x.l === "Shop") || (cur === "main" && x.l === "Home"))
                ? C.crimsonLight : C.silver,
              fontFamily: "'Outfit', sans-serif", fontSize: 13,
              letterSpacing: "0.2em", textTransform: "uppercase",
              cursor: "pointer", padding: "6px 0",
              borderBottom: (cur === "shop" && x.l === "Shop")
                ? `1px solid ${C.crimsonLight}` : "1px solid transparent",
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => e.target.style.color = C.crimsonLight}
              onMouseLeave={e => {
                const active = (cur === "shop" && x.l === "Shop") || (cur === "main" && x.l === "Home");
                if (!active) e.target.style.color = C.silver;
              }}
            >{x.l}</button>
          ))}
          <div style={{ display: "flex", gap: 14, marginLeft: 12 }}>
            {socials.map((s, i) => (
              <a key={i} href={s.u} target="_blank" rel="noreferrer" style={{
                width: 30, height: 30, borderRadius: "50%",
                border: `1px solid ${C.crimsonBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: C.silver, textDecoration: "none",
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.crimson; e.currentTarget.style.color = C.crimsonLight; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.crimsonBorder; e.currentTarget.style.color = C.silver; }}
              >{s.t}</a>
            ))}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button className="mn" onClick={() => setMo(!mo)} style={{
          display: "none", background: "none", border: "none",
          cursor: "pointer", flexDirection: "column", gap: 5, padding: 8,
        }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              width: 22, height: 1.5, background: C.white, transition: "all 0.3s",
              transform: mo ? (i === 0 ? "rotate(45deg) translate(4px,4px)" : i === 2 ? "rotate(-45deg) translate(4px,-4px)" : "none") : "none",
              opacity: mo && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile overlay */}
      {mo && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "rgba(10,10,10,0.98)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 26,
        }}>
          {links.map(x => (
            <button key={x.l} onClick={() => { setMo(false); x.a(); }} style={{
              background: "none", border: "none", color: C.white,
              fontFamily: "'DM Serif Display', serif", fontSize: 26,
              fontWeight: 400, letterSpacing: "0.1em",
              textTransform: "uppercase", cursor: "pointer",
            }}>{x.l}</button>
          ))}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}body{overflow-x:hidden; width: 100%;}
        ::selection{background:${C.crimson};color:${C.white}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes pGlow{0%,100%{opacity:.3}50%{opacity:.7}}
        @media(max-width:900px){
          .dn{display:none!important}
          .mn{display:flex!important}
          .hg{grid-template-columns:1fr!important;text-align:center!important;gap: 40px!important;padding-top:140px!important;}
          .hi{margin:0 auto!important;max-width:380px!important;order:-1!important; width: 90%!important;}
          .hbtns{justify-content:center!important}
        }
        @media(min-width:901px){.mn{display:none!important}}
      `}</style>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   HERO with Edwin's photo
   ══════════════════════════════════════════════════════════ */
function Hero({ setP }) {
  const [ld, setLd] = useState(false);
  useEffect(() => { setTimeout(() => setLd(true), 250); }, []);

  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      background: `radial-gradient(ellipse at 25% 40%, ${C.darkGray} 0%, ${C.black} 65%)`,
    }}>
      {/* Crimson glow */}
      <div style={{
        position: "absolute", top: "15%", right: "-8%",
        width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(155,27,27,0.08), transparent 70%)`,
        animation: "pGlow 7s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "25%",
        background: `linear-gradient(transparent, ${C.black})`,
      }} />

      <div className="hg" style={{
        maxWidth: 1160, margin: "0 auto", width: "100%",
        padding: "110px clamp(24px, 5vw, 72px) 70px",
        display: "grid", gridTemplateColumns: "1.1fr 0.9fr",
        gap: "clamp(28px, 5vw, 72px)", alignItems: "center",
        position: "relative", zIndex: 2,
      }}>
        {/* Text */}
        <div style={{
          opacity: ld ? 1 : 0,
          transform: ld ? "translateY(0)" : "translateY(28px)",
          transition: "all 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
        }}>
          <p style={{ ...S.sub, marginBottom: 18 }}>
            Global Entrepreneur &middot; Best-Selling Author
          </p>
          <h1 style={{
            fontSize: "clamp(38px, 6.5vw, 78px)", fontWeight: 400,
            lineHeight: 1.06, letterSpacing: "0.01em", color: C.white,
            marginBottom: 18,
          }}>
            Edwin{" "}
            <span style={{
              fontStyle: "italic",
              background: `linear-gradient(90deg, ${C.crimsonLight}, ${C.white}, ${C.crimsonLight})`,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              animation: "shimmer 6s linear infinite",
            }}>Haynes</span>
          </h1>
          <div style={{ width: 45, height: 3, background: C.crimson, marginBottom: 22, borderRadius: 2 }} />
          <p style={{
            fontSize: "clamp(15px, 1.7vw, 19px)", fontWeight: 300,
            fontStyle: "italic", color: C.silver, maxWidth: 460,
            lineHeight: 1.6, marginBottom: 34,
          }}>
            "Time freedom and money freedom — <br />the #1 lifestyle in the world."
          </p>
          <div className="hbtns" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button style={S.btnF}
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              onMouseEnter={e => e.target.style.background = C.crimsonLight}
              onMouseLeave={e => e.target.style.background = C.crimson}
            >Discover More</button>
            <button style={S.btn}
              onClick={() => { setP("shop"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              onMouseEnter={e => { e.target.style.background = C.crimson; e.target.style.color = C.white; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = C.crimson; }}
            >Visit Shop</button>
          </div>
        </div>

        {/* Photo */}
        <div className="hi" style={{
          position: "relative",
          opacity: ld ? 1 : 0,
          transform: ld ? "scale(1)" : "scale(0.96)",
          transition: "all 1.3s cubic-bezier(0.22, 1, 0.36, 1) 0.25s",
        }}>
          {/* Crimson border glow */}
          <div style={{
            position: "absolute", inset: -4, borderRadius: 12,
            background: `linear-gradient(135deg, ${C.crimson}, transparent 50%, ${C.crimsonDark})`,
            opacity: 0.55,
          }} />
          <img src={HERO} alt="Edwin Haynes"
            style={{
              width: "100%", borderRadius: 10, display: "block",
              position: "relative", zIndex: 1,
              boxShadow: `0 28px 70px rgba(0,0,0,0.6), 0 0 50px ${C.crimsonGlow}`,
            }}
          />
          {/* Corner accents */}
          <div style={{ position: "absolute", top: -10, right: -10, width: 44, height: 44, borderTop: `2px solid ${C.crimson}`, borderRight: `2px solid ${C.crimson}`, zIndex: 2 }} />
          <div style={{ position: "absolute", bottom: -10, left: -10, width: 44, height: 44, borderBottom: `2px solid ${C.crimson}`, borderLeft: `2px solid ${C.crimson}`, zIndex: 2 }} />
        </div>
      </div>

      {/* Scroll */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
        animation: "float 2.5s ease-in-out infinite", zIndex: 3,
      }}>
        <span style={{ ...S.sub, fontSize: 8 }}>Scroll</span>
        <div style={{ width: 1, height: 26, background: `linear-gradient(${C.crimson}, transparent)` }} />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   ABOUT
   ══════════════════════════════════════════════════════════ */
function About() {
  const card = {
    padding: 36, border: `1px solid ${C.crimsonBorder}`,
    background: `linear-gradient(135deg, ${C.charcoal}, ${C.darkGray})`,
    position: "relative", borderRadius: 3,
  };
  return (
    <section id="about" style={{
      padding: "clamp(80px, 10vw, 130px) clamp(24px, 5vw, 72px)",
      background: C.black, position: "relative",
    }}>
      <div style={{ position: "absolute", right: 0, top: 0, width: "30%", height: "100%", background: `linear-gradient(270deg, ${C.crimsonGlow}, transparent)` }} />
      <div style={{ maxWidth: 1060, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <Fade>
          <p style={S.sub}>The Journey</p>
          <h2 style={{ ...S.title, marginBottom: 44 }}>About Edwin</h2>
        </Fade>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap: 40 }}>
          <Fade delay={0.12}><div style={card}>
            <div style={{ position: "absolute", top: -1, left: 36, width: 45, height: 3, background: C.crimson }} />
            <h3 style={{ fontSize: 21, fontWeight: 400, color: C.crimsonLight, marginBottom: 18, fontStyle: "italic" }}>The Mindset of a Global Multi-Millionaire</h3>
            <p style={S.body}>A successful global entrepreneur with businesses in over 50 countries, international business consultant, motivational speaker, Amazon best-selling author, and multi-millionaire — Edwin Haynes has experienced the highest peaks and deepest valleys of success.</p>
            <br /><p style={S.body}>After a successful 13-year career as an Entertainment Executive, Haynes experienced a devastating setback. He fell from millionaire status into foreclosure, bankruptcy, and repossession. But at his worst moment, he refused to let circumstances consume him.</p>
          </div></Fade>
          <Fade delay={0.25}><div style={card}>
            <div style={{ position: "absolute", top: -1, left: 36, width: 45, height: 3, background: C.crimson }} />
            <h3 style={{ fontSize: 21, fontWeight: 400, color: C.crimsonLight, marginBottom: 18, fontStyle: "italic" }}>A Better You</h3>
            <p style={S.body}>Whether at home or jet-setting to the four corners of the globe, Edwin is always learning — reading continuously, listening profoundly, and working to reach his full potential.</p>
            <br /><p style={S.body}>Blessed with the gift of captivating audiences through his down-to-earth and honest style, Edwin positively changes lives daily through powerful messages of faith, encouragement, and empowerment — helping individuals worldwide create multi-millionaire lifestyles.</p>
          </div></Fade>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   PORTFOLIO
   ══════════════════════════════════════════════════════════ */
function Portfolio() {
  const items = [
    { t: "Leadership Training", tag: "Coming Soon", d: "Expert guidance, real-world case studies, personalized mentorship, and a global network of aspiring leaders.", i: "★" },
    { t: "Global Master Ambassador", tag: "Distribution", d: "Founding Member and GMA of a multi-million dollar global network with distributors in 150+ countries.", i: "◆" },
    { t: "John Maxwell Coach", tag: "Leadership", d: "Workshops, seminars, keynote speaking, and coaching through proven leadership methods.", i: "▲" },
    { t: "Healing Hearts Foundation", tag: "Non-Profit", d: "Counseling, education, and restoration for victims — turning heartbreak into healing.", i: "♥" },
  ];
  return (
    <section id="portfolio" style={{
      padding: "clamp(80px, 10vw, 130px) clamp(24px, 5vw, 72px)",
      background: `linear-gradient(180deg, ${C.black}, ${C.charcoal} 50%, ${C.black})`,
    }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        <Fade><div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={S.sub}>Ventures & Impact</p>
          <h2 style={S.title}>Portfolio</h2><div style={S.line} />
        </div></Fade>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 18 }}>
          {items.map((x, i) => (
            <Fade key={x.t} delay={i * 0.08}>
              <div style={{
                padding: 30, border: `1px solid ${C.crimsonBorder}`,
                background: C.charcoal, height: "100%", borderRadius: 3,
                transition: "all 0.35s ease", cursor: "default",
                position: "relative", overflow: "hidden",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.crimson; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.crimsonBorder; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.crimson}, transparent)`, opacity: 0.35 }} />
                <span style={{ fontSize: 24, color: C.crimson, display: "block", marginBottom: 12 }}>{x.i}</span>
                <span style={{ ...S.sub, fontSize: 8, background: C.crimsonGlow, padding: "3px 9px", display: "inline-block", marginBottom: 12, borderRadius: 2 }}>{x.tag}</span>
                <h3 style={{ fontSize: 18, fontWeight: 400, color: C.white, marginBottom: 10, lineHeight: 1.3 }}>{x.t}</h3>
                <p style={{ ...S.body, fontSize: 13, lineHeight: 1.7 }}>{x.d}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   GALLERY
   ══════════════════════════════════════════════════════════ */
function Gallery() {
  const imgs = [
    { s: "https://www.edwinhaynes.com/wp-content/uploads/2022/05/Healthy-Body-Healthy-Mind...Edwin-Haynes-7.png", a: "Healthy Body" },
    { s: "https://www.edwinhaynes.com/wp-content/uploads/2022/05/Print-0010.jpg", a: "Professional" },
    { s: "https://www.edwinhaynes.com/wp-content/uploads/2022/05/Rig-World-Edwin-Haynes-1024x268-1.jpg", a: "Rig World" },
    { s: "https://www.edwinhaynes.com/wp-content/uploads/2022/05/Print-0012.jpg", a: "Portrait" },
  ];
  return (
    <section id="gallery" style={{ padding: "clamp(80px, 10vw, 130px) clamp(24px, 5vw, 72px)", background: C.black }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        <Fade><div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={S.sub}>Moments Captured</p><h2 style={S.title}>Gallery</h2><div style={S.line} />
        </div></Fade>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 12 }}>
          {imgs.map((img, i) => (
            <Fade key={i} delay={i * 0.08}>
              <div style={{
                overflow: "hidden", border: `1px solid ${C.crimsonBorder}`,
                aspectRatio: i === 2 ? "16/7" : "3/4",
                gridColumn: i === 2 ? "1 / -1" : "auto",
                position: "relative", borderRadius: 3,
              }}>
                <img src={img.s} alt={img.a} style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  filter: "grayscale(25%)", transition: "all 0.5s ease",
                }}
                  onMouseEnter={e => { e.target.style.filter = "grayscale(0%)"; e.target.style.transform = "scale(1.04)"; }}
                  onMouseLeave={e => { e.target.style.filter = "grayscale(25%)"; e.target.style.transform = "scale(1)"; }}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: `linear-gradient(transparent, ${C.black}cc)`, pointerEvents: "none" }} />
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   BOOK / TESTIMONIAL
   ══════════════════════════════════════════════════════════ */
function BookSection({ setP }) {
  return (
    <section style={{
      padding: "clamp(80px, 10vw, 130px) clamp(24px, 5vw, 72px)",
      background: `linear-gradient(180deg, ${C.black}, ${C.charcoal})`,
      position: "relative",
    }}>
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 450, height: 450, borderRadius: "50%", background: `radial-gradient(circle, ${C.crimsonGlow}, transparent 70%)`, opacity: 0.6 }} />
      <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <Fade>
          <p style={S.sub}>Amazon Best-Selling Author</p>
          <h2 style={{ ...S.title, marginBottom: 10 }}>"You Have Permission<br />to Succeed"</h2>
          <div style={S.line} />
        </Fade>
        <Fade delay={0.18}>
          <div style={{
            margin: "44px auto", padding: 36,
            border: `1px solid ${C.crimsonBorder}`,
            background: `linear-gradient(135deg, ${C.charcoal}ee, ${C.darkGray}ee)`,
            maxWidth: 660, position: "relative", borderRadius: 3,
          }}>
            <span style={{ position: "absolute", top: 12, left: 20, fontSize: 52, color: C.crimson, opacity: 0.2, fontFamily: "Georgia", lineHeight: 1 }}>"</span>
            <p style={{ ...S.body, fontStyle: "italic", margin: "0 auto", textAlign: "center", fontSize: "clamp(14px, 1.5vw, 17px)" }}>
              The Book "You Have Permission To Succeed" has done just that. My mind has been able to realize higher levels of success and I have been able to see myself doing things bigger and better than I had ever hoped.
            </p>
            <p style={{ color: C.crimsonLight, marginTop: 18, fontFamily: "'Outfit'", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" }}>— Jessica Lauren</p>
          </div>
        </Fade>
        <Fade delay={0.3}>
          <button style={S.btnF}
            onClick={() => { setP("shop"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            onMouseEnter={e => e.target.style.background = C.crimsonLight}
            onMouseLeave={e => e.target.style.background = C.crimson}
          >Purchase the Book — $49</button>
        </Fade>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   CONTACT
   ══════════════════════════════════════════════════════════ */
function Contact() {
  const [form, setForm] = useState({ a: "", b: "", c: "", d: "" });
  const [done, setDone] = useState(false);
  const inp = {
    width: "100%", padding: "13px 15px", background: C.charcoal,
    border: `1px solid ${C.crimsonBorder}`, color: C.white,
    borderRadius: 3, fontFamily: "'Outfit'", fontSize: 13,
    outline: "none", transition: "border-color 0.3s ease",
  };
  return (
    <section id="contact" style={{ padding: "clamp(80px, 10vw, 130px) clamp(24px, 5vw, 72px)", background: C.black }}>
      <div style={{ maxWidth: 660, margin: "0 auto" }}>
        <Fade><div style={{ textAlign: "center", marginBottom: 44 }}>
          <p style={S.sub}>Get In Touch</p><h2 style={S.title}>Contact</h2><div style={S.line} />
          <p style={{ ...S.body, margin: "18px auto 0", textAlign: "center" }}>
            Inquiries for leadership trainings, booking Edwin as a speaker or consultant, or taking your entrepreneurship to the next level.
          </p>
        </div></Fade>
        <Fade delay={0.12}>
          {done ? (
            <div style={{ textAlign: "center", padding: 44, border: `1px solid ${C.crimson}`, background: C.charcoal, borderRadius: 3 }}>
              <span style={{ fontSize: 34, color: C.crimson }}>✓</span>
              <p style={{ ...S.body, margin: "14px auto 0", textAlign: "center" }}>Thank you. Edwin's team will be in touch shortly.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <input style={inp} placeholder="First Name" value={form.a} onChange={e => setForm({ ...form, a: e.target.value })}
                  onFocus={e => e.target.style.borderColor = C.crimson} onBlur={e => e.target.style.borderColor = C.crimsonBorder} />
                <input style={inp} placeholder="Last Name" value={form.b} onChange={e => setForm({ ...form, b: e.target.value })}
                  onFocus={e => e.target.style.borderColor = C.crimson} onBlur={e => e.target.style.borderColor = C.crimsonBorder} />
              </div>
              <input style={inp} placeholder="Email Address" type="email" value={form.c} onChange={e => setForm({ ...form, c: e.target.value })}
                onFocus={e => e.target.style.borderColor = C.crimson} onBlur={e => e.target.style.borderColor = C.crimsonBorder} />
              <textarea style={{ ...inp, minHeight: 120, resize: "vertical" }} placeholder="Your Message" maxLength={500} value={form.d}
                onChange={e => setForm({ ...form, d: e.target.value })}
                onFocus={e => e.target.style.borderColor = C.crimson} onBlur={e => e.target.style.borderColor = C.crimsonBorder} />
              <div style={{ textAlign: "center" }}>
                <button style={S.btnF} onClick={() => setDone(true)}
                  onMouseEnter={e => e.target.style.background = C.crimsonLight}
                  onMouseLeave={e => e.target.style.background = C.crimson}
                >Send Message</button>
              </div>
            </div>
          )}
        </Fade>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════════ */
function Footer({ setP }) {
  return (
    <footer style={{ padding: "40px clamp(24px, 5vw, 72px) 24px", borderTop: `1px solid ${C.crimsonBorder}`, background: C.black }}>
      <div style={{ maxWidth: 1060, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div style={{ cursor: "pointer" }} onClick={() => { setP("main"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <img src={LOGO} alt="Edwin Haynes" style={{ height: 30, filter: "brightness(1.1)" }} />
          <p style={{ fontFamily: "'Outfit'", fontSize: 9, color: C.warmGray, marginTop: 6, letterSpacing: "0.08em" }}>&copy; {new Date().getFullYear()} Edwin Haynes. All Rights Reserved.</p>
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          {["Home", "About", "Shop", "Contact"].map(l => (
            <button key={l} onClick={() => {
              if (l === "Shop") setP("shop"); else setP("main");
              setTimeout(() => {
                if (l === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
                else if (l !== "Shop") document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
                else window.scrollTo({ top: 0, behavior: "smooth" });
              }, 120);
            }} style={{
              background: "none", border: "none", fontFamily: "'Outfit'", fontSize: 10,
              color: C.warmGray, cursor: "pointer", letterSpacing: "0.12em", textTransform: "uppercase",
              transition: "color 0.3s",
            }}
              onMouseEnter={e => e.target.style.color = C.crimsonLight}
              onMouseLeave={e => e.target.style.color = C.warmGray}
            >{l}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { i: <Facebook size={14} />, u: "https://www.facebook.com/edwin.haynes.12" },
            { i: <Twitter size={14} />, u: "https://twitter.com/EdwinHaynes" },
            { i: <Linkedin size={14} />, u: "https://www.linkedin.com/in/edwinhaynes/" },
            { i: <Instagram size={14} />, u: "https://www.instagram.com/edwinfhaynes/" },
          ].map((s, idx) => (
            <a key={idx} href={s.u} target="_blank" rel="noreferrer" style={{
              width: 30, height: 30, borderRadius: "50%", border: `1px solid ${C.crimsonBorder}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: C.warmGray, textDecoration: "none",
              transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.crimson; e.currentTarget.style.color = C.crimsonLight; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.crimsonBorder; e.currentTarget.style.color = C.warmGray; }}
            >{s.i}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════
   SHOP PAGE
   ══════════════════════════════════════════════════════════ */
function ShopPage({ setP }) {
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  return (<>
    <section style={{
      paddingTop: "clamp(110px, 14vw, 170px)", paddingBottom: "clamp(36px, 5vw, 72px)",
      paddingLeft: "clamp(24px, 5vw, 72px)", paddingRight: "clamp(24px, 5vw, 72px)",
      background: `radial-gradient(ellipse at 50% 0%, ${C.darkGray}, ${C.black} 70%)`,
      textAlign: "center",
    }}>
      <Fade><p style={S.sub}>Official Store</p><h1 style={{ ...S.title, fontSize: "clamp(34px, 5.5vw, 58px)" }}>Shop</h1><div style={S.line} /></Fade>
    </section>
    <section style={{ padding: "clamp(36px, 5vw, 90px) clamp(24px, 5vw, 72px)", background: C.black }}>
      <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: 52, alignItems: "start" }}>
        <Fade>
          <div style={{ border: `1px solid ${C.crimsonBorder}`, borderRadius: 5, background: `linear-gradient(135deg, ${C.charcoal}, ${C.darkGray})`, padding: 36, display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "1/1.15" }}>
            <img src="https://www.edwinhaynes.com/wp-content/uploads/2022/05/Screen-Shot-2019-08-23-at-9.25.50-PM.png" alt="Book" style={{ maxWidth: "82%", maxHeight: "88%", objectFit: "contain", filter: "drop-shadow(0 18px 36px rgba(0,0,0,0.5))" }} />
          </div>
        </Fade>
        <Fade delay={0.15}><div>
          <span style={{ ...S.sub, fontSize: 9, background: C.crimsonGlow, padding: "4px 12px", display: "inline-block", marginBottom: 18, borderRadius: 2 }}>Personal Development</span>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 400, color: C.white, lineHeight: 1.2, marginBottom: 10 }}>You Have Permission<br />to Succeed</h2>
          <p style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.warmGray, letterSpacing: "0.08em", marginBottom: 22 }}>by Edwin Haynes</p>
          <div style={{ fontSize: "clamp(30px, 3.5vw, 42px)", fontWeight: 400, color: C.crimsonLight, marginBottom: 24 }}>$49.00</div>
          <div style={{ width: "100%", height: 1, background: C.crimsonBorder, margin: "0 0 24px" }} />
          <p style={{ ...S.body, marginBottom: 28 }}>Edwin Haynes brings laws of economics and common sense together to explain the foundation of his second rise to multi-millionaire status. Each chapter makes it easier to see the bigger picture.</p>
          <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", marginBottom: 28 }}>
            <div style={{ display: "flex", border: `1px solid ${C.crimsonBorder}`, borderRadius: 3 }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 40, height: 40, background: "transparent", border: "none", color: C.crimsonLight, fontSize: 16, cursor: "pointer" }}>−</button>
              <span style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderLeft: `1px solid ${C.crimsonBorder}`, borderRight: `1px solid ${C.crimsonBorder}`, fontFamily: "'Outfit'", fontSize: 13, color: C.white }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ width: 40, height: 40, background: "transparent", border: "none", color: C.crimsonLight, fontSize: 16, cursor: "pointer" }}>+</button>
            </div>
            <button style={{ ...S.btnF, flex: 1, textAlign: "center", minWidth: 180, background: added ? "#2d6a4f" : C.crimson, borderColor: added ? "#2d6a4f" : C.crimson }}
              onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2400); }}
              onMouseEnter={e => { if (!added) e.target.style.background = C.crimsonLight; }}
              onMouseLeave={e => { if (!added) e.target.style.background = C.crimson; }}
            >{added ? "✓  Added to Cart" : "Add to Cart"}</button>
          </div>
          <div style={{ padding: 22, border: `1px solid ${C.crimsonBorder}`, background: C.charcoal, borderRadius: 3 }}>
            {["Amazon Best-Selling Author", "Concise, No-Filler Strategies", "Perfect Paperback Edition", "Includes Suggested Reading"].map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 3 ? `1px solid ${C.crimsonBorder}` : "none" }}>
                <span style={{ color: C.crimson, fontSize: 10 }}>◆</span>
                <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: C.silver, letterSpacing: "0.04em" }}>{h}</span>
              </div>
            ))}
          </div>
        </div></Fade>
      </div>
    </section>
    {/* Testimonials */}
    <section style={{ padding: "clamp(56px, 7vw, 90px) clamp(24px, 5vw, 72px)", background: `linear-gradient(180deg, ${C.black}, ${C.charcoal})` }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Fade><div style={{ textAlign: "center", marginBottom: 44 }}>
          <p style={S.sub}>What Readers Say</p><h2 style={{ ...S.title, fontSize: "clamp(22px, 3vw, 34px)" }}>Testimonials</h2><div style={S.line} />
        </div></Fade>
        {[
          { t: "This book is a great starting point and reference guide. The true strength lies in your desire and ability to personalize the words within.", a: "Joey Pinkney" },
          { t: "My mind has been able to realize higher levels of success and I have been able to see myself doing things bigger and better than I had ever hoped.", a: "Jessica Lauren" },
        ].map((x, i) => (
          <Fade key={i} delay={i * 0.12}>
            <div style={{ padding: "26px 30px", marginBottom: 16, border: `1px solid ${C.crimsonBorder}`, background: `linear-gradient(135deg, ${C.charcoal}dd, ${C.darkGray}dd)`, position: "relative", borderRadius: 3 }}>
              <span style={{ position: "absolute", top: 8, left: 16, fontSize: 38, color: C.crimson, opacity: 0.18, fontFamily: "Georgia", lineHeight: 1 }}>"</span>
              <p style={{ ...S.body, fontStyle: "italic", fontSize: 13, margin: "0 0 8px" }}>{x.t}</p>
              <p style={{ fontFamily: "'Outfit'", fontSize: 9, color: C.crimsonLight, letterSpacing: "0.15em", textTransform: "uppercase" }}>— {x.a}</p>
            </div>
          </Fade>
        ))}
        <Fade delay={0.25}><div style={{ textAlign: "center", marginTop: 32 }}>
          <button style={S.btn}
            onClick={() => { setP("main"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 120); }}
            onMouseEnter={e => { e.target.style.background = C.crimson; e.target.style.color = C.white; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = C.crimson; }}
          >Contact Edwin</button>
        </div></Fade>
      </div>
    </section>
  </>);
}

/* ══════════════════════════════════════════════════════════
   APP ROOT
   ══════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setP] = useState("main");
  return (
    <div style={S.page}>
      <Nav cur={page} setP={setP} />
      {page === "main" ? (
        <><Hero setP={setP} /><About /><Portfolio /><Gallery /><BookSection setP={setP} /><Contact /></>
      ) : (
        <ShopPage setP={setP} />
      )}
      <Footer setP={setP} />
    </div>
  );
}
