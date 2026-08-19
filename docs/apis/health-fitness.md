---
title: Health Fitness Capacitor Plugin API
description: Access Android Health Connect and Apple HealthKit data for health and fitness apps.
custom_edit_url: https://github.com/ionic-team/capacitor-health-fitness/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-health-fitness/blob/main/src/definitions.ts
sidebar_label: Health Fitness
---

# @capacitor/health-fitness

Access Android Health Connect and Apple HealthKit data for health and fitness apps. Not available on web.

## Install

To use npm

```bash
npm install @capacitor/health-fitness
```

To use yarn

```bash
yarn add @capacitor/health-fitness
```

Sync native files

```bash
npx cap sync
```

## iOS

Your app's `Info.plist` must declare the following (the plugin cannot set
these on the host app itself):

```xml
<key>NSHealthShareUsageDescription</key>
<string>App needs to share health data</string>
<key>NSHealthUpdateUsageDescription</key>
<string>App needs to use health data</string>
<key>UIBackgroundModes</key>
<array>
  <string>fetch</string>
  <string>processing</string>
</array>
<key>BGTaskSchedulerPermittedIdentifiers</key>
<array>
  <string>com.outsystems.health.default</string>
</array>
```

- `NSHealthShareUsageDescription` / `NSHealthUpdateUsageDescription`: the
  messages HealthKit shows the user when requesting read / write access.
- `UIBackgroundModes` (`fetch`, `processing`) and
  `BGTaskSchedulerPermittedIdentifiers`: needed for `setBackgroundJob`'s
  background job feature.

The app target also needs the **HealthKit** capability enabled, with the
following entitlements set to `true` (both Debug and Release):

- `com.apple.developer.healthkit`: the base entitlement required for any
  HealthKit access at all.
- `com.apple.developer.healthkit.background-delivery`: needed for
  `setBackgroundJob`'s background job feature.
- `com.apple.developer.healthkit.recalibrate-estimates`: needed to read/write
  HealthKit's on-device "estimate" variables, e.g. `WALKING_SPEED` and VO2 max.

`com.apple.developer.healthkit.access` should be set to an empty array - it
lists any additional restricted HealthKit types beyond the default set, and
this plugin doesn't use any.

Read about [Configuring `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) in the [iOS Guide](https://capacitorjs.com/docs/ios) for more information on setting iOS permissions in Xcode

## Android

This plugin ships a `capacitor:sync:after` hook
(`hooks/capacitorCopyHealthFitnessConfigs.js`) that runs on every
`npx cap sync` and edits your app's generated
`android/app/src/main/AndroidManifest.xml` to declare the
Health Connect permissions your app actually needs. Health Connect permissions
cannot be requested at runtime the way Capacitor's `plugins.<Name>` config
values are read - they must exist in the manifest at build time - hence the
sync-time hook instead of `getConfig()`.

### Declaring permissions

In your app, create an `android/healthfitness.config.json` file (next to `android/app/`):

```json
{
  "permissions": {
    "HEART_RATE": "Read",
    "STEPS": "ReadWrite",
    "WEIGHT": "Write",
    "HEIGHT": "Read",
    "CALORIES_BURNED": "Read",
    "SLEEP": "Read",
    "BLOOD_PRESSURE": "Read",
    "BLOOD_GLUCOSE": "Read",
    "BODY_FAT_PERCENTAGE": "Read",
    "BASAL_METABOLIC_RATE": "Read",
    "WALKING_SPEED": "Read",
    "DISTANCE": "Read",
    "OXYGEN_SATURATION": "Read",
    "BODY_TEMPERATURE": "Read"
  },
  "groupPermissions": {
    "ALL_VARIABLES": "ReadWrite",
    "FITNESS_VARIABLES": "Read",
    "HEALTH_VARIABLES": "Read",
    "PROFILE_VARIABLES": "Read"
  }
}
```

Each value is one of `Read`, `Write`, or `ReadWrite` - this casing is
intentional and distinct from `requestHealthPermissions`'s `AccessType`
(`READ`/`WRITE`/`READWRITE`), since this file is parsed by the sync-time hook
above, not read by the native plugin at runtime. Both files are optional
per key - only declare what the app actually uses. If neither
`healthfitness.config.json` nor any key in it is present, the hook falls back
to declaring **every** Health Connect permission (matching the plugin's
previous, non-configurable behavior) so your app still works even if you
skip configuration, at the cost of declaring more permissions than it needs.

### Background jobs and read-history permissions

Two more permission groups are on by default and can be opted out of via
top-level flags in `android/healthfitness.config.json`:

```json
{
  "disableBackgroundJobs": false,
  "disableReadHealthDataHistory": false
}
```

- `disableBackgroundJobs: true` skips `READ_HEALTH_DATA_IN_BACKGROUND`,
  `POST_NOTIFICATIONS`, `ACTIVITY_RECOGNITION` (both the platform and Google
  Play Services variants), `FOREGROUND_SERVICE`,
  `FOREGROUND_SERVICE_HEALTH`, `HIGH_SAMPLING_RATE_SENSORS`, and
  `SCHEDULE_EXACT_ALARM` - i.e. everything `setBackgroundJob` needs.
- `disableReadHealthDataHistory: true` skips `READ_HEALTH_DATA_HISTORY` (lets
  the app read data older than 30 days before the first Health Connect grant).

### Background notification content

`setBackgroundJob`'s foreground notification title/description are read from
your app's `res/values/strings.xml` (`background_notification_title`
/ `background_notification_description`) - and read unconditionally at plugin
load time (app startup), not just when a background job is actually set, so
a missing value crashes the app immediately rather than only when the feature
is used. The hook creates both with sensible defaults if missing, overridable
via `android/healthfitness.config.json`:

```json
{
  "backgroundNotificationTitle": "Health & Fitness",
  "backgroundNotificationDescription": "Monitoring your health and fitness data in the background."
}
```

### Privacy policy URL

Health Connect requires a privacy policy URL for apps requesting these
permissions - `requestHealthPermissions()` rejects without one, and Health
Connect opens the URL directly in a browser from its own permissions screen,
so it must be a real, publicly-reachable `https://` link, not a bundled local
file. The simplest way to set it is directly in
`android/healthfitness.config.json`:

```json
{
  "privacyPolicyUrl": "https://example.com/privacy-policy"
}
```

If `privacyPolicyUrl` isn't set, the hook falls back to deriving one from
`capacitor.config.json`'s `server.url` + a fixed `HealthConnect_PrivacyPolicy.txt`
filename - only useful for apps that already serve their web content from a
remote server and host that file there (`HealthConnect_PrivacyPolicy.txt` in
your app's `webDir`, copied to `android/app/src/main/assets/public/` by
`cap sync`). Most Capacitor
apps bundle their web assets locally and have no `server.url`, so this
fallback will never resolve for them - use `privacyPolicyUrl` directly
instead.

Either way, if `strings.xml` already has a non-empty `privacy_policy_url`
(e.g. set by a separate build step), the hook leaves it untouched.

## Examples

Every method below is exercised by the plugin's own
[`example-app`](https://github.com/ionic-team/capacitor-health-fitness/tree/main/example-app) -
the snippets here are taken directly from it. Note that every options object
is a plain object whose values are themselves JSON-encoded strings, not typed
fields.

### Requesting permissions

Call this before any other method. `allVariables`/`fitnessVariables`/
`healthVariables`/`profileVariables`/`workoutVariables` each take a
JSON-encoded `{ IsActive, AccessType }` descriptor (`AccessType` is `READ`,
`WRITE`, or `READWRITE`) targeting a themed subset of variables:

- **Fitness:** `STEPS`, `CALORIES_BURNED`, `DISTANCE`, `WALKING_SPEED`
- **Health:** `HEART_RATE`, `SLEEP`, `BLOOD_PRESSURE`, `BLOOD_GLUCOSE`,
  `OXYGEN_SATURATION`, `BODY_TEMPERATURE`
- **Profile:** `WEIGHT`, `HEIGHT`, `BODY_FAT_PERCENTAGE`,
  `BASAL_METABOLIC_RATE`
- **Workout** (iOS only): HealthKit's workout type, needed for `getWorkoutData()`

Setting `allVariables`'s `IsActive` to `true` requests every variable at
once (this already includes workout on iOS). Use `workoutVariables` on its
own to request just workout access without everything else, or
`customPermissions` to request individual variables directly, e.g.
`[{"Variable":"STEPS","AccessType":"READ"}]`.

```typescript
import { HealthFitness } from '@capacitor/health-fitness';

await HealthFitness.requestHealthPermissions({
  customPermissions: '[]',
  allVariables: JSON.stringify({ IsActive: true, AccessType: 'READWRITE' }),
  fitnessVariables: JSON.stringify({ IsActive: false, AccessType: 'READWRITE' }),
  healthVariables: JSON.stringify({ IsActive: false, AccessType: 'READWRITE' }),
  profileVariables: JSON.stringify({ IsActive: false, AccessType: 'READWRITE' }),
  workoutVariables: JSON.stringify({ IsActive: false, AccessType: 'READWRITE' }), // allVariables already covers this
});
```

### Querying data

`getData()` runs an "advanced query": it reads one variable (e.g. `STEPS`)
over a date range, bucketed into a time unit (e.g. one bucket per day), and
aggregated within each bucket by an operation (e.g. `SUM`). This example
reads the last 7 days of daily step totals:

```typescript
import { HealthFitness } from '@capacitor/health-fitness';

// No milliseconds in the date strings - the native date parser only accepts
// "yyyy-MM-dd'T'HH:mm:ssZ", so toISOString()'s fractional-seconds suffix
// must be trimmed off.
const isoDate = (d: Date) => d.toISOString().split('.')[0] + 'Z';
const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);

const { results } = await HealthFitness.getData({
  parameters: JSON.stringify({
    Variable: 'STEPS',
    StartDate: isoDate(sevenDaysAgo),
    EndDate: isoDate(tomorrow),
    TimeUnit: 'DAY',
    OperationType: 'SUM',
    TimeUnitLength: 1,
    AdvancedQueryReturnType: 'ALL_DATA',
    AdvancedQueryResultType: 'RAW_DATA',
  }),
});

// results is itself a JSON-encoded string
console.log(JSON.parse(results ?? '[]'));
```

### Writing data

Android only accepts "profile" variables here (`WEIGHT`, `HEIGHT`,
`BODY_FAT_PERCENTAGE`, `BASAL_METABOLIC_RATE`); iOS accepts most variables
except category-based ones like `SLEEP`.

```typescript
import { HealthFitness } from '@capacitor/health-fitness';

await HealthFitness.writeData({ variable: 'WEIGHT', value: 75 });
```

### Getting the last recorded value

```typescript
import { HealthFitness } from '@capacitor/health-fitness';

const { results } = await HealthFitness.getLastRecord({ variable: 'STEPS' });
```

### Querying workout data (iOS only)

```typescript
import { HealthFitness } from '@capacitor/health-fitness';

const isoDate = (d: Date) => d.toISOString().split('.')[0] + 'Z';

const { results } = await HealthFitness.getWorkoutData({
  parameters: JSON.stringify({
    WorkoutTypeVariables: [],
    StartDate: isoDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
    EndDate: isoDate(new Date(Date.now() + 24 * 60 * 60 * 1000)),
  }),
});
```

### Background jobs

A background job watches a single variable and fires a local notification
when a condition is met - for example, notify the user once their daily
step count goes above 100. `JobFrequency`/`TimeUnit` control how often the
condition is checked; `NotificationFrequency` controls how often the
notification itself is allowed to re-fire once the condition is met.

```typescript
import { HealthFitness } from '@capacitor/health-fitness';

await HealthFitness.setBackgroundJob({
  parameters: JSON.stringify({
    Variable: 'STEPS',
    TimeUnit: 'DAY',
    TimeUnitGrouping: 1,
    NotificationFrequency: 'DAY',
    NotificationFrequencyGrouping: 1,
    JobFrequency: 'DAY',
    Condition: 'HIGHER',
    Value: 100,
    NotificationHeader: 'Goal reached!',
    NotificationBody: "You've taken over 100 steps today.",
  }),
});
```

List all existing background jobs:

```typescript
const { jobs } = await HealthFitness.listBackgroundJobs();
const parsedJobs = JSON.parse(jobs);
console.log(parsedJobs);
```

Update or delete a job using its `id`:

```typescript
const jobId = parsedJobs[0].id;

await HealthFitness.updateBackgroundJob({
  parameters: JSON.stringify({
    Id: jobId,
    NotificationFrequency: 'DAY',
    NotificationFrequencyGrouping: 1,
    Condition: 'HIGHER',
    Value: 100,
    NotificationHeader: 'Goal reached!',
    NotificationBody: "You've taken over 100 steps today.",
    IsActive: 'true',
  }),
});

await HealthFitness.deleteBackgroundJob({ id: jobId });
```

### Disconnecting / opening Health Connect (Android only)

```typescript
import { HealthFitness } from '@capacitor/health-fitness';

await HealthFitness.disconnectFromHealthConnect();
await HealthFitness.openHealthConnect();
```

## API

<docgen-index>

* [`requestHealthPermissions(...)`](#requesthealthpermissions)
* [`getData(...)`](#getdata)
* [`getWorkoutData(...)`](#getworkoutdata)
* [`writeData(...)`](#writedata)
* [`getLastRecord(...)`](#getlastrecord)
* [`setBackgroundJob(...)`](#setbackgroundjob)
* [`deleteBackgroundJob(...)`](#deletebackgroundjob)
* [`listBackgroundJobs()`](#listbackgroundjobs)
* [`updateBackgroundJob(...)`](#updatebackgroundjob)
* [`disconnectFromHealthConnect()`](#disconnectfromhealthconnect)
* [`openHealthConnect()`](#openhealthconnect)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### requestHealthPermissions(...)

```typescript
requestHealthPermissions(options: RequestHealthPermissionsOptions) => Promise<void>
```

Requests the given HealthKit / Health Connect permissions.

| Param         | Type                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#requesthealthpermissionsoptions">RequestHealthPermissionsOptions</a></code> |

**Since:** 1.0.0

--------------------


### getData(...)

```typescript
getData(options: AdvancedQueryOptions) => Promise<AdvancedQueryResult>
```

Performs an advanced query for a health/fitness variable over a date range.

| Param         | Type                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#advancedqueryoptions">AdvancedQueryOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#advancedqueryresult">AdvancedQueryResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### getWorkoutData(...)

```typescript
getWorkoutData(options: WorkoutAdvancedQueryOptions) => Promise<WorkoutAdvancedQueryResult>
```

Performs an advanced query for workout data over a date range.

iOS only - the underlying native Android library has no workout-specific
query. Not implemented on Android, so calling it there rejects with
Capacitor's standard `UNIMPLEMENTED` error.

| Param         | Type                                                                                |
| ------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#workoutadvancedqueryoptions">WorkoutAdvancedQueryOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#workoutadvancedqueryresult">WorkoutAdvancedQueryResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### writeData(...)

```typescript
writeData(options: WriteDataOptions) => Promise<void>
```

Writes a value to a health/fitness variable.

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#writedataoptions">WriteDataOptions</a></code> |

**Since:** 1.0.0

--------------------


### getLastRecord(...)

```typescript
getLastRecord(options: GetLastRecordOptions) => Promise<AdvancedQueryResult>
```

Retrieves the last recorded value for a variable.

| Param         | Type                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#getlastrecordoptions">GetLastRecordOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#advancedqueryresult">AdvancedQueryResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### setBackgroundJob(...)

```typescript
setBackgroundJob(options: SetBackgroundJobOptions) => Promise<void>
```

Creates a background job that monitors a variable and notifies on a condition.

| Param         | Type                                                                        |
| ------------- | --------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setbackgroundjoboptions">SetBackgroundJobOptions</a></code> |

**Since:** 1.0.0

--------------------


### deleteBackgroundJob(...)

```typescript
deleteBackgroundJob(options: DeleteBackgroundJobOptions) => Promise<void>
```

Deletes a background job by id.

| Param         | Type                                                                              |
| ------------- | --------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#deletebackgroundjoboptions">DeleteBackgroundJobOptions</a></code> |

**Since:** 1.0.0

--------------------


### listBackgroundJobs()

```typescript
listBackgroundJobs() => Promise<ListBackgroundJobsResult>
```

Lists all existing background jobs.

**Returns:** <code>Promise&lt;<a href="#listbackgroundjobsresult">ListBackgroundJobsResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### updateBackgroundJob(...)

```typescript
updateBackgroundJob(options: UpdateBackgroundJobOptions) => Promise<void>
```

Updates an existing background job's parameters.

| Param         | Type                                                                              |
| ------------- | --------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#updatebackgroundjoboptions">UpdateBackgroundJobOptions</a></code> |

**Since:** 1.0.0

--------------------


### disconnectFromHealthConnect()

```typescript
disconnectFromHealthConnect() => Promise<void>
```

Revokes all Health Connect permissions previously granted to the app.

Android only - HealthKit has no equivalent API for an app to revoke its own access.

**Since:** 1.0.0

--------------------


### openHealthConnect()

```typescript
openHealthConnect() => Promise<void>
```

Opens the Health Connect app. Rejects if Health Connect is not installed.

Android only - HealthKit has no equivalent standalone app to open.

**Since:** 1.0.0

--------------------


### Interfaces


#### RequestHealthPermissionsOptions

| Prop                    | Type                | Description                                                                                                                                                                                                                                                                                                                          |
| ----------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`customPermissions`** | <code>string</code> | JSON-encoded string: an array of individual variable permission descriptors, e.g. `[{"Variable":"STEPS","AccessType":"READ"}]`. Use this to request permission for specific variables not covered by (or instead of) the broader groups below. `AccessType` is `READ`, `WRITE`, or `READWRITE`.                                      |
| **`allVariables`**      | <code>string</code> | JSON-encoded string: `{"IsActive": boolean, "AccessType": "READ" \| "WRITE" \| "READWRITE"}`. When `IsActive` is `true`, requests the given access to every health/fitness variable the plugin supports.                                                                                                                             |
| **`fitnessVariables`**  | <code>string</code> | JSON-encoded string: `{"IsActive": boolean, "AccessType": "READ" \| "WRITE" \| "READWRITE"}`. Covers the "fitness" variable group: `STEPS`, `CALORIES_BURNED`, `DISTANCE`, `WALKING_SPEED`.                                                                                                                                          |
| **`healthVariables`**   | <code>string</code> | JSON-encoded string: `{"IsActive": boolean, "AccessType": "READ" \| "WRITE" \| "READWRITE"}`. Covers the "health" variable group: `HEART_RATE`, `SLEEP`, `BLOOD_PRESSURE`, `BLOOD_GLUCOSE`, `OXYGEN_SATURATION`, `BODY_TEMPERATURE` (iOS also includes dietary water and dietary energy consumed, which have no Android equivalent). |
| **`profileVariables`**  | <code>string</code> | JSON-encoded string: `{"IsActive": boolean, "AccessType": "READ" \| "WRITE" \| "READWRITE"}`. Covers the "profile" variable group: `WEIGHT`, `HEIGHT`, `BODY_FAT_PERCENTAGE`, `BASAL_METABOLIC_RATE`.                                                                                                                                |
| **`workoutVariables`**  | <code>string</code> | JSON-encoded string: `{"IsActive": boolean, "AccessType": "READ" \| "WRITE" \| "READWRITE"}`. Requests permission for HealthKit's workout type, needed for `getWorkoutData()`. iOS only - not supported on Android (`getWorkoutData()` is iOS only; this field is never read there).                                                 |


#### AdvancedQueryResult

| Prop                   | Type                                            | Description                                                                                                                                                                                                                                    |
| ---------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`results`**          | <code>string</code>                             | JSON-encoded string containing the raw result blocks.                                                                                                                                                                                          |
| **`resultDataPoints`** | <code>string</code>                             | JSON-encoded string containing chart-ready accelerator data points.                                                                                                                                                                            |
| **`warning`**          | <code>{ code: string; message: string; }</code> | Present only on Android, and only when `getData()`'s `TimeUnit` parameter is `MILLISECONDS` or `SECONDS` - both are deprecated on Health Connect, so the query silently runs with `TimeUnit: 'MINUTE'` instead. `code` is `OS-PLUG-HLFT-0405`. |


#### AdvancedQueryOptions

| Prop             | Type                | Description                                                                                                                                                                                                                                  |
| ---------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`parameters`** | <code>string</code> | JSON-encoded string containing the full query parameters object (variable, startDate, endDate, timeUnit, operationType, timeUnitLength, advancedQueryReturnType, advancedQueryResultType) - a single serialized blob, not individual fields. |


#### WorkoutAdvancedQueryResult

| Prop          | Type                | Description                                           |
| ------------- | ------------------- | ----------------------------------------------------- |
| **`results`** | <code>string</code> | JSON-encoded string containing the raw result blocks. |


#### WorkoutAdvancedQueryOptions

| Prop             | Type                | Description                                                                                                                                    |
| ---------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **`parameters`** | <code>string</code> | JSON-encoded string containing the full workout query parameters object (workoutTypeVariables, startDate, endDate) - a single serialized blob. |


#### WriteDataOptions

| Prop           | Type                | Description                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`variable`** | <code>string</code> | The health/fitness variable to write to. Android only accepts "profile" variables - `WEIGHT`, `HEIGHT`, `BODY_FAT_PERCENTAGE`, `BASAL_METABOLIC_RATE` - any other variable rejects with a "not a profile variable" error. iOS accepts most variables (anything HealthKit represents as a quantity, which includes the profile variables plus most fitness/health ones), except category-based ones like `SLEEP`. |
| **`value`**    | <code>number</code> | The value to write, in the variable's native unit (e.g. kg for `WEIGHT`).                                                                                                                                                                                                                                                                                                                                        |


#### GetLastRecordOptions

| Prop           | Type                | Description                                        |
| -------------- | ------------------- | -------------------------------------------------- |
| **`variable`** | <code>string</code> | The health/fitness variable to read, e.g. `STEPS`. |


#### SetBackgroundJobOptions

| Prop             | Type                | Description                                                                                                                                                                                                                                                             |
| ---------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`parameters`** | <code>string</code> | JSON-encoded string containing the full background job parameters object (variable, timeUnit, timeUnitGrouping, notificationFrequency, notificationFrequencyGrouping, jobFrequency, condition, value, notificationHeader, notificationBody) - a single serialized blob. |


#### DeleteBackgroundJobOptions

| Prop     | Type                | Description                                           |
| -------- | ------------------- | ----------------------------------------------------- |
| **`id`** | <code>string</code> | The background job's id, from `listBackgroundJobs()`. |


#### ListBackgroundJobsResult

| Prop       | Type                | Description                                                 |
| ---------- | ------------------- | ----------------------------------------------------------- |
| **`jobs`** | <code>string</code> | JSON-encoded string containing the list of background jobs. |


#### UpdateBackgroundJobOptions

| Prop             | Type                | Description                                                                                                                                                                                                               |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`parameters`** | <code>string</code> | JSON-encoded string containing the full update parameters object (id, notificationFrequency, notificationFrequencyGrouping, condition, value, notificationHeader, notificationBody, isActive) - a single serialized blob. |

</docgen-api>