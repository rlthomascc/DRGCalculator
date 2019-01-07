// module.exports = {
//     "extends": "airbnb",
//     "env": {
//         "browser": true,
//         "node": true,
//     },
//     "rules": {
//         "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
//         "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
//         "no-console": "off",
//     }
// };

module.exports = {
    "env": {
        "node": true, // this is the best starting point
        "browser": true, // for react web
        "es6": true // enables es6 features
    },
    "parser": "babel-eslint", // needed to make babel stuff work properly
    "extends": "airbnb"
}