---
layout: doc
---

# ListLoop API

## Contructor() {#Contructor}

Create a new ListLoop instance.

- **type:** `class`

  ```ts
  export declare class ListLoop<T> {
    list: T[];
    count: number;
    index: number;
    constructor(list?: T[], count?: number, index?: number);
    get total(): number;
    lastRound(): number;
    nextRound(): number;
    get currentRoundList(): T[];
  }
  ```

- **example**

  ```ts
  import { ListLoop } from "@shihongxins/utils";
  const lp = new ListLoop();
  ```

## Instance properties {#Instance}

The instance properties.

### `ListLoop.prototype.list: T[]` {#list}

Get the list of instance.

- **example**

  ```ts
  console.log(lp.list);
  ```

### `ListLoop.prototype.count: number` {#count}

Get the count(step) of instance.

- **example**

  ```ts
  console.log(lp.count);
  ```

### `ListLoop.prototype.index: number` {#index}

Get the index of instance.

- **example**

  ```ts
  console.log(lp.index);
  ```

### `ListLoop.prototype.total: number` {#total}

Get the total(`getter()`) of instance.

- **example**

  ```ts
  console.log(lp.total);
  ```

### `ListLoop.prototype.lastRound(): number` {#lastRound}

Set last round of index.

- **example**

  ```ts
  console.log(lp.lastRound());
  ```

### `ListLoop.prototype.nextRound(): number` {#nextRound}

Set next round of index.

- **example**

  ```ts
  console.log(lp.nextRound());
  ```

### `ListLoop.prototype.currentRoundList: T[]` {#currentRoundList}

Get current round list of instance.

- **example**

  ```ts
  console.log(lp.currentRoundList);
  ```
