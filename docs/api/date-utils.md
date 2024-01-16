---
layout: doc
---

# DateUtils API

```ts
type allowDateType = Date | string | number;
```

## parseDateOrTime() {#parseDateOrTime}

Get time number from date or time especially "HH:mm:ss".

- **type:** `function`

  ```ts
  function parseDateOrTime(datetime: allowDateType): number;
  ```

- **example**

  ```ts
  import { DateUtils } from "@shihongxins/utils";
  console.log(DateUtils.parseDateOrTime("00:00:06"));
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

The format function of [**dayjs**](https://day.js.org/en/).

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
