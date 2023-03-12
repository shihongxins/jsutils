---
layout: doc
---

# DateUtils API

```ts
type allowDateType = Date | string | number;
```

## nativeFormat() {#nativeFormat}

Datetime format with native API.

- **type:** `function`

  ```ts
  function nativeFormat(date?: allowDateType, format?: string): string;
  ```

- **example**

  ```ts
  import { DateUtils } from "@shihongxins/utils";
  console.log(DateUtils.nativeFormat(new Date(1678607231000), "YYYY-MM-DD"));
  ```

## dayjsFormat() {#dayjsFormat}

Convert the color formatting from hex to rgb.

- **type:** `function`

  ```ts
  function dayjsFormat(date?: allowDateType, format?: string): string;
  ```

- **detail**
  peer dependencies [**dayjs**](https://day.js.org/en/).

- **example**
  ```ts
  import { DateUtils } from "@shihongxins/utils";
  console.log(DateUtils.dayjsFormat(1678607231000, "YYYY-MM-DD"));
  ```

## durationFormat() {#durationFormat}

Format the duration of time between 'from' to 'to'.

- **type:** `function`

  ```ts
  function durationFormat(from?: allowDateType, to?: allowDateType, format?: string, pad0?: boolean): string;
  ```

- **example**
  ```ts
  import { DateUtils } from "@shihongxins/utils";
  console.log(DateUtils.durationFormat("2022-03-12", new Date(), "d days HH hours mm minutes ss seconds ago"));
  ```
