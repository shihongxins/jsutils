---
layout: doc
---

# ElementUtils API

## isDocumentInFullscreenMode() {#isDocumentInFullscreenMode}

Determines whether the current document is in fullscreen mode.

- **type:** `function`

  ```ts
  function ElementUtils(): boolean;
  ```

- **example**

  ```ts
  import { ElementUtils } from "@shihongxins/utils";
  // false
  console.log(ElementUtils.isDocumentInFullscreenMode());
  ```

## toggleElementFullscreen() {#toggleElementFullscreen}

Toggles the Element Full Screen state.

- **type:** `function`

  ```ts
  function toggleElementFullscreen(target: Element, options: FullscreenOptions): Promise<unknown>;
  ```

- **example**

  ```ts
  import { ElementUtils } from "@shihongxins/utils";
  ElementUtils.toggleElementFullscreen(document.body);
  ```

## listenElementHorizontalScrolling() {#listenElementHorizontalScrolling}

Listen for wheel events to make elements scroll horizontally.

- **type:** `function`

  ```ts
  function listenElementHorizontalScrolling(
    target: HTMLElement,
    options?: {
      altkey: boolean;
      force: boolean;
    }
  ): void;
  ```

- **example**

  ```ts
  import { ElementUtils } from "@shihongxins/utils";

  const elemThatScrollHozOnWhell = document.querySelector("elemThatScrollHozOnWhell");
  ElementUtils.listenElementHorizontalScrolling(elemThatScrollHozOnWhell);
  ```

## getElementStyleProp() {#getElementStyleProp}

Gets the style properties of the element after calculation.

- **type:** `function`

  ```ts
  function getElementStyleProp(target?: Element, propName?: string): void | string;
  ```

- **example**
  ```ts
  import { ElementUtils } from "@shihongxins/utils";
  // "16px"
  console.log(ElementUtils.getElementStyleProp("fontSize"));
  ```
