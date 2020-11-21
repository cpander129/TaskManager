//Set up public array of global variables

module.exports =
{
    'db': 'mongodb+srv://admin:admin@cluster0.nihep.mongodb.net/tasks',
    ids: {
        'google': {
            clientID: '65966429686-e6kcr91icimq9d6aqps6l8v2nal70qbk.apps.googleusercontent.com',
            clientSecret: 'eDLCl_L7YMaLrKoCFFQLHfjK',
            //callbackURL: 'http://localhost:3000/google/callback'
            callbackURL: 'https://chrisp-task-manager.herokuapp.com/google/callback'
        },
        'facebook': {
            clientID: '854381015366169',
            clientSecret: '500d44e23acf375d6f7347d9618df7d0',
            //callbackURL: 'http://localhost:3000/facebook/callback'
            callbackURL: 'https://chrisp-task-manager.herokuapp.com/facebook/callback'
        }
    }
}