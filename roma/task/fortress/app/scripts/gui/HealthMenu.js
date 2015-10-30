var HealthMenu = (function () {
    function HealthMenu(players) {
        var html = "";
        for (var p in players) {
            var team = players[p].getTeam();
            html += "<li><span> " + team.name + " </span><img src=" +
                Settings.REMOTE_ASSERT_SERVER + "data/images/Ireland.png> " +
                "<span id='" + team.teamId + "' class=health style=width:" + team.getPercentageHealth() +
                "%;background:" + team.color + "  ></span></li>";
        }
        $('.healthMenu').html(html);
        this.hide();
    }

    HealthMenu.prototype.show = function () {
        $('.healthMenu').show();
    };
    HealthMenu.prototype.hide = function () {
        $('.healthMenu').hide();
    };
    HealthMenu.prototype.update = function (teamRef) {
        $('#' + teamRef.teamId).animate({
            width: teamRef.getPercentageHealth() + "%",
        }, 300);
    };
    return HealthMenu;
})();
