import { Id } from "./id";

const guidSymbol = Symbol("guid");

export type guid = Id<string, [typeof guidSymbol]>;


export const emptyGuid = guid("00000000-0000-0000-0000-000000000000");

export function guid<S extends string>(id?: GuidValidator<S>): guid {
    return defineGuid(id);
}

export function maybeGuid(id: string): guid {
    return defineGuid(id);
}

export function isValidGuid(guid: guid): boolean {
    if (guid === undefined || guid === null) {
        return false;
    }
    const validRegex = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/;
    return validRegex.test(guid);
}


function defineGuid(id?: string): guid {
    if (!id) {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            const v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }) as guid;
    }
    return id as guid;
}


type VersionChar =
    | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7"
    | "8" | "9" | "a" | "b" | "c" | "d" | "e" | "f";

type Char =
    | "0" | "1" | "2" | "3"
    | "4" | "5" | "6" | "7"
    | "8" | "9" | "a" | "b"
    | "c" | "d" | "e" | "f";

type Prev<X extends number> =
    [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...never[]][X];

type HasLength<S extends string, Len extends number> = [Len] extends [0]
    ? (S extends "" ? true : never)
    : (S extends `${infer C}${infer Rest}`
        ? (Lowercase<C> extends Char ? HasLength<Rest, Prev<Len>> : never)
        : never);

type Char4<S extends string> = true extends HasLength<S, 4> ? S : never;
type Char8<S extends string> = true extends HasLength<S, 8> ? S : never;
type Char12<S extends string> = true extends HasLength<S, 12> ? S : never;

type VersionGroup<S extends string> = S extends `${infer Version}${infer Rest}`
    ? (Version extends VersionChar
        ? (true extends HasLength<Rest, 3> ? S : never)
        : never)
    : never;

type NilUUID = "00000000-0000-0000-0000-000000000000";

type GuidValidator<S extends string> = S extends NilUUID
    ? S
    : (S extends `${infer S8}-${infer S4_1}-${infer S4_2}-${infer S4_3}-${infer S12}`
        ? (S8 extends Lowercase<Char8<S8>>
            ? (S4_1 extends Lowercase<Char4<S4_1>>
                ? (S4_2 extends Lowercase<VersionGroup<S4_2>>
                    ? (S4_3 extends Lowercase<Char4<S4_3>>
                        ? (S12 extends Lowercase<Char12<S12>>
                            ? S
                            : never)
                        : never)
                    : never)
                : never)
            : never)
        : never);


