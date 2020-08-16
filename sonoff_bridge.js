// change prefix to change the root Folder for the States.
// Warning: Root Folder is under your javascript adapter
var prefix = 'system.sonoff-bridge.'

// add your mapping here
var mapping = {
    //example: "9G44A4":"DoorContactFrontDoor",
}

for (var key in mapping) {
    createState(prefix + mapping[key] , false, {
    read: true, 
    write: true, 
    name: mapping[key], 
    type: "boolean", 
    def: false
});
}

on({id: 'sonoff.0.sonoff-bridge.RfReceived_Data'/*sonoff-bridge RfReceived  Data*/, change: "any"}, function (obj) {
    let state = mapping[obj.newState.val]
    if(state != undefined){
        console.log("javascript.0.system.sonoff."+state);
        setState("javascript.0.system.sonoff."+state, true);
        let timeout = setTimeout(function () {
           setState("javascript.0.system.sonoff."+state, false);
        }, 1000);
    }    
});
