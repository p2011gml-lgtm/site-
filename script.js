const $=id=>document.getElementById(id);
const phone='5574999373023';
const type=$('siteType'), qtyField=$('quantityField'), qty=$('quantity');
function estimate(){
 const t=type.value; let price=500, label='Site institucional simples';
 qtyField.style.display=(t.toLowerCase().includes('catálogo'))?'flex':'none';
 if(t==='Catálogo digital'){price=qty.value.startsWith('10')?600:qty.value.startsWith('21')?700:800;label='Catálogo digital • '+qty.value;}
 else if(t==='Catálogo completo'){price=qty.value.startsWith('10')?800:qty.value.startsWith('21')?800:qty.value.startsWith('51')?900:1000;label='Catálogo completo • '+qty.value;}
 else if(t==='Landing page'){price=500;label='Landing page';}
 else if(t==='Portfólio'){price=500;label='Portfólio profissional';}
 $('estimatePrice').textContent=price>=1000?'A partir de R$ 1.000,00':price.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
 $('estimateText').textContent=label+' • valor inicial estimado';
}
type.addEventListener('change',estimate);qty.addEventListener('change',estimate);estimate();
document.querySelectorAll('[data-pick]').forEach(btn=>btn.addEventListener('click',()=>{
 $('segment').value=btn.dataset.pick;
 if(btn.dataset.pick==='Outro segmento') $('segment').value='Outro segmento';
 $('orcamento').scrollIntoView({behavior:'smooth'});
}));
function filterTemplates(){
 const q=$('modelSearch').value.toLowerCase().trim(), cat=$('categoryFilter').value;let count=0;
 document.querySelectorAll('.template').forEach(el=>{
 const matchQ=(el.dataset.name+' '+el.innerText).toLowerCase().includes(q);
 const matchC=cat==='all'||el.dataset.cat===cat;
 el.classList.toggle('hidden',!(matchQ&&matchC));if(matchQ&&matchC)count++;
 });
 $('noResults').style.display=count?'none':'block';
}
$('modelSearch').addEventListener('input',filterTemplates);$('categoryFilter').addEventListener('change',filterTemplates);
$('quoteForm').addEventListener('submit',e=>{
 e.preventDefault();
 const selected=[...$('features').selectedOptions].map(o=>o.value);
 const palette=document.querySelector('input[name="palette"]:checked')?.value||'Não definida';
 const t=type.value;let price=$('estimatePrice').textContent;
 const lines=[
 'Olá! Vim pelo site da GB_GITAL e gostaria de solicitar um orçamento.',
 '',
 'DADOS DO CLIENTE',
 'Nome: '+($('clientName').value||'Não informado'),
 'Empresa: '+($('businessName').value||'Não informado'),
 'Segmento: '+($('segment').value||'Não informado'),
 '',
 'MEU PROJETO',
 'Tipo de site: '+t,
 (t.toLowerCase().includes('catálogo')?'Quantidade de produtos: '+qty.value:null),
 'Estilo visual: '+$('style').value,
 'Paleta de cores: '+palette,
 'Funcionalidades: '+(selected.length?selected.join(', '):'A definir'),
 'Manutenção: '+$('maintenanceChoice').value,
 'Estimativa exibida no site: '+price,
 '',
 'Detalhes: '+($('details').value||'Não informado'),
 '',
 'Podemos conversar sobre os próximos passos?'
 ].filter(Boolean);
 const url='https://wa.me/'+phone+'?text='+encodeURIComponent(lines.join('\n'));
 window.open(url,'_blank','noopener');
});
$('year').textContent=new Date().getFullYear();
