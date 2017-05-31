/**
 * Created by zhu on 2017/3/3.
 */
export function convertArrayToColumn(enumType,type) {

  // debugger
  let col = [];
  col[0] = { options: [] };
  let keys = Object.keys(enumType);
  // let length = keys.length / 2;
  let length = keys.length;

  if(type == 1){
    for (let i = 1; i < length; i++) {
      col[0].options.push({
        // text: keys[i + length],
        text: keys[i],
        value: Number.parseInt(keys[i])
      });
    }
    // return col;
  }

  else if(type == 2){
    // let cols = [];
    for (let i = 120; i < length; i++) {
      col[0].options.push({
        text: keys[i],
        // text: Number.parseInt(keys[i]) + 120,
        value: Number.parseInt(keys[i])
      });
    }
    // col[0].options.slice(120,251);
    // console.log(col[0].options.slice(120,251));
  }

  else if(type == 3){
    for (let i = 40; i < length; i++) {
      col[0].options.push({
        text: keys[i],
        // text: Number.parseInt(keys[i]) + 120,
        value: Number.parseInt(keys[i])
      });
    }
  }
  return col;

}
