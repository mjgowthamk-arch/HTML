// =========================================================================
// JS CONVERSION (String, Number, Array, Object)
// =========================================================================

/* --- 1. FROM STRING --------------------------------------------------- */
const str = "123";
const jsonStr = '{"a":1}';

// String to Number
const strToNum_Explicit = Number(str);                 // 123
const strToNum_Unary    = +str;                        // 123
const strToNum_ParseInt = parseInt("123px", 10);       // 123 (extracts integer)
const strToNum_ParseFlt = parseFloat("12.34px");       // 12.34

// String to Array
const strToArr_Spread   = [..."cat"];                  // ['c', 'a', 't']
const strToArr_From     = Array.from("cat");           // ['c', 'a', 't']
const strToArr_Split    = "a,b,c".split(",");          // ['a', 'b', 'c']

// String to Object
const strToObj_Index    = { ..."cat" };                // { 0:'c', 1:'a', 2:'t' }
const strToObj_JSON     = JSON.parse(jsonStr);         // { a: 1 }


/* --- 2. FROM NUMBER --------------------------------------------------- */
const num = 123.45;

// Number to String
const numToStr_Explicit = String(num);                 // "123.45"
const numToStr_Method   = num.toString();              // "123.45"
const numToStr_Concat   = num + "";                    // "123.45"
const numToStr_Fixed    = num.toFixed(1);              // "123.5" (rounds)

// Number to Array
const numToArr_Wrap     = [num];                       // [123.45]
const numToArr_Digits   = Array.from(String(123), Number); // [1, 2, 3]

// Number to Object
const numToObj_Wrapper  = Object(num);                 // [Number: 123.45]


/* --- 3. FROM ARRAY ---------------------------------------------------- */
const arr = ["a", "b"];
const pairs = [["x", 1], ["y", 2]];

// Array to String
const arrToStr_Explicit = String(arr);                 // 'a,b'
const arrToStr_Native   = arr.toString();              // 'a,b'
const arrToStr_Join     = arr.join("-");               // 'a-b'
const arrToStr_Concat   = arr.join("");                // 'ab'
const arrToStr_JSON     = JSON.stringify(arr);         // '["a","b"]'

// Array to Number
const arrToNum_Single   = Number(["5"]);               // 5 (only works for 1 item)
const arrToNum_Multi    = Number(["5", "6"]);          // NaN

// Array to Object
const arrToObj_Index    = { ...arr };                  // { 0: 'a', 1: 'b' }
const arrToObj_Pairs    = Object.fromEntries(pairs);   // { x: 1, y: 2 }


/* --- 4. FROM OBJECT --------------------------------------------------- */
const obj = { a: 1, b: 2 };

// Object to String
const objToStr_JSON     = JSON.stringify(obj);         // '{"a":1,"b":2}'
const objToStr_Explicit = String(obj);                 // '[object Object]'

// Object to Array
const objToArr_Keys     = Object.keys(obj);            // ['a', 'b']
const objToArr_Vals     = Object.values(obj);          // [1, 2]
const objToArr_Pairs    = Object.entries(obj);         // [['a', 1], ['b', 2]]

// Object to Number
const objToNum_Explicit = Number(obj);                 // NaN (unless valueOf() is overridden)