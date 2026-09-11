function countVowels(str){
    let count=0;
    let vowels=new Set(['a','e','i','o','u']);
    for (let i of str.toLowerCase()){
        if (vowels.has(i)){
            count+=1;
        }
    }
    return count;
}
console.log(countVowels('AEiou-5'));

// ----------------------------------------

function groupNumbers(arr){
    let obj={
        evens:[], 
        odds:[]
    };
    for (let i of arr){
        if (i%2==0){
            obj.evens.push(i);  // obj['evens:'].push(i); for 'evens'
        }
        else {
            obj.odds.push(i);
        }
    }
    return obj;
}
console.log(groupNumbers([1,2,3,4,5,6,7,8,9,10]));

// ----------------------------------------

function charCount(str){
    let op={};
    for (let i of str){
        if (op[i]===undefined){
            op[i]=1;
        }

        else {
            op[i]+=1;
        }
    }
    return op;
}
console.log(charCount('https://www.programiz.com/javascript/online-compiler/'))

// ----------------------------------------

function findUnique(arr){
  let unq=[];
  let rep=[];
  for (let i of arr){
    if (!unq.includes(i)){
      unq.push(i);
    }
    else {
      rep.push(i);
    }
  }
  return `Unique: ${unq}\nRepeat: ${rep}`;
}
console.log(findUnique([1,2,2,3,4,4,5,6,6,7,8]))

// ----------------------------------------

function fliterandmap(books){
  return books.filter(p=>p.price<500).map(t=>t.title);
}

const books = [
  { id: 1, title: "JavaScript Basics", price: 300 },
  { id: 2, title: "HTML & CSS Guide", price: 150 },
  { id: 3, title: "Node.js Complete", price: 500 },
  { id: 4, title: "React Handbook", price: 200 }
];

console.log(fliterandmap(books));

// ----------------------------------------

function map(a){
  return a.map(i=> ({...i,waranty:'yes'}));
}

const cart2 = [
  { name: "Keyboard", price: 1000, quantity: 2, inStock: true },
  { name: "Mouse", price: 500, quantity: 1, inStock: false },
  { name: "Monitor", price: 8000, quantity: 1, inStock: true }
];

console.log(map(cart2));

// ----------------------------------------

function filterandtotal(a){
  let tot=0;
  for (let key of a){
    tot+=(key.price*key.quantity);
  }
  return tot;
}

const cart = [
  { name: "Keyboard", price: 1000, quantity: 2, inStock: true },
  { name: "Mouse", price: 500, quantity: 1, inStock: false },
  { name: "Monitor", price: 8000, quantity: 1, inStock: true }
];

let filt=cart.filter(stock=>stock.inStock==true);         

console.log( filterandtotal(filt));

// same using reduce

function filterandtotal(a){
  return a.filter(stock=>stock.inStock==true).reduce((sum,item) => sum + item.price*item.quantity, 0);
}

const cart1 = [
  { name: "Keyboard", price: 1000, quantity: 2, inStock: true },
  { name: "Mouse", price: 500, quantity: 1, inStock: false },
  { name: "Monitor", price: 8000, quantity: 1, inStock: true }
];

console.log( filterandtotal(cart1));

// ----------------------------------------

function sumofeven(arr){
  let sum=0;
  for (let i of arr){
    if(i%2==0){
      sum+=i;
    }
  }
  return sum;
}
console.log(sumofeven([1,2,3,4,5,6,7,8]));

// ----------------------------------------

function sumofeven(arr){
  let sum=0;
  for (let i of arr){
    if(i%2==0){
      sum+=i;
    }
  }
  return sum;
}
console.log(sumofeven([1,2,3,4,5,6,7,8]));

// ----------------------------------------

function countLetters(str){
  let obj={};
  for (let i of str){
    if (obj[i]==undefined){    // if (!obj[i]) 
      obj[i]=1;
    }
    else {
      obj[i]+=1
    }
  }
  return obj;
}
console.log(countLetters('banana'));

// ----------------------------------------

function findLargest(arr){
  let maxnum=arr[0];
  for (let i of arr){
    if (i>maxnum){
      maxnum=i;
    }
  }
  return `Largest num is ${maxnum}`;
  
}
console.log(findLargest([155,235,25,355,432,213,112,312,31,231]));

// ----------------------------------------

function reverseString(str) {
  let rev='';
  for (let i of str){
    rev=i+rev;
  }
  return rev;
}
console.log(reverseString("code")); // "edoc"

// ----------------------------------------

function getFirstNonRepeating(str){
  let obj={};
  for (let i of str){
    if (obj[i]){
      obj[i]+=1;
    }
    else{
      obj[i]=1;
    }
  }
  for (let i in obj){
    if(obj[i]==1){
      return i;
    }
  }
  return null;
}
console.log(getFirstNonRepeating('swiss'))

// ----------------------------------------

function flatten(arr){
  let sarr=[];
  for (let i of arr){
    if (Array.isArray(i)) {
      for (let j of i){
        sarr.push(j);
      }
    }
    else{
      sarr.push(i);
    }
  }
  return sarr;
}
console.log(flatten([[1],[1, 2], [], [3, 4], [5, 6]]));

// ----------------------------------------

function anagram(w1, w2) {
  let a = String(w1).toLowerCase();
  let b = String(w2).toLowerCase();

  if (a.length !== b.length) return false;

  let counts = {};
  for (let char of a) {
    if (counts[char]) {
      counts[char] += 1;
    } else {
      counts[char] = 1;
    }
  }

  for (let char of b) {
    if (!counts[char]) {
      return false; 
    }
    counts[char] -= 1;
  }

  return true;
}

console.log(anagram('silent', 'listen')); // true
console.log(anagram('hello', 'world'));   // false

// same using methods

function anagram(w1,w2){
  
  let a=String(w1).toLowerCase().split('').sort().join('');
  let b=String(w2).toLowerCase().split('').sort().join('');

  return a==b;
  
}
console.log(anagram('silent','listen'));

// ----------------------------------------

function palindrome(a) {
  let rev='';
  for (let i of a){
    rev=i+rev;
  }
  return rev===a;
}

console.log(palindrome('racecar')); // true

// same with methods

function palindrome(a) {
  let reversed = a.split('').reverse().join('');
  return a === reversed;
}

console.log(palindrome('racecar')); // true

// ----------------------------------------

function maxRepChr(a){
  let obj={};
  for (let i of a){
    if(!obj[i]){
      obj[i]=1
    }
    else {
      obj[i]+=1
    }
  }
    let maxchr=''
    let maxc=0
    for (let j in obj){
      if (obj[j]>maxc){
        maxc=obj[j]
        maxchr=j
      }
    }
    return maxchr
}
console.log(maxRepChr('ssssccccccccccccwissss'))

// ----------------------------------------

function firstcapital(a){
  let s=a.split(' ')
  let st=[]
  for (let i of s){
    let cap=i[0].toUpperCase()+i.slice(1).toLowerCase();
    st.push(cap)
  }
return st;  
}
console.log(firstcapital('the quick Brown Fox'))

// ----------------------------------------

function secondLargeNum(a){
  let max1=a[0]
  let max2=0
  for (let i of a){
    if (i>max1){
      max2=max1;
      max1=i;
    }
      
    else if (i<max1 && i>max2){
        max2=i;
      }
    }

return max2;  
}
console.log(secondLargeNum([100, 5, 20, 20, 8]))