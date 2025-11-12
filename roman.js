// Conversion Function
function romanToInt(roman) {
  const values = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };

  // Validate input
  if (!roman || roman.trim() === "") {
    return "Invalid input: empty value";
  }

  // Ensure all characters are valid Roman numerals
  for (let char of roman) {
    if (!values[char]) {
      return `Invalid input: '${char}' is not a Roman numeral`;
    }
  }

  // Basic invalid repetition check (VV, LL, DD not allowed)
  if (/VV|LL|DD/.test(roman)) {
    return "Invalid input: invalid repetition of symbols (VV, LL, DD)";
  }

  // Conversion logic
  let total = 0, prev = 0;
  for (let i = roman.length - 1; i >= 0; i--) {
    const curr = values[roman[i]];
    if (curr < prev) total -= curr;
    else { total += curr; prev = curr; }
  }
  return total;
}


function runTests() {
  const tests = [
    { input: "I", expected: 1 },
    { input: "V", expected: 5 },
    { input: "X", expected: 10 },
    { input: "XI", expected: 11 },
    { input: "IV", expected: 4 },
    { input: "XIV", expected: 14 },
    { input: "II", expected: 2 },
    { input: "Z", expected: "Invalid input: 'Z' is not a Roman numeral" },
    { input: "XIZ", expected: "Invalid input: 'Z' is not a Roman numeral" },
    { input: "VV", expected: "Invalid input: invalid repetition of symbols (VV, LL, DD)" },
    { input: "", expected: "Invalid input: empty value" }
  ];

  console.log("\n Running Roman Numeral Tests:\n");
  let passCount = 0;

  for (const t of tests) {
    const result = romanToInt(t.input);
    const passed = result === t.expected;
    console.log(`${passed ? "pass" : "fail"} Input: '${t.input}' → Output: ${result}`);
    if (passed) passCount++;
  }

  console.log(`\n Passed ${passCount}/${tests.length} tests`);
}

if (require.main === module) {
  const readline = require("readline");
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  rl.question("Enter Roman numeral (or press Enter to run tests): ", (input) => {
    if (!input) {
      runTests(); // Run tests if no input is given
    } else {
      const result = romanToInt(input.toUpperCase());
      console.log(`${input.toUpperCase()} = ${result}`);
    }
    rl.close();
  });
}
