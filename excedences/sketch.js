let n;
let k;
let t1; //indices of excedences
let t2; //indices of non excedences
let sigma = [];
let count = 0;
let ps = [];
let countP;
function setup() {
  createCanvas(0, 0);
  gen(1, 0);
  console.log(count);
  nInput = createInput("Enter permuation length");
  kInput = createInput("Enter excedences");
  enterButton = createButton("Enter");
  enterButton.mousePressed(enter);
  createDiv();
}

function draw() {
  background(220);
}

function gen(m, l) {
  let r = m - l;
  if (m == n) {
    //console.log(sigma);
    ps.push(createP(sigma.join("") + " ").style("color", "white"));
    count++;
  } else {
    if (l <= k && m + 1 - l <= n - k) {
      t2[r + 1 - 1] = m + 1;
      gen(m + 1, l);
      for (let w = 1; w <= l; w++) {
        sigma = compose(sigma, fromTrans(t1[w - 1], m + 1));
        gen(m + 1, l);
        sigma = compose(sigma, fromTrans(t1[w - 1], m + 1));
      }
    }
    if (l + 1 <= k && m - l <= n - k) {
      for (let v = 1; v <= r; v++) {
        t1[l + 1 - 1] = t2[v - 1];
        let temp = t2[v - 1];
        t2[v - 1] = m + 1;
        sigma = compose(sigma, fromTrans(temp, m + 1));
        gen(m + 1, l + 1);
        sigma = compose(sigma, fromTrans(temp, m + 1));
        t2[v - 1] = temp;
      }
    }
  }
}

function fromTrans(a, b) {
  let output = [];
  for (let i = 0; i < n; i++) {
    output[i] = i + 1;
  }
  let temp = output[a - 1];
  output[a - 1] = b;
  output[b - 1] = temp;

  return output;
}

function compose(a, b) {
  let output = [];
  for (let j = 0; j < n; j++) {
    output[j] = a[b[j] - 1];
  }
  return output;
}

function enter() {
  for (let p of ps) {
    p.remove();
  }
  if(countP){
      countP.remove();
  }

  ps = [];
  t1 = [];
  t2 = [1];
  n = nInput.value();
  makeSigma(n);
  k = kInput.value();
  count = 0;
  gen(1, 0);
  createDiv();
  countP = createP("Count: " + count).style("color","white");
}

function makeSigma(n) {
  for (let i = 0; i < n; i++) {
    sigma[i] = i + 1;
  }
}
