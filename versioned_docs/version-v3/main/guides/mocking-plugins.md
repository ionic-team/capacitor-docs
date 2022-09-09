---
title: Mocking Plugins
description: How to create mock objects for Capacitor plugins
contributors:
  - kensodemann
slug: /guides/mocking-plugins
---

# Mocking Capacitor Plugins

When creating unit tests within your application, it is a best practice to create mocks for any external dependency to the unit that is under test. This includes Capacitor plugins that your component or service is using.

Most mocking libraries create mocks by taking an object and wrapping it in a JavaScript proxy so calls to the methods on that object can be examined and the return values of the methods can be controlled. Capacitor plugins, however, are implemented within the JavaScript layer as proxies. Creating a proxy of a proxy is not supported and fails. Manual mocks can be used to circumvent this issue.

## Manual Mocks

Manual mocks allow the user to easily stub the functionality of an entire JavaScript module. As a result, when the tests do an `import { Storage } from '@capacitor/storage'`, instead of loading the real `Storage` JavaScript proxy object, the tests would load something like this:

```TypeScript
export const Storage = {
  async get(data: { key: string }): Promise<{ value: string | undefined }> {
    return { value: undefined };
  },

  async set(data: { key: string; value: string }): Promise<void> {},
  async clear(): Promise<void> {},
};
```

Since this is a plain JavaScript object and not a proxy object, it is very easy to spy on. Also, since it is a mock it does not try to make any native calls. This makes the use of manual mocks an ideal choice to use when testing code that uses Capacitor plugins.

### Jest

The Jest testing framework has <a href="https://jestjs.io/docs/manual-mocks" _target="blank">manual mocks</a> built in to it. Create a `__mocks__/@capacitor` folder at the root of your project, and Jest will automatically load files from there rather than from `node_modules`.

For example, let's say you have the following directory structure:

```
.
|
+- __mocks__
| |
| +- @capacitor
|   |
|   +- storage.ts
|   +- toast.ts
...
+- src
```

Your tests will use the stubs defined in `storage.ts` and `toast.ts` rather than the real `@capacitor/storage` and `@capacitor/toast` plugins from `node_modules`.

### Jasmine

The Jasmine testing framework does not include the concept of "manual mocks" but we can easily simulate this through the use of TypeScript path mapping.

First, create the same directory structure at the root level of your project just like you would for the Jest example.

Angular projects (the most common scenario in which you would be using Jasmine as a testing framework) include a `tsconfig.spec.json` file that extends the `tsconfig.json` base configuration when unit tests are being executed. Modify this file to extend any `paths` mapping you may have at the base level.

For example, if your `tsconfig.json` file contains the following `paths` mapping:

```JSON
    "paths": {
      "@app/*": ["src/app/*"],
      "@env/*": ["src/environments/*"]
    },
```

Then update your `tsconfig.spec.json` file to include those paths plus any you would like to use for the unit tests:

```JSON
    "paths": {
      "@app/*": ["src/app/*"],
      "@env/*": ["src/environments/*"],
      "@test/*": ["test/*"],
      "@capacitor/*": ["__mocks__/@capacitor/*"]
    }
```

Now when the unit tests are compiled, `import { Storage } from '@capacitor/storage';` will use the stub file under `__mocks__/@capacitor` rather than the real one in `node_modules`.

**Note:** the `paths` object is replaced entirely rather than being merged, so if you have any paths defined at in `tsconfig.json` they _must_ also be included in `tsconfig.spec.json`.

## Mocking the Stubs

With the manual mocks in place, the tests can now be written to mock and spy on the method calls in all of the usual ways.

### Jest

```TypeScript
  it("gets the first and last name", async () => {
    Storage.get = jest.fn().mockImplementation(
      async (data: { key: string }): Promise<{ value: string }> => {
        return data.key === "firstName"
          ? { value: "Jimmy" }
          : data.key === "lastName"
          ? { value: "Simms" }
          : { value: "unknown" };
      }
    );
    const w = mount(Home);
    await flushPromises();
    expect(w.vm.firstName).toEqual("Jimmy");
    expect(w.vm.lastName).toEqual("Simms");
  });

  it("clears the storage", () => {
    const button = wrapper.findComponent('[data-testid="clear"]');
    Storage.clear = jest.fn().mockResolvedValue(undefined);
    button.trigger("click");
    expect(Storage.clear).toHaveBeenCalledTimes(1);
  });
```

### Jasmine

```TypeScript
  it("gets the first and last name", async () => {
    spyOn(Storage, 'get');
    (Storage.get as any)
      .withArgs({ key: 'firstName' })
      .and.returnValue(Promise.resolve({ value: 'Jason' }));
    (Storage.get as any)
      .withArgs({ key: 'lastName' })
      .and.returnValue(Promise.resolve({ value: 'Jones' }));

    fixture.detectChanges();
    await fixture.whenRenderingDone();

    expect(component.firstName).toEqual('Jason');
    expect(component.lastName).toEqual('Jones');
  });

  it('clears the storage', () => {
    spyOn(Storage, 'clear');
    click(clear.nativeElement);
    fixture.detectChanges();
    expect(Storage.clear).toHaveBeenCalledTimes(1);
  });
```

## Examples

- [Mocking Capacitor Plugins in Jasmine](https://github.com/ionic-team/cap-plugin-mock-jasmine)
- [Mocking Capacitor Plugins in Jest](https://github.com/ionic-team/cap-plugin-mock-jest)
