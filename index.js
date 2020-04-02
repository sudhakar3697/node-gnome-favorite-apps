const util = require('util');
const exec = util.promisify(require('child_process').exec);

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
}

module.exports = GnomeFavoriteApps;
