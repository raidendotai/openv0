
export const setOpenv0ServerCommand = (options: { force?: boolean } , args: [string, (string | undefined)?]) => {
    const server = args[0];
    if (!server) {
        console.log("Please provide a server");
        return;
    }
    const currentServer = localStorage.getItem("openv0_server");
    if (currentServer && !options.force) {  
        console.log(`A server is already set to ${currentServer} use --force to override`);
        return; 
    }
    localStorage.setItem("openv0_server", server);
    console.log(`Server set to ${server}`);
}