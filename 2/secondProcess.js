fetch('http://localhost:3000/getClicks',{method:"GET"}).then((r)=>{
    r?.text()?.then((y)=>{console.log(y)})
})