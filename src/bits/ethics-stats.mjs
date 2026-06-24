// ethics-stats — self-contained stats script for the ethics tracker stats page
export const ethicsStats = {
  render() {
    return `<script>
(function(){
  function pad(n){ return n<10?'0'+n:''+n; }
  function isoDate(d){ return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
  function parseEntry(text){
    var obj={};
    if(!text||!text.trim()) return obj;
    text.trim().split('\\n').forEach(function(l){
      var c=l.indexOf(': ');
      if(c>0) obj[l.slice(0,c).trim()]=l.slice(c+2);
    });
    return obj;
  }
  function fetchEntry(p){
    return fetch('/'+p).then(function(r){ return r.ok?r.text().then(parseEntry):null; }).catch(function(){ return null; });
  }
  function monthDates(){
    var d=new Date(),y=d.getFullYear(),m=d.getMonth(),dates=[];
    var cur=new Date(y,m,1);
    while(cur.getMonth()===m){ dates.push(isoDate(cur)); cur.setDate(cur.getDate()+1); }
    return dates;
  }
  function lastNDates(n){
    var dates=[],d=new Date();
    for(var i=n-1;i>=0;i--){
      var t=new Date(d); t.setDate(d.getDate()-i);
      dates.push(isoDate(t));
    }
    return dates;
  }
  function last12MondayDates(){
    var dates=[],d=new Date();
    var dow=d.getDay()||7;
    var mon=new Date(d); mon.setDate(d.getDate()-(dow-1));
    for(var i=11;i>=0;i--){
      var t=new Date(mon); t.setDate(mon.getDate()-i*7);
      dates.push(isoDate(t));
    }
    return dates;
  }
  function computeStreaks(dateSet,allDates){
    var current=0,longest=0,run=0,recoveries=0,prevMiss=false;
    for(var i=0;i<allDates.length;i++){
      var has=dateSet.has(allDates[i]);
      if(has){ run++; if(prevMiss&&run===1) recoveries++; }
      else{ if(run>longest) longest=run; run=0; }
      prevMiss=!has;
    }
    if(run>longest) longest=run;
    var today=isoDate(new Date());
    var ci=allDates.indexOf(today);
    if(ci>=0&&dateSet.has(today)){
      current=1;
      for(var j=ci-1;j>=0;j--){
        if(dateSet.has(allDates[j])) current++;
        else break;
      }
    }
    return {current:current,longest:longest,recoveries:recoveries};
  }
  function obsRatio(e){
    if(!e) return null;
    var keys=Object.keys(e).filter(function(k){ return /^obs-/.test(k); });
    if(!keys.length) return null;
    var kept=keys.filter(function(k){ return e[k]==='1'||e[k]==='true'; }).length;
    return kept/keys.length;
  }
  function insertAfterSection(sectionId,tagName,attrs){
    var head=document.getElementById(sectionId);
    if(!head) return null;
    var rule=head.nextElementSibling;
    var el=document.createElement(tagName);
    Object.keys(attrs||{}).forEach(function(k){ el.setAttribute(k,attrs[k]); });
    (rule?rule:head).insertAdjacentElement('afterend',el);
    return el;
  }
  function populateCalendar(entryMap){
    var now=new Date(),y=now.getFullYear(),m=now.getMonth();
    var monthLabel=now.toLocaleString('default',{month:'long',year:'numeric'});
    var labelEl=document.getElementById('cal-month-label');
    if(labelEl) labelEl.textContent=monthLabel;
    var firstDay=new Date(y,m,1).getDay();
    var offset=firstDay===0?6:firstDay-1;
    var daysInMonth=new Date(y,m+1,0).getDate();
    var cells=document.querySelectorAll('#cal-grid .cal-cell');
    var dayRatios=[];
    for(var dd=1;dd<=daysInMonth;dd++){
      dayRatios.push(obsRatio(entryMap[y+'-'+pad(m+1)+'-'+pad(dd)]));
    }
    cells.forEach(function(cell,idx){
      var dayNum=idx-offset+1;
      if(idx<offset||dayNum>daysInMonth){ cell.classList.add('empty'); return; }
      cell.classList.remove('empty');
      var dateStr=y+'-'+pad(m+1)+'-'+pad(dayNum);
      var entry=entryMap[dateStr];
      var ratio=obsRatio(entry);
      if(ratio!==null){
        if(ratio>=0.9)       cell.classList.add('green');
        else if(ratio>=0.75) cell.classList.add('light-green');
        else if(ratio>=0.5)  cell.classList.add('amber');
        else if(ratio>=0.25) cell.classList.add('orange');
        else                 cell.classList.add('red');
      }
      cell.querySelector('.cal-cell-num').textContent=dayNum;
      var start=Math.max(0,dayNum-7);
      var slice=dayRatios.slice(start,dayNum).filter(function(r){ return r!==null; });
      if(slice.length){
        var avg=slice.reduce(function(a,b){ return a+b; },0)/slice.length;
        cell.querySelector('.cal-cell-pct').textContent=Math.round(avg*100)+'%';
      }
      if(entry){
        cell.style.cursor='pointer';
        (function(ds,en){
          cell.addEventListener('click',function(){ openModal(ds,en); });
        })(dateStr,entry);
      }
    });
  }
  function openModal(dateStr,entry){
    var overlay=document.getElementById('cal-overlay');
    var modal=document.getElementById('cal-modal');
    var body=document.getElementById('cal-modal-body');
    if(!overlay||!modal||!body) return;
    body.innerHTML='<h3>'+dateStr+'</h3>'+
      Object.entries(entry).map(function(p){
        return '<p><strong>'+p[0]+':</strong> '+p[1]+'</p>';
      }).join('');
    overlay.style.display='';
    modal.style.display='';
    overlay.onclick=closeModal;
    document.getElementById('cal-modal-close').onclick=closeModal;
  }
  function closeModal(){
    var o=document.getElementById('cal-overlay');
    var m=document.getElementById('cal-modal');
    if(o) o.style.display='none';
    if(m) m.style.display='none';
  }
  function populateDomainBars(daily){
    var domains=[
      {name:'consumption',prefix:'hind-consumption-'},
      {name:'speech',     prefix:'hind-speech-'},
      {name:'action',     prefix:'hind-action-'},
      {name:'screen',     prefix:'hind-screen-'}
    ];
    var total=daily.length;
    domains.forEach(function(dom){
      var count=daily.filter(function(e){
        return Object.keys(e).some(function(k){ return k.indexOf(dom.prefix)===0&&e[k]==='true'; });
      }).length;
      var pct=total?Math.round(count/total*100):0;
      document.querySelectorAll('.bar-fill[data-stat-key="domain-'+dom.name+'"]').forEach(function(el){ el.style.width=pct+'%'; });
      document.querySelectorAll('.bar-pct[data-stat-key="domain-'+dom.name+'"]').forEach(function(el){ el.textContent=pct+'%'; });
    });
  }
  function populateMeritRatio(e7,e30){
    function ratio(arr){
      return arr.filter(function(e){ return e.tonight_merits==='true'; }).length+':'+
             arr.filter(function(e){ return e.tonight_demerits==='true'; }).length;
    }
    var el7=document.getElementById('stat-merit-7');
    var el30=document.getElementById('stat-merit-30');
    if(el7)  el7.textContent=ratio(e7);
    if(el30) el30.textContent=ratio(e30);
  }
  function populateHindrances(daily){
    var counts={};
    daily.forEach(function(e){
      Object.keys(e).filter(function(k){ return /^hind-/.test(k)&&e[k]==='true'; }).forEach(function(k){
        counts[k]=(counts[k]||0)+1;
      });
    });
    var sorted=Object.entries(counts).sort(function(a,b){ return b[1]-a[1]; }).slice(0,5);
    function fmtHind(k){ return k.replace(/^hind-[^-]+-/,'').replace(/-/g,' '); }
    var list=insertAfterSection('top-hindrances','ol',{class:'list',style:'margin:1rem 0'});
    if(list) list.innerHTML=sorted.length
      ?sorted.map(function(p){ return '<li>'+fmtHind(p[0])+' — '+p[1]+'\xd7</li>'; }).join('')
      :'<li style="color:var(--dim)">No hindrance data yet.</li>';
  }
  function populateWeeklyLog(pairs){
    var table=insertAfterSection('weekly-log','table',{style:'width:100%;font-size:0.85rem;border-collapse:collapse;margin:1rem 0'});
    if(!table) return;
    var rows=pairs.slice().reverse();
    table.innerHTML='<tr style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--dim)">'+
      '<th style="text-align:left;padding:0.3rem 0.5rem">Week of</th>'+
      '<th style="text-align:left;padding:0.3rem 0.5rem">Root slip</th>'+
      '<th style="text-align:left;padding:0.3rem 0.5rem">Correction</th></tr>'+
      rows.map(function(p){
        var e=p.entry,date=p.date;
        return '<tr style="border-top:1px solid var(--border)">'+
          '<td style="padding:0.4rem 0.5rem;white-space:nowrap">'+date+'</td>'+
          '<td style="padding:0.4rem 0.5rem">'+(e.root_slip||'—')+'</td>'+
          '<td style="padding:0.4rem 0.5rem">'+(e.structural_correction||'—')+'</td></tr>';
      }).join('');
  }
  var allDates=lastNDates(365);
  var thisMo=monthDates();
  var dates30=lastNDates(30);
  var dates7=lastNDates(7);
  Promise.all(allDates.map(function(date){
    return fetchEntry('data/tools/ethics-tracker/daily/'+date+'.md');
  })).then(function(results){
    var dateSet=new Set();
    results.forEach(function(e,i){ if(e) dateSet.add(allDates[i]); });
    var s=computeStreaks(dateSet,allDates);
    var elCur=document.getElementById('stat-streak-current');
    var elLong=document.getElementById('stat-streak-longest');
    var elRec=document.getElementById('stat-recoveries');
    if(elCur)  elCur.textContent=s.current;
    if(elLong) elLong.textContent=s.longest;
    if(elRec)  elRec.textContent=s.recoveries;
    var moStart=allDates.indexOf(thisMo[0]);
    var moSlice=moStart>=0?results.slice(moStart,moStart+thisMo.length):[];
    var entryMap={};
    moSlice.forEach(function(e,i){ if(e) entryMap[thisMo[i]]=e; });
    var moEntries=moSlice.filter(Boolean);
    populateCalendar(entryMap);
    populateDomainBars(moEntries);
    populateHindrances(moEntries);
    var s30=allDates.indexOf(dates30[0]);
    var s7=allDates.indexOf(dates7[0]);
    var e30=s30>=0?results.slice(s30,s30+30).filter(Boolean):[];
    var e7=s7>=0?results.slice(s7,s7+7).filter(Boolean):[];
    populateMeritRatio(e7,e30);
  });
  var mondayDates=last12MondayDates();
  Promise.all(mondayDates.map(function(date){
    return fetchEntry('data/tools/ethics-tracker/weekly/'+date+'.md');
  })).then(function(results){
    var pairs=results.map(function(e,i){ return e?{date:mondayDates[i],entry:e}:null; }).filter(Boolean);
    populateWeeklyLog(pairs);
  });
})();
</script>`;
  }
};
