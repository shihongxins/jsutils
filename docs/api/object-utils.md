---
layout: doc
---

# ObjectUtils API

## assignCommonProperty() {#assignCommonProperty}

Assign the common property between 'target' and 'source'.

- **type:** `function`

  ```ts
  function assignCommonProperty(target: object, source: object, fromSourceStrictly?: undefined | boolean): object;
  ```

- **example**

  ```ts
  import { ObjectUtils } from "@shihongxins/utils";
  const target = {
    a: "1",
    b: "2",
    c: {
      d: "3",
    },
    e: "4",
    f: null,
  };
  const source = {
    a: 1,
    b: null,
    c: {
      d: 3,
    },
    get e() {
      return 4;
    },
  };
  /**
   * @return {
    {
      a: 1,
      b: null,
      c: {
        d: 3,
      },
      e: 4,
      f: null,
    }
   }
   */
  console.log(ObjectUtils.assignCommonProperty(target, source));
  ```
