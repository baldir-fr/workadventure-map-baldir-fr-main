/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

// https://github.com/workadventure/scripting-api-extra
// https://github.com/ValdoTR/wa-internal-map/blob/master/src/index.ts
import {bootstrapExtra} from "@workadventure/scripting-api-extra";

async function extendedFeatures() {
    try {  
        await bootstrapExtra();
        // do async stuff here
    } catch (error) {
        console.error('Scripting API Extra ERROR',error);
    }
}
extendedFeatures();

//  WA.state.saveVariable('dontShowGatherPopup', true)

let currentPopup: any = undefined;
let isMeetingRoomLightened: boolean = false;
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();

WA.room.onEnterZone('clock', () => {
    currentPopup =  WA.ui.openPopup("clockPopup","It's " + time,[]);
})

WA.room.onLeaveZone('clock', closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
function toggleMeetingRoomLight(){
    isMeetingRoomLightened = ! isMeetingRoomLightened;
    if(isMeetingRoomLightened)
        WA.room.hideLayer('jitsiMeetingRoomLights');
    else
        WA.room.showLayer('jitsiMeetingRoomLights');
}
WA.room.onEnterZone('jitsiMeetingRoomLights', () => {
    // Light up the room
    WA.room.hideLayer('jitsiMeetingRoomLights');
})

WA.room.onLeaveZone('jitsiMeetingRoomLights', () => {
    WA.room.showLayer('jitsiMeetingRoomLights');
    // Shut down lights when leaving
})