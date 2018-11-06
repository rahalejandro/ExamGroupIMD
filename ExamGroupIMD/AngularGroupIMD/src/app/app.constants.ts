export class AppConstants {
    public static urlAPI = 'http://localhost:36365/api/';
    public static urlClip = AppConstants.urlAPI + 'clip/';
    public static urlReel = AppConstants.urlAPI + 'reel/';
    public static addTitle = 'Add ShowReel';
    public static editTitle = 'Edit ShowReel';
    public static listTitle = 'ShowReel List';
    public static urlDefault = '/showreels';
    public static urlDefaultEdit = '/showreels/0/edit'; 
    public static validationShowReelMessages = {
        required: 'ShowReel name is required.',
        minlength: 'ShowReel name must be at least three characters.',
        maxlength: 'ShowReel name cannot exceed 100 characters.'
    };
    public static dataStandard = [
        { "name": "PAL" },
        { "name": "NTSC" }
    ];
    public static dataDefinition = [
        { "name": "SD" },
        { "name": "HD" }
    ];
    public static confirmUpdateMessage = 'Are you sure you want to update the ShowReel?';
    public static confirmDeleteMessage = 'Are you sure you want to delete the ShowReel?';
    public static requiresClipMessage = 'A ShowReel requires at least 1 or more video clips';
 }