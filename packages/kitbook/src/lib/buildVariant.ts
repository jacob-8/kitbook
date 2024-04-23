import type { Variant } from './kitbook-types'

/**
 * This is not in use until I learn how to use Typescript well enough to ensure that a required type for a component is in either variant or shared but not both. Not sure if it's possible, but here is my dead code.
 *
 * Combines shared component properties shallowly with variant component properties, then combines _meta properties from both, with the variant's properties overwriting shared. Used in conjunction with `satisfies` it will ensure that all required props are either in shared OR in the variant but not necessary in both.
 */
export function buildVariant<T extends Variant<any>, V extends Partial<T> = Partial<T>, S extends Partial<T> = Partial<T>>(variant: V, shared: S = {} as S): S & V {
  return {
    ...shared,
    ...variant,
    _meta: {
      ...shared._meta,
      ...variant._meta,
    },
  }
}

if (import.meta.vitest) {
  describe(buildVariant, () => {
    type ComponentVariant = Variant<any> & { first_prop: string; second_prop: { a: string; b?: string } }

    test('shares requirement', () => {
      const shared = {
        first_prop: 'foo',
      } satisfies Partial<ComponentVariant>

      const variant = buildVariant({
        second_prop: { a: 'hi' },
      }, shared) satisfies ComponentVariant

      expect(variant).toEqual({ ...shared, second_prop: { a: 'hi' }, _meta: {} })
    })

    test('combines props shallowly', () => {
      const shared = {
        first_prop: 'foo',
        second_prop: { a: 'bar', b: 'baz' },
      } satisfies Partial<ComponentVariant>

      const variant = buildVariant({
        second_prop: { a: 'hi' },
      }, shared) satisfies ComponentVariant

      expect(variant).toEqual({ ...shared, second_prop: { a: 'hi' }, _meta: {} })
    })

    test('combines _meta', () => {
      const shared = {
        first_prop: 'foo',
        _meta: {
          ssr: false,
        },
      } satisfies Partial<ComponentVariant>

      const variant = buildVariant({
        second_prop: { a: 'hi' },
        _meta: {
          languages: [],
        },
      }, shared) satisfies ComponentVariant

      expect(variant).toEqual({ ...shared, second_prop: { a: 'hi' }, _meta: { ssr: false, languages: [] } })
    })
  })
}

// // export default defineVariants({
// //   languages: [],
// //   csr: false,
// // })

// // function _defineCommonVariant<T extends SvelteComponent>(common_variant: Partial<Variant<T>>) {
// //   return (specific_variant: Partial<Variant<T>>) => {
// //     return {
// //       ...common_variant,
// //       ...specific_variant,
// //     }
// //   }
// // }

// // const _defineVariant = _defineCommonVariant<Component>({
// //   pages, // required and added here
// //   settings, // required and added here
// //   // pathname: '/foo', // required, but not added here
// // })

// // export const foo = _defineVariant({
// //   pathname: '/foo', // required and must be added here as it was not in the common variant or else should throw a typescript error
// // })

// // export const bar = _defineVariant({
// //   pathname: '/bar', // required
// // })

// ////////////

// // const shared = {
// //   pages,
// //   settings,
// // } satisfies Partial<ComponentVariant>

// // export const baz = {
// //   ...shared,
// //   pathname: '/baz',
// // } satisfies ComponentVariant

// // function defineCommonVariant<T extends SvelteComponent>(common_variant: Partial<Variant<T>>) {
// //   return (specific_variant: Partial<Omit<Variant<T>, keyof typeof common_variant>>): Variant<T> => {
// //     return {
// //       ...common_variant,
// //       ...specific_variant,
// //     };
// //   }
// // }

// // I'm trying to get the above defineVariant to properly only throw typescript errors as described in my comments above. The below works. Please update my above code to function with the same capacity as the below code in that two partials combine to make a complete object without throwing typescript errors.

// interface IComplete {
//   a: string
//   b: string
//   c: number
//   d: number
// }

// const asPartialIComplete = <T extends Partial<IComplete>>(t: T) => t

// const part1 = asPartialIComplete({
//   a: 'hello',
//   c: 2,
// })

// const part2 = asPartialIComplete({
//   b: 'world',
//   d: 3,
// })

// const _together: IComplete = {
//   ...part1,
//   ...part2,
// }

// function asComplete<T, F extends Partial<T>, S extends Partial<T>>(first: F, second: S) {
//   return { ...first, ...second }
// }

// const _works: IComplete = asComplete({
//   a: 'hello',
//   b: 'there',
// }, {
//   c: 2,
//   d: 3,
// })

// // function defineCommonVariant<T, F extends Partial<T> = Partial<T>, S extends Partial<T> = Partial<T>>(common_variant: F) {
// //   return (specific_variant: S) => {
// //     return { ...common_variant, ...specific_variant }
// //   }
// // }

// // const defineVariant = defineCommonVariant<IComplete>({
// //   a: 'hello',
// //   b: 'there',
// // })

// // export const bar: IComplete = defineVariant({
// //   c: 2,
// //   d: 3,
// // })

// // function defineCommonVariant<T extends SvelteComponent, CommonKeys extends keyof Variant<T>>(
// //   common_variant: Pick<Variant<T>, CommonKeys>
// // ) {
// //   return <SpecificKeys extends Exclude<keyof Variant<T>, CommonKeys>>(
// //     specific_variant: Pick<Variant<T>, SpecificKeys> & Required<Pick<Variant<T>, CommonKeys>>
// //   ): Variant<T> => {
// //     return {
// //       ...common_variant,
// //       ...specific_variant,
// //     } as Variant<T>;
// //   }
// // }

// // function defineCommonVariant<T extends SvelteComponent>(common_variant: Partial<Variant<T>>) {
// //   return (specific_variant: Variant<T>): Variant<T> => {
// //     return {
// //       ...common_variant,
// //       ...specific_variant,
// //     }
// //   }
// // }

// // return (specific_variant: Omit<Variant<T>, keyof typeof common_variant>): Variant<T> => {

// type IsEqual<A, B> =
// (<G>() => G extends A ? 1 : 2) extends
// (<G>() => G extends B ? 1 : 2)
//   ? true
//   : false

//     type Filter<KeyType, ExcludeType> = IsEqual<KeyType, ExcludeType> extends true ? never : (KeyType extends ExcludeType ? never : KeyType)

// interface ExceptOptions {
//   requireExactProps?: boolean
// }

// type Except<ObjectType, KeysType extends keyof ObjectType, Options extends ExceptOptions = { requireExactProps: false }> = {
//   [KeyType in keyof ObjectType as Filter<KeyType, KeysType>]: ObjectType[KeyType];
// } & (Options['requireExactProps'] extends true
//   ? Partial<Record<KeysType, never>>
//   : {})

// type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {}

// /**
// Create a type that makes the given keys optional. The remaining keys are kept as is. The sister of the `SetRequired` type.

// Use-case: You want to define a single model where the only thing that changes is whether or not some of the keys are optional.

// @example
// ```
// import type {SetOptional} from 'type-fest';

// type Foo = {
// a: number;
// b?: string;
// c: boolean;
// }

// type SomeOptional = SetOptional<Foo, 'b' | 'c'>;
// // type SomeOptional = {
// // a: number;
// // b?: string; // Was already optional and still is.
// // c?: boolean; // Is now optional.
// // }
// ```

// @category Object
//  */
// type SetOptional2<BaseType, Keys extends keyof BaseType> =
// Simplify<
// // Pick just the keys that are readonly from the base type.
// Except<BaseType, Keys> &
// // Pick the keys that should be mutable from the base type and make them mutable.
// Partial<Pick<BaseType, Keys>>
// >

// // type SetOptional<T, F extends Partial<T>> = {
// //   [P in keyof F]?: T[P];
// // } & {
// //   [P in Exclude<keyof T, keyof F>]: T[P];
// // }

// // type SetOptional<T, U extends Partial<T>> = {
// //   [P in keyof T as P extends keyof U ? never : P]: T[P];
// // } & U

// // type SetOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// // function defineCommonVariant<T>(common_variant: Partial<T>) {
//   // return (specific_variant: SetOptional<T, C>): T => {
// // function defineCommonVariant<T, C extends Partial<T> = Partial<T>, S = SetOptional<T, C>>(common_variant: C) {
// //   return (specific_variant: S): C & S => {
// //     return {
// //       ...common_variant,
// //       ...specific_variant,
// //     }
// //   }
// // }

// // type SetOptional<T, C extends keyof Partial<T>> = T & Partial<Pick<T, C>>;
// // type SetOptional<T, K> = Omit<T, keyof K> & Partial<T>;
// type SetOptional<T, U extends Partial<T>> = {
//   [P in keyof T as P extends keyof U ? never : P]: T[P];
// } & U

// function defineCommonVariant<T, C extends Partial<T> = Partial<T>>(common_variant: C) {
//   return (specific_variant: SetOptional<T, C>): C & SetOptional<T, C> => {
//     return {
//       ...common_variant,
//       ...specific_variant,
//     };
//   };
// }

// const defineVariant = defineCommonVariant<ComponentVariant>({
//   settings,
//   pages,
// })

// export const foo2 = defineVariant({
//   // pathname: '/foo',

// })

// export const foo3 = defineVariant({
//   pathname: '/foo',
// }) satisfies ComponentVariant
