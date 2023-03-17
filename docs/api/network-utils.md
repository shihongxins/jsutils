---
layout: doc
---

# NetworkUtils API

## validateResponseCode() {#validateResponseCode}

Check if ResData or Response code or status is the expected value.

- **type:** `function`

  ```ts
  function validateResponseCode(
    response: UserResponseData<any>,
    code?: number | number[],
    includeStatus?: boolean
  ): boolean;
  ```

- **example**

  ```ts
  import { NetworkUtils } from "@shihongxins/utils";

  const successResData = {
    code: 200,
    data: [],
    msg: "Success",
  };
  // true
  console.log(NetworkUtils.validateResponseCode(successResData));

  const noResponse = new Response(null, { status: 404, 'Not Found' })
  // false
  console.log(NetworkUtils.validateResponseCode(noResponse));
  // fasle
  console.log(NetworkUtils.validateResponseCode(noResponse, 404));
  // true
  console.log(NetworkUtils.validateResponseCode(noResponse, 404, true));
  ```

## getResponseMessage() {#getResponseMessage}

Get the msg or message from ResData or Response even Error.

- **type:** `function`

  ```ts
  function getResponseMessage(response: UserResponseData<any>, maxLen?: undefined | number): string;
  ```

- **example**

  ```ts
  import { NetworkUtils } from "@shihongxins/utils";

  const successResData = {
    code: 200,
    data: [],
    msg: "Success",
  };
  // "Success"
  console.log(NetworkUtils.getResponseMessage(successResData));

  const noResponse = new Response(null, { status: 404, statusText: "Not Found" });
  // "Not Found"
  console.log(NetworkUtils.getResponseMessage(noResponse));

  const error = new Error("Error message");
  // "Error message"
  console.log(NetworkUtils.getResponseMessage(error));
  ```
