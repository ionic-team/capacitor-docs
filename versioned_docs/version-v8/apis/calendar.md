---
title: Calendar Capacitor Plugin API
description: Create, find, modify and remove events in the device calendar.
custom_edit_url: https://github.com/ionic-team/capacitor-calendar/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-calendar/blob/main/src/definitions.ts
sidebar_label: Calendar
---

# @capacitor/calendar

Create, find, modify and remove events in the device calendar.

## Install

To use npm

```bash
npm install @capacitor/calendar
```

To use yarn

```bash
yarn add @capacitor/calendar
```

Sync native files

```bash
npx cap sync
```

## iOS

Add the calendar usage-description keys to your app's `Info.plist`; iOS
crashes on first calendar access without them. iOS 17 split calendar access
into two levels with their own keys; keep the pre-17 key for older devices:

```xml
<key>NSCalendarsFullAccessUsageDescription</key>
<string>We need access to your calendar to search, create and remove events.</string>
<key>NSCalendarsWriteOnlyAccessUsageDescription</key>
<string>We need access to your calendar to create events.</string>
<key>NSCalendarsUsageDescription</key>
<string>We need access to your calendar to search, create and remove events.</string>
```

Notes:

- The plugin uses the current EventKit access APIs
  (`requestFullAccessToEvents` / `requestWriteOnlyAccessToEvents` on iOS
  17+), never the deprecated `requestAccess(to:)`. `writeCalendar` is
  satisfied by write-only access ("Add Events Only"); `readCalendar`
  requires full access.
- `createEventInteractively` presents the system event editor, which on
  iOS 17+ needs no calendar permission at all.
- EventKit stores dates at second granularity, so `startDate`/`endDate`
  read back with milliseconds truncated. Android keeps exact milliseconds.

## Android

The plugin declares `READ_CALENDAR` and `WRITE_CALENDAR` in its own
manifest; Gradle manifest merging adds them to your app automatically.
Methods also request the runtime permission they need when it has not been
granted yet: read for `findEvents`/`listCalendars`, write for
`createEvent`/`createCalendar`, both for `modifyEvent`/`deleteEvent`/
`deleteCalendar`.

Platform notes:

- `createEventInteractively` opens the system calendar editor, which
  reports neither the saved event's id nor a cancel, so the call resolves
  with an empty result when the editor closes.
- `CreateEventOptions.url` is ignored: the platform's event model has no
  URL field.

## Errors

Every rejection carries a structured code + message:

| Code                 | Meaning                                      |
| -------------------- | -------------------------------------------- |
| `OS-PLUG-CLDR-0000` | Unknown error                                |
| `OS-PLUG-CLDR-0001` | Invalid argument (e.g. no matching event)    |
| `OS-PLUG-CLDR-0003` | Pending operation (e.g. editor already open) |
| `OS-PLUG-CLDR-0004` | I/O error                                    |
| `OS-PLUG-CLDR-0005` | Not supported                                |
| `OS-PLUG-CLDR-0006` | Operation cancelled (editor closed)          |
| `OS-PLUG-CLDR-0020` | Permission denied                            |

## API

<docgen-index>

* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [`createEvent(...)`](#createevent)
* [`createEventInteractively(...)`](#createeventinteractively)
* [`modifyEvent(...)`](#modifyevent)
* [`findEvents(...)`](#findevents)
* [`deleteEvent(...)`](#deleteevent)
* [`listCalendars()`](#listcalendars)
* [`createCalendar(...)`](#createcalendar)
* [`deleteCalendar(...)`](#deletecalendar)
* [`openCalendar(...)`](#opencalendar)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### checkPermissions()

```typescript
checkPermissions() => Promise<CalendarPermissionStatus>
```

Returns the current calendar permission state without prompting.

On iOS 17+, `readCalendar` reflects full access; `writeCalendar` is also
granted by write-only access ("Add Events Only").

**Returns:** <code>Promise&lt;<a href="#calendarpermissionstatus">CalendarPermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(options?: RequestPermissionsOptions | undefined) => Promise<CalendarPermissionStatus>
```

Prompts for the given calendar permissions (both when omitted).

On iOS, requesting `readCalendar` prompts for full access; requesting only
`writeCalendar` prompts for write-only access on iOS 17+.

| Param         | Type                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#requestpermissionsoptions">RequestPermissionsOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#calendarpermissionstatus">CalendarPermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### createEvent(...)

```typescript
createEvent(options: CreateEventOptions) => Promise<CreateEventResult>
```

Creates a calendar event silently and resolves with its id.

Requires write permission; requests it when not yet determined.

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#createeventoptions">CreateEventOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#createeventresult">CreateEventResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### createEventInteractively(...)

```typescript
createEventInteractively(options: CreateEventOptions) => Promise<CreateEventResult>
```

Opens the system event-editing UI prefilled with the given values.
Resolves when the user saves (with the new event's id where the platform
provides one; Android does not) and fails with `OS-PLUG-CLDR-0006` when
the user cancels.

On iOS 17+ the editor needs no calendar permission. On Android and older
iOS versions, write permission is requested first.

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#createeventoptions">CreateEventOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#createeventresult">CreateEventResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### modifyEvent(...)

```typescript
modifyEvent(options: ModifyEventOptions) => Promise<void>
```

Updates the first event matching `filter` with the values in `newEvent`.
Only the fields present in `newEvent` are changed. Fails with
`OS-PLUG-CLDR-0001` when no event matches.

Requires read and write permission.

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#modifyeventoptions">ModifyEventOptions</a></code> |

**Since:** 1.0.0

--------------------


### findEvents(...)

```typescript
findEvents(options: FindEventsOptions) => Promise<FindEventsResult>
```

Returns events matching the filter fields within the date range.
`title`, `location` and `notes` match case-insensitive substrings;
`calendarName` restricts the search to that calendar. A recurring
event is returned once per occurrence in the range, each with its
own dates.

Requires read permission.

| Param         | Type                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#findeventsoptions">FindEventsOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#findeventsresult">FindEventsResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### deleteEvent(...)

```typescript
deleteEvent(options: DeleteEventOptions) => Promise<void>
```

Deletes events: by `id` when given, otherwise every event matching the
filter fields. Fails with `OS-PLUG-CLDR-0001` when nothing matches.
Deleting a recurring event removes the entire series.

Requires read and write permission.

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#deleteeventoptions">DeleteEventOptions</a></code> |

**Since:** 1.0.0

--------------------


### listCalendars()

```typescript
listCalendars() => Promise<ListCalendarsResult>
```

Returns the calendars available on the device.

Requires read permission.

**Returns:** <code>Promise&lt;<a href="#listcalendarsresult">ListCalendarsResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### createCalendar(...)

```typescript
createCalendar(options: CreateCalendarOptions) => Promise<CreateCalendarResult>
```

Creates a calendar and resolves with its id.

Requires write permission.

| Param         | Type                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#createcalendaroptions">CreateCalendarOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#createcalendarresult">CreateCalendarResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### deleteCalendar(...)

```typescript
deleteCalendar(options: DeleteCalendarOptions) => Promise<void>
```

Deletes the calendar with the given name. Fails with
`OS-PLUG-CLDR-0001` when no calendar has that name.

Requires read and write permission.

| Param         | Type                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#deletecalendaroptions">DeleteCalendarOptions</a></code> |

**Since:** 1.0.0

--------------------


### openCalendar(...)

```typescript
openCalendar(options?: OpenCalendarOptions | undefined) => Promise<void>
```

Opens the system calendar app at the given date (today when omitted).
Needs no calendar permission.

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#opencalendaroptions">OpenCalendarOptions</a></code> |

**Since:** 1.0.0

--------------------


### Interfaces


#### CalendarPermissionStatus

Permission state per calendar permission.

| Prop                | Type                                                        | Description                               | Since |
| ------------------- | ----------------------------------------------------------- | ----------------------------------------- | ----- |
| **`readCalendar`**  | <code><a href="#permissionstate">PermissionState</a></code> | Permission to read calendar events.       | 1.0.0 |
| **`writeCalendar`** | <code><a href="#permissionstate">PermissionState</a></code> | Permission to add events to the calendar. | 1.0.0 |


#### RequestPermissionsOptions

Options accepted by {@link CalendarPlugin.requestPermissions}.

| Prop              | Type                                  | Description                                                  | Since |
| ----------------- | ------------------------------------- | ------------------------------------------------------------ | ----- |
| **`permissions`** | <code>CalendarPermissionType[]</code> | The permissions to request. Both are requested when omitted. | 1.0.0 |


#### CreateEventResult

Result of {@link CalendarPlugin.createEvent} and
{@link CalendarPlugin.createEventInteractively}.

| Prop     | Type                | Description                                                                                         | Since |
| -------- | ------------------- | --------------------------------------------------------------------------------------------------- | ----- |
| **`id`** | <code>string</code> | The created event's id. Absent when the platform does not report it (Android's interactive editor). | 1.0.0 |


#### CreateEventOptions

Options accepted by {@link CalendarPlugin.createEvent} and
{@link CalendarPlugin.createEventInteractively}, and the new values of
{@link CalendarPlugin.modifyEvent}.

| Prop                        | Type                                                        | Description                                                                                                                        | Since |
| --------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`title`**                 | <code>string</code>                                         | The event title.                                                                                                                   | 1.0.0 |
| **`location`**              | <code>string</code>                                         | The event location.                                                                                                                | 1.0.0 |
| **`notes`**                 | <code>string</code>                                         | Free-form event notes.                                                                                                             | 1.0.0 |
| **`startDate`**             | <code>number</code>                                         | Event start as epoch milliseconds.                                                                                                 | 1.0.0 |
| **`endDate`**               | <code>number</code>                                         | Event end as epoch milliseconds.                                                                                                   | 1.0.0 |
| **`isAllDay`**              | <code>boolean</code>                                        | Whether the event lasts all day.                                                                                                   | 1.0.0 |
| **`calendarId`**            | <code>string</code>                                         | Id of the calendar to create the event in. Takes precedence over `calendarName`; the default calendar is used when neither is set. | 1.0.0 |
| **`calendarName`**          | <code>string</code>                                         | Name of the calendar to create the event in.                                                                                       | 1.0.0 |
| **`url`**                   | <code>string</code>                                         | URL attached to the event. **Android:** the platform's event model has no URL field; the value is ignored.                         | 1.0.0 |
| **`firstReminderMinutes`**  | <code>number</code>                                         | Minutes before the event for the first reminder.                                                                                   | 1.0.0 |
| **`secondReminderMinutes`** | <code>number</code>                                         | Minutes before the event for the second reminder.                                                                                  | 1.0.0 |
| **`recurrence`**            | <code><a href="#eventrecurrence">EventRecurrence</a></code> | Recurrence rule for a repeating event.                                                                                             | 1.0.0 |


#### EventRecurrence

Recurrence rule applied to a created event.

| Prop            | Type                                                                | Description                                                                                                                   | Since |
| --------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`frequency`** | <code><a href="#recurrencefrequency">RecurrenceFrequency</a></code> | How often the event repeats.                                                                                                  | 1.0.0 |
| **`interval`**  | <code>number</code>                                                 | Repeat every `interval` periods of `frequency` (default 1).                                                                   | 1.0.0 |
| **`endDate`**   | <code>number</code>                                                 | Last possible date of a repetition, as epoch milliseconds. Mutually exclusive with `count`; `endDate` wins when both are set. | 1.0.0 |
| **`count`**     | <code>number</code>                                                 | Total number of repetitions.                                                                                                  | 1.0.0 |


#### ModifyEventOptions

Options accepted by {@link CalendarPlugin.modifyEvent}.

| Prop           | Type                                                                                                    | Description                                               | Since |
| -------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ----- |
| **`filter`**   | <code><a href="#eventfilter">EventFilter</a></code>                                                     | Fields identifying the event to change.                   | 1.0.0 |
| **`newEvent`** | <code><a href="#partial">Partial</a>&lt;<a href="#createeventoptions">CreateEventOptions</a>&gt;</code> | New values to apply. Only the fields present are changed. | 1.0.0 |


#### EventFilter

Fields used to locate the event to change in
{@link CalendarPlugin.modifyEvent}. Set fields must all match.

| Prop               | Type                | Description                                        | Since |
| ------------------ | ------------------- | -------------------------------------------------- | ----- |
| **`title`**        | <code>string</code> | Title substring to match (case-insensitive).       | 1.0.0 |
| **`location`**     | <code>string</code> | Location substring to match (case-insensitive).    | 1.0.0 |
| **`notes`**        | <code>string</code> | Notes substring to match (case-insensitive).       | 1.0.0 |
| **`startDate`**    | <code>number</code> | Start of the date range as epoch milliseconds.     | 1.0.0 |
| **`endDate`**      | <code>number</code> | End of the date range as epoch milliseconds.       | 1.0.0 |
| **`calendarName`** | <code>string</code> | Restrict the match to the calendar with this name. | 1.0.0 |


#### FindEventsResult

Result of {@link CalendarPlugin.findEvents}.

| Prop         | Type                         | Description                     | Since |
| ------------ | ---------------------------- | ------------------------------- | ----- |
| **`events`** | <code>CalendarEvent[]</code> | The events matching the search. | 1.0.0 |


#### CalendarEvent

A calendar event.

| Prop               | Type                         | Description                                            | Since |
| ------------------ | ---------------------------- | ------------------------------------------------------ | ----- |
| **`id`**           | <code>string</code>          | Platform-assigned event id.                            | 1.0.0 |
| **`title`**        | <code>string</code>          | The event title.                                       | 1.0.0 |
| **`location`**     | <code>string</code>          | The event location.                                    | 1.0.0 |
| **`notes`**        | <code>string</code>          | Free-form event notes.                                 | 1.0.0 |
| **`startDate`**    | <code>number</code>          | Event start as epoch milliseconds.                     | 1.0.0 |
| **`endDate`**      | <code>number</code>          | Event end as epoch milliseconds.                       | 1.0.0 |
| **`isAllDay`**     | <code>boolean</code>         | Whether the event lasts all day.                       | 1.0.0 |
| **`calendarId`**   | <code>string</code>          | Id of the calendar containing the event.               | 1.0.0 |
| **`calendarName`** | <code>string</code>          | Name of the calendar containing the event.             | 1.0.0 |
| **`attendees`**    | <code>EventAttendee[]</code> | The event's attendees. Absent when the event has none. | 1.0.0 |


#### EventAttendee

An attendee of a {@link <a href="#calendarevent">CalendarEvent</a>}.

| Prop         | Type                                                                                                                         | Description                          | Since |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ----- |
| **`name`**   | <code>string</code>                                                                                                          | The attendee's display name.         | 1.0.0 |
| **`email`**  | <code>string</code>                                                                                                          | The attendee's email address.        | 1.0.0 |
| **`status`** | <code>'unknown' \| 'pending' \| 'accepted' \| 'declined' \| 'tentative' \| 'delegated' \| 'completed' \| 'in-process'</code> | The attendee's participation status. | 1.0.0 |


#### FindEventsOptions

Options accepted by {@link CalendarPlugin.findEvents}.

| Prop               | Type                | Description                                                                                     | Since |
| ------------------ | ------------------- | ----------------------------------------------------------------------------------------------- | ----- |
| **`title`**        | <code>string</code> | Title substring to match (case-insensitive).                                                    | 1.0.0 |
| **`location`**     | <code>string</code> | Location substring to match (case-insensitive).                                                 | 1.0.0 |
| **`notes`**        | <code>string</code> | Notes substring to match (case-insensitive).                                                    | 1.0.0 |
| **`startDate`**    | <code>number</code> | Start of the search range as epoch milliseconds. Defaults to the current time minus six months. | 1.0.0 |
| **`endDate`**      | <code>number</code> | End of the search range as epoch milliseconds. Defaults to the current time plus two years.     | 1.0.0 |
| **`calendarName`** | <code>string</code> | Restrict the search to the calendar with this name.                                             | 1.0.0 |


#### DeleteEventOptions

Options accepted by {@link CalendarPlugin.deleteEvent}.

| Prop               | Type                | Description                                                                                                                        | Since |
| ------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**           | <code>string</code> | Id of the event to delete. When set, the filter fields are ignored.                                                                | 1.0.0 |
| **`fromDate`**     | <code>number</code> | Only with `id`, for a recurring event: keeps occurrences before this date (epoch milliseconds) and removes the rest of the series. | 1.0.0 |
| **`title`**        | <code>string</code> | Title substring to match (case-insensitive).                                                                                       | 1.0.0 |
| **`location`**     | <code>string</code> | Location substring to match (case-insensitive).                                                                                    | 1.0.0 |
| **`notes`**        | <code>string</code> | Notes substring to match (case-insensitive).                                                                                       | 1.0.0 |
| **`startDate`**    | <code>number</code> | Start of the date range as epoch milliseconds.                                                                                     | 1.0.0 |
| **`endDate`**      | <code>number</code> | End of the date range as epoch milliseconds.                                                                                       | 1.0.0 |
| **`calendarName`** | <code>string</code> | Restrict the match to the calendar with this name.                                                                                 | 1.0.0 |


#### ListCalendarsResult

Result of {@link CalendarPlugin.listCalendars}.

| Prop            | Type                          | Description                  | Since |
| --------------- | ----------------------------- | ---------------------------- | ----- |
| **`calendars`** | <code>DeviceCalendar[]</code> | The calendars on the device. | 1.0.0 |


#### DeviceCalendar

A calendar available on the device.

| Prop              | Type                 | Description                                                             | Since |
| ----------------- | -------------------- | ----------------------------------------------------------------------- | ----- |
| **`id`**          | <code>string</code>  | Platform-assigned calendar id.                                          | 1.0.0 |
| **`name`**        | <code>string</code>  | The calendar name.                                                      | 1.0.0 |
| **`displayName`** | <code>string</code>  | Name shown to the user, when the platform distinguishes it from `name`. | 1.0.0 |
| **`isPrimary`**   | <code>boolean</code> | Whether this is the default calendar for new events.                    | 1.0.0 |


#### CreateCalendarResult

Result of {@link CalendarPlugin.createCalendar}.

| Prop     | Type                | Description                | Since |
| -------- | ------------------- | -------------------------- | ----- |
| **`id`** | <code>string</code> | The created calendar's id. | 1.0.0 |


#### CreateCalendarOptions

Options accepted by {@link CalendarPlugin.createCalendar}.

| Prop        | Type                | Description                                                                    | Since |
| ----------- | ------------------- | ------------------------------------------------------------------------------ | ----- |
| **`name`**  | <code>string</code> | The calendar name.                                                             | 1.0.0 |
| **`color`** | <code>string</code> | Calendar color as a `#RRGGBB` hex string. The platform picks one when omitted. | 1.0.0 |


#### DeleteCalendarOptions

Options accepted by {@link CalendarPlugin.deleteCalendar}.

| Prop       | Type                | Description                     | Since |
| ---------- | ------------------- | ------------------------------- | ----- |
| **`name`** | <code>string</code> | Name of the calendar to delete. | 1.0.0 |


#### OpenCalendarOptions

Options accepted by {@link CalendarPlugin.openCalendar}.

| Prop       | Type                | Description                                              | Since |
| ---------- | ------------------- | -------------------------------------------------------- | ----- |
| **`date`** | <code>number</code> | Date to show, as epoch milliseconds. Today when omitted. | 1.0.0 |


### Type Aliases


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### CalendarPermissionType

The individually requestable calendar permissions.

<code>'readCalendar' | 'writeCalendar'</code>


#### RecurrenceFrequency

How often a recurring event repeats.

<code>'daily' | 'weekly' | 'monthly' | 'yearly'</code>


#### Partial

Make all properties in T optional

<code>{ [P in keyof T]?: T[P]; }</code>

</docgen-api>