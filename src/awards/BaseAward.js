class BaseAward {
    constructor(name, description, provider, leagueId, id) {
        this.name = name;
        this.description = description;
        this.provider = provider;
        this.leagueId = leagueId;
        this.id = id;
        this.displayOrder = 1000;
        this.result = null;
    }

    setId = (id) => {
        this.id = id;
        return this;
    };

    setDataSet = (dataSet) => {
        this.result = dataSet;
        return this;
    };

    setProvider = (provider) => {
        this.provider = provider;
        return this;
    };

    setLeagueId = (leagueId) => {
        this.leagueId = leagueId;
        return this;
    };

    setDescription = (description) => {
        this.description = description;
        return this;
    };

    build() {}
    
    // eslint-disable-next-line no-unused-vars
    async calculateAward (tid) {}
}

module.exports = BaseAward;
