import fs from 'fs';

const output = fs.readFileSync('input.txt').toString().split(/\r?\n/);
let counter = 0;
output.forEach(pair => {
  const[e1, e2] = pair.split(',')
  const [e1l, e1r] = e1.split('-')
  const [e2l, e2r] = e2.split('-')
  if(e1l && e1r && e2l && e2r) {
    const sorted = [e1l, e1r, e2l, e2r]
    sorted.sort((a,b) => 
      Number(a) > Number(b) ? 1 : -1
    )
    if((e1l == sorted[0] && e1r == sorted[3]) || (e2l == sorted[0] && e2r == sorted[3]) ) {
      console.log('contains pair ', sorted)
      counter += 1
    }
  }
})

console.log(counter)
