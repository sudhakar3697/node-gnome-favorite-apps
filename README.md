# gnome-favorite-apps
Get, Add, Remove Gnome favorite apps

Require the module

```
const GnomeFavoriteApps = require('gnome-favorite-apps');
```
or

```
import GnomeFavoriteApps from 'gnome-favorite-apps';

```

Usage

```
(async () => {
    console.log('Initially', await GnomeFavoriteApps.get());
    await GnomeFavoriteApps.add('org.gnome.Nautilus.desktop', 'sqlitebrowser.desktop');
    console.log('After adding', await GnomeFavoriteApps.get());
    await GnomeFavoriteApps.remove('org.gnome.Nautilus.desktop', 'sqlitebrowser.desktop');
    console.log('After removing', await GnomeFavoriteApps.get());
})();

```