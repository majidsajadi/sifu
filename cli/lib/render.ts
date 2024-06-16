import pc from "picocolors";

const { log } = console;

export const renderWarning = (message: string) => log(pc.yellow(message));
