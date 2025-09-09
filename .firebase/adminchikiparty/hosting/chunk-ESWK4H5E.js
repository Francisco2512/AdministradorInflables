import{a as L}from"./chunk-QFD2PJNS.js";import{$ as x,Bc as D,Ca as C,Da as o,Db as S,Ea as v,Eb as E,Fb as k,Qa as _,Sa as p,X as u,Za as y,_a as M,a as c,ab as P,b as s,bb as O,cb as r,da as d,db as a,eb as w,ha as h,oc as m,vb as l,w as b,wb as I,xb as F,yc as z,z as g}from"./chunk-FMWBJKOO.js";var j=()=>["/reservaciones"],A=n=>({inflable:n});function R(n,f){n&1&&(r(0,"div",2),l(1," Cargando inflables... "),a())}function T(n,f){if(n&1&&(r(0,"div",4)(1,"div",5),w(2,"img",6),r(3,"div",7)(4,"h5",8),l(5),a(),r(6,"p",9),l(7),a(),r(8,"a",10),l(9," Reservar "),a()()()()),n&2){let t=f.$implicit;o(2),p("src",t.thumb,C),o(3),I(t.title),o(2),F("",t.description,"..."),o(),p("routerLink",E(5,j))("queryParams",k(6,A,t.title))}}var N=(()=>{class n{constructor(t){this.modalService=t,this.http=d(m),this.inflables=[]}abrirReservacion(t){this.modalService.abrirModal(t)}ngOnInit(){this.http.get("https://us-central1-real-courses.cloudfunctions.net/getInflables").subscribe(e=>{e=e.map(i=>s(c({},i),{description:i.description.slice(0,120)})),this.inflables=e},e=>{console.error("Error cargando inflables:",e)})}static{this.\u0275fac=function(e){return new(e||n)(v(L))}}static{this.\u0275cmp=h({type:n,selectors:[["app-lista-inflables"]],standalone:!0,features:[S],decls:7,vars:1,consts:[[1,"container","py-4"],[1,"text-center","text-primary","mb-5"],[1,"text-center","text-muted"],[1,"row"],[1,"col-12","col-sm-6","col-md-4","mb-3"],[1,"card"],["alt","Card image cap",1,"card-img-top","p-2",3,"src"],[1,"card-body"],[1,"card-title"],[1,"card-text"],[1,"btn","btn-primary",3,"routerLink","queryParams"]],template:function(e,i){e&1&&(r(0,"div",0)(1,"h2",1),l(2,"\u{1F389} Inflables Disponibles \u{1F388}"),a(),_(3,R,2,0,"div",2),r(4,"div",3),P(5,T,10,8,"div",4,M),a()()),e&2&&(o(3),y(3,i.inflables.length===0?3:-1),o(2),O(i.inflables))},dependencies:[D,z],styles:[`.container[_ngcontent-%COMP%] {
  max-width: 1200px;
  margin: 0 auto;
}


h2.text-center[_ngcontent-%COMP%] {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
}

.card[_ngcontent-%COMP%] {
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 2px solid #FECACA; 
}

.card[_ngcontent-%COMP%]:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  border-color: #FECACA; 
}


.card-img-top[_ngcontent-%COMP%] {
  border-bottom: 1px solid #eee;
  border-radius: 16px 16px 0 0;
  object-fit: contain; 
  height: 180px;      
  width: 100%;
  background-color: #f8f9fa; 
  display: block;
  padding: 0.5rem;      
}



.card-body[_ngcontent-%COMP%] {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-title[_ngcontent-%COMP%] {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #4B0082; 
}

.card-text[_ngcontent-%COMP%] {
  flex-grow: 1;
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 1rem;
}


.card-body[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {
  background: linear-gradient(90deg, #90C7FE, #85e085);
  border: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.card-body[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover {
  background: linear-gradient(90deg, #66bb66, #1e7e34);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}


.text-center.text-muted[_ngcontent-%COMP%] {
  font-size: 1rem;
  padding: 2rem 0;
  color: #888;
}

@media (max-width: 768px) {
  .card-img-top[_ngcontent-%COMP%] {
    height: 160px;
  }

  .card-title[_ngcontent-%COMP%] {
    font-size: 1.1rem;
  }

  .card-text[_ngcontent-%COMP%] {
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .card-img-top[_ngcontent-%COMP%] {
    height: 140px;
  }

  h2.text-center[_ngcontent-%COMP%] {
    font-size: 2rem;
  }
}`]})}}return n})(),Q=(()=>{class n{constructor(){this.http=d(m),this.inflables=[]}getInflables(){return this.inflables.length>0?b(this.inflables):this.http.get("https://us-central1-real-courses.cloudfunctions.net/getInflables").pipe(g(e=>e.map(i=>s(c({},i),{description:i.description.slice(0,120)}))),u(e=>this.inflables=e))}static{this.\u0275fac=function(e){return new(e||n)}}static{this.\u0275prov=x({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();export{N as a,Q as b};
