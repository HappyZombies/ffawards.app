const jsonwebtoken = require("jsonwebtoken");
const UserService = require("./UserService");

const { ApplicationError } = require("../errors");
const { setupLoggerWrapper } = require("./LoggerService");
const SessionService = require("./SessionService");
const LeagueService = require("./LeagueService");

class AuthService {
    async authenticatePrivateESPN(tid, espnData) {
        
    }
    async authenticatePublicESPN(tid, espnData) {
        // ESPN has public and private leagues, here we are focusing on public leagues first but we need to seriously consider private leagues.
        // For now, we will just create a default user that every public ESPN league will be tied to. If it already exists just return them.
        const logger = setupLoggerWrapper(tid, "authenticatePublicESPN", { __filename });
        const DEFAULT_ESPN_ACCOUNT = "default_espn_account";
        const PROVIDER = "espn";
        let user;
        try {
            user = await UserService.getUserAccount(tid, DEFAULT_ESPN_ACCOUNT, PROVIDER, DEFAULT_ESPN_ACCOUNT);
        } catch(err) {
            logger.error({ err }, "Failed query user.");
            throw new ApplicationError("Failed to query user.", tid);
        }
        if(!user) {
            logger.debug("User does not have an account, creating them an account with what ESPN has given us.");
            try {
                const EXPIRES_IN = 60 * 60 * 24 * 30 * 365 * 10; // 10 years in seconds, sure.
                user = await UserService.createUserAccount(tid, DEFAULT_ESPN_ACCOUNT, PROVIDER, DEFAULT_ESPN_ACCOUNT, EXPIRES_IN);
            } catch(err) {
                logger.error({ err }, "Failed to create an account for this user.");
                throw new ApplicationError("Failed to create an account for this user.", tid);
            }
            logger.debug("Default ESPN account was created successfully for this user, creating them a session and we will retrieve and store their leagues.");
            try {
                const promiseResult = await Promise.all([
                    SessionService.createSession(tid, user.PK),
                    LeagueService.storeESPNLeague(tid, user.PK, espnData, PROVIDER)
                ]);
                const session = promiseResult[0];
                return { user, session };
            } catch(err) {
                logger.error({ err }, "Failed to create a session and/or create leagues for this user.");
                throw new ApplicationError("Failed to create a session and/or create leagues for this user.", tid);
            }
        }
        logger.debug("A user already exists in our system, creating them a new session and upserting their league.");
        try {
            const promiseResult = await Promise.all([
                SessionService.createSession(tid, user.PK),
                LeagueService.storeESPNLeague(tid, user.PK, espnData, PROVIDER) // technically an uncessary write but it's fine -- besides the way we are doing this is kinda hacked on the existing system
            ]);
            const session = promiseResult[0];
            return { user, session };
        } catch(err) {
            logger.error({ err }, "Failed to update the user's ESPN account and/or create a session for this user.");
            throw new ApplicationError("Failed to update the users account session and/or create a session for this user.", tid);
        }
    }
    async authenticateSleeper(tid, sleeperData) {
        // since there is no real accounts for sleeper, just create a default user that every sleeper account will be tied to. If it already exists just return them.
        // * NOTE: in theory we could just use the same session..but let's create one for each request that comes through with a valid league id.
        const logger = setupLoggerWrapper(tid, "authenticateSleeper", { __filename });
        const DEFAULT_SLEEPER_ACCOUNT = "default_sleeper_account";
        const PROVIDER = "sleeper";
        let user;
        try {
            user = await UserService.getUserAccount(tid, DEFAULT_SLEEPER_ACCOUNT, PROVIDER, DEFAULT_SLEEPER_ACCOUNT);
        } catch(err) {
            logger.error({ err }, "Failed query user.");
            throw new ApplicationError("Failed to query user.", tid);
        }
        if(!user) {
            logger.debug("User does not have an account, creating them an account with what Sleeper has given us.");
            try {
                const EXPIRES_IN = 60 * 60 * 24 * 30 * 365 * 10; // 10 years in seconds, sure.
                user = await UserService.createUserAccount(tid, DEFAULT_SLEEPER_ACCOUNT, PROVIDER, DEFAULT_SLEEPER_ACCOUNT, EXPIRES_IN);
            } catch(err) {
                logger.error({ err }, "Failed to create an account for this user.");
                throw new ApplicationError("Failed to create an account for this user.", tid);
            }
            logger.debug("Default sleeper account was created successfully for this user, creating them a session and we will retrieve and store their leagues.");
            try {
                const promiseResult = await Promise.all([
                    SessionService.createSession(tid, user.PK),
                    LeagueService.storeSleeperLeague(tid, user.PK, sleeperData, PROVIDER)
                ]);
                const session = promiseResult[0];
                return { user, session };
            } catch(err) {
                logger.error({ err }, "Failed to create a session and/or create leagues for this user.");
                throw new ApplicationError("Failed to create a session and/or create leagues for this user.", tid);
            }
        }
        logger.debug( "A user already exists in our system, creating them a new session and upserting their league.");
        try {
            const promiseResult = await Promise.all([
                SessionService.createSession(tid, user.PK),
                LeagueService.storeSleeperLeague(tid, user.PK, sleeperData, PROVIDER) // technically an uncessary write but it's fine -- besides the way we are doing this is kinda hacked on the existing system
            ]);
            const session = promiseResult[0];
            return { user, session };
        } catch(err) {
            logger.error({ err }, "Failed to update the user's Sleeper account and/or create a session for this user.");
            throw new ApplicationError("Failed to update the users account session and/or create a session for this user.", tid);
        }
    }
    async authenticate(tid, yahooAuthData) {
        const logger = setupLoggerWrapper(tid, "authenticate", { __filename });
        logger.trace({ yahooAuthData }, "Decoding payload from Yahoo, checking if we have what we need.");
        const { id_token, expires_in } = yahooAuthData;
        if(!id_token) {
            logger.error({ yahooAuthData }, "We decoded some data, but we don't have the id_token, this contains their e-mail, we need this to create an account.");
            throw new ApplicationError("Missing Yahoo id_token.", tid);
        }
        const decodedPayload = jsonwebtoken.decode(id_token);
        const { email, sub } = decodedPayload;
        logger.debug("Got info we need, checking if this user has an account with us or not.");
        let user;
        try {
            user = await UserService.getUserAccount(tid, email, "yahoo", sub);
        } catch(err) {
            logger.error({ email, err }, "Failed query user.");
            throw new ApplicationError("Failed to query user.", tid);
        }
        if(!user) {
            logger.debug("User does not have an account, creating them an account with what Yahoo has given us.");
            try {
                user = await UserService.createUserAccount(tid, email, "yahoo", sub, expires_in);
            } catch(err) {
                logger.error({ err, email }, "Failed to create an account for this user.");
                throw new ApplicationError("Failed to create an account for this user.", tid);
            }
            logger.debug("New account was created successfully for this user, creating them a session and we will retrieve and store their leagues.");
            try {
                const promiseResult = await Promise.all([
                    SessionService.createSession(tid, user.PK),
                    LeagueService.storeCurrentAndPastLeagues(tid, user.PK, user.provider)
                ]);
                const session = promiseResult[0];
                return { user, session };
            } catch(err) {
                logger.error({ err, email }, "Failed to create a session and/or create leagues for this user.");
                throw new ApplicationError("Failed to create a session and/or create leagues for this user.", tid);
            }
        }
        logger.debug( "A user already exists in our system, updating their Yahoo account with the new data and creating them a new session.");
        try {
            user = await UserService.updateUserAccount(tid, email, "yahoo", sub, expires_in);
            const session = await SessionService.createSession(tid, user.PK);
            await LeagueService.storeCurrentAndPastLeagues(tid, user.PK, user.provider);
            return { user, session };
        } catch(err) {
            logger.error({ err, email }, "Failed to update the user's Yahoo account and/or create a session for this user.");
            throw new ApplicationError("Failed to update the users account session and/or create a session for this user.", tid);
        }
    }

    async logout(tid, userId, sessionToken) {
        const logger = setupLoggerWrapper(tid, "logout", { __filename });
        logger.trace("Logging user out.");
        await SessionService.deleteSession(tid, userId, sessionToken);
    }

    // TODO: Finish implementing -- need to first query everything and delete by the PK and SK we get back.
    async deleteAccount(tid, userId) {
        const logger = setupLoggerWrapper(tid, "deleteAccount", { __filename });
        await SessionService.deleteAllSessionByUserPK(tid, userId);
        // Delete all user data
        await UserService.deleteUserAccount(tid, userId);
        // note that we don't delete any awards generated by a league, as they are not tied to a user PK.
        await LeagueService.deleteLeaguesByUserId(tid, userId);
        
        logger.debug({ userId }, "Delete all users data by the given user id.");
    }
}

module.exports = new AuthService();
