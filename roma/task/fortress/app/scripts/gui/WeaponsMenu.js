var WeaponsMenu = (function () {
    function WeaponsMenu() {
        this.cssId = "weaponsMenu";
        this.toggleButtonCssId = "weaponsMenuBtn";
        $('body').append("<div id=" + this.cssId + "><div id=" + this.toggleButtonCssId + ">Weapons Menu</div><div id=content></div></div>");
        this.htmlElement = $("#" + this.cssId);
        $('#' + this.toggleButtonCssId).click(function () {
            if (Client.isClientsTurn()) {
                _this.toggle();
            }
        });
        var _this = this;
        $(window).keypress(function (event) {
            if (Client.isClientsTurn() && Controls.checkControls(Controls.toggleWeaponMenu, event.which)) {
                _this.toggle();
            }
        });
        $('body').mousedown(function (event) {
            if (Client.isClientsTurn() && Controls.checkControls(Controls.toggleWeaponMenu, event.which)) {
                this.toggle();
            }
        });
        $('body').on('contextmenu', "#" + this.cssId, function (e) {
            return false;
        });
        this.isVisable = false;
    }

    WeaponsMenu.prototype.selectWeapon = function (weaponId) {
        var weaponMgmt = GameInstance.state.getCurrentPlayer().getTeam().getWeaponManager();
        //Checks if the weapon has ammo to provide the html been hacked and a weaponid passed that doesn't have ammo
        if (weaponMgmt.checkWeaponHasAmmo(weaponId)) {
            weaponMgmt.setCurrentWeapon(weaponId);
            Client.sendImmediately(Events.client.ACTION, new InstructionChain("state.getCurrentPlayer.getTeam.getWeaponManager.setCurrentWeapon", [weaponId]));
        }
    };
    WeaponsMenu.prototype.show = function () {
        this.htmlElement.show();
    };
    WeaponsMenu.prototype.refresh = function () {
        var weaponMgmt = GameInstance.state.getCurrentPlayer().getTeam().getWeaponManager();
        this.populateMenu(weaponMgmt.getListOfWeapons());
    };
    WeaponsMenu.prototype.toggle = function () {
        // populate
        this.refresh();
        var moveAmountInPx;
        if (this.isVisable) {
            moveAmountInPx = "0px";
            this.isVisable = false;
        }
        else {
            moveAmountInPx = "-275px";
            this.isVisable = true;
        }
        this.htmlElement.animate({
            marginLeft: moveAmountInPx,
        }, 400);
    };
    //Fills the menu up with the various weapon items
    WeaponsMenu.prototype.populateMenu = function (listOfWeapons) {
        var html = "<ul class = \"thumbnails\" >";
        for (var weapon in listOfWeapons) {
            var currentWeapon = listOfWeapons[weapon];
            var cssClassType = "ammo";
            if (currentWeapon.ammo <= 0) {
                cssClassType = "noAmmo";
                weapon = "-1";
            }
            html += "<li class=span1 id=" + weapon + ">";
            html += "<a  class=\"thumbnail " + cssClassType + "\" id=" + weapon + " value=" + currentWeapon.name + "  title= " + currentWeapon.name + "><span class=ammoCount> " + currentWeapon.ammo + "</span><img title= " + currentWeapon.name + " src=" + currentWeapon.iconImage.src + " alt=" + currentWeapon.name + "></a>";
            html += "</li>";
        }
        html += "</ul>";
        //Should of just used a CSS class and then an ID selector, oh well fuck it, it works!
        $($(this.htmlElement).children().get(1)).empty();
        $($(this.htmlElement).children().get(1)).append(html);
        var _this = this;
        $("#" + this.cssId + " li").click(function () {
            var weaponId = parseInt($(this).attr('id'));
            if (weaponId == -1) {
                AssetManager.getSound("cantclickhere").play();
                return;
            }
            AssetManager.getSound("CursorSelect").play();
            _this.selectWeapon(weaponId);
            _this.toggle();
        });
    };
    return WeaponsMenu;
})();
