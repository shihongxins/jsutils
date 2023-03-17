interface IE8CustomEvent extends Event {
  type: string;
  bubbles: boolean;
  cancelable: boolean;
}
interface IE8Document extends Document {
  createEventObject?(): IE8CustomEvent;
  fireEvent?: (type: string, event: Event) => void;
}

/**
 * 创建自定义事件
 * @param type 事件类型
 * @param bubbles 是否冒泡
 * @param cancelable 能否被取消
 * @returns
 */
export function createCustomEvent(type = "", bubbles = true, cancelable = true): never | void | Event {
  let event;
  if (!type.trim()) {
    throw new Error("Unknown custom event type.");
  }
  if (typeof (document as IE8Document).createEventObject === "function") {
    event = (document as IE8Document).createEventObject!();
    event.type = type;
    event.bubbles = bubbles;
    event.cancelable = cancelable;
  }
  if (Event && typeof Event.prototype.initEvent === "function") {
    if (typeof Event.prototype.initEvent === "function") {
      event = document.createEvent("Event");
      event.initEvent(type, bubbles, cancelable);
    } else {
      event = new Event(type, { bubbles, cancelable });
    }
  }
  return event;
}

/**
 * 触发自定义事件
 * @param event 目标事件
 * @param target 事件对象
 */
export function dispatchCustomEvent(event: Event, target: Window | IE8Document | Element = document): never | void {
  if (!event.type) {
    throw new Error("Unknown event type.");
  }
  if (typeof target !== "object") {
    throw new Error("target must be an object");
  }
  if (typeof (target as IE8Document).fireEvent === "function") {
    (target as IE8Document).fireEvent!(event.type, event);
  }
  if (typeof target.dispatchEvent === "function") {
    target.dispatchEvent(event);
  }
}

export const EventUtils = {
  createCustomEvent,
  dispatchCustomEvent,
};
