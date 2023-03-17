---
layout: doc
---

# EventUtils API

## createCustomEvent() {#createCustomEvent}

Create a custom event.

- **type:** `function`

  ```ts
  function createCustomEvent(type?: string, bubbles?: boolean, cancelable?: boolean): never | void | Event;
  ```

- **example**

  ```ts
  import { EventUtils } from "@shihongxins/utils";
  const resize = EventUtils.createCustomEvent("resize");
  ```

## dispatchCustomEvent() {#dispatchCustomEvent}

Dispatch the custom event.

- **type:** `function`

  ```ts
  function dispatchCustomEvent(event: Event, target?: Window | IE8Document | Element): never | void;
  ```

- **example**

  ```ts
  import { EventUtils } from "@shihongxins/utils";
  EventUtils.dispatchCustomEvent(resize);
  ```
