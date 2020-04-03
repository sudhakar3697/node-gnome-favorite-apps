const util = require('util');
const exec = util.promisify(require('child_process').exec);
const os = require('os');
const fs = require('fs');
const copyFile = util.promisify(fs.copyFile);
const unlink = util.promisify(fs.unlink);
const path = require('path');

class GnomeFavoriteApps {

    static async get() {
        const favs = (await exec(`gsettings get org.gnome.shell favorite-apps`));
        if (favs.stderr)
            throw favs.stderr;
        else
            return favs.stdout.trim().replace(/\[/g, '').replace(/\]/g, '').replace(/\'/g, '').split(', ');
    }

    static async add(...apps) {
        const appsToAdd = apps.map(app => `'${app}'`);
        const favs = (await exec(`gsettings set org.gnome.shell favorite-apps "$(gsettings get org.gnome.shell favorite-apps | sed s/.$//), ${appsToAdd.join(', ')}]"`));
        if (favs.stderr)
            throw favs.stderr;
        else
            return favs.stdout.trim();
    }

    static async remove(...apps) {
        const appsToAdd = (await GnomeFavoriteApps.get()).filter(app => !apps.includes(app)).map(app => `'${app}'`);
        const favs = (await exec(`gsettings set org.gnome.shell favorite-apps "[${appsToAdd.join(', ')}]"`));
        if (favs.stderr)
            throw favs.stderr;
        else
            return favs.stdout.trim();
    }

    static async getAppsByGroup(folderId) {
        const apps = await exec(`gsettings get org.gnome.desktop.app-folders.folder:/org/gnome/desktop/app-folders/folders/${folderId}/ apps`);
        if (apps.stderr) {
            throw apps.stderr;
        }
        else {
            let res = apps.stdout.trim().replace(/\[/g, '').replace(/\]/g, '').replace(/\'/g, '').replace('@as ', '');
            return (res.length > 0) ? res.split(', ') : [];
        }
    }

    static async addAppsToGroup(folderId, displayName, desktopFiles) {
        try {
            await exec(`gsettings set org.gnome.desktop.app-folders folder-children "['${folderId}']"`);
            await exec(`gsettings set org.gnome.desktop.app-folders.folder:/org/gnome/desktop/app-folders/folders/${folderId}/ name '${displayName}'`);
            const appsToAdd = desktopFiles.map(app => `'${app}'`);
            if ((await GnomeFavoriteApps.getAppsByGroup(folderId)).length === 0) {
                await exec(`gsettings set org.gnome.desktop.app-folders.folder:/org/gnome/desktop/app-folders/folders/${folderId}/ apps "[${appsToAdd.join(', ')}]"`);
            }
            else {
                await exec(`gsettings set org.gnome.desktop.app-folders.folder:/org/gnome/desktop/app-folders/folders/${folderId}/ apps "$(gsettings get org.gnome.desktop.app-folders.folder:/org/gnome/desktop/app-folders/folders/${folderId}/ apps | sed s/.$//), ${appsToAdd.join(', ')}]"`);
            }
            return true;
        } catch (err) {
            throw err;
        }
    }

    static async removeAppsFromGroup(folderId, desktopFiles) {
        try {
            const appsToAdd = (await GnomeFavoriteApps.getAppsByGroup(folderId)).filter(app => !desktopFiles.includes(app)).map(app => `'${app}'`);
            await exec(`gsettings set org.gnome.desktop.app-folders.folder:/org/gnome/desktop/app-folders/folders/${folderId}/ apps "[${appsToAdd.join(', ')}]"`);
            return true;
        } catch (err) {
            throw err;
        }
    }

    static async addDesktopFiles(src, desktopFiles, global = false) {
        try {
            const dest = global ? '/usr/share/applications' : path.join(os.homedir(), '.local/share/applications');
            for await (const desktopFile of desktopFiles) {
                await copyFile(path.join(src, desktopFile), path.join(dest, desktopFile));
            }
            return true;
        } catch (err) {
            throw err;
        }
    }

    static async deleteDesktopFiles(desktopFiles, global = false) {
        try {
            const dest = global ? '/usr/share/applications' : path.join(os.homedir(), '.local/share/applications');
            for await (const desktopFile of desktopFiles) {
                await unlink(path.join(dest, desktopFile));
            }
            return true;
        } catch (err) {
            throw err;
        }
    }

}

module.exports = GnomeFavoriteApps;
