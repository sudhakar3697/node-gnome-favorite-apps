const GnomeFavoriteApps = require('./index');


(async () => {
    try {

        // console.log('Initially', await GnomeFavoriteApps.get());
        // await GnomeFavoriteApps.add('org.gnome.Nautilus.desktop', 'sqlitebrowser.desktop');
        // console.log('After adding', await GnomeFavoriteApps.get());
        // await GnomeFavoriteApps.remove('org.gnome.Nautilus.desktop', 'sqlitebrowser.desktop');
        // console.log('After removing', await GnomeFavoriteApps.get());

        // const folderId = 'test123';
        // const displayName = 'Test 123';
        // const desktopFilesToAddToGroup = ['gsuite.desktop', 'gsuite.desktop'] // ['gsuite-calendar.desktop', 'gsuite.desktop'];
        // const desktopFilesToRemoveFromGroup = ['gsuite-calendar.desktop', 'gsuite.desktop'] // ['gsuite.desktop'];
        // console.log('Intially', await GnomeFavoriteApps.getAppsByGroup(folderId));
        // console.log(await GnomeFavoriteApps.addAppsToGroup(folderId, displayName, desktopFilesToAddToGroup));
        // console.log('After adding', await GnomeFavoriteApps.getAppsByGroup(folderId));
        // console.log(await GnomeFavoriteApps.removeAppsFromGroup(folderId, desktopFilesToRemoveFromGroup));
        // console.log('After removing', await GnomeFavoriteApps.getAppsByGroup(folderId));


        // const src = '/home/bremen/mainbranch/bremen_build/bremen/packages/bgOS/src/fx-service/controllers/gsuite-apps';
        // const desktopFilesToCopy = ['gsuite-calendar.desktop', 'gsuite.desktop'];
        // const desktopFilesToDelete = ['gsuite-calendar.desktop', 'gsuite.desktop'];
        // const global = false;
        // console.log(await GnomeFavoriteApps.addDesktopFiles(src, desktopFilesToCopy, global));
        // console.log(await GnomeFavoriteApps.deleteDesktopFiles(desktopFilesToDelete, global));
    }
    catch (err) {
        console.log(err.message);
    }
})();
