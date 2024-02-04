let n; //length of permutation
let k; //number of excedences
let t1; //indices of excedences
let t2; //indices of non excedences
let sigma = []; //will be filled with 1 to n
let count = 0;
let ps = []; //permutations of sigma will be added here as HTML p elements
let countP;
function setup() {
  createCanvas(0, 0);
  gen(1, 0);

  nInput = createInput("Enter permuation length");
  kInput = createInput("Enter excedences");
  enterButton = createButton("Enter");
  enterButton.mousePressed(enter);
  createDiv(); //seems to be a quick hack to make the permuations display under the buttons and input
}

function draw() {
  background(220);
}

function gen(m, l) {
  let r = m - l;

  // we have found a length n permuation with k excedences
  if (m == n) {
    ps.push(createP(sigma.join("") + " ").style("color", "white"));
    count++;
  } else {
    if (l <= k && m + 1 - l <= n - k) { // condition to apply psi or phi at an excedence
      t2[r + 1 - 1] = m + 1; // "apply psi", does not introduce an excedence
      gen(m + 1, l); 
      for (let w = 1; w <= l; w++) {
        sigma = compose(sigma, fromTrans(t1[w - 1], m + 1)); // apply phi at excedence, does not introduce an excedence
        gen(m + 1, l); // "apply phi at excedence"
        sigma = compose(sigma, fromTrans(t1[w - 1], m + 1)); //undo application of phi
      }
    }
    if (l + 1 <= k && m - l <= n - k) { // condition to apply phi at non excedence
      for (let v = 1; v <= r; v++) {
        t1[l + 1 - 1] = t2[v - 1]; //preparation for excedence that will be introduced
        let temp = t2[v - 1];
        t2[v - 1] = m + 1;
        sigma = compose(sigma, fromTrans(temp, m + 1)); //apply phi at non excedence
        gen(m + 1, l + 1);
        sigma = compose(sigma, fromTrans(temp, m + 1)); // undo phi
        t2[v - 1] = temp; //restore index of non excedences
      }
    }
  }
}

function fromTrans(a, b) { //turn two numbers into a oneline permutation
  let output = [];
  for (let i = 0; i < n; i++) {
    output[i] = i + 1;
  }
  let temp = output[a - 1];
  output[a - 1] = b;
  output[b - 1] = temp;

  return output;
}

function compose(a, b) { //compose two oneline permuations and return result
  let output = [];
  for (let j = 0; j < n; j++) {
    output[j] = a[b[j] - 1];
  }
  return output;
}

function enter() {
  for (let p of ps) { //remove any permuations from last run
    p.remove();
  }
  if (countP) {
    countP.remove();
  }
  //resetting all variables to initial state
  ps = [];
  t1 = [];
  t2 = [1];
  n = nInput.value();
  makeSigma(n);
  k = kInput.value();
  count = 0;
  gen(1, 0);
  createDiv(); //not sure if i need, already have one above
  countP = createP("Count: " + count).style("color", "white");
}

function makeSigma(n) { //create array with numbers 1 through n
  for (let i = 0; i < n; i++) {
    sigma[i] = i + 1;
  }
}

function keyPressed(){
  if(keyCode == 13){
    enter();
  }
}
