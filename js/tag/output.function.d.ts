/** Used to call a function that belongs to a calling tag */
export declare function output<CallbackReturn, ReceivedArguments extends any[]>(callback: ((...args: any[]) => CallbackReturn)): (...args: ReceivedArguments) => CallbackReturn;
