import{k as p,l as u,r as f,j as o}from"./index-e0f05c57.js";const E=n=>{const{children:a,reducers:t,removeAfterUnmount:d=!0}=n,r=p(),s=u();return f.useEffect(()=>{const i=r.reducerManager.getMountedReducers();return Object.entries(t).forEach(([e,c])=>{i[e]||(r.reducerManager.add(e,c),s({type:`@INIT ${e} reducer`}))}),()=>{d&&Object.entries(t).forEach(([e,c])=>{r.reducerManager.remove(e),s({type:`@DESTROY ${e} reducer`})})}},[]),o.jsx(o.Fragment,{children:a})},g=()=>u();export{E as D,g as u};
