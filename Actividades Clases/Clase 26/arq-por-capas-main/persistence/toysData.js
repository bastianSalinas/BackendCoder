let toys = [];

module.exports = {
    getAllToys: () => toys,
    createToy: (newToy) => {
        toys.push(newToy);
    },
};
