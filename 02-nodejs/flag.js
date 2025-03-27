const uri='https://api.mangadex.org/chapter/ce597cdf-ae26-43bb-ad0a-0a22433344c3?includes[]=scanlation_group&includes[]=manga&includes[]=user'


fetch(uri,{method:"GET"}).then((r)=>{
    r.json().then((f)=>{
        console.log(JSON.stringify(f));
    })
})