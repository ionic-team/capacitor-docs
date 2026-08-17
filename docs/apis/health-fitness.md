---
title: Health Fitness Capacitor Plugin API
description: Access Android Health Connect and Apple HealthKit data for health and fitness apps.
custom_edit_url: https://github.com/ionic-team/capacitor-health-fitness/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-health-fitness/blob/main/src/definitions.ts
sidebar_label: Health Fitness
---

# @capacitor/health-fitness

Access Android Health Connect and Apple HealthKit data for health and fitness apps.

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

## Setup

- **Android:** required Health Connect permissions and the privacy-policy URL
  are configured via a `capacitor:sync:after` hook - see
  [`android/NOTES.md`](android/NOTES.md).
- **iOS:** the host app must declare `NSHealthShareUsageDescription` /
  `NSHealthUpdateUsageDescription` and enable the HealthKit capability - see
  [`ios/NOTES.md`](ios/NOTES.md).

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

Named distinctly from Capacitor's own `requestPermissions()` convention
(which expects a `Promise&lt;PermissionStatus&gt;` from a declarative
`@CapacitorPlugin(permissions = [...])` alias list) - this method takes
pre-serialized JSON descriptors and resolves void, matching the existing
Cordova wire format instead.

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
query. Always rejects with `HealthFitnessError.OPERATION_NOT_ALLOWED`
(code 102) on Android.

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

Android only (see the class-level note on the current iOS/Android parity gap).

**Since:** 1.0.0

--------------------


### openHealthConnect()

```typescript
openHealthConnect() => Promise<void>
```

Android only (see the class-level note on the current iOS/Android parity gap).

**Since:** 1.0.0

--------------------


### Interfaces


#### RequestHealthPermissionsOptions

| Prop                    | Type                | Description                                                                                                                                                                                                                                                         |
| ----------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`customPermissions`** | <code>string</code> | JSON-encoded string (array of custom permission descriptors), matching the existing Cordova plugin's wire format exactly.                                                                                                                                           |
| **`allVariables`**      | <code>string</code> | JSON-encoded string (group permission descriptor).                                                                                                                                                                                                                  |
| **`fitnessVariables`**  | <code>string</code> | JSON-encoded string (group permission descriptor).                                                                                                                                                                                                                  |
| **`healthVariables`**   | <code>string</code> | JSON-encoded string (group permission descriptor).                                                                                                                                                                                                                  |
| **`profileVariables`**  | <code>string</code> | JSON-encoded string (group permission descriptor).                                                                                                                                                                                                                  |
| **`workoutVariables`**  | <code>string</code> | JSON-encoded string (group permission descriptor). NOTE: not actually read on either platform in the current implementation (Android never parses this argument; iOS reads an out-of-bounds index). Preserved as-is for wire-format parity with the Cordova plugin. |


#### AdvancedQueryResult

| Prop                   | Type                                            | Description                                                                  |
| ---------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- |
| **`results`**          | <code>string</code>                             | JSON-encoded string containing the raw result blocks.                        |
| **`resultDataPoints`** | <code>string</code>                             | JSON-encoded string containing chart-ready accelerator data points.          |
| **`warning`**          | <code>{ code: number; message: string; }</code> | Present only when the query hit a deprecated-parameter path (e.g. TimeUnit). |


#### AdvancedQueryOptions

| Prop             | Type                | Description                                                                                                                                                                                                                                                                                             |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`parameters`** | <code>string</code> | JSON-encoded string containing the full query parameters object (variable, startDate, endDate, timeUnit, operationType, timeUnitLength, advancedQueryReturnType, advancedQueryResultType). Matches the existing Cordova plugin's wire format exactly - a single serialized blob, not individual fields. |


#### WorkoutAdvancedQueryResult

| Prop          | Type                |
| ------------- | ------------------- |
| **`results`** | <code>string</code> |


#### WorkoutAdvancedQueryOptions

| Prop             | Type                | Description                                                                                                                                                                                               |
| ---------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`parameters`** | <code>string</code> | JSON-encoded string containing the full workout query parameters object (workoutTypeVariables, startDate, endDate). Matches the existing Cordova plugin's wire format exactly - a single serialized blob. |


#### WriteDataOptions

| Prop           | Type                |
| -------------- | ------------------- |
| **`variable`** | <code>string</code> |
| **`value`**    | <code>number</code> |


#### GetLastRecordOptions

| Prop           | Type                |
| -------------- | ------------------- |
| **`variable`** | <code>string</code> |


#### SetBackgroundJobOptions

| Prop             | Type                | Description                                                                                                                                                                                                                                                                                                                        |
| ---------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`parameters`** | <code>string</code> | JSON-encoded string containing the full background job parameters object (variable, timeUnit, timeUnitGrouping, notificationFrequency, notificationFrequencyGrouping, jobFrequency, condition, value, notificationHeader, notificationBody). Matches the existing Cordova plugin's wire format exactly - a single serialized blob. |


#### DeleteBackgroundJobOptions

| Prop     | Type                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |


#### ListBackgroundJobsResult

| Prop       | Type                | Description                                                 |
| ---------- | ------------------- | ----------------------------------------------------------- |
| **`jobs`** | <code>string</code> | JSON-encoded string containing the list of background jobs. |


#### UpdateBackgroundJobOptions

| Prop             | Type                | Description                                                                                                                                                                                                                                                                          |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`parameters`** | <code>string</code> | JSON-encoded string containing the full update parameters object (id, notificationFrequency, notificationFrequencyGrouping, condition, value, notificationHeader, notificationBody, isActive). Matches the existing Cordova plugin's wire format exactly - a single serialized blob. |

</docgen-api>