import{c as o}from"./createLucideIcon.D53Z05nL.js";import{j as c}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.CRVbtxaI.js";/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=[["path",{d:"M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2",key:"4b9dqc"}],["path",{d:"M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2",key:"22nnkd"}],["path",{d:"M6 6h.01",key:"1utrut"}],["path",{d:"M6 18h.01",key:"uhywen"}],["path",{d:"m13 6-4 6h6l-4 6",key:"14hqih"}]],v=o("server-crash",i);function h(){const e=s.useRef(null);return s.useEffect(()=>{const t=new IntersectionObserver(([r])=>{r.isIntersecting&&(r.target.classList.add("visible"),t.unobserve(r.target))},{threshold:.1});return e.current&&t.observe(e.current),()=>{e.current&&t.unobserve(e.current)}},[]),e}const p=({children:e,className:t="",delay:r=0})=>{const a=h(),n=r>0?`fade-in-delay-${Math.min(r,3)}`:"";return c.jsx("div",{ref:a,className:`fade-in ${n} ${t}`,children:e})};export{p as F,v as S};
