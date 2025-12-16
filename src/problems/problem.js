

export const problems = [
  // 1
  {
    id: 1,
    title: "Sum of Two Numbers",
    difficulty: "Easy",
    description: "Given two numbers a and b, return their sum.",
    sampleInput: { a: 4, b: 5 },
    expectedOutput: "9",
    testCases: [
      { input: { a: 4, b: 5 }, expectedOutput: "9" },
      { input: { a: 10, b: 11 }, expectedOutput: "21" }
    ],
    languages: {
      java: {
        starterCode: `
public static int sum(int a, int b) {
    // your code
}
        `,
        build: (fnCode) => `
import java.util.*;
public class Main {
    ${fnCode}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long a = sc.nextLong();
        long b = sc.nextLong();
        System.out.println(sum((int)a, (int)b));
    }
}
        `
      },
      python: {
        starterCode: `
def sum(a, b):
    # your code pass
    
        `,
        build: (fnCode) => `
${fnCode}

if __name__ == "__main__":
    import sys
    data = sys.stdin.read().strip().split()
    a = int(data[0]); b = int(data[1])
    print(sum(a, b))
        `
      },
      cpp: {
        starterCode: `
int sum(int a, int b) {
    // your code
}
        `,
        build: (fnCode) => `
#include <bits/stdc++.h>
using namespace std;
${fnCode}
int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int a,b; if(!(cin>>a>>b)) return 0;
    cout<<sum(a,b)<<"\n";
    return 0;
}
        `
      },
      javascript: {
        starterCode: `
function sum(a, b) {
  // your code
}
        `,
        build: (fnCode) => `
${fnCode}
const fs = require("fs");
const data = fs.readFileSync(0,"utf8").trim().split(/\\s+/);
const a = parseInt(data[0]), b = parseInt(data[1]);
console.log(sum(a,b));
        `
      }
    }
  },

  // 2
  {
    id: 2,
    title: "Reverse String",
    difficulty: "Easy",
    description: "Given a string s, return the reversed string.",
    sampleInput: { s: "hello" },
    expectedOutput: "olleh",
    testCases: [
      { input: { s: "hello" }, expectedOutput: "olleh" },
      { input: { s: "OpenAI" }, expectedOutput: "IAnepO" }
    ],
    languages: {
      java: {
        starterCode: `
public static String reverseString(String s) {
    // your code
}
        `,
        build: (fnCode) => `
import java.util.*;
public class Main {
    ${fnCode}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = "";
        if (sc.hasNextLine()) s = sc.nextLine();
        System.out.println(reverseString(s));
    }
}
        `
      },
      python: {
        starterCode: `
def reverse_string(s):
    # your code pass
    
        `,
        build: (fnCode) => `
${fnCode}

if __name__ == "__main__":
    import sys
    s = sys.stdin.read()
    if s.endswith("\\n"): s = s[:-1]
    print(reverse_string(s))
        `
      },
      cpp: {
        starterCode: `
string reverseString(string s) {
    // your code
}
        `,
        build: (fnCode) => `
#include <bits/stdc++.h>
using namespace std;
${fnCode}
int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    getline(cin, s);
    cout<<reverseString(s)<<"\n";
    return 0;
}
        `
      },
      javascript: {
        starterCode: `
function reverseString(s){
  // your code
}
        `,
        build: (fnCode) => `
${fnCode}
const fs = require("fs");
let s = fs.readFileSync(0,"utf8");
if (s.endsWith("\\n")) s = s.slice(0,-1);
console.log(reverseString(s));
        `
      }
    }
  },

  // 3
  {
    id: 3,
    title: "Factorial",
    difficulty: "Medium",
    description: "Given a non-negative integer n, return its factorial.",
    sampleInput: { n: 5 },
    expectedOutput: "120",
    testCases: [
      { input: { n: 5 }, expectedOutput: "120" },
      { input: { n: 0 }, expectedOutput: "1" }
    ],
    languages: {
      java: {
        starterCode: `
public static long factorial(int n) {
    // your code
}
        `,
        build: (fnCode) => `
import java.util.*;
public class Main {
    ${fnCode}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(factorial(n));
    }
}
        `
      },
      python: {
        starterCode: `
def factorial(n):
    # your code pass
    
        `,
        build: (fnCode) => `
${fnCode}
if __name__ == "__main__":
    import sys
    n = int(sys.stdin.read().strip())
    print(factorial(n))
        `
      },
      cpp: {
        starterCode: `
long long factorial(int n) {
    // your code
}
        `,
        build: (fnCode) => `
#include <bits/stdc++.h>
using namespace std;
${fnCode}
int main(){
    int n; if(!(cin>>n)) return 0;
    cout<<factorial(n)<<"\n";
    return 0;
}
        `
      },
      javascript: {
        starterCode: `
function factorial(n){
  // your code
}
        `,
        build: (fnCode) => `
${fnCode}
const n = parseInt(require("fs").readFileSync(0,"utf8").trim());
console.log(factorial(n));
        `
      }
    }
  },

  // 4
  {
    id: 4,
    title: "Check Prime",
    difficulty: "Medium",
    description: "Return true if the given integer n (>1) is prime, else false.",
    sampleInput: { n: 7 },
    expectedOutput: "true",
    testCases: [
      { input: { n: 2 }, expectedOutput: "true" },
      { input: { n: 4 }, expectedOutput: "false" }
    ],
    languages: {
      java: {
        starterCode: `
public static boolean isPrime(int n) {
    // your code
}
        `,
        build: (fnCode) => `
import java.util.*;
public class Main {
    ${fnCode}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(isPrime(n));
    }
}
        `
      },
      python: {
        starterCode: `
def is_prime(n):
    # your code pass

        `,
        build: (fnCode) => `
${fnCode}
if __name__ == "__main__":
    import sys
    print(is_prime(int(sys.stdin.read().strip())))
        `
      },
      cpp: {
        starterCode: `
bool isPrime(int n) {
    // your code
}
        `,
        build: (fnCode) => `
#include <bits/stdc++.h>
using namespace std;
${fnCode}
int main(){
    int n; if(!(cin>>n)) return 0;
    cout<<(isPrime(n) ? "true" : "false") << "\\n";
    return 0;
}
        `
      },
      javascript: {
        starterCode: `
function isPrime(n){
  // your code
}
        `,
        build: (fnCode) => `
${fnCode}
const n = parseInt(require("fs").readFileSync(0,"utf8").trim());
console.log(isPrime(n) ? "true" : "false");
        `
      }
    }
  },

  // 5
  {
    id: 5,
    title: "Nth Fibonacci",
    difficulty: "Medium",
    description: "Return the nth Fibonacci number (0-indexed).",
    sampleInput: { n: 7 },
    expectedOutput: "13",
    testCases: [
      { input: { n: 7 }, expectedOutput: "13" },
      { input: { n: 10 }, expectedOutput: "55" }
    ],
    languages: {
      java: {
        starterCode: `
public static long fibonacci(int n) {
    // your code
}
        `,
        build: (fnCode) => `
import java.util.*;
public class Main {
    ${fnCode}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(fibonacci(n));
    }
}
        `
      },
      python: {
        starterCode: `
def fibonacci(n):
    # your code pass
    
        `,
        build: (fnCode) => `
${fnCode}
if __name__ == "__main__":
    import sys
    print(fibonacci(int(sys.stdin.read().strip())))
        `
      },
      cpp: {
        starterCode: `
long long fibonacci(int n) {
    // your code
}
        `,
        build: (fnCode) => `
#include <bits/stdc++.h>
using namespace std;
${fnCode}
int main(){
    int n; if(!(cin>>n)) return 0;
    cout<<fibonacci(n)<<"\n";
    return 0;
}
        `
      },
      javascript: {
        starterCode: `
function fibonacci(n){
  // your code
}
        `,
        build: (fnCode) => `
${fnCode}
const n = parseInt(require("fs").readFileSync(0,"utf8").trim());
console.log(fibonacci(n));
        `
      }
    }
  },

  // 6
  {
    id: 6,
    title: "Count Vowels",
    difficulty: "Easy",
    description: "Count the number of vowels (a,e,i,o,u) in the given string (case-insensitive).",
    sampleInput: { s: "hello" },
    expectedOutput: "2",
    testCases: [
      { input: { s: "hello" }, expectedOutput: "2" },
      { input: { s: "OpenAI" }, expectedOutput: "3" }
    ],
    languages: {
      java: {
        starterCode: `
public static int countVowels(String s) {
    // your code
}
        `,
        build: (fnCode) => `
import java.util.*;
public class Main {
    ${fnCode}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = "";
        if (sc.hasNextLine()) s = sc.nextLine();
        System.out.println(countVowels(s));
    }
}
        `
      },
      python: {
        starterCode: `
def count_vowels(s):
    # your code
    pass
        `,
        build: (fnCode) => `
${fnCode}
if __name__ == "__main__":
    import sys
    s = sys.stdin.read()
    if s.endswith("\\n"): s = s[:-1]
    print(count_vowels(s))
        `
      },
      cpp: {
        starterCode: `
int countVowels(string s) {
    // your code
}
        `,
        build: (fnCode) => `
#include <bits/stdc++.h>
using namespace std;
${fnCode}
int main(){
    string s;
    getline(cin, s);
    cout<<countVowels(s)<<"\n";
    return 0;
}
        `
      },
      javascript: {
        starterCode: `
function countVowels(s){
  // your code
}
        `,
        build: (fnCode) => `
${fnCode}
let s = require("fs").readFileSync(0,"utf8");
if (s.endsWith("\\n")) s = s.slice(0,-1);
console.log(countVowels(s));
        `
      }
    }
  },

  // 7
  {
    id: 7,
    title: "Palindrome Number",
    difficulty: "Easy",
    description: "Check if a number is a palindrome. Return true/false.",
    sampleInput: { n: 121 },
    expectedOutput: "true",
    testCases: [
      { input: { n: 121 }, expectedOutput: "true" },
      { input: { n: 123 }, expectedOutput: "false" }
    ],
    languages: {
      java: {
        starterCode: `
public static boolean isPalindromeNumber(int n) {
    // your code
}
        `,
        build: (fnCode) => `
import java.util.*;
public class Main {
    ${fnCode}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(isPalindromeNumber(n));
    }
}
        `
      },
      python: {
        starterCode: `
def is_palindrome_number(n):
    # your code
    pass
        `,
        build: (fnCode) => `
${fnCode}
if __name__ == "__main__":
    import sys
    print(is_palindrome_number(int(sys.stdin.read().strip())))
        `
      },
      cpp: {
        starterCode: `
bool isPalindromeNumber(int n){
    // your code
}
        `,
        build: (fnCode) => `
#include <bits/stdc++.h>
using namespace std;
${fnCode}
int main(){
    int n; if(!(cin>>n)) return 0;
    cout<<(isPalindromeNumber(n) ? "true" : "false")<<"\n";
    return 0;
}
        `
      },
      javascript: {
        starterCode: `
function isPalindromeNumber(n){
  // your code
}
        `,
        build: (fnCode) => `
${fnCode}
const n = parseInt(require("fs").readFileSync(0,"utf8").trim());
console.log(isPalindromeNumber(n) ? "true" : "false");
        `
      }
    }
  },

  // 8
  {
    id: 8,
    title: "Sum of Array",
    difficulty: "Medium",
    description: "Given an array of integers, return the sum of all elements.",
    sampleInput: { arr: [1, 2, 3, 4, 5] },
    expectedOutput: "15",
    testCases: [
      { input: { arr: [1, 2, 3, 4, 5] }, expectedOutput: "15" },
      { input: { arr: [10, 20, 30] }, expectedOutput: "60" }
    ],
    languages: {
      java: {
        starterCode: `
public static long sumArray(int[] arr) {
    // your code
}
        `,
        build: (fnCode) => `
import java.util.*;
public class Main {
    ${fnCode}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
String input = sc.nextLine();
String[] nums = input.trim().split("[ ,]+");  // split by space OR comma

int[] arr = Arrays.stream(nums)
                  .mapToInt(Integer::parseInt)
                  .toArray();

System.out.println(sumArray(arr));
    }
}
        `
      },
      python: {
        starterCode: `
def sum_array(arr):
    # your code
    pass
        `,
        build: (fnCode) => `
${fnCode}
if __name__ == "__main__":
    import sys, re
    data = sys.stdin.read().strip()
    if not data:
        print(0)
    else:
        parts = re.split(r"[,\s]+", data)
        arr = list(map(int, parts))
        print(sum_array(arr))
        `
      },
      cpp: {
        starterCode: `
long long sumArray(const vector<int>& arr) {
    // your code
}
        `,
        build: (fnCode) => `
#include <bits/stdc++.h>
using namespace std;
${fnCode}
int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<int> arr; int x;
    while(cin>>x) arr.push_back(x);
    cout<<sumArray(arr)<<"\n";
    return 0;
}
        `
      },
      javascript: {
        starterCode: `
function sumArray(arr){
  // your code
}
        `,
        build: (fnCode) => `
${fnCode}
const arr = require("fs").readFileSync(0,"utf8").trim().split(/\\s+/).filter(Boolean).map(Number);
console.log(sumArray(arr));
        `
      }
    }
  },

  // 9
  {
    id: 9,
    title: "Find Maximum",
    difficulty: "Easy",
    description: "Given an array of integers, return the maximum element.",
    sampleInput: { arr: [1, 5, 3, 9, 2] },
    expectedOutput: "9",
    testCases: [
      { input: { arr: [1, 5, 3, 9, 2] }, expectedOutput: "9" },
      { input: { arr: [10, 20, 5] }, expectedOutput: "20" }
    ],
    languages: {
      java: {
        starterCode: `
public static int findMax(int[] arr) {
    // your code
}
        `,
        build: (fnCode) => `
import java.util.*;
public class Main {
    ${fnCode}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Integer> vals = new ArrayList<>();
        while (sc.hasNextInt()) vals.add(sc.nextInt());
        int[] arr = vals.stream().mapToInt(i->i).toArray();
        System.out.println(findMax(arr));
    }
}
        `
      },
      python: {
        starterCode: `
def find_max(arr):
    # your code
    pass
        `,
        build: (fnCode) => `
${fnCode}
if __name__ == "__main__":
    import sys
    arr = list(map(int, sys.stdin.read().strip().split()))
    print(find_max(arr))
        `
      },
      cpp: {
        starterCode: `
int findMax(const vector<int>& arr) {
    // your code
}
        `,
        build: (fnCode) => `
#include <bits/stdc++.h>
using namespace std;
${fnCode}
int main(){
    vector<int> arr; int x;
    while(cin>>x) arr.push_back(x);
    cout<<findMax(arr)<<"\n";
    return 0;
}
        `
      },
      javascript: {
        starterCode: `
function findMax(arr){
  // your code
}
        `,
        build: (fnCode) => `
${fnCode}
const arr = require("fs").readFileSync(0,"utf8").trim().split(/\\s+/).map(Number);
console.log(findMax(arr));
        `
      }
    }
  },

  // 10
  {
    id: 10,
    title: "Count Words",
    difficulty: "Easy",
    description: "Count the number of words in a given string (words separated by whitespace).",
    sampleInput: { s: "Hello world from OpenAI" },
    expectedOutput: "4",
    testCases: [
      { input: { s: "Hello world" }, expectedOutput: "2" },
      { input: { s: "This is a test" }, expectedOutput: "4" }
    ],
    languages: {
      java: {
        starterCode: `
public static int countWords(String s) {
    // your code
}
        `,
        build: (fnCode) => `
import java.util.*;
public class Main {
    ${fnCode}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = "";
        if (sc.hasNextLine()) input = sc.nextLine();
        System.out.println(countWords(input));
    }
}
        `
      },
      python: {
        starterCode: `
def count_words(s):
    # your code
    pass
        `,
        build: (fnCode) => `
${fnCode}
if __name__ == "__main__":
    import sys
    s = sys.stdin.read()
    if s.endswith("\\n"): s = s[:-1]
    print(count_words(s))
        `
      },
      cpp: {
        starterCode: `
int countWords(const std::string& s) {
    // your code here
}
`,

build: (fnCode) => `
#include <bits/stdc++.h>
using namespace std;

${fnCode}

int main() {
    string s;
    getline(cin, s);               // read whole line safely
    cout << countWords(s) << endl; // output result
    return 0;
}
`
      },
      javascript: {
        starterCode: `
function countWords(s){
  // your code
}
        `,
        build: (fnCode) => `
${fnCode}
let s = require("fs").readFileSync(0,"utf8");
if (s.endsWith("\\n")) s = s.slice(0,-1);
console.log(countWords(s));
        `
      }
    }
  }
];
