---
layout: doc
---

# MathUtils API

## isNumberInRange() {#isNumberInRange}

Ensure a number is in a range.

- **type:** `function`

  ```ts
  function isNumberInRange(num: number, min: number, max: number, equal?: boolean): boolean;
  ```

- **example**

  ```ts
  import { MathUtils } from "@shihongxins/utils";
  // false
  console.log(MathUtils.isNumberInRange(5, 0, 5));
  // true
  console.log(MathUtils.isNumberInRange(5, 0, 6));
  // true
  console.log(MathUtils.isNumberInRange(5, 0, 5, true));
  ```
