import{a as F}from"./chunk-BTN3WKRV.js";import{e as S,h as E}from"./chunk-SFPUYBVI.js";import{$b as O,Ab as o,Bb as _,Sb as a,Tb as M,Ua as g,Ub as y,Vc as I,Wa as r,Xa as b,_b as P,a as s,ac as w,b as m,lb as x,nb as c,sa as p,ub as u,vb as h,xa as f,xb as C,yb as v,zb as i}from"./chunk-6NT6WMN2.js";var k=()=>["/reservaciones"],z=n=>({inflable:n});function D(n,d){n&1&&(i(0,"div",2),a(1," Cargando inflables... "),o())}function L(n,d){if(n&1&&(i(0,"div",4)(1,"div",5),_(2,"img",6),i(3,"div",7)(4,"h5",8),a(5),o(),i(6,"p",9),a(7),o(),i(8,"a",10),a(9," Reservar "),o()()()()),n&2){let e=d.$implicit;r(2),c("src",e.thumb,g),r(3),M(e.title),r(2),y("",e.description,"..."),r(),c("routerLink",O(5,k))("queryParams",w(6,z,e.title))}}var H=(()=>{class n{constructor(e){this.modalService=e,this.http=p(I),this.inflables=[]}abrirReservacion(e){this.modalService.abrirModal(e)}ngOnInit(){this.http.get("https://us-central1-real-courses.cloudfunctions.net/getInflables").subscribe(t=>{t=t.map(l=>m(s({},l),{description:l.description.slice(0,120)})),this.inflables=t},t=>{console.error("Error cargando inflables:",t)})}static{this.\u0275fac=function(t){return new(t||n)(b(F))}}static{this.\u0275cmp=f({type:n,selectors:[["app-lista-inflables"]],standalone:!0,features:[P],decls:7,vars:1,consts:[[1,"container","py-4"],[1,"text-center","text-primary","mb-5"],[1,"text-center","text-muted"],[1,"row"],[1,"col-12","col-sm-6","col-md-4","mb-3"],[1,"card"],["alt","Card image cap",1,"card-img-top","p-2",3,"src"],[1,"card-body"],[1,"card-title"],[1,"card-text"],[1,"btn","btn-primary",3,"routerLink","queryParams"]],template:function(t,l){t&1&&(i(0,"div",0)(1,"h2",1),a(2,"\u{1F389} Inflables Disponibles \u{1F388}"),o(),x(3,D,2,0,"div",2),i(4,"div",3),C(5,L,10,8,"div",4,h),o()()),t&2&&(r(3),u(3,l.inflables.length===0?3:-1),r(2),v(l.inflables))},dependencies:[E,S],styles:[`.container[_ngcontent-%COMP%] {
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
}`]})}}return n})();export{H as ListaInflablesComponent};
