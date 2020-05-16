import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Service } from '~/core/service';

class AuthService extends Service {
    constructor() {
        super();
    }

    onStart = async () => {
        // passport.use(new LocalStrategy({
        //     usernameField: 'user[email]',
        //     passwordField: 'user[password]',
        // }, (email, password, done) => {
        //     userModel.findOne({ email })
        //         .select('+password')
        //         .then(user => {
        //             const validPassword = user.validatePassword(password);

        //             if (!user || !validPassword) {
        //                 return done(null, false, { message: 'Invalid username or password' });
        //             }

        //             return done(null, user);
        //         }).catch(done);
        // }));

        console.log('started auth service');
    }
}

export const authService = new AuthService();
