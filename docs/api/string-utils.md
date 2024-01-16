---
layout: doc
---

# StringUtils API

## getASCIICharsInRange() {#getASCIICharsInRange}

Get the ASCII characters in the specified range.

- **type** `function`

```ts
function getASCIICharsInRange(start?: number, end?: number): string[];
```

- **example**

```ts
import { getASCIICharsInRange } from '@shihongxins/jsutils;
getASCIICharsInRange(48, 57); // [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]
```

## hasContinousRepeatedChars() {#hasContinousRepeatedChars}

Check if the string has a continuous repeated character.

- **type** `function`

```ts
function hasContinousRepeatedChars(string?: string, repeat?: number): boolean;
```

- **example**

```ts
import { hasContinousRepeatedChars } from "@shihongxins/jsutils";
hasContinousRepeatedChars("abc666"); // true
hasContinousRepeatedChars("abc666", 4); // false
hasContinousRepeatedChars("aabb1122"); // true
hasContinousRepeatedChars("aabb1122", 3); // false
```

## hasSequencingSubString() {#hasSequencingSubString}

Check if the string has a sequencing substring.

- **type** `function`

```ts
function hasSequencingSubString(string?: string, length?: number): boolean;
```

- **example**

```ts
import { hasSequencingSubString } from "@shihongxins/jsutils";
hasSequencingSubString("Abc"); // true
hasSequencingSubString("Abc", 3); // false
hasSequencingSubString("Abcde", 4); // true
hasSequencingSubString("aa123"); // true
```

## isSequencingString() {#isSequencingString}

Check if the string is a sequencing string.

- **type** `function`

```ts
function isSequencingString(string?: string, step?: number): boolean;
```

- **example**

```ts
import { isSequencingString } from "@shihongxins/jsutils";
isSequencingString("abcdefg"); // true
isSequencingString("321", -1); // true
isSequencingString("246", 2); // true
```

## passwordStrengthInspector() {#passwordStrengthInspector}

Check the strength of a password.

- **type** `function`

```ts
function passwordStrengthInspector(password: string, rules?: PasswordStrengthRules): PasswordStrengthResult;
```

- **example**

```ts
import { passwordStrengthInspector } from "@shihongxins/jsutils";
passwordStrengthInspector("test1234").failed > 0; // true
passwordStrengthInspector("test8888").failed > 0; // true
passwordStrengthInspector("test666").failed > 0; // true
passwordStrengthInspector("test9527").failed > 0; // true
passwordStrengthInspector("test9527").failed > 0; // true
passwordStrengthInspector("test9527@").failed > 0; // true
passwordStrengthInspector("Test9527@").failed > 0; // false
```
