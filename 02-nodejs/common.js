const fs = require('fs');

const readFile=(dir)=>{
  try {
    const data = fs.readFileSync(dir, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}


export default{readFile}