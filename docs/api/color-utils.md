---
layout: doc
---

# ColorUtils API

## rgb2hex() {#rgb2hex}

Convert the color formatting from rgb to hex.

- **type:** `function`

  ```ts
  function rgb2hex(color?: string, alpha?: number): void | string;
  ```

- **example**

  ```ts
  import { ColorUtils } from "@shihongxins/utils";
  console.log(ColorUtils.rgb2hex("rgb(255, 0, 0)"));
  ```

## hex2rgb() {#hex2rgb}

Convert the color formatting from hex to rgb.

- **type:** `function`

  ```ts
  function hex2rgb(color?: string, alpha?: number): void | string;
  ```

- **example**

  ```ts
  import { ColorUtils } from "@shihongxins/utils";
  console.log(ColorUtils.hex2rgb("#ff0000"));
  ```
