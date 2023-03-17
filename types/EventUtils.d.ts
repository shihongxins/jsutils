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
export declare function createCustomEvent(type?: string, bubbles?: boolean, cancelable?: boolean): never | void | Event;
/**
 * 触发自定义事件
 * @param event 目标事件
 * @param target 事件对象
 */
export declare function dispatchCustomEvent(event: Event, target?: Window | IE8Document | Element): never | void;
export declare const EventUtils: {
    createCustomEvent: typeof createCustomEvent;
    dispatchCustomEvent: typeof dispatchCustomEvent;
};
export {};
