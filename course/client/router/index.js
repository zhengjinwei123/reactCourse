// Hook for server
if (typeof require.ensure !== 'function') {
    require.ensure = function(dependencies, callback) {
        callback(require)
    }
}

const routes = {
    childRoutes: [{
        path: '/',
        component: require('../containers/Root/index.js'),
        indexRoute: {
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../containers/Home/index.js'))
                }, 'CHome')
            }
        },
        childRoutes: [{
            path: 'explore',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../containers/Explore/index.js'))
                }, 'CExplore')
            }
        }, {
            path: 'about',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../containers/About/index.js'))
                }, 'CAbout')
            }
        }]
    }]
};

export default routes
