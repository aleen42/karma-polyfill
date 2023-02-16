module.exports = src => src.replace(/\brequire\(['"][^'"]*debug[^'"]*['"]\)/g, '(() => console.debug)');
