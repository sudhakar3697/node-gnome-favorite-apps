# gnome-favorite-apps

### Why?

1) To Get, Add, Remove Gnome favorite apps
2) To group launcher .desktop files (Perform Add, Remove, Get .desktop files on Groups)
3) Add & Delete .desktop files, To either local (~/.local/share/applications) or global(/usr/share/applications)


Usage 1

```
const GnomeFavoriteApps = require('gnome-favorite-apps');

(async () => {
    try {
        console.log('Initially', await GnomeFavoriteApps.get());
        await GnomeFavoriteApps.add('org.gnome.Nautilus.desktop', 'sqlitebrowser.desktop');
        console.log('After adding', await GnomeFavoriteApps.get());
        await GnomeFavoriteApps.remove('org.gnome.Nautilus.desktop', 'sqlitebrowser.desktop');
        console.log('After removing', await GnomeFavoriteApps.get());
    } catch (err) {
        console.error(err.message);
    }
})();

```

Usage 2

```
const GnomeFavoriteApps = require('gnome-favorite-apps');

(async () => {
    try {
        console.log('Intially', await GnomeFavoriteApps.getAppsByGroup('test12'));
        console.log(await GnomeFavoriteApps.addAppsToGroup('test12', 'Test', ['ab.desktop', 'xy.desktop']));
        console.log('After adding to group', await GnomeFavoriteApps.getAppsByGroup('test12'));
        console.log(await GnomeFavoriteApps.removeAppsFromGroup('test12', ['ab.desktop', 'xy.desktop']));
        console.log('After removing from group', await GnomeFavoriteApps.getAppsByGroup('test12'));
    } catch (err) {
        console.error(err.message);
    }
})();

```

Usage 3

```
const GnomeFavoriteApps = require('gnome-favorite-apps');

(async () => {
    try {
        console.log(await GnomeFavoriteApps.addDesktopFiles('/home/user1/apps', ['ab.desktop', 'xy.desktop'], false));
        console.log(await GnomeFavoriteApps.deleteDesktopFiles(['ab.desktop', 'xy.desktop'], false));
    } catch (err) {
        console.error(err.message);
    }
})();

```