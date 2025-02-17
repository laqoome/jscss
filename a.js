
function indexAppGroups() {
    let elementsIndex = [],
        groupsIndex = [],
        g = i = 0;
    PAGE.appGroups.forEach(group => {
        group.items.forEach(item => {
            if (typeof elementsIndex[item.file] == 'undefined') {
                elementsIndex[item.file] = [];
            }
            elementsIndex[item.file].push({
                group: g,
                item: i
            });
            i++;
        });
        groupsIndex[group.group] = g;
        g++;
        i = 0;
    });
    return {
        panelElements: elementsIndex,
        groups: groupsIndex
    };
}

(() => {
    if (typeof changeElements == "undefined") {
        return console.log("ElementChanger: changeElements variable is not defined. No elements changed.");
    }
    if (changeElements.length == 0) {
        return console.log('ElementChanger: Nothing to modify.');
    }

    // Index changeElements
    var toChange = {
        // Remove first, then modify, then add
        remove: [],
        modify: [],
        add: []
    };
    changeElements.forEach(e => {
        if (typeof e.action == 'undefined') {
            e.action = 'modify';
        }
        if (!['modify', 'remove', 'add'].includes(e.action)) {
            console.log(`ElementChanger: Illegal action ${e.action} specified for the following element:`, e);
            return;
        }
        toChange[e.action].push(e);
    });

    // Remove elements
    if (toChange.remove.length > 0) {
        let elementsIndex = indexAppGroups().panelElements;
        toChange.remove.forEach(r => {
            if (typeof elementsIndex[r.name] == 'undefined') {
                return console.log(`ElementChanger: Trying to remove element "${r.name}" which does not exist.`)
            }
            elementsIndex[r.name].forEach(e => {
                PAGE.appGroups[e.group].items = PAGE.appGroups[e.group].items.filter(i => i.file != r.name);
            });
        });
    }

    // Modify elements
    let elementsIndex = indexAppGroups().panelElements;
    toChange.modify.forEach(c => {
        if (typeof elementsIndex[c.name] == 'undefined') {
            return console.log(`ElementChanger: Trying to change element "${c.name}" which does not exist.`);
        }
        elementsIndex[c.name].forEach(e => {
            PAGE.appGroups[e.group].items[e.item][c.attr] = c.value;
        })
    });

    // Add elements
    let groupsIndex = indexAppGroups().groups;
    var addedElementsIcon = [];
    toChange.add.forEach(a => {
        if (typeof groupsIndex[a.group] == 'undefined') {
            return console.log(`ElementChanger: Trying to add an element to "${a.group}" group which does not exist.`)
        }
        let file_id = `added_${a.name.replace(/\s+/g, '_')}${Math.floor(Math.random() * 100)}`;
        PAGE.appGroups[groupsIndex[a.group]].items.push({
            "file": file_id,
            "imgtype": "icon",
            "group": a.group,
            "itemdesc": a.name,
            "url": a.link,
            "type": "image",
            "height": "48",
            "width": "48",
            "searchtext": a.search_text ?? ""
        });
        addedElementsIcon.push({
            target: `icon-${file_id}`,
            icon: a.icon
        });
    });

    // Add icons to added elements
    function ElementChanger_AddMissingIcons() {
        if (document.getElementById('preferences-group') === null) {
            return setTimeout(() => {
                ElementChanger_AddMissingIcons();
            }, 100);
        }
        if (addedElementsIcon.length < 1) {
            return;
        }
        console.log('ElementChanger: Adding icons...');
        addedElementsIcon.forEach(e => {
            document.getElementById(e.target).innerHTML = `<img class="itemImageWrapper integrations_icon spriteicon_img" src="${e.icon}"/>`
        });
        return console.log('ElementChanger: All modifications have been made.');
    }
    document.addEventListener("DOMContentLoaded", () => {
        ElementChanger_AddMissingIcons();
    });

    // Done!
    if (addedElementsIcon.length < 1) {
        return console.log('ElementChanger: All modifications have been made.');
    }
})();




function sidebarhide() {
    if (document.getElementById("sidebar") != null) {

        var sidebar = document.getElementById("sidebar"); //.style.display = "none"; //Remove Sidebar
        sidebar.parentNode.removeChild(sidebar);
        var mblesidebar = document.getElementById("btnSideBarToggle"); //.style.display = "none"; //Remove Sidebar Button on Mobile
        mblesidebar.parentNode.removeChild(mblesidebar);

        document.getElementById("imgPoweredByCpanel").style.display = "none"; //


    } else {
        setTimeout(sidebarhide, 100);
    }
}



setTimeout(sidebarhide, 100);

window.onload = function() {

    document.querySelectorAll('input[type="hidden"]').forEach(function(element) {
        element.style.display = 'none';
    });

  
    document.querySelector('.btn').style.display = 'none';

 
    hideElementByText("SEARCH FOR A NEW DOMAIN NAME");
};

check = document.getElementById("main");
if (check == null) {
	dropdown = document.getElementById("btnUserPref");
	dropdown.onclick = function() {
		if (dropdown.parentElement.classList.contains("open")) {
			dropdown.parentElement.classList.remove("open");
		} else {
			dropdown.parentElement.classList.add("open");
		}
	}
}
