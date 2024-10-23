export default (RPC, text, startTimestamp) => {
    RPC.setActivity({
        details: text,
        state: 'using DevsMC Launcher',
        startTimestamp,
        largeImageKey: 'devsmc-logo',
        largeImageText: 'DevsMarket',
        instance: false,
    });
}