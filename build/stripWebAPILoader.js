module.exports = src => {
    return src.replace(/\brequire\(['"][^'"]*\.\.[\\/]modules[\\/]web\.[^'"]*['"]\)/g, '');
};
