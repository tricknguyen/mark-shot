export class Future<T> extends Promise<T> {

    resolve!: (value: T) => void;
    reject!: (reason?: any) => void;
    resolving: boolean = false;

    private _resolved: boolean = false;
    private _rejected: boolean = false;
    private onAborted!: ((reason: any) => void);

    constructor(executor: (resolve: (value: T) => void, reject: (reason?: any) => void, onAborted: (cb: (reason?: any) => void) => void) => void) {
        let resolveLocal: (value: T) => void;
        let rejectLocal: (reason: any) => void;

        // Cant have function here since this is undefined in setTimeout
        // eslint-disable-next-line func-style 
        const onAborted = (cb: (reason: any) => void) => {
            setTimeout(() => {
                this.onAborted = cb;
            });
        };

        function exec(resolve: any, reject: any) {
            // assign to local to prevent error assignbefore call super;
            resolveLocal = resolve;
            rejectLocal = reject;
        }

        super(exec);

        this.resolve = (value: T) => {
            this.resolving = false;
            this._resolved = true;

            resolveLocal(value);
        };

        this.reject = (reason: any) => {
            this.resolving = false;
            this._rejected = true;

            rejectLocal(reason);
        };

        if (executor) {
            executor(this.resolve, this.reject, onAborted);
        }
    }


    /**
     * Handles success / rejection from Promise and returns the result as an object. 
     * If the promise is rejected, the error will be in the error property.
     * No need to try/catch the promise when using this method.
     *
     * @return {*}  {Future<{ success?: T, error?: Error; }>}
     * @memberof Future
     */
    //tryCatch(): Future<{ success?: T, error?: Error; }> {
    tryCatch(): Future<{ success: T, error: Error }> {
        return new Future<{ success: T, error: Error }>(async (resolve) => {
            try {
                const data = await this;
                resolve({ success: data, error: undefined as any });
            } catch (error) {
                let val = error;
                if(!error) {
                    val = new Error("Error was not provided to the reject method.");
                }
                resolve({ success: undefined as any, error: val as any });
            }
        });
    }

    /**
     * Aborts the request
     *
     * @param {*} [reason]
     * @memberof Future
     */
    abort(reason?: any) {
        if (this.onAborted) {
            this.onAborted(reason);
        } else {
            throw "Failed calling abort() => The future has no onAborted callback or you tried to call abort immediately after the future was created.";
        }
    }

    /**
    * Creates a Future that resolves after a specified delay.
    *
    * @param {number} ms - The time to delay in milliseconds.
    * @returns {Future<void>} A Future that resolves after the specified delay.
    */
    static delay(ms: number): Future<void> {
        return new Future<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    static all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }> {
        // have issue with Promise.all not working when promises is mixin Future and promise
        // so implement Future.all to make a wrapper promise to Future to resolve that issue.
        const promises = values.map(p => p instanceof Future ? new Promise<any>((resolve, reject) => p.then(resolve, reject)) : p);
        return Promise.all(promises) as any;
    }

    get resolved(): boolean {
        return this._resolved;
    }

    get rejected(): boolean {
        return this._rejected;
    }

    static get [Symbol.species]() {
        return Promise;
    }

    get [Symbol.toStringTag]() {
        // return Object value to make vue can build get/set reactive.
        // return "Object";
        //<<vue3>> back to normal because vue 3 use native proxy.
        return "Future";
    }

    /**
    * Creates a new instance of the Future class with a specific return value type.
    *
    * @template TReturnValue - The type of the return value for the Future instance.
    * @returns {Future<TReturnValue>} - A new instance of the Future class.
    */
    static new<TReturnValue>() {
        return new Future<TReturnValue>(() => { });
    }

    static res<T>(value?: T): Future<T> {
        const future = Future.new<T>();
        future.resolve(value as any);
        return future;
    }

    static err<T>(reason?: any): Future<T> {
        const future = Future.new<T>();
        future.reject(reason);
        return future;
    }

}

// Future.prototype["promise_then"] = Promise.prototype.then;

// Future.prototype["then"] = function (resolve, reject) {
//     return Future.prototype["promise_then"].apply(this, arguments);
// };

export class ResponsePromise<T> extends Promise<T> {
    cancelCb!: (() => void);

    constructor(executor: any) {
        const onCancel = (cb: any) => {
            //using nextTick because we cant use "this" before super()
            setTimeout(() => {
                this.cancelCb = cb;
            });
        };

        const oExecutor = (resolve: any, reject: any) => {
            executor(resolve, reject, onCancel);
        };

        super(oExecutor);
    }
    cancel() {
        if (this.cancelCb) {
            this.cancelCb();
        } else {
            console.warn("onCancel not provided");
        }
    }
}
