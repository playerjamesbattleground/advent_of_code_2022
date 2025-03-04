import fs from 'fs'

const inputs = fs.readFileSync('input.txt').toString().split(/\r?\n/);
const xEdges = [3994992, 0]
const yEdges = [0, 0]
type SBCoords = [sx: number, sy: number, bx: number, by: number]
const locs: Array<SBCoords> = []
const sensors: {[y: string]: number[]} = {}
const beacons: {[y: string]: number[]} = {}
inputs.forEach(line => {
  const pairLoc = line.match(/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/)
  
  if (pairLoc && pairLoc.length > 3 && [pairLoc[1], pairLoc[2], pairLoc[3], pairLoc[4]].filter(v => Number.isInteger(v)).length == 0) {
    
    const nLoc = [pairLoc[1], pairLoc[2], pairLoc[3], pairLoc[4]].map(v => Number(v))
    if(nLoc.length == 4) { 
      locs.push([nLoc[0], nLoc[1], nLoc[2], nLoc[3]]) 
    }
    const xl = Math.min(nLoc[0], nLoc[2])
    const xg = Math.max(nLoc[0], nLoc[2])
    const yl = Math.min(nLoc[1], nLoc[3])
    const yg = Math.max(nLoc[1], nLoc[3])
    if (xl < xEdges[0]) { xEdges[0] =  xl}
    if (xg > xEdges[1]) { xEdges[1] = xg  }
    if (yl < yEdges[0]) { yEdges[0] = yl}
    if (yg > yEdges[1]) { yEdges[1] = yg }
    if (sensors[nLoc[1]]) {
      if (!sensors[nLoc[1]].some(v => v === nLoc[0])) {
        sensors[nLoc[1]].push(nLoc[0])
      }
    } else {
      sensors[nLoc[1]] = [nLoc[0]]
    }
    if (beacons[nLoc[3]]) {
      if (!beacons[nLoc[3]].some(v => v === nLoc[2])) {
        beacons[nLoc[3]].push(nLoc[2])
      }
    } else {
      beacons[nLoc[3]] = [nLoc[2]]
    }
    
  }
})
// edge values based on coords
//console.log(locs)
//console.log(xEdges, yEdges)

// hi Hermann Minkowski
const dist = (sx: number, sy: number, bx: number, by: number) => Math.abs(bx-sx) + Math.abs(by - sy)
//let y = 10
let y = 2000000
const coverY: Set<string> = new Set()
locs.forEach((loc, idx) => {
  const reach = dist(...loc)
  const up = loc[1] - reach
  const down = loc[1] + reach
  if ((loc[1] < y && down  < y ) || (loc[1] > y && up > y )) {
    return
  } else {
    const toY = Math.abs(loc[1] - y)
    //console.log(loc, ' can cover the given y  ', y, ' with ', reach, ' toY ', toY)
  
    // from sensor's Y, every next row is 2 squares less than previous, symmetrically
    const cover = (reach - toY)
    for(let r = loc[0] - cover; r <= loc[0] + cover; r++) {
      if (beacons[y] && !beacons[y].some(v => v == r)) {
        coverY.add(`${r}_${y}`)
      }
      
    }

  }
  
 
})
// part 1
console.log(coverY.size)



