---
title: Capacitor Plugins
description: Capacitor Plugins
---

import DocsCard from '@components/global/DocsCard';
import DocsCards from '@components/global/DocsCards';

# Capacitor Plugins

Plugins in Capacitor enable JavaScript to interface directly with Native APIs.

<DocsCards>
  <DocsCard 
    header="Official plugins" 
    img="/img/v4/docs/capacitor-card.png" 
    href="/apis"
  >
    <p>
      Official Plugins are maintained by the Capacitor Team
    </p>
  </DocsCard>
  <DocsCard 
    header="Community plugins"
    img="/img/v4/docs/community-card.png"
    href="/plugins/community"
  >
    <p>
      Community Plugins are maintained by the Capacitor Community
    </p>
  </DocsCard>
</DocsCards>

<br/>

Web apps can access the full power of Native APIs with plugins. Plugins wrap common native operations that might use very different APIs across platforms while exposing a consistent, cross-platform API to JavaScript.

Additionally, the plugin capability in Capacitor makes it possible for teams with a mix of traditional native developers and web developers to work together on different parts of the app.

Capacitor automatically generates JavaScript hooks on the client, so most plugins only need to use Swift/Obj-C for iOS and/or Java/Kotlin for Android. Of course, adding custom JavaScript for a plugin is also possible.
